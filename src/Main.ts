import { client } from 'electron-connect';
import { BrowserWindow } from 'electron';
import { _ } from 'lodash';

export default class Main {

    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    static viewsDirectory: string;

    private static onWindowAllClosed(): void {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose(): void {
        Main.mainWindow = null;
    }

    private static onReady(): void {
        var args = require('minimist')(process.argv);

        if (Main.isCLI(args))
            // electron . --arg="test"
            Main.launchCLIApp();
        else
            Main.launchDesktopApp();

        if (process.env.ELECTRON_ENV === "development") {
            client.create(Main.mainWindow);
        }
    }

    private static launchCLIApp(): void {
        console.log("in CLI mod");
        Main.application.quit();
    }

    private static launchDesktopApp(): void {
        Main.mainWindow = new Main.BrowserWindow({
            // titleBarStyle: 'hidden',
            // transparent: true,
            // frame: false,
            width: 800,
            height: 600,
            minWidth: 200,
            minHeight: 200
        });
        Main.mainWindow.loadURL(`file://${Main.viewsDirectory}/index.html`);
        Main.mainWindow.on('closed', Main.onClose);
    }

    private static isCLI(args: Object): Boolean {
        return _.has(args, "arg");
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow): void {
        Main.viewsDirectory = `${__dirname}/../views`;
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }

}
