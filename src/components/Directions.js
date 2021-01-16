import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TransitEnterexitSharpIcon from '@material-ui/icons/TransitEnterexitSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import DirectionsWalkSharpIcon from '@material-ui/icons/DirectionsWalkSharp';
import { connect } from 'react-redux';

const Directions = ({ directions, lines, stations }) => {
    const getIcon = (i) => {
        if (i === 0) return <TransitEnterexitSharpIcon/>
        if (i === directions.length - 1) return <ExitToAppSharpIcon/>
        return <DirectionsWalkSharpIcon/>
    }

    const lineColors = lines.reduce((obj, line) => ({...obj, [line.name]: line.color}), {});
    const stationNames = stations.reduce((set, station) => {
        set.add(station.name) 
        return set
    }, new Set());

    const getSubstringStyle = (substring, i) => {
        const style = { fontSize: 14 }
        if (substring in lineColors && i === 3) {
            style.color = lineColors[substring]
        }
        if (substring in lineColors || stationNames.has(substring)) {
            style.fontWeight = 700
        }
        return style
    }
        
    const formatDirection = (line) => (
        <>
        {line.map( (substring, i) => (
            <Typography 
                key={i}
                type="body2" 
                display='inline'
                style={getSubstringStyle(substring, i)}
                >
                    {substring}
            </Typography>
        ))}
        </>
    )

    return (
    <>
    {directions.length > 0 && (
        <Typography variant="h6" style={{fontSize:16}}>
        Directions
        </Typography>
    )}
    <List dense={true}>
              {directions.map( (line, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                        {getIcon(i)}
                    </ListItemIcon>
                    
                    <ListItemText
                        
                        primary={formatDirection(line)}
                    />
                    
                </ListItem>
              ))}
    </List>
    </>
    )
}


const mapStateToProps = (state) => {
    return {
      directions: state.railNetwork.directions,
      lines: state.railNetwork.lines,
      stations: state.railNetwork.stations
    };
  };

const ConnectedDirections = connect(mapStateToProps)(Directions);

export default ConnectedDirections