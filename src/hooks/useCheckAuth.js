import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal/thunks';

export const useCheckAuth = () => {
	const { status } = useSelector((state) => state.authSlice);
	const dispatch = useDispatch();

	//* Mantener los datos del login (si sigues logeado) al recargar el navegador
	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout());
			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(startLoadingNotes());
		}); // Es un obserbable
	}, []);
	return { status };
};
