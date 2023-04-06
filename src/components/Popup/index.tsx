import { useEffect, useRef } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle } from 'react-feather';
import cookieIcon from './assets/cookie.png';
import gsap from 'gsap';
import './Popup.css';
interface PopupProps {
  type: 'info' | 'warning' | 'cookies';
  warningType?: 'success' | 'alert' | 'failure';
  height?: number;
  title?: string;
  description: JSX.Element | string;
  show: boolean;
  comesFromTop?: boolean;
  titleColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  exit?: () => void;
}

export default function Popup({
  type,
  warningType,
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
  const infoRef = useRef();
  const warningRef = useRef();
  const cookieRef = useRef();

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
    let ref = infoRef;
    if (type === 'warning') ref = warningRef;
    if (type === 'cookies') ref = cookieRef;
    gsap.to(ref.current, releaseProps);
  };

  const hidePopup = () => {
    let ref = infoRef;
    if (type === 'warning') ref = warningRef;
    if (type === 'cookies') ref = cookieRef;
    gsap.to(ref.current, hideProps);
  };

  useEffect(() => {
    if (show === true) {
      releasePopup();
    } else {
      hidePopup();
    }
  }, [show]);

  const popupStyle = {
    height: height ? `${height}px` : 'auto',
    backgroundColor: backgroundColor ? backgroundColor : '#ffffff',
    paddingTop: title ? '20px' : 0,
  };

  const getIcon = () => {
    switch (warningType) {
      case 'success':
        return <CheckCircle color="lime" width={24} height={24} />;
      case 'alert':
        return <AlertTriangle color="gold" width={24} height={24} />;
      case 'failure':
        return <XCircle color="red" width={24} height={24} />;
      default:
        return null;
    }
  };

  switch (type) {
    case 'cookies':
      return (
        <div ref={cookieRef} className={`CookieContainer Bottom`}>
          <div className="PopupDiv">
            <div className="PopupHeader">
              <p className="PopupTitle">Nham... cookies</p>
              <img src={cookieIcon} className="Cookie" />
            </div>
            <div
              className="PopupDescription"
              style={descriptionColor ? { color: descriptionColor } : {}}>
              {description}
            </div>
          </div>
        </div>
      );
    case 'warning':
      return (
        <div ref={warningRef} className={`PopupContainer Bottom`}>
          <div className="PopupDiv" style={popupStyle}>
            <div
              className="PopupDescription"
              style={descriptionColor ? { color: descriptionColor } : {}}>
              {description}
              {getIcon()}
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div
          ref={infoRef}
          className={`PopupContainer ${comesFromTop ? 'Top' : 'Bottom'}`}>
          <div className="PopupDiv" style={popupStyle}>
            <div className="PopupHeader">
              <p
                className="PopupTitle"
                style={titleColor ? { color: titleColor } : {}}>
                {title}
              </p>
              <X
                color="#170C32"
                width="24px"
                strokeWidth="5px"
                onClick={exit}
              />
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
}
