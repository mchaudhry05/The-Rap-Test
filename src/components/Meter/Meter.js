import React, { Component } from 'react'; 
import './meterStyle.css'; 

/**
 * Meter represents the progress bar which ticks down as time progresses 
 * Comment: this component still needs work it deos not work properly 
 */
class Meter extends Component{

    state = { 

        buttonColor: this.props.buttonColor, 
        barProgress: this.props.barProgress,
        testSelected: this.props.testSelected,
    }

    /*componentDidMount() {
        
        this.intervalID = setInterval(
           () => this.tick(), 30);

    }

    componentWillUnmount(){
        clearInterval(this.intervalID); 
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
    }*/

    render(){
       
        return(

            <div className="game-container">
                <h1 className="question">which {this.state.testSelected} song is this?</h1>
            
                <div className="meter-container">
                    <div className="meter">
                        <span style={{backgroundColor: this.state.buttonColor, width: this.state.barProgress}} id = "bar" className="bar"></span>
                    </div>
                </div>

            </div>

        )
    }
}

export default Meter; 