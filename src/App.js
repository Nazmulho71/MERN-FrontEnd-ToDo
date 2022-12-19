import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Dimmer, Loader } from "semantic-ui-react";
import TodoBox from "./Components/TodoBox";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    let data = { title };

    let config = {
      method: "post",
      url: "https://mern-todo-backend.onrender.com/api/todos",
      headers: { "Content-Type": "application/json" },
      data,
    };

    axios(config)
      .then((res) => {
        setTodos([...todos, res.data]);
        setTitle("");
      })
      .catch((err) => alert(err.response.data));
  };

  const handleUpdate = (id) => {
    let data = { title };

    let config = {
      method: "put",
      url: `https://mern-todo-backend.onrender.com/api/todos/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios(config)
      .then((res) => {
        axios
          .get("https://mern-todo-backend.onrender.com/api/todos")
          .then((res) => {
            setTodos(res.data);
          })
          .catch((err) => {
            alert(err.response.data);
          });
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleDelete = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);

    let config = {
      method: "delete",
      url: `https://mern-todo-backend.onrender.com/api/todos/${id}`,
      headers: {},
    };

    axios(config)
      .then((res) => setTodos([...todos]))
      .catch((err) => alert(err.response.data));
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: "https://mern-todo-backend.onrender.com/api/todos",
      headers: {},
    };

    axios(config)
      .then((res) => {
        setTodos(res.data);
        setLoader(false);
      })
      .catch((err) => {
        alert(err.response.data);
        setLoader(false);
      });
  }, []);

  return (
    <div className="app">
      {loader ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <>
          <div>
            <Input
              placeholder="Add a Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Button primary onClick={handleSubmit}>
              Submit
            </Button>
          </div>

          {todos.length ? (
            todos.map((todo, i) => (
              <TodoBox
                key={i}
                todo={todo}
                title={title}
                setTitle={setTitle}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p style={{ fontSize: 18, textAlign: "center" }}>
              Enjoy! You have completed all the tasks 😃
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
