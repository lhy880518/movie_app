import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  // Render : componentWillMount() -> render() -> componentDidMount()
  // Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> component
  // 컴포넌트 안에 state를 변경하면, render이 다시 작동한다. 새로운 state와 함께

  state = {
  }
  //promise 비동기 방식
  componentDidMount(){
    //한군데 몰아서 코딩하기 보다는 작은 function들이 각기 다른 장소에 있는것이 좋다.
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      console.log(movie);
      return (
        <Movie title = {movie.title_english}
               poster={movie.medium_cover_image}
               key={movie.id}
               genres={movie.genres}
               synopsis={movie.synopsis}
        />
      );
    })

    return movies;
  }

  _getMovies = async () => {
    //_callApi의 return value를 movies에 set
    const movies = await this._callApi();

    //await아래의 setstate는 await의 작업이 완료 되기까지는 실행되지 않음
    //성공적 수행이 아니라 실행
    this.setState({
      movies:movies
    });
  }

  _callApi = () => {
    return  fetch('https://yts.ag/api/v2/list_movies.json?sort_by=like_count')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.data.movies;
    })
    .catch( (err) => {
      console.log(err);
    });
    /*.then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));*/
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={this.state.movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading' }
      </div>
    );
  }
}

export default App;
