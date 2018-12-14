import React, { Component } from 'react';
import { firebaseExp } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import 'bulma/css/bulma.css';
import TimelineTemplate from '../../ui/timelineTemplate';

class Experience extends Component {
  state = {
    experiences: []
  };

  componentDidMount() {
    firebaseExp.once('value').then(snapshot => {
      const experiences = firebaseLooper(snapshot);

      this.setState({
        experiences: experiences.slice(0, experiences.length - 1)
      });
    });
  }

  showExperiences = experiences =>
    experiences
      ? experiences.map(experience => (
          <div>
            <TimelineTemplate experience={experience} />
            {/* <div class="timeline-item">
              <div class="timeline-marker is-icon">
                <i class="fa fa-bookmark" />
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
                </p>
                <p>
                  <span className="is-size-5 has-text-success">
                    {experience.title}
                  </span>
                </p>
                <p>
                  <span>{experience.description}</span>
                </p>
              </div>
            </div> */}
          </div>
        ))
      : null;

  render() {
    return (
      <div class="container">
        <div class="timeline" style={{ padding: '30px' }}>
          <header class="timeline-header">
            <span class="tag is-medium is-primary is-size-5">Career</span>
          </header>
          {this.showExperiences(this.state.experiences)}
        </div>
      </div>
    );
  }
}

export default Experience;
