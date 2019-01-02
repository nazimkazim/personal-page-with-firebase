import React, { Component } from 'react';
import FormField from '../ui/formFields';
import { validate } from '../ui/misc';
import { firebase } from '../../firebase';

class SignIn extends Component {
  state = {
    isActive: '',
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: 'false',
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: 'false',
        validationMessage: ''
      }
    }
  };

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
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch(error => {
          this.setState({
            formError: error
          });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  }

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

  render() {
    const marginStyle = {
      marginTop: '20px',
      marginBottom: '20px'
    };
    return (
      <section className="hero has-background-light is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div
                className="column is-half
is-offset-one-quarter"
              >
                <div className="has-text-centered" style={marginStyle}>
                  <h2 className="is-size-4 is-uppercase has-text-semibold">
                    Login please
                  </h2>
                </div>
                <form onSubmit={event => this.submitForm(event)}>
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control ">
                      <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={element => this.updateForm(element)}
                      />
                      {this.state.formError ? (
                        <div className="help is-danger">
                          Something is wrong. Try again.
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                  </div>
                </form>
                <div className="has-text-centered" style={marginStyle}>
                  <button
                    className="button is-success is-fullwidth"
                    onClick={event => {
                      this.submitForm(event);
                    }}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SignIn;
