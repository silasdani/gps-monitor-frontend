import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import WeeklyReportForm from "../forms/WeeklyReportForm";

class WeeklyReportPage extends React.Component {
    render() {
    return (
      <div>
        <h1>Weekly report Page</h1>
        <WeeklyReportForm />
      </div>
    );
  }
}

WeeklyReportPage.propTypes = {};

export default connect(null)(WeeklyReportPage);
