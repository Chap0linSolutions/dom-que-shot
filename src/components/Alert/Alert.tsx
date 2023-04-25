import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Background,
  AlertDiv,
  Message,
  Button,
  YesOrNo,
  Yes,
  No,
  Image,
} from './Alert.style';

interface AlertProps {
  message: string | JSX.Element;
  icon?: string;
  noButton?: boolean;
  buttonText?: string;
  yes?: () => void;
  no?: () => void;
  onButtonClick?: () => void;
}

export default function Alert({
  message,
  icon,
  noButton,
  buttonText,
  yes,
  no,
  onButtonClick,
}: AlertProps) {
  const background = useRef();
  const alert = useRef();
  const img = useRef();

  const image = icon ? <Image ref={img} src={icon} /> : null;

  const button = noButton ? null : (
    <Button
      onClick={() => {
        dismissAlert();
        onButtonClick && onButtonClick();
      }}>
      {buttonText ? buttonText : 'Fechar'}
    </Button>
  );

  const yesOrNo =
    yes && no ? (
      <YesOrNo>
        <Yes onClick={yes}>Sim</Yes>
        <No onClick={no}>Não</No>
      </YesOrNo>
    ) : null;

  useEffect(() => {
    const loop = gsap.to(img.current, {
      rotate: -360,
      duration: 5,
      ease: 'linear',
      repeat: -1,
    });

    const intro = gsap
      .timeline()
      .to(background.current, { opacity: 1, duration: 0.2 })
      .to(alert.current, { scale: 1, duration: 0.2 });

    return () => {
      intro.revert();
      loop.revert();
    };
  }, []);

  const dismissAlert = () => {
    gsap
      .timeline()
      .to(alert.current, { scale: 0, duration: 0.2 })
      .to(background.current, { opacity: 0, duration: 0.2 })
      .to(background.current, { yPercent: 100, duration: 0 });
  };

  return (
    <Background ref={background}>
      <AlertDiv ref={alert}>
        {image}
        <Message>{message}</Message>
        {yesOrNo}
        {button}
      </AlertDiv>
    </Background>
  );
}
