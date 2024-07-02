const addNoteButton = document.getElementById('add-note');
addNoteButton.addEventListener('click', () => {
    const note = document.getElementById('note').value;
    window.electronAPI.saveNotes(note);
});

const searchButton = document.getElementById('get-weather');
searchButton.addEventListener('click', () => {
    const searchValue = document.getElementById('search').value;
    window.electronAPI.getWeatherInfo(searchValue);
});

window.electronAPI.onNotesRead((notes) => {
    displayNotes(notes);
});

window.electronAPI.onWeatherInfoReceived((weatherInfo) => {
    displayWeatherInfo(weatherInfo);
});

window.electronAPI.onNoteDeleted(() => {
    window.electronAPI.readNotes();
});

function displayNotes(notes) {
    const notesList = document.getElementById('notes-list');
    notesList.innerText = '';

    notes.forEach(note => {
        const liElement = document.createElement('li');
        const pElement = document.createElement('p');
        const buttonElement = document.createElement('button');

        buttonElement.textContent = 'Delete';
        buttonElement.addEventListener('click', () => {
            window.electronAPI.deleteNote(note);
            notesList.removeChild(liElement);
        });
        notesList.appendChild(liElement);
        pElement.textContent = note;
        liElement.appendChild(pElement);
        liElement.appendChild(buttonElement);
    });
}

function displayWeatherInfo(weatherInfo) {
    const weatherInfoElement = document.getElementById('weather-info');
    const { name, wind, main, weather } = weatherInfo;

    weatherInfoElement.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Vitesse du vent : ${wind.speed} m/s</p>
        <p>Météo : ${weather[0].main}, ${weather[0].description}</p>
    `;
}

window.electronAPI.readNotes();