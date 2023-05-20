import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";


export default function App() {
  const [user, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");



    useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((user) => {
          setTodos((oldArray) => [...oldArray, user]);
        });
      }
    });
  }, []);

  const writeToDatabase = () => {

    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      user,
      uuid,
    });
    setName("");

  };
  const handleView = (user) => {
    setTempUuid(user.uuid);
    setName(user.user);
  };


  const handleUpdate = (user) => {
    setIsEdit(true);
    setTempUuid(user.uuid);
    setName(user.user);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      user,
      uuid: tempUuid,
    });
    setName("");
    setIsEdit(false);
  };

  const handleDelete = (user) => {
 
    remove(ref(db, `/${user.uuid}`));
  };

const handleNameChange = (e) => {
  setName(e.target.value);
};
const showForm = (user) =>{
  setTempUuid(user.uuid);
    setName(user.user);

}

  return(
    <div className="overlay">
    <nav>
        <h4>Todo List</h4>
      </nav>
    <div className="container">
       <div className="cart-page">
         <div className="box-group">
           <div class="list-title">
             <h3></h3>
           </div>
         </div>
         <div className="input-box">
         
           <div className="details">
             <div>
               <label >Todo</label>
             </div>
           <input type="text" value={user} onChange={handleNameChange}  placeholder="Create Todo here.."/>
           </div>
           <div  className="details">
              {isEdit ? (
                    <>
                      <button className="create__update" onClick={handleSubmitChange}>Update</button>
                      <button className="clear"
                        onClick={() => {
                          setIsEdit(false);
                          setName("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button id="submit_submit" onClick={writeToDatabase}>Add</button>
                  )}
          </div>
         </div>
      </div>
      <div className="view-page">
        <div className="OrderList">
          <h1>View List</h1>
        </div>
        <table CELLSPACING={0} id="myTable">  
        {todos.map((user) => (
          
          <>
            <tr>
              <td>{user.user}</td>
              <td>
                <button id="update-btn-tbl"onClick={() => handleUpdate(user)}>Edit</button>
                <button id="delete-btn-tbl" onClick={() => handleDelete(user)}>Delete</button>
              </td>
            </tr>
            
          
          
          </>
        ))}
        </table>
      </div>

    </div>
    </div>
  )
}