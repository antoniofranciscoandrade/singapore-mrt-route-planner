import Graph from 'graph-data-structure';

export const pairElementWithArrayElements = (sourceElement, destinationArray) =>
  destinationArray.map((element) => [sourceElement, element]);

export const getAllPairsOfArrayElements = (array) => {
  const result = array.flatMap((station, index, array) =>
    pairElementWithArrayElements(station, [
      ...array.slice(0, index),
      ...array.slice(index + 1, array.length),
    ])
  );
  return result;
};

const addAllEdges = (edges, graph = Graph()) => {
  if (edges.length === 1) {
    return graph.addEdge(edges[0][0], edges[0][1]);
  } else {
    return addAllEdges(edges.slice(1), graph.addEdge(edges[0][0], edges[0][1]));
  }
};

const addInterchangeEdges = (interchanges, graph = Graph()) => {
  const interchangeStations = interchanges.map(
    (interchange) => interchange.stations
  );
  const pairsOfStations = interchangeStations.flatMap((item) =>
    getAllPairsOfArrayElements(item)
  );
  return addAllEdges(pairsOfStations, graph);
};

const addLineToGraph = (stations, graph) =>
  addAllBidirectionalEdges(stations, addNodes(stations, graph));

const addNodes = (stations, graph = Graph()) =>
  stations.length === 1
    ? graph.addNode(stations[0].name)
    : addNodes(stations.slice(1), graph.addNode(stations[0].name));

const addAllBidirectionalEdges = (stations, graph = Graph()) =>
  stations.length === 2
    ? addBidirectionalEdge(stations[0].name, stations[1].name, graph)
    : addAllBidirectionalEdges(
        stations.slice(1),
        addBidirectionalEdge(stations[0].name, stations[1].name, graph)
      );

const addBidirectionalEdge = (sourceNode, destinationNode, graph = Graph()) =>
  graph
    .addEdge(sourceNode, destinationNode)
    .addEdge(destinationNode, sourceNode);

export const buildGraph = (linesList, interchanges, graph = Graph()) => {
  if (linesList.length === 1) {
    return addInterchangeEdges(
      interchanges,
      addLineToGraph(linesList[0], graph)
    );
  } else {
    return buildGraph(
      linesList.slice(1),
      interchanges,
      addLineToGraph(linesList[0], graph)
    );
  }
};

export const dijkstra = (startStationId, destinationStationId, stationsGraph) => 
  stationsGraph.shortestPath(startStationId, destinationStationId);

const getLineDirection = (directions, i) => {
  if (
      directions[i].direction === directions[i].name || 
      directions[i].line === 'Circle'
    ){
    return directions[i + 1].name
  }
  return directions[i].direction
}

const directionsToString = (directions) => {
  let directionStrings = [[
    `Enter at `,
    `${directions[0].name}`,
    ` and take the `,
    `${directions[0].line}`,
    ` line towards `,
    `${getLineDirection(directions, 0)}`,
    `.`
  ]]
  for (let i = 1; i < directions.length -1; i++){
    directionStrings.push([
      `Exit at `,
      `${directions[i].name}`,
      ` and take the `,
      `${directions[i].line}`,
      ` line towards `,
      `${getLineDirection(directions, i)}`,
      `.`
    ])
  }
  directionStrings.push([
    `Exit at `,
    `${directions[directions.length - 1].name}`,
    `.`
  ])
  return directionStrings
}

export const getDirections = (route, lines) => {
  if (route.length < 2) return []
  let directions = []
  let prevLine = ''
  const allLines = []
  Object.values(lines).forEach( line => {
    allLines.push(line)
    if (line[0].name === line[line.length - 1].name) allLines.push([...line].reverse())
  })

  for (let curr = 0; curr < route.length - 1; curr++) {
    const routeStation = route[curr]
    const nextStation = route[curr + 1]
    for (const line of allLines) {
      const foundIdx = line.findIndex(station => station.name === routeStation)
      if (foundIdx === -1) continue
      const linePrevStation = 
        foundIdx === 0 ? '' : line[foundIdx - 1].name
      const lineNextStation = 
        foundIdx === line.length - 1 ? '' : line[foundIdx + 1].name
      const isWrongLine = 
        nextStation !==  lineNextStation && nextStation !== linePrevStation
      if (isWrongLine) continue
      let direction 
      if (foundIdx === line.length - 1){
        direction = line[0].name
      } else {
        direction = 
          nextStation === line[foundIdx + 1].name ? line[line.length - 1].name : line[0].name
      }
      
      if (line[0].line !== prevLine) {
        directions.push({
          name: routeStation,
          line: line[0].line,
          direction
        })
        prevLine = line[0].line
      } else if (direction !== directions[directions.length - 1].direction) {
        directions[directions.length - 1].direction = direction
      }
    }
  }
  directions.push({
    name: route[route.length - 1],
    line: directions[directions.length - 1].line,
    direction: 'exit'
  })
  return directionsToString(directions)
};

    