import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import * as routes from '../routes/routes';

const Header = (props) => {
  let navigate = useNavigate();

  const onAboutClicked = () => {
    navigate(routes.ABOUT);
  };
  const onEntriesClicked = () => {
    navigate(routes.ENTRIES);
  };
  const homeClicked = () => {
    navigate(routes.HOME);
  }
  
  const submitNavClicked = () => {
    navigate(routes.SUBMIT);
  }

  return (
    <div className="header">
      <Navbar expand="lg">
        <Navbar.Brand onClick={homeClicked}>
          {' '}
          <div style={{ paddingLeft: 10 }}>
            CommunityFT
            {/* <img
              alt="Company logo"
              src={`${process.env.REACT_APP_REACT_URL}/checklist.png`}
              style={{ paddingLeft: 5, paddingBottom: 5, width: 35 }}
            /> */}
          </div>
          {' '}

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent: 'end'}}>
          <Nav className="ml-auto">
            <Nav.Link onClick={onAboutClicked}> About </Nav.Link>
            <Nav.Link onClick={onEntriesClicked}> Entries </Nav.Link>
            <Nav.Link onClick={submitNavClicked}> Submit </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Divider />
    </div>
  );
};

export default Header;
