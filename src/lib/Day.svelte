<script lang="ts">
	import { cn } from "./cn";
	import { writable } from "svelte/store";
	import { convertToHours } from "./hours";
	import { storedWeek, workWeek, weekTotals, type DayOfTheWeek } from "./week";

	export let day: DayOfTheWeek;
	export let bg: string;

	const timestamps = [
		"Clock In",
		"Clock Lunch In",
		"Clock Lunch Out",
		"Clock Out",
	] as const;

	const timestampColors = [
		"bg-red-200 dark:bg-red-700",
		"bg-purple-200 dark:bg-purple-700",
		"bg-green-200 dark:bg-green-700",
		"bg-blue-200 dark:bg-blue-700",
	];

	let punches = writable(
		timestamps.reduce(
			(p, c, i) => ({ ...p, [c]: storedWeek?.[day][i] || "" }),
			{} as Record<(typeof timestamps)[number], string>,
		),
	);

	punches.subscribe((v) =>
		workWeek.update((o) => ({ ...o, [day]: Object.values(v) })),
	);
</script>

<div style="background-color: {bg};" class="my-2">
	<div class="mb-1 flex items-center justify-between">
		<h2 class="text-2xl">{day}</h2>
		<span class={cn("font-bold", { "text-red-500": $weekTotals[day] < 0 })}>
			{convertToHours($weekTotals[day])}
		</span>
	</div>
	<div class="grid gap-4 sm:grid-cols-4">
		{#each timestamps as timestamp, i}
			{@const id = ((t = timestamp) =>
				t[0].toLowerCase() + t.slice(1).replaceAll(" ", ""))()}
			<div
				class={cn(
					"flex flex-col justify-center overflow-hidden rounded-md",
					timestampColors[i],
				)}
			>
				<input
					bind:value={$punches[timestamp]}
					class="border-none bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100"
					type="time"
					name={id}
					{id}
				/>
				<label class="px-4 pb-1" for={id}>{timestamp}</label>
			</div>
		{/each}
	</div>
</div>
