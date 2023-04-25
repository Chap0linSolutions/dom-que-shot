import styled from '@emotion/styled';

export const GameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const DrawingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Head = styled.div`
  height: 60px;
  margin: 0;
  font-family: Roboto;
  border-radius: 10px 10px 0 0;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-height: 740px) {
    font-size: 20px;
    height: 44px;
  }
`;

export const Category = styled.p`
  margin: 0;
  margin-right: 5px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 10px 10px 0 0;
  font-family: Adumu;
  width: calc(75% - 5px);
  height: 100%;
  background-color: #403a55;
`;

export const Timer = styled.div`
  margin: 0;
  margin-bottom: 5px;
  width: 25%;
  height: calc(100% - 5px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-height: 740px) {
    font-size: 16px;
  }
`;

export const DrawingCanvas = styled.canvas`
  background-color: white;
  border-radius: 0 10px 10px 10px;
  flex-grow: 0;
`;

export const CanvasActions = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 0 28px;
  display: flex;
  justify-content: space-between;
`;

export const UndoButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 37%;
`;

export const Undo = styled.img`
  width: 30px;
  object-fit: scale-down;
`;

export const Color = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid #858585;
`;

export const Width = styled.div`
  background-color: #656565;
  height: 40px;
  border-radius: 10px;
  margin: 5px 0;
`;

export const Legend = styled.p`
  margin: 0;
  margin-top: 5px;
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  width: 27%;
`;

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Palette = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const PaletteColor = styled.div`
  border: 1px solid black;
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 20px;
`;

export const PaletteWidth = styled.div`
  border: 1px solid black;
  margin: 10px;
  border-radius: 20px;
`;

export const UnderBar = styled.div``;
