import React from 'react';

import '@google/model-viewer';

function FlowerModelViewer() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <model-viewer
        src="/assets/models/flower.glb"
        alt="A 3D model of a flower"
        auto-rotate
        camera-controls
        shadow-intensity="1"
        style={{ width: '600px', height: '400px' }}
      ></model-viewer>
    </div>
  );
}

export default FlowerModelViewer;
