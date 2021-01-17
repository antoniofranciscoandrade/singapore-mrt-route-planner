import React from 'react';
import Logo from '../assets/logo.svg';
import Typography from '@material-ui/core/Typography';

const navbarStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '65px',
  width: '100%',
  minWidth: '100%',
  backgroundColor: '#34688f',
  color: 'white',
  borderBottom: '1px solid #b0b5b8'
};

const logoStyle = {
  width: '45px',
  height: '45px',
  marginLeft: '15px',
  marginRight: '15px'
};

const Navbar = () => {
  return (
    <div style={navbarStyle}>
      <img src={Logo} alt='logo' style={logoStyle} />
      <Typography variant='h5'>Singapore MRT Route Planner</Typography>
    </div>
  );
};

export default Navbar;
