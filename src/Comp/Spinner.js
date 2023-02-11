import React, { useState } from "react";
import "../Comp/spinner.css";

 function Spinner() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFetch = () => {
    
    setIsLoading(true);

    fetch("https://reqres.in/api/users?page=1")
      .then((respose) => respose.json())
      .then((respose) => {
        console.log(respose)
         setUsers(respose.data)
         setTimeout(() => {
           setUsers(respose.data);
           setIsLoading(false);
         },   1000);
      })
      .catch(() => {
         setErrorMessage("Unable to fetch user list");
         setIsLoading(false);
      });
  };
  const renderUser = (
    <div className="userlist-container">
      {users.map((item, index) => (
        <div className="user-container" key={index}>
          <img src={item.avatar} alt="" />
          <div className="userDetail">
            <h3>
              {`${item.first_name}                
               ${item.last_name}`}</h3>
            <h4 className="last-name">{item.email}</h4>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="App">

        <header>
            <div className="header">
                <div className="logo">
                    <h2>Users Data</h2>
                </div>
                <div className="btn">
                <button onClick={handleFetch} disabled={isLoading}>
                    Fetch Users
                </button>
                </div>
            </div>
        </header>
      {isLoading ?  
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>: 
        renderUser}
      {errorMessage && <div className="error">{errorMessage}</div>}
      
    </div>
  );
}

export default Spinner;