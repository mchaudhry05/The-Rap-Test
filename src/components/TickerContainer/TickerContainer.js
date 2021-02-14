import React, { Component } from 'react'; 
import Ticker from 'react-ticker';
import ArtistCard from '../ArtistCard/ArtistCard';

/**
 * TickerContainer represents the use of all of the react-ticker 
 * components.
 */
class TickerContainer extends Component{
    
    /**
     * move: boolean value which determines if the ticker should move or not
     */
    state = {
        move: true
    }
    
    /**
     * changes the state of move to true to move ticker
     */
    start = () => {
        this.setState({move: true})
    }
    
    /**
     * changes the state of move to false to stop ticker
     */
    stop = () => {
        this.setState({move: false})
    }


    render(){
        /**
         * speed: integer that gives speed of ticker
         * direction: string that gives direction of ticker
         * artistImages: array of artist images
         */
        const { speed, direction, artistImages } = this.props;
        const { move } = this.state;
        
        return(
            
            <Ticker speed={speed} direction={direction} move={move} height={200}>
                    {({ index }) => (
                        <div className="scroll-container">
                            <ArtistCard artistName="DRAKE" artistImage={artistImages[0]} pathname="/levels/drake" score={0} start={this.start} stop={this.stop}/>
                            <ArtistCard artistName="NAV"  artistImage={artistImages[1]} pathname="/levels/nav" score={0} start={this.start} stop={this.stop}/>
                            <ArtistCard artistName="GUNNA" artistImage={artistImages[2]} pathname="/levels/gunna" score={0} start={this.start} stop={this.stop}/>
                            <ArtistCard artistName="JCOLE" artistImage={artistImages[3]} pathname="/levels/jcole" score={0} start={this.start} stop={this.stop}/>
                        </div>
                     )}
            </Ticker>

        )
    }
}

export default TickerContainer;