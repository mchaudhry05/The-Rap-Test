import React, { Component } from 'react'; 


class ArtistName extends Component{

    state = { 

        buttonColor: this.props.buttonColor, 
        testSelected: this.props.testSelected
        
    }

    render(){

        return(

            <div className="artist-name-div">
                <h1 className="game-header">
                    <span style={{color: this.state.buttonColor}} className="artist-name" id="artist-name">{this.state.testSelected}</span>
                    <span className="test">TEST</span>
                </h1>
            </div>

        )
    }
}

export default ArtistName;