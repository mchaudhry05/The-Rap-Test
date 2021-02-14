import React, { Component } from 'react'; 
import './footerStyle.css';

/**
 * Footer represents the footer
 */
class Footer extends Component{
    
    render(){
        return(
            <div className="container">
                 <h4 className="footer-info">© 2020 THERAPTEST. ALL RIGHTS RESERVED.</h4>
                <h4 className="footer-info">INFO | FACEBOOK | TWITTER | INSTAGRAM</h4>
            </div>
        )
    }
}


export default Footer;