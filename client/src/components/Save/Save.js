import React from "react";
import "./style.css";

import Service from "../../services/Service";

class Save extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksToDisplay: [],
    };
    this.viewBook = this.viewBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.readBooks = this.readBooks.bind(this);
  }
  componentDidMount() {
    this.readBooks();
  }
  readBooks() {
    Service.getBooks().then((res) => {
      console.log("Final Book Read", res);
      this.setState({ booksToDisplay: res.data });
    });
  }
  viewBook(book) {
    window.open(book.link);
  }
  deleteBook(book) {
    console.log(book._id);
    Service.deleteBook(book._id).then((res) => {
      this.readBooks();
    });
  }

  render() {
    var rows = this.state.booksToDisplay.map((row, index) => {
      return (
        <div className="eachBookDiv" key={index}>
          <div style={{ fontWeight: "bold" }}>{row.title}</div>
          <div>{row.subtitle}</div>
          <div>{row.authors[0]}</div>
          <div className="buttonsDiv">
            <button
              style={{ marginRight: "3px" }}
              onClick={() => this.viewBook(row)}
            >
              View
            </button>
            <button onClick={() => this.deleteBook(row)}>Delete</button>
          </div>
          {row.image && (
            <div>
              <img src={row.image} alt="Book"></img>
            </div>
          )}
          <div>{row.description}</div>
        </div>
      );
    });
    return (
      <div className="App">
        <div className="row">
          <div className="floatLeft">Google Books</div>
          <div className="floatLeft">
            <a href="/search">SEARCH</a>
          </div>
          <div className="floatLeft">
            <a href="/save">SAVED</a>
          </div>
        </div>

        <div className="HeaderText">
          <div>(REACT) Google Books Search</div>
          <div style={{ fontWeight: "normal" }}>
            Search For And Save Booksof interest
          </div>
        </div>

        <div className="displayBoxSave">
          Saved Books
          <div>{rows}</div>
        </div>
      </div>
    );
  }
}

export default Save;
