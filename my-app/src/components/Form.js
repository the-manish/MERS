import React, { useState,useEffect } from "react";
export default function Form() {
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data?.data?.memes);
    }
    fetchData();
  }, []);

  function getMemeImage() {
    var meme1 = allMemes;
    meme1 = meme1[Math.floor(Math.random() * meme1.length)];
    meme1 = meme1.url;
    return meme1;
    // console.log(results);
    // return memeObj;
  }

  const [memeImage, setmemeImage] = useState({
    topText: "",
    bottomText: "",
    image: "http://i.imgflip.com/1bij.jpg",
  });

  function changeMeme(event) {
    const { name, value } = event.target;
    setmemeImage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(meme);
  }
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(memeImage);
    setmemeImage((prevState) => ({
      ...prevState,
      image: getMemeImage(),
    }));
  }

  return (
    <main>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder="Meme top text"
          name="topText"
          value={memeImage?.topText}
          onChange={changeMeme}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Meme bottom text"
          name="bottomText"
          value={memeImage?.bottomText}
          onChange={changeMeme}
        />
        <button className="form-button">Generate Meme</button>
      </form>
      <div className="meme">
        <img src={memeImage?.image} alt="meme" className="meme--image" />
        <h1 className="meme--text top">{memeImage?.topText}</h1>
        <h1 className="meme--text bottom">{memeImage?.bottomText}</h1>
      </div>
    </main>
  );
}
