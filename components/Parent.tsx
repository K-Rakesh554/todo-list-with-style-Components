import * as React from 'react';
import { useState, ChangeEvent, useRef, useCallback } from 'react';

import { Itask } from '../interface';
import ToDoItem from './toDoItem';
import Navbar from './navbar';
import {
  AddTaskBtn,
  Input,
  InputLabel,
  Inputsection,
} from '../Styled components/inputarea';
import {
  Outputarea,
  Tablestyle,
  AllDel,
  AllDone,
} from '../Styled components/outputarea';

export default function Parent() {
  let [todolist, setToDoList] = useState<Itask[]>([]);
  let [globalCheck, setGlobalCheck] = useState<boolean>(false);
  let [buttonText, setButtonText] = useState<string>('Add-Task');

  const Identity = useRef(null);
  const task = useRef<HTMLInputElement>(null);
  const deadline = useRef<HTMLInputElement>(null);
  const checkid = useRef(null);

  const handledatadisplay = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.name === 'task') {
        task.current.value = event.target.value;
      } else deadline.current.value = event.target.value;
    },
    []
  );
  //*-----------------------------------------------------*//
  const handledatapush = useCallback(() => {
    const genID = Date.now();
    if (task.current.value == '') {
      alert('please fill all the fields');
    } else {
      if (Identity.current) {
        const newarr = todolist.map((item) => {
          if (item.ID === Identity.current) {
            item.taskname = task.current.value;

            item.daystocomplete = deadline.current.value;
          }
          return item;
        });
        setToDoList(newarr);
      } else {
        const newtask = {
          taskname: task.current.value,
          daystocomplete: deadline.current.value,
          ID: genID,
          isComplete: false,
        };
        setToDoList([...todolist, newtask]);
      }
      task.current.value = '';
      deadline.current.value = '0';
      Identity.current = null;
      setButtonText('Add-Task');
    }
  }, [todolist, task.current, deadline.current]);

  //*-----------------------------------------------------------*//

  const handleEdit = useCallback(
    (taskidtoedit: number): void => {
      Identity.current = taskidtoedit;

      setButtonText('Save-Task');

      console.log(Identity.current);
      todolist.map((clickedForEdit) => {
        if (Identity.current === clickedForEdit.ID) {
          task.current.value = clickedForEdit.taskname;
          deadline.current.value = clickedForEdit.daystocomplete;
        }
      });
    },
    [Identity.current, todolist]
  );

  //*-----------------------------------------------------*//

  const handledelete = useCallback(
    (tasknametodelete: number): void => {
      if (Identity.current == null)
        setToDoList(
          todolist.filter((task) => {
            return task.ID !== tasknametodelete;
          })
        );
    },
    [todolist]
  );

  //*-----------------------------------------------------*//

  const handledeleteall = useCallback(() => {
    if (todolist.length != 0) {
      setToDoList((todolist = []));
    }
  }, [todolist]);

  //*-----------------------------------------------------*//

  const handleCheckbox = useCallback(
    (taskIdcheck: number, checkboxval: boolean): void => {
      if (Identity.current === null) {
        checkid.current = taskIdcheck;

        const newarr = todolist.map((item) => {
          if (item.ID === checkid.current) {
            item.isComplete = checkboxval;
          }
          return item;
        });

        setToDoList(newarr);

        // let newArrLength: number = newarr.length;
        // function globalCheck(newarr: {
        //   taskname: string;
        //   daystocomplete: string;
        //   ID: number;
        //   isComplete: boolean;
        // }) {
        //   return newarr.isComplete === true;
        // }

        // let filteredArray = newarr.filter(globalCheck);

        // let filteredArrayLength = filteredArray.length;

        // if (newArrLength === filteredArrayLength) {
        //   setGlobalCheck(true);
        // } else {
        //   setGlobalCheck(false);
        // }

        //using array.every

        let globalCheck = (element: {
          taskname: string;
          daystocomplete: string;
          ID: number;
          isComplete: boolean;
        }): boolean => {
          return element.isComplete === true;
        };
        if (newarr.every(globalCheck) === true) setGlobalCheck(true);
        else setGlobalCheck(false);
      }
    },

    [todolist, checkid.current]
  );

  //*-----------------------------------------------------*//

  const handleCheckAll = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const allCheckedArray = todolist.map((item) => {
        item.isComplete = e.target.checked;

        if (item.isComplete === true) {
          setGlobalCheck(true);
        } else {
          setGlobalCheck(false);
        }

        return item;
      });
      setToDoList(allCheckedArray);
    },
    [todolist, globalCheck]
  );
  //*-----------------------------------------------------*//

  return (
    <div>
      <Navbar />
      <Inputsection>
        <InputLabel>
          {' '}
          <label>SET GOAL:</label>{' '}
        </InputLabel>

        <Input
          type="text"
          defaultValue=""
          onChange={handledatadisplay}
          ref={task}
          placeholder="Enter your task..."
          name="task"
        ></Input>

        <InputLabel>
          <label> BALL-PARK YOUR GOAL:</label>{' '}
        </InputLabel>
        <Input
          type="number"
          defaultValue="0"
          onChange={handledatadisplay}
          ref={deadline}
          placeholder="deadline in days.."
          name="deadline"
        ></Input>

        <AddTaskBtn onClick={handledatapush}>{buttonText}</AddTaskBtn>

        <img
          src="https://www.actitime.com/wp-content/uploads/2020/03/best-to-do-list-apps-to-stop-forgetting-things.png"
          alt="target image"
        />
      </Inputsection>

      {/* outputarea */}
      <Outputarea>
        <Tablestyle cellPadding="20" cellSpacing="20">
          <thead>
            <tr>
              <th>
                {' '}
                <AllDone
                  type="checkbox"
                  onChange={handleCheckAll}
                  checked={globalCheck}
                ></AllDone>{' '}
                All Done
              </th>

              <th>Task</th>
              <th>Days to Complete</th>
              <th>
                Edit or Delete
                <AllDel onClick={handledeleteall}>Delete All</AllDel>
              </th>
            </tr>
          </thead>
          <tbody id="todo">
            {todolist.map((task: Itask, id) => {
              return (
                <ToDoItem
                  task={task}
                  key={id}
                  tasktodelete={handledelete}
                  tasktoedit={handleEdit}
                  handleCheck={handleCheckbox}
                />
              );
            })}
          </tbody>
        </Tablestyle>
      </Outputarea>
    </div>
  );
}
