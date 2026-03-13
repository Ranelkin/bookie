<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { t } from '$lib/i18n';

	let { children }: { children: Snippet } = $props();

	const navItems = [
		{ get label() { return t('timeTracking.entries'); }, href: '/zeiterfassung' },
		{ get label() { return t('timeTracking.timesheet'); }, href: '/zeiterfassung/stundenzettel' }
	];
</script>

<div class="space-y-6">
	<header>
		<h1 class="text-2xl font-semibold tracking-tight">{t('timeTracking.title')}</h1>
		<p class="text-sm text-zinc-600 dark:text-zinc-300">{t('timeTracking.subtitle')}</p>
	</header>

	<nav class="flex flex-wrap gap-2">
		{#each navItems as item}
			<a
				href={item.href}
				class={`nav-pill ${page.url.pathname === item.href ? 'nav-pill-active' : 'nav-pill-inactive'}`}
			>
				{item.label}
			</a>
		{/each}
	</nav>

	{@render children()}
</div>
