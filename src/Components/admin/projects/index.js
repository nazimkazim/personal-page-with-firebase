import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { firebaseProjects } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminProjects extends Component {
  state = {
    isLoading: true,
    projects: [],
    marginTop: '40px',
    successForm: ''
  };

  componentDidMount() {
    firebaseProjects.once('value').then(snapshot => {
      const projects = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        marginTop: '0px',
        projects: reverseArray(projects)
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

  deleteItem(event, project) {
    event.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            firebaseProjects
              .child(project.id)
              .remove()
              .then(() => {
                this.successForm('Removed successfully');
                this.props.history.push('/admin_projects');
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
          <h2 className="has-text-centered has-text-weight-bold">
            Admin Projects
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Link</th>
                <th>Source Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Project Name</th>
                <th>Link</th>
                <th>Source Code</th>
                <th>Description</th>
              </tr>
            </tfoot>
            <tbody>
              {this.state.projects
                ? this.state.projects.map((project, i) => (
                    <tr key={i}>
                      <td>{project.project_name}</td>
                      <td>{project.project_link}</td>
                      <td id="exp-cell-company">
                        <Link to={`/admin_projects/edit_project/${project.id}`}>
                          {project.project_source_code}
                        </Link>
                        <span
                          className="delete-icon"
                          onClick={event => {
                            this.deleteItem(event, project);
                          }}
                        >
                          <i class="fa fa-trash" aria-hidden="true" />
                        </span>
                      </td>
                      <td>{project.description.slice(0, 30) + '...'}</td>
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

export default AdminProjects;
