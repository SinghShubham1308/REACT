import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { retreiveHello, retreiveHelloWorldBean, retreiveHelloWorldPathVariable } from "../../api/HelloWorld";
import { retreiveTodo } from "../../api/TodoApi";

export const WelcomeComponent = () => {
  const { username } = useParams();
  const [message, setMessage] = useState(null);
  function callHelloWorld() {
    retreiveHello()
      .then((response) => successfullResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
    console.log("called");
  }

  function callHelloWorldBean() {
    retreiveHelloWorldBean()
      .then((response) => successfullResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
    console.log("called");
  }

  function retreiveHelloPathVariable() {
    retreiveHelloWorldPathVariable("Shubham")
      .then((response) => successfullResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
    console.log("called");
  }
  function successfullResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }
  function errorResponse(error) {
    console.log(error);
    // setMessage(response.data);
  }

  return (
    <div className="WelcomeComponent">
      <h2> Welcome {username} </h2>
      <div>
        Manage your Todos <Link to="/todos"> todos</Link>
        <br />
        {/* <button className="btn btn-success" onClick={callHelloWorld}>
          Call Rest Api
        </button>
        <button className="btn btn-success" onClick={callHelloWorldBean}>
          call Hello World Bean
        </button>
        <button className="btn btn-success" onClick={retreiveHelloPathVariable}>
          call Hello World Bean path variable
        </button> */}
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
};
