import React from 'react';
import Moment from 'react-moment';
import 'bulma/css/bulma.css';

const TimelineTemplate = ({ education }) => {
  return (
    <div class="timeline-item">
      <div class="timeline-marker is-icon">
        <i class="fa fa-circle" />
      </div>
      <div class="timeline-content">
        <p class="heading">
          <span>
            <Moment format="YYYY MMMM">{education.date_finish}</Moment>
          </span>
        </p>
        <p>
          <span className="is-size-6 has-text-grey-dark">
            <strong>{education.organization.toUpperCase()}</strong>
          </span>
          <br />
          <span className="is-size-7 has-text-grey-dark has-text-weight-semibold">
            {education.field.toUpperCase()}
          </span>
        </p>
        <p>
          <span className="is-size-5 has-text-success">
            {education.course_name}
          </span>
        </p>
        <p>
          <a
            className="tag is-success is-medium"
            href={education.link}
            target="_blank"
          >
            View Certificate
          </a>
        </p>
      </div>
    </div>
  );
};

export default TimelineTemplate;
