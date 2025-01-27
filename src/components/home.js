import './home.css';
import { useRef, useState} from 'react';

import pagoda from '../assets/pagoda.mp4';
import api from '../assets/api.mp4';
import bomberman from '../assets/bomberman.mp4';
import crypt from '../assets/crypt.mp4';


function RegisterPage() {
  const videoList = [bomberman, api, pagoda, crypt];
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [loadArrowButtons, setLoadArrowButtons] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [prevVideoIndex, setPrevVideoIndex] = useState(0);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const prevVideoRef = useRef(null);
  const [isSliding, setIsSliding] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);


  setTimeout(() => setLoadArrowButtons(true), 1000)

  const handleLeftClick = () => {
    if (isSliding) return
    setIsSliding(true)
    setLeftClicked(true);
    setPage((prevPage) => prevPage - 1);
    setTimeout(() => setLeftClicked(false), 180)

    if (page % 2 !== 0) {
      currentVideoRef.current.classList.add('sliding')
      nextVideoRef.current.classList.remove('sliding')
      nextVideoRef.current.classList.remove('fade-in')
      nextVideoRef.current.src = prevVideoRef.current.src
    } else {
      nextVideoRef.current.classList.add('sliding')
      nextVideoRef.current.classList.add('fade-in')
      currentVideoRef.current.classList.remove('sliding')
      currentVideoRef.current.classList.remove('fade-in')
      currentVideoRef.current.src = prevVideoRef.current.src
    }

    setTimeout(() => {
      setIsSliding(false)
      if (page != 2) {
      setPrevVideoIndex((prevIndex) => (prevIndex === 0 ? videoList.length - 1 : prevIndex - 1)) // prevIndex is current index
      }
    }, 1000)
    
  }

  const handleRightClick = () => {
    if (isSliding || endReached) return
    setIsSliding(true)
    setRightClicked(true);

    if (page == videoList.length -1) {
      setEndReached(true)
    } else {
      setEndReached(false)
    }
    setPrevVideoIndex(page - 1)
    setPage((prevPage) => prevPage + 1);
    
    setTimeout(() => setRightClicked(false), 180)

    if (page % 2 !== 0) {
      console.log("if");
      
      currentVideoRef.current.classList.add('sliding')
      
      setTimeout(() => {
        setIsSliding(false)
        currentVideoRef.current.classList.remove('sliding')
        nextVideoRef.current.classList.remove('fade-out')
        currentVideoRef.current.classList.remove('fade-in')
        currentVideoRef.current.classList.add('fade-out')
        nextVideoRef.current.classList.add('fade-in')
        setCurrentVideoIndex((prevIndex) => (prevIndex === videoList.length - 1 ? 0 : prevIndex + 2))
        if (!videoPaused) nextVideoRef.current.play()
      }, 1000)

    } else {
      console.log("else");
      nextVideoRef.current.classList.add('sliding')

      setTimeout(() => {
        setIsSliding(false)
        nextVideoRef.current.classList.remove('sliding')
        currentVideoRef.current.classList.remove('fade-out')
        nextVideoRef.current.classList.remove('fade-in')
        currentVideoRef.current.classList.add('fade-in')
        nextVideoRef.current.classList.add('fade-out')
        setNextVideoIndex((prevIndex) => (prevIndex === videoList.length - 1 ? 0 : prevIndex + 2))
        if (!videoPaused) currentVideoRef.current.play()
      }, 1000)
    }
  }

  const toggleVideoPlay = (videoRef) => {
    setTimeout(() => {
      if (!videoPaused) {
        videoRef.current.pause()
        setVideoPaused(true)
      } else {
        videoRef.current.play()
        setVideoPaused(false)
      }
    }, isSliding ? 700 : 0)
  }


  return (
    <div className="App">
      <h1>Portfolio</h1>
      <div className='videoContainer'>
      {prevVideoIndex >= 0 &&
      <video
          className='previousVideo'
          ref={prevVideoRef}
          src={videoList[prevVideoIndex]}
          loop
          muted
          onClick={() => toggleVideoPlay(prevVideoRef)}
        />}
        <video
            className='nextVideo'
            ref={nextVideoRef}
            src={videoList[nextVideoIndex]}
            loop
            muted
            onClick={() => toggleVideoPlay(nextVideoRef)}
          />
        <video
          className='currentVideo'
          ref={currentVideoRef}
          src={videoList[currentVideoIndex]}
          loop
          muted
          onClick={() => toggleVideoPlay(currentVideoRef)}
        />
        <div onClick={toggleVideoPlay} className={`gifButton ${videoPaused ? '' : 'playing'}`}>GIF</div>
      </div>
      <div className="arrows">
        <div
          onMouseDown={handleLeftClick}
          className={`arrowLeft ${loadArrowButtons ? 'loaded' : ''}`}
        >
          <div className={` ${leftClicked ? 'clicked' : ''}`}></div>
        </div>
        {page}
        <div
          onMouseDown={handleRightClick}
          className={`arrowRight ${loadArrowButtons ? 'loaded' : ''}${endReached ? ' endReached' : ''}`}
        >
          <div className={` ${rightClicked ? 'clicked' : ''}`}></div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
