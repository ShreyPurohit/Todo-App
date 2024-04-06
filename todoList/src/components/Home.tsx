import { useState, useEffect } from "react";

import Task from "./Task";

interface Itasks {
    title: string,
    description: string
}

const Home = () => {
    const initialArr: Itasks[] = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks") ?? "[]") : [];

    const [tasks, setTasks] = useState<Itasks[]>(initialArr);

    const [title, setTitle] = useState("");
    const [enteredTitleIsTouched, setEnteredTitleIsTouched] = useState(false)
    const enteredTitleIsValid = title.trim() !== "";
    const titleIsInvalid = !enteredTitleIsValid && enteredTitleIsTouched

    const [description, setDescripton] = useState("");
    const [enteredDescriptionIsTouched, setEnteredDescriptionIsTouched] = useState(false);
    const enteredDescriptionIsValid = description.trim() !== "";
    const descriptionIsInvalid = !enteredDescriptionIsValid && enteredDescriptionIsTouched;

    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    const enteredTitleBlurHandler = () => setEnteredTitleIsTouched(true);

    const descriptionChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescripton(e.target.value);

    const enteredDescriptionBlurHandler = () => setEnteredDescriptionIsTouched(true);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEnteredTitleIsTouched(true);
        if (!enteredTitleIsValid && !enteredDescriptionIsValid) {
            return;
        }
        if (isEditing && editingIndex !== null) {
            const updatedTasks = [...tasks]
            updatedTasks[editingIndex] = { title, description };
            setTasks(updatedTasks)
            setIsEditing(false);
            setEditingIndex(null);
        } else {
            setTasks([...tasks,{ title, description }]);
        }
        setTitle("")
        setEnteredTitleIsTouched(false);
        setDescripton("")
        setEnteredDescriptionIsTouched(false);
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    const deleteTask = (index: number) => {
        const filteredArr = tasks.filter((_val, i) => {
            return i !== index
        })
        setTasks(filteredArr)
    }

    const editTask = (index: number) => {
        const taskToEdit = tasks[index]
        setTitle(taskToEdit.title)
        setDescripton(taskToEdit.description)
        setIsEditing(true);
        setEditingIndex(index);
    }

    return (
        <div className="container">
            <h1>Daily Goals</h1>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Title" value={title} name="title" onChange={(e) => titleChangeHandler(e)} onBlur={enteredTitleBlurHandler} />
                {titleIsInvalid && <p>Title Must Not Be Empty</p>}
                <textarea placeholder="Description" value={description} name="description" onChange={(e) => descriptionChangeHandler(e)} onBlur={enteredDescriptionBlurHandler}></textarea>
                {descriptionIsInvalid && <p>Description Must Not Be Empty</p>}
                <button type="submit">Add</button>
            </form>
            {tasks.map((item, index) => {
                return <Task key={index} Title={item.title} Description={item.description} deleteTask={deleteTask} index={index} editTask={editTask} />
            })}
        </div>
    );
}

export default Home;