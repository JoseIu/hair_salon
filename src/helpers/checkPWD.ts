import bcrypt from 'bcrypt';

//passwordForm from req.body.password and Password from user.password (DB)
export const checkPWD = async (passwordForm: string, password: string) => {
  return await bcrypt.compare(passwordForm, password);
};
