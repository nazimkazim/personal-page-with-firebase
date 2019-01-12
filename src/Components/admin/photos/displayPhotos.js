import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebasePhotos } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Adminphoto extends Component {
  state = {
    isLoading: true,
    photos: [],
    marginTop: '40px',
    successForm: ''
  };

  componentDidMount() {
    firebasePhotos.once('value').then(snapshot => {
      const photos = firebaseLooper(snapshot);
      reverseArray(photos).map(photo => {
        this.getURL(photo.image);
      });

      this.setState({
        isLoading: false,
        marginTop: '0px'
      });
    });
  }

  getURL = filename => {
    //console.log(filename);
    firebase
      .storage()
      .ref('photos')
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ photos: [...this.state.photos, url] });
      });
  };

  successForm(message) {
    this.setState({
      successForm: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000);
  }

  deleteItem(event, photo) {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            firebasePhotos
              .child(photo.id)
              .remove()
              .then(() => {
                this.successForm('Removed successfully');
                this.props.history.push('/admin_photo');
              });
          }
        },
        {
          label: 'No',
          onClick: () => {
            return false;
          }
        }
      ]
    });
  }

  render() {
    console.log(this.state.photos);
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    return (
      <AdminLayout>
        <React.Fragment>
          <div
            className="has-text-centered"
            style={{ marginTop: this.state.marginTop }}
          >
            {this.state.isLoading ? (
              <BarLoader
                className={override}
                sizeUnit={'px'}
                size={50}
                width={100}
                height={4}
                color={'#2D7969'}
                loading={this.state.loading}
              />
            ) : (
              ''
            )}
          </div>
          <div className="columns">
            {this.state.photos
              ? this.state.photos.map((photo, i) => (
                  <div key={i} className="column is-4">
                    <img src={photo} />
                  </div>
                ))
              : null}
          </div>
        </React.Fragment>
      </AdminLayout>
    );
  }
}

export default Adminphoto;
