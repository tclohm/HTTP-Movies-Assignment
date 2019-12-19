import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleEdit = event => {
    event.preventDefault();
    this.props.history.push(`/edit-movie/${this.props.match.params.id}`)
  }

  handleDelete = event => {
    event.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
         .then(res => {
            const newMovies = this.props.movies.filter(film => film.id !== res.data)
            this.props.setMovies(newMovies)
            this.props.history.push("/")
          })
         .catch(err => console.log(err))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

// Nested routes if we wanted to
// <Route exact path="/movies/:id/edit" 
//   render={props => { return <UpdateMovie {...props} movie={this.state.movie} isEditing={this.state.isEditing} />;
// }} 
// />