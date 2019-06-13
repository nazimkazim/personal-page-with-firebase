import React, { Component } from 'react';
import { firebaseEduAdd } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { reverseArray, descOrder } from '../ui/misc';
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
        educations_additional: descOrder(educations_additional)
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
        <header>
          <h2 className="has-text-centered tag is-primary is-size-6">
            Additional Education
          </h2>
        </header>
        {this.showAdditionalEducation(this.state.educations_additional)}
      </div>
    );
  }
}

export default AdditionalEducation;
