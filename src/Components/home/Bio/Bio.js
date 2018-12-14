import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image1 from './../../../Resources/images/Image1.png';
import Image2 from './../../../Resources/images/Image2.png';
import Image3 from './../../../Resources/images/Image3.png';
import Image4 from './../../../Resources/images/Image4.jpg';
import Image5 from './../../../Resources/images/Image5.jpg';
import { firebaseExp } from './../../../firebase';
import 'bulma/css/bulma.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
                  {
                    <Carousel
                      showArrows={true}
                      showStatus={false}
                      showThumbs={false}
                    >
                      <div>
                        <img src={Image1} />
                        <p className="legend">
                          My student from NCOC Ronald Nance
                        </p>
                      </div>
                      <div>
                        <img src={Image2} />
                        <p className="legend">Playing bowling with collegues</p>
                      </div>
                      <div>
                        <img src={Image3} />
                        <p className="legend">Breathing in fresh air</p>
                      </div>
                      <div>
                        <img src={Image4} />
                        <p className="legend">With my teachers-students</p>
                      </div>
                      <div>
                        <img src={Image5} />
                        <p className="legend">My fellow teachers</p>
                      </div>
                    </Carousel>
                  }
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
