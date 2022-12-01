import { useState } from "react";
import clientHttp from "../axios/axios";

export const ToDo = ({id, description, status, onAction}) => {
    const [taskChecked, setTaskChecked] = useState(status);
    const handleDelete  = () => {
        clientHttp({
            method: "delete",
            url: `/${id}`
        }).then(response => {
            if (response.data.success) {
                onAction();
            }
        });
    }
    const handleChange = (evt) => {
        const checked = evt.target.checked;
        if (checked) {
            setTaskChecked(evt.target.checked);
            const toDo = {
                description: description,
                status: checked ? 1 : 0,
                id_author: 21,
                finish_at: new Date().toISOString()
            }
            clientHttp({
                method: "put",
                url: `/${id}`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: toDo
            }).then(response => {
                if (response.data.success){
                    onAction();
                }
            });
            
        }
    }
    return (
        <div className="todo-item">
            <input type="checkbox" checked={taskChecked} value={taskChecked} onChange={(evt) => handleChange(evt)}></input>
            <p>{description}</p>
            <button onClick={() => handleDelete()} >Eliminar</button>
        </div>
    ); 
}