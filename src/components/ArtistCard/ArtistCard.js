import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';

/**
 * ArtistCard represents the image and the name of the artist that allows 
 * the user to pick an artist and go to their game.
 */
class ArtistCard extends Component{
    
    render(){
        const {artistName, artistImage, pathname, score, start, stop} = this.props;
        return(
            <div className="artist-card">
                <img width="160" height="160" className="artist-image" src={artistImage} alt=""></img>
                    <Link style={{ textDecoration: 'none', color: "black" }} to={{
                        pathname: pathname, 
                        score: score, 
                        }}>
                        <h1 id="one" onMouseOver={e => stop()} onMouseLeave={e => start()} className="artist-name">{artistName}</h1>
                    </Link>
            </div>
        )

    }
}

export default ArtistCard;