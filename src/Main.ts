import { BrowserWindow } from 'electron';
import { client } from 'electron-connect';

export default class Main {

    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    static viewsDirectory: string;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600})
        Main.mainWindow.loadURL(`file://${Main.viewsDirectory}/index.html`);
        Main.mainWindow.on('closed', Main.onClose);
        client.create(Main.mainWindow);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.viewsDirectory = `${__dirname}/../views`;
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }

}
