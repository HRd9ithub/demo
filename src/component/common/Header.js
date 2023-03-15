import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Button from './Button';

function Header() {
  return (
    <Navbar bg="light" expand="lg" sticky='top'>
      <Container>
        <NavLink to="/" className="navbar-brand">
             Hotel
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              <div className='d-flex flex-column align-items-center'>
                <span><i className="fa-solid fa-user"></i></span>
                <span> Home</span>
              </div>
            </NavLink>
            <NavLink to="/room-list" className="nav-link">
              <div className='d-flex flex-column align-items-center'>
                <span><i className="fa-solid fa-door-open"></i></span>
                <span> Rooms</span>
              </div>
            </NavLink>
            <NavLink to="/booking" className="nav-link">
              <div className='d-flex flex-column align-items-center'>
                <span><i className="fa-solid fa-calendar"></i></span>
                <span>Bookings</span>
              </div>
            </NavLink>
            <Button />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;