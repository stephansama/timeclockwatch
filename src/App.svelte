<script lang="ts">
	import { DaysOfTheWeek } from "./lib/week";
	import Header from "./lib/Header.svelte";
	import Footer from "./lib/Footer.svelte";
	import Day from "./lib/Day.svelte";
	import Total from "./lib/Total.svelte";

	if (import.meta.env.DEV) document.body.classList.add("debug-screens");
</script>

<Header />
<main>
	<p></p>
	<Total />
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-0">
		{#if DaysOfTheWeek}
			{#each DaysOfTheWeek as day}
				<Day {day} bg={"none"} />
			{/each}
		{/if}
	</div>
	<Total />
</main>
<Footer />
