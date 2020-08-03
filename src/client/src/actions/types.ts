import { FetchUserAction } from './auth';
import { SubmitSurveyAction, FetchSurveysAction } from './survey';

export enum ActionTypes {
  fetchUser,
  submitSurvey,
  fetchSurveys,
}

export type Action = FetchUserAction | SubmitSurveyAction | FetchSurveysAction;
