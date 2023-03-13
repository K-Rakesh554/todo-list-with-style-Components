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
import GlobalStyle from 'styled-components/native/dist/models/GlobalStyle';

export default function Parent() {
  let [todolist, setToDoList] = useState<Itask[]>([]);
  let [globalCheck, setGlobalCheck] = useState<boolean>(false);

  console.log(todolist);
  const Identity = useRef(null);

  // task and deadline
  const task = useRef<HTMLInputElement>(null);
  const deadline = useRef<HTMLInputElement>(null);

  //for check value

  const checkid = useRef(null);

  // handler to set data
  // const handledatadisplay = (event: ChangeEvent<HTMLInputElement>): void => {
  //   if (event.target.name === 'task') setTask(event.target.value);
  //   else setdeadline(Number(event.target.value));
  // };
  //--------------------***--------------

  // here event that is occuring is of type htmlInputelement which converts inputdata into its respective types as event is of type generic event
  // hence the variable to which u assign should also be of type generic event

  const handledatadisplay = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      if (event.target.name === 'task') {
        task.current.value = event.target.value;
      } else deadline.current.value = event.target.value;
    },
    []
  );

  //handler to push data
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
          isAllChecked: false,
        };
        setToDoList([...todolist, newtask]);
      }
      task.current.value = '';
      deadline.current.value = '0';
      Identity.current = null;
      document.getElementById('button').innerText = 'Add-Task';
    }
  }, [todolist, task.current, deadline.current]);

  // handle edit data
  const handleEdit = useCallback(
    (taskidtoedit: number): void => {
      Identity.current = taskidtoedit;

      document.getElementById('button').innerText = 'Save-Task';

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

  // handler to delete data
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
  //handler to delete all data

  const handledeleteall = useCallback(() => {
    if (todolist.length != 0) {
      setToDoList((todolist = []));
    }
  }, [todolist]);

  //handle checkbox toggle
  const handleCheckbox = useCallback(
    (taskIdcheck: number, checkboxval: boolean): void => {
      if (Identity.current === null) {
        checkid.current = taskIdcheck;
        if (checkboxval === false) {
          setGlobalCheck(false);
        } else {
          setGlobalCheck(true);
        }
        const newarr = todolist.map((item) => {
          if (item.ID === checkid.current) {
            item.isComplete = checkboxval;
          }

          return item;
        });
        setToDoList(newarr);
      }
    },
    [todolist, checkid.current]
  );

  //handler for global checkbox toggle

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

        <AddTaskBtn onClick={handledatapush} id="button">
          Add-Task
        </AddTaskBtn>

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
