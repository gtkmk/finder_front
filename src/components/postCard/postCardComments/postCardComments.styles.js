import styled, { css } from 'styled-components'

export const PostCommentsContainer = styled.div.attrs((props) => ({
  open: props.open || false,
}))`
  ${({ open }) => css`
    display: none;
    ${open &&
    css`
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 20px;
    `}
  `}
`

export const PostCommentsHeader = styled.div`
  display: flex;
`
