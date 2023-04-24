import React from 'react';
import './Background.css';

interface BackgroundProps {
  color?: string;
  noImage?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export default function Background(props: BackgroundProps) {
  const classes = props.noImage ? 'AppBackground' : 'AppBackgroundWithImage';
  return (
    <div
      data-testid="background"
      className={classes}
      style={props.color ? { backgroundColor: props.color } : {}}>
      <div id="external-container" className="external-container">
        {props.children}
      </div>
    </div>
  );
}
