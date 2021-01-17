import React, { useRef } from 'react';
import Station from './Station';
import Label from './Label';
import { resetSelection } from '../redux/actions';
import { connect } from 'react-redux';
import useOutsideClick from '../hooks/useOutsideClick';

export const Lines = ({ lines, stations, labels, deselectStations }) => {
  useOutsideClick(['rect', 'svg', 'path'], () => {
    deselectStations();
  });

  const plotLines = [...lines].map((line) => (
    <g
      key={line.id}
      id={line.id}
      fill='none'
      stroke={line.color}
      strokeWidth='4'
    >
      {line.paths.map((path, i) => (
        <path key={line.id + i.toString()} d={path} />
      ))}
    </g>
  ));

  const plotStations = [...stations].map((station) => (
    <Station
      key={station.id}
      id={station.id}
      name={station.name}
      cx={station.cx}
      cy={station.cy}
    />
  ));

  const plotLabels = [...labels].map((label) => (
    <Label
      key={label.id}
      id={label.id}
      label={label.label}
      station={label.station}
      x={label.x}
      y={label.y}
    />
  ));

  return (
    <>
      {plotLines}
      <g>
        {plotStations}
        {plotLabels}
      </g>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    stations: state.railNetwork.stations,
    lines: state.railNetwork.lines,
    labels: state.railNetwork.labels
  };
};

const dispatchToProps = (dispatch) => {
  return {
    deselectStations: (name) => dispatch(resetSelection())
  };
};

const ConnectedLines = connect(mapStateToProps, dispatchToProps)(Lines);

export default ConnectedLines;
