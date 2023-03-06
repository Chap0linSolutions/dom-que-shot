import styled from "@emotion/styled";

export const RegularSector = styled.div`
    width: 67px;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items; center;
    border: 1px solid #2a708a;
    
    @media(max-height: 740px){
        width: 60px;
        height: 60px;
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
    width: 45px;
    object-fit: scale-down;
    @media(max-height: 740px){
        width: 40px;
    }
`;