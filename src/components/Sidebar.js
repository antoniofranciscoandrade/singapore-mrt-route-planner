import React from 'react';
import OriginDestinationLabel from './OriginDestinationLabel';
import Directions from './Directions';

const sidebarStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  width: '482px',
  padding: '0',
  backgroundColor: '#e4e9ee',
  borderRight: '1px solid #b0b5b8'
};

const sidebarContentStyle = {
  marginTop: '30px',
  width: '85%'
};

const Sidebar = () => {
  return (
    <div style={sidebarStyle}>
      <div style={sidebarContentStyle}>
        <OriginDestinationLabel />
      </div>
      <div style={sidebarContentStyle}>
        <Directions />
      </div>
    </div>
  );
};

export default Sidebar;
