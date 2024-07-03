export const validate = (email, password) => {
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const errors = {};
	if (!emailRegEx.test(email)) {
		errors.message = "Please enter a valid email";
	}

	const passwordErrorMessage = validatePassword(password);
	if (passwordErrorMessage) {
		errors.message = passwordErrorMessage;
	}

	return errors;
};

export const validatePassword = (password) => {
	const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
	if (!passwordRegEx.test(password)) {
		return "Please enter a valid password";
	}
};
