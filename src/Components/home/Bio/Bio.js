import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseExp, firebasePhotos } from './../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import 'bulma/css/bulma.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

class Bio extends Component {
  state = {
    about_me_title: '',
    about_me_description: '',
    photos: []
  };
  componentDidMount() {
    firebaseExp.once('value').then(snapshot => {
      const about_me_title = snapshot.val().about_me.title;
      const about_me_description = snapshot.val().about_me.description;
      this.setState({
        about_me_title,
        about_me_description
      });
    });

    firebasePhotos.once('value').then(snapshot => {
      const photos = firebaseLooper(snapshot);
      this.setState({
        photos
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
                  <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                  >
                    {this.state.photos
                      ? this.state.photos.map(photo => (
                          <div>
                            <img src={photo.url} />
                            <p className="legend">{photo.caption}</p>
                          </div>
                        ))
                      : null}
                  </Carousel>
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
