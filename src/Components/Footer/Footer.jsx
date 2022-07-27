import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub,faLinkedin,faInstagram} from "@fortawesome/free-brands-svg-icons";
import useStyles from "./styles";

export default function SocialFollow() {
    const classes=useStyles();
  return (
    <div className={classes.container} elevation={6}>
        <div className={classes.cnt}>
            <h2 style={{margin:'1px',marginTop:'2px'}}>Follow us on</h2>
            <a href="https://github.com/sanjays50" className={classes.social}>
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/sanjay-singh-shekhawat-7804411b5/" className={classes.social}>
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://www.instagram.com/sanjay__50/" className={classes.social}>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
        </div>
    </div>
  );
}