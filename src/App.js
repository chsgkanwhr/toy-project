import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Test from "./pages/Test";

// const electron = window.require("electron");
// const ipcRenderer = electron.ipcRenderer; //electron과 통신하기 위함.
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
