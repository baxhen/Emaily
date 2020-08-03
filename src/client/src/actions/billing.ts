import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { Token } from 'react-stripe-checkout';

import { FetchUserAction, User } from './auth';

export const handleToken = (token: Token) => async (dispatch: Dispatch) => {
  const response = await axios.post<User>('/api/stripe', token);

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data,
  });
};
