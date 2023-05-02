import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import './view.css';

function App() {
  const [todo, setTodo] = useState("");
  const [Date, setDate] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);

  };


  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo,
      Date,
      uuid,
    });
    setTodo("");
    setDate("");
    var table=document.getElementsByTagName('table')[0];
var sum= 0;
for(let i=1; i < table.rows.length; i++){
sum += parseFloat(table.rows[i].cells[1].innerHTML);
}  

document.querySelector('.total').innerHTML = sum;

  };

  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
    setDate(todo.Date);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      Date,
      uuid: tempUuid,
    });
    setTodo("");
    setDate('');
    setIsEdit(false);
  };

  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };


  return (
<div className="overlay">

    <div className="container">
      <nav></nav>
      <div className="create">
            <div className="form-group">
              <div className="details">
                <div><label>Todo:</label></div>
               <input type="text" value={todo} onChange={handleTodoChange} placeholder="Enter Todo"/>
              </div>
              <div className="details">
              <div><label>Due date:</label></div>
               <input type="date" value={Date} onChange={handleDateChange} placeholder=""/>
              </div>

              <div style={{padding: "0 10px"}} className="details1">
              {isEdit ? (
                    <>
                      <button className="create__update" onClick={handleSubmitChange}>Update</button>
                      <button className="clear"
                        onClick={() => {
                          setIsEdit(false);
                          setTodo("");
                          setDate(0);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button id="submit_submit" onClick={writeToDatabase}>submit</button>
                  )}
          </div>
      </div>
      </div>
      
      <table CELLSPACING={5} id="myTable">
      <tr>
            <th>Todo</th>
            <th>Due date</th>
            <th>Action</th>
          </tr>
      {todos.map((todo) => (
        
        <>
          <tr>
            <td>{todo.todo}</td>
            <td>{todo.Date}</td>
            <td>
             
              <button id="update-btn-tbl"onClick={() => handleUpdate(todo)}>Edit</button>
              <button id="delete-btn-tbl" onClick={() => handleDelete(todo)}>Done</button>
            </td>
          </tr>
        
        
        </>
      ))}
      </table>
    </div>
    </div>
  );
}

export default App;

