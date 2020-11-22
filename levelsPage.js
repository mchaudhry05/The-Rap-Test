import React, { Component } from 'react'; 
import Footer from './footer';
import { Link } from 'react-router-dom';  
import AppContext from '../AppContext';
class LevelsPage extends Component {
    static contextType = AppContext;
    // make level passed an array with booleans

    state = {
        artistName: "",
        testSelected: this.props.match.params.testSelected,
        levelOne: true, 
        levelTwo: false,
        levelThree: false,
        levelFour: false,
        levelFive: false,
        levelSix: false,
        hide: false,
    }

    /*hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
           
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
            
    
            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ testSelected: value });
            } catch (e) {
              // handle empty string
              this.setState({ testSelected: value });
              //console.log("here")
            }

          }
        }
      }*/

      /*hydrateStateWithURL() {
        const values = this.props.match.params;

      }*/

    componentDidMount() {
        //this.hydrateStateWithLocalStorage();
        //const data = this.context

        this.context.setArtistName(this.props.match.params.testSelected.toUpperCase()); 
        this.context.setScore(0);
       // console.log(data) // { name: 'Tania', loggedIn: true }
        /*this.setState({
            artistName: data.testSelected
        });*/
    }
    
    
   
render(){
    //console.log(this.state.artistName);
    const { setStage } = this.context;
   ///const data = this.context;
   //console.log(this.props.location)

    return(

        <div className="container">
		<div className="artist-name">
			<h1 className="level-header">{this.state.testSelected.toUpperCase()}</h1>
		</div>
		<div className="map-container">
			<div className="">
				<div className="horizontal-bar radius-facing-left-first center">
                <Link to={{
                    pathname:"novice", 
                    level: 1, 
                    color: "#7be382",
                    score: this.props.location.score
                }}><button className ="levelButtons1 dot" id="novice" onClick ={e => setStage(e.target.id)}>NOVICE</button></Link>
				</div>
				<div className="vertical-bar right"></div>
				<div className="horizontal-bar radius-facing-right center">
                <Link to={{
                    pathname:"intermediate", 
                    level: 2, 
                    color: "#f8ed62",
                    score: this.props.location.score
                }}><button className ="levelButtons2 dot" id="intermediate" onClick ={e => setStage(e.target.id)}><span>INTER-</span><span>MEDIATE</span></button></Link>
				</div>
				<div className="vertical-bar"></div>
				<div className="horizontal-bar radius-facing-left center">
				<Link to={{
                    pathname:"advanced", 
                    level: 3, 
                    color: "palevioletred",
                    score: this.props.location.score
                }}><button className ="levelButtons3 dot" id="advanced" onClick ={e => setStage(e.target.id)}>ADVANCE</button></Link>
				</div>
				<div className="vertical-bar right"></div>
				<div className="horizontal-bar radius-facing-right center">
                <Link to={{
                    pathname:"goat", 
                    level: 4, 
                    color: "cornflowerblue",
                    score: this.props.location.score
                }}><button className ="levelButtons4 dot" id="goat" onClick ={e => setStage(e.target.id)}>G.O.A.T.</button></Link>
				</div>
				<div className="vertical-bar"></div>
				<div className="horizontal-bar end radius-facing-left-end center">
                <Link to={{
                    pathname:"god", 
                    level: 5, 
                    color: "mediumpurple",
                    score: this.props.location.score
                }}> <button className ="levelButtons5 dot" id="god" onClick ={e => setStage(e.target.id)}>GOD</button></Link>
				</div>
				<div className="button">
                <Link  to="/"><button className ="back-button" id="6">GO BACK</button></Link>
				</div>
                <Footer/>
		</div>


		</div>

	</div>
    );
}

}


export default LevelsPage;