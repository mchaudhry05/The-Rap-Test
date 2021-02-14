import React, {Component} from 'react'; 
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext'; 
import FeedBack from './feedback.json';
import './nextLevelStyle.css';

/**
 * NextLevel represents the component that displays the user's 
 * performance on the level they just completed, this incudes 
 * which questions they got wrong v.s. which ones they got right.
 * 
 */
class NextLevel extends Component{
    static contextType = AppContext;
    
    /**
     * testSelected: this is the name of the artist whose test the user is taking 
     * score: the score from the previous level 
     * level: the level the user is currently on 
     * questions: this is an object that represents the information about the questions
     * timeTakenForQuestions: this is array which contains the time it took for the 
     * user to answer a certain question 
     * comment: this is comment reflects whether the user passed or failed the level
     */
    state = { 
        testSelected: "",
        score: JSON.parse(localStorage.getItem(this.props.match.params.testSelected.toUpperCase())).totalScore,
        level: JSON.parse(localStorage.getItem(this.props.match.params.testSelected.toUpperCase())).currentLevel,
        questions: JSON.parse(localStorage.getItem('questions')), 
        timeTakenForQuestion: JSON.parse(localStorage.getItem('time-stamps')),
        comment: "", 
    }

    /**
     * the number of correct answers is calculated to determine which comment to 
     * display (pass comment or fail comment)
     */
    componentDidMount() {

      let passed = false;
      let numberOfCorrectAnswers = 0;
      const { questions } = this.state;
      
      for(let i = 0; i < questions.length; i++){
        if(questions[i].correct){
          numberOfCorrectAnswers+=1;
        }
      }

      if(numberOfCorrectAnswers/questions.length >= 0.5){
        passed = true;
      }

      
      const pickRandomComment = Math.floor(Math.random()*4);
      if(passed){
        this.setState({
          comment:FeedBack.FEEDBACK.PASSED[pickRandomComment].comment,
        }); 
      }else{
        this.setState({
          comment:FeedBack.FEEDBACK.FAILED[pickRandomComment].comment,
        });
      }
  
       
    }

    render(){
       
        /*The name of the artist whose test is being played. */
        const test = this.props.match.params.testSelected;
        const address = "/levels/" + test.toLowerCase() + "/";
       
        return(
            <div className="nextlevel">
              <h1 className="nextLevelTitle">{this.state.comment}</h1>
              <h2 className="nextLevelTitle">You score is {this.state.score}.</h2>
            <div className="map-container">
                <div>
                {
                  this.state.questions.map( (question, index) =>(
                    <div key={question.answer} className="each-question">
                      {
                        question.correct ?

                       <div className="correct">
                          <div className="title"><h3 className="song-title">{question.answer}</h3></div>
                          <div className="time-stamp">{(this.state.timeTakenForQuestion[index]/1000).toFixed(2)}s</div>
                          <div className="links-to-stores">
                            <img alt="spotify" className="spotify" width="50px" height="50px" src='/images/spotify.png'></img>
                            <img alt="applemusic" className="apple" width="40px" height="40px" src='/images/apple.png'></img>
                          </div>
                        </div>
                        
                         : 
                        
                        <div className="wrong">
                          <div className="title"><h3 className="song-title">{question.answer}</h3></div>
                          <div className="time-stamp">{(this.state.timeTakenForQuestion[index]/1000).toFixed(2)}s</div>
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
        
            </div>
            
        );
    }
}

export default NextLevel;