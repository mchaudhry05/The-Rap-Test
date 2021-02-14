import React, { Component } from 'react'; 
import './artistNameStyle.css'

/**
 * ArtistName represents the name of te artist whose test is being played, 
 * this shows up on the levels page and the game page.
 */
class ArtistName extends Component{

    render(){

        /**
         * testSelected: is a string which represents the name of the artist 
         * whose test is being played.
         */
        const { testSelected } = this.props;

        return(

            <div className="artist-name-div">
                <h1 className="game-header">
                    <span className="test-name" id="artist-name">{testSelected}</span>
                    <span className="test">TEST</span>
                </h1>
            </div>

        )
    }
}

export default ArtistName;