import React, { Component } from "react";
import search from "./search-icon.svg";
import { connect } from "redux";
import { getTable } from "./redux/actions";
import preloader from "./preloader.gif";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", data: [], selectedId: 0 ,activeIndex:0, loader: true};
  }
  componentDidMount() {
    fetch(
      "https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    )
      .then((res) => res.json())
      .then((res) => this.setState({ data: res,loader: false }));
  }
  searchFilter = (search) => {
    return (
      this.state.data &&
      this.state.data.length &&
      this.state.data.filter(({ id, firstName, lastName, email, phone }) => {
        if (search.trim() == "") {
          return true;
        } else if (
          firstName.toLowerCase().includes(search.toLowerCase()) ||
          lastName.toLowerCase().includes(search.toLowerCase()) ||
          email.toLowerCase().includes(search.toLowerCase()) ||
          phone.includes(search)
        ) {
          return true;
        }
      })
    );
  };
  render() {
    let filterData = this.searchFilter(this.state.search);
    return (
        <>
        <div id="overlay" className ={this.state.loader ? "overlay-shown" : "overlay-hidden"}>
        <img src={preloader} alt="Preloader icon" />
      </div>
      <div id="table-section">
        <form action="/">
          <img src={search} alt="Search Icon" />
          <input
            type="text"
            placeholder="Enter something"
            name="search-box"
            id="search-box"
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
          />
        </form>

        <div id="table-wrapper">
          <div id="table-headers">
            <table>
              <thead>
                <tr>
                  <th className="column1">Id</th>
                  <th className="column2">FirstName</th>
                  <th className="column3">LastName</th>
                  <th className="column4">Email</th>
                  <th className="column5">Phone</th>
                </tr>
              </thead>
            </table>
          </div>

          <div id="table-data">
            <table>
              <tbody>
                {filterData &&
                  filterData.length &&
                  filterData.map(
                    ({ id, firstName, lastName, email, phone }) => {
                      return (
                        <tr
                        className={this.state.selectedId === id ? "data-row data-row-open" : "data-row data-row-close"}
                          key={id}
                          onClick={(e) => {
                            this.setState({ selectedId: id }, () =>
                              this.props.sendTable(this.state)
                            );
                            console.log(e);
                          }}
                        >
                          <td className="column1">{id}</td>
                          <td className="column2">{firstName}</td>
                          <td className="column3">{lastName}</td>
                          <td className="column4">{email}</td>
                          <td className="column5">{phone}</td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </>
    );
  }
}
const mapStateToProps = (store) => ({
  table: store.table,
});
const mapDispatchToProps = (dispatch) => ({
  sendTable: (payload) => dispatch(getTable(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);