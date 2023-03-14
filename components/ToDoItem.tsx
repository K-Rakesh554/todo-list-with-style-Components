import React, { ChangeEvent, Fragment, useRef } from 'react';
import { Itask } from '../interface';
import {
  CheckInput,
  DeleteBtn,
  EditBtn,
  LabelText,
} from '../Styled components/outputarea';

interface Props {
  task: Itask;
  tasktodelete(taskID: number): void;
  tasktoedit(taskID: number): void;
  handleCheck(taskID: number, checked: boolean): void;
}

function ToDoItem({ task, tasktodelete, tasktoedit, handleCheck }: Props) {
  const buttonedit = (): void => {
    tasktoedit(task.ID);
  };

  const buttondelete = (): void => {
    tasktodelete(task.ID);
  };

  const checkbutton = (e: ChangeEvent<HTMLInputElement>): void => {
    handleCheck(task.ID, e.target.checked);
  };

  return (
    <tr>
      <td>
        <CheckInput
          type="checkbox"
          onChange={checkbutton}
          checked={task.isComplete}
        ></CheckInput>
      </td>
      <td>
        <LabelText bool={task.isComplete ? '1' : 'default'}>
          {task.taskname}
        </LabelText>
      </td>
      <td>
        <LabelText bool={task.isComplete ? '1' : 'default'}>
          days left: {task.daystocomplete}
        </LabelText>
      </td>

      <td>
        <EditBtn bool={task.isComplete} onClick={buttonedit}>
          edit task{' '}
        </EditBtn>
        <DeleteBtn onClick={buttondelete}>delete task</DeleteBtn>
      </td>
    </tr>
  );
}
export default React.memo(ToDoItem);
