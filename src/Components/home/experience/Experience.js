import React, { Component } from 'react';
import { firebaseExp } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class Experience extends Component {
  state = {
    experiences: [],
    about_me_title: '',
    about_me_description: ''
  };

  componentDidMount() {
    firebaseExp.once('value').then(snapshot => {
      const experiences = firebaseLooper(snapshot);
      console.table(experiences);
      const about_me_title = snapshot.val().about_me.title;
      const about_me_description = snapshot.val().about_me.description;

      this.setState({
        about_me_title,
        about_me_description,
        experiences
      });
    });
  }

  showExperiences = experiences =>
    experiences
      ? experiences.map(experience => (
          <div>
            <div>{experience.company}</div>
            <div>{experience.date_start}</div>
            <div>{experience.date_finish}</div>
            <div>{experience.city}</div>
            <div>{experience.description}</div>
            <div>{experience.title}</div>
          </div>
        ))
      : null;

  render() {
    return <div>{this.showExperiences(this.state.experiences)}</div>;
  }
}

export default Experience;
