import React from 'react'
import axios from 'axios'

const Song = ({ song, setAudioSRC, songInfo, setSongInfo }) => {
  const { title, thumbnail, duration, views, id } = song
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ``

  const fetchSong = (id) => {
    axios
      .get(`${API_ENDPOINT}/api/song?id=${encodeURI(id)}`)
      .then((result) => result.data)
      .then((data) => {
        console.log(data)
        setAudioSRC(data)
        setSongInfo({ title, thumbnail, id, duration })
      })
  }
  return (
    <div
      className="grid items-center max-w-xs grid-cols-4 mx-auto my-2 overflow-hidden text-gray-700 align-middle transition duration-100 bg-white border rounded-lg shadow cursor-pointer md:max-w-xl lg:my-4 hover:bg-gray-100 hover:shadow-lg"
      onClick={() => fetchSong(id)}
    >
      <img
        className="object-cover w-full h-24 bg-gray-300 border-r-8 border-pink-200 md:h-24"
        src={thumbnail}
        alt=""
      />
      <div className="flex flex-col col-span-3 ml-2 mr-2 md:ml-4 ">
        <p className="flex-grow mb-3 leading-tight text-gray-700 songinfo-title">{title}</p>
        <div className="font-bold text-gray-800 ">
          <div className="inline-flex items-center px-2 text-sm text-gray-700 border rounded-full">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <p className="ml-2 text-md">{duration}</p>
          </div>
        </div>
        {/* <div className="font-bold opacity-50 "> {id}</div> */}
        {/* <p className="font-bold opacity-50 "> {views}</p> */}
      </div>
    </div>
  )
}

export default Song
