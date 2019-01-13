import React, { Component } from 'react';
import { firebaseExp } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import 'bulma/css/bulma.css';
import TimelineTemplate from '../ui/timelineTemplate';
import { reverseArray } from '../ui/misc';
import Fade from 'react-reveal/Fade';

class Experience extends Component {
  state = {
    experiences: []
  };

  componentDidMount() {
    firebaseExp.once('value').then(snapshot => {
      const experiences = firebaseLooper(snapshot);

      this.setState({
        experiences: reverseArray(experiences.slice(0, experiences.length - 1))
      });
    });
  }

  showExperiences = experiences =>
    experiences
      ? experiences.map(experience => (
          <Fade left>
            <TimelineTemplate experience={experience} />
          </Fade>
        ))
      : null;

  render() {
    return (
      <div className="container">
        <div className="timeline" style={{ padding: '30px' }}>
          <header>
            <h2 className="has-text-centered tag is-primary  is-size-6">
              Career
            </h2>
          </header>
          {this.showExperiences(this.state.experiences)}
        </div>
      </div>
    );
  }
}

export default Experience;
