<script lang="ts">
	import { onMount } from 'svelte';
	import { getOrganizationSettings } from '$lib/db/settings';
	import { t } from '$lib/i18n';

	let isBirthday = $state(false);

	onMount(async () => {
		const settings = await getOrganizationSettings();
		if (!settings.owner_birthday_date) return;
		const today = new Date();
		const birthday = new Date(settings.owner_birthday_date);
		isBirthday = today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();
	});
</script>

{#if isBirthday}
	<div class="card flex items-center gap-4 border-2 border-amber-300 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30">
		<pre class="text-2xl leading-tight" aria-hidden="true">{`     🎂
    ╱  ╲
   ╱    ╲
  ▕ ◉  ◉ ▏
  ▕  ▽▽  ▏
  ▕ ╲  ╱ ▏
   ╲╱╲╱╲╱
  ╱▔▔▔▔▔▔╲
 ▕ 🎈    🎈▏
  ╲▁▁▁▁▁▁╱
   ▕▏  ▕▏`}</pre>
		<div>
			<p class="text-lg font-bold text-amber-800 dark:text-amber-300">🎉 {t('birthday.greeting')} 🎉</p>
		</div>
	</div>
{/if}
