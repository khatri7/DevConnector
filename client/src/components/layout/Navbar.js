import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/posts">
          <i className="fa fa-sticky-note-o"></i>{" "}
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fa fa-users"></i>{" "}
          <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fa fa-users"></i>{" "}
          <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fa fa-user-plus"></i>{" "}
          <span className="hide-sm">Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fa fa-sign-in"></i>{" "}
          <span className="hide-sm">Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
