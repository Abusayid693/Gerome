import {User} from '../../models/User';

export const checkIfCustomerExists = (error: any) => {
  return error.code === 11000 ? true : false;
};

export const getReferencedUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({email});
    return user ? user._id : null;
  } catch (error) {
    return null;
  }
};
