console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const noteOptions = {
    title : { 
        describe : 'Title of note',
        demand : true,
        alias: 't'
    },
    body : {
        describe : 'Body of note',
        demand : true,
        alias : 'b'
    }
};

const argv = yargs
    .command('add','Add a new note', noteOptions)
    .command('list','List all notes')
    .command('read','Print a note', { title : noteOptions.title })
    .command('remove','Remove a note', { title : noteOptions.title })
    .help()
    .argv;

var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs: ', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    
    if (note) {
        console.log('Note created.');
        notes.logNote( note );
    } else {
        console.log('Note already in use...');
    }
}else if (command === 'list') {
    var allNotes = notes.getAll();

    if (allNotes) {
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach(notes.logNote);    
    } else {
        console.log('There are no notes.');
    }
} else if (command === 'read') {
    var note = notes.getNote(argv.title);

    if ( note ) {
        console.log('Note found.');
        notes.logNote( note );
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}else{
    console.log('Command not recognized');
}