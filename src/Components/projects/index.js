import React, { Component } from 'react';
import { firebaseProjects } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
import { reverseArray } from '../ui/misc';

export default class Projects extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    firebaseProjects.once('value').then(snapshot => {
      const projects = firebaseLooper(snapshot);

      this.setState({
        projects: reverseArray(projects)
      });
    });
  }

  showProjects = projects =>
    projects
      ? projects.map(project => (
          <div class="card" style={{ marginBottom: '15px' }}>
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="https://placeimg.com/420/320/tech/grayscale"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 has-text-centered is-size-6-mobile">
                    {project.project_name}
                  </p>
                </div>
              </div>

              <div class="content">{project.description}</div>
              <div className="tags are-medium">
                <a
                  className="tag is-success is-medium"
                  href={project.project_link}
                  target="_blank"
                >
                  Github
                </a>
                <a
                  className="tag is-success is-medium"
                  href={project.project_source_code}
                  target="_blank"
                >
                  Source code
                </a>
              </div>
            </div>
          </div>
        ))
      : null;

  render() {
    const padding = {
      padding: '30px',
      boxSizing: 'border-box'
    };
    return (
      <div className="container">
        <div className="columns" style={padding}>
          <div className="column is-6 is-offset-3">
            {this.showProjects(this.state.projects)}
          </div>
        </div>
      </div>
    );
  }
}
