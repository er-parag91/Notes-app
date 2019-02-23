const id = location.hash.substr(1)
let notes = getSavedNotes();

let note = notes.find(note => {
    return note.id === id
})

if (!note) {
    location.assign('index.html')
}

document.querySelector('#note-title').value = note.title;
document.querySelector('#note-body').value = note.body;
document.querySelector('#last-edited').textContent = generateLastEdited(note.updatedAt)

document.querySelector('#note-title').addEventListener('change', (e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
})

document.querySelector('#note-body').addEventListener('change', (e) => {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
})

document.querySelector('#remove-button').addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('index.html')
})
document.querySelector('#home-button').addEventListener('click', () => {
    location.assign('index.html')
})


window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(note => {
            return note.id === id
        })

        if (note === undefined) {
            location.assign('index.html')
        }

        document.querySelector('#note-title').value = note.title;
        document.querySelector('#note-body').value = note.body;
        document.querySelector('#last-edited').textContent = generateLastEdited(note.updatedAt)
    }
})