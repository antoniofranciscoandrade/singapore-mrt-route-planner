import 'core-js';
import React from 'react';
import App from './App';
import RailNetwork from './components/RailNetwork';
import OriginDestinationLabel from './components/OriginDestinationLabel';
import Sidebar from './components/sidebar';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import store from './redux';

const wrapStore = (component) => <Provider store={store}>{component}</Provider>;

const testStations = {
  startStation: {
    id: 'te30',
    name: 'Bedok South',
    line: 'Thomson-East Coast'
  },
  intermediateStation: {
    id: 'ie54',
    name: 'Sungei Bedok',
    line: 'Thomson-East Coast'
  },
  destinationStation: {
    id: 'dt36',
    name: 'Xilin',
    line: 'Downtown'
  }
};

describe('render components', () => {
  test('renders App component without crashing', () => {
    shallow(wrapStore(<App />));
  });
  test('renders RailNetwork component without crashing', () => {
    const wrapper = mount(wrapStore(<App />));
    const railNetwork = <RailNetwork />;
    expect(wrapper.contains(railNetwork)).toEqual(true);
  });
  test('renders OriginDestinationLabel labels correctly', () => {
    const wrapper = mount(
      wrapStore(
        <OriginDestinationLabel
          startStation={testStations.startStation.name}
          destinationStation={testStations.destinationStation.name}
        />
      )
    );
    const startStation = wrapper.find('input#startStation').prop('value');
    const destinationStation = wrapper
      .find('input#destinationStation')
      .prop('value');
    expect(startStation).toEqual(testStations.startStation.name);
    expect(destinationStation).toEqual(testStations.destinationStation.name);
  });
});

describe('shortest path and direction correctness', () => {
  const wrapper = mount(wrapStore(<App />));
  wrapper.find(`circle#${testStations.startStation.id}`).simulate('click');
  wrapper
    .find(`circle#${testStations.destinationStation.id}`)
    .simulate('click');
  test('all stations in shortest path are selected', () => {
    for (const routeStation of Object.values(testStations)) {
      expect(
        wrapper.find(`circle#${routeStation.id}`).prop('strokeWidth')
      ).toEqual('3');
    }
  });
  test('directions include all stations and lines', () => {
    const directions = wrapper.find(`ul#directions`).text();
    for (const routeStation of Object.values(testStations)) {
      const hasStation = directions.includes(routeStation.name);
      const hasLine = directions.includes(routeStation.line);
      expect(hasStation && hasLine).toEqual(true);
    }
  });
});

describe('snapshots', () => {
  test('App snapshots', () => {
    const tree = shallow(wrapStore(<App />));
    expect(toJson(tree)).toMatchSnapshot();
  });
  test('Railnetwork snapshots', () => {
    const railNetworkTree = shallow(wrapStore(<RailNetwork />));
    expect(toJson(railNetworkTree)).toMatchSnapshot();
  });
  test('Sidebar snapshots', () => {
    const sidebarTree = shallow(wrapStore(<Sidebar />));
    expect(toJson(sidebarTree)).toMatchSnapshot();
  });
});
