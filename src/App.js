import React from 'react';

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {showList()}
      </ul>
    </div>
  );
}


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


function showList() {
  return todoList.map(i => {
    return (<li key={i.id}>{i.title}</li>)
  })
}

export default App;
