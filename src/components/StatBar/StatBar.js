import React, { Component } from 'react'; 
import './style.css'; 

class StatBar extends Component{

    state = {
        toggle: false,
        song: this.props.songSource, 
        level: this.props.level,
        score: this.props.score, 
    }

    togglePlayPause = () =>{
        if (!this.state.toggle){
            document.getElementById("song").pause();
            document.getElementById("toggle-play-pause").className = "play";
            document.getElementById("pause").style.display = "none";
            document.getElementById("play").style.display = "block";
            this.setState({
                toggle: true,
            });
        }else{
            document.getElementById("song").play();
            document.getElementById("toggle-play-pause").className = "pause"; 
            document.getElementById("pause").style.display = "block";
            document.getElementById("play").style.display = "none";
            this.setState({
                toggle: false,
            });
        }
    }

    render(){

        return(

            <div className="stat-container">
                    <audio id="song" src={this.props.songSource} preload="auto" autoPlay/>
                    <div className="level-container">
                        <div className="label">{this.state.level}</div>
                        <div className="label">Level</div>
                    </div>
                
                    <div className="score-container">
                        <div className="label">{this.props.score}</div>
                        <div className="label">Score</div>
                    </div>

                    <div className="play-toggle-container">
                        <button id="toggle-play-pause" className="pause" onClick={this.togglePlayPause}></button>
                        <div id ="pause" className="label">Pause</div>
                        <div id ="play" className="label">Play</div>
                    </div>
            </div>

        )
    }
}

export default StatBar;