import React, { useEffect, useState } from 'react';
import Lines from './Lines'
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_AUTO } from 'react-svg-pan-zoom';

const RailNetwork = () => {
  const [value, setValue] = useState({
    INITIAL_VALUE,
  });

  const [tool, setTool] = useState(TOOL_AUTO);

  let Viewer = null;

  useEffect(() => {
    Viewer.fitSelection(-200, -25, 1750, 0);
  }, [Viewer]);

  const svg = (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='1410'
      height='1007'
    >
      <Lines/>
    </svg>
  );

  return (
      <ReactSVGPanZoom
        background='#f9fbfd'
        width={1085}
        height={655}
        ref={(newViewer) => (Viewer = newViewer)}
        tool={tool}
        value={value}
        onChangeValue={(nextValue) => setValue(nextValue)}
        miniatureProps={{ position: 'none' }}
        detectPinchGesture
        detectAutoPan={false}
        onChangeTool={(nextTool) => setTool(nextTool)}
        scaleFactorMax={2}
        scaleFactorMin={0.4}
        disableDoubleClickZoomWithToolAuto
        toolbarProps={{ position: 'none' }}
      >
        {svg}
      </ReactSVGPanZoom>
  );
};

export default RailNetwork