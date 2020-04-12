import React, { useState, useEffect } from 'react'
import logo from '../images/logo-alt.png'
import Song from './Song'
import axios from 'axios'
import Loader from './Loader'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([
    {
      title: 'Tame Impala - Feels Like We Only Go Backwards (Official Video)',
      thumbnail:
        'https://i.ytimg.com/vi/wycjnCCgUes/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCKZoPqsukMB-aXNXFxMcsaol7H6w',
      duration: '3:21',
      views: 112189485,
      id: 'wycjnCCgUes',
    },
    {
      title: 'The Less I Know The Better - Tame Impala Lyrics',
      thumbnail:
        'https://i.ytimg.com/vi/O2lzmpEs29M/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCTcCJQMZnH5bR3l3e9HSHItAhI0A',
      duration: '3:36',
      views: 44171963,
      id: 'O2lzmpEs29M',
    },
  ])
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // if (searchQuery.length > 3 && searchQuery.length % 3 === 0) {
    // axios
    //   .get(
    //     `https://cors-anywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`
    //   )
    //   .then((res) => setSearchSuggestions(res.data[1]))
    // }
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
            <img className="h-16 mr-4 flex-shrink-0" src={logo} alt="" />
            <span className="badge bg-red-300 text-white text-xs px-2  rounded font-bold"> BETA </span>
          </div>
        </div>
        <div className="border search-absolute shadow py-2 px-4 z-10 bg-white rounded-lg  text-gray-700 flex flex-col w-full max-w-xl ">
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
                className="outline-none w-full "
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
        {loading && <Loader />}
        {!loading && searchResults.length > 1 && (
          <h1 className=" container lg:max-w-xl  mx-auto mt-12 font-bold text-gray-800 ">Found $x results</h1>
        )}
        {!loading && searchResults && searchResults.map((song) => <Song key={song.id} song={song} />)}
      </section>
    </main>
  )
}

export default Search
