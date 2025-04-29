import React from 'react';
import Typography from './Typography';
import ColorPicker from './ColorPicker';
import SpacingControls from './SpacingControls';
import BorderControls from './BorderControls';
import BackgroundControls from './BackgroundControls';

const StylePanel: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <Typography />
      <ColorPicker />
      <SpacingControls />
      <BorderControls />
      <BackgroundControls />
    </div>
  );
};

export default StylePanel; 