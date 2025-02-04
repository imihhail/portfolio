import './home.css';
import { useRef, useState} from 'react';
import { RiArrowLeftWideFill} from "react-icons/ri";
import { ImPlay2 } from "react-icons/im";

import api from '../assets/api.mp4';
import bomberman from '../assets/bomberman.mp4';
import tetris from '../assets/tetris.mp4';
import snetwork from '../assets/snetwork.mp4';
import messenger from '../assets/messenger.mp4';


function Projects() {
  const videoList = [api, messenger, tetris, bomberman, snetwork];
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [loadArrowButtons, setLoadArrowButtons] = useState(false);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const prevVideoRef = useRef(null);
  const [sliding, setSliding] = useState({
    topRight: false,
    botRight: false,
    topLeft: false,
    botLeft: false,
  })
  const [videoPaused, setVideoPaused] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTracker, setActiveTracker] = useState(1);
  const [zIndex, setZIndex] = useState({ current: 3, next: 2, prev: 1 })


  setTimeout(() => setLoadArrowButtons(true), 1000)

  const handleLeftClick = () => {
    if (Object.values(sliding).includes(true)) return
    setLeftClicked(true)
    setTimeout(() => setLeftClicked(false), 100)

    let lowerVid = 0
    const [topRight, botRight] =
    zIndex.current == 3 ? [currentVideoRef, nextVideoRef] : [nextVideoRef, currentVideoRef]
    const positionChoice = zIndex.current == 3 ? 'topRight' : 'botRight'
    const zInd_1 = topRight.current.getAttribute('zindexswitch')
    const zInd_2 = topRight.current.getAttribute('zindexswitch2')
    const newPage = page === 1 ? videoList.length : page - 1

    setPage(newPage)
    newPage == videoList.length ? lowerVid = newPage - 2 : lowerVid = page - 3
    
    if (page !== 1) setActiveTracker(newPage)

    botRight.current.src = prevVideoRef.current.src
    if (!videoPaused) botRight.current.play()
      setSliding(prevState => ({
        ...prevState,
        [positionChoice]: true
      }))
        setTimeout(() => {
          newPage == 1 ? prevVideoRef.current.src = videoList[videoList.length-1]
          : prevVideoRef.current.src = videoList[lowerVid]
          setZIndex({ current: zInd_1, next: zInd_2 })
          setSliding(prevState => ({
            ...prevState,
            [positionChoice]: false,
          }))
        }, 700)

    // PageTracker reverse animation when current page is first page
    if (activeTracker == 1) {
      const pageTrackers = document.querySelectorAll('.pageTracker');
      let i = 0
      let y = 0
        
      function addGlow() {
        i++
        pageTrackers[i].classList.add("current")
        if (i == pageTrackers.length - 1){
          clearInterval(glowIntervalId)
        }
      }
      const glowIntervalId = setInterval(addGlow, 60)

      setTimeout(() => {
        function removeGlow() {
          if (y != pageTrackers.length - 1) {
            pageTrackers[y].classList.remove("current")
          }
          y++
          if (y == pageTrackers.length - 1){
            clearInterval(removeGlowIntervalId)
            setActiveTracker(newPage)
          }
        }
        const removeGlowIntervalId = setInterval(removeGlow, 60)
      }, 180)
    }
  }

  const handleRightClick = () => {
    if (Object.values(sliding).includes(true)) return
    setRightClicked(true)
    setTimeout(() => setRightClicked(false), 100)

    const [top, bot] =
    zIndex.current == 3 ? [currentVideoRef, nextVideoRef] : [nextVideoRef, currentVideoRef]
    const positionChoice = zIndex.current == 3 ? 'topLeft' : 'botLeft'
    const zInd_1 = top.current.getAttribute('zindexswitch')
    const zInd_2 = top.current.getAttribute('zindexswitch2')
  
    const newPage = page == videoList.length ? 1 : page + 1
    setPage(newPage)
    if (page !== videoList.length) setActiveTracker(newPage)
      
    if (activeTracker == videoList.length) {
      const pageTrackers = document.querySelectorAll('.pageTracker');
      let i = pageTrackers.length
      let y = pageTrackers.length
        
      function addGlow() {
        i--
        pageTrackers[i].classList.add("current")
        if (i == 0){
          clearInterval(glowIntervalId)
        }
      }
      const glowIntervalId = setInterval(addGlow, 60)

      setTimeout(() => {
        function removeGlow() {
          y--
          if (y != 0) {
            pageTrackers[y].classList.remove("current")
          }
          
          if (y == 0){
            clearInterval(removeGlowIntervalId)
            setActiveTracker(newPage)
          }
        }
        const removeGlowIntervalId = setInterval(removeGlow, 60)
      }, 180)
    }

    setSliding(prevState => ({
      ...prevState,
      [positionChoice]: true,
    }))
    
    videoPaused ? bot.current.pause() : bot.current.play()

    setTimeout(() => {
      prevVideoRef.current.src = top.current.src
      newPage === videoList.length ? top.current.src = videoList[0] : top.current.src = videoList[newPage]
      setZIndex({ current: zInd_1, next: zInd_2 })
      setSliding(prevState => ({
        ...prevState,
        [positionChoice]: false,
      }))
    }, 700)
  }

  const toggleVideoPlay = () => {
    if (Object.values(sliding).includes(true)) return

    const videoRef = zIndex.current == 3 ? currentVideoRef : nextVideoRef
    
    if (!videoPaused) {
      videoRef.current.pause()
      setVideoPaused(true)
    } else {
      videoRef.current.play()
      setVideoPaused(false)
    }
  }


  return (
    <div className="App">
      <div className='videoContainer' onClick={toggleVideoPlay}>
        <video
            className='previousVideo'
            ref={prevVideoRef}
            src={videoList[videoList.length-1]}
            loop
            muted
            style={{ zIndex: zIndex.prev }}
          />
        <video
            className={`nextVideo ${sliding.botRight ? 'slideRight' : ''}${sliding.botLeft ? 'slideLeft' : ''}`}
            ref={nextVideoRef}
            src={videoList[1]}
            loop
            muted
            zindexswitch = "3"
            zindexswitch2 = "2"
            style={{ zIndex: zIndex.next }}
          />
        <video
          className={`currentVideo ${sliding.topRight ? 'slideRight' : ''}${sliding.topLeft ? 'slideLeft' : ''}`}
          ref={currentVideoRef}
          src={videoList[0]}
          loop
          muted
          zindexswitch = "2"
          zindexswitch2 = "3"
          style={{ zIndex: zIndex.current }}
        />
        <div  className={`gifButton ${videoPaused ? '' : 'playing'}`}>
          <ImPlay2  className='play'/>
        </div>
      </div>
      <div className="arrows">
        <RiArrowLeftWideFill onMouseDown={handleLeftClick} className={`aIcon ${leftClicked ? 'clicked' : ''}`}/>
          {videoList.map((_, index) => (
            <div key={index} className={`pageTracker ${index + 1 == activeTracker ? 'current' : ''}`}></div>
          ))}
        <RiArrowLeftWideFill onMouseDown={handleRightClick} className={`bIcon ${rightClicked ? 'clicked' : ''}`}/>
      </div>
    </div>
  )
}

export default Projects;