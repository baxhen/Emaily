import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';

import { SurveyForm } from './SurveyForm';
import { SurveyFormReview } from './SurveyFormReview';

interface SurveyNewFormProps {}

class _SurveyNew extends React.Component<
  SurveyNewFormProps & InjectedFormProps<{}, SurveyNewFormProps>
> {
  state = {
    showFormReview: false,
  };

  changeStateShowFormReview = () => {
    this.setState({ showFormReview: !this.state.showFormReview });
  };
  renderSurveyFormOrSurveyFormReview = () => {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview onSurveyCancel={this.changeStateShowFormReview} />
      );
    }
    return <SurveyForm onSurveySubmit={this.changeStateShowFormReview} />;
  };

  renderContent = () => {
    return this.renderSurveyFormOrSurveyFormReview();
  };
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export const SurveyNew = reduxForm({
  form: 'surveyForm',
})(_SurveyNew);
