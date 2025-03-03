<script lang="ts">
    import { Navbar, Container, Nav, NavItem, NavLink } from "@sveltestrap/sveltestrap";

    let { children } = $props();
</script>

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

<Container fluid class="m-0 p-0">
    {@render children()}
</Container>