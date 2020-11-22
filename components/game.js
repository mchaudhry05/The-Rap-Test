import React, { Component } from 'react';
import Footer from './footer';
import AppContext from '../AppContext'; 
import { Redirect, Link } from 'react-router-dom';  

class Game extends Component {
    
    static contextType = AppContext;

   
    state = {
        toggle: false,
        stage: this.props.stage,
        testSelected: this.props.match.params.testSelected.toUpperCase(), 
        buttonColor: this.props.location.color, 
        level: this.props.location.level,
        questions: [{
            "id": 11, 
            "song": "/songs/priceonmyhead.mp3",
            "options": ["God's Plan", "Price On My Head", "Poundcake", "Jaded"],
            "answer": "Price On My Head", 
            "correct": "false"
        }],
        current: 0, 
        currentSong: "", 
        levelComplete: false,
        score: parseInt(localStorage.getItem("score")), //this.props.location.score, 
        scoreChange: 0,
        barProgress: 580,
        wrong: [{
            "id": "5", 
            "src": "https://media.giphy.com/media/5xaOcLDE64VMF4LqqrK/giphy.gif"
        }], 
        correct: [{
            "id": "5", 
            "src": "https://media.giphy.com/media/5xaOcLDE64VMF4LqqrK/giphy.gif"
        }],
        index: 0, 
    }


