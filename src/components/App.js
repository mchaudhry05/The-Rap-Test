/*importing required libraries.*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';  
import { AppProvider } from '../AppContext';

import Loading from './Loading/Loading';
import Home from './Home/Home';
import Levels from './Levels/Levels';
import Game from './Game/Game';
import NextLevel from './NextLevel/NextLevel';
import Footer from './Footer/Footer'

/**
 * App represents the foundation for the application all of components are rendered
 * in here and react-router-dom handles all of the routing.
 * 
 */
class App extends Component {

  /**
   * artistImages: holds URL for artist's Image 
   * accessToken: the access Token for Spotify, 
   * isLoading: boolean value to indicate whether to show loading 
   * page or not
   */
  state = {
    artistImages: [],
    accessToken: "",
    isLoading: true,
  }

  /**
   * calls are made to the Spotify API to pull information 
   * about a artist and grab their profile image.
   */
  componentDidMount(){
   
    var request = require('request'); // "Request" library

    let updateArtistImages = [];

    var client_id ='4e2317bbe7fd41b2a75e5cd0bcdf1e9e';
    var client_secret = 'a02c23f0657e44ac9ed5ff3545ea3bb4';

    const artistIDs = [
      "3TVXtAsR1Inumwj472S9r4", 
      "7rkW85dBwwrJtlHRDkJDAC",
      "2hlmm7s2ICUX0LVIhVFlZQ", 
      "6l3HvQ5sa6mXTsMTB19rO5"
    ]

    // application requests authorization
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    //make post request to get all of the desired information
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;

        
        for(let i = 0; i < artistIDs.length; i++){
        var options = {
          url: `https://api.spotify.com/v1/artists/${artistIDs[i]}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        
        request.get(options, function(error, response, body) {
          updateArtistImages.push(body.images[1].url)
          
        });
      }
      }
    });

    setTimeout(() => this.setState({artistImages: updateArtistImages, isLoading: false}), 2000)

    console.log(this.state.artistImages)

}

  
  render() {
    console.log(this.state.artistImages.length)
    if(this.state.artistImages.length < 4){
      return(
       <Loading/>
      )
    }
    return(

      <AppProvider>
       
        <Router>
          
              
             {  <div className="animate__animated animate__fadeInUp">
              <Route exact path="/" render={() => <Home  artistImages={this.state.artistImages} />}></Route>
              <Route  exact path="/levels/:testSelected" render={props=> <Levels {... props}/>}></Route>
              <Route exact path="/levels/:testSelected/:stage" render={props=> (<Game {...props}/>) }></Route>
              <Route exact path="/levels/:testSelected/:stage/completed" render={props=> (<NextLevel {...props}/> ) }></Route>
              <Footer/>
            </div>}
           
        </Router>
      </AppProvider>
   
    );
  }
}

export default App;
