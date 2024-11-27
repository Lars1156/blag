import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";  

function NavigationBar() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">Blog System</Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Navigation Links */}
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {/* Dropdown for Blog Categories */}
            <NavDropdown title="Categories" id="nav-dropdown">
              <NavDropdown.Item as={Link} to="#">Technology</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Lifestyle</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Health</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Business</NavDropdown.Item>
            </NavDropdown>

            {/* User Account Links */}
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
