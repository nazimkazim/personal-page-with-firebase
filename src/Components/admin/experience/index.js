import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebaseExp } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminExperience extends Component {
  state = {
    isLoading: true,
    experiences: [],
    marginTop: '40px',
    successForm: ''
  };

  componentDidMount() {
    firebaseExp.once('value').then(snapshot => {
      const experiences = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        marginTop: '0px',
        experiences: reverseArray(experiences)
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

  deleteItem(event, experience) {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            firebaseExp
              .child(experience.id)
              .remove()
              .then(() => {
                this.successForm('Removed successfully');
                this.props.history.push('/admin_experience');
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
    //console.log(this.state.experiences);
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
                <th>Position</th>
                <th>Description</th>
                <th>Current</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Start Date</th>
                <th>Finish Date</th>
                <th>Company</th>
                <th>City</th>
                <th>Position</th>
                <th>Description</th>
                <th>Current</th>
              </tr>
            </tfoot>
            <tbody>
              {this.state.experiences
                ? this.state.experiences.map((experience, i) => (
                    <tr key={i}>
                      <td>{experience.date_start}</td>
                      <td>{experience.date_finish}</td>
                      <td id="exp-cell-company">
                        <Link
                          to={`/admin_experience/edit_experience/${
                            experience.id
                          }`}
                        >
                          {experience.company}
                        </Link>
                        <span
                          className="delete-icon"
                          onClick={event => {
                            this.deleteItem(event, experience);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true" />
                        </span>
                      </td>
                      <td>{experience.city}</td>
                      <td>{experience.title}</td>
                      <td>{experience.description.slice(0, 30) + '...'}</td>
                      <td>{experience.current}</td>
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
