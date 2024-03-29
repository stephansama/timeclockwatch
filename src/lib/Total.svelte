<script lang="ts">
	import { convertToHours } from "./hours";
	import { clearWorkWeek, workedTotal } from "./week";
</script>

<div class="flex items-center justify-between">
	<button
		class="rounded-md bg-red-200 px-2 py-1 transition-colors duration-300 hover:bg-red-300 dark:bg-red-700 hover:dark:bg-red-600"
		on:click={clearWorkWeek}
	>
		Clear
	</button>

	Total: {convertToHours($workedTotal)}
</div>
