<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		title,
		description,
		buttonLabel = 'Neu hinzufügen',
		cancelLabel = 'Abbrechen',
		open = $bindable(false),
		children
	}: {
		title: string;
		description?: string;
		buttonLabel?: string;
		cancelLabel?: string;
		open?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class="card shadow-sm">
	<div class="flex flex-wrap items-start justify-between gap-3">
		<div>
			<h2 class="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-300">{title}</h2>
			{#if description}
				<p class="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
			{/if}
		</div>
		{#if !open}
			<button
				type="button"
				onclick={() => (open = true)}
				class="btn-primary"
			>
				{buttonLabel}
			</button>
		{/if}
	</div>

	{#if open}
		<div class="mt-4 space-y-4">
			{@render children()}
			<div class="flex justify-end">
				<button
					type="button"
					onclick={() => (open = false)}
					class="btn-secondary"
				>
					{cancelLabel}
				</button>
			</div>
		</div>
	{/if}
</div>
