import React, { useState, useEffect } from "react";

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="movie-card">
      <img
        src={exercise?.image_url}
        alt={exercise?.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{exercise?.name}</h3>
      {/* <p>{exercise?.image_url}</p> */}
    </div>
  );
};

const MoviesPage = () => {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    // Define the URL endpoint
    const url = "/api/1/exercises/";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setExercises(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="movies-page">
      <h1 style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        margin:'1rem',
        fontFamily: "cursive", /* Forte font or any other desired font */
        fontSize: '36px',/* Adjust the font size as needed */
        color: '#D2691E',
      }}>Sweat and Smile: Your Fitness Faves</h1>
      <div className="movie-list">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
      <style>
        {`
          .movie-list {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }

          .movie-card {
            width: 30%;
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .movie-card img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }

          .movie-card h3 {
            margin-top: 10px;
          }

          .movie-card p {
            margin-top: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default MoviesPage;
