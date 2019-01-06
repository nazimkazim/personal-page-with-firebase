import React, { Component } from 'react';
import MainEducationTimeline from './MainEducationTimeline';
import AdditionalEducationTimeline from './AdditionalEducationTimeline';

class EducationMainAdditional extends Component {
  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-half">
            <MainEducationTimeline />
          </div>
          <div className="column is-half">
            <AdditionalEducationTimeline />
          </div>
        </div>
      </div>
    );
  }
}

export default EducationMainAdditional;
