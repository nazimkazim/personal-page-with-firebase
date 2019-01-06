import React, { Component } from 'react';
import { firebaseEduAdd } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { reverseArray } from '../ui/misc';
import TimelineTemplateEduAdd from '../ui/timelineTemplateEduAdd';
import Fade from 'react-reveal/Fade';

class AdditionalEducation extends Component {
  state = {
    educations_additional: [],
    isLoading: true
  };

  componentDidMount() {
    firebaseEduAdd.once('value').then(snapshot => {
      const educations_additional = firebaseLooper(snapshot);

      this.setState({
        educations_additional: reverseArray(educations_additional)
      });
    });
  }

  showAdditionalEducation = educations_additional =>
    educations_additional
      ? educations_additional.map(education_additional => (
          <Fade right>
            <TimelineTemplateEduAdd education={education_additional} />
          </Fade>
        ))
      : null;

  render() {
    return (
      <div className="timeline" style={{ padding: '30px' }}>
        <header className="timeline-header">
          <span className="tag is-medium is-primary is-size-5 is-uppercase">
            Additional Education
          </span>
        </header>
        {this.showAdditionalEducation(this.state.educations_additional)}
      </div>
    );
  }
}

export default AdditionalEducation;
