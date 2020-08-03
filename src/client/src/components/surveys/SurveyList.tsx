import React from 'react';
import { connect } from 'react-redux';

import { StoreState } from '../../reducers';
import { fetchSurveys, Survey } from '../../actions';

interface SurveyListProps {
  fetchSurveys(): void;
  surveys: Survey[];
}

class _SurveyList extends React.Component<SurveyListProps> {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      const { lastResponded, _id, body, title, dateSent } = survey;
      return (
        <div className="card blue-grey darken-1" key={_id}>
          <div className="card-content">
            <span className="card-title">{title}</span>
            <p>{body}</p>
            {lastResponded ? (
              <p className="left">
                Last Responded On:{' '}
                {new Date(lastResponded).toLocaleDateString()}
              </p>
            ) : (
              ''
            )}

            <p className="right">
              Sent On: {new Date(dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = (state: StoreState) => {
  return { surveys: state.surveys };
};

export const SurveyList = connect(mapStateToProps, { fetchSurveys })(
  _SurveyList
);
