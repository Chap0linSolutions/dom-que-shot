import React from "react";
import Background from "../../../components/Background";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import gsap from "gsap";
import './Cover.css';
import coverImg from '../../../assets/BangBang/cover-bangbang.png';

interface CoverProps {
  title: string,
  infoPage: any;
  gamePage: any;
}

function CoverPage({title, infoPage, gamePage}: CoverProps){
  return(
    <div id="cover-page" className="cover-page">
      <Background>
        <Header goBackArrow infoPage={infoPage}/>

        <div className="cover-container">
          
          <div className="cover-infos">
            <img src={coverImg}></img>
            {/* <p className="cover-title">{title}</p> */}
          </div>

          <div className="button-start">
            <Button>
              <div onClick={gamePage}>Começar</div>
            </Button>
          </div>
          
        </div>

      </Background>
    </div>
  );

}

export default CoverPage;