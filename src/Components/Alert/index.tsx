import { useEffect } from 'react';
import gsap from 'gsap';
import './Alert.css';

interface AlertProps {
    message: string | JSX.Element; 
}

export default function Alert({message} : AlertProps){
    
    useEffect(() => {
        gsap.timeline()
        .to('.AlertDarkenedBackground', {opacity: 1, duration: 0.2})
        .to('.AlertDiv', {scale: 1, duration: 0.2});
    }, []);

    const dismissAlert = () => {
        gsap.timeline()
        .to('.AlertDiv', {scale: 0, duration: 0.2})
        .to('.AlertDarkenedBackground', {opacity: 0, duration: 0.2})
        .to('.AlertDarkenedBackground', {yPercent: 100, duration: 0});
    }

    return (
        <div className="AlertDarkenedBackground">
            <div className="AlertDiv">
                <p className="AlertMessage">
                    {message}
                </p>
                <button
                    className="AlertButton" 
                    onClick={() => dismissAlert()}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}