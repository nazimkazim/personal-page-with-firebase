import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebaseProjects, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class addEditProjects extends Component {
  state = {
    projectID: '',
    formType: '',
    formError: false,
    formSuccess: '',
    projects: [],
    formdata: {
      project_name: {
        element: 'input',
        value: '',
        config: {
          label: 'Project Name',
          name: 'project_name',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      project_link: {
        element: 'input',
        value: '',
        config: {
          label: 'Paste a link to project',
          name: 'project_link',
          type: 'text',
          placeholder: 'https://www.google.com'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      project_source_code: {
        element: 'input',
        value: '',
        config: {
          label: 'Paste project source code',
          name: 'source code',
          type: 'text',
          placeholder: 'Github'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Describe your project',
          name: 'description',
          type: 'text',
          placeholder: 'This is a small project which does this and this'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  updateForm(element) {
    const newFormdata = {
      ...this.state.formdata
    };

    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;
    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormdata[element.id] = newElement;
    //console.log(newFormdata);

    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  updateFields(project, projects, type, projectID) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (project) {
        newFormdata[key].value = project[key];
        newFormdata[key].valid = true;
      }
    }
    this.setState({
      projectID,
      formType: type,
      formdata: newFormdata,
      projects
    });
  }

  componentDidMount() {
    const projectID = this.props.match.params.id;
    const getProjects = (project, type) => {
      firebaseProjects.once('value').then(snapshot => {
        const projects = firebaseLooper(snapshot);
        //console.log(projects);

        this.updateFields(project, projects, type, projectID);
      });
    };

    if (!projectID) {
      // Add project
      getProjects(false, 'Add project');
    } else {
      // Edit project
      firebaseDB
        .ref(`projects/${projectID}`)
        .once('value')
        .then(snapshot => {
          const project = snapshot.val();
          getProjects(project, 'Edit project');
          //console.log(project);
        });
    }
  }

  successForm(message) {
    this.setState({
      formSuccess: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid =
        this.state.formdata[key].valid &&
        formIsValid &&
        this.state.formdata[key].value !== '';
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit project') {
        firebaseDB
          .ref(`projects/${this.state.projectID}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
            this.props.history.push('/admin_projects');
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        // add an project
        firebaseProjects
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_projects');
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  render() {
    return (
      <AdminLayout>
        <h2
          className="tag is-primary is-size-5 is-uppercase"
          style={{ marginTop: '10px' }}
        >
          {this.state.formType}
        </h2>
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <form onSubmit={event => this.submitForm(event)}>
                <FormField
                  id={'project_name'}
                  formdata={this.state.formdata.project_name}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'project_link'}
                  formdata={this.state.formdata.project_link}
                  change={element => this.updateForm(element)}
                  placeholder={
                    this.state.formdata.project_link.config.placeholder
                  }
                />
                <FormField
                  id={'project_source_code'}
                  formdata={this.state.formdata.project_source_code}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'description'}
                  formdata={this.state.formdata.description}
                  placeholder={this.state.formdata.description.placeholder}
                  change={element => this.updateForm(element)}
                />
                <div className="help is-success">{this.state.formSuccess}</div>
                {this.state.formError ? <div>Something is wrong</div> : ''}

                <a
                  class="button is-info is-hovered"
                  onClick={event => {
                    this.submitForm(event);
                  }}
                >
                  {this.state.formType}
                </a>
              </form>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default addEditProjects;
