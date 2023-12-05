import { Link } from "react-router-dom";
//import { useContext } from "react"; 
import React from "react";
import { StyleContext } from "../contexts/StyleContext";

export default function About() {
    const aboutPageStyleData = React.useContext(StyleContext);

     return (
        <div style={aboutPageStyleData}>
          <p>This is our about page!</p>
            <hr/>
            <Link to={'/'}> Home Page </Link>  
        </div>
     )
}