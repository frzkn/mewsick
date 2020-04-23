import React, { useRef, useState } from 'react'

const Music = ({ audioSRC, songInfo }) => {
  // src if not then disabled

  let audioRef = useRef(null)
  let [isPlaying, setIsPlaying] = useState(true)

  const toggle = () => {
    if (isPlaying) {
      audioRef.pause()
    } else audioRef.play()
    setIsPlaying(!isPlaying)
  }

  React.useEffect(() => {
    return () => {
      isPlaying(false)
    }
  }, [])

  // if (audioSRC.length === 0)
  if (audioSRC.length > 1)
    return (
      <div>
        <audio src={audioSRC} autoPlay ref={(el) => (audioRef = el)}></audio>
        <div
          className=" border w-screen fixed bottom-0  bg-purple-600 py-2"
          style={{ backgroundColor: '#3d3748', borderTop: '.25rem solid #feb2b2 ' }}
        >
          <div className="mx-auto flex items-center h-full max-w-xs md:max-w-xl ">
            <img src={songInfo.thumbnail} alt="" className="rounded h-12 w-auto bg-gray-700 object-fit" />
            <div className="text-white ml-4 flex flex-col">
              <p className="font-bold text-sm opacity-75">{songInfo.title}</p>
              <p className="  p-1 text-white text-sm opacity-50">
                <code>@mewsick</code>
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
                className="h-10 w-10 rounded-full bg-gray-100 text-center flex justify-center items-center hover:bg-gray-200"
                onClick={toggle}
              >
                {isPlaying ? (
                  [
                    <span className="block h-4 w-1 bg-gray-700 mr-1 rounded-lg"></span>,
                    <span className="block h-4 w-1 bg-gray-700 rounded-lg"></span>,
                  ]
                ) : (
                  <span className="block h-4 w-4 bg-gray-700 play-btn"></span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  else return <div></div>
}

export default Music
