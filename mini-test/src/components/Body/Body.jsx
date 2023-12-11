import React, { useEffect, useState } from "react";
import "./Body.scss";
import Loading from "../Loading/Loading";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsXSquareFill, BsPencilSquare } from "react-icons/bs";
export default function Body() {
  const [todo, setTodo] = useState({
    name: "",
  });
  // console.log(todo);
  const [allTodo, setAllTodo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [loading,setLoading]=useState(false)
  // lay du lieu o input
  const handleGetTodo = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/todo?per_page=4"
      );
      setAllTodo(response.data);
    } catch (error) {
      console.log(error);
    } finally {
        setTimeout(() => {
            setLoading(false)
        },500)
    }
  };    
  useEffect(() => {
    handleGetTodo();
  }, [flag]);
  // them
  const handleAddTodo = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/todo", {
              ...todo,
              id: Math.floor(Math.random() * 99999),
              completed: false,
            });
            console.log(response);
            setAllTodo(response.data);
            setTodo({
              name: "",
            });
            setFlag(!flag);
            setLoading(false)
          } catch (error) {
            alert("Please check your input");
          }    
  };
  // edit
  const handleEdit = async (item) => {
    console.log(item);
    setTodo(item);
    setIsEdit(true);
  };
  const handleSave = async () => {
    try {
      if (confirm("Are you sure?")) {
        const response = await axios.put(
          `http://localhost:3000/api/v1/todo/${todo.id}`,
          todo
        );
        setAllTodo(response.data);
        setTodo({
          name: "",
        });
        setIsEdit(false);
        setFlag(!flag);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  // xoa
  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure?")) {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/todo/${id}`
        );
        setAllTodo(response.data);
        setTodo({
          name: "",
        });
        setIsEdit(false);
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // xoa het
  const handleDeleteAll = async () => {
    try {
      if (confirm("Are you sure?")) {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/todo`
        );
        setAllTodo(response.data);
        setTodo({
          name: "",
        });
        setIsEdit(false);
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // line through
  const handleLineThrough = async (item) => {
    try {
      if (confirm("Do you want to change the completed?")) {
        const response = await axios.patch(
          `http://localhost:3000/api/v1/todo/${item.id}`
        );
        setAllTodo(response.data);
        setTodo({
          name: "",
        });
        setIsEdit(false);
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="body">
        <div id="formTable">
          <div className="mainTable">
            <h1>Todo App</h1>
            <div className="formAdd">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Add new todo"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="name"
                  onChange={(e) =>
                    setTodo({ ...todo, [e.target.name]: e.target.value })
                  }
                  value={todo.name}
                />
                <Button
                  style={{
                    backgroundColor: "rgb(139,74,236)",
                    fontSize: "15px",
                    fontWeight: "900",
                    width: "50px",
                  }}
                  id="button-addon2"
                  onClick={isEdit ? handleSave : handleAddTodo}
                >
                  {isEdit ? "Save" : "Add"}
                </Button>
              </InputGroup>
            </div>
            {loading ? <Loading></Loading>:
            <div className="formRender">
              {allTodo?.map((e, i) => {
                return (
                  <ul key={i}>
                    <li className="formRender__list">
                      <p
                        className="formRender__list--text"
                        style={{
                            cursor: "pointer",
                          textDecoration: e.completed
                            ? "line-through"
                            : "none",
                        }}
                        onClick={() => handleLineThrough(e)}
                      >
                        {e.name}
                      </p>
                      <div className="formRender__list--button">
                        <Button
                            className="formRender__list--button--edit edit1"
                          style={{
                            fontSize: "17px",
                            fontWeight: "900",
                            width: "50px",
                            textAlign: "center",
                            border: "none",
                          }}
                          id="button-addon2"
                          onClick={() => handleEdit(e)}
                        >
                          <BsPencilSquare></BsPencilSquare>
                        </Button>
                        <Button
                        className="formRender__list--button--edit edit2"
                          style={{
                            backgroundColor: "rgb(228,77,66)",
                            fontSize: "17px",
                            fontWeight: "900",
                            width: "50px",
                            border: "none",
                          }}
                          id="button-addon2"
                          onClick={() => handleDelete(e.id)}
                        >
                          <BsXSquareFill></BsXSquareFill>
                        </Button>
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>


            }
            
            <div className="formFooter">
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "900",
                  color: "rgb(139,74,236)",
                  marginTop: "9px",
                }}
              >
                You have {allTodo?.length} todos
              </p>
              <Button
                style={{
                  backgroundColor: "rgb(228,77,66)",
                  fontSize: "15px",
                  fontWeight: "900",
                  width: "100px",
                  height: "40px",
                  border: "none",
                }}
                id="button-addon2"
                onClick={handleDeleteAll}
              >
                Delete All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
