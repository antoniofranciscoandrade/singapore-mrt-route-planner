import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RailNetwork from './components/RailNetwork';

const verticalContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const horizontalContainerStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const sidebarStyle = {
  flex: '1'
};

const railNetworkStyle = {
  flex: '3'
};

const App = () => {
  return (
    <div style={verticalContainerStyle}>
      <Navbar />
      <div style={horizontalContainerStyle}>
        <div style={sidebarStyle}>
          <Sidebar />
        </div>
        <div style={railNetworkStyle}>
          <RailNetwork />
        </div>
      </div>
    </div>
  );
};

export default App;
