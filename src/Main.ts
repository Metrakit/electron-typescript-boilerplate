import { client } from 'electron-connect';
import { BrowserWindow } from 'electron';

export default class Main {

    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    static resourcesDir: string;

    private static onWindowAllClosed(): void {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose(): void {
        Main.mainWindow = null;
    }

    private static onReady(): void {
        Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600})
        Main.mainWindow.loadURL(`file://${Main.resourcesDir}/app.html`);
        Main.mainWindow.on('closed', Main.onClose);

        if (process.env.ELECTRON_ENV === "development") {
            client.create(Main.mainWindow);
        }
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow): void {
        Main.resourcesDir = `${__dirname}/../resources`;
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }

}
