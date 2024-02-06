const validate = {
	username: { required: "username is required" },
	name: { required: "name is required" },
	password: {
		required: "password is required",
		minLength: {
			value: 6,
			message: "password must be at least 6 characters",
		},
	},
	confirmPassword: {
		required: "confirm password is required",
		validate: (value, { password }) =>
			value === password || "passwords do not match",
	},
};

export default validate;
