import React from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../../../firebase';

const AdminNav = () => {
  const links = [
    {
      title: 'Matches',
      linkTo: '/admin_matches'
    },
    {
      title: 'Add Match',
      linkTo: '/admin_matches/edit_match'
    },
    {
      title: 'Players',
      linkTo: '/admin_players'
    },
    {
      title: 'Add Players',
      linkTo: '/admin_players/add_players'
    }
  ];

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-user-edit" aria-hidden="true" />
          </span>
          {link.title}
        </a>
      </Link>
    ));

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('log out');
        },
        error => {
          console.log('error logging out');
        }
      );
  };

  return (
    <div>
      <nav className="panel">
        {renderItems()}
        <div class="panel-block">
          <button
            class="button is-link is-outlined is-fullwidth"
            onClick={() => {
              logoutHandler();
            }}
          >
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
