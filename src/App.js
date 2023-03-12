import React from 'react';


var todoList = [
  {
    id: 1,
    title: "Open"
  },
  {
    id: 2,
    title: "In Progress"
  },

  {
    id: 3,
    title: "Complete"
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
