import styled from 'styled-components';
import { AddTaskBtn } from '../Styled components/inputarea';
export const Outputarea = styled.div`

justify-content:center;
align-items:center;
display:flex;
margin-top:50px;
`;

export const Tablestyle = styled.table`
font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 80%;
  maxwidth:20%;

  th{
    border: 3px inset aqua;
    padding: 8px;
    margin: 2px;
    height: 30px;
    vertical-align: center;
    text-align: center;
    background-color:#1B9CFC;
    color: white;
    min-width: 3em; /* the normal 'fixed' width */
    width: 3em; /* the normal 'fixed' width */
    max-width: 3em; /* the normal 'fixed' width, to stop the cells expanding */
  } 


  td{
    overflow:auto;
    border: 2px groove aqua;
    text-align: center;
    height: 5px;
    width: 300px;
    vertical-align: center;
    min-width: 3em; /* the normal 'fixed' width */
    width: 3em; /* the normal 'fixed' width */
    max-width: 3em; /* the normal 'fixed' width, to stop the cells expanding */
  }
`;

export const EditBtn= styled(AddTaskBtn)`


`;

export const DeleteBtn=styled(AddTaskBtn)``;
