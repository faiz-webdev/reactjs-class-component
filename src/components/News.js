import React, { Component } from "react";
import { NewsItem } from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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

  constructor(props) {
    super(props);
    this.state = { articles: [], loading: true, page: 1, totalResults: 0 };
    document.title = `${this.capitilize(this.props.category)} - News`;
  }

  capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      page: this.state.page,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
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

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de8d955c0cea4ba981ab91a5aba37f40&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page,
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "40px" }}>
          Newsmokey top {this.capitilize(this.props.category)} headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((elem, index) => {
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
                      key={index}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
