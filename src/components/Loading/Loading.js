import React, { Component } from 'react'; 
import './loadingStyle.css';

/**
 * Loading represents the loading bar that appears before some 
 * of the pages. 
 */
class Loading extends Component{
    
    render(){
       
        return(
            
            <div className="loading">
                <div className="loader"></div>
            </div>
           
        )
    }
}

export default Loading;