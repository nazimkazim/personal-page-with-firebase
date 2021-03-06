import React from "react";
import { Link } from "react-router-dom";
import { firebase } from "../../../firebase";

const AdminNav = () => {
  const links = [
    { title: "About me", linkTo: "/admin_about_me" },
    {
      title: "Experience",
      linkTo: "/admin_experience"
    },
    {
      title: "Add Experience",
      linkTo: "/admin_experience/edit_experience"
    },
    {
      title: "Education",
      linkTo: "/admin_education"
    },
    {
      title: "Add Main Education",
      linkTo: "/admin_education/edit_main_education"
    },
    {
      title: "Add Additional Education",
      linkTo: "/admin_education/edit_additional_education"
    },
    {
      title: "Reviews",
      linkTo: "/admin_reviews"
    },
    {
      title: "Add Reviews",
      linkTo: "/admin_reviews/edit_review"
    },
    {
      title: "Projects",
      linkTo: "/admin_projects"
    },
    {
      title: "Add Projects",
      linkTo: "/admin_projects/edit_project"
    },
    {
      title: "Add Photos",
      linkTo: "/admin_photos/edit_photos"
    },
    {
      title: "See Photos",
      linkTo: "/admin_photos"
    },
    {
      title: "Messages",
      linkTo: "/admin_messages"
    }
  ];

  const renderItems = () =>
    links.map(link => (
      <Link to={link.linkTo} key={link.title}>
        <span className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-user-edit" aria-hidden="true" />
          </span>
          {link.title}
        </span>
      </Link>
    ));

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("log out");
        },
        error => {
          console.log("error logging out");
        }
      );
  };

  return (
    <div>
      <nav className="panel">
        {renderItems()}
        <div className="panel-block">
          <button
            className="button is-link is-outlined is-fullwidth"
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
