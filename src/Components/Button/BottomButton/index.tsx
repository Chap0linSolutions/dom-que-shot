import Button from "../";
import './BottomButton.css';

interface BottomButtonProps {
  onClick?: () => void;
  isDisabled?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export default function BottomButton({onClick, isDisabled, children}: BottomButtonProps) {
    return (
        <div className="BottomButtonDiv">
            <Button
                onClick={onClick}
                isDisabled={isDisabled}
            >
                {children}
            </Button>
        </div>
    )
}