import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseAboutMe, firebasePhotos } from "./../../../firebase";
import { firebaseLooper } from "../../ui/misc";
import "bulma/css/bulma.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class Bio extends Component {
  state = {
    about_me: [],
    photos: []
  };
  componentDidMount() {
    firebaseAboutMe.once("value").then(snapshot => {
      const about_me = firebaseLooper(snapshot);
      this.setState({
        about_me
      });
    });

    firebasePhotos.once("value").then(snapshot => {
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
                            <img src={photo.url} alt="" />
                            <p className="legend">{photo.caption}</p>
                          </div>
                        ))
                      : null}
                  </Carousel>
                </div>

                <div className="column is-half">
                  {this.state.about_me
                    ? this.state.about_me.map(item => (
                        <React.Fragment>
                          <h1 className="title has-text-centered is-uppercase">
                            {item.title}
                          </h1>
                          <p className="has-text-grey-dark">
                            {item.description}
                          </p>
                        </React.Fragment>
                      ))
                    : null}
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
