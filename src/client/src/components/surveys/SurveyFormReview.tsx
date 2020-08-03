import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { StoreState } from '../../reducers';
import { FieldNames, FieldLabels } from './formFields';
import { formFields } from './formFields';
import { submitSurvey } from '../../actions';

interface SurveyFormReviewProps {
  onSurveyCancel(): void;
  submitSurvey(values: FieldNames): void;
  formValues: FieldNames;
}

type Field = {
  name: keyof FieldNames;
  label: keyof FieldLabels;
};

class _SurveyFormReview extends React.Component<SurveyFormReviewProps> {
  renderReviewFields = () => {
    const { formValues } = this.props;

    return _.map(formFields, (field: Field) => {
      const { name, label } = field;
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  };

  onSubmitSurveyClicked = () => {
    const { submitSurvey, formValues } = this.props;
    submitSurvey(formValues);
  };

  render() {
    const { onSurveyCancel } = this.props;
    return (
      <div>
        <h5>Please confirm your entries</h5>
        <div>{this.renderReviewFields()}</div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onSurveyCancel}
        >
          Cancel
        </button>
        <button
          className="green btn-flat right white-text"
          onClick={this.onSubmitSurveyClicked}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return { formValues: state.form.surveyForm.values };
};

export const SurveyFormReview = connect(mapStateToProps, { submitSurvey })(
  _SurveyFormReview
);
