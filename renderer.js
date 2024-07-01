const fs = require('fs');
const path = require('path');
const { weatherURI } = require('./api/api.js');

const publicDir = path.join(__dirname, 'public');

function saveNotes(notes) {
    const notesList = document.getElementById('notes-list');
    const liElement = document.createElement('li');
    const pElement = document.createElement('p');
    const buttonElement = document.createElement('button');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    if (fs.existsSync(path.join(publicDir, notes + '.txt'))) {
        alert('La note existe déjà !');
        return;
    }

    if (notes === '') {
        alert('La note ne peut pas être vide !');
        return;
    }

    buttonElement.textContent = 'Delete';
    buttonElement.addEventListener('click', () => {
        fs.unlinkSync(path.join(publicDir, notes + '.txt'));
        notesList.removeChild(liElement);
    });
    notesList.appendChild(liElement);
    pElement.textContent = notes;
    liElement.appendChild(pElement);
    liElement.appendChild(buttonElement);

    fs.writeFileSync(path.join(publicDir, notes + '.txt'), notes);
}

function readNotes() {
    const notesList = document.getElementById('notes-list');
    if (fs.existsSync(publicDir)) {
        const notes = fs.readdirSync(publicDir);

        notes.forEach(note => {
            const liElement = document.createElement('li');
            const pElement = document.createElement('p');
            const buttonElement = document.createElement('button');

            buttonElement.textContent = 'Delete';
            buttonElement.addEventListener('click', () => {
                fs.unlinkSync(path.join(publicDir, note));
                notesList.removeChild(liElement);
            });
            notesList.appendChild(liElement);
            pElement.textContent = note.replace('.txt', '');
            liElement.appendChild(pElement);
            liElement.appendChild(buttonElement);
        });
    }
}

async function getWeatherInfo() {
    const searchValue = document.getElementById('search').value;
    const weatherInfo = document.getElementById('weather-info');
    const weather = weatherURI(searchValue);
    await fetch(weather)
        .then(response => response.json())
        .then(data => {
            const { name, wind, main, weather } = data;
            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <p>Temperature: ${main.temp}°C</p>
                <p>Vitesse du vent : ${wind.speed} m/s</p>
                <p>Météo : ${weather[0].main}, ${weather[0].description}</p>
            `;
        })
        .catch(error => {
            weatherInfo.innerHTML = `
                <h2>Pays ou Ville Introuvable</h2>
            `;
            console.error(error);
        });
}

window.electronAPI = {
    saveNotes,
    readNotes,
    getWeatherInfo
};
