import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import ArtistName from '../ArtistName/ArtistName';
import Loading from '../Loading/Loading';
import Level from '../Level/Level';
import './levelsStyle.css'; 

/**
 * Levels represents the the page from which you select the level 
 * you would like to play.
 */
class Levels extends Component{
    /**
     * testSelected: the name of the artist whose test the user is playing 
     * artistStats: the stats of the artist in regards to how far the user has got
     * on that test 
     * isLoading: boolean value which shows loading screen as long as the page is 
     * loading 
     */
    state = {
        testSelected: this.props.match.params.testSelected,
        artistStats: {}, 
        isLoading: true,
        
    }

    /**
     * localStorage is checked to see if the user has played this 
     * particular artist's game before if they have then their 
     * history is loaded from memory otherwise a blank state is 
     * entered into localStorage
     */
    componentDidMount(){
        let artistStats = {
            name: this.state.testSelected.toUpperCase(), 
            levelTracker: [1, 0, 0, 0, 0], 
            currentLevel: 1, 
            totalScore: 0
        }

        if(localStorage.getItem(this.state.testSelected.toUpperCase()) === null){
            localStorage.setItem(this.state.testSelected.toUpperCase(), JSON.stringify(artistStats))
        }else{
            artistStats = JSON.parse(localStorage.getItem(this.state.testSelected.toUpperCase()));
        }

        this.setState({artistStats: artistStats});

        setTimeout(() => this.setState({isLoading: false}), 2000)
    }

    render(){

       
   
        if(this.state.isLoading === true){
            return(
                <Loading/>
            )
        }
        
        return(
            <div className="levels">
                <ArtistName testSelected={this.state.testSelected.toUpperCase()}/>
                <div className="levels-container">
                <div className="hexagon-container">

                    <div className="hex-row">
                        <Level pathname="novice"
                               level = {1}
                               levelName = "NOVICE"
                               color = "black"
                               score = {this.state.artistStats.totalScore}
                               levelTracker = {this.state.artistStats.levelTracker}
                        />
                        <Level pathname="intermediate"
                               level = {2}
                               levelName = "INTERMEDIATE"
                               color = "black"
                               score = {this.state.artistStats.totalScore}
                               levelTracker = {this.state.artistStats.levelTracker}
                        />
            
                        <Level pathname="advanced"
                               level = {3}
                               levelName = "ADVANCED"
                               color = "black"
                               score = {this.state.artistStats.totalScore}
                               levelTracker = {this.state.artistStats.levelTracker}
                        />
                    </div>

                    <div className="hex-row even">
                        <Level pathname="goat"
                                level = {4}
                                levelName = "G.O.A.T."
                                color = "black"
                                score = {this.state.artistStats.totalScore}
                                levelTracker = {this.state.artistStats.levelTracker}

                        />
                        <Level pathname="god"
                               level = {5}
                               levelName = "GOD"
                               color = "black"
                               score = {this.state.artistStats.totalScore}
                               levelTracker = {this.state.artistStats.levelTracker}
                        />
                    </div>

                    <div className="hex-row">
                        <div className="hex-white">
                            <div className="top-white"></div>
                            <div className="middle-white"></div>
                            <div className="bottom-white"></div>
                        </div>

                        <Level pathname="/"
                               level = {6}
                               levelName = "GO BACK"
                               color = "black"
                               score = {this.state.artistStats.totalScore}
                               levelTracker = {this.state.artistStats.levelTracker}

                        />
                    </div>

                    </div>

                </div>
                

            </div>
        )
    }
}

export default Levels;