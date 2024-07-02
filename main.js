const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { weatherURI } = require('./api/api.js');

const publicDir = path.join(__dirname, 'public');

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('add-notes', (event, note) => {
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    if (fs.existsSync(path.join(publicDir, note + '.txt'))) {
        event.reply('notes-error', 'La note existe déjà !');
        return;
    }

    if (note === '') {
        event.reply('notes-error', 'La note ne peut pas être vide !');
        return;
    }

    fs.writeFileSync(path.join(publicDir, note + '.txt'), note);
    event.reply('notes-saved');
    ipcMain.emit('read-notes', event);
});

ipcMain.on('read-notes', (event) => {
    if (fs.existsSync(publicDir)) {
        const notes = fs.readdirSync(publicDir).map(file => file.replace('.txt', ''));
        event.reply('notes-read', notes);
    } else {
        event.reply('notes-read', []);
    }
});

ipcMain.on('delete-note', (event, note) => {
    if (fs.existsSync(path.join(publicDir, note + '.txt'))) {
        fs.unlinkSync(path.join(publicDir, note + '.txt'));
        event.reply('note-deleted');
        ipcMain.emit('read-notes', event);
    } else {
        event.reply('note-delete-error', 'La note n\'existe pas !');
    }
});

ipcMain.on('get-weather-info', async (event, location) => {
    try {
        const response = await fetch(weatherURI(location));
        const weatherInfo = await response.json();
        event.reply('weather-info-received', weatherInfo);
    } catch (error) {
        event.reply('weather-info-error', 'Erreur lors de la récupération des informations météorologiques');
    }
});
