const validate = {
  username: { required: "username harus diisi" },
  name: { required: "nama harus diisi" },
  email: { required: "email harus diisi" },
  password: {
    required: "password harus diisi",
    minLength: {
      value: 6,
      message: "password minimal 6 karakter",
    },
  },
  confirmPassword: {
    required: "konfirmasi harus diisi",
    validate: (value, { password }) =>
      value === password || "password tidak sama",
  },
};

export default validate;
