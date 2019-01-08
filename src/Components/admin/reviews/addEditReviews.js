import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebaseRevs, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class addEditExperience extends Component {
  state = {
    revsId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    reviews: [],
    formdata: {
      title: {
        element: 'input',
        value: '',
        config: {
          label: 'Title',
          name: 'title',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Name',
          name: 'name',
          type: 'text'
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
          label: 'Company',
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
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Review content',
          name: 'description',
          type: 'text',
          placeholder: 'Nazim was an execellent teacher'
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

  updateFields(review, reviews, type, revsId) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (review) {
        newFormdata[key].value = review[key];
        newFormdata[key].valid = true;
      }
    }
    this.setState({
      revsId,
      formType: type,
      formdata: newFormdata,
      reviews
    });
  }

  componentDidMount() {
    const revsId = this.props.match.params.id;
    const getReviews = (review, type) => {
      firebaseRevs.once('value').then(snapshot => {
        const reviews = firebaseLooper(snapshot);

        this.updateFields(review, reviews, type, revsId);
      });
    };

    if (!revsId) {
      // Add review
      getReviews(false, 'Add Review');
    } else {
      // Edit review
      firebaseDB
        .ref(`reviews/${revsId}`)
        .once('value')
        .then(snapshot => {
          const review = snapshot.val();
          getReviews(review, 'Edit Review');
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
      if (this.state.formType === 'Edit Review') {
        firebaseDB
          .ref(`reviews/${this.state.revsId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
            this.props.history.push('/admin_reviews');
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        // add a review
        firebaseRevs
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_reviews');
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
                  id={'name'}
                  formdata={this.state.formdata.name}
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
