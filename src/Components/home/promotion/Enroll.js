import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

export default class Enroll extends Component {
  state = {
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
      }
    }
  };

  submitForm() {}

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
    console.log(newFormdata);

    this.setState({
      formdata: newFormdata
    });
  }

  render() {
    return (
      <Fade>
        <div>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              {/* <div>Enter your email</div>
              <div>
                <FormField
                  id={'email'}
                  formdata={this.state.formdata.email}
                  change={element => this.updateForm(element)}
                />
              </div> */}

              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope" />
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check" />
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock" />
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    );
  }
}
