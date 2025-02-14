<script>
  import { Navbar, Nav, NavItem, NavLink, Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Alert, Progress, Spinner } from "@sveltestrap/sveltestrap";

  // Form input values
  let reportTime = "";
  let barangay = "";
  let category = "";
  let cause = "";
  let responseTime = "";
  let fireOutTime = "";
  let structuresInvolved = "";
  let notes = "";
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
          <CardTitle class="text-danger fs-3">
            <i class="bi bi-map me-2"></i>
            <h3>Fire Incident Map</h3>
          </CardTitle>
          <img src="/map.jpg" alt="Map showing fire incidents in Echague" class="img-fluid rounded" style="height: 300px;" />
        </CardBody>
      </Card>

      <Card class="shadow">
        <CardBody>
          <h3 class="text-danger">
            <i class="bi bi-clipboard-data me-2"></i>Incident Results
          </h3>
          <div class="d-flex align-items-start gap-3">
            <img src="/incident.jpg" alt="Incident details image" class="rounded" style="width: 200px;" />
            <div>
              <h5>Incident Details</h5>
              <p><strong>Location:</strong> {barangay}</p>
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Cause:</strong> {cause}</p>
              <p><strong>Time Reported:</strong> {reportTime}</p>
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
          <h3 class="text-danger">
            <i class="bi bi-exclamation-triangle me-2"></i>Incident Report
          </h3>
          <Form>
            <FormGroup>
              <Label for="reportTime">Time Reported:</Label>
              <Input type="datetime-local" id="reportTime" bind:value={reportTime} />
            </FormGroup>
            <FormGroup>
              <Label for="barangay">Location (Barangay):</Label>
              <Input type="text" id="barangay" bind:value={barangay} placeholder="Enter barangay" />
            </FormGroup>
            <FormGroup>
              <Label for="category">Incident Category:</Label>
              <Input type="text" id="category" bind:value={category} placeholder="Enter category" />
            </FormGroup>
            <FormGroup>
              <Label for="cause">Probable Cause:</Label>
              <Input type="text" id="cause" bind:value={cause} placeholder="Enter cause" />
            </FormGroup>
            <FormGroup>
              <Label for="responseTime">Time of Arrival:</Label>
              <Input type="datetime-local" id="responseTime" bind:value={responseTime} />
            </FormGroup>
            <FormGroup>
              <Label for="fireOutTime">Time Fire Out:</Label>
              <Input type="datetime-local" id="fireOutTime" bind:value={fireOutTime} />
            </FormGroup>
            <FormGroup>
              <Label for="structuresInvolved">Affected Structures:</Label>
              <Input type="text" id="structuresInvolved" bind:value={structuresInvolved} placeholder="Enter structures involved" />
            </FormGroup>
            <FormGroup>
              <Label for="notes">Additional Details:</Label>
              <Input type="textarea" id="notes" bind:value={notes} rows="3" placeholder="Enter additional details" />
            </FormGroup>
            <Button color="danger" class="w-100">
              <i class="bi bi-send me-2"></i>Submit Report
            </Button>
          </Form>
        </CardBody>
      </Card>

      <!-- Alert Section -->
      <Alert color="warning" class="mt-4 shadow">
        <i class="bi bi-exclamation-circle me-2"></i>
        Ensure all fields are filled accurately before submitting.
      </Alert>
    </Col>
  </Row>
</Container>

<!-- Spinner for Loading State -->
<Spinner type="border" color="danger" class="d-block mx-auto my-4" />
