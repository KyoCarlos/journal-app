import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	useEffect(() => {
		createValidations();
	}, [formState]);

	//* Si cualquiera de los valores del formulario no pasa la validación retorna falso, el formulario no es valido
	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue] !== null) return false;
		}
		return true;
	}, [formValidation]);

	// Función para poder ver los cambios en el formulario, ya que react trabaja con una sola via, tambien desestructaremos el 'event'
	const onInputChange = ({ target }) => {
		// Sacamos del target los valores que necesitamos
		const { name, value } = target;

		// Usamos la funcion de useState para controlar el estado del formulario
		setFormState({
			...formState,
			// Con las propidades computadas de javascript, añadimos la propiedad name al objeto
			[name]: value,
		});
	};

	// Resetea el formulario
	const onResetForm = () => {
		setFormState(initialForm);
	};

	const createValidations = () => {
		const formCheckedValues = {};
		// Recoremos el objeto formValidations
		for (const formField of Object.keys(formValidations)) {
			const [fn, errorMesage = 'Errores de validación'] =
				formValidations[formField];
			// Comprobamos las validaciones
			formCheckedValues[`${formField}Valid`] = fn(formState[formField])
				? null // Se ha cumplido la validación
				: errorMesage; // No se ha cumplido la validación
		}
		setFormValidation(formCheckedValues);
		// console.log(formCheckedValues);
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid,
	};
};
