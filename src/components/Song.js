import React from 'react'
import axios from 'axios'

const Song = ({song, setAudioSRC, songInfo, setSongInfo}) => {
  const {title, thumbnail, duration, views, id} = song

  const fetchSong = (id) => {
    axios
      .get(`http://localhost:3001/song?id=${encodeURI(id)}`)
      .then((result) => result.data)
      .then((data) => {
        setAudioSRC(data);
        setSongInfo({title, thumbnail, id})
      })
  };
  return (
    <div>
      <div
        className="grid grid-cols-4 bg-white border shadow max-w-xs md:max-w-xl mx-auto my-2 lg:my-4 rounded-lg text-gray-700 items-center align-middle overflow-hidden ">
        <img
          className=" h-24 md:h-24 bg-gray-300 w-full object-cover border-r-8 border-pink-200 "
          src={thumbnail}
          alt=""
        />
        <div className="flex flex-col col-span-2 ml-2 md:ml-4 ">
          <p className="font-bold  text-gray-800 flex-grow leading-tight ">
            {title.length > 27 ? title.slice(0, 27) + '...' : title}
          </p>
          <p className="font-bold opacity-50 "> {id}</p>
          <p className="font-bold opacity-50 "> {views}</p>
        </div>
        <div
          className=" hover:bg-gray-300 flex justify-center items-center h-16 w-16 border rounded-full flex-shrink-0 ml-auto mr-2"
          onClick={() => fetchSong(id)}
        >
          PLAY
        </div>
      </div>
    </div>
  )
}

export default Song
