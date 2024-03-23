import { minutesToHours } from "date-fns";

export const convertToHours = (minutes?: number) =>
	minutes &&
	`${minutesToHours(minutes)}.${`${minutes / 60}`.split(".")[1].slice(0, 2) || ""} hours`;
