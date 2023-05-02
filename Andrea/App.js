import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import './view.css';

function App() {
  const [todo, setTodo] = useState("");
  const [name, setName] = useState("");
  const [lastname, setlastname] = useState("");
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [standing, setStanding] = useState("");

  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleTodoChange = (e) => {
    setTodo(e.target.value);

  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlelastnameChange = (e) => {
    setlastname(e.target.value);
  };
  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
   const handleStandingChange = (e) => {
    setStanding(e.target.value);
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
      lastname,
      section,
      gender,
      standing,
      uuid,
    });
    setTodo("");
    setName("");
    setlastname("");
    setSection("");
    setGender("");
    setStanding("");
  };

  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
    setName(todo.name);
    setlastname(todo.lastname);
    setSection(todo.section);
    setGender(todo.gender);
    setStanding(todo.standing);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo,
      name,
      lastname,
      section,
      gender,
      standing,
      uuid: tempUuid,
    });
    setTodo("");
    setName("");
    setlastname("");
    setSection("");
    setGender("");
    setStanding("");
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
      <nav><h1>Create Record</h1></nav>
      <div className="create">
            <div className="form-group">                                                  
              <div className="details">
                <div>
                  <label>Name</label>
                </div>
               <input type="text" value={todo} onChange={handleTodoChange} placeholder="Enter Name Here"/>
              </div>
              <div className="details">
              <div>
                  <label>Last Name</label>
                </div>
              <input type="text" value={name} onChange={handleNameChange} 
              placeholder="Enter LastName Here"/>
              </div>
              
              <div className="details">
              <div>
                  <label>Year</label>
                </div>
                  <input value={lastname} onChange={handlelastnameChange} placeholder="Enter Year level Here"/>
              </div>
              <div className="details">
              <div>
                  <label>Section</label>
                </div>
                  <input value={section} onChange={handleSectionChange} placeholder="Enter Section Here"/>
              </div>
              <div className="details">
                <div>
                  <label>Gender</label>
                </div>
                  <input value={gender} onChange={handleGenderChange} placeholder="Enter Gender Here "/>
              </div>
              <div className="details">
              <div>
                  <label>Standing</label>
                </div>
                  <input value={standing} onChange={handleStandingChange} placeholder="Enter Standing Here"/>
              </div>
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
                          setlastname("");
                          setSection("");
                          setGender("");
                          setStanding("");
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
      <div className="table-title">
           <h1>Student List</h1>        
           </div>
      <table CELLSPACING={0} id="myTable">
      <tr>   
            <th>Name</th>
            <th>Last Name</th>
            <th>Year</th>
            <th>Section</th>
            <th>Gender</th>
            <th>Standing</th>
            <th>Action</th>
          </tr>
      {todos.map((todo) => (
        <>
          <tr>
            <td>{todo.todo}</td>
            <td>{todo.name}</td>
            <td>{todo.lastname}</td>
            <td>{todo.section}</td>
            <td>{todo.gender}</td>
            <td>{todo.standing}</td>
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
