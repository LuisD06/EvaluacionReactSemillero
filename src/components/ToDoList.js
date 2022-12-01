import { useEffect, useState } from "react";
import clientHttp from "../axios/axios";
import { ToDo } from "./ToDo";

export const ToDoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [todoDescription, setTodoDesctiption] = useState("");
    const [error, setError] = useState(false);
    const handleChange = (evt) => {
        setTodoDesctiption(evt.target.value);
    }
    const handleUpdate = () => {
        clientHttp({
            method: "get",
            url: "?id_author=21",
        })
            .then(response => {
                if (response.data.success) {
                    setTodoList(response.data.data);
                }
            })
            .catch(error => console.log(error));
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        var noValido = /\s/;
        if (noValido.test(todoDescription)) {
            alert("El título de la tarea no puede contener espacios en blanco");
        } else {
            const newToDo = {
                description: todoDescription,
                status: 0,
                id_author: 21,
                finish_at: new Date().toISOString()
            }
            clientHttp({
                method: "post",
                url: "/?id_author=21",
                headers: {
                    "Content-Type": "application/json",
                },
                data: newToDo
            }).then(response => {
                if (response.data.success) {
                    handleUpdate();
                    setError(false);
                }else {
                    setError(true);
                }
            })
                .catch(error => console.log(error));
        }
    }
    useEffect(() => {
            handleUpdate();
        },
        []
    );
    return (
        <div className="container">
            <div>
                { error && <p>Error al agregar un nuevo item</p> }
                <h2>TODO LIST</h2>
                <form onSubmit={(evt) => handleSubmit(evt)}>
                    <input className="todo-input" type="text" placeholder="Título" onChange={(evt) => handleChange(evt)} required></input>
                    <button className="button" type="submit">Agregar</button>
                </form>

            </div>
            <ul>
                {
                    todoList.map(todoItem => 
                        <ToDo 
                            key={todoItem.id} 
                            id={todoItem.id} 
                            description={todoItem.description} 
                            onAction = {() => handleUpdate()}
                            status={todoItem.status}/>
                           
                        )
                }
            </ul>
            <div>
                { todoList.length <= 0 && <p>La lista se encuentra vacía</p> }
                <p>{todoList.filter(item => item.status === 1).length} de {todoList.length} tarea(s) completada(s)</p>
            </div>

        </div>
    );
} 