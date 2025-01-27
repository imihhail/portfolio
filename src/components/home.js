import './home.css';
import { useRef, useState} from 'react';

import pagoda from '../assets/pagoda.mp4';
import api from '../assets/api.mp4';
import bomberman from '../assets/bomberman.mp4';
import crypt from '../assets/crypt.mp4';
import test from '../assets/test.mp4';


function RegisterPage() {
  const videoList = [bomberman, api, pagoda, crypt, test];
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
  const [zIndex, setZIndex] = useState({ current: 3, next: 2, prev: 1 })


  setTimeout(() => setLoadArrowButtons(true), 1000)

  const handleLeftClick = () => {
    //if (isSliding) return
    const previousVideo = page - 3
    setIsSliding(true)
    setLeftClicked(true);
    setPage((prevPage) => prevPage - 1);
    setTimeout(() => setLeftClicked(false), 180)

    if (zIndex.next === 3) {
      currentVideoRef.current.src = prevVideoRef.current.src
      nextVideoRef.current.classList.add('sliding');
      getSlidingRef2(nextVideoRef.current)
    } else if (zIndex.current === 3) {
      nextVideoRef.current.src = prevVideoRef.current.src
      currentVideoRef.current.classList.add('sliding');
      getSlidingRef(currentVideoRef.current)
    } else if (zIndex.prev === 3) {
      prevVideoRef.current.classList.add('sliding');
      getSlidingRef2(prevVideoRef.current)
    }

    function getSlidingRef(videoRef) {
      setTimeout(() => {
        prevVideoRef.current.src = videoList[previousVideo]
        setZIndex({ current: 2, next: 3, prev: 1 })
        videoRef.classList.remove('sliding')
      }, 1000)
    }

    function getSlidingRef2(videoRef) {
      setTimeout(() => {
        prevVideoRef.current.src = videoList[previousVideo]
        setZIndex({ current: 3, next: 2, prev: 1 })
        videoRef.classList.remove('sliding')
      }, 1000)
    }
  }

  const handleRightClick = () => {
    //if (isSliding || endReached) return
    setIsSliding(true)
    setRightClicked(true);
    const nextVideo = page + 1
    setTimeout(() => setRightClicked(false), 180)
    if (page == videoList.length -1) {
      setEndReached(true)
    } else {
      setEndReached(false)
    }
    setPage((prevPage) => prevPage + 1);
    
    if (zIndex.next === 3) {
      nextVideoRef.current.classList.add('sliding');
      getSlidingRef2(nextVideoRef.current)
    } else if (zIndex.current === 3) {
      currentVideoRef.current.classList.add('sliding');
      getSlidingRef(currentVideoRef.current)
    } else if (zIndex.prev === 3) {
      prevVideoRef.current.classList.add('sliding');
      getSlidingRef(prevVideoRef.current)
    }

    function getSlidingRef(videoRef) {
      setTimeout(() => {
        prevVideoRef.current.src = videoRef.src
        currentVideoRef.current.src = videoList[nextVideo]
        setZIndex({ current: 2, next: 3, prev: 1 })
        videoRef.classList.remove('sliding')
      }, 1000)
    }

    function getSlidingRef2(videoRef) {
      setTimeout(() => {
        prevVideoRef.current.src = videoRef.src
        nextVideoRef.current.src = videoList[nextVideo]
        setZIndex({ current: 3, next: 2, prev: 1 })
        videoRef.classList.remove('sliding')
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
          style={{ zIndex: zIndex.prev }}
          onClick={() => toggleVideoPlay(prevVideoRef)}
        />}
        <video
            className='nextVideo'
            ref={nextVideoRef}
            src={videoList[nextVideoIndex]}
            loop
            muted
            style={{ zIndex: zIndex.next }}
            onClick={() => toggleVideoPlay(nextVideoRef)}
          />
        <video
          className='currentVideo'
          ref={currentVideoRef}
          src={videoList[currentVideoIndex]}
          loop
          muted
          style={{ zIndex: zIndex.current }}
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
