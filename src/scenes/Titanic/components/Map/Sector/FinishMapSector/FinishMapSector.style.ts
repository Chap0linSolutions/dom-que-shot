import styled from '@emotion/styled';

export const RegularSector = styled.div`
    width: 62px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items; center;
    flex-wrap: wrap;
    border: 1px dashed #2a708a;
    @media(max-height: 740px){
        width: 55px;
        height: 55px;
    }
`;

export const TopLeftSector = styled(RegularSector)`
  border-radius: 20px 0 0 0;
  @media (max-height: 740px) {
    border-radius: 22px 0 0 0;
  }
`;

export const TopRightSector = styled(RegularSector)`
  border-radius: 0 20px 0 0;
  @media (max-height: 740px) {
    border-radius: 0 22px 0 0;
  }
`;

export const BottomLeftSector = styled(RegularSector)`
  border-radius: 0 0 0 20px;
  @media (max-height: 740px) {
    border-radius: 0 0 0 22px;
  }
`;

export const BottomRightSector = styled(RegularSector)`
  border-radius: 0 0 20px 0;
  @media (max-height: 740px) {
    border-radius: 0 0 22px 0;
  }
`;

export const ElementIcon = styled.img`
  z-index: 1;
  width: 45px;
  object-fit: scale-down;
  @media (max-height: 740px) {
    width: 40px;
  }
`;

export const SmallElemetIcon = styled(ElementIcon)`
  width: 26px;
  @media (max-height: 740px) {
    width: 22px;
  }
`;

export const IconCounter = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 2px;
  border-radius: 10px;
  background-color: #1e5168;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (mex-height: 740px) {
    width: 20px;
    height: 20px;
  }
`;

export const IconCount = styled.p`
  font-size: 12px;
  margin: 0;
  color: white;
  @media (max-height: 740px) {
    font-size: 11px;
  }
`;
