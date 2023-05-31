import React, { Component } from "react";
import { NewsItem } from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static defaultProps = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1 };
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   page: 1,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }

  handleNextClick = async () => {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({ articles: parsedData.articles, page: 1, loading: false });

    //   this.setState({ page: this.state.page + 1 });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevClick = async () => {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ articles: parsedData.articles, page: 1, loading: false });

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "40px" }}>
          Newsmokey top headlines
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            (this,
            this.state.articles.map((elem) => {
              return (
                <div className="col-md-4" key={elem.url}>
                  <NewsItem
                    title={elem.title?.slice(0, 45)}
                    description={elem.description?.slice(0, 80)}
                    imageurl={elem.urlToImage}
                    newsUrl={elem.url}
                    author={elem.author}
                    date={elem.publishedAt}
                    source={elem.source.name}
                  />
                </div>
              );
            }))}
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
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
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
