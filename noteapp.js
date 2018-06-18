const fs = require('fs');
const _ = require('lodash')
const yargs = require('yargs');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};


const argv = yargs
  .command('addNote', 'Add a new note', {
    body: bodyOptions,
    title: titleOptions
  })
  .command('getAllNotes', 'To get all notes')
  .command('Read', 'Reading a note', {
    title: titleOptions
  })
  .command('Remove', 'Removing a note', {
    title: titleOptions
  })
  .help()
  .argv;

var command = argv._[0];

var notes = require('./notes.js');

//console.log('Process.Argv',process.argv);
//console.log('Yargs.Argv',yargs.argv);
//console.log('Command:',command);

if (command === 'addNote') {
  console.log('Adding notes');
  var note = notes.addNote(argv.title, argv.body);
  if (typeof(note) === "undefined") {
    console.log("This is a duplicate title");
  } else {
    notes.logNote(note);
  }
} else if (command === 'getAllNotes') {
  console.log("All note(s) :");
  var notem = notes.getAllNotes();
  var i;
  for (i = 0; i < notem.length; i++) {
    notes.logNote(notem[i]);
  }

} else if (command === 'Remove') {

  var noteremoved = notes.Remove(argv.title);
  var message = noteremoved ? 'Note was removed' : 'Note was not found';
  console.log(message);

} else if (command === 'Read') {
  var note = notes.Read(argv.title);
  if (note) {
    notes.logNote(note);
  } else {
    console.log('No such note with that title');
  }
} else {
  console.log('Not recognized, chutiya banaya');
}
