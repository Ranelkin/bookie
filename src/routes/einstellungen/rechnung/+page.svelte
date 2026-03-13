<script lang="ts">
	import { onMount } from 'svelte';
	import TextInput from '../../../common/TextInput.svelte';
	import FileUpload from '../../../common/FileUpload.svelte';
	import { getInvoiceSettings, saveInvoiceSettings } from '$lib/db/settings';
	import { t } from '$lib/i18n';

	let form = $state({
		currency: 'EUR',
		decimal_places: 2,
		days_till_due: 14,
		due_surcharge: 0,
		notes: '',
		invoice_number_format: 'RE-{YYYY}-{COUNT}',
		invoice_number_incrementor: 1,
		company_logo_data_url: null as string | null
	});
	let decimalPlaces = $state('2');
	let daysTillDue = $state('14');
	let dueSurcharge = $state('0');
	let incrementor = $state('1');
	let logoFiles = $state<FileList | null>(null);
	let loading = $state(true);
	let saving = $state(false);
	let feedback = $state('');

	onMount(async () => {
		form = await getInvoiceSettings();
		decimalPlaces = String(form.decimal_places);
		daysTillDue = String(form.days_till_due);
		dueSurcharge = String(form.due_surcharge);
		incrementor = String(form.invoice_number_incrementor);
		loading = false;
	});

	async function fileToDataUrl(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result));
			reader.onerror = () => reject(reader.error);
			reader.readAsDataURL(file);
		});
	}

	async function handleSave() {
		saving = true;
		feedback = '';
		if (logoFiles?.[0]) {
			form.company_logo_data_url = await fileToDataUrl(logoFiles[0]);
		}
		form.decimal_places = Number(decimalPlaces) || 0;
		form.days_till_due = Number(daysTillDue) || 0;
		form.due_surcharge = Number(dueSurcharge) || 0;
		form.invoice_number_incrementor = Math.max(1, Number(incrementor) || 1);
		await saveInvoiceSettings(form);
		feedback = t('settings.invoiceSaved');
		saving = false;
	}
</script>

<section class="card space-y-4">
	<h2 class="text-base font-semibold">{t('settings.invoiceTitle')}</h2>
	{#if loading}
		<p class="text-sm text-zinc-500 dark:text-zinc-400">{t('settings.loadingSettings')}</p>
	{:else}
		<div class="grid gap-3 md:grid-cols-2">
			<TextInput bind:value={form.currency} label={t('settings.currencyLabel')} />
			<TextInput bind:value={decimalPlaces} label={t('settings.decimalPlaces')} type="number" />
			<TextInput bind:value={daysTillDue} label={t('settings.daysTillDue')} type="number" />
			<TextInput bind:value={dueSurcharge} label={t('settings.surcharge')} type="number" />
			<TextInput bind:value={form.notes} label={t('common.notes')} />
			<TextInput bind:value={form.invoice_number_format} label={t('settings.invoiceNumberFormat')} />
			<TextInput bind:value={incrementor} label={t('settings.invoiceNumberIncrement')} type="number" />
		</div>
		<FileUpload bind:files={logoFiles} label={t('settings.uploadLogo')} accept="image/*" />
		{#if form.company_logo_data_url}
			<img src={form.company_logo_data_url} alt={t('settings.companyLogo')} class="h-16 w-auto rounded border border-zinc-200 p-1 dark:border-zinc-700" />
		{/if}
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
