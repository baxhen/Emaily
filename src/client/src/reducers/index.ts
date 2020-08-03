import { combineReducers } from 'redux';
import { reducer as formReducer, FormReducer, FormState } from 'redux-form';

import { authReducer } from './authReducer';
import { surveysReducer } from './surveysReducer';
import { User, Survey } from '../actions';
import { FieldNames } from '../components/surveys/formFields';

export interface SurveyFormState extends FormState {
  values: FieldNames;
}

interface SurveyForm extends FormReducer {
  surveyForm: SurveyFormState;
}

export interface StoreState {
  auth: User;
  form: SurveyForm;
  surveys: Survey[];
}

export const reducers = combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveysReducer,
});
