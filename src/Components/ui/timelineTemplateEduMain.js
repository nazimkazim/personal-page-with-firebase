import React from 'react';
import Moment from 'react-moment';
import 'bulma/css/bulma.css';

const TimelineTemplateEduMain = ({ education }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-marker is-icon">
        <i className="fa fa-circle" />
      </div>
      <div className="timeline-content">
        <p className="heading">
          <span>
            <Moment format="YYYY MMMM">{education.year_start}</Moment>-
            <Moment format="YYYY MMMM">{education.year_finish}</Moment>
          </span>
        </p>
        <p>
          <span className="is-size-6 has-text-grey-dark">
            <strong>{education.university.toUpperCase()}</strong>
          </span>
          <br />
          <span className="is-size-7 has-text-grey-dark has-text-weight-semibold">
            {education.degree.toUpperCase()}
          </span>
        </p>
        <p>
          <span className="is-size-5 has-text-success">
            {education.speciality}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TimelineTemplateEduMain;
