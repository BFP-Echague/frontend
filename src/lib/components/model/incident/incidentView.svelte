<script lang="ts">
    import DisplayItem from "$lib/components/display/displayItem.svelte";
	import { type IncidentGet } from "$lib";
	import GeneralHr from "$lib/components/generalHr.svelte";

    let { incident }: { incident: IncidentGet } = $props();
</script>

<div class="d-flex flex-column">
    <DisplayItem name="Archived" description={incident.archived} boolFlipColors={true} />

    <DisplayItem name="Name" description={incident.name} />
    <DisplayItem name="Category" description={`${incident.category.name} (${incident.category.severity})`} />

    <GeneralHr />

    <div class="d-flex flex-column">
        <h5>Location</h5>
        <div class="d-flex flex-column">
            <DisplayItem name="Latitude" description={incident.location.latitude.toString()} />
            <DisplayItem name="Longitude" description={incident.location.longitude.toString()} />
        </div>
    </div>

    <DisplayItem name="Barangay" description={incident.barangay.name} />

    <GeneralHr />

    <DisplayItem name="Report Time" description={incident.reportTime} />
    <DisplayItem name="Response Time" description={incident.responseTime} />
    <DisplayItem name="Fire Out Time" description={incident.fireOutTime} />

    <GeneralHr />

    <DisplayItem name="Causes of Fire" description={incident.causes.join(", ")} />
    <DisplayItem name="Structures Involved" description={incident.structuresInvolved.join(", ")} />

    <GeneralHr />

    <DisplayItem name="Created By" description={incident.createdBy.username} />
    <DisplayItem name="Updated By" description={incident.updatedBy.username} />

    <DisplayItem name="Notes" description={incident.notes} />
</div>
