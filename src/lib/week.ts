import { differenceInMinutes } from "date-fns";
import { derived, writable } from "svelte/store";

export const DaysOfTheWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as const;

export type DayOfTheWeek = (typeof DaysOfTheWeek)[number];

export type WorkWeek = { [key in DayOfTheWeek]: string[] };

export const storedWeek = JSON.parse(
	window.localStorage.getItem("week") || "null",
) as WorkWeek | null;

export const workWeek = writable<WorkWeek>(
	storedWeek ||
		DaysOfTheWeek.reduce(
			(prev, curr) => ({ ...prev, [curr]: [] }),
			{} as WorkWeek,
		),
);

export const weekTotals = derived(workWeek, ($workWeek) =>
	Object.entries($workWeek).reduce(
		(p, [name, val]) => ({
			...p,
			[name]: val
				.map((p) => new Date([new Date().toLocaleDateString(), p]))
				.reduce(
					(p, c, i, all) =>
						p +
						([0, 2].includes(i)
							? 0
							: differenceInMinutes(c, all[i - 1])),
					0,
				),
		}),
		{} as Record<DayOfTheWeek, number>,
	),
);

export const workedTotal = derived(weekTotals, ($weekTotals) =>
	Object.values($weekTotals).reduce((p, c) => p + c, 0),
);

workWeek.subscribe((week) =>
	window.localStorage.setItem("week", JSON.stringify(week)),
);
