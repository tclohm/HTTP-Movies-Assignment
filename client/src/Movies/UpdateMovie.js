import React, { useEffect, useState } from "react";
import "./css/Movie.css";
import axios from "axios";

const UpdateMovie = (props) => {
	const [movie, setMovie] = useState({id: "", title: "", director: "", metascore: 0, stars: []})
	const [stars, setStars] = useState([])

	useEffect(() => {
		let movieToEdit = props.movies.find(film => `${film.id}` === props.match.params.id);
		setMovie(movieToEdit);
	}, [props.movie, props.match.params.id])


	const handleChange = (event) => {
		setMovie({ ...movie, [event.target.name]: event.target.value });
	}

	const handleStarChange = (event) => {
		const oldPeople = stars.filter(person => person !== event.target.value)
		setStars([...stars])
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const oldMovies = props.movies.filter(film => movie.id !== film.id)
		axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			 .then(res => {
			 	props.history.push("/")
			 	props.setMovies(oldMovies)
			 })
			 .catch(err => console.log(err))
	}

	return (
		<div className="edit-form">
		<h1>Edit the film</h1>
			<input
				type="text"
				name="title"
				placeholder="title" 
				value={movie.title}
				onChange={handleChange}
			/>
			<input
				type="text"
				name="director"
				placeholder="director"
				value={movie.director}
				onChange={handleChange}
			/>
			<input
				type="text"
				name="metascore"
				placeholder="metascore" 
				value={movie.metascore}
				onChange={handleChange}
			/>
			{movie.stars === undefined ? <p>nothing here</p> : movie.stars.map(person => (
				<input
					type="text"
					name="stars"
					placeholder="stars of the film"
					value={person}
					onChange={handleStarChange}
				/>
			))}
			<button onClick={handleSubmit}>Update</button>
		</div>
	)
}

export default UpdateMovie;