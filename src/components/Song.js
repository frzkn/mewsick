import React from 'react'

const Song = ({ song }) => {
  const { title, thumbnail, duration, views, id } = song
  return (
    <div>
      <div className="grid grid-cols-4 bg-white border shadow max-w-xl mx-auto my-4 rounded-lg text-gray-700 items-center align-middle p-6">
        <img className="rounded-custom h-24 border bg-gray-300 w-24 object-cover " src={thumbnail} alt="" />
        <div className="flex flex-col col-span-2 ">
          <p className="font-bold text-xl text-gray-800 flex-grow leading-tight ">
            {title.length > 30 ? title.slice(0, 30) + '...' : title}
          </p>
          <p className="font-bold opacity-50 "> {id}</p>
          <p className="font-bold opacity-50 "> {views}</p>
        </div>
        <div className=" hover:bg-gray-300 flex justify-center items-center h-16 w-16 border rounded-full flex-shrink-0 ml-auto">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Song
