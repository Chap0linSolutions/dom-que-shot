import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BannerDiv, BannerIcon, BannerTexts, FirstText, SecondText } from './AwaitingBanner.style';

interface AwaitingBannerProps {
    background?: string;
    border?: string;
    icon: string;
    firstText: string;
    secondText: string;
}

export default function AwaitingBanner({border, background, icon, firstText, secondText} : AwaitingBannerProps){

    const bannerIcon = useRef();
    const bannerStyle = {
        background: (background)? background : '',
        border: (border)? border : ''
    }

    useLayoutEffect(() => {
        const loop = gsap.to(bannerIcon.current, {
          rotate: -360,
          duration: 5,
          ease: 'linear',
          repeat: -1,
        });

        return () => {
            loop.revert();
        }
      });

    return (
        <BannerDiv style={bannerStyle}>
            <BannerIcon ref={bannerIcon} src={icon} />
            <BannerTexts>
                <FirstText> {firstText} </FirstText>
                <SecondText> {secondText} </SecondText>
            </BannerTexts>
        </BannerDiv>
    )
}