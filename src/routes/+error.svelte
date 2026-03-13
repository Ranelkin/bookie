<script lang="ts">
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
</script>

<div class="flex h-full items-center justify-center">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{page.status}</h1>
		<p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{page.error?.message ?? t('common.unexpectedError')}</p>
		<a href="/" class="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
			{t('common.backToHome')}
		</a>
	</div>
</div>
