import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../../redux/ducks/userDuck"

class DashboardPage extends React.Component {
  state = {
    loading: true,
    success: false,
  };

  componentDidMount() {
    var link =
      this.props.match.params.token +
      "/" +
      this.props.match.params.action +
      this.props.location.search;
    this.props
      .confirm(link)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;

    return (
      <div>
        {loading && (
          <div>
            <div name="circle notched" loading />
            <h1>Validating your email</h1>
          </div>
        )}

        {!loading && success && (
          <div success>
            <div name="checkmark" />
            <div>
              <h1>
                Thank you. Your account has been verified.
              </h1>
              <Link to="/dashboard">Go to your dashboard</Link>
            </div>
          </div>
        )}

        {!loading && !success && (
          <div negative>
            <div name="warning sign" />
            <div>
              <h1>Ooops. Invalid token it seems.</h1>
            </div>
          </div>
        )}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
};

export default connect(null, { confirm })(DashboardPage);
