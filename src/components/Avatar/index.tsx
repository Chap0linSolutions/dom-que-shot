import React from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

interface AvatarProps {
  seed: string;
  size?: number | string;
}

export default function ({ seed, size }: AvatarProps) {
  const source = `data:image/svg+xml;utf8,${encodeURIComponent(
    createAvatar(style, { seed: seed })
  )}`;

  if(size) return <img width={size} height={size} src={source} alt="" />;
  return <img src={source} alt="" />;
}
