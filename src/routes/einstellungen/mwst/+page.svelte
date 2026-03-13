<script lang="ts">
	import { onMount } from 'svelte';
	import TextInput from '../../../common/TextInput.svelte';
	import { createVatTax, deleteVatTax, listVatTaxes, updateVatTax } from '$lib/db/settings';
	import type { VatTax } from '$lib/db/types';
	import { t } from '$lib/i18n';

	let taxes = $state<VatTax[]>([]);
	let loading = $state(true);
	let feedback = $state('');
	let form = $state({ name: '', description: '', goods_value_percent: '19' });

	async function loadTaxes() {
		taxes = await listVatTaxes();
		loading = false;
	}

	onMount(loadTaxes);

	async function createTax() {
		await createVatTax({
			name: form.name,
			description: form.description,
			goods_value_percent: Number(form.goods_value_percent) || 0
		});
		form = { name: '', description: '', goods_value_percent: '19' };
		feedback = t('settings.vatSaved');
		await loadTaxes();
	}

	async function saveTax(tax: VatTax) {
		await updateVatTax(tax.id, tax);
		feedback = t('settings.vatSaved');
	}

	async function removeTax(id: number) {
		if (!confirm(t('settings.vatDeleteConfirm'))) return;
		await deleteVatTax(id);
		feedback = t('settings.vatDeleted');
		await loadTaxes();
	}
</script>

<section class="card space-y-4">
	<h2 class="text-base font-semibold">{t('settings.vatTitle')}</h2>

	<div class="grid gap-3 md:grid-cols-3">
		<TextInput bind:value={form.name} label={t('settings.vatName')} />
		<TextInput bind:value={form.description} label={t('settings.vatDescription')} />
		<TextInput bind:value={form.goods_value_percent} label={t('settings.vatPercent')} type="number" />
	</div>
	<button type="button" onclick={createTax} class="btn-primary">
		{t('settings.vatSave')}
	</button>

	{#if loading}
		<p class="text-sm text-zinc-500 dark:text-zinc-400">{t('settings.vatLoading')}</p>
	{:else if taxes.length === 0}
		<p class="text-sm text-zinc-500 dark:text-zinc-400">{t('settings.vatEmpty')}</p>
	{:else}
		<div class="space-y-3">
			{#each taxes as tax}
				<div class="grid gap-3 rounded-md border border-zinc-200 p-3 md:grid-cols-[1fr_1fr_180px_auto_auto] dark:border-zinc-700">
					<TextInput bind:value={tax.name} label={t('settings.vatName')} />
					<TextInput bind:value={tax.description} label={t('settings.vatDescription')} />
					<div class="mt-1 flex flex-col gap-1">
						<label for="tax-percent-{tax.id}" class="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('settings.vatPercent')}</label>
						<input id="tax-percent-{tax.id}" bind:value={tax.goods_value_percent} type="number" class="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100" />
					</div>
					<button type="button" onclick={() => saveTax(tax)} class="mt-5 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500">{t('common.save')}</button>
					<button type="button" onclick={() => removeTax(tax.id)} class="mt-5 rounded-md bg-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100">{t('common.delete')}</button>
				</div>
			{/each}
		</div>
	{/if}
	{#if feedback}<p class="text-xs text-emerald-600">{feedback}</p>{/if}
</section>
