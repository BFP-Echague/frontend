<script>
  import { Navbar, Nav, NavItem, NavLink, Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Alert, Progress, Icon } from "@sveltestrap/sveltestrap";

  // Form input values
  let reportTime = "";
  let barangay = "";
  let category = "";
  let cause = "";
  let responseTime = "";
  let fireOutTime = "";
  let notes = "";
  let probableCauses = ["Stove", "Electric Fan", "Loose Wire", "Electrical Overload", "Candle"];
  let selectedCauses = [];
  let structuresInvolved = [""];
  
  // Function to toggle cause selection
  function toggleCause(cause) {
    if (selectedCauses.includes(cause)) {
      // Remove the cause if it's already selected
      selectedCauses = selectedCauses.filter(c => c !== cause);
    } else {
      // Add the cause if it's not selected
      selectedCauses = [...selectedCauses, cause];
    }
  }

  // Function to add a new structure input
  function addStructure() {
    structuresInvolved = [...structuresInvolved, " "];
  }

  // Function to remove a structure
  function removeStructure(index) {
    structuresInvolved = structuresInvolved.filter((_, i) => i !== index);
  }

</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css" />
</svelte:head>

<!-- Navbar -->
<Navbar dark color="danger" expand="md" class="mb-4 shadow justify-content-between">
  <Container class="d-flex align-items-center justify-content-between">
    <!-- Left-aligned Dashboard link -->
    <Nav navbar>
      <NavItem>
        <NavLink href="#" class="text-white fs-5 fw-bold">
          <i class="bi bi-house-door me-1"></i>Dashboard
        </NavLink>
      </NavItem>
    </Nav>

    <!-- Center-aligned Title with Larger and Bolder Font -->
    <span class="navbar-brand text-white text-center" style="font-size: 1.8rem; font-weight: 700;">
      <i class="bi bi-fire me-2"></i>BFP Fire Map System - Echague
    </span>

    <!-- Right-aligned Search and Profile Icon -->
    <Nav navbar class="d-flex align-items-center">
      <NavItem>
        <NavLink href="#" class="text-white fs-5 fw-bold me-3">
          <i class="bi bi-search me-1"></i>Search
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" class="text-white fs-5 fw-bold">
          <i class="bi bi-person-circle"></i>
        </NavLink>
      </NavItem>
    </Nav>
  </Container>
</Navbar>

<!-- Main Content -->
<Container fluid>
  <Row>
    <!-- Left Section: Map and Results -->
    <Col md="8">
      <Card class="mb-4 shadow">
        <CardBody>
          <CardTitle class="text-primary fs-3">
            <h3 class="d-inline">
              <Icon name="map" class="me-2" /> Fire Incident Map
            </h3>
          </CardTitle>
          <img src="/placeholder-map.jpg" alt="Map showing fire incidents in Echague" class="img-fluid rounded" style="height: 600px;" />
        </CardBody>
      </Card>

      <Card class="shadow">
        <CardBody>
          <h3 class="text-primary">
            <Icon name="clipboard-data" class="me-2" /> Incident Results
          </h3>
          <div class="d-flex align-items-start gap-4">
            <img src="/placeholder-incident.jpg" alt="Incident details image" class="rounded" style="width: 440px;" />
            <div>
              <h5>Incident Details</h5>
              <p><strong>Location:</strong> {barangay}</p>
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Selected Causes:</strong> {selectedCauses.join(", ")}</p>
              <p><strong>Time of Arrival:</strong> {responseTime}</p>
              <p><strong>Time Fire Out:</strong> {fireOutTime}</p>
              <p><strong>Affected Structures:</strong> {structuresInvolved}</p>
              <p><strong>Notes:</strong> {notes}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>

    <!-- Right Section: Incident Report Form -->
    <Col md="4">
      <Card class="shadow">
        <CardBody>
          <h3 class="text-primary">
            <Icon name="exclamation-triangle" class="me-2" /> Incident Report
          </h3>
          <Form>
              <FormGroup>
                <Label for="reportTime">Time Reported:</Label>
                <Input type="datetime-local" id="reportTime" bind:value={reportTime} />
              </FormGroup>
              <FormGroup>
                <Label for="barangay">Location (Barangay):</Label>
                <Input type="select" id="barangay" bind:value={barangay}>
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
                <Input type="select" id="category" bind:value={category}>
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
                {#each probableCauses as cause}
                  <div class="form-check">
                    <Input
                      type="checkbox"
                      class="form-check-input"
                      id={cause}
                      value={cause}
                      checked={selectedCauses.includes(cause)}
                      on:change={() => toggleCause(cause)}
                    />
                    <Label class="form-check-label" for={cause}>{cause}</Label>
                  </div>
                {/each}
              </FormGroup>            
              <FormGroup>
                <Label for="responseTime">Time of Arrival:</Label>
                <Input type="datetime-local" id="responseTime" bind:value={responseTime} />
              </FormGroup>
              <FormGroup>
                <Label for="fireOutTime">Time Fire Out:</Label>
                <Input type="datetime-local" id="fireOutTime" bind:value={fireOutTime} />
              </FormGroup>
              <div>
                <label for="structuresInvolved">Affected Structures:</label>
                {#each structuresInvolved as structure, index}
                  <div>
                    <input
                      type="text"
                      id="structuresInvolved"
                      bind:value={structuresInvolved[index]}
                      placeholder="Enter structure"
                    />
                    <!-- Trash icon for "Remove" -->
                    <button type="button" on:click={() => removeStructure(index)} aria-label="Remove structure">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M5 7h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7zm4 3a1 1 0 00-2 0v8a1 1 0 102 0v-8zm6 0a1 1 0 00-2 0v8a1 1 0 102 0v-8zM19 4h-4V2H9v2H5a1 1 0 100 2h14a1 1 0 100-2z" />
                      </svg>
                    </button>
                  </div>
                {/each}
                <!-- Add Button -->
                <button type="button" on:click={addStructure} class="flex items-center space-x-1 mt-2">
               <!-- Plus-Square Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m-2.25 6.75h12a2.25 2.25 0 002.25-2.25v-12a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span>Add Structure</span>
                </button>
              </div>
              <FormGroup>
                <Label for="notes">Additional Details:</Label>
                <Input type="textarea" id="notes" bind:value={notes} rows={3} placeholder="Enter additional details" />
              </FormGroup>
              <Button color="primary" class="w-100">
                <Icon name="send" class="me-2" /> Submit Report
              </Button>               
          </Form>
        </CardBody>
      </Card>

      <!-- Alert Section -->
       <Alert color="danger" class="mt-4 shadow text-light">
        <Icon name="exclamation-circle" class="me-2" /> Ensure all fields are filled accurately before submitting.
      </Alert>
    </Col>
  </Row>
</Container>