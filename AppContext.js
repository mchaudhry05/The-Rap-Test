import React, { Component } from 'react';
import user from "./root.json";


const AppContext = React.createContext()


class AppProvider extends Component {
    // Context state
    state = {
      testSelected: "",
      buttonColor: "",
      stage: "",
      level: 0,  
      score: 0, 
      levelTracker: [], 
      currentLevel: 0,
      prevTestSelected: "", 
      root: user,
    }
  
    // Methods to update state
    
    setArtistName = (id) =>{
      if(this.state.testSelected !== this.state.prevTestSelected || this.state.prevTestSelected === "" ){
        var i; 
        for(i = 0; i < user.USER.length; i++){
          if(user.USER[i].id === id){
            console.log("here");
            this.setState({
              levelTracker: user.USER[i].levelTracker, 
              currentLevel: user.USER[i].currentLevel
            });
            break;
          }
        }

        this.setScore(user.USER[i].totalScore); 
        localStorage.setItem("score", user.USER[i].totalScore);
        localStorage.setItem("levelTracker", JSON.stringify(user.USER[i].levelTracker));
        user.USER.splice(i, 1)
        this.setState({
          prevTestSelected: localStorage.getItem("testSelected"), 
          testSelected: id, 
          root: user
        });
        localStorage.setItem("user", JSON.stringify(user));
  }
        
      
      localStorage.setItem("prevTestSelected", localStorage.getItem("testSelected"));
      localStorage.setItem("testSelected", id);

  }

    

    setStage = (id) =>{
      //console.log(id);
      var colors = ["#7be382", "#f8ed62", "palevioletred", "cornflowerblue", "mediumpurple"]; 
      if(id === "novice"){
        this.setState({
          buttonColor: colors[0], 
          stage: id,
          level: "1"
        });
        localStorage.setItem("buttonColor", colors[0]);
        localStorage.setItem("level", "1");
      }else if(id === "intermediate"){
        this.setState({
          buttonColor: colors[1],
          level: "2"
        });
        localStorage.setItem("buttonColor", colors[1]);
        localStorage.setItem("level", "2");
      }else if(id === "advanced"){
        this.setState({
          buttonColor: colors[2],
          level: "3"
        });
        localStorage.setItem("buttonColor", colors[2]);
        localStorage.setItem("level", "3");
      }else if(id === "goat"){
        this.setState({
          buttonColor: colors[3],
          level: "4"
        });
        localStorage.setItem("buttonColor", colors[3]);
        localStorage.setItem("level", "4");
      }else if(id === "god"){
        this.setState({
          buttonColor: colors[4],
          level: "5"
        });
        localStorage.setItem("buttonColor", colors[4]);
        localStorage.setItem("level", "5");
      }
      
      this.setState({
        stage: id
      });
    }

    setScore = (newScore) =>{
      this.setState({score: newScore});
      // localStorage.setItem("score", newScore);
    }

    setQuestions = (questions) =>{
      localStorage.setItem('questions', JSON.stringify(questions));
    }

    setLevel = (level) =>{
      localStorage.setItem("level", level);
    }

    
    render() {
        const { children } = this.props;
        const { testSelected } = this.state;
        const { prevTestSelected} = this.state;
        const { buttonColor } = this.state;
        const { score } = this.state;
        const { stage } = this.state;
        const { level } = this.state;
        const { levelTracker } = this.state; 
        const { currentLevel } = this.state;
        const { setArtistName } = this;
        const { setStage } = this;
        const { setScore } = this;
        const { setQuestions } = this;
        const { setLevel } = this;
        //console.log(user.USER[0].levelTracker)
      return (
        <AppContext.Provider
          value={{
            testSelected,
            prevTestSelected,
            buttonColor, 
            score,
            stage,
            level,
            levelTracker, 
            currentLevel, 
            setArtistName,
            setStage,
            setScore,
            setQuestions,
            setLevel,
          }}>
          {children}
        </AppContext.Provider>
      )
    }
  }
  

  
export default AppContext;
export { AppProvider };