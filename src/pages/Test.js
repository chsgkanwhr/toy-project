import React from "react";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer; //electron과 통신하기 위함.

function Test() {
  return (
    <>
      <div style={{ maxWidth: "500px" }}>테스트</div>
    </>
  );
}

export default Test;
