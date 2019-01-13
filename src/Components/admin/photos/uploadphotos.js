import Fileuploader from '../../ui/fileuploader';
import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { validate } from '../../ui/misc';
import FormField from '../../ui/formFields';
import { firebasePhotos, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

export default class UploadPhotos extends Component {
  state = {
    defaultImg: '',
    photoId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    photos: [],
    formdata: {
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      caption: {
        element: 'input',
        value: '',
        config: {
          label: 'Write a caption',
          name: 'caption',
          type: 'text',
          placeholder: 'Describe a picture'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      url: {
        element: 'input',
        value: '',
        config: {
          label: 'Write a caption',
          name: 'url',
          type: 'text',
          placeholder: ''
        },
        validation: {
          required: false
        },
        valid: true,
        validationMessage: '',
        showLabel: false
      }
    }
  };

  componentDidMount() {
    const photoId = this.props.match.params.id;
    const getPhotos = (photo, type) => {
      firebasePhotos.once('value').then(snapshot => {
        const photos = firebaseLooper(snapshot);
        //console.log(photos);

        this.updateFields(photo, photos, type, photoId);
      });
    };

    if (!photoId) {
      // Add experience
      getPhotos(false, 'Add Photo');
    } else {
      // Edit photo
      firebaseDB
        .ref(`photos/${photoId}`)
        .once('value')
        .then(snapshot => {
          const photo = snapshot.val();
          getPhotos(photo, 'Edit Photo');
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

  updateForm(element, content = '') {
    //console.log(this.state.formdata);
    const newFormdata = {
      ...this.state.formdata
    };

    const newElement = { ...newFormdata[element.id] };

    if (content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }
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
      if (this.state.formType === 'Edit Photos') {
        firebaseDB
          .ref(`photos/${this.state.photoId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
            this.props.history.push('/admin_photos');
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        // add a photo
        firebasePhotos
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_photos');
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

  updateFields(photo, photos, type, photoId) {
    const newFormdata = {
      ...this.state.formdata
    };

    for (let key in newFormdata) {
      if (photo) {
        newFormdata[key].value = photo[key];
        newFormdata[key].valid = true;
      }
    }
    this.setState({
      photoId,
      formType: type,
      formdata: newFormdata,
      photos
    });
  }

  storeFilename = filename => {
    this.updateForm({ id: 'image' }, filename);
  };

  storeUrl = url => {
    this.updateForm({ id: 'url' }, url);
  };

  render() {
    console.log(this.state.formdata);
    return (
      <div>
        <AdminLayout>
          <h2 className="has-text-centered">Add Photos</h2>

          <div style={{ marginBottom: '10px' }}>
            <Fileuploader
              dir="photos"
              tag={'Upload your image'}
              defaultImg={this.state.defaultImg}
              defaultImgName={this.state.formdata.image.value}
              filename={filename => {
                this.storeFilename(filename);
              }}
              fileurl={url => {
                this.storeUrl(url);
              }}
            />
          </div>
          <FormField
            id={'caption'}
            formdata={this.state.formdata.caption}
            change={element => this.updateForm(element)}
            placeholder={this.state.formdata.caption.config.placeholder}
          />

          <div>
            <a
              class="button is-info is-hovered"
              onClick={event => {
                this.submitForm(event);
              }}
            >
              {this.state.formType}
            </a>
          </div>
        </AdminLayout>
      </div>
    );
  }
}
