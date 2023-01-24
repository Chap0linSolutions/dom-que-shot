import Button from '../';
import styled from '@emotion/styled';

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
    <ButtonDiv style={style}>
      <Button onClick={onClick} isDisabled={isDisabled}>
        {children}
      </Button>
    </ButtonDiv>
  );
}

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0 40px 0;
  flex: 1;
`;
