import { Error, User } from '../baseTypes';

export interface MeResponse {
  success: boolean;
  data: {
    user: User;
  };
  errors: Error;
}
