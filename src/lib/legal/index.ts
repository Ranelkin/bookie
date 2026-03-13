import type { LegalCountry, LegalProfile } from './types';
import de from './profiles/de';
import at from './profiles/at';
import ch from './profiles/ch';
import fr from './profiles/fr';
import nl from './profiles/nl';
import us from './profiles/us';

export type { LegalCountry, LegalProfile, LegalRequiredField } from './types';

const profiles: Record<LegalCountry, LegalProfile> = { DE: de, AT: at, CH: ch, FR: fr, NL: nl, US: us };

export const LEGAL_COUNTRIES: { value: LegalCountry; label: string }[] = Object.values(profiles).map((p) => ({
	value: p.countryCode,
	label: p.label
}));

export function getLegalProfile(countryCode: LegalCountry): LegalProfile {
	return profiles[countryCode] ?? profiles.DE;
}

export function getAllProfiles(): LegalProfile[] {
	return Object.values(profiles);
}
