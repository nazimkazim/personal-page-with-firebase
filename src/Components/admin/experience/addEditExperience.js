import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebaseExp, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class addEditExperience extends Component {
  state = {
    expId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    formdata: {
      date_start: {
        element: 'input',
        value: '',
        config: {
          label: 'Start date',
          name: 'date_start',
          type: 'date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      date_finish: {
        element: 'input',
        value: '',
        config: {
          label: 'Finish date',
          name: 'date_finish',
          type: 'date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      current: {
        element: 'select',
        value: '',
        config: {
          label: 'Select yes if it is your current job',
          name: 'select_current',
          type: 'select',
          options: [
            { key: 'true', value: 'yes' },
            { key: 'false', value: 'no' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      city: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a city',
          name: 'city',
          type: 'text',
          placeholder: 'Moscow, Almaty'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      company: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a company',
          name: 'company',
          type: 'text',
          placeholder: 'Google, Facebook'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      title: {
        element: 'input',
        value: '',
        config: {
          label: 'Type your position',
          name: 'title',
          type: 'text',
          placeholder: 'Manager, Engineer, Teacher'
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
          label: 'Describe your duties at work',
          name: 'description',
          type: 'text',
          placeholder: 'I was responsible for managing large projects'
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

  updateFields(experience, currentOptions, experiences, type, expId) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (experience) {
        newFormdata[key].value = experience[key];
        newFormdata[key].valid = true;
      }

      if (key === 'current') {
        newFormdata[key].config.options = currentOptions;
      }
    }
    this.setState({
      expId,
      formType: type,
      formdata: newFormdata,
      experiences
    });
  }

  componentDidMount() {
    const expId = this.props.match.params.id;
    const getExperiences = (experience, type) => {
      firebaseExp.once('value').then(snapshot => {
        const experiences = firebaseLooper(snapshot);
        const currentOptions = [];
        snapshot.forEach(childSnapshot => {
          currentOptions.push({
            key: childSnapshot.val().current,
            value: childSnapshot.val().current
          });
        });
        this.updateFields(experience, currentOptions, experiences, type, expId);
        //console.log(experiences);
        //console.log(currentOptions);
      });
    };

    if (!expId) {
      // Add experience
    } else {
      // Edit experience
      firebaseDB
        .ref(`experience/${expId}`)
        .once('value')
        .then(snapshot => {
          const experience = snapshot.val();
          getExperiences(experience, 'Edit experience');
          //console.log(experience);
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
                  id={'date_start'}
                  formdata={this.state.formdata.date_start}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'date_finish'}
                  formdata={this.state.formdata.date_finish}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'select_current'}
                  formdata={this.state.formdata.current}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'city'}
                  formdata={this.state.formdata.city}
                  change={element => this.updateForm(element)}
                  placeholder={this.state.formdata.city.config.placeholder}
                />
                <FormField
                  id={'company'}
                  formdata={this.state.formdata.company}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'title'}
                  formdata={this.state.formdata.title}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'description'}
                  formdata={this.state.formdata.description}
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

export default addEditExperience;
