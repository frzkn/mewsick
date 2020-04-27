import React from 'react'
import axios from 'axios'

const Song = ({ song, setAudioSRC, songInfo, setSongInfo }) => {
  const { title, thumbnail, duration, views, id } = song

  const fetchSong = (id) => {
    axios
      .get(`http://localhost:3001/song?id=${encodeURI(id)}`)
      .then((result) => result.data)
      .then((data) => {
        console.log(data)
        setAudioSRC(data)
        setSongInfo({ title, thumbnail, id, duration })
      })
  }
  return (
    <div
      className="grid grid-cols-4 bg-white border shadow max-w-xs md:max-w-xl mx-auto my-2 lg:my-4 rounded-lg text-gray-700 items-center align-middle overflow-hidden   hover:bg-gray-100 cursor-pointer hover:shadow-lg transition duration-100"
      onClick={() => fetchSong(id)}
    >
      <img
        className=" h-24 md:h-24 bg-gray-300 w-full object-cover border-r-8 border-pink-200 "
        src={thumbnail}
        alt=""
      />
      <div className="flex flex-col col-span-3 ml-2 md:ml-4  mr-2 ">
        <p className="font-bold  text-gray-800 flex-grow leading-tight songinfo-title mb-3">{title}</p>
        <div className="font-bold text-white  items-center ">
          <div className="inline-flex bg-purple-600 py-1 px-2 items-center rounded opacity-75 text-sm text-gray-100">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-4 w-4">
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <p className=" ml-2">{duration}</p>
          </div>
        </div>
        {/* <div className="font-bold opacity-50 "> {id}</div> */}
        {/* <p className="font-bold opacity-50 "> {views}</p> */}
      </div>
    </div>
  )
}

export default Song
