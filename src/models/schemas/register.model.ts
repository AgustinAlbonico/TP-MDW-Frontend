interface RegisterSchema {
  email: string;
  name: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  profilePicture?: FileList;
  birthdate: string;
}

export default RegisterSchema;
