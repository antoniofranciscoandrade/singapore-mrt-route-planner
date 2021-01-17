import React from 'react';
import { connect } from 'react-redux';
import { selectStation } from '../redux/actions';

const stationStyle = {
  cursor: 'pointer'
};

export const Station = ({
  cx,
  cy,
  id,
  name,
  route,
  connectedSelectStation,
  deselectStation
}) => {
  return (
    <circle
      id={id}
      style={stationStyle}
      onClick={() => {
        connectedSelectStation(name);
      }}
      onTouchStart={() => {
        connectedSelectStation(name);
      }}
      onBlur={() => deselectStation()}
      fill='#FFFFFF'
      stroke={getStroke(name, route)}
      strokeWidth={getStationStrokeWidth(name, route)}
      strokeMiterlimit='10'
      cx={cx}
      cy={cy}
      r={getStationRadius(name, route)}
    />
  );
};

const getStationRadius = (name, route) => (route.has(name) ? '10' : '6');

const getStationStrokeWidth = (name, route) => (route.has(name) ? '3' : '1');

const getStroke = (name, route) => {
  if (route.size > 1) {
    return route.has(name) ? '#000000' : '#d8d8d8';
  }
  return '#000000';
};

const mapStateToProps = (state) => {
  return {
    route: state.railNetwork.route
  };
};

const dispatchToProps = (dispatch) => {
  return {
    connectedSelectStation: (name) => dispatch(selectStation(name))
  };
};

const ConnectedStation = connect(mapStateToProps, dispatchToProps)(Station);

export default ConnectedStation;
