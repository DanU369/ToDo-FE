import React, { useState, useEffect } from "react";
import { axios } from "../axios/axios";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [asc, setAsc] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await axios
      .get("/task")
      .catch((err) => console.log("Error:", err));
    if (response && response.data) {
      console.log(response.data);
      setTasks(response.data);
    }
  };

  const handleSort = () => {
    if (asc == null) setAsc(true);
    else setAsc(!asc);
  };

  const handleRemove = async (taskId) => {
    await axios
      .delete(`/task/delete/${taskId}`)
      .catch((err) => console.log("Error:", err));
    window.location.reload();
  };

  const handleFinish = async (e) => {
    await axios
      .post("/task/finish", {
        finishedOn: new Date(),
        actualWorkTime: e.target[1].value,
        id: e.target[0].value,
      })
      .catch((err) => console.log("Error:", err));
  };

  const remainingTime = (param) => {
    var myDate = param.split("-");
    var deadline = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    var today = new Date();
    today.setHours(0, 0, 0);
    var msDiff = deadline - today;
    var daysDiff = Math.round(msDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  const renderType = (type) => {
    switch (type) {
      case "HOME":
        return <i className="fa fa-home fa-lg" aria-hidden="true"></i>;
      case "WORK":
        return <i className="fa fa-briefcase" aria-hidden="true"></i>;
      case "HOBBY":
        return <i className="fa fa-futbol-o" aria-hidden="true"></i>;
      default:
        return null;
    }
  };

  const renderDeadline = (deadline, isFinished) => {
    if (isFinished) return <p>Deadline: {deadline}</p>;
    else {
      var timeLeft = remainingTime(deadline);
      if (timeLeft == 1) {
        return (
          <div>
            <p style={{ color: "red" }}>Deadline: {deadline}</p>
            <p>Remaining days: {timeLeft}</p>
          </div>
        );
      } else if (timeLeft == 0) {
        return (
          <div>
            <p style={{ color: "red" }}>Deadline: {deadline}</p>
            <p>This is the last day to finish this task</p>
          </div>
        );
      } else if (timeLeft < 0) {
        return (
          <div>
            <p style={{ color: "red" }}>Deadline: {deadline}</p>
            <p style={{ color: "red" }}>
              Due date was {Math.abs(timeLeft)} days ago
            </p>
          </div>
        );
      } else {
        return (
          <div>
            <p>Deadline: {deadline}</p>
            <p>Remaining days: {timeLeft}</p>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div>
        <button className="sortBtn" type="button" onClick={handleSort}>
          Sort by remaining days <span> </span>
          {asc ? (
            <i className="fa fa-sort-asc" aria-hidden="true"></i>
          ) : asc == false ? (
            <i className="fa fa-sort-desc" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-sort" aria-hidden="true"></i>
          )}
        </button>
      </div>
      <ul>
        {tasks
          .sort(function (a, b) {
            if (asc) return new Date(a.deadline) - new Date(b.deadline);
            else if (asc == false)
              return new Date(b.deadline) - new Date(a.deadline);
            else return 0;
          })
          .map((task) => {
            return (
              <li key={task.id}>
                {renderType(task.type)}
                <h3>{task.name}</h3>
                {renderDeadline(task.deadline, task.isFinished)}
                {task.isFinished && <p>Task finished on: {task.finishedOn}</p>}
                <p>Estimated Work Time: {task.estimatedWorkTime}</p>
                {task.isFinished && (
                  <p>Actual Work Time: {task.actualWorkTime}</p>
                )}

                {!task.isFinished && (
                  <div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => handleRemove(task.id)}
                    >
                      Remove Task
                    </button>
                    <span> </span>
                    {remainingTime(task.deadline) >= 0 && (
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#finishForm${task.id}`}
                        aria-expanded="false"
                        aria-controls={`finishForm${task.id}`}
                      >
                        Finish Task
                      </button>
                    )}

                    <div className="collapse" id={`finishForm${task.id}`}>
                      <form
                        style={{ marginTop: "10px" }}
                        onSubmit={handleFinish}
                      >
                        <div className="form-group">
                          <input type="hidden" name="id" value={task.id} />
                          <label htmlFor="actualTime">
                            Actual Work Time (days):
                          </label>
                          <input
                            type="number"
                            min="1"
                            name="actualTime"
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Finish Task
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Task;
