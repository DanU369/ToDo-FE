import React from 'react'
import Task from "./Task"
import AddTask from './AddTask';


const MainPage = () => {
    return (
      <div>
        <p className="nameTag">Dan Untea</p>
        <h1 className="title">My ToDo List</h1>
        <div className="outerContainer">
          <Task />
        </div>
        <AddTask/>
      </div>
    );
}

export default MainPage
