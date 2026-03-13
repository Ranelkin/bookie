import type { LegalProfile } from '../types';

/** United States — no federal VAT (sales tax varies by state) */
const profile: LegalProfile = {
	countryCode: 'US',
	label: 'United States',
	defaultLocale: 'en',
	requiredPdfFields: [
		'invoiceNumber',
		'issuerAddress',
		'recipientAddress',
		'itemDescription'
	],
	defaultVatRates: [],
	hasReverseCharge: false,
	reverseChargeLabel: '',
	smallBusinessExemption: {
		available: false,
		label: ''
	},
	layoutStandard: 'generic',
	vatIdPattern: /^$/,
	vatIdLabel: 'Tax ID (EIN)',
	taxIdLabel: 'EIN',
	dateLocale: 'en-US',
	numberLocale: 'en-US'
};

export default profile;
