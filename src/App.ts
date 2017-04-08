require('electron-debug')({ showDevTools: true });

import { app, BrowserWindow } from 'electron';
import Main from './Main';

Main.main(app, BrowserWindow);
