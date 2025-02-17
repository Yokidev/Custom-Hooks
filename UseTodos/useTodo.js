import { useEffect, useReducer } from "react";
import { todoReducer } from "../todoReducer";


export const useTodo = () => {

  const initialState = [];

  
  const init = ()=>{
    return JSON.parse( localStorage.getItem('todos')) || []
  }
  
  const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);
  
  const todosCount = todos.length

  const pendingTodosCount = todos.filter(todo => todo.done === false).length

  useEffect(() => {
    
    localStorage.setItem('todos', JSON.stringify(todos) )  
    
  }, [todos])
  

  const handleNewTodo = ( todo )=> {

    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    }

    dispatchTodo(action);

  }

  const handleDeleteTodo = ( id ) => {

    dispatchTodo({
      type: '[TODO] Remove Todo',
      payload: id
    })

  }

  const handleToggleTodo = ( id )=>{

    dispatchTodo({
      type: '[TODO] Toggle Todo',
      payload: id
    })

  }

    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
