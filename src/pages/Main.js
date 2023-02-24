import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer; //electron과 통신하기 위함.

function Main() {
  const [userList, setUserList] = React.useState([]);
  const [user, setUser] = React.useState({});

  const setUserInfo = (e) => {
    const { name } = e.target;
    setUser({ ...user, [name]: e.target.value });
  };

  const createUser = () => {
    ipcRenderer.send("createUser", user);
    setUser({});
    ipcRenderer.on("getUserInfo", (event, payload) => {
      setUserList(payload);
    });
  };

  React.useEffect(() => {
    ipcRenderer.send("wantUserInfo");
    ipcRenderer.on("getUserInfo", (event, payload) => {
      setUserList(payload);
    });
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="App">
      <input
        type="text"
        name="userId"
        value={user.userId || ""}
        onChange={(e) => {
          setUserInfo(e);
        }}
      />
      <input
        type="text"
        name="userName"
        value={user.userName || ""}
        onChange={(e) => {
          setUserInfo(e);
        }}
      />
      <button onClick={createUser}>클릭</button>
      <div>
        {userList.length > 0 &&
          userList?.map((user) => (
            <div>
              {user.userid} / {user.username}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Main;
