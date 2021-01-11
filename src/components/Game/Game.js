import React, { Component } from 'react';
import AppContext from '../../AppContext'; 
import { Redirect } from 'react-router-dom'; 

import Modal from '../Modal/Modal';
import StatBar from '../StatBar/StatBar';
import Choices from '../Choices/Choices';
import Meter from '../Meter/Meter';
import ArtistName from '../ArtistName/ArtistName';

class Game extends Component {
    
    static contextType = AppContext;
   
    state = {

        stage: this.props.stage,
        testSelected: this.props.match.params.testSelected.toUpperCase(), 
        buttonColor: this.props.location.color, 
        level: this.props.location.level,
        questions: [],
        current: 0, 
        levelComplete: false,
        score: parseInt(localStorage.getItem("score")), //this.props.location.score, 
        scoreChange: 0,
        barProgress: 580,
        wrong: [], 
        correct: [],
        pickRandomGIPHY: 0, 
        showModal: false,

    }


    componentDidMount() {
       
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
    
    nextQuestion = () =>  {

        this.setState(prevState =>{
            return{
                current: prevState.current + 1, 
                barProgress: 580,
                toggle: false,
                showModal: false

            }    
        })

    }

    updateScore = (id, name) =>{
    
        this.setState({pickRandomGIPHY: Math.floor(Math.random()*4)})
    
        this.setState({
            showModal: true
        })
        
        if(name === this.state.questions[this.state.current].answer){
            
            localStorage.setItem('score', this.state.score + 25 + this.state.barProgress)
            this.context.setScore(this.state.score + 25 + this.state.barProgress);

            this.setState(prevState =>{
                return{
                    scoreChange: 25 + this.state.barProgress, 
                    score: prevState.score + 25 + this.state.barProgress
                }
            })
            
            this.state.questions[this.state.current].correct = true;  

        }else{
            
            this.context.setScore(this.state.score - 100);

            this.setState(prevState =>{
                return{
                    score: prevState.score - 100, 
                    scoreChange: -100
                }
            })

            this.state.questions[this.state.current].correct = false;

        }

        if(this.state.current === this.state.questions.length-1){

            var previousLevelTracker = this.props.location.levelTracker; 
            
            if(this.props.location.level === 5){
                previousLevelTracker[this.props.location.level-1] = 1;
            }

            previousLevelTracker[this.props.location.level] = 1; 

            localStorage.setItem("levelTracker", JSON.stringify(previousLevelTracker));
            
            var updateUser = {
                id: this.state.testSelected, 
                levelTracker: previousLevelTracker, 
                currentLevel: this.props.location.level, 
                totalScore: this.state.score
            }

            var getUserData = JSON.parse(localStorage.getItem("user")); 
            console.log(getUserData);
            
            if(getUserData.USER[getUserData.USER.length - 1].id === this.state.testSelected){
                getUserData.USER.pop();
            }

            getUserData.USER.push(updateUser);
            localStorage.setItem("user", JSON.stringify(getUserData))

            console.log(localStorage.getItem("user"));

            this.setState({
              levelComplete:  true,
            });

        }

        this.context.setQuestions(this.state.questions);
        this.context.setLevel(this.state.level);
       
    }


    render(){

        const test = this.context.testSelected;
        const testFromUrl = this.props.match.params.testSelected;
        const stage = this.props.match.params.stage;
        const address = "/levels/" + test.toLowerCase() + "/" + stage + '/completed';
        const redirect = "/levels/" + testFromUrl.toLowerCase() + "/"; 

        if(test === ""){
            return(

                <Redirect to={{pathname: redirect, 
                    score: this.state.score}}/>

            )
        }

        return(

            <div className="game-container">


                {this.state.levelComplete && this.state.showModal ? 
                
                <Redirect to={{
                    pathname: address, 
                    questions: this.state.questions, 
                    score: this.state.score, 
                    level: this.state.level}}
                />
                
                :
                
                <div className="main-content">

                    {this.state.questions.length &&
                    this.state.wrong.length  && 
                    this.state.correct.length 
                
                    ? 

                    <div className="main-content">

                        <ArtistName
                            buttonColor = {this.state.buttonColor}
                            testSelected = {this.state.testSelected}
                        />    
                    
                        <StatBar
                            songSource = {this.state.questions[this.state.current].song}
                            score = {this.state.score}
                            level = {this.state.level}
                            togglePlayPause = {this.togglePlayPause}
                        />

                        <Meter 
                            buttonColor = {this.state.buttonColor}
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
                            buttonColor = {this.state.buttonColor}
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