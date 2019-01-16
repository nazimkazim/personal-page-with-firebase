import React, { Component } from 'react';
import AdminLayout from '../../../../Hoc/AdminLayout';
import FormField from '../../../ui/formFields';
import { validate } from '../../../ui/misc';
import { firebaseAboutMe, firebaseDB } from '../../../../firebase';

class AddEditAboutMe extends Component {
  state = {
    about_me_ID: '',
    formType: '',
    formError: false,
    formSuccess: '',
    about_me: [],
    formdata: {
      title: {
        element: 'input',
        value: '',
        config: {
          label: 'Type a title',
          name: 'title',
          type: 'text',
          placeholder: 'About me, My bio'
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
          label: 'Describe your about',
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

  updateFields(about, about_me, type, about_me_ID) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (about) {
        newFormdata[key].value = about[key];
        newFormdata[key].valid = true;
      }
    }
    this.setState({
      about_me_ID,
      formType: type,
      formdata: newFormdata,
      about_me
    });
  }

  componentDidMount() {
    const about_me_ID = this.props.match.params.id;
    const getAboutMe = (about, type) => {
      firebaseAboutMe.once('value').then(snapshot => {
        const about_me = snapshot;
        this.updateFields(about, about_me, type, about_me_ID);
      });
    };

    // Edit about
    if (!about_me_ID) {
      // Add about
      getAboutMe(false, 'Add About Me');
    } else {
      firebaseDB
        .ref(`about_me/${about_me_ID}`)
        .once('value')
        .then(snapshot => {
          const about = snapshot.val();
          getAboutMe(about, 'Edit About Me');
          //console.log(about);
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
      if (this.state.formType === 'Edit About Me') {
        firebaseDB
          .ref(`about_me/${this.state.about_me_ID}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
            this.props.history.push('/admin_about_me');
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

export default AddEditAboutMe;
