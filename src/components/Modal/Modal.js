import React, { Component } from 'react'; 
import './style.css'; 

/**
 * Modal represents the modal component that shows up to tell you if you got 
 * the question right or if it was wrong, and displays a meme from the JSON 
 * file.
 */
class Modal extends Component{

    render(){
        /**
        * isCorrect: this is boolean value which represents the correctness of 
        * the user's answer 
        * correctAnswer: is the correct answer to the question 
        * scoreChange: this represents the value by which the score changed 
        * as a result of the user's answer to this question 
        * giphySourceCorrect: a giphy is loaded for the correct answer 
        * giphySourceWrong: a giphy is loaded for the wrong answer 
        */
        const { isCorrect, correctAnswer, scoreChange, giphySourceCorrect, giphySourceWrong } = this.props; 

        return(
            <div className="modal-container">
                
                <div id="modal" className="modal">
                    <div id="model-content">

                        {
                            isCorrect ? <h1 style={{color: "#6BF178", fontFamily: "Helvetica"}}>Correct!</h1> 
                            : 
                            <h1 style={{color: "#FF5964", fontFamily: "Helvetica"}}>Wrong!</h1>
                        }

                        <h1 className="modal-song-name">
                            <span>That was {correctAnswer} </span>
                            <span style={{backgroundColor: scoreChange > 0 ? "#6BF178": "#FF5964"}}> {scoreChange > 0 ? "+"+scoreChange : scoreChange }</span>
                        </h1>
                        
                        <img className="giphy-image" src={isCorrect ? giphySourceCorrect : giphySourceWrong} alt="giphy"></img>
                        
                        <div className="button-div">
                            <button id="play-Button" className="next-Button" onClick={this.props.nextQuestion}>Next Song</button>
                        </div>
                    
                    </div>
                </div>

            </div>
        )
    }
}

export default Modal;