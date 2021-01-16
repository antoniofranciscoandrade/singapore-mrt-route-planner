import { buildGraph, dijkstra, getDirections } from '../helpers/graph';
import lines from '../../data/lines.json';
import stations from '../../data/stations.json';
import interchanges from '../../data/interchanges.json';
import labels from '../../data/labels.json';

const railNetwork = (
  state = {
    startStation: '',
    destinationStation: '',
    lines: lines,
    labels: Object.values(labels).flat(),
    stations: Object.values(stations).flat(),
    rawStations: stations,
    graph: buildGraph(
      Object.values(stations),
      interchanges
    ),
    route: new Set(),
    directions: []
  },
  action
) => {
  switch (action.type) {
    case 'SELECT_STATION':
      if (state.startStation === '') {
        const newRoute = new Set();
        newRoute.add(action.name);
        return { 
          ...state, 
          startStation: action.name,
          route: newRoute
        };
      } else if (state.destinationStation === '') {
        const shortestPath = dijkstra(state.startStation, action.name, state.graph)
        return {
          ...state,
          destinationStation: action.name !== state.startStation ? action.name : '',
          route: new Set(shortestPath),
          directions: getDirections(shortestPath, state.rawStations)
        };
      } else {
        const newRoute = new Set();
        newRoute.add(action.name);
        return {
          ...state,
          startStation: action.name,
          destinationStation: '',
          directions: [],
          route: newRoute,
        };
      }
    case 'RESET_SELECTION':
      return {
        ...state,
        startStation: '',
        destinationStation: '',
        route: new Set(),
        directions: []
      }
    default:
      return state;
  }
}

export default railNetwork