import React, { useState, useRef, useLayoutEffect } from 'react';
import Background from '../../Background';
import Header from '../../Header';
import Popup from '../../Popup';
import gsap from 'gsap';
import BottomButton from '../../Button/BottomButton';
import {
  CoverDiv,
  CoverCard,
  CoverImg,
  CoverTitle,
  CoverButton,
} from './styles';
import './Cover.css';

interface CoverProps {
  title: string;
  coverImg: string;
  type: string;
  description: string | JSX.Element;
  sizeOfDescription?: number;
  gamePage: () => void;
  goBackPage: () => void;
  turnVisibility: boolean;
  ownerVisibility: boolean;
}

export default function CoverPage({
  type,
  title,
  coverImg,
  description,
  sizeOfDescription,
  gamePage,
  goBackPage,
  turnVisibility,
  ownerVisibility,
}: CoverProps) {
  const [cardColor, setCardColor] = useState('#000000');
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);

  const header = ownerVisibility ? (
    <Header
      goBackArrow={goBackPage}
      infoPage={() => setPopupVisibility(true)}
    />
  ) : (
    <Header infoPage={() => setPopupVisibility(true)} />
  );

  const coverCard = useRef();
  const coverTitle = useRef();
  const coverImage = useRef();
  const coverButton = useRef();

  useLayoutEffect(() => {
    //same as useEffect, but it waits untill all DOM elements are rendered to execute

    let animation = gsap.context(() => {
      //we need gsap.context() to be able to remove all animation once the component unmounts
      switch (type) {
        case 'simple':
          setCardColor('#403A55');
          gsap.from(coverCard.current, {
            duration: 2,
            yPercent: 100,
            ease: 'elastic',
          });
          gsap.from(coverTitle.current, {
            opacity: 0,
            duration: 1,
            delay: 1.25,
          });
          gsap.from(coverImage.current, {
            yPercent: 100,
            duration: 2,
            delay: 0.25,
            ease: 'elastic',
          });
          break;

        case 'dynamic':
          setCardColor('#8877DF');
          gsap.from(coverCard.current, {
            duration: 2,
            xPercent: 10,
            scale: 0.5,
            rotate: 45,
            ease: 'elastic',
          });
          gsap.from(coverTitle.current, {
            opacity: 0,
            duration: 1,
            delay: 1.25,
          });
          gsap.from(coverImage.current, {
            xPercent: -10,
            duration: 2,
            scale: 0.5,
            rotate: 45,
            delay: 0.25,
            ease: 'elastic',
          });
          break;

        case 'round':
          setCardColor('#800080');
          gsap.from(coverCard.current, {
            rotation: -45,
            scale: 0,
            duration: 1,
            ease: 'bounce',
          });
          gsap.from(coverTitle.current, {
            opacity: 0,
            duration: 1,
            delay: 1.25,
          });
          gsap.from(coverImage.current, {
            rotation: 45,
            scale: 0,
            duration: 1,
            delay: 0.25,
            ease: 'bounce',
          });
          break;
      }

      gsap.from(coverButton.current, {
        opacity: 0,
        scale: 0,
        yPercent: 100,
        duration: 2,
        delay: 0.25,
        ease: 'elastic',
      });
    });

    return () => {
      //same as useEffect (executes on unmount)
      animation.revert(); //kills and resets all animations. Highly recommended to avoid unexpected behaviour on React
    };
  }, []);

  const button =
    turnVisibility === true ? (
      <BottomButton onClick={gamePage}>Começar jogo</BottomButton>
    ) : (
      <></>
    );

  return (
    <Background>
      <Popup
        height={sizeOfDescription ? sizeOfDescription : undefined}
        title={title}
        description={description}
        show={popupVisibility}
        exit={() => setPopupVisibility(false)}
        comesFromTop
      />
      {header}
      <CoverDiv>
        <CoverCard ref={coverCard} style={{ backgroundColor: cardColor }}>
          <CoverImg ref={coverImage} src={coverImg} />
          <CoverTitle ref={coverTitle}>{title}</CoverTitle>
        </CoverCard>
        <CoverButton ref={coverButton}>{button}</CoverButton>
      </CoverDiv>
    </Background>
  );
}
