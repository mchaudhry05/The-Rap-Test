import React, { Component } from 'react'; 
import './statBarStyle.css'; 

/**
 * StatBar represents the component which shows the current level the 
 * user is on,the user' score, and a play and pause button for the game.
 */
class StatBar extends Component{

    /**
     * toggle: represents whether there is a play button or a pause button 
     * showing (false ---> pause) and (true ---> play)
     * */    
    state = {
        toggle: false,
    }
    
    /**
     * toggles between the play and pause button, this changes 
     * the image being shown and the label of the button.
     * @param None
     */
    togglePlayPause = () =>{
        this.setState(prevState =>{
            return {
                toggle: !prevState.toggle
            }
        }); 

        if(!this.state.toggle){
            document.getElementById("song").pause();
        }else{
            document.getElementById("song").play();
        }
    }

    render(){
        
        /**
         * songSource: this is a url to where the song is being played from 
         * score: this is the score of the user 
         * level: this is the level the user is on
         */
        const { songSource, score, level} = this.props;

        return(

            <div className="stat-container">
                    <audio id="song" src={songSource} preload="auto" autoPlay/>
                    <div className="level-container">
                        <div className="label">{level}</div>
                        <div className="label">Level</div>
                    </div>
                
                    <div className="score-container">
                        <div className="label">{score}</div>
                        <div className="label">Score</div>
                    </div>

                    <div className="play-toggle-container">
                        <button id="toggle-play-pause" className={this.state.toggle ? "play" : "pause"} onClick={this.togglePlayPause}></button>
                        <div className="label">{this.state.toggle ? "Play" : "Pause"}</div>
                    </div>
            </div>

        )
    }
}

export default StatBar;