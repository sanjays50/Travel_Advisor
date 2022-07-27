import React,{useEffect,useState} from "react";
import Header from "./Components/Header/Header";

import { getplacesData,getWeatherData } from "./api";
import Map from "./Components/Map/Map";
import List from "./Components/List/List";
import Footer from "./Components/Footer/Footer"
import {CssBaseline,Grid} from '@material-ui/core';
// import { Place, SettingsApplicationsRounded } from "@material-ui/icons";

function App(){

  const [places,setPlaces]=useState([]);
  const [weatherData,setweatherData]=useState([]);
  const [coordinates,setCoordinates]=useState({});
  const [bounds,setBounds]=useState({});
  const [childClicked,setChildClicked]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('All');
  const [filteredPlaces,setFilteredPlaces]=useState([]);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude});
    });
  },[]);

  useEffect(()=>{
    const filteredPlaces=places.filter((Place)=>Place.rating>rating);
    setFilteredPlaces(filteredPlaces);

  },[rating])

  useEffect(()=>{
    if(bounds.sw && bounds.ne){
      setIsLoading(true);

      getWeatherData(coordinates.lat,coordinates.lng)
      .then((data)=>setweatherData(data));

      getplacesData(type,bounds.sw,bounds.ne)
      .then((data)=>{
        setPlaces(data?.filter((place)=>place.name && place.num_reviews>0));
        setFilteredPlaces([]);
        setIsLoading(false);
      })
  }
  },[type,bounds]);

    return(
        <div style={{backgroundColor: 'rgb(228 236 255)'}}>
          <CssBaseline/>
          <Header
            setCoordinates={setCoordinates}
          />
          <Grid container spacing={3} style={{width:"100%"}}>
            <Grid item xs={12} md={4}>
                <List 
                places={filteredPlaces.length?filteredPlaces: places} 
                childClicked={childClicked}
                isLoading={isLoading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                  setCoordinates={setCoordinates}
                  setBounds={setBounds}
                  coordinates={coordinates}
                  places={filteredPlaces .length?filteredPlaces: places}
                  setChildClicked={setChildClicked}
                  weatherData={weatherData}
                />
            </Grid>
          </Grid>  
          <Footer/>
        </div>
    );
}


export default App;