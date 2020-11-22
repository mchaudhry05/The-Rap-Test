import React, {Component} from 'react'; 
//import { Link } from 'react-router-dom';
import AppContext from '../AppContext'; 

class levelSummaryPage extends Component{
    static contextType = AppContext;
    state = { 
        testSelected: "",
        score: 0, 
        level: 0,
    }


    componentDidMount() {
   
    }

    render(){
        return (
        <div> 

        </div>
        );
    
            
        
    }
}

export default levelSummaryPage;