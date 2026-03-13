<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/uebersicht', { replaceState: true });
	});
</script>

<p class="text-sm text-zinc-600 dark:text-zinc-300">Weiterleitung zur Übersicht…</p>
