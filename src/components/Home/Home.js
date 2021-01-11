import React, { Component } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Mousewheel, Scrollbar} from 'swiper';
import { Link } from 'react-router-dom';  
import Header from '../Header/Header';
// Import Swiper styles
import 'swiper/swiper.scss';
import './style.css'; 

import AppContext from '../../AppContext';


SwiperCore.use([Mousewheel, Scrollbar])


class Home extends Component{

  static contextType = AppContext;

    
    render(){
        const { setArtistName } = this.context;
        const drake = ["DRAKE", "./images/drake.jpg" , "/levels/drake/"];
        const nav = ["NAV", "./images/nav.jpg", "/levels/nav/"];
        const travis = ["TRAVIS", "./images/travis.jpg", "/levels/travis/"];
        const jcole = ["JCOLE", "./images/jcole.jpg", "/levels/jcole/"];
        const gunna = ["GUNNA", "./images/gunna.jpg", "/levels/gunna/"];
       
        const artists = [drake, nav, travis, jcole, gunna];

        return(
           <div className="main-content">
             <Header/>
            <div className="container">
                
                <Swiper
                id = "Mousewheel"
                effect="Mousewheel"
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                centeredSlides={false}
                spaceBetween={50}
                slidesPerView={4}
              >
                {
                  artists.map((artist) =>(
                    
                    <SwiperSlide key={artist[0]} style={{backgroundImage: "url("+ artist[1] + ")"}}>
                      <Link to={{
                        pathname:artist[2], 
                        score: 0, 
                        }}>
                        <button id={artist[0]} className="play-Button" onClick ={e => setArtistName(e.target.id)}>{artist[0]}</button>
                      </Link>
                    </SwiperSlide>

                  ))
                }
              </Swiper>

            </div>
            </div>
        )
    }
}

export default Home;