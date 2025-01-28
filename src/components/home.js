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
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const prevVideoRef = useRef(null);
  const [isSliding, setIsSliding] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);
  const [page, setPage] = useState(1);
  const [zIndex, setZIndex] = useState({ current: 3, next: 2, prev: 1 })


  setTimeout(() => setLoadArrowButtons(true), 1000)

  const handleLeftClick = () => {
    let previousVideo = 0
    if (isSliding) return

    const newPage = page === 1 ? videoList.length : page - 1
    setPage(newPage)
    
    if (newPage == videoList.length ) {
      previousVideo = newPage - 2
    } else {
      previousVideo = page - 3
    }
    
    setIsSliding(true)
    setLeftClicked(true)
    setTimeout(() => setLeftClicked(false), 180)
    
    if (zIndex.next === 3) {
      currentVideoRef.current.src = prevVideoRef.current.src
      if (!videoPaused) currentVideoRef.current.play()
      nextVideoRef.current.classList.add('slidingRight')
      getSlidingRef(nextVideoRef.current, 3, 2)

    } else if (zIndex.current === 3) {
      nextVideoRef.current.src = prevVideoRef.current.src
      if (!videoPaused) nextVideoRef.current.play()
      currentVideoRef.current.classList.add('slidingRight')
      getSlidingRef(currentVideoRef.current, 2, 3)
    }

    function getSlidingRef(videoRef, i1, i2) {
      setTimeout(() => {
        if (newPage == 1) {
          prevVideoRef.current.src = videoList[videoList.length-1]
        } else {
          prevVideoRef.current.src = videoList[previousVideo]
        }
        
        setZIndex({ current: i1, next: i2 })
        videoRef.classList.remove('slidingRight')
        setIsSliding(false)
      }, 1000)
    }
  }

  const handleRightClick = () => {
    if (isSliding ) return
    setIsSliding(true)
    setRightClicked(true)
    setTimeout(() => setRightClicked(false), 180)
  
    const newPage = page === videoList.length ? 1 : page + 1
    setPage(newPage)

    if (page == videoList.length) {
      const pageTrackers = document.querySelectorAll('.pageTracker');
      let i = pageTrackers.length - 1
        
        function trackerAnimation() {
          i--
          pageTrackers[i].classList.add("current")
          setTimeout(() => pageTrackers[i].classList.remove("current"), 500)
          if (i == 0) clearInterval(intervalId)
        }

        const intervalId = setInterval(trackerAnimation, 600)
    }

  
    if (zIndex.next === 3) {
      nextVideoRef.current.classList.add("sliding")
      videoPaused ? currentVideoRef.current.pause() : currentVideoRef.current.play()
      getSlidingRef(nextVideoRef.current, 3, 2, newPage)
      
    } else if (zIndex.current === 3) {
      currentVideoRef.current.classList.add("sliding")
      videoPaused ? nextVideoRef.current.pause(): nextVideoRef.current.play()
      getSlidingRef(currentVideoRef.current, 2, 3, newPage)
    }
  }
  
  function getSlidingRef(videoRef, i1, i2, newPage) {
    setTimeout(() => {
      prevVideoRef.current.src = videoRef.src
      newPage === videoList.length ? videoRef.src = videoList[0] : videoRef.src = videoList[newPage]
      setZIndex({ current: i1, next: i2, prev: 1 })
      videoRef.classList.remove("sliding")
      setIsSliding(false)
    }, 1000)
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
      <video
          className='previousVideo'
          ref={prevVideoRef}
          src={videoList[videoList.length-1]}
          loop
          muted
          style={{ zIndex: zIndex.prev }}
        />
        <video
            className='nextVideo'
            ref={nextVideoRef}
            src={videoList[1]}
            loop
            muted
            style={{ zIndex: zIndex.next }}
            onClick={() => toggleVideoPlay(nextVideoRef)}
          />
        <video
          className='currentVideo'
          ref={currentVideoRef}
          src={videoList[0]}
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
        {videoList.map((_, index) => (
          <div key={index} className={`pageTracker ${index + 1 == page ? 'current' : ''}`}></div>
        ))}
        <div
          onMouseDown={handleRightClick}
          className={`arrowRight ${loadArrowButtons ? 'loaded' : ''}`}
        >
          <div className={` ${rightClicked ? 'clicked' : ''}`}></div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
      // for (let i = pageTrackers.length - 1; i >= 0; i--) {

      // }