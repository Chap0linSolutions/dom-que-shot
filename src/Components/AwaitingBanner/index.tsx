import { useEffect } from 'react';
import gsap from 'gsap';
import './AwaitingBanner.css';

interface AwaitingBannerProps {
    background?: string;
    border?: string;
    icon: string;
    firstText: string;
    secondText: string;
}

export default function AwaitingBanner({border, background, icon, firstText, secondText} : AwaitingBannerProps){

    useEffect(() => {
        gsap.to('.AwaitingBannerIcon', {
          rotate: -360,
          duration: 5,
          ease: 'linear',
          repeat: -1,
        });
      });

    return (
        <div className="AwaitingBannerDiv" 
        style={{
            background: (background)? background : '',
            border: (border)? border : ''
        }}>
            <img className="AwaitingBannerIcon" src={icon} />
            <div className="AwaitingBannerTitle">
                <p className="AwaitingBannerFirstText"> {firstText} </p>
                <p className="AwaitingBannerSecondText"> {secondText} </p>
            </div>
        </div>
    )
}