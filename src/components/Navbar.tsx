import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // For search icon
// import { useLogoutMutation } from '../redux/apis/authApi';
import { toast } from 'sonner';
import { useLogoutMutation } from '../redux/apis/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
// import { RootState } from '@reduxjs/toolkit/query';

const NavbarComponent: React.FC = () => {
    const [logout, { isSuccess }] = useLogoutMutation();
    const { user } = useSelector((state: RootState) => state.user);
    // console.log(user);
    
    useEffect(() => {
      if (isSuccess) {
        toast.success("Logout Successful");
      }
    
    }, [isSuccess]);

    return (
      <Navbar className="mb-5" bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          {user ? (
            <>
              {user.name}
            </>
          ) : (
            <>
              Dockky
            </>
          )}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Home Link */}
            <Nav.Link>
              <Link className="text-light text-decoration-none" to="/">
                Home
              </Link>
            </Nav.Link>
            {/* Add Doc Link */}
            <Nav.Link>
              <Link className="text-light text-decoration-none" to="/doc-form">
                Add Doc
              </Link>
            </Nav.Link>

            {/* Logout Link (Visible only if user is logged in) */}
            {/* {user && (
              <Nav.Link
                onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                  e.preventDefault();
                  logout("");
                }}
              >
                Logout
              </Nav.Link>
            )} */}

            {/* More dropdown menu */}
            <NavDropdown title="More" id="basic-nav-dropdown">
              {/* <NavDropdown.Item href="#about">About</NavDropdown.Item>
              <NavDropdown.Item href="#contact">Contact</NavDropdown.Item>
              <NavDropdown.Item href="#help">Help</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button onClick={logout} className='w-100 btn-danger'>Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>

            {/* Search Bar */}
            <Nav.Item>
              <Form className="d-flex ms-3">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">
                  <FaSearch />
                </Button>
              </Form>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default NavbarComponent;
