import React, { Component } from 'react'; 

class LoadingScreen extends Component{

    render(){
        return(
            <div className="container">
                <div className="loading-title-container animate__animated animate__fadeOutUp animate__delay-5s">
                    <h1 className="loading-title animate__animated animate__fadeInUp animate__delay-2s">THE <br/>RAPTEST</h1>
                </div>
            </div>
        ); 
    }
}

export default LoadingScreen;