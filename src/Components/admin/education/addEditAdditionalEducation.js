import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebaseEduAdd, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class addEditAdditionalEducation extends Component {
  state = {
    edu_add_Id: '',
    formType: '',
    formError: false,
    formSuccess: '',
    educations_additional: [],
    formdata: {
      year_finish: {
        element: 'input',
        value: '',
        config: {
          label: 'Finish date',
          name: 'year_finish',
          type: 'date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      field: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a field',
          name: 'field',
          type: 'text',
          placeholder: 'Education, Computer Science'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      course_name: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a course',
          name: 'course',
          type: 'text',
          placeholder: 'React Basics'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      organization: {
        element: 'input',
        value: '',
        config: {
          label: 'Type an organization',
          name: 'organization',
          type: 'text',
          placeholder: 'Stanford, Oxford'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      link: {
        element: 'input',
        value: '',
        config: {
          label: 'Paste a link',
          name: 'link',
          type: 'text',
          placeholder: 'URL'
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

  updateFields(education_main, educations_main, type, edu_add_Id) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (education_main) {
        newFormdata[key].value = education_main[key];
        newFormdata[key].valid = true;
      }
    }
    this.setState({
      edu_add_Id,
      formType: type,
      formdata: newFormdata,
      educations_main
    });
  }

  componentDidMount() {
    const edu_add_Id = this.props.match.params.id;
    const getEducationsAdditional = (education_additional, type) => {
      firebaseEduAdd.once('value').then(snapshot => {
        const educations_additional = firebaseLooper(snapshot);
        //console.log(experiences);

        this.updateFields(
          education_additional,
          educations_additional,
          type,
          edu_add_Id
        );
      });
    };

    if (!edu_add_Id) {
      // Add Additional Education
      getEducationsAdditional(false, 'Add Additional Education');
    } else {
      // Edit experience
      firebaseDB
        .ref(`education_additional/${edu_add_Id}`)
        .once('value')
        .then(snapshot => {
          const education_additional = snapshot.val();
          getEducationsAdditional(
            education_additional,
            'Edit Additional Education'
          );
          //console.log(experience);
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
      if (this.state.formType === 'Edit Additional Education') {
        firebaseDB
          .ref(`education_additional/${this.state.edu_add_Id}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
            this.props.history.push('/admin_education');
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        // add an experience
        firebaseEduAdd
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_education');
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
                  id={'year_finish'}
                  formdata={this.state.formdata.year_finish}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={'field'}
                  formdata={this.state.formdata.field}
                  change={element => this.updateForm(element)}
                  placeholder={this.state.formdata.field.config.placeholder}
                />
                <FormField
                  id={'course_name'}
                  formdata={this.state.formdata.course_name}
                  change={element => this.updateForm(element)}
                  placeholder={
                    this.state.formdata.course_name.config.placeholder
                  }
                />
                <FormField
                  id={'organization'}
                  formdata={this.state.formdata.organization}
                  change={element => this.updateForm(element)}
                  placeholder={
                    this.state.formdata.organization.config.placeholder
                  }
                />

                <FormField
                  id={'link'}
                  formdata={this.state.formdata.link}
                  change={element => this.updateForm(element)}
                  placeholder={this.state.formdata.link.config.placeholder}
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

export default addEditAdditionalEducation;
