const Task = ({Title, Description, deleteTask ,index, editTask}:{Title:string, Description:string, deleteTask:any, index:number, editTask: any}) => {
    return (
        <div className="task">
            <div>
                <p>{Title}</p>
                <span>{Description}</span>
            </div>
            <button onClick={() => {deleteTask(index)}}>-</button>
            <button onClick={() => {editTask(index)}}>Edit</button>
        </div>
    )
}

export default Task