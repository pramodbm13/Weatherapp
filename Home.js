import React, { useState } from 'react'
import "./style.css"
import search from "./asstes/search.png"
import humidity from "./asstes/humidity.png"
import weather from "./asstes/weather.png"
import wind from "./asstes/wind.png"
import axios from 'axios';
function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
    })
    const [name, setName] = useState("");
    const[error,setError]=useState("");
    
    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=44a60cbf5f4a79e9c84da9864051d076&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    console.log(res.data);
                    setData({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed
                    })
                    setError("");
                })
                .catch(err => {
                    if(err.response.status==404){
                        setError("Invalid City Name")
                    }
                    else{
                        setError("");
                    }
                    console.log(err)
                });
        }
    }
    return (
        <div className='container'>
            <div className="weather">
                <div className="search">
                    <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button><img src={search} onClick={handleClick} /></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="winfo">
                    <img src={weather} />
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src={humidity} />
                            <div className="humidity">
                                <p>{data.humidity}%</p>
                                <p>humidity</p>
                            </div>
                        </div>
                        <div className="Wind">
                            <img src={wind} />
                            <div className="col">
                                <p>{data.speed} km/h</p>
                                <p>wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home