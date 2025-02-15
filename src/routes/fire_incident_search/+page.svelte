<script lang="ts">
  import {
    Button,
    Input,
    Table,
    Alert,
    Row,
    Col,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Icon,
    Collapse,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    CardTitle,
    CardSubtitle,
    CardText,
    FormGroup,
    Form,
    Styles
  } from '@sveltestrap/sveltestrap';

  interface Data {
    date: string;
    purok: string;
    barangay: string;
    year: number;
  }

  let sampleData: Data[] = [
    { date: "2023-10-01", purok: "Purok 1", barangay: "Barangay A", year: 2023 },
    { date: "2023-09-25", purok: "Purok 2", barangay: "Barangay B", year: 2023 },
    { date: "2023-09-20", purok: "Purok 3", barangay: "Barangay C", year: 2023 },
    { date: "2023-09-15", purok: "Purok 4", barangay: "Barangay D", year: 2023 },
  ];

  let searchTerm = "";
  let filteredData = sampleData;
  let isOpen = false;

  function performSearch() {
    filteredData = sampleData.filter(
      (item) =>
        item.date.includes(searchTerm) ||
        item.purok.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.year.toString().includes(searchTerm)
    );
  }

  function getResultsSummary(data: Data[]) {
    if (data.length === 0) {
      return "No results found. Please refine your search.";
    }

    const totalIncidents = data.length;
    const barangays = [...new Set(data.map((item) => item.barangay))];
    const mostCommonBarangay = barangays.reduce((acc, barangay) => {
      const count = data.filter((item) => item.barangay === barangay).length;
      return count > acc.count ? { barangay, count } : acc;
    }, { barangay: "", count: 0 });

    return `
      A total of <strong>${totalIncidents} fire incidents</strong> were found matching your search criteria. 
      The incidents occurred across <strong>${barangays.length} different barangays</strong>, with the majority 
      concentrated in <strong>${mostCommonBarangay.barangay}</strong> (${mostCommonBarangay.count} incidents). 
      <br><br>
    `;
  }
</script>

<Styles />

<Navbar color="danger" dark expand="md">
  <NavbarBrand href="/">
    <img src="bfp_logo.jpg" alt="Bureau of Fire Protection Logo" width="50" height="auto" />
    Bureau of Fire Protection
  </NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar>
    <Nav navbar class="ms-auto">
      <NavItem>
        <NavLink href="#search">Search Fire Incident</NavLink>
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret>Profile</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>

<Container class="mt-4">
  <Row>
    <Col>
      <Card>
        <CardHeader>
          <CardTitle class="text-danger">Search Fire Incident</CardTitle>
          <CardSubtitle>Enter your search criteria below</CardSubtitle>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Input type="text" bind:value={searchTerm} placeholder="Enter search term..." class="border-danger rounded" />
            </FormGroup>
            <Button color="primary" on:click={performSearch}>Search</Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </Row>

  <Row class="mt-4">
    <Col md="8">
      <Card>
        <CardHeader>
          <CardTitle class="text-danger">Search Results</CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered striped hover>
            <thead>
              <tr class="table-danger">
                <th>Date</th>
                <th>Purok</th>
                <th>Barangay</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredData as item}
                <tr>
                  <td>{item.date}</td>
                  <td>{item.purok}</td>
                  <td>{item.barangay}</td>
                  <td>{item.year}</td>
                </tr>
              {/each}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
    <Col md="4">
      <Card>
        <CardHeader>
          <CardTitle class="text-danger">Summary</CardTitle>
        </CardHeader>
        <CardBody>
          <Alert color="danger">
            <h3>Short Description of Results</h3>
            <p>{@html getResultsSummary(filteredData)}</p>
          </Alert>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>