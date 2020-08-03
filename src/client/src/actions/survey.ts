import axios from 'axios';
import { Dispatch } from 'redux';

import { ActionTypes } from './types';
import { FieldNames } from '../components/surveys/formFields';
import { User } from './auth';
import history from '../history';

export interface Survey {
  yes: number;
  no: number;
  title: string;
  lastResponded?: Date;
  _id: string;
  dateSent: string;
  body: string;
}

export interface SubmitSurveyAction {
  type: ActionTypes.fetchUser;
  payload: User;
}

export interface FetchSurveysAction {
  type: ActionTypes.fetchSurveys;
  payload: Survey;
}

export const submitSurvey = (values: FieldNames) => async (
  dispatch: Dispatch
) => {
  const response = await axios.post<User>('/api/surveys', values);

  dispatch<SubmitSurveyAction>({
    type: ActionTypes.fetchUser,
    payload: response.data,
  });

  history.push('/surveys');
};

export const fetchSurveys = () => async (dispatch: Dispatch) => {
  const response = await axios.get<Survey>('/api/surveys');
  console.log(response);

  dispatch<FetchSurveysAction>({
    type: ActionTypes.fetchSurveys,
    payload: response.data,
  });
};
