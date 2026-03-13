<script lang="ts">
	type TableColumn<RowType extends Record<string, unknown>> = {
		key: keyof RowType;
		label: string;
		width?: string;
	};

	let {
		columns,
		rows,
		rowHeight = 44,
		height = 520,
		emptyMessage = 'Keine Daten vorhanden.'
	}: {
		columns: TableColumn<Record<string, unknown>>[];
		rows: Record<string, unknown>[];
		rowHeight?: number;
		height?: number;
		emptyMessage?: string;
	} = $props();

	let scrollTop = $state(0);
	const overscan = 8;

	const totalHeight = $derived(rows.length * rowHeight);
	const startIndex = $derived(Math.max(0, Math.floor(scrollTop / rowHeight) - overscan));
	const visibleCount = $derived(Math.ceil(height / rowHeight) + overscan * 2);
	const endIndex = $derived(Math.min(rows.length, startIndex + visibleCount));
	const visibleRows = $derived(rows.slice(startIndex, endIndex));
	const offsetY = $derived(startIndex * rowHeight);

	const readCellValue = (row: Record<string, unknown>, key: keyof Record<string, unknown>) => {
		const value = row[key];
		if (value === null || value === undefined || value === '') return '—';
		return String(value);
	};
</script>

<div role="table" aria-rowcount={rows.length} class="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800/40">
	<div role="row" class="grid border-b border-zinc-200 bg-zinc-100 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" style={`grid-template-columns: ${columns.map((column) => column.width ?? 'minmax(0, 1fr)').join(' ')}`}>
		{#each columns as column}
			<div role="columnheader" class="truncate px-4 py-3">{column.label}</div>
		{/each}
	</div>

	{#if rows.length === 0}
		<div class="px-4 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">{emptyMessage}</div>
	{:else}
		<div
			class="overflow-y-auto"
			style={`height: ${height}px`}
			onscroll={(event) => (scrollTop = (event.currentTarget as HTMLDivElement).scrollTop)}
		>
			<div style={`height: ${totalHeight}px; position: relative;`}>
				<div class="absolute inset-x-0" style={`transform: translateY(${offsetY}px);`}>
					{#each visibleRows as row, index (startIndex + index)}
						<div
							role="row"
							class="grid border-b border-zinc-100 text-sm text-zinc-700 dark:border-zinc-700/70 dark:text-zinc-200"
							style={`grid-template-columns: ${columns.map((column) => column.width ?? 'minmax(0, 1fr)').join(' ')}; height: ${rowHeight}px;`}
						>
							{#each columns as column}
								<div role="cell" class="truncate px-4 py-3">{readCellValue(row, column.key)}</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
