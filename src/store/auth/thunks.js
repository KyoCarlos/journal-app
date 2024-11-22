import {
	loginWithEmailPassword,
	logoutFirebase,
	registerUserEmailPassword,
	signInWithGoogle,
} from '../../firebase/providers';
import { login, logout, checkingCredentials } from './authSlice';

export const checkingAuthentication = (email, passwor) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const result = await signInWithGoogle();
		//* Si falla
		if (!result) return dispatch(logout(result.errorMessage));
		//* Si no falla
		dispatch(login(result));
	};
};

export const startCreatingUserWithEmailPassword = ({
	email,
	password,
	displayName,
}) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, errorMessage } = await registerUserEmailPassword(
			{
				email,
				password,
				displayName,
			}
		);
		if (!ok) return dispatch(logout({ errorMessage }));
		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLoginWithEmailPassword = ({ email, password }) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, errorMessage } = await loginWithEmailPassword({
			email,
			password,
		});
		if (!ok) return dispatch(logout({ errorMessage }));
		dispatch(login({ uid, email, photoURL }));
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		await logoutFirebase();

		dispatch(logout());
	};
};
