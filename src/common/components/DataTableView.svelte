<script lang="ts">
	import VirtualizedTable from './VirtualizedTable.svelte';

	type TableColumn<RowType extends Record<string, unknown>> = {
		key: keyof RowType;
		label: string;
		width?: string;
	};

	let {
		title,
		description,
		columns,
		rows
	}: {
		title: string;
		description: string;
		columns: TableColumn<Record<string, unknown>>[];
		rows: Record<string, unknown>[];
	} = $props();
</script>

<section class="space-y-4">
	<header>
		<h1 class="text-2xl font-semibold tracking-tight">{title}</h1>
		<p class="text-sm text-zinc-600 dark:text-zinc-300">{description}</p>
	</header>

	<VirtualizedTable {columns} {rows} />
</section>
