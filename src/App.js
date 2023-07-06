import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation  } from "react-router-dom";
import commonStyle from "./common.module.css";
import TodoContainer from "./components/TodoContainer";
import Home from "./components/Home";

function App() {

  return (
    <BrowserRouter basename="/react-todo">
      <div className={commonStyle.PageStyle}>
        <h1 className={commonStyle.Title}>Todo List</h1>    
        <nav>
          <ul>
            <li>
              <Link to="/" className={commonStyle.Tab} >
                Home
              </Link>
            </li>
            <li>
              <Link to="/new" className={commonStyle.Tab}>
                Show Todo
              </Link>
            </li>
          </ul>
        </nav>

        <main className={commonStyle.Main}>
          <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new" element={<TodoContainer />} />
          </Routes>
        </main>

        <footer className={commonStyle.Footer}>
          <p className={commonStyle.FooterText}>© 2023 To Do List. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
