import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { useFieldArray, useForm } from 'react-hook-form';
import { changeCount, filters } from './actions';

function App() {
  const [allTasks, setAllTasks] = useState([]);
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const {
    control,
    register,
    watch,
    setValue
  } = useForm()

  const { append, remove, fields } = useFieldArray({
    control,
    name: "myTasks"
  })
  
  useEffect(() => {
    const id = setTimeout(async () => {
      const output = await fetch("dummy-url", {
        headers: {
          token: "dummhy"
        }
      })
      // if (output.success) {
        const data = [
          {task: "A list of tasks displayed on the main page.", status: true},
          {task: "Ability to add new tasks.", status: false},
          {task: "Ability to mark tasks as complete.", status: true},
          {task: "Ability to filter tasks by status (All, Active, Completed)",status : true},
          {task:  "A counter showing the number of active tasks.", status: false}
        ]
      let activeTask = 0;
        data.forEach((item, index) => {
          if (!item.status) {
            activeTask = activeTask + 1
          }
          append(item);
        })
        dispatch(changeCount(activeTask));
      // }
      return () => clearTimeout(id);
    }, 200)
  }, [])

  return (
    <div className="App">
      <div>
      {(watch(`myTasks`) || []).map((item, index) => (
        <div key={index} className='TaskContainer'>
          <div><input type='checkbox' checked={watch(`myTasks.[${index}].status`)}
            onClick={(e) => {
              if (e.target.checked) {
                setValue(`myTasks.[${index}].status`, true)
                dispatch(changeCount(-1))
                
              } else {
                setValue(`myTasks.[${index}].status`, false)
                dispatch(changeCount(1))
              }
            }}
          /></div>
          <div>Task: {item.task ? `${item.task}` : <input type='text'
            onBlur={() => {
              if (watch(`myTasks.[${index}].task`)) {
                dispatch(changeCount(1)) 
              }
            }}
            onChange={(e) => {
              setValue(`myTasks.[${index}].task`, e.target.value)
            }}/>}</div>
        </div>
      ))}
      </div>
      <div>Active Tasks: {count}</div>
      <button className='AddButton' onClick={() => append({
        task: "",
        status: null
      })}>Add Task</button>
    </div>
  );
}

export default App;
