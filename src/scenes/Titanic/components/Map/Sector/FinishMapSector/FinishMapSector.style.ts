import styled from "@emotion/styled";

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
    border-radius: 16px 0 0 0;
`;

export const TopRightSector = styled(RegularSector)`
    border-radius: 0 16px 0 0;
`;

export const BottomLeftSector = styled(RegularSector)`
    border-radius: 0 0 0 16px;
`;

export const BottomRightSector = styled(RegularSector)`
    border-radius: 0 0 16px 0;
`;

export const ElementIcon = styled.img`
    z-index: 1;
    width: 45px;
    object-fit: scale-down;
    @media(max-height: 740px){
        width: 40px;
    }
`;

export const SmallElemetIcon = styled(ElementIcon)`
    width: 30px;
    @media(max-height: 740px){
        width: 26px;
    }
`;

export const IconCounter = styled.div`
    width: 20px;
    height: 20px;
    margin: 5px;
    border-radius: 10px;
    background-color: #1e5168;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconCount = styled.p`
    font-size: 14px;
    margin: 0;
    color: white;
`;