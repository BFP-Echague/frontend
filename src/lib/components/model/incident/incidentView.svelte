<script lang="ts">
    import DisplayItem from "$lib/components/display/displayItem.svelte";
	import { type IncidentGet } from "$lib";

    let { incident }: { incident: IncidentGet } = $props();
</script>

<div class="d-flex flex-column">
    <DisplayItem name="Name" description={incident.name} />
    <div class="d-flex flex-column">
        <h5>Location</h5>
        <div class="d-flex flex-row">
            <DisplayItem name="Latitude" description={incident.location.latitude.toString()} />
            <div class="ms-5">
                <DisplayItem name="Longitude" description={incident.location.longitude.toString()} />
            </div>
        </div>
    </div>

    <DisplayItem name="Report Time" description={incident.reportTime} />
    <DisplayItem name="Barangay" description={incident.barangay.name} />
    <DisplayItem name="Causes of Fire" description={incident.causes.join(", ")} />
    <DisplayItem name="Response Time" description={incident.responseTime} />
    <DisplayItem name="Fire Out Time" description={incident.fireOutTime} />
    <DisplayItem name="Structures Involved" description={incident.structuresInvolved.join(", ")} />
    <DisplayItem name="Notes" description={incident.notes} />
</div>
