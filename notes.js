const fs = require('fs');

var fetchnote = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
};

var savenote = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchnote();
  var note = {
    title,
    body
  };

  var duplicate = notes.filter((note) => {
    return note.title === title
  });
  if (duplicate.length === 0) {
    notes.push(note);
    savenote(notes);
    return note;
  }
};

var getAllNotes = () => {
  return fetchnote();
};

var Remove = (title) => {
  var notes = fetchnote();
  var newnotes = notes.filter(not => not.title !== title)
  savenote(newnotes);

  return notes.length != newnotes.length;
};

var Read = (title) => {
  var notes = fetchnote();
  var foundNote = notes.filter((not) => {
    return not.title === title;
  });
  return foundNote[0];
};

var logNote = ((note) => {
  console.log('--');
  console.log('Title:' + note.title);
  console.log('Content: ' + note.body);
});





module.exports = {
  addNote,
  getAllNotes,
  Remove,
  Read,
  logNote
}
