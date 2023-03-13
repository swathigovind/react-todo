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

function ShowList() {
  return todoList.map(i => {
    return (<li key={i.id}>{i.title}</li>)
  })
}




function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {ShowList()}
       </ul>
    </div>
  );
}






export default App;
