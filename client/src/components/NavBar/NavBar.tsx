'use client'

import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

export default function NavBar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Пример состояния для пользователя

  const logOut = () => {
    setIsUserLoggedIn(false); // Логика выхода
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ zIndex: 1000000000 }}>
      <Container>
        <Navbar.Brand href="/">Games Observer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            <Nav.Link href="/games">Games</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {!isUserLoggedIn && (
              <>
                <Button
                  href="/login"
                  size="sm"
                  className="my-2 ms-1 my-sm-2"
                  style={{ color: 'chartreuse' }}
                >
                  Login
                </Button>
                <Button
                  href="/sign-up"
                  size="sm"
                  className="my-2 ms-1 my-sm-2"
                  style={{ color: 'chartreuse' }}
                >
                  SignUp
                </Button>
              </>
            )}

            {isUserLoggedIn && (
              <NavDropdown title={<em>User</em>} align="end">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


