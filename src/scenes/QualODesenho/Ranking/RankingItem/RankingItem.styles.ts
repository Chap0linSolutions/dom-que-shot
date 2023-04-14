import styled from '@emotion/styled';

export const RankingItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  background-color: #8877df;
  border-radius: 10px;

  & .position {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #403a55;
    width: 56px;
    height: 48px;
    padding-left: 4px;
    padding-right: 8px;
    margin: none;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    border-right: 1px solid #f9c95c;
  }

  & .circle-border {
    margin: 0;
    width: 40px;
    height: 40px;
    border: 1px solid #f9c95c;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & img {
    rotate: -0.3rad;
    margin-top: 3px;
  }

  & .infos {
    margin-left: 16px;
    margin-right: 16px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
  }
`;
