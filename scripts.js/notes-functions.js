//Read existing note from localstorage

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }

}

//Save notes to localstorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//delete note function
const removeNote = (id) => {
    notes = notes.filter(note => {
        return note.id !== id
    })
}

//Generate the dom structure for a note
const generateNoteDom = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p')

    //setup the note title text
    if (note.title.length) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = 'Unnnamed Note';
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    //setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

//Sorting notes based on selected option
const sortNotes = (notes, sortBy) => {
    if (sortBy == 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetically') {
        return notes.sort((a, b) => {
            if (a.title > b.title) {
                return 1
            } else if (a.title < b.title) {
                return -1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

//render notes
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes');
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    notesEl.innerHTML = '';

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDom(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to show!';
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }


}

//Generate the last edited message

const generateLastEdited = (timeStamp) => {
    return `Last Edited ${moment(timeStamp).fromNow()}`
}