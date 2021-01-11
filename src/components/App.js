/*importing required libraries.*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';  
import { AppProvider } from '../AppContext';
import '../styles.css';


/*All the components used in this project.*/
import Home from './Home/Home';
import Levels from './levels';
import Game from './Game/Game';
import NextLevel from './nextLevel';
import Footer from './Footer/Footer'

class App extends Component {
  
  render() {

    return(

      <AppProvider>
        <Router>
          <div className="animate__animated animate__fadeInUp animate__delay-1s">
            <Route exact path="/" render={props => <Home {... props}/>}></Route>
            <Route  exact path="/levels/:testSelected" render={props=> <Levels {... props}/>}></Route>
            <Route exact path="/levels/:testSelected/:stage" render={props=> (<Game {...props}/>) }></Route>
            <Route exact path="/levels/:testSelected/:stage/completed" render={props=> (<NextLevel {...props}/> ) }></Route>
            <Footer/>
           </div>
        </Router>
      </AppProvider>
   
    );
  }
}

export default App;
