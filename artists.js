import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';  
import AppContext from '../AppContext';
import Footer from './footer'

class Artists extends Component {

    static contextType = AppContext;

    componentDidMount() {
       // const data = this.context
        //console.log(data) // { name: 'Tania', loggedIn: true }
    }

    state={
        cellCount: 5, 
        selectedIndex: 0,
        testSelected: "",
        drakeTest: false, 
        navTest: false, 
        travisTest: false, 
        jcoleTest: false, 
        gunnaTest: false, 
    }
    

    rotateCarousel = () =>{
        var carousel = document.querySelector('.carousel');
        var angle = this.state.selectedIndex / this.state.cellCount * -360;
        carousel.style.transform = 'translateZ(-275px) rotateY(' + angle + 'deg)';
    }

    leftButton = () =>{
        this.setState({
            selectedIndex: this.state.selectedIndex - 1
        });
        this.rotateCarousel();
    }

    rightButton = () =>{
        this.setState({
            selectedIndex: this.state.selectedIndex + 1
        });
        this.rotateCarousel();
    }

    //<button id="DRAKE" className="play-Button" onClick ={e => this.props.goToLevelPage(e.target.id)}>DRAKE</button>

render(){
    const { setArtistName } = this.context;
    return(
        <div className="artists">
            <div className="scene">
                <div className="carousel">
                    <div className="carousel__cell">
                        <div className="artist-div">
                            <img className="image" alt="" src='./images/drake.jpg'></img>
                            <Link to={{pathname:"/levels/drake/", 
                        score: 0}}> <button id="DRAKE" className="play-Button" onClick ={e => setArtistName(e.target.id)}>DRAKE</button></Link>
                            
                        </div>
                    </div>
                    <div className="carousel__cell">
                        <div className="artist-div">
                            <img className="image" alt="" src='./images/nav.jpg'></img>
                            <Link to={{pathname: "/levels/nav/", score: 0}}> <button id="NAV" className="play-Button" onClick ={e => setArtistName(e.target.id)}>NAV</button></Link>
                        </div>   
                    </div>
                    <div className="carousel__cell">
                        <div className="artist-div">
                            <img className="image"  alt="" src='./images/travis.jpg'></img>
                            <Link to={{pathname:"/levels/travis/", score: 0}}> <button id="TRAVIS" className="play-Button" onClick ={e => setArtistName(e.target.id)}>TRAVIS</button></Link>
                        </div>  
                    </div>
                    <div className="carousel__cell">
                        <div className="artist-div">
                            <img className="image"  alt="" src='./images/jcole.jpg'></img>
                            <Link to={{pathname:"/levels/jcole/", score: 0}}> <button id="J COLE" className="play-Button" onClick ={e => setArtistName(e.target.id)}>J COLE</button></Link>
                        </div>  
                    </div>
                    <div className="carousel__cell">
                        <div className="artist-div">
                            <img className="image"  alt="" src='./images/gunna.jpg'></img>
                            <Link to={{pathname: "/levels/gunna/", score: 0}}> <button id="GUNNA" className="play-Button" onClick ={e => setArtistName(e.target.id)}>GUNNA</button></Link>
                        </div>  
                    </div>
                </div>

            </div>
         
            <div className="control-button">
                <button className="go-left" onClick={this.leftButton}></button>
                <button className="go-right" onClick={this.rightButton}></button>
                
            </div>
            <div className="empty-space"></div>
            <Footer/>
           
        </div> 
        
    );
}

}

export default Artists;