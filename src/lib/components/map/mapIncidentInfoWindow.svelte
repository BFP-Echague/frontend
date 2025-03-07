<script lang="ts">
	import type { IncidentGet } from "$lib";
	import DisplayItem from "../display/displayItem.svelte";


    let { incident }: { incident: IncidentGet } = $props();
</script>



<div class="d-flex flex-column">
    <div class="d-flex flex-column justify-content-center">
        <h2>{ incident.name }</h2>
    </div>

    <DisplayItem name="Category" description={incident.category.name} />
    <DisplayItem name="Report Time" description={incident.reportTime} />
    <DisplayItem name="Barangay" description={incident.barangay.name} />
    <DisplayItem name="Notes" description={incident.notes} />
</div>