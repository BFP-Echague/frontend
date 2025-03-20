<script lang="ts">
    import DisplayItem from "$lib/components/display/displayItem.svelte";
	import { type IncidentGet } from "$lib";
	import GeneralHr from "$lib/components/generalHr.svelte";

    let { incident }: { incident: IncidentGet } = $props();
</script>

<div class="d-flex flex-column">
    <DisplayItem name="Archived" description={incident.archived} boolFlipColors={true} />

    <DisplayItem name="Name" description={incident.name} />

    <GeneralHr />

    <div class="d-flex flex-column">
        <h5>Location</h5>
        <div class="d-flex flex-column">
            <DisplayItem name="Latitude" description={incident.location.latitude.toString()} />
            <DisplayItem name="Longitude" description={incident.location.longitude.toString()} />
        </div>
    </div>

    <GeneralHr />

    <DisplayItem name="Report Time" description={incident.reportTime} />
    <DisplayItem name="Barangay" description={incident.barangay.name} />

    <GeneralHr />

    <DisplayItem name="Causes of Fire" description={incident.causes.join(", ")} />

    <GeneralHr />

    <DisplayItem name="Response Time" description={incident.responseTime} />
    <DisplayItem name="Fire Out Time" description={incident.fireOutTime} />

    <GeneralHr />

    <DisplayItem name="Structures Involved" description={incident.structuresInvolved.join(", ")} />

    <GeneralHr />

    <DisplayItem name="Notes" description={incident.notes} />
</div>
