import Button from '../';
import './BottomButton.css';

interface BottomButtonProps {
  style?: any;
  onClick?: () => void;
  isDisabled?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export default function BottomButton({
  style,
  onClick,
  isDisabled,
  children,
}: BottomButtonProps) {
  return (
    <div style={style} className="BottomButtonDiv">
      <Button onClick={onClick} isDisabled={isDisabled}>
        {children}
      </Button>
    </div>
  );
}