    componentDidMount() {
        
        this.intervalID = setInterval(
           () => this.tick(), 30);
        
       const drake = "/drake.json"; 
       const nav = "/nav.json";
       const travis = "/travis.json";
       const jcole = "/jcole.json";
       const gunna = "/gunna.json";
       
       const locationOfQuestions = [drake, nav, travis, jcole, gunna]; 
       const nameOfArtists = ["DRAKE", "NAV", "TRAVIS", "JCOLE", "GUNNA"]; 
       
       var i; 
       for(i = 0; i < nameOfArtists.length; i++){
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
        
        var j; 
        const drake_giphy = "/drake_giphy.json";
        const nav_giphy = "/nav_giphy.json";
        const travis_giphy = "/travis_giphy.json";
        const jcole_giphy = "/jcole_giphy.json";
        const gunna_giphy = "/gunna_giphy.json";
        const locationOfGiphy = [drake_giphy, nav_giphy, travis_giphy, jcole_giphy, gunna_giphy];
        for(j = 0; j < nameOfArtists.length; j++){
            if(this.props.match.params.testSelected.toUpperCase() === nameOfArtists[j]){
                fetch(locationOfGiphy[j])
                    .then(response => response.json())
                    .then(data =>{
                    var listOfGiphy = [data.DRAKE_GIPHY, data.NAV_GIPHY, data.TRAVIS_GIPHY, data.JCOLE_GIPHY, data.GUNNA_GIPHY];
                    this.setState({
                            correct: listOfGiphy[j]["CORRECT"],
                            wrong: listOfGiphy[j]["WRONG"]
                        });
                    });
                break;     
        }
        }
    }

    tick() { 
        if(!this.state.toggle){
            var bar = document.getElementsByClassName("bar")[0]; 
            this.setState({ 
                barProgress: this.state.barProgress - 1, 
            });
            bar.style.width = this.state.barProgress; 
        }
        
        var modal = document.getElementById("modal"); 
        if (this.state.barProgress <= 0){ 
            if (this.state.current === this.state.questions.length-1){
                 this.setState({
                    levelComplete: true,
                });
            }else if(modal.style.display === "none"){
                this.setState({
                    current: this.state.current + 1,
                    barProgress: 580, 
                    toggle: false,
                });
            }
        }
    }

    componentWillUnmount(){
       clearInterval(this.intervalID); 
    }


   

    updateScore = (id, name) =>{
        this.setState({index: Math.floor(Math.random()*4)})
        var modal = document.getElementById("modal"); 
        var playButton = document.getElementById("play-Button");
        modal.style.display = "block"; 
        
        playButton.onclick = () =>{
            modal.style.display = "none";
            this.setState({
                current: this.state.current + 1,
                barProgress: 580,
                toggle: false,
            });
        }

        

        if(name === this.state.questions[this.state.current].answer){
          localStorage.setItem('score', this.state.score + 25 + this.state.barProgress)
          this.context.setScore(this.state.score + 25 + this.state.barProgress);
          this.setState({scoreChange: 25 + this.state.barProgress })
          this.setState({
            score: this.state.score + 25 + this.state.barProgress,
          });  
          this.state.questions[this.state.current].correct = true;
        }else{
            this.context.setScore(this.state.score - 100);
            this.setState({
                score: this.state.score - 100,
              });  
            this.setState({scoreChange: -100 });
            this.state.questions[this.state.current].correct = false;
        }

        if(this.state.current === this.state.questions.length-1){
            //localStorage.setItem('score', this.state.score)
            var previousLevelTracker = this.props.location.levelTracker; 
            if(this.props.location.level == 5){
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
       
        //localStorage.setItem('score', this.state.score)
      }

    

    togglePlayPause = () =>{
        if (!this.state.toggle){
            document.getElementById("song").pause();
            document.getElementById("toggle-play-pause").className = "play";
            document.getElementById("pause").style.display = "none";
            document.getElementById("play").style.display = "block";
            this.setState({
                toggle: true,
            });
        }else{
            document.getElementById("song").play();
            document.getElementById("toggle-play-pause").className = "pause"; 
            document.getElementById("pause").style.display = "block";
            document.getElementById("play").style.display = "none";
            this.setState({
                toggle: false,
            });
        }
    }



    render(){
        const test = this.context.testSelected;
        const testFromUrl = this.props.match.params.testSelected;
        const stage = this.props.match.params.stage;
        const address = "/levels/" + test.toLowerCase() + "/" + stage + '/completed';
        const redirect = "/levels/" + testFromUrl.toLowerCase() + "/"; 
        //console.log(test);
        if(test === ""){
            return(
                <Redirect to={{pathname: redirect, 
                    score: this.state.score}}/>
            )
        }

        return(
            <div className="game-div">

            
                {this.state.levelComplete && document.getElementById("modal").style.display ==="none" ? <Redirect to={{pathname: address, questions: this.state.questions, score: this.state.score, level: this.state.level}}/>:
                
                <div>
                    <div className="artist-name-div">
                        <h1 className="game-header">
                            <span style={{color: this.state.buttonColor}} className="artist-name" id="artist-name">{this.state.testSelected}</span>
                            <span className="test">TEST</span>
                        </h1>
                    </div>
                
                <div className="stat-container">
                    <audio id="song" src={this.state.questions[this.state.current].song} preload="auto" autoPlay/>
                    <div className="level-container">
                        <div className="label">{this.state.level}</div>
                        <div className="label">Level</div>
                    </div>
                
                    <div className="score-container">
                        <div className="label">{this.state.score}</div>
                        <div className="label">Score</div>
                    </div>

                    <div className="play-toggle-container">
                        <button id="toggle-play-pause" className="pause" onClick={this.togglePlayPause}></button>
                        <div id ="pause" className="label">Pause</div>
                        <div id ="play" className="label">Play</div>
                    </div>
                </div>
            
                <h1 className="temp">which {this.state.testSelected.toLowerCase()} song is this?</h1>
            
                <div className="meter-container">
                    <div className="meter">
                        <span style={{backgroundColor: this.state.buttonColor, width: this.state.barProgress}} id = "bar" className="bar"></span>
                    </div>
                </div>

                <div id="modal" className="modal">
                    <div id="model-content">
                        {this.state.questions[this.state.current].correct ? <h1 style={{color: "#77B300", fontFamily: "Helvetica"}}>Correct!</h1> : <h1 style={{color: "#C00", fontFamily: "Helvetica"}}>Wrong!</h1>}
                        <h1 className="modal-song-name">
                            <span>That was {this.state.questions[this.state.current].answer} </span>
                            <span style={{backgroundColor: this.state.scoreChange > 0 ? "#77B300": "#C00"}}> {this.state.scoreChange > 0 ? "+"+this.state.scoreChange : this.state.scoreChange }</span>
                        </h1>
                        
                        <img className="giphy-image" src={this.state.questions[this.state.current].correct ? this.state.correct[this.state.index].src : this.state.wrong[this.state.index].src}></img>
                  
                        <button id="play-Button" className="play-Button">Next Song</button>
                    </div>
                </div>
            
                <div className="choices">
                    <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="1" onClick ={e => this.updateScore(e.target.id,this.state.questions[this.state.current].options[0])}>{this.state.questions[this.state.current].options[0]}</button>
                    <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="2" onClick ={e => this.updateScore(e.target.id,this.state.questions[this.state.current].options[1])}>{this.state.questions[this.state.current].options[1]}</button>
                    <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="3" onClick ={e => this.updateScore(e.target.id,this.state.questions[this.state.current].options[2])}>{this.state.questions[this.state.current].options[2]}</button>
                    <button style={{backgroundColor: this.state.buttonColor}} className ="choice-buttons" id="4" onClick ={e => this.updateScore(e.target.id,this.state.questions[this.state.current].options[3])}>{this.state.questions[this.state.current].options[3]}</button>
                </div>
                </div>
            
                }
                <Footer/>
            </div> 
        );
    }
}





  

export default Game;