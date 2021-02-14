import React, { Component } from 'react';
import AppContext from '../../AppContext'; 
import { Redirect } from 'react-router-dom'; 

import Modal from '../Modal/Modal';
import StatBar from '../StatBar/StatBar';
import Choices from '../Choices/Choices';
import Meter from '../Meter/Meter';
import ArtistName from '../ArtistName/ArtistName';
import './gameStyle.css';

/**
 * Game represents the container in which all of the different components of
 * the game page will be displayed, most of the logic for the game 
 * component is stored in this component.
 */
class Game extends Component {
    
    static contextType = AppContext;
    
    /**
     * testSelected: the name of the artist whose test the user is playing
     * questions: the set of questions for this level
     * current: the index of the current question 
     * the user is on within the questions array
     * score: the current score if the user, 
     * scoreChange: the amount the score has chanegd by 
     * following the answering of a question 
     * level: the level the user is on in (Integer)
     * levelComplete: boolean value which determines if they level is complete 
     * or not
     * barProgresss: the progress bar value 
     * pickRandomGIPHY: a random number to access a random GIPHY from the array 
     * wrong: set of GIPHY's that can be used if the user got the question wrong 
     * correct: set of GIPHY that can be used if the user got the question correct
     * showModal: boolean value which shows or hides modal 
     * showModalLastTime: boolean value which forces the program to show 
     * the modal on the last question instead of skipping it 
     * timeNow: a Date object representing the time at said point (it is just initialized to 0)
     * timeTakenForQuestion: an array with the the time taken for each question 
     */
    state = {
        mounted: true, 
        testSelected: this.props.match.params.testSelected.toUpperCase(),
        questions: [],
        current: 0, 
        score: this.props.location.score, 
        scoreChange: 0,
        level: this.props.location.level,
        levelComplete: false,
        barProgress: 580, //get rid of this from here?
        pickRandomGIPHY: 0,
        wrong: [], 
        correct: [],
        showModal: false,
        showModalLastTime: false,
        timeNow: 0,
        timeTakenForQuestion: [],
    }

    /**
     * the questions are fetched from the JSON for a particular artist 
     * the giphy set for a particular artist is also fetched during this time 
     */
    componentDidMount() {
        
        var now = new Date();

        this.setState({
            timeNow: now,
        });

       if(this.state.mounted){
       const drake = "/drake.json"; 
       const nav = "/nav.json";
       const travis = "/travis.json";
       const jcole = "/jcole.json";
       const gunna = "/gunna.json";
       
       const locationOfQuestions = [drake, nav, travis, jcole, gunna]; 
       const nameOfArtists = ["DRAKE", "NAV", "TRAVIS", "JCOLE", "GUNNA"]; 
       
       for(let i = 0; i < nameOfArtists.length; i++){
           if(this.props.match.params.testSelected.toUpperCase() === nameOfArtists[i]){
               fetch(locationOfQuestions[i])
                    .then(response => response.json())
                    .then(data =>{
                        var accessArtistJSON = [data.DRAKE, data.NAV, data.TRAVIS, data.JCOLE, data.GUNNA];
                        this.setState({
                            questions: accessArtistJSON[i][this.state.level],
                        });
                    });
              break;      
            }
        }
        
        const drake_giphy = "/drake_giphy.json";
        const nav_giphy = "/nav_giphy.json";
        const travis_giphy = "/travis_giphy.json";
        const jcole_giphy = "/jcole_giphy.json";
        const gunna_giphy = "/gunna_giphy.json";
        const locationOfGiphy = [drake_giphy, nav_giphy, travis_giphy, jcole_giphy, gunna_giphy];
        for(let j = 0; j < nameOfArtists.length; j++){
            if(this.props.match.params.testSelected.toUpperCase() === nameOfArtists[j]){
                fetch(locationOfGiphy[j])
                    .then(response => response.json())
                    .then(data =>{
                    var listOfGiphy = [data.DRAKE_GIPHY, data.NAV_GIPHY, data.TRAVIS_GIPHY, data.JCOLE_GIPHY, data.GUNNA_GIPHY];
                    this.setState({
                            correct: listOfGiphy[j]["CORRECT"],
                            wrong: listOfGiphy[j]["WRONG"],
                        });
                    });
                break;     
            }
        }

    }

    }

    componentWillUnmount(){
        this.setState({
            mounted: false
        });
    }
    
