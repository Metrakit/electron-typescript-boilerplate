import { app, BrowserWindow } from 'electron';
import Main from './Main';

if (process.env.ELECTRON_ENV === "development") {
    require('electron-debug')({ showDevTools: true });
}

Main.main(app, BrowserWindow);
