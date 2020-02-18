import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import Card from "../../ui/card";
import { firebaseRevs } from "../../../firebase";
import { firebaseLooper } from "../../ui/misc";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ContactMe from "../promotion/index";

class Review extends Component {
  state = {
    reviews: []
  };

  componentDidMount() {
    firebaseRevs.once("value").then(snapshot => {
      const reviews = firebaseLooper(snapshot);
      this.setState({
        reviews: reviews
      });
    });
  }

  showReviews = reviews =>
    reviews
      ? reviews.map((review, i) => (
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
              <div className={"column is-two-third"}>
                <h2 className="has-text-centered is-size-3 has-text-info has-text-weight-semibold is-uppercase">
                  What my students say
                </h2>
                <div className="wrapper">
                  <div className="slider-rev">
                    {this.showReviews(this.state.reviews)}
                  </div>
                </div>
                <ContactMe />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Review;
