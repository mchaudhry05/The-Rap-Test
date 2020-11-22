import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';  
import AppContext from '../AppContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Footer from './footer'; 


class Levels extends Component {

    static contextType = AppContext;

    componentDidMount() {
       // const data = this.context
        //console.log(data) // { name: 'Tania', loggedIn: true }
    }

    state = {
        testSelected: this.props.match.params.testSelected, 
        //levelTracker: this.props.location.levelTracker
    }
    
render(){
    const percentage = 25;
    const novice = ["NOVICE", "novice", 1, "#7be382"];
    const intermediate = ["INTERMEDIATE", "intermediate", 2, "#f8ed62" ];
    const advanced = ["ADVANCED", "advanced", 3, "palevioletred"]; 
    const goat = ["G.O.A.T.", "goat", 4, "cornflowerblue"]; 
    const god = ["GOD", "god", 5, "mediumpurple"]; 
    const levels = [novice, intermediate, advanced, goat, god];
    const levelTracker = JSON.parse(localStorage.getItem("levelTracker"));
    
    //console.log(JSON.parse(localStorage.getItem("user")));
    console.log(this.props.location)
    return(
        <div className="levels-container">
            
             
            <div>
            <div className="">
                <h1 className="level-artist-name">{this.state.testSelected.toUpperCase()}</h1>
            </div>
            
                {
                    levels.map((level) =>(
                        <Link key={level[0]} to={{
                            pathname: level[1], 
                            level: level[2], 
                            color: level[3], 
                            score: parseInt(localStorage.getItem("score")), 
                            levelTracker: levelTracker,
                        }}>
                            <button key={level[0]} className="level-button" style={levelTracker[level[2]-1]? {backgroundColor: "cornflowerblue"} : {backgroundColor: "gray" }}><p className="level-label">{level[0]}</p></button>
                        
                        </Link>
                    ))
                }
                
                </div>
        
        </div> 
        
    );
}

}

export default Levels;