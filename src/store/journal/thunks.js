import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
	addNewEmptyNote,
	savingNewNote,
	setActiveNote,
	setNotes,
} from './journalSlice';
import { loadNotes } from '../../helpers';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());
		const { uid } = getState().authSlice;
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};
		//* ingresar nota en base de datos
		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		const resp = await setDoc(newDoc, newNote);
		newNote.id = newDoc.id;
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().authSlice;
		if (!uid) throw new Error('El uid del usuario no existe');

		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};
