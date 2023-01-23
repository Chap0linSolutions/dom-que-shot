import React from 'react';
import './Roulette.css';

interface RouletteProps {
  width?: number;
  height?: number;
  children: React.ReactNode | React.ReactNode[];
}

export default function Roulette({ width, height, children }: RouletteProps) {
  const bodyStyle = {
    width: width ? width : undefined,
    height: height ? height : undefined,
  };

  const detailStyle = {
    width: width ? Math.round(0.87 * width) : undefined,
  };

  return (
    <div className="Roulette">
      <div className="RouletteDetail Upper" style={detailStyle} />

      <div className="RouletteCenter" style={bodyStyle}>
        {children}
      </div>

      <div className="RouletteDetail Lower" style={detailStyle} />
    </div>
  );
}
