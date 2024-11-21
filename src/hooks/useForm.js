import { useState } from 'react';

export const useForm = (initialForm = {}) => {
	const [formState, setFormState] = useState(initialForm);

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

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
	};
};
