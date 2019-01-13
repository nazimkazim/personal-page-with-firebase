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

      this.setState({
        isLoading: false,
        marginTop: '0px',
        photos: photos
      });
    });
  }

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
            firebase
              .storage()
              .refFromURL(photo.url)
              .delete()
              .then(() => {
                this.successForm('Removed successfully');
                this.props.history.push('/admin_photos');
              });

            firebasePhotos
              .child(photo.id)
              .remove()
              .then(() => {
                this.successForm('Removed successfully');
                this.props.history.push('/admin_photos');
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
    //console.log(this.state.photosMain);
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    return (
      <AdminLayout>
        <React.Fragment>
          <div className="container is-fluid">
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
            <div className="columns is-multiline" style={{ marginTop: '30px' }}>
              {this.state.photos
                ? this.state.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="column is-3 card"
                      id="exp-cell-company"
                      style={{ margin: '3px' }}
                    >
                      <figure className="image">
                        <img src={photo.url} />
                      </figure>
                      <span>{photo.caption}</span>
                      <span
                        className="delete-icon"
                        onClick={event => {
                          this.deleteItem(event, photo);
                        }}
                      >
                        <i class="fa fa-trash" aria-hidden="true" />
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </React.Fragment>
      </AdminLayout>
    );
  }
}

export default Adminphoto;
