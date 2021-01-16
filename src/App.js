import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import RailNetwork  from './components/RailNetwork'

const verticalContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const horizontalContainerStyle = {
  display: 'flex',
  flexDirection: 'row'
}

const itemStyle = {
  flex: '1'
}

const App = () => {

  return (
    <div style={verticalContainerStyle}>
      <Navbar/>
      <div style={horizontalContainerStyle}>
        <div style={itemStyle}>
          <Sidebar />
        </div>
        <div style={itemStyle}>
          <RailNetwork/>
        </div>
      </div>
    </div>
  );
};

export default App