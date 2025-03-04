<script lang="ts">
	import { Form, FormGroup, Label, Button, Icon, Input } from "@sveltestrap/sveltestrap";

    export const result = {
        name: undefined,
        reportTime: undefined,
        location: {
            longitude: undefined,
            latitude: undefined
        },
        barangayId: undefined,
        causes: [],
        responseTime: undefined,
        fireOutTime: undefined,
        structuresInvolved: [],
        notes: undefined,
        categoryId: undefined
    };

</script>


<Form>
    <FormGroup>
        <Label for="reportTime">Time Reported:</Label>
        <Input type="datetime-local" id="reportTime" bind:value={result.reportTime} />
    </FormGroup>
    <FormGroup>
        <Label for="barangay">Location (Barangay):</Label>
        <Input type="select" id="barangay" bind:value={result.barangayId}>
            <option value="" disabled selected>Select Barangay</option>
            <option value="Angoluan">Angoluan</option>
            <option value="Annafunan">Annafunan</option>
            <option value="Arabiat">Arabiat</option>
            <option value="Aromin">Aromin</option>
            <option value="Babaran">Babaran</option>
            <option value="Bacradal">Bacradal</option>
            <option value="Benguet">Benguet</option>
            <option value="Buneg">Buneg</option>
            <option value="Busilelao">Busilelao</option>
            <option value="Cabugao">Cabugao</option>
            <option value="Caniguing">Caniguing</option>
            <option value="Carulay">Carulay</option>
            <option value="Castillo">Castillo</option>
            <option value="Dammang East">Dammang East</option>
            <option value="Dammang West">Dammang West</option>
            <option value="Diasan">Diasan</option>
            <option value="Dicaraoyan">Dicaraoyan</option>
            <option value="Dugayong">Dugayong</option>
            <option value="Fugu">Fugu</option>
            <option value="Garit Norte">Garit Norte</option>
            <option value="Garit Sur">Garit Sur</option>
            <option value="Gucab">Gucab</option>
            <option value="Gumbauan">Gumbauan</option>
            <option value="Ipil">Ipil</option>
            <option value="Libertad">Libertad</option>
            <option value="Mabbayad">Mabbayad</option>
            <option value="Mabuhay">Mabuhay</option>
            <option value="Madadamian">Madadamian</option>
            <option value="Magleticia">Magleticia</option>
            <option value="Malibago">Malibago</option>
            <option value="Maligaya">Maligaya</option>
            <option value="Malitao">Malitao</option>
            <option value="Narra">Narra</option>
            <option value="Nilumisu">Nilumisu</option>
            <option value="Pag-asa">Pag-asa</option>
            <option value="Pangal Norte">Pangal Norte</option>
            <option value="Pangal Sur">Pangal Sur</option>
            <option value="Rumang-ay">Rumang-ay</option>
            <option value="Salay">Salay</option>
            <option value="Salvacion">Salvacion</option>
            <option value="San Antonio Minit">San Antonio Minit</option>
            <option value="San Antonio Ugad">San Antonio Ugad</option>
            <option value="San Carlos">San Carlos</option>
            <option value="San Fabian">San Fabian</option>
            <option value="San Felipe">San Felipe</option>
            <option value="San Juan">San Juan</option>
            <option value="San Manuel">San Manuel</option>
            <option value="San Miguel">San Miguel</option>
            <option value="San Salvador">San Salvador</option>
            <option value="Santa Ana">Santa Ana</option>
            <option value="Santa Cruz">Santa Cruz</option>
            <option value="Santa Maria">Santa Maria</option>
            <option value="Santa Monica">Santa Monica</option>
            <option value="Santo Domingo">Santo Domingo</option>
            <option value="Silauan Norte">Silauan Norte</option>
            <option value="Silauan Sur">Silauan Sur</option>
            <option value="Sinabbaran">Sinabbaran</option>
            <option value="Soyung">Soyung</option>
            <option value="Taggappan">Taggappan</option>
            <option value="Tuguegarao">Tuguegarao</option>
            <option value="Villa Campo">Villa Campo</option>
            <option value="Villa Fermin">Villa Fermin</option>
            <option value="Villa Rey">Villa Rey</option>
            <option value="Villa Victoria">Villa Victoria</option>
        </Input>
    </FormGroup>
    <FormGroup>
        <Label for="category">Incident Category:</Label>
        <Input type="select" id="category" bind:value={result.categoryId}>
            <option value="" disabled selected>Select Incident Category</option>
            <option value="Structural Fire">Structural Fire</option>
            <option value="Vehicular Fire">Vehicular Fire</option>
            <option value="Grass Fire">Grass Fire</option>
            <option value="Electrical Fire">Electrical Fire</option>
            <option value="Chemical Fire">Chemical Fire</option>
            <option value="Rescue Operation">Rescue Operation</option>
            <option value="Flood Assistance">Flood Assistance</option>
            <option value="Other">Other</option>
        </Input>
    </FormGroup>
    <FormGroup>
        <Label for="cause">Probable Cause:</Label>
    </FormGroup>
    <FormGroup>
        <Label for="responseTime">Time of Arrival:</Label>
        <Input type="datetime-local" id="responseTime" bind:value={result.responseTime} />
    </FormGroup>
    <FormGroup>
        <Label for="fireOutTime">Time Fire Out:</Label>
        <Input type="datetime-local" id="fireOutTime" bind:value={result.fireOutTime} />
    </FormGroup>
    <div>
        <label for="structuresInvolved">Affected Structures:</label>
        <!-- {#each result.structuresInvolved as structure, index}
            <div>
                <InputGroup>
                    <Input
                        type="text"
                        bind:value={structure}
                        placeholder="Enter structure"
                    />

                    <Button
                        type="button"
                        color="secondary"
                        on:click={() => removeStructure(index)}
                        aria-label="Remove structure"
                    >
                        <Icon name="trash" />
                    </Button>
                </InputGroup>
            </div>
        {/each} -->
        <!-- Add Button -->
        <!-- <Button
            type="button"
            on:click={addStructure}
            class="d-flex justify-content-center space-x-1 mt-2 w-100"
        >
            
            <Icon name="plus" />
            <span>Add Structure</span>
        </Button> -->
    </div>
    <FormGroup>
        <Label for="notes">Additional Details:</Label>
        <Input
            type="textarea"
            id="notes"
            bind:value={result.notes}
            rows={3}
            placeholder="Enter additional details"
        />
    </FormGroup>
    <Button color="primary" class="w-100">
        <Icon name="send" class="me-2" /> Submit Report
    </Button>
</Form>