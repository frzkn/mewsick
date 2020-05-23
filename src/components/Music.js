import { SongContext } from '../context/SongContext'
import { AudioContext } from '../context/AudioContext'
import React, { useRef, useState, useContext, useEffect } from 'react'

const Music = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ``

  const { songInfo } = useContext(SongContext)
  const { audioSRC } = useContext(AudioContext)
  const [duration, setDuration] = useState(0)
  const [left, setLeft] = useState(0)

  const [songProgressSeconds, setSongProgressSeconds] = useState(1)
  const [songEnded, setSongEnded] = useState(false)

  let audioRef = useRef(null)
  let timeline = useRef(null)
  let [isPlaying, setIsPlaying] = useState(true)

  const toggle = () => {
    if (songEnded) {
      audioRef.currentTime = 0
      setSongEnded(false)
    }
    if (isPlaying) {
      audioRef.pause()
    } else audioRef.play()
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    return () => {
      if (isPlaying) setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    setIsPlaying(true)
    setDuration(audioRef.duration)
  }, [audioSRC])

  useEffect(() => {
    setLeft((100 / audioRef.duration) * songProgressSeconds)
  }, [songProgressSeconds])

  // console.log(audioRef && audioRef.current && audioRef.duration, songProgressSeconds)
  // if (audioSRC.length === 0)
  if (audioSRC.length > 1)
    return (
      <div className="">
        <audio
          // src={
          //   'https://r6---sn-8vq54voxpo-cvhe.googlevideo.com/videoplayback?expire=1590284832&ei=wH3JXofVLZbgvwT05ZCwBQ&ip=1.38.156.88&id=o-AAwNoDLNMwPxqGdxZ3Yh7S35mGYZDagwZ74XdFM6n7hH&itag=140&source=youtube&requiressl=yes&mh=k-&mm=31%2C26&mn=sn-8vq54voxpo-cvhe%2Csn-h5576n7k&ms=au%2Conr&mv=m&mvi=5&pl=22&initcwndbps=210000&vprv=1&mime=audio%2Fmp4&gir=yes&clen=3509448&dur=216.781&lmt=1575336399939026&mt=1590263134&fvip=2&keepalive=yes&fexp=23882513&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgf3mLR8v4mEOlQqwh3z7WGRJ2VNIgZ7luISwF1cWxOSYCIQC9WIVU19u90Oy1JRC-zmVo73TrBqxozDgCTuX-8P7gtg%3D%3D&ratebypass=yes&sig=AOq0QJ8wRQIhALgg7jfE6baLfeuOz5QHZ1bRco4vAa2QdUmrMKUYG__nAiA0LIhaxEL6qlw6shNWpaWeYyqyQCZfREJGGCX4c4CNFg%3D%3D'
          // }
          src={audioSRC}
          autoPlay
          ref={(el) => (audioRef = el)}
          // onPlay={(s) => {console.lo}}
          onEnded={() => {
            setIsPlaying(false)
            setSongEnded(true)
          }}
          onTimeUpdate={(e) => setSongProgressSeconds(audioRef.currentTime)}
        ></audio>
        <div className="fixed bottom-0 w-screen py-2 bg-white border">
          <div className="flex items-center justify-between h-full max-w-xs mx-auto md:max-w-xl">
            <img
              src={songInfo.thumbnail || 'https://unsplash.it/400/400'}
              alt=""
              className="w-auto h-12 bg-gray-700 rounded md:h-16 object-fit"
            />
            <div className="flex flex-col ml-4 ">
              <p className="text-sm text-center opacity-75 songinfo-title">{songInfo.title || 'Born to love u'}</p>
            </div>
            <div className="flex items-center justify-center text-white ">
              <div
                className="flex items-center justify-center w-10 h-10 text-center text-gray-600 bg-gray-100 border rounded-full hover:bg-gray-200"
                onClick={toggle}
              >
                {isPlaying ? (
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    <path
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>

              <div className="flex items-center justify-center w-10 h-10 ml-2 text-center bg-gray-100 border rounded-full hover:bg-gray-200">
                <a
                  href={`${API_ENDPOINT}/api/download/?URL=${songInfo.id}&title=${songInfo.title}`}
                  className="text-gray-600"
                >
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div
            className="relative flex items-center h-2 max-w-xs mx-auto my-2 overflow-hidden transition-all transition duration-300 bg-purple-300 rounded-full md:max-w-xl hover:h-4"
            onMouseDown={(e) => {
              let point = e.clientX
              let boundingClientRect = timeline.getBoundingClientRect()
              let x1 = boundingClientRect.x
              let x2 = boundingClientRect.x + boundingClientRect.width

              let X = (point - x1) / (x2 - x1)
              let ans = X * (audioRef.duration - 0) + 0
              console.log(audioRef.duration)
              console.log(ans)

              audioRef.currentTime = ans
              setLeft((100 / audioRef.duration) * ans)
            }}
            ref={(el) => (timeline = el)}
            // onPlay={(s) => {console.lo}}
          >
            <span className="absolute w-full h-full bg-white border" style={{ position: 'absolute', left: `${left}%` }}>
              {/* <span className="w-3 h-3 bg-black border rounded-full"></span> */}
            </span>
          </div>

          <div className="flex justify-between max-w-xs mx-auto text-xs md:max-w-xl ">
            <span className="px-1 ">{`${Math.floor(songProgressSeconds / 60)}:${Math.round(
              songProgressSeconds % 60
            )}`}</span>{' '}
            <span className="px-1 text-white text-gray-700 rounded ">{songInfo.duration}</span>
          </div>
        </div>
      </div>
    )
  else return <div></div>
}

export default Music
