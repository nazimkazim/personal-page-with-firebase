import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebaseEduMain, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class addEditMainEducation extends Component {
  state = {
    edu_main_Id: '',
    formType: '',
    formError: false,
    formSuccess: '',
    educations_main: [],
    formdata: {
      year_start: {
        element: 'input',
        value: '',
        config: {
          label: 'Start date',
          name: 'year_start',
          type: 'date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
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
      degree: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a degree',
          name: 'degree',
          type: 'text',
          placeholder: 'Bachelor, Masters'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      speciality: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a speciality',
          name: 'speciality',
          type: 'text',
          placeholder: 'Educational Technology'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      university: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a university',
          name: 'university',
          type: 'text',
          placeholder: 'Stanford, Oxford'
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

  updateFields(education_main, educations_main, type, edu_main_Id) {
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
      edu_main_Id,
      formType: type,
      formdata: newFormdata,
      educations_main
    });
  }

  componentDidMount() {
    const edu_main_Id = this.props.match.params.id;
    const getEducationsMain = (education_main, type) => {
      firebaseEduMain.once('value').then(snapshot => {
        const educations_main = firebaseLooper(snapshot);
        //console.log(experiences);

        this.updateFields(education_main, educations_main, type, edu_main_Id);
      });
    };

    if (!edu_main_Id) {
      // Add experience
      getEducationsMain(false, 'Add Education');
    } else {
      // Edit experience
      firebaseDB
        .ref(`education_main/${edu_main_Id}`)
        .once('value')
        .then(snapshot => {
          const education_main = snapshot.val();
          getEducationsMain(education_main, 'Edit Main Education');
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
      if (this.state.formType === 'Edit Main Education') {
        firebaseDB
          .ref(`education_main/${this.state.edu_main_Id}`)
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
        firebaseEduMain
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
                  id={'year_start'}
                  formdata={this.state.formdata.year_start}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'year_finish'}
                  formdata={this.state.formdata.year_finish}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={'degree'}
                  formdata={this.state.formdata.degree}
                  change={element => this.updateForm(element)}
                  placeholder={this.state.formdata.degree.config.placeholder}
                />
                <FormField
                  id={'speciality'}
                  formdata={this.state.formdata.speciality}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'title'}
                  formdata={this.state.formdata.university}
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

export default addEditMainEducation;
