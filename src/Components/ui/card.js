import React from 'react';

const Card = ({ review }) => {
  return (
    <React.Fragment>
      {/* <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{review.name}</strong>
              {','} <strong>{review.company}</strong>
              {','} <strong>{review.title}</strong>
              <br />
              {review.description}
            </p>
          </div>
        </div>
      </article> */}

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
        <span style={{ display: 'inline' }}>
          <h1 style={{ color: 'black' }}>{review.company}</h1>
          <h1 style={{ color: 'black' }}>{review.name}</h1>
        </span>

        <h1 style={{ color: 'black' }}>{review.title}</h1>
        <p style={{ color: 'black' }}>{review.description}</p>
      </div>
    </React.Fragment>
  );
};

export default Card;
