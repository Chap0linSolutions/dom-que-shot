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
  exit,
}: PopupProps) {
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
    gsap.to('.PopupContainer', releaseProps);
  };

  const hidePopup = () => {
    gsap.to('.PopupContainer', hideProps);
  };

  if (show === true) {
    releasePopup();
  } else {
    hidePopup();
  }

  const popupStyle = {
    height: (height)? `${height}px` : 'auto',
    backgroundColor: (backgroundColor)? backgroundColor : '#ffffff',
    opacity: 0.95,
  }

  return (
    <div className={`PopupContainer ${comesFromTop ? 'Top' : 'Bottom'}`}>
      <div className="PopupDiv" style={popupStyle}>
        <div className="PopupHeader">
          <p className="PopupTitle" style={(titleColor? {color: titleColor} : {})}>{title}</p>
          <X color="#170C32" width="24px" strokeWidth="5px" onClick={exit} />
        </div>
        <p className="PopupDescription" style={(descriptionColor)? {color: descriptionColor} : {}}>{description}</p>
      </div>
    </div>
  );
}