    /**
     * the state is updated ti reflect the next question
     * to be displayed to user
     * @param None
     */
    nextQuestion = () =>  {

        var now = new Date();
        this.setState(prevState =>{
            return{
                current: prevState.current + 1, 
                barProgress: 580,
                toggle: false,
                showModal: false, 
                timeNow: now
            }    
        })

        if(this.state.current === this.state.questions.length - 1){
            var oldArtistStats = JSON.parse(localStorage.getItem(this.props.match.params.testSelected.toUpperCase()));
            oldArtistStats.totalScore = this.state.score; 
            localStorage.removeItem(this.props.match.params.testSelected.toUpperCase()); 
            localStorage.setItem(this.props.match.params.testSelected.toUpperCase(), JSON.stringify(oldArtistStats)); 
            this.setState({
                showModalLastTime: true,
            })
        }

    }

    /**
     * the user's answer is checked with the correct answer and points 
     * are rewarded accordingly
     * @param { String } name represents the answer choosen by the user
     */
    updateScore = (name) =>{
    
        this.setState({pickRandomGIPHY: Math.floor(Math.random()*4)})
    
        this.setState({
            showModal: true
        })

        var oldArtistStats = JSON.parse(localStorage.getItem(this.props.match.params.testSelected.toUpperCase()));
        
        if(name === this.state.questions[this.state.current].answer){
        
            this.setState(prevState =>{
                return{
                    scoreChange: 25 + this.state.barProgress, 
                    score: prevState.score + 25 + this.state.barProgress,
                    correctAnswer: prevState.correctAnswer + 1
                }
            });
            
            this.state.questions[this.state.current].correct = true;  

        }else{
    
            this.setState(prevState =>{
                return{
                    score: prevState.score - 100, 
                    scoreChange: -100, 
                    wrongAnswers: prevState.wrongAnswers + 1
                }
            })

            this.state.questions[this.state.current].correct = false;

        }
        var now = new Date();
        let timeTake = now - this.state.timeNow; 

        let updateTimeTakenForQuestion = this.state.timeTakenForQuestion; 
        updateTimeTakenForQuestion.push(timeTake); 
        

        this.setState({
            timeTakenForQuestion: updateTimeTakenForQuestion
        }); 

        localStorage.setItem('time-stamps', JSON.stringify(this.state.timeTakenForQuestion)); 

        oldArtistStats.totalScore = this.state.score; 
        localStorage.removeItem(this.props.match.params.testSelected.toUpperCase()); 
        localStorage.setItem(this.props.match.params.testSelected.toUpperCase(), JSON.stringify(oldArtistStats)); 


        if(this.state.current === this.state.questions.length-1){
            this.setState({
              levelComplete:  true,
            });
        }

        //get rid of this dependence soon just JSON.stringigy
        this.context.setQuestions(this.state.questions);

    }


    render(){

        //const test = this.context.testSelected;
        const testFromUrl = this.props.match.params.testSelected;
        const stage = this.props.match.params.stage;
        const address = "/levels/" + testFromUrl.toLowerCase() + "/" + stage + '/completed';
        //const redirect = "/levels/" + testFromUrl.toLowerCase() + "/"; 
        //console.log(testFromUrl)
        /*if(test === ""){
            return(

                <Redirect to={{pathname: redirect, 
                    score: this.state.score}}/>

            )
        }*/
    
        return(

            <div className="game-container">


                {this.state.levelComplete && this.state.showModalLastTime ? 
                
                <Redirect to={{
                    pathname: address, 
                    questions: this.state.questions, 
                    score: this.state.score, 
                    level: this.state.level
                }}
                />
                
                :
                
                <div className="main-content">

                    {this.state.questions.length &&
                    this.state.wrong.length  && 
                    this.state.correct.length 
                
                    ? 

                    <div className="main-content">

                        <ArtistName
                            testSelected = {this.state.testSelected}
                        />    
                    
                        <StatBar
                            songSource = {this.state.questions[this.state.current].song}
                            score = {this.state.score}
                            level = {this.state.level}
                            togglePlayPause = {this.togglePlayPause}
                        />

                        <Meter 
                            barProgress = {this.state.barProgress}
                            testSelected = {this.state.testSelected.toLowerCase()}
                        /> 
                    
                        { this.state.showModal && <Modal 
                            isCorrect = {this.state.questions[this.state.current].correct}
                            correctAnswer = {this.state.questions[this.state.current].answer}
                            scoreChange = {this.state.scoreChange}
                            giphySourceCorrect = {this.state.correct[this.state.pickRandomGIPHY].src}
                            giphySourceWrong = {this.state.wrong[this.state.pickRandomGIPHY].src}
                            nextQuestion = {this.nextQuestion}
                        /> }

                        <Choices
                            options = {this.state.questions[this.state.current].options}
                            updateScore = {this.updateScore}
                        />

                    </div> 
                    
                    : 

                    <h1 style={{fontFamily: "Helvetica", color: "white"}}>Loading...</h1>

                    }    

                </div>
            
                }
               
            </div> 
        );
    }
}



export default Game;