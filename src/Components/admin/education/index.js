import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebaseEduMain, firebaseEduAdd } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminEducation extends Component {
  state = {
    isLoading: true,
    eudcationsMain: [],
    marginTop: '40px',
    successForm: '',
    educationsAdd: []
  };

  componentDidMount() {
    firebaseEduMain.once('value').then(snapshot => {
      const educationsMain = firebaseLooper(snapshot);
      //console.log(educationsMain);

      this.setState({
        isLoading: false,
        marginTop: '0px',
        educationsMain: reverseArray(educationsMain)
      });
    });

    firebaseEduAdd.once('value').then(snapshot => {
      const educationsAdd = firebaseLooper(snapshot);
      //console.log(educationsAdd);

      this.setState({
        isLoading: false,
        marginTop: '0px',
        educationsAdd: reverseArray(educationsAdd)
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

  deleteItem(event, item) {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (item.degree) {
              firebaseEduMain
                .child(item.id)
                .remove()
                .then(() => {
                  this.successForm('Removed successfully');
                  this.props.history.push('/admin_education');
                });
            } else if (item.field) {
              firebaseEduAdd
                .child(item.id)
                .remove()
                .then(() => {
                  this.successForm('Removed successfully');
                  this.props.history.push('/admin_education');
                });
            }
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
    console.log(this.state.educationsMain);

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
          <h2 className="has-text-centered has-text-weight-bold">
            Main Education
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>Finish Date</th>
                <th>University</th>
                <th>Speciality</th>
                <th>Degree</th>
              </tr>
            </thead>
            <tbody>
              {this.state.educationsMain
                ? this.state.educationsMain.map((educationMain, i) => (
                    <tr key={i}>
                      <td>{educationMain.year_start}</td>
                      <td>{educationMain.year_finish}</td>
                      <td id="exp-cell-company">
                        <Link
                          to={`/admin_education/edit_main_education/${
                            educationMain.id
                          }`}
                        >
                          {educationMain.university}
                        </Link>
                        <span
                          className="delete-icon"
                          onClick={event => {
                            this.deleteItem(event, educationMain);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true" />
                        </span>
                      </td>
                      <td>{educationMain.speciality}</td>
                      <td>{educationMain.degree}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </React.Fragment>
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
          <h2 className="has-text-centered has-text-weight-bold">
            Certificates and Credentials
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Finish Date</th>
                <th>Organization</th>
                <th>Field</th>
                <th>Course Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {this.state.educationsAdd
                ? this.state.educationsAdd.map((educationAdd, i) => (
                    <tr key={i}>
                      <td>{educationAdd.year_finish}</td>
                      <td id="exp-cell-company">
                        <Link
                          to={`/admin_education/edit_education/${
                            educationAdd.id
                          }`}
                        >
                          {educationAdd.organization}
                        </Link>
                        <span
                          className="delete-icon"
                          onClick={event => {
                            this.deleteItem(event, educationAdd);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true" />
                        </span>
                      </td>
                      <td>{educationAdd.field}</td>
                      <td>{educationAdd.course_name}</td>
                      <td>{educationAdd.link.slice(1, 30)}</td>
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

export default AdminEducation;
