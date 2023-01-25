import styled from "@emotion/styled";

const smallScreen = (window.innerHeight < 740);
const categorySize = (smallScreen)?  [144, 90] : [140, 80]; [160, 100]

export const Title = styled.p`
    width: 100vw;
    padding: 0 50px;
    margin: 20px 0;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
`;

export const CategoryDiv = styled.div`
    display: flex;
    flx-direction: column;
    align-items: center
    justify-contet: space-between;
    width: 100vw;
    height: 100%;
`;

export const Content = styled.div`
    width: 100vw;
`;

export const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Awaiting = styled(Categories)`
    flex-wrap: nowrap;
    margin-top: 3em;
    justify-content: center;
`;

export const Category = styled.div`
    margin: 8px;    
    width: ${categorySize[0]}px;
    height: ${categorySize[1]}px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #403A55;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`;

export const CategoryName = styled.p`
    text-align: center;
    font-size: 18px;
    font-family: 'Roboto';
    font-weight: 500;
`;