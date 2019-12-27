import styled, { keyframes, css } from 'styled-components';


export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center
  }

  svg {
    margin-right: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    ::placeholder {
      color: ${props => (props.error ? '#ff6b6b' : '#555')};
      font-weight: ${props => (props.error ? 'bold' : 'none')};
    }
  }

`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;

  &:hover {
    opacity: 0.8;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.4;

  }

  ${props => props.loading && css`
    svg {
      animation: ${rotate} 2s linear infinite;

    }
  `}

  svg {
    margin: 0;
  }
`;

export const List = styled.ul`
  margin-top: 10px;
  list-style: none;
  font-weight: bold;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    & + li {
      border-top: 1px solid #eee;
    }



    div {
      a {
        color: #7159c1;
        text-decoration: none;
      }

      button {
        outline: 0;
        margin: 0;
        border: 0;
        background: #FFF;
        margin-left: 20px;
        font-size: 18px;
        font-weight: bold;
        color: red;
        padding: 4px;
      }
    }
  }


`;
