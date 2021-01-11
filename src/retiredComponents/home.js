import React, { Component } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectCoverflow, Scrollbar} from 'swiper';
import { Link } from 'react-router-dom';  
import AppContext from '../AppContext';
// Import Swiper styles
import 'swiper/swiper.scss';

SwiperCore.use([EffectCoverflow, Scrollbar])

class Home extends Component {
    
  static contextType = AppContext;
  
      
      render(){
        const { setArtistName } = this.context;
        const drake = ["DRAKE", "./images/drake.jpg" , "/levels/drake/"];
        const nav = ["NAV", "./images/nav.jpg", "/levels/nav/"];
        const travis = ["TRAVIS", "./images/travis.jpg", "/levels/travis/"];
        const jcole = ["JCOLE", "./images/jcole.jpg", "/levels/jcole/"];
        const gunna = ["GUNNA", "./images/gunna.jpg", "/levels/gunna/"];
        const artists = [drake, nav, travis, jcole, gunna];
      
      return (
        <div className="container">      
          <video playsInline autoPlay muted loop >
            <source src="./images/bg4.mp4" type="video/mp4"/>
          </video>

          <div>
            <div className="coverflow-container">
              <Swiper
                id = "coverflow"
                effect="coverflow"
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                centeredSlides={true}
                spaceBetween={50}
                slidesPerView={3}
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
        </div>
      );
    }
  }

export default Home;