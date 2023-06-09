import React, { Component } from "react";
import { NewsItem } from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = { articles: [], loading: false };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: 1,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles, page: 1 });

      this.setState({ page: this.state.page + 1 });
    }
  };

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, page: 1 });

    this.setState({ page: this.state.page - 1 });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Newsmokey top headlines</h2>
        <div className="row">
          {
            (this,
            this.state.articles.map((elem) => {
              return (
                <div className="col-md-4" key={elem.url}>
                  <NewsItem
                    title={elem.title?.slice(0, 45)}
                    description={elem.description?.slice(0, 80)}
                    imageurl={elem.urlToImage}
                    newsUrl={elem.url}
                  />
                </div>
              );
            }))
          }
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default News;
