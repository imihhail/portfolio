import './home.css';
import { useRef, useState, useEffect} from 'react';
import { RiArrowLeftWideFill} from "react-icons/ri";
import { ImPlay2 } from "react-icons/im";
import api from '../assets/api.mp4';
import bomberman from '../assets/bomberman.mp4';
import tetris from '../assets/tetris.mp4';
import snetwork from '../assets/snetwork.mp4';
import messenger from '../assets/messenger.mp4';


function Projects() {
  const videoList = [
    { project: api, info: ["Project: GO-API", "Languages: GO, HTML, CSS"] },
    { project: messenger, info: ["Project: Forum-chat", "Languages: GO, JavaScript"] },
    { project: tetris, info: ["Project: Tetris", "Languages: GO, JavaScript"] },
    { project: bomberman, info:["Project: Bomberman-live", "Languages: GO, JavaScript, React"] },
    { project: snetwork, info: ["Project: Social gameNetwork", "Languages: GO, JavaScript, React"] }
  ]
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const prevVideoRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
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
  const [projectText, setProjectText] = useState("");
  const [projectText2, setProjectText2] = useState("");
  const loopTextIntervals = useRef({});
  const [videosLoading, setVideosLoading] = useState(false);
  const [playSpinner, setPlaySpinner] = useState(false);
  let expectedVideo = useRef(null);
  const [isTextDeleted, setIsTextDeleted] = useState(false);
  const animationData = useRef({});
  const loadingVideos = useRef({});


  useEffect(() => {
    if (!initialLoad) {
      typeText(videoList[page - 1].info[0], 0)
      typeText(videoList[page - 1].info[1], 1)
    }
  }, [initialLoad])
  
  const handleLeftClick = () => {
    if (Object.values(sliding).includes(true) || playSpinner || initialLoad) return
    setLeftClicked(true)
    setTimeout(() => setLeftClicked(false), 100)

    let nextVidInd = 0
    const [topEl, botRight] =
    zIndex.current == 3 ? [currentVideoRef, nextVideoRef] : [nextVideoRef, currentVideoRef]
    const posChoice = zIndex.current == 3 ? 'topRight' : 'botRight'
    const zInd1 = topEl.current.getAttribute('zindexswitch')
    const zInd2 = topEl.current.getAttribute('zindexswitch2')
    const newPageVal = page === 1 ? videoList.length : page - 1

    setPage(newPageVal)
    newPageVal == videoList.length ? nextVidInd = newPageVal - 2 : nextVidInd = page - 3
    botRight.current.src = prevVideoRef.current.src
    botRight.current.style.opacity = "1"
    
    if (Object.keys(loadingVideos.current).length > 0) {
      expectedVideo.current = botRight.current
      setPlaySpinner(true)
    }
    if (!videoPaused) botRight.current.play()
      setSliding(prevState => ({
        ...prevState,
        [posChoice]: true
      }))

    // PageTracker reverse animation when current page is first page
    if (page !== 1) setActiveTracker(newPageVal)
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
            setActiveTracker(newPageVal)
          }
        }
        const removeGlowIntervalId = setInterval(removeGlow, 60)
      }, 180)
    }

    animationData.current = {
      topEl,
      posChoice,
      zInd1,
      zInd2,
      newPageVal,
      nextVidInd
    }
  }

    // Change hidden videos after sliding animation ends
    const handleAnimationEnd = () => {
      const {topEl, posChoice, zInd1, zInd2, newPageVal, nextVidInd } = animationData.current

      if (nextVidInd === undefined) {
        prevVideoRef.current.src = topEl.current.src
        const nextVideoSrc =
          newPageVal === videoList.length
            ? videoList[0].project
            : videoList[newPageVal].project
        topEl.current.src = nextVideoSrc
      } else {
        newPageVal == 1 ? prevVideoRef.current.src = videoList[videoList.length-1].project
        : prevVideoRef.current.src = videoList[nextVidInd].project
        setZIndex({ current: zInd1, next: zInd2 })
      }
      
      setZIndex({ current: zInd1, next: zInd2 });
      setSliding((prevState) => ({
        ...prevState,
        [posChoice]: false,
      }))
      
      if (topEl.current) {topEl.current.style.opacity = "0"}
    }
  
  const handleRightClick = () => {
    if (Object.values(sliding).includes(true) || playSpinner || initialLoad) return
    
    setRightClicked(true)
    setTimeout(() => setRightClicked(false), 100)

    const [topEl, bot] =
    zIndex.current == 3 ? [currentVideoRef, nextVideoRef] : [nextVideoRef, currentVideoRef]
    bot.current.style.opacity = "1";
    const posChoice = zIndex.current == 3 ? 'topLeft' : 'botLeft'
    const zInd1 = topEl.current.getAttribute('zindexswitch')
    const zInd2 = topEl.current.getAttribute('zindexswitch2')
    
    if (Object.keys(loadingVideos.current).length > 0) {
      expectedVideo.current = bot.current
      setPlaySpinner(true)
    }
  
    const newPageVal = page == videoList.length ? 1 : page + 1
    setPage(newPageVal)
    if (page !== videoList.length) setActiveTracker(newPageVal)
      
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
            setActiveTracker(newPageVal)
          }
        }
        const removeGlowIntervalId = setInterval(removeGlow, 60)
      }, 180)
    }

    setSliding(prevState => ({
      ...prevState,
      [posChoice]: true,
    }))
    
    videoPaused ? bot.current.pause() : bot.current.play()
    animationData.current = {
      topEl,
      posChoice,
      zInd1,
      zInd2,
      newPageVal,
    }
  }

  const handleAnimationStart = () => {
    Object.values(loopTextIntervals.current).forEach(intervalId => {
      clearInterval(intervalId);
    })
    // loopTextIntervals.current = {};
    removeText(projectText, 0)
    removeText(projectText2, 1)
  }

  function typeText(text, line) {
    let i = -1
    
    function letterInterval() {
      i++
      if (i < text.length && loopTextIntervals.current[line]) {
        if (line === 0) {
          setProjectText(prev => prev + text[i])
        } else {
          setProjectText2(prev => prev + text[i])
        }
      } else {
        clearInterval(loopTextIntervals.current[line])
        delete loopTextIntervals.current[line]
      }
    }
    loopTextIntervals.current[line] = setInterval(letterInterval, 80)
  }

  function removeText(text, line) {
    setIsTextDeleted(false)
    
    const removeSpeed = 700 / text.length
    const setText = line === 0 ? setProjectText : setProjectText2;

    const removeInterval = setInterval(() => {
      setText(prev => {
        if (prev.length === 0) {
          clearInterval(removeInterval);
          if (line === 1 ) {
            setIsTextDeleted(true)
          }
          return ""
        }
        return prev.slice(0, -1)
      })
    }, removeSpeed)
  }

  // Start typing video info text
  useEffect(() => {
    if (isTextDeleted) {
      if (!playSpinner) {
        typeText(videoList[page - 1].info[0], 0);
        typeText(videoList[page - 1].info[1], 1);
      }
    }
  }, [isTextDeleted, playSpinner]);
  
  const handleVideoLoad = () => {
    if (initialLoad) {
      setVideosLoading(false);
      setInitialLoad(false);
    }
  }

  const handlePreloadStart = (videoRef, key) => {
    if (!initialLoad) {
      loadingVideos.current[key] = videoRef.current;
    }
  }
  
  const handlePreloadFinish = (vid) => {
    if (!initialLoad) {
      if (expectedVideo.current == vid.current || Object.keys(loadingVideos.current).length == 1) {
        setPlaySpinner(false)
      }
      Object.keys(loadingVideos.current).forEach((key) => {
        if (loadingVideos.current[key] === vid.current) {
          delete loadingVideos.current[key];
        }
      })
    }
  }

  const toggleVideoPlay = () => {
    if (Object.values(sliding).includes(true) || initialLoad) return
    const videoRef = zIndex.current == 3 ? currentVideoRef : nextVideoRef
    
    if (!videoPaused) {
      videoRef.current.pause()
      setVideoPaused(true)
    } else {
      videoRef.current.play()
      setVideoPaused(false)
    }
  }

  const handleVideoLoadStart = () => {
    if (initialLoad) setVideosLoading(true)
  }


  return (
    <div className="App" >
      <div className="videoText">
        <strong>{projectText.slice(0, 8)}</strong>{projectText.slice(8)}
          <br />
        <strong>{projectText2.slice(0, 10)}</strong>{projectText2.slice(10)}
      </div>
      <div className='videoContainer' onClick={toggleVideoPlay}>
        {(videosLoading) && (<div className="loader"></div> )}
        {(playSpinner) && (<div className="loader2"></div> )}

        <video
          className={`currentVideo ${sliding.topRight ? 'slideRight' : ''}${sliding.topLeft ? 'slideLeft' : ''}`}
          ref={currentVideoRef}
          src={videoList[0].project}
          loop
          muted
          zindexswitch = "2"
          zindexswitch2 = "3"
          style={{ zIndex: zIndex.current }}
          onLoadStart={() => {
            handleVideoLoadStart()
            handlePreloadStart(currentVideoRef, "current")
          }}
          onLoadedData={() => {
            handleVideoLoad()
            handlePreloadFinish(currentVideoRef)
          }}
          onAnimationEnd={handleAnimationEnd}
          onAnimationStart={handleAnimationStart}
        />
        {!videosLoading && (
          <>
            <video
              className='previousVideo'
              ref={prevVideoRef}
              src={videoList[videoList.length - 1].project}
              loop
              muted
              style={{ zIndex: zIndex.prev }}
              onLoadStart={() => {handlePreloadStart(prevVideoRef, "bot")}}
              onLoadedData={() => {handlePreloadFinish(prevVideoRef)}}
              onAnimationEnd={handleAnimationEnd}
              onAnimationStart={handleAnimationStart}
            />
            <video
              className={`nextVideo ${sliding.botRight ? 'slideRight' : ''}${sliding.botLeft ? 'slideLeft' : ''}`}
              ref={nextVideoRef}
              src={videoList[1].project}
              loop
              muted
              zindexswitch = "3"
              zindexswitch2 = "2"
              style={{ zIndex: zIndex.next }}
              onLoadStart={() => {handlePreloadStart(nextVideoRef, "next")}}
              onLoadedData={() => {handlePreloadFinish(nextVideoRef)}}
              onAnimationEnd={handleAnimationEnd}
              onAnimationStart={handleAnimationStart}
            />
            {!playSpinner && (
              <div className={`gifButton ${videoPaused ? '' : 'playing'}`}>
                <ImPlay2 className='play' />
              </div>
            )}
          </>
        )}
      </div>

      <div className="arrows">
        <RiArrowLeftWideFill onMouseDown={handleLeftClick} className={`aIcon ${leftClicked ? 'clicked' : ''}`}/>
        {videoList.map((key, index) => (
          <div
            key={index}
            className={`pageTracker ${index + 1 === activeTracker ? 'current' : ''}`}
          ></div>
        ))}
        <RiArrowLeftWideFill onMouseDown={handleRightClick} className={`bIcon ${rightClicked ? 'clicked' : ''}`}/>
      </div>
    </div>
  )
}

export default Projects;