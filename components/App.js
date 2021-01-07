import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';  
import '../styles.css';
import { AppProvider } from '../AppContext';

import LoadingScreen from './loadingScreen';
import Header from './header';
import Home from './home';
import Levels from './levels';
import Game from './game';
import NextLevel from './nextLevel';




class App extends Component {
  state ={
    visible: false,
  }

  componentDidMount() {
    this.intervalID = setInterval(
        () => this.tick(), 6000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  tick(){
    this.setState({visible: true})
  }
  
  render() {
   
    return(
     <AppProvider>
      <Router>
      
      {!this.state.visible &&<LoadingScreen/>}
      {this.state.visible && <div className="animate__animated animate__fadeInUp animate__delay-1s">
      <Header/>
      <Route exact path="/" render={props => <Home {... props}/>}></Route>
      <Route  exact path="/levels/:testSelected" render={props=> <Levels {... props}/>}></Route>
      <Route exact path="/levels/:testSelected/:stage" render={props=> (<Game {...props}/>) }></Route>
      <Route exact path="/levels/:testSelected/:stage/completed" render={props=> (<NextLevel {...props}/> ) }></Route>
      </div>
  }
  
      </Router>
      </AppProvider>
   

    );
  }
}

export default App;
