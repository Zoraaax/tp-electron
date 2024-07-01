window.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('add-note');
    if (addNoteButton) {
        addNoteButton.addEventListener('click', () => {
            const note = document.getElementById('note').value;
            window.electronAPI.saveNotes(note);
        });
    }

    window.electronAPI.readNotes();

    const searchButton = document.getElementById('get-weather');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            window.electronAPI.getWeatherInfo();
        });
    }
});
