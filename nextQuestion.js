import { React } from "react";


class NextQuestion extends Component{

render(){
    return(
        <div className="container"> 
           {
               this.props.question.correct ? <h1 style={{color: green}}>Correct</h1> : <h1 style={{color: red}}>Wrong</h1>
           }
           <button></button>

        </div>

    )
}
}
export default NextQuestion;