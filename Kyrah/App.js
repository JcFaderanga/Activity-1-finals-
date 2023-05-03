import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import './view.css';

function App() {
  const [todo, setTodo] = useState("");
  const [price, setPrice] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);

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
      price,
      uuid,
    });
    setTodo("");
    setPrice("");
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
    setPrice(todo.price);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      price,
      uuid: tempUuid,
    });
    setTodo("");
    setPrice('');
    setIsEdit(false);
  };

  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };


  return (
<>

    <div className="container">
      <nav>Create Record</nav>
      <div className="create">
            <div className="form-group">
              <div className="details">
               <input type="text" value={todo} onChange={handleTodoChange} placeholder="Enter Name"/>
              </div>
              <div className="details">
               <input type="number" value={price} onChange={handlePriceChange} placeholder="Enter Amount"/>
              </div>

              <div style={{padding: "0 10px"}} className="details">
              {isEdit ? (
                    <>
                      <button className="create__update" onClick={handleSubmitChange}>Update</button>
                      <button className="clear"
                        onClick={() => {
                          setIsEdit(false);
                          setTodo("");
                          setPrice(0);
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
      <table CELLSPACING={10} id="myTable">
        
      <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
      {todos.map((todo) => (
        
        <>
          <tr>
            <td>{todo.todo}</td>
            <td>{todo.price}</td>
            <td>
             
              <button id="update-btn-tbl"onClick={() => handleUpdate(todo)}>update</button>
              <button id="delete-btn-tbl" onClick={() => handleDelete(todo)}>X</button>
            </td>
          </tr>
        
        
        </>
      ))}
      </table>
    </div>
    </>
  );
}

export default App;

