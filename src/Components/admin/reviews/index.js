import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebaseRevs } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminExperience extends Component {
  state = {
    isLoading: true,
    reviews: [],
    marginTop: '40px',
    successForm: ''
  };

  componentDidMount() {
    firebaseRevs.once('value').then(snapshot => {
      const reviews = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        marginTop: '0px',
        reviews
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

  deleteItem(event, review) {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            firebaseRevs
              .child(review.id)
              .remove()
              .then(() => {
                this.successForm('Removed successfully');
                this.props.history.push('/admin_reviews');
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
          <table className="table">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>Finish Date</th>
                <th>Company</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {this.state.reviews
                ? this.state.reviews.map((review, i) => (
                    <tr key={i}>
                      <td>{review.name}</td>
                      <td>{review.title}</td>
                      <td id="exp-cell-company">
                        <Link to={`/admin_reviews/edit_review/${review.id}`}>
                          {review.company}
                        </Link>
                        <span
                          className="delete-icon"
                          onClick={event => {
                            this.deleteItem(event, review);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true" />
                        </span>
                      </td>
                      <td>{review.description.slice(0, 30) + '...'}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </React.Fragment>
      </AdminLayout>
    );
  }
}

export default AdminExperience;
