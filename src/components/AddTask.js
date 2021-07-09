import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axios } from "../axios/axios";

const AddTask = () => {
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
   
     await axios
      .post(
        `/task/add`,
        {
          name: e.target[0].value,
          estimatedWorkTime: e.target[1].value,
          type: e.target[2].value,
          deadline: new Date(e.target[3].value),

        }).catch((err) => console.log("Error:", err));

  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary addBtn"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add Task
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a New Task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name of the Task:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expectedTime">
                    Estimated Work Time (days):
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    name="expectedTime"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Task type:</label>
                  <select name="type" className="form-select" required>
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                    <option value="HOBBY">Hobby</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="deadline">Deadline: </label>
                  <DatePicker
                    name="deadline"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    minDate={new Date()}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
