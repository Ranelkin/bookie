import type { LegalProfile } from '../types';

/** Netherlands — Wet op de omzetbelasting 1968 */
const profile: LegalProfile = {
	countryCode: 'NL',
	label: 'Nederland',
	defaultLocale: 'en',
	requiredPdfFields: [
		'vatId',
		'invoiceNumber',
		'issuerAddress',
		'recipientAddress',
		'itemDescription',
		'taxBreakdown'
	],
	defaultVatRates: [
		{ name: 'Standaardtarief', rate: 21 },
		{ name: 'Verlaagd tarief', rate: 9 }
	],
	hasReverseCharge: true,
	reverseChargeLabel: 'BTW verlegd (Reverse Charge)',
	smallBusinessExemption: {
		available: true,
		label: 'Vrijgesteld van omzetbelasting op grond van de KOR (Kleineondernemersregeling).'
	},
	layoutStandard: 'generic',
	vatIdPattern: /^NL\d{9}B\d{2}$/,
	vatIdLabel: 'BTW-nummer',
	taxIdLabel: 'KvK-nummer',
	dateLocale: 'nl-NL',
	numberLocale: 'nl-NL'
};

export default profile;
