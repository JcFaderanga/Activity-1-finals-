import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import './view.css';

function App() {
  const [todo, setTodo] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);

  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
      name,
      address,
      uuid,
    });
    setTodo("");
    setName("");
    setAddress("");
  };

  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
    setName(todo.name);
    setAddress(todo.address);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      name,
      address,
      uuid: tempUuid,
    });
    setTodo("");
    setName("");
    setAddress("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };

  function handleView(){
    document.querySelector('.view-page').style.display="block";


  }
  function close(){
    document.querySelector('.view-page').style.display="none";
    
  }

  return (
<>

    <div className="container">
      <nav>Create Record</nav>
      <div className="create">
            <div className="form-group">
              <div className="span-2">
              <div className="details">
               <input type="text" value={todo} onChange={handleTodoChange} placeholder="Enter Name..."/>
              </div>
              <div className="details">
              <input type="text" value={name} onChange={handleNameChange} 
              placeholder="Enter LastName..."/>
              </div>
              </div>
              <div className="details">
                  <textarea value={address} onChange={handleAddressChange} placeholder="Enter Address..."></textarea>
              </div>
              <div style={{padding: "0 10px"}} className="details">
              {isEdit ? (
                    <>
                      <button className="create__update" onClick={handleSubmitChange}>Update</button>
                      <button className="clear"
                        onClick={() => {
                          setIsEdit(false);
                          setTodo("");
                          setName("");
                          setAddress("");
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
            <th>Last Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
      {todos.map((todo) => (
        
        <>
          <tr>
            <td>{todo.todo}</td>
            <td>{todo.name}</td>
            <td>{todo.address}</td>
            <td>
             
              <button id="update-btn-tbl"onClick={() => handleUpdate(todo)}>update</button>
              <button id="delete-btn-tbl" onClick={() => handleDelete(todo)}>delete</button>
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

// npm install firebase
// npm install uid
