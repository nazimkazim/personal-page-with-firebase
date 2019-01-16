import React, { Component } from 'react';
import AdminLayout from '../../../../Hoc/AdminLayout';
import { firebaseAboutMe } from '../../../../firebase';
import { firebaseLooper } from '../../../ui/misc';
import { Link } from 'react-router-dom';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';

class AboutMeAdmin extends Component {
  state = {
    isLoading: true,
    about_me: [],
    marginTop: '40px',
    successForm: ''
  };

  componentDidMount() {
    firebaseAboutMe.once('value').then(snapshot => {
      const about_me = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        marginTop: '0px',
        about_me: about_me
      });
    });
  }

  render() {
    console.log(this.state.about_me);
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
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.about_me
                ? this.state.about_me.map((about, i) => (
                    <tr key={i}>
                      <td>{about.title}</td>
                      <td id="exp-cell-company">
                        <Link
                          to={`/admin_about_me/edit_about_me/${about.id}`}
                        >
                          {about.description}
                        </Link>
                      </td>
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

export default AboutMeAdmin;
