import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const textFieldProps = {
  readOnly: true,
  style: {
    fontSize: 14
  }
};

const textFieldStyle = {
  marginBottom: '15px'
};

const useStyles = makeStyles({
  label: {
    '&$focusedLabel': {
      color: '#78909c'
    }
  },
  focusedLabel: {},
  underline: {
    '&&&:before': {
      borderBottom: '1px solid #78909c'
    },
    '&&:after': {
      borderBottom: '1px solid #78909c'
    }
  },
  focused: {}
});

const OriginDestinationLabel = ({ startStation, destinationStation }) => {
  const classes = useStyles();

  return (
    <>
      <div style={textFieldStyle}>
        <TextField
          id='startStation'
          label='Starting Station'
          value={getStartingStation(startStation)}
          inputProps={textFieldProps}
          InputProps={{ classes }}
          InputLabelProps={{
            classes: {
              root: classes.label,
              focused: classes.focusedLabel
            }
          }}
          fullWidth
        />
      </div>
      <div style={textFieldStyle}>
        <TextField
          id='destinationStation'
          label='Destination Station'
          value={getDestinationStation(startStation, destinationStation)}
          inputProps={textFieldProps}
          InputProps={{ classes }}
          InputLabelProps={{
            classes: {
              root: classes.label,
              focused: classes.focusedLabel
            }
          }}
          fullWidth
        />
      </div>
    </>
  );
};

const getStartingStation = (startStation) =>
  startStation
    ? startStation
    : 'Choose starting station by clicking on the map...';

const getDestinationStation = (startStation, destinationStation) => {
  if (!startStation && !destinationStation) {
    return 'Choose destination after starting station is selected...';
  }
  if (startStation && !destinationStation) {
    return 'Choose destination station by clicking on the map...';
  }
  return destinationStation;
};

const mapStateToProps = (state) => {
  return {
    startStation: state.railNetwork.startStation,
    destinationStation: state.railNetwork.destinationStation
  };
};

const ConnectedOriginDestinationLabel = connect(mapStateToProps)(
  OriginDestinationLabel
);

export default ConnectedOriginDestinationLabel;
