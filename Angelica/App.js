import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";


function App() {
  const [todo, setTodo] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
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
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
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
    document.querySelector('.create').style.display ="none";
     document.querySelector('table').style.display ="table";
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo,
      name,
      address,
      company,
      uuid,
    });
    setTodo("");
    setName("");
    setAddress("");
    setCompany("");
  };
  //update
  const handleUpdate = (todo) => {
    document.querySelector('.create').style.display ="block";
     document.querySelector('table').style.display ="none";
     document.querySelector('.form-group').style.display ="block";
    document.querySelector('.view-form').style.display ="none";
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
    setName(todo.name);
    setAddress(todo.address);
    setCompany(todo.company);
  };

  const handleSubmitChange = () => {
    closeForm();
    update(ref(db, `/${tempUuid}`), {
      todo,
      name,
      address,
      company,
      uuid: tempUuid,
    });
    setTodo("");
    setName("");
    setAddress("");
    setCompany("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };
   //view
   const handleView = (todo) => {
    document.querySelector('.form-group').style.display ="none";
    document.querySelector('.view-form').style.display ="block";
    document.querySelector('.create').style.display ="block";
    document.querySelector('table').style.display ="none";
    setTempUuid(todo.uuid);
  setTodo(todo.todo);
  setName(todo.name);
  setAddress(todo.address);
  setCompany(todo.company);
   
  };
const showFormCreate = () =>{
  setTodo("");
    setName("");
    setAddress("");
    setCompany("");
    setIsEdit(false);
     document.querySelector('.create').style.display ="block";
     document.querySelector('table').style.display ="none";
     document.querySelector('.form-group').style.display ="block";
    document.querySelector('.view-form').style.display ="none";
  }
const showFormList = () =>{
  document.querySelector('.create').style.display ="none";
  document.querySelector('table').style.display ="table";
}
function closeForm(){
  document.querySelector('.create').style.display ="none";
  document.querySelector('table').style.display ="table";
  document.querySelector('.form-group').style.display ="none";
 document.querySelector('.view-form').style.display ="none";
}
  return (
<div className="overlay">
    <div className="container">   
  <nav></nav>
     <div className="headerBTN">
        <h2>Information Desk</h2>
        <div>
        <button onClick={()=>showFormCreate()} className="create_top">Create</button>
        <button onClick={()=>showFormList()} className="create_top2">View records</button>
        </div>
      </div>
      <div className="">
      <div className="create">
        <span className="create-span-input" >Create/Update Record</span>
        <div className="view-form">
          <div className="viewdata">{todo}</div>
          <div  className="viewdata">{name}</div>
          <div  className="viewdata">{address}</div>
          <div  className="viewdata">{company}</div>
          <div  className="viewdata"><button id="submit_cancel" onClick={()=> closeForm()}>Close</button></div>
        </div>
            <div className="form-group">
                    <div className="details">
                        <input type="text" value={todo} onChange={handleTodoChange} placeholder="Enter Name..."/>
                    </div>
                   <div className="span-2">
                    <div className="details">
                      <input type="text" value={name} onChange={handleNameChange} 
                        placeholder="Enter MiddleName..."/>
                    </div>
              
              <div className="details">
                  <input type="text" value={address} onChange={handleAddressChange} placeholder="Enter LastName..."/>
              </div>
              <div className="details">
                  <input type="text" value={company} onChange={handleCompanyChange} placeholder="Enter Section..."/>
              </div>
              </div>
              
              <div className="details">
              {isEdit ? (
                    <>
                      <button className="create__update" onClick={handleSubmitChange}>Update</button>
                      <button id="submit_cancel"
                        onClick={() => {
                          closeForm();
                          setIsEdit(false);
                          setTodo("");
                          setName("");
                          setAddress("");
                          setCompany("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                    <button id="submit_submit" onClick={writeToDatabase}>submit</button>
                    <button id="submit_cancel" onClick={()=> closeForm()}>Cancel</button>
                    </>
                  )}
          </div>
      </div>
      </div>
      </div>
     
      <table CELLSPACING={0} id="myTable">
      <tr>
            <th>Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Section</th>
            <th>Action</th>
          </tr>
      {todos.map((todo) => (
        
        <>
          <tr>
            <td>{todo.todo}</td>
            <td>{todo.name}</td>
            <td>{todo.address}</td>
            <td>{todo.company}</td>
            <td>
            <button id="update-btn-tbl"onClick={() => handleView(todo)}>View</button>
              <button id="update-btn-tbl"onClick={() => handleUpdate(todo)}>Edit</button>
              <button id="delete-btn-tbl" onClick={() => handleDelete(todo)}>Delete</button>
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

// npm install firebase
// npm install uid
