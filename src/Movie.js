import React from 'react';
import './Movie.css';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'

/*class Movie extends Component{
  render(){
    return(
      <div>
        <h1>
          <MoviePoster poster={this.props.poster}></MoviePoster>
          {this.props.title}
        </h1>
      </div>

    );
  }
}*/

function Movie({title,poster,genres,synopsis}){
  return (
    <div className="Movie">
      <div className="Movie__Columns">
        <MoviePoster poster={poster} alt={title}></MoviePoster>
      </div>
      <div className="Movie__Columns">
        <h1>{title}</h1>
        <div className="Movie__Genres">
          {genres.map((genre,index) => <MovieGenre genre={genre} key={index}/>)}
        </div>
        <p className="Movie__Synopsis">
          <LinesEllipsis
                  text={synopsis}
                  maxLine='3'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                  />
        </p>
      </div>
    </div>
  );
}

function MovieGenre({genre}){
  return(
    <span className="Movie__Genre">{genre}</span>
  );
};

/*
class MoviePoster extends Component{
  render(){
    console.log(this.props);
    return(
      <img src={this.props.poster}/>
    );
  }
}
*/
//functional 컴포넌트
//이것은 state가 없다. render도 없으며 라이프사이클도 없다.
function MoviePoster({poster,alt}) {
  return (
    <img src={poster} alt={alt} title={alt} className="Movie__Poster"/>
  );
}

MoviePoster.propTypes = {
  poster:PropTypes.string.isRequired,
  alt:PropTypes.string.isRequired
}

Movie.propTypes = {
  title:PropTypes.string.isRequired,
  poster:PropTypes.string.isRequired,
  genres:PropTypes.array.isRequired,
  synopsis:PropTypes.string.isRequired
};

Movie.defaultProps = {
  title:"",
  poster:""
};

MovieGenre.propTypes = {
  genre:PropTypes.string.isRequired
};

export default Movie;
