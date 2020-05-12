import { SongContext } from '../context/SongContext'
import { AudioContext } from '../context/AudioContext'
import React, { useRef, useState, useContext, useEffect } from 'react'

const Music = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ``

  const { songInfo } = useContext(SongContext)
  const { audioSRC } = useContext(AudioContext)

  const [songProgressSeconds, setSongProgressSeconds] = useState(1)
  const [songEnded, setSongEnded] = useState(false)

  let audioRef = useRef(null)
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
  }, [audioSRC])

  // if (audioSRC.length === 0)
  if (audioSRC.length > 1)
    return (
      <div>
        <audio
          src={audioSRC}
          autoPlay
          ref={(el) => (audioRef = el)}
          onPlay={(s) => {}}
          onEnded={() => {
            setIsPlaying(false)
            setSongEnded(true)
          }}
          onTimeUpdate={(e) => setSongProgressSeconds(audioRef.currentTime)}
        ></audio>
        <div
          className=" border w-screen fixed bottom-0  bg-white py-2"
          // style={{ backgroundColor: '#3d3748', borderTop: '.25rem solid #feb2b2 ' }}
          // style={{ borderTop: '0.1rem solid #afafaf' }}
        >
          <div className="mx-auto flex items-center h-full max-w-xs md:max-w-xl ">
            <img src={songInfo.thumbnail} alt="" className="rounded h-12 md:h-16 w-auto bg-gray-700 object-fit" />
            <div className=" ml-4 flex flex-col">
              <p className=" text-sm opacity-75 songinfo-title">{songInfo.title}</p>
              <p className=" p-1  text-sm ">
                <span className="bg-purple-400 rounded px-1 text-white border ">{`${Math.floor(
                  songProgressSeconds / 60
                )}:${Math.round(songProgressSeconds % 60)}`}</span>{' '}
                /<span className=" rounded px-1 text-white text-gray-700 ">{songInfo.duration}</span>
                {/* <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>*/}
              </p>
            </div>
            <div className="controls ml-auto text-white flex justify-center items-center">
              <div
                className="h-10 w-10 rounded-full bg-gray-100 text-center flex justify-center items-center hover:bg-gray-200 border text-gray-600"
                onClick={toggle}
              >
                {isPlaying ? (
                  <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                    <path
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>

              <div className="h-10 w-10 rounded-full bg-gray-100 text-center flex justify-center items-center hover:bg-gray-200 ml-2 border">
                <a
                  href={`${API_ENDPOINT}/download/?URL=${songInfo.id}&title=${songInfo.title}`}
                  className="text-gray-600"
                >
                  <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
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
        </div>
      </div>
    )
  else return <div></div>
}

export default Music
