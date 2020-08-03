import { ActionTypes, Action, User } from '../actions';

const INITIAL_STATE = {
  _id: 'default',
  googleId: '',
  credits: 0,
};

export const authReducer = (state: User = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUser:
      return action.payload;
    default:
      return state;
  }
};
