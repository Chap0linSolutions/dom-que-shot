import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Background, AlertDiv, Message, Button, Image } from './Alert.style';

interface AlertProps {
    message: string | JSX.Element;
    icon?: string;
    noButton?: boolean;
}

export default function Alert({message, icon, noButton} : AlertProps){
    
    const alertComponent = useRef();
    const background = useRef();
    const alert = useRef();
    const img = useRef();

    const image = (icon)
    ? <Image ref={img} src={icon}/>
    : null;

    const button = (noButton)
    ? null
    : <Button onClick={() => dismissAlert()}>Fechar</Button>;

    useEffect(() => {
        const loop = gsap.to(img.current, {
          rotate: -360,
          duration: 5,
          ease: 'linear',
          repeat: -1,
        });

        return () => {
            loop.revert();
        };
    });

    useEffect(() => {
        const intro = gsap.timeline()
        .to(background.current, {opacity: 1, duration: 0.2})
        .to(alert.current, {scale: 1, duration: 0.2});

        return () => {
            intro.revert();
        };
    }, []);

    const dismissAlert = () => {
        gsap.timeline()
        .to(alert.current, {scale: 0, duration: 0.2})
        .to(background.current, {opacity: 0, duration: 0.2})
        .to(background.current, {yPercent: 100, duration: 0});
    }

    return (
        <Background ref={background}>
            <AlertDiv ref={alert}>
                {image}
                <Message>{message}</Message>
                {button}
            </AlertDiv>
        </Background>
    );
}