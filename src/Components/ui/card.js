import React from 'react';

const Card = ({ review }) => {
  return (
    <React.Fragment>
      <input
        type="radio"
        name="slide-switches"
        id={`slide${review.id}`}
        checked
        class="slide-switch-rev"
      />
      <label
        style={{ color: 'black' }}
        for={`slide${review.id}`}
        class="slide-label-rev"
      />
      <div class="slide-content-rev padded">
        <div>
          <span>
            <h1
              className="is-uppercase has-text-weight-bold"
              style={{ color: 'black' }}
            >
              {review.name}
            </h1>
          </span>
        </div>
        <div>
          <span>
            <h1
              className="has-text-weight-light"
              style={{ color: 'black', display: 'inline-block' }}
            >
              {review.title}
            </h1>
          </span>
          {', '}
          <span>
            <h1
              className="has-text-weight-light"
              style={{ color: 'black', display: 'inline-block' }}
            >
              {review.company}
            </h1>
          </span>
        </div>

        <p style={{ color: 'black' }}>{review.description}</p>
      </div>
    </React.Fragment>
  );
};

export default Card;
