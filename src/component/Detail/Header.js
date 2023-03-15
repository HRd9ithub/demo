import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="light" expand="lg" sticky='top'>
      <Container>
        <NavLink to="/hotel_detail" className="navbar-brand">Admin-panel</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/hotel_detail" className="nav-link">
              <div className='d-flex flex-column align-items-center'>
                <span><i className="fa-solid fa-user"></i></span>
                <span> Hotel Profile</span>
              </div>
            </NavLink>
            <NavLink to="/add" className="nav-link">
              <div className='d-flex flex-column align-items-center'>
                <span><i className="fa-solid fa-bag-shopping"></i></span>
                <span> Add Details</span>
              </div>
            </NavLink>
            <NavLink to="/room" className="nav-link">
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
            <NavLink to="/" className="nav-link" onClick={() => localStorage.removeItem('admin_Id')}>
              <div className='d-flex flex-column align-items-center'>
                <span><i className="fa-solid fa-right-from-bracket"></i></span>
                <span>Log Out</span>
              </div>
            </NavLink>

            {/* <NavLink to="" className="nav-link">Log Out</NavLink> */}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;