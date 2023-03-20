import React from 'react';

let AddTodoForm = () => {
return( 
    <form>
      <label htmlFor="todoTitle">Title: </label>
      <input id="todoTitle" style={{ marginRight: '4px' }}></input>
      <button type="submit"> Add </button>
    </form>)
}

export default AddTodoForm;