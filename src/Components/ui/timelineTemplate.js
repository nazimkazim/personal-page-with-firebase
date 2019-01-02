import React from 'react';
import Moment from 'react-moment';
import 'bulma/css/bulma.css';

const TimelineTemplate = ({ experience }) => {
  return (
    <div class="timeline-item">
      <div class="timeline-marker is-icon">
        <i class="fa fa-circle" />
      </div>
      <div class="timeline-content">
        <p class="heading">
          <span>
            <Moment format="YYYY MMMM">{experience.date_start}</Moment>-
            <Moment format="YYYY MMMM">{experience.date_finish}</Moment>
          </span>
        </p>
        <p>
          <span className="is-size-6 has-text-grey-dark">
            <strong>{experience.company.toUpperCase()}</strong>
          </span>
          <br />
          <span className="is-size-7 has-text-grey-dark has-text-weight-semibold">
            {experience.city.toUpperCase()}
          </span>
        </p>
        <p>
          <span className="is-size-5 has-text-success">{experience.title}</span>
        </p>
        <p>
          <span>{experience.description}</span>
        </p>
      </div>
    </div>
  );
};

export default TimelineTemplate;
