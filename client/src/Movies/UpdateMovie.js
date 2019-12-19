import React, { useEffect, useState } from "react";
import "./css/Movie.css";
import axios from "axios";

const UpdateMovie = (props) => {
	const [movie, setMovie] = useState({id: "", title: "", director: "", metascore: 0, stars: []})

	useEffect(() => {
		let movieToEdit = props.movies.find(film => `${film.id}` === props.match.params.id);
		setMovie(movieToEdit);
	}, [props.movie, props.match.params.id])


	const handleChange = (event) => {
		setMovie({ ...movie, [event.target.name]: event.target.value });
	}

	const handleStarChange = (event) => {
		// need to map through the array to find if the index and event.target.name are equal
		// if so, return `event.target.name` to effect
		const actor = movie.stars.map((star, index) => {
			if( index === Number(event.target.name) ) {
				return event.target.value
			} else {
				return star
			}
		});
		setMovie({...movie, stars: actor})
	}

	const handleStarAdd = (event) => {
		event.preventDefault();
		console.log("add");
		const actors = movie.stars.map(star => { return star })
		setMovie({...movie, stars: [...actors, ""]})
	}

	const handleStarRemove = (event) => {
		console.log("remove");
		const actors = movie.stars.filter( (person, index) => {
			if (Number(event.target.name) !== index) { return person } else {
				return
			}
		})
		setMovie({...movie, stars: [...actors]})
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
			{movie.stars === undefined ? <p>nothing here</p> : movie.stars.map( (pers, index) => (
				<div>
				<input
					key={index}
					type="text"
					name={index}
					placeholder="stars of the film"
					value={movie.stars[index]}
					onChange={handleStarChange}
				/>
				<button name={index} onClick={handleStarRemove}>remove</button>
				</div>
			))}
			<button onClick={handleStarAdd}>add actor</button>
			<button onClick={handleSubmit}>Update</button>
		</div>
	)
}

export default UpdateMovie;