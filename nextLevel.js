import React, {Component} from 'react'; 
import Footer from './footer';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext'; 

class NextLevel extends Component{
    static contextType = AppContext;
    state = { 
        testSelected: "",
        score: parseInt(localStorage.getItem("score")),
        score2: this.props.location.score, 
        level: localStorage.getItem("level"),
        questions: JSON.parse(localStorage.getItem('questions'))
    }

    
    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
           // console.log(key);
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
            
    
            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
             // console.log("here")
            }

          }
        }

      }

    componentDidMount() {
    
      
      //this.hydrateStateWithLocalStorage();
  
       
    }

    render(){
      
        const questions = this.props.location.questions;
        //const { testSelected, level, score, stage} = this.context;
        const test = this.props.match.params.testSelected;
        //const test = "drake";
        const address = "/levels/" + test.toLowerCase() + "/";
        //console.log(JSON.parse(localStorage.getItem("questions")))
        //console.log(this.state.questions);

        return(
            <div>
            <div className="map-container">
                <div>
                <h1 className="nextLevelTitle">You just Finished Level {this.state.level}!</h1>
                <h2 className="nextLevelTitle">You score is {this.state.score}.</h2>
                {
                  this.state.questions.map( (question) =>(
                    <div key={question.answer} className="each-question">
                      {
                        question.correct ?

                       <div className="correct">
                          <div className="title"><h2 className="song-title">{question.answer}</h2></div>
                          <div className="links-to-stores">
                            <img alt="spotify" className="spotify" width="50px" height="50px" src='/images/spotify.png'></img>
                            <img alt="applemusic" className="apple" width="40px" height="40px" src='/images/apple.png'></img>
                          </div>
                        </div>
                        
                         : 
                        
                        <div className="wrong">
                          <div className="title"><h2 className="song-title">{question.answer}</h2></div>
                          <div className="links-to-stores">
                            <img alt="spotify" className="spotify" width="50px" height="50px" src='/images/spotify.png'></img>
                            <img alt="applemusic" className="apple" width="40px" height="40px" src='/images/apple.png'></img>
                          </div>
                        </div>
                        
                      }

                     
                    
                    </div>

                  ))

                }
                <Link  to={{pathname: address, score: this.state.score}}><button id="2" className="nextLevelButton">NEXT LEVEL</button></Link>
                </div>
            </div>
            <Footer/>
            </div>
            
        );
    }
}

export default NextLevel;