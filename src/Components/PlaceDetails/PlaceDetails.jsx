import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions} from '@material-ui/core';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from './styles'

const PlaceDetails=({place,selected,refProp})=>{
    const classes=useStyles();
    if(selected) refProp?.current?.scrollIntoView({behavior:"smooth",block:"start"})
    return (
        <Card elevation={6} >
            <CardMedia
                style={{height:200}}
                image={place.photo?place.photo.images.large.url : 'https://www.istockphoto.com/photo/fresh-vegetables-being-sold-at-farmers-market-gm539355554-96142875?irgwc=1&cid=IS&utm_medium=affiliate&utm_source=Jakub%20Kapusnak&clickid=Udg2Pj0FFxyNTji0F%3ATQs1tkUkD1eK2%3AF2GyzU0&utm_term=&utm_campaign=&utm_content=258824&irpid=1263831'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" >{place.name}</Typography>
                <Box display="flex" justifyContent="space-between" >
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews}</Typography>
                </Box>
                {
                    (place.price || place.price_level) && (
                        <Box display="flex" justifyContent="space-between" >
                            <Typography variant="subtitle1">Price</Typography>
                            <Typography gutterBottom variant="subtitle1">{place.price?place.price:place.price_level}</Typography>
                        </Box>
                    ) 
                }
                <Box display="flex" justifyContent="space-between" >
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award)=>(
                    <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color="textSecondary" >{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" display="flex" justifyContent="space-between" className={classes.subtitle} >
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing} >
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                
                <CardActions>
                    <Button size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')} >
                        Trip Adviser
                    </Button>
                    <Button size="small" color="primary" onClick={()=>window.open(place.website,'_blank')} >
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default PlaceDetails;