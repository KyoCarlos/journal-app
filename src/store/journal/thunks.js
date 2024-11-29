import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
	addNewEmptyNote,
	savingNewNote,
	setActiveNote,
	setNotes,
	setPhotosToActiveNote,
	setSaving,
	updateNote,
} from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';

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

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());
		const { uid } = getState().authSlice;
		const { active: note } = getState().journalSlice;

		const noteToFireStore = { ...note };
		delete noteToFireStore.id; // eliminamos la propiedad id antes de mandar el cambio a firebase

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); // id de note original no de noteFireStore
		await setDoc(docRef, noteToFireStore, { merge: true });

		dispatch(updateNote(note));
	};
};
export const startUploadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());
		// await fileUpload(files[0]);
		const fileUploadPromise = [];
		for (const file of files) {
			// creando el arreglo de promesas
			fileUploadPromise.push(fileUpload(file));
		}

		const photosUrl = await Promise.all(fileUploadPromise);
		dispatch(setPhotosToActiveNote(photosUrl));
	};
};
