import React, {useEffect, useState} from 'react'
import logo from '../images/logo-alt.png'
import Song from './Song'
import axios from 'axios'
import Loader from './Loader'

let jsonp = require('jsonp');

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([
    {
      title: "World's LONGEST Lightsaber",
      thumbnail:
        'https://i.ytimg.com/vi/ofvoLdLssA8/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCAzde9_-NFRxBHqU0IyKa81Rtp6Q',
      duration: '3:02',
      views: 87191640,
      id: 'ofvoLdLssA8',
    },
    {
      title: 'Life with the longest hair - Guinness World Records',
      thumbnail:
        'https://i.ytimg.com/vi/CrH5wzP_Puo/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBg0gUsnGeX0DLQR9c21PIpvIhVpA',
      duration: '2:45',
      views: 467242,
      id: 'CrH5wzP_Puo',
    },
    {
      title: 'The Longest Week Official Trailer #1 (2014) - Olivia Wilde, Jason Bateman Movie HD',
      thumbnail:
        'https://i.ytimg.com/vi/Qwu51SYfQQs/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDo5JL6oe5OT5kq0RoE7WT-7ExNZg',
      duration: '2:08',
      views: 4938472,
      id: 'Qwu51SYfQQs',
    },
  ])
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    jsonp(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`, null, function (err, data) {
      if (err) {
        console.error(err.message);
      } else {
        setSearchSuggestions(data[1]);
      }
    });

  }, [searchQuery])

  const fetchSongs = (e) => {
    e.preventDefault()
    setSearchSuggestions([])
    if ((!loading, searchQuery)) {
      setLoading(true)
      axios
        .get(`http://localhost:3001/search?q=${encodeURI(searchQuery)}`)
        .then((res) => res.data)
        .then((data) => {
          setSearchResults(data)
          setLoading(false)
        })
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <main>
      <header className="main-search flex bg-gray-800 p-16 relative border-b-4 border-red-200">
        <div className="container mx-auto ">
          <div className="flex items-center justify-center">
            <img className="h-16 mr-4 flex-shrink-0" src={logo} alt=""/>
            <span className="badge bg-red-300 text-white text-xs px-2  rounded font-bold"> BETA </span>
          </div>
        </div>
        <div
          className="border search-absolute shadow py-2 px-4 z-10 bg-white rounded-lg  text-gray-700 flex flex-col w-full max-w-xl ">
          <div className="flex items-center ">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4 mx-2"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <form onSubmit={fetchSongs} className="w-full">
              <input
                className="outline-none w-full text-xl"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a song..."
              />
            </form>
          </div>
          {searchQuery &&
          searchSuggestions && [
            <ul>
              {searchSuggestions.map((suggestion) => (
                <li
                  className="p-1 hover:text-black break-words"
                  onClick={(e) => {
                    setSearchQuery(e.target.textContent)
                    setSearchSuggestions([])
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>,
          ]}
        </div>
      </header>
      <section className="container mx-auto m-8 mb-64 ">
        {loading && <Loader/>}
        {!loading && searchResults.length > 1 && (
          <h1 className=" container lg:max-w-xl text-2xl mx-auto mt-12 font-bold text-gray-800 ">Found $x results</h1>
        )}
        {!loading && searchResults && searchResults.map((song) => <Song key={song.id} song={song}/>)}
      </section>
    </main>
  )
}

export default Search
