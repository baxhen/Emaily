import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { SurveyField } from './SurveyField';
import { validateEmail } from '../../utils/validateEmail';
import { formFields, FieldNames, FieldLabels } from './formFields';

interface SurveyFormProps {
  onSurveySubmit(): void;
}

interface FieldsProps {
  label: string;
  name: string;
}

class _SurveyForm extends React.Component<
  SurveyFormProps & InjectedFormProps<{}, SurveyFormProps>
> {
  renderFields = () => {
    return _.map(formFields, ({ name, label }: FieldsProps) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  };
  render() {
    const { handleSubmit, onSurveySubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onSurveySubmit)}>
          {this.renderFields()}
          <Link
            to="/surveys"
            type="submit"
            className="red btn-flat  white-text"
          >
            <i className="material-icons right">cancel</i>
            Return
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            <i className="material-icons right">done</i>
            Next
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values: any) => {
  const errors = {} as any;
  errors.recipients = validateEmail(values.recipients || '');
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
};

export const SurveyForm = reduxForm<{}, SurveyFormProps>({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(_SurveyForm);
