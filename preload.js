const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveNotes: (note) => {
        ipcRenderer.send('add-notes', note);
    },
    readNotes: () => {
        ipcRenderer.send('read-notes');
    },
    getWeatherInfo: (location) => {
        ipcRenderer.send('get-weather-info', location);
    },
    onNotesRead: (callback) => {
        ipcRenderer.on('notes-read', (event, notes) => callback(notes));
    },
    onWeatherInfoReceived: (callback) => {
        ipcRenderer.on('weather-info-received', (event, weatherInfo) => callback(weatherInfo));
    },
    deleteNote: (note) => {
        ipcRenderer.send('delete-note', note);
    },
});
