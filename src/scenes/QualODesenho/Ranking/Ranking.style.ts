import styled from '@emotion/styled';

export const Content = styled.div`
    margin-top: 20%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
  & p {
    margin: 0;
  }
`
  
export const RankingDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
  
export const ContainerHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2px;
    position: relative;
`
  
export const ContainerOnlyWinner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-top: 24px;
    align-items: center;
    background-color: #403a55;
    width: 120px;
    height: 180px;
    border-radius: 10px;
    border-color: black;
    border-width: 1px;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;

  & .background-avatar .only-crown {
    position: absolute;
    top: -23px;
    left: 10px;
    transform: rotate(15deg);
  }
`
  
export const ContainerWinner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-top: 24px;
    align-items: center;
    background-color: #403a55;
    width: 120px;
    height: 180px;
    border-radius: 10px;
    transform: rotate(-15deg);
    border-color: black;
    border-width: 1px;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;

  & .crown {
    position: absolute;
    top: -22px;
    left: 9px;
    transform: rotate(8deg);
  }
`
  
export const ContainerLoser = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-top: 24px;
    align-items: center;
    background-color: #403a55;
    width: 120px;
    height: 180px;
    border-radius: 10px;
    transform: rotate(15deg);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 0;

  & .thumbDown {
    position: absolute;
    right: -10px;
    top: 43px;
  }
`
  
export const BackgroundAvatar = styled.div`
    border-radius: 50%;
    background-color: #8877df;
    width: 64px;
    height: 64px;
    position: relative;
`
  
export const ContainerBody = styled.div`
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    z-index: 2;
`
  
export const RankingContainer = styled.div`
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 8px;
    margin-bottom: 10px;
`