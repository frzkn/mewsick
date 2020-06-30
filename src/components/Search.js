import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo-alt.png'
import Song from './Song'
import axios from 'axios'
import Loader from './Loader'
import { SongContext } from '../context/SongContext'
import { AudioContext } from '../context/AudioContext'

let jsonp = require('jsonp')

const Search = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ``

  const { setSongInfo } = useContext(SongContext)
  const { setAudioSRC } = useContext(AudioContext)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [playlist, setPlaylist] = useState([])
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    jsonp(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`, null, function (
      err,
      data
    ) {
      if (err) {
        console.error(err.message)
      } else {
        setSearchSuggestions(data[1])
      }
    })
  }, [searchQuery])

  const fetchSongs = (e) => {
    e.preventDefault()
    setSearchSuggestions([])
    if ((!loading, searchQuery)) {
      setSearchSuggestions([])
      setLoading(true)
      axios
        .get(`${API_ENDPOINT}/api/search?q=${encodeURI(searchQuery)}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data)
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
      <header className="relative flex p-16 bg-gray-800 border-b-4 border-red-200 main-search">
        <div className="container mx-auto ">
          <Link className="flex items-center justify-center" to="/">
            <img className="w-auto h-auto mr-4 logo" src={logo} alt="" />
            <span className="px-2 text-xs font-bold text-white bg-red-300 rounded badge"> BETA </span>
          </Link>
        </div>
        <div className="z-10 flex flex-col w-full max-w-sm px-4 py-2 text-gray-700 bg-white border rounded-lg shadow search-absolute md:max-w-xl ">
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
                className="w-full outline-none "
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
                    className="p-1 break-words hover:text-black"
                    onClick={(e) => {
                      setSearchQuery(e.target.textContent)
                      fetchSongs(e)
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>,
            ]}
        </div>
      </header>
      <section className="container px-2 m-8 mx-auto mb-64">
        {loading && (
          <div className="flex items-center justify-center transform translate-y-4 opacity-75">
            <Loader />{' '}
          </div>
        )}
        {!loading && searchResults.length > 1 && (
          <h1 className="container max-w-sm px-2 mx-auto mt-12 font-bold text-gray-800 lg:max-w-xl md:max-w-xl">
            Found {searchResults.length} results
          </h1>
        )}
        {!loading &&
          searchResults &&
          searchResults.map((song) => (
            <Song key={song.id} song={song} setAudioSRC={setAudioSRC} setSongInfo={setSongInfo} />
          ))}
      </section>
    </main>
  )
}

export default Search
