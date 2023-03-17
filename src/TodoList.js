import React from 'react';

var todoList = [
    {
      id: 1,
      title: "Start Assignment"
    },
    {
      id: 2,
      title: "Assignment In Progress"
    },
  
    {
      id: 3,
      title: "Complete Assignment"
    }];

    

  let RenderList =  ()  => {
    return todoList.map(i => {
      return (<li key={i.id}>{i.title}</li>)
    })
  }

let TodoList = () => {
   return <ul>
    <RenderList/>
  </ul>
}

export default TodoList;