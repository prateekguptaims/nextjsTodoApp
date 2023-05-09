import React from 'react'
import { TodoButon } from './Clients'

export const TodoItem = ({title,description, id, completed}) => {
  return (
    <div className="todo">
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <TodoButon id={id} completed={completed}/>
        </div>
    </div>
  )
}

//export default ServerComponents