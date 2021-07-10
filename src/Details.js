import React, { Component } from "react";
import { connect } from "redux";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};
  }
  render() {
    let key = this.props.table.selectedId;
    let details =
      this.props.table.data &&
      this.props.table.data.filter(({ id }) => id === key);
    let value = details && details.length && details[0].description;
    return (
      <div id="info-wrapper">
        <h1>Details</h1>
        <p>Click on a table item to get detailed information</p>
        <div id={details ? "" : "info-content"}>
          <div>
            <b>User selected:</b>
            {details && details.length && details[0].firstName}{" "}
            {details && details.length && details[0].lastName}
          </div>
          <div>
            <b>Description: </b>
            <textarea cols="50" rows="5" value ={value} readOnly>
            </textarea>
          </div>
          <div>
            <b>Address:</b>
            {details &&
              details.length &&
              details[0].address &&
              details[0].address.streetAddress}
          </div>
          <div>
            <b>City:</b>
            {details &&
              details.length &&
              details[0].address &&
              details[0].address.city}
          </div>
          <div>
            <b>State:</b>
            {details &&
              details.length &&
              details[0].address &&
              details[0].address.state}
          </div>
          <div>
            <b>Zip:</b>
            {details &&
              details.length &&
              details[0].address &&
              details[0].address.zip}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  table: store.table,
});
export default connect(mapStateToProps, null)(Details);