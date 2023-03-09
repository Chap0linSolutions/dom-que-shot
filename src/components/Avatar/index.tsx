import React from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';

interface AvatarProps {
  seed: string;
}

export default function ({ seed }: AvatarProps) {
  const source = `data:image/svg+xml;utf8,${encodeURIComponent(
    createAvatar(style, { seed: seed })
  )}`;

  return <img src={source} alt="" />;
}
