import React, { Component } from 'react'; 
import './style.css'; 


class Modal extends Component{
    
    state = {

        isCorrect: this.props.isCorrect, 
        correctAnswer: this.props.correctAnswer, 
        scoreChange: this.props.scoreChange,
        giphySourceCorrect: this.props.giphySourceCorrect,
        giphySourceWrong: this.props.giphySourceWrong,
     
    }

    render(){

        return(
            <div className="modal-container">
                
                <div id="modal" className="modal">
                    <div id="model-content">
                        {this.props.isCorrect ? <h1 style={{color: "#77B300", fontFamily: "Helvetica"}}>Correct!</h1> : <h1 style={{color: "#C00", fontFamily: "Helvetica"}}>Wrong!</h1>}
                        <h1 className="modal-song-name">
                            <span>That was {this.state.correctAnswer} </span>
                            <span style={{backgroundColor: this.props.scoreChange > 0 ? "#77B300": "#C00"}}> {this.props.scoreChange > 0 ? "+"+this.props.scoreChange : this.props.scoreChange }</span>
                        </h1>
                        
                        <img className="giphy-image" src={this.state.isCorrect ? this.state.giphySourceCorrect : this.state.giphySourceWrong} alt="giphy"></img>
                  
                        <button id="play-Button" className="next-Button" onClick={this.props.nextQuestion}>Next Song</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Modal;