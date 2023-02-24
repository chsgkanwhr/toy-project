const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const {
  createUser,
  getUsers,
  getProductById,
  updateUser,
  deleteUser,
} = require("./database");
const mysql = require("mysql2");
let win = BrowserWindow;

app.whenReady().then(() => {
  win = new BrowserWindow({
    resizable: true,
    autoHideMenuBar: true,
    fullscreenable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.maximize();
  win.show();

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.webContents.openDevTools({ mode: "detach" });

  ipcMain.on("wantUserInfo", async (event, arg) => {
    event.reply("getUserInfo", await getUsers());
  });
  ipcMain.on("createUser", async (event, arg) => {
    let test = await createUser(arg);
    console.log(test, "인서트");

    event.reply("getUserInfo", await getUsers());
  });
});
app.on("window-all-closed", () => {
  app.quit();
});
