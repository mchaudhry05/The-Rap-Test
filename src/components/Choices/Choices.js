import React, { Component } from 'react'; 
import './style.css'; 


class Choices extends Component{
    
    state = {

        buttonColor: this.props.buttonColor, 
        options: this.props.options

    }

    render(){

        return(

            <div className="choices">
                <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="1" onClick ={e => this.props.updateScore(e.target.id,this.props.options[0])}>{this.props.options[0]}</button>
                <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="2" onClick ={e => this.props.updateScore(e.target.id,this.props.options[1])}>{this.props.options[1]}</button>
                <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="3" onClick ={e => this.props.updateScore(e.target.id,this.props.options[2])}>{this.props.options[2]}</button>
                <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="4" onClick ={e => this.props.updateScore(e.target.id,this.props.options[3])}>{this.props.options[3]}</button>
            </div>

        )
    }
}

export default Choices;