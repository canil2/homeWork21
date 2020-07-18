import React from "react";
import "./style.css";
import Service from "../../services/Service";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksToDisplay: [],
    };
    this.searchBooks = this.searchBooks.bind(this);
    this.viewBook = this.viewBook.bind(this);
    this.saveBook = this.saveBook.bind(this);
  }

  viewBook(book) {
    window.open(book.volumeInfo.previewLink);
  }
  saveBook(book) {
    console.log(book);
    var jsonToSend = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      link: book.volumeInfo.previewLink,
      subtitle: book.volumeInfo.subtitle,
    };

    if (
      book.volumeInfo.imageLinks &&
      book.volumeInfo.imageLinks.smallThumbnail
    ) {
      jsonToSend["image"] = book.volumeInfo.imageLinks.smallThumbnail;
    }

    console.log("json to send", jsonToSend);
    Service.bookData(jsonToSend).then((res) => {
      alert("Book Saved to your saved list");
    });
  }

  searchBooks() {
    var that = this;
    var searchText = document.getElementById("searchText").value;
    if (searchText === undefined || searchText === null || searchText === "") {
      alert("please Enter Book Name To Searxh ");
    } else {
      var url = "https://www.googleapis.com/books/v1/volumes?q=" + searchText;

      fetch(url)
        .then(function (res) {
          return res.json();
        })
        .then(function (result) {
          if (result.items && result.items.length > 0) {
            that.setState({ booksToDisplay: result.items });
          }
        });
    }
  }

  render() {
    var rows = this.state.booksToDisplay.map((row, index) => {
      return (
        <div className="eachBookDiv" key={index}>
          <div style={{ fontWeight: "bold" }}>{row.volumeInfo.title}</div>
          <div>{row.volumeInfo.subtitle}</div>
          <div>{row.volumeInfo.authors[0]}</div>
          <div className="buttonsDiv">
            <button
              style={{ marginRight: "3px" }}
              onClick={() => this.viewBook(row)}
            >
              View
            </button>
            <button onClick={() => this.saveBook(row)}>Save</button>
          </div>
          {row.volumeInfo.imageLinks && (
            <div>
              <img
                src={row.volumeInfo.imageLinks.smallThumbnail}
                alt="Book"
              ></img>
            </div>
          )}
          <div>{row.volumeInfo.description}</div>
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

        <div className="serachBox">
          <div style={{ fontSize: "20px" }}>Book Search</div>
          <div style={{ float: "left", width: "90%" }}>
            <input
              style={{ width: "90%" }}
              type="textbox"
              placeholder="Enter Book Name To Search"
              id="searchText"
            ></input>
          </div>
          <div>
            <button onClick={this.searchBooks}>SEARCH</button>
          </div>
        </div>

        <div className="displayBox">{rows}</div>
      </div>
    );
  }
}

export default Search;
