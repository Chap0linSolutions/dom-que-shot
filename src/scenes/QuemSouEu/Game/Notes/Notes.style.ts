import styled from '@emotion/styled';

export const NoteSpace = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const NoteInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  background: white;
  color: black;
  font-family: Roboto;
  margin-bottom: 10px;
  border: 1px solid #aaaaaa;
  border-radius: 10px;
  padding: 10px;
  :focus {
    outline: none;
  }
`;

export const NoteList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Note = styled.li`
  width: 100%;
  text-justify: none;
  font-size: 16px;
  color: black;
  background: white;
  display: flex;
  margin: 10px 0;
  @media (max-height: 740px) {
    font-size: 15px;
  }
`;
