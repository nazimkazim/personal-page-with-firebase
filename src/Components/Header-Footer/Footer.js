import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer class="footer" style={{ background: '#20BEEE' }}>
        <div class="content has-text-centered" style={{ color: '#34495E' }}>
          <span>&copy;</span> Nazim Turdiyev. All rights reserved
        </div>
      </footer>
    );
  }
}
