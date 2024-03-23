<script lang="ts">
	import { workedTotal } from "./week";
	import { convertToHours } from "./hours";
</script>

Total: {convertToHours($workedTotal)}
