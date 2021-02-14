import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import './levelStyle.css'; 


/**
 * Level represents each of the hexagon's that when clicked take you to that level 
 * of the game.
 */
class Level extends Component{
   
    render(){
    
        const {pathname, level, levelName, color, score, levelTracker} = this.props;
        return(
            
            <div className="level">
                <div className="hex">
                    <div className="top"></div>
                    <div className="middle">
                        <Link

                            to ={{
                            pathname: pathname, 
                            level: level, 
                            color: color, 
                            score: score,
                            levelTracker: levelTracker
                            }}>

                            <h2 className="level-name">{levelName}</h2>

                        </Link>
                    </div>
                    <div className="bottom"></div>
                </div>
            </div>
        )
    }
}

export default Level;