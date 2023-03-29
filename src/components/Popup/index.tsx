import React, { useRef } from 'react';
import { X } from 'react-feather';
import gsap from 'gsap';
import './Popup.css';

interface PopupProps {
  height?: number;
  title: string;
  description: JSX.Element | string;
  show: boolean;
  comesFromTop?: boolean;
  titleColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  border?: string;
  exit: () => void;
}

export default function Popup({
  height,
  title,
  description,
  show,
  comesFromTop,
  titleColor,
  descriptionColor,
  backgroundColor,
  border,
  exit,
}: PopupProps) {

  const popupRef = useRef();

  const releaseProps = comesFromTop
    ? {
        scale: 1,
        top: 75,
        duration: 0.6,
        ease: 'power2',
      }
    : {
        scale: 1,
        bottom: 20,
        duration: 0.6,
        ease: 'power2',
      };

  const hideProps = comesFromTop
    ? {
        scale: 0,
        top: -280,
        duration: 0.6,
        ease: 'power2',
      }
    : {
        scale: 0,
        bottom: -280,
        duration: 0.6,
        ease: 'power2',
      };

  const releasePopup = () => {
    gsap.to(popupRef.current, releaseProps);
  };

  const hidePopup = () => {
    gsap.to(popupRef.current, hideProps);
  };

  if (show === true) {
    releasePopup();
  } else {
    hidePopup();
  }

  const popupStyle = {
    height: height ? `${height}px` : 'auto',
    backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
    border: border? border : 'none',
    opacity: 0.95,
  };

  return (
    <div ref={popupRef} className={`PopupContainer ${comesFromTop ? 'Top' : 'Bottom'}`}>
      <div className="PopupDiv" style={popupStyle}>
        <div className="PopupHeader">
          <p
            className="PopupTitle"
            style={titleColor ? { color: titleColor } : {}}>
            {title}
          </p>
          <X color="#170C32" width="24px" strokeWidth="5px" onClick={exit} />
        </div>
        <div
          className="PopupDescription"
          style={descriptionColor ? { color: descriptionColor } : {}}>
          {description}
        </div>
      </div>
    </div>
  );
}
