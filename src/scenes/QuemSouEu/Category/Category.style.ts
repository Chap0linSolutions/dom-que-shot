import styled from "@emotion/styled";

const smallScreen = (window.innerHeight < 740);
const titleSize = (smallScreen)? 18 : 20;
const titlePadding = (smallScreen)? '0 25px' : '0 50px';
const titleMargin = (smallScreen)? '10px 0' : '20px 0';
const categorySize = (smallScreen)?  [144, 80] : [160, 100];
const categoryFontSize = (smallScreen)? 16 : 18;

export const Title = styled.p`
    padding: ${titlePadding};
    margin: ${titleMargin};
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: ${titleSize}px;
`;

export const CategoryDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`;

export const Content = styled.div`
    width: 100%;
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
    font-size: ${categoryFontSize}px;
    font-family: 'Roboto';
    font-weight: 500;
    margin: 0;
`;