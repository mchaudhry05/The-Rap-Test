import React, { Component } from 'react'; 
import './choicesStyle.css'; 

/**
 * Choices represents the choices you have to choose the name
 * of the song being played currently.
 */
class Choices extends Component{
    
    render(){

        /**
         * options: is a prop representing the choices to be displayed for this song 
         * updateScore: is a function which updates the score 
         */
        const { options, updateScore } = this.props;

        return(

            <div className="choices">
                <button className ="choice-buttons" id="1" onClick ={e => updateScore(options[0])}>{options[0]}</button>
                <button className ="choice-buttons" id="2" onClick ={e => updateScore(options[1])}>{options[1]}</button>
                <button className ="choice-buttons" id="3" onClick ={e => updateScore(options[2])}>{options[2]}</button>
                <button className ="choice-buttons" id="4" onClick ={e => updateScore(options[3])}>{options[3]}</button>
            </div>

        )
    }
}

export default Choices;