import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image1 from './../../../Resources/images/Image1.jpg';
import Image2 from './../../../Resources/images/Image2.jpg';
import Image3 from './../../../Resources/images/Image3.jpg';
import Image4 from './../../../Resources/images/Image4.jpg';
import Image5 from './../../../Resources/images/Image5.jpg';
import { firebaseExp } from './../../../firebase';

class Bio extends Component {
  state = {
    about_me_title: '',
    about_me_description: ''
  };
  componentDidMount() {
    firebaseExp.once('value').then(snapshot => {
      const about_me_title = snapshot.val().about_me.title;
      const about_me_description = snapshot.val().about_me.description;
      //console.log(about_me_title, about_me_description);

      this.setState({
        about_me_title,
        about_me_description
      });
    });
  }

  render() {
    return (
      <div>
        <section className="hero has-text-grey-light is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-half">
                  <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                      <div className="tile">
                        <div className="tile is-parent is-vertical">
                          <article
                            className="tile is-child notification is-primary"
                            style={{
                              background: `url(${Image1})`,
                              backgroundPosition: 'right bottom',
                              backgroundSize: 'cover'
                            }}
                          />
                          <article
                            className="tile is-child notification is-warning"
                            style={{
                              background: `url(${Image2})`,
                              backgroundPosition: 'right bottom',
                              backgroundSize: 'cover'
                            }}
                          />
                        </div>
                        <div className="tile is-parent">
                          <article
                            className="tile is-child notification is-info"
                            style={{
                              background: `url(${Image5})`,
                              backgroundPosition: 'left bottom',
                              backgroundSize: 'cover'
                            }}
                          />
                          <div
                            className="content"
                            style={{ minHeight: '300px' }}
                          />
                        </div>
                      </div>
                      <div className="tile is-parent">
                        <article
                          className="tile is-child notification is-danger"
                          style={{
                            background: `url(${Image4})`,
                            backgroundPosition: 'right top',
                            backgroundSize: 'cover'
                          }}
                        >
                          <div
                            className="content"
                            style={{ minHeight: '150px' }}
                          />
                        </article>
                      </div>
                    </div>
                    <div className="tile is-parent">
                      <article
                        className="tile is-child notification is-success"
                        style={{
                          background: `url(${Image3})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover'
                        }}
                      >
                        <div className="content" />
                      </article>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <h1 className="title has-text-centered is-uppercase">
                    {this.state.about_me_title}
                  </h1>
                  <p className="has-text-grey-dark">
                    {this.state.about_me_description}
                  </p>
                  <div>
                    <Link
                      className="button is-info is-inverted"
                      to="/my_experience"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Bio;
