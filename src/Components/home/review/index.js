import React, { Component } from 'react';
import Card from '../../ui/card';
import { firebaseRevs } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

class Review extends Component {
  state = {
    reviews: [],
    open: ''
  };

  componentDidMount() {
    firebaseRevs.once('value').then(snapshot => {
      const reviews = firebaseLooper(snapshot);

      this.setState({
        reviews
      });
    });
  }

  showReviews = reviews =>
    reviews
      ? reviews.map(review => (
          <React.Fragment>
            <Card review={review} />
          </React.Fragment>
        ))
      : null;

  render() {
    return (
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div className="columns is-centered">
              <div className="column is-two-third">
                <div className="wrapper">
                  <div className="slider-rev">
                    {this.showReviews(this.state.reviews)}
                  </div>
                </div>
              </div>
            </div>
            <p>Line outside slider</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Review;
