import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper,Typography,useMediaQuery} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";


const Map=({setCoordinates,setBounds,coordinates,places,setChildClicked,weatherData,flights})=>{
    const classes=useStyles();
    const isDesktop=useMediaQuery('(min-width:600px)');
    console.log(flights);
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI:true,zoomControl:true}}
                onChange={(e)=>{
                    setCoordinates({lat:e.center.lat,lng:e.center.lng});
                    setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
                }}
                onChildClick={(child)=>setChildClicked(child)}
            >
                {places?.map((place,i)=>(
                   <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                   >
                    {
                        !isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        ) : (<Paper elevation={3} className={classes.paper}>
                            <Typography variant="subtitle2" gutterBottom >{place.name}</Typography>
                            <img 
                                className={classes.pointer}
                                src={place.photo?place.photo.images.large.url : 'https://www.istockphoto.com/photo/fresh-vegetables-being-sold-at-farmers-market-gm539355554-96142875?irgwc=1&cid=IS&utm_medium=affiliate&utm_source=Jakub%20Kapusnak&clickid=Udg2Pj0FFxyNTji0F%3ATQs1tkUkD1eK2%3AF2GyzU0&utm_term=&utm_campaign=&utm_content=258824&irpid=1263831'}
                                alt={place.name}
                            />
                            <Rating size="small" value={Number(place.rating)} readOnly />
                        </Paper>)
                    }
                   </div> 
                ))}
                {weatherData?.list?.map((data,i)=>(
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon} >
                        <img height={60} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={""} />
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    )
}

export default Map;