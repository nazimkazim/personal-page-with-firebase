import React, { Component } from 'react';
import Card from '../../ui/card';
import Enroll from '../promotion/Enroll';
import { firebaseRevs } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classNames from 'classnames';

class Review extends Component {
  state = {
    reviews: [],
    isActive: ''
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

  modalOpen = () => {
    this.setState({
      isActive: 'is-active'
    });
  };

  modalClose = () => {
    this.setState({
      isActive: ''
    });
  };

  render() {
    return (
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div className="columns is-centered">
              <div className="column is-two-third">
                <h2 className="has-text-centered is-size-3 has-text-info has-text-weight-semibold is-uppercase">
                  What my students say
                </h2>
                <div className="wrapper">
                  <div className="slider-rev">
                    {this.showReviews(this.state.reviews)}
                  </div>
                </div>
                <div className="has-text-centered">
                  <button
                    className="button is-success is-medium"
                    onClick={this.modalOpen}
                  >
                    Contact me
                  </button>
                </div>
              </div>
            </div>
            <div className={classNames('modal', this.state.isActive)}>
              <div className="modal-background" />
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title has-text-centered">
                    Please tell something about yourself
                  </p>
                  <button
                    className="delete"
                    onClick={this.modalClose}
                    aria-label="close"
                  />
                </header>
                <section className="modal-card-body">
                  <Enroll />
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success">Save changes</button>
                  <button className="button">Cancel</button>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Review;
