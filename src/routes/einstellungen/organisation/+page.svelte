<script lang="ts">
	import { onMount } from 'svelte';
	import TextInput from '../../../common/TextInput.svelte';
	import Select from '../../../common/Select.svelte';
	import { getOrganizationSettings, saveOrganizationSettings } from '$lib/db/settings';
	import { t } from '$lib/i18n';
	import { LOCALE_LABELS, setLocale, type Locale } from '$lib/i18n';
	import { LEGAL_COUNTRIES } from '$lib/legal';

	const localeOptions = Object.entries(LOCALE_LABELS).map(([value, label]) => ({ value, label }));
	const legalCountryOptions = LEGAL_COUNTRIES.map((c) => ({ value: c.value, label: c.label }));

	let form = $state({
		name: '',
		country: '',
		address: '',
		street: '',
		postal_code: '',
		city: '',
		email: '',
		phone_number: '',
		registering_id: '',
		bank_name: '',
		bank_iban: '',
		bank_account_holder: '',
		vatin: '',
		website: '',
		default_locale: 'de',
		default_legal_country: 'DE'
	});
	let loading = $state(true);
	let saving = $state(false);
	let feedback = $state('');

	onMount(async () => {
		const data = await getOrganizationSettings();
		for (const key of Object.keys(data) as (keyof typeof data)[]) {
			form[key] = data[key] ?? '';
		}
		if (data.default_locale) setLocale(data.default_locale as Locale);
		loading = false;
	});

	async function handleSave() {
		saving = true;
		feedback = '';
		try {
			await saveOrganizationSettings({ ...form });
			setLocale(form.default_locale as Locale);
			feedback = t('settings.orgSaved');
		} catch (err) {
			console.error('Failed to save organization settings:', err);
			feedback = t('settings.orgSaveError');
		} finally {
			saving = false;
		}
	}
</script>

<section class="card space-y-4">
	<h2 class="text-base font-semibold">{t('settings.orgTitle')}</h2>
	{#if loading}
		<p class="text-sm text-zinc-500 dark:text-zinc-400">{t('settings.loadingSettings')}</p>
	{:else}
		<div class="grid gap-3 md:grid-cols-2">
			<TextInput bind:value={form.name} label={t('common.name')} />
			<TextInput bind:value={form.country} label={t('settings.country')} />
			<TextInput bind:value={form.street} label={t('settings.streetLabel')} placeholder={t('settings.streetPlaceholder')} />
			<TextInput bind:value={form.postal_code} label={t('settings.postalCode')} placeholder={t('settings.postalCodePlaceholder')} />
			<TextInput bind:value={form.city} label={t('settings.cityLabel')} placeholder={t('settings.cityPlaceholder')} />
			<TextInput bind:value={form.email} label={t('settings.email')} type="email" />
			<TextInput bind:value={form.phone_number} label={t('settings.phoneNumber')} />
			<TextInput bind:value={form.registering_id} label={t('settings.registeringId')} />
			<TextInput bind:value={form.bank_name} label={t('settings.bankName')} />
			<TextInput bind:value={form.bank_iban} label={t('settings.bankIban')} />
			<TextInput bind:value={form.bank_account_holder} label={t('settings.accountHolder')} />
			<TextInput bind:value={form.vatin} label={t('settings.vatinLabel')} />
			<TextInput bind:value={form.website} label={t('settings.websiteLabel')} />
			<Select bind:value={form.default_locale} label={t('settings.defaultLocale')} options={localeOptions} />
			<Select bind:value={form.default_legal_country} label={t('settings.defaultLegalCountry')} options={legalCountryOptions} />
		</div>
		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={handleSave}
				disabled={saving}
				class="btn-primary"
			>
				{saving ? t('common.saving') : t('common.saveChanges')}
			</button>
			{#if feedback}<p class="text-xs text-emerald-600">{feedback}</p>{/if}
		</div>
	{/if}
</section>
