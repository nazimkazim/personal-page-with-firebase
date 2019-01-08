import React, { Component } from 'react';
import { firebaseEduMain } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { reverseArray } from '../ui/misc';
import TimelineTemplateEduMain from '../ui/timelineTemplateEduMain';
import Fade from 'react-reveal/Fade';

class MainEducation extends Component {
  state = {
    educations_main: [],
    isLoading: true
  };

  componentDidMount() {
    firebaseEduMain.once('value').then(snapshot => {
      const educations_main = firebaseLooper(snapshot);

      this.setState({
        educations_main: reverseArray(educations_main)
      });
    });
  }

  showMainEducation = educations_main =>
    educations_main
      ? educations_main.map(education_main => (
          <Fade left>
            <TimelineTemplateEduMain education={education_main} />
          </Fade>
        ))
      : null;

  render() {
    return (
      <div className="timeline" style={{ padding: '30px' }}>
        <header className="timeline-header">
          <span className="tag is-medium is-primary is-size-6 is-uppercase">
            Main Education
          </span>
        </header>
        {this.showMainEducation(this.state.educations_main)}
      </div>
    );
  }
}

export default MainEducation;
