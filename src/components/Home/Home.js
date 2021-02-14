import React, { Component } from 'react'; 
import TickerContainer from '../TickerContainer/TickerContainer';
import './homeStyle.css'; 

/**
 * Home represents the home page and is where you choose the artist whose 
 * game you would like to play.
 */
class Home extends Component{

    render(){
        
        return(
           
            <div className="home">
                <TickerContainer speed={5} direction="toLeft" artistImages={this.props.artistImages}/>
                <TickerContainer speed={7} direction="toRight" artistImages={this.props.artistImages}/>
                <TickerContainer speed={10} direction="toLeft" artistImages={this.props.artistImages}/>
            </div>
        
        )
    }
}

export default Home;

