import styled from '@emotion/styled';

export const Mimic = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 22px;
  text-align: center;
  @media (max-height: 740px) {
    font-size: 18px;
  }
`;

export const Subtitle = styled(Title)`
  font-size: 16px;
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;

export const SuggestionsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #403a55;
  border: 1px solid #f9c95c;
  border-radius: 20px;
  padding: 10px;
  margin: 20px 0;
  @media (max-height: 740px) {
    width: 90%;
    margin: 15px 0;
    padding: 5px 10px;
  }
`;

export const Item = styled.div`
  width: 100%;
  height: 80px;
  margin: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #170c32;
  border-radius: 20px;
  padding: 0 15px;
  @media (max-height: 740px) {
    height: 72px;
    margin: 4px;
  }
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  width: 30px;
  object-fit: scale-down;
  @media (max-height: 740px) {
    width: 25px;
  }
`;

export const CheckIcon = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const CategoryAndWord = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 10px;
  justify-content: center;
`;

export const Word = styled.p`
  margin: 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  font-family: Roboto;
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const Emphasis = styled.span`
  font-weight: 500;
`;

export const TimerAndProgressBar = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  @media (max-height: 740px) {
    width: 90%;
    height: 72px;
  }
`;

export const Timer = styled.div`
  padding: 0 20px;
  height: 60px;
  font-size: 22px;
  font-weight: 600;
  background: #403a55;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  border-radius: 20px;
  border: 1px solid #f9c95c;
  @media (max-height: 740px) {
    font-size: 20px;
    height: 54px;
    padding: 0 12px;
    margin-bottom: 30px;
    border-radius: 18px;
  }
`;

export const ProgressBarDiv = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  flex-direction: column;
  margin-left: 10px;
`;

export const ProgressTitle = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  @media (max-height: 740px) {
    font-size: 14px;
  }
`;

export const ProgressBar = styled.div`
  width: 95%;
  height: 10px;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: #aaaaaa;
`;

export const Progress = styled.div`
  background: #f9c95c;
  width: 5%;
  height: 100%;
  border-radius: 5px;
`;

export const MilestoneDiv = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
`;

export const Milestone = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 14px;
  @media (max-height: 740px) {
    height: 25px;
  }
`;

export const MilestoneIcon = styled.img`
  width: 15px;
  object-fit: scale-down;
  @media (max-height: 740px) {
    width: 12px;
  }
`;

export const StillTimer = styled(Timer)`
  border: 1px solid #999999;
  color: #999999;
`;

export const SandWatchDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 305px;
  height: 305px;
  border: 5px solid #8877df;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-height: 740px) {
    width: 274px;
    height: 274px;
  }
`;

export const SandWatch = styled.img`
  width: 300px;
  object-fit: scale-down;
  position: absolute;
  z-index: 2;
  @media (max-height: 740px) {
    width: 270px;
  }
`;

export const Glass = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 140px;
  position: absolute;
  background-color: #aaaaaa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  @media (max-height: 740px) {
    width: 252px;
    height: 252px;
  }
`;

export const Sand = styled.div`
  position: absolute;
  width: 200px;
  margin-bottom: 25px;
  background: #403a55;
  border-radius: 200px 200px 100px 100px;
  @media (max-height: 740px) {
    width: 180px;
  }
`;

export const GuessGuidance = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-height: 740px) {
    margin-top: 30px;
  }
`;

export const GuessTimer = styled(Timer)`
  border: 2px solid #8877df;
`;

export const GuessProgressDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  width: 300px;
  border: 2px solid #8877df;
  border-radius: 20px;
  @media (max-height: 740px) {
    padding: 10px 20px;
    margin-bottom: 18px;
  }
`;

export const GuessProgressTitle = styled.p`
  margin: 0;
  font-size: 16px;
  color: #8877df;
  @media (max-height: 740px) {
    font-size: 14px;
  }
`;
