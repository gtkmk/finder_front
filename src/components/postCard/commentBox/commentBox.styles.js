import styled from 'styled-components'

export const CommentBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
`

export const SendIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 3px;
  background-color: ${(props) => props.$bgColor || 'blue'};
  height: 50px;
  width: 50px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.$bgHoverColor || 'blue'};
  }
`
