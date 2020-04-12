import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Song = ({ song }) => {
  const { title, thumbnail, duration, views, id } = song
  const [audioURI, setAudioURI] = useState('')

  useEffect(() => {
    console.log(audioURI)
  }, [audioURI])
  const fetchSong = (id) => {
    axios
      .get(`http://localhost:3001/song?id=${encodeURI(id)}`)
      .then((result) => result.data)
      .then((data) => setAudioURI(data))
    // .then((data) => console.log(data))
  }
  return (
    <div>
      <div className="grid grid-cols-4 bg-white border shadow max-w-xl mx-auto my-4 rounded-lg text-gray-700 items-center align-middle p-6">
        <img className="rounded-custom h-24 border bg-gray-300 w-24 object-cover " src={thumbnail} alt="" />
        <div className="flex flex-col col-span-2 ">
          <p className="font-bold  text-gray-800 flex-grow leading-tight ">
            {title.length > 70 ? title.slice(0, 70) + '...' : title}
          </p>
          <p className="font-bold opacity-50 "> {id}</p>
          <p className="font-bold opacity-50 "> {views}</p>
        </div>
        <div
          className=" hover:bg-gray-300 flex justify-center items-center h-16 w-16 border rounded-full flex-shrink-0 ml-auto"
          onClick={() => fetchSong(id)}
        >
          PLAY
        </div>
      </div>
      {audioURI.length > 1 && [
        <div className="audio">
          <h2 className="px-4">NOW PLAYING - {title}</h2>
          <audio controls>
            <source src={audioURI} />
          </audio>
        </div>,
      ]}
    </div>
  )
}

export default Song
