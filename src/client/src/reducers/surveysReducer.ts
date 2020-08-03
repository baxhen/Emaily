import { ActionTypes, Action, Survey } from '../actions';

export const surveysReducer = (state: Survey[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchSurveys:
      return action.payload;
    default:
      return state;
  }
};
