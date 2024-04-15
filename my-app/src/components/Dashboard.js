import React, { useState, useEffect } from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [quote, setQuote] = useState("");
  const [movie, setMovie] = useState({});
  const [exercises, setExercises] = useState([]);
  const [movies, setMovies] = useState([]);
  const [meme, setMeme] = useState("");

  const storedData = sessionStorage.getItem("responseData");
  const data = storedData ? JSON.parse(storedData) : null;
  console.log(data);

  // Inside your component function
  const navigate = useNavigate();

  useEffect(() => {
    if (data === null) {
      navigate("/");
    } else {
      setQuote(data?.quote);
      setMovies(data?.movie);
      setExercises(data?.exercise);
    }
  }, [data, navigate]);

  useEffect(() => {
    const fetchMeme = () => {
      const exampleMeme = "logo512.png";
      setMeme(exampleMeme);
    };
    fetchMeme();
  }, []);
  function getCSRFToken() {
    const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/);
    return cookieValue ? cookieValue[1] : null;
  }
  const handleFavMovie = async (movie) => {
    try {
      const postData = {
        name: movie?.name,
        image_url: movie?.image_url,
      };
      const url = `/api/1/savemovie/`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify(postData),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to save movie");
      }
      const data = await response.json();
      console.log("Movie saved successfully:", data);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const handleFavExercise = async (exercise) => {
    try {
      const postData = {
        name: exercise?.name,
        image_url: exercise?.image_url,
      };

      // Define the URL to send the POST request
      const url = `/api/1/saveexercise/`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify(postData),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to save movie");
      }
      const data = await response.json();
      console.log("Exercise saved successfully:", data);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  const quoteContainerStyle = {
    padding: 15,
    paddingTop: 0,
  };
  const quoteTextStyle = {
    fontSize: '20px',
    alignSelf: "flex-end",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: '#D2691E',
    font:'cursive',
    textDecoration: 'underline'
  };
  const favButton = {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: '#ff5a5f',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      textTransform: 'uppercase',
      position: 'relative',
      overflow: 'hidden',
    
    // heartIcon: {
    //   position: 'absolute',
    //   top: '0',
    //   left: '0',
    //   width: '20px',
    //   height: '20px',
    //   backgroundColor: '#fff',
    //   clipPath: 'polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)',
    // }
  };
  

  const quoteBoxStyle = {
    padding: 10,
    width: "500px",
    alignItems: "center",
    margin: 8,
    borderRadius: 20,
    backgroundColor: "rgb(175 157 103)",
    borderTopRightRadius: 0,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    padding: "20px",
    maxWidth: "300px",
  };
  const [showForm, setShowForm] = useState(false);

  const handleCreateMeme = () => {
    setShowForm(true);
  };
  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ textAlign: "center", fontWeight: "bold",color: '#D2691E' , margin:'5px'}}>
      From Your Problem to Ours
      </h1>

      <div style={quoteContainerStyle}>
        <h2 style={quoteTextStyle}>Quote of the day</h2>
        <div style={quoteBoxStyle}>
          <div style={{ fontSize: 19 }}>{quote}</div>
        </div>
      </div>

      <div style={quoteContainerStyle}>
        <h2 style={quoteTextStyle}>Movies</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {movies.map((movie, index) => (
            <div
              key={index}
              style={{
                borderRadius: "1px",
                // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "rgb(175 157 103)",
                margin: "10px",
                padding: "20px",
                maxWidth: "290px",
                position: "relative",
              }}
            >
              <div style={{ transition: "transform 0.3s, box-shadow 0.3s" }}>
                <img
                  src={movie?.image_url}
                  alt={movie?.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <h3 style={{ marginTop: 0, fontSize: "24px" }}>{movie.name}</h3>
                {/* <button style={{ position: "absolute", top: "5px", right: "5px", backgroundColor: "#f8f9fa", border: "none", borderRadius: "6px", padding: "8px 8px", fontSize: "14px", cursor: "pointer" }} onClick={() => handleAddMovie(movie)}>Favorite</button>
            <a href={movie.url} target="_blank" rel="noopener noreferrer" style={{  color: "#ffffff",marginTop:0, textDecoration: "none", fontWeight: "bold", border: "1px solid #ffffff", borderRadius: "20px", padding: "8px 12px",  backgroundColor:"transparent" }}>Open Movie</a>
          */}{" "}
              </div>
              <button style={favButton} onClick={() => handleFavMovie(movie)}><FontAwesomeIcon icon={faHeart} /></button>
              <style>
                {`
           div:hover > div {
            transform: translateY(-6px);
          }

            a:hover {
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
              background-color: #007bff;
              color: #fff;
            }
          `}
              </style>
            </div>
          ))}
        </div>
      </div>

      <div style={quoteContainerStyle}>
        <h2 style={quoteTextStyle}>Exercises</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {exercises.map((exercise, index) => (
            <div
              key={index}
              style={{
                background: "rgb(175 157 103)",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "10px",
                padding: "20px",
                maxWidth: "290px",
                maxHeight: "500px",
                position: "relative",
              }}
            >
              <div style={{ transition: "transform 0.3s, box-shadow 0.3s" }}>
                <img
                  src={exercise?.image_url}
                  alt={exercise?.name}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <h3 style={{ marginTop: 0, fontSize: "24px" }}>
                  {exercise.name}
                </h3>
                {/* <button style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "#f8f9fa", border: "none", borderRadius: "4px", padding: "8px 12px", fontSize: "14px", cursor: "pointer", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} onClick={() => handleAddExercise(exercise)}>Favorite</button>
            <a href={exercise.url} target="_blank" rel="noopener noreferrer" style={{  color: "#ffffff",marginTop:0, textDecoration: "none", fontWeight: "bold", border: "1px solid #ffffff", borderRadius: "20px", padding: "8px 12px",  backgroundColor:"transparent"}}>Open Exercise</a>
             */}
              </div>
              <button style={favButton} onClick={() => handleFavExercise(exercise)}><FontAwesomeIcon icon={faHeart} /></button>
              <style>
                {`
           div:hover > div {
            transform: translateY(-6px);
          }

            a:hover {
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
              background-color: #007bff;
              color: #fff;
            }
          `}
              </style>
            </div>
          ))}
        </div>
      </div>

      <div style={quoteContainerStyle}>
        <h2 style={quoteTextStyle}>Create Meme</h2>
        {!showForm ? (
          <div>
            <button
              onClick={handleCreateMeme}
              style={{
                backgroundColor: "rgb(175 157 103)",
                color: "#F5F5DC",
                border: "1px solid black",
                borderRadius: "4px",
                padding: "10px 12px",
                fontSize: "25px",
                cursor: "pointer",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              Create Meme
            </button>
          </div>
        ) : (
          <Form />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
