import React, { Component } from "react";
import classNames from "classnames";
import { firebasePromotions } from "../../../firebase";
import FormField from "../../ui/formFields";
import { validate } from "../../ui/misc";

class ContactMe extends Component {
  state = {
    isActive: "",
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: "false",
        validationMessage: ""
      },
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: "false",
        validationMessage: ""
      },
      country: {
        element: "input",
        value: "",
        config: {
          name: "country_input",
          type: "text",
          placeholder: "Enter your country"
        },
        validation: {
          required: true
        },
        valid: "false",
        validationMessage: ""
      },
      checked: {
        value: "false",
        validation: {
          required: false
        },
        valid: "false",
        validationMessage: ""
      }
    }
  };

  modalOpen = event => {
    event.preventDefault();
    this.setState({
      isActive: "is-active"
    });
  };

  modalClose = event => {
    event.preventDefault();
    this.setState({
      isActive: ""
    });
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
        this.state.formdata[key].value !== "";
    }

    if (formIsValid) {
      firebasePromotions
        .orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasePromotions.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
      //console.log(dataToSubmit);
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
    console.log(newFormdata);

    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  resetFormSuccess(type) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (key === "checked") {
        newFormdata[key].value = "false";
      }
      newFormdata[key].value = "";
      newFormdata[key].valid = false;
      newFormdata[key].validationMessage = "";
    }

    this.setState({
      formError: false,
      formdata: newFormdata,
      formSuccess: type ? "Congratulations" : "already in the database"
    });

    this.successMessage();
  }

  successMessage() {
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  }
  render() {
    return (
      <div>
        <div className={classNames("modal", this.state.isActive)}>
          <div className="modal-background" />
          <div className="modal-card">
            <form onSubmit={event => this.submitForm(event)}>
              <header className="modal-card-head">
                <p className="modal-card-title has-text-centered">
                  Please, leave your details
                </p>
              </header>
              <section className="modal-card-body">
                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left has-icons-right">
                    <FormField
                      id={"email"}
                      formdata={this.state.formdata.email}
                      change={element => this.updateForm(element)}
                    />
                    <FormField
                      id={"name"}
                      formdata={this.state.formdata.name}
                      change={element => this.updateForm(element)}
                    />
                    <FormField
                      id={"country"}
                      formdata={this.state.formdata.country}
                      change={element => this.updateForm(element)}
                    />
                    {this.state.formError ? (
                      <div className="help is-danger">
                        Something is wrong, try again
                      </div>
                    ) : (
                      <div className="help is-success">
                        {this.state.formSuccess}
                      </div>
                    )}
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  onClick={event => {
                    this.submitForm(event);
                  }}
                >
                  Save changes
                </button>
                <button
                  className="button"
                  onClick={event => this.modalClose(event)}
                >
                  Cancel
                </button>
              </footer>
            </form>
          </div>
        </div>

        <div className="has-text-centered">
          <button
            className="button is-success is-medium"
            onClick={event => this.modalOpen(event)}
          >
            Contact me
          </button>
        </div>
      </div>
    );
  }
}

export default ContactMe;
