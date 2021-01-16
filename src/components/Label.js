import React from 'react';
import { connect } from 'react-redux';
import { selectStation } from '../redux/actions';
import { resetSelection } from '../redux/actions';

const labelStyle = {
    cursor: 'pointer',
  };

const Label = ({
  id, 
  label, 
  station, 
  x, 
  y, 
  route,
  connectedSelectStation,
  deselectStation
}) => {
  return (
    <text
      style={labelStyle} 
      id={'l' + id} 
      x={x} 
      y={y}
      onClick={() => {
        connectedSelectStation(station);
      }}
      onTouchStart={() => {
        connectedSelectStation(station);
      }}
      onBlur={() => deselectStation()}
      fontSize='11' 
      fontWeight={getFontWeight(station, route)}
      fill={getFontColor(station, route)}
      >
        {label}
    </text>
  );
};


const getFontColor = (station, route) => {
    if (route.size > 1) {
        return route.has(station) ? '#000000' : '#d8d8d8';
    }
    return '#000000'
}

const getFontWeight = (station, route) => {
    return route.has(station) ? 'bold' : 'normal';
}

const mapStateToProps = (state) => {
return {
    route: state.railNetwork.route
};
};

const dispatchToProps = (dispatch) => {
    return {
      connectedSelectStation: (name) => dispatch(selectStation(name)),
      deselectStation: () => dispatch(resetSelection())
    };
  };

const ConnectedLabel= connect(mapStateToProps, dispatchToProps)(Label);

export default ConnectedLabel;