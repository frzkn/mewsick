import React, { useState, useEffect } from 'react'
import logo from '../images/logo-alt.png'
import Song from './Song'
import axios from 'axios'
import Loader from './Loader'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

let jsonp = require('jsonp')

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
            <img className="mr-4  h-auto w-auto logo" src={logo} alt="" />
            <span className="badge bg-red-300 text-white text-xs px-2  rounded font-bold"> BETA </span>
          </div>
        </div>
        <div className="border search-absolute shadow py-2 px-4 z-10 bg-white rounded-lg  text-gray-700 flex flex-col w-full max-w-xs md:max-w-xl  ">
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
          <h1 className=" container lg:max-w-xl  mx-auto mt-12 font-bold text-gray-800 max-w-xs md:max-w-xl ">
            Found {searchResults.length} results
          </h1>
        )}
        {!loading && searchResults && searchResults.map((song) => <Song key={song.id} song={song} />)}
      </section>
      <ReactJkMusicPlayer
        theme="light"
        autoPlay="false"
        audioLists={[
          {
            name: 'Tame Impala only going backwards',
            cover:
              'https://i.ytimg.com/vi/wycjnCCgUes/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCKZoPqsukMB-aXNXFxMcsaol7H6w',
            musicSrc:
              'http://localhost:8080/https://r1---sn-hpjgvnj5o-cvhs.googlevideo.com/videoplayback?expire=1586722458&ei=OiKTXs7yMsn54-EPxa2E4AE&ip=103.198.164.95&id=o-AE-MHfR4WD01fW_m3MDe-QTqfhO_t0z6RRhGpiuNl5Cn&itag=140&source=youtube&requiressl=yes&mh=iw&mm=31%2C29&mn=sn-hpjgvnj5o-cvhs%2Csn-cvh76nez&ms=au%2Crdu&mv=m&mvi=0&pl=24&gcr=in&initcwndbps=382500&vprv=1&mime=audio%2Fmp4&gir=yes&clen=3238574&dur=200.063&lmt=1575011845678447&mt=1586700754&fvip=4&keepalive=yes&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ALrAebAwRQIgOOT7CYSn5r-U_aB4PVsjj7-7gjDgzavkkXwGD1b7qncCIQDbuZVASJ1Vul7alF5xKJokPzJeG6lbo7KyovUa5IJZIw%3D%3D&ratebypass=yes&sig=AJpPlLswRgIhAMw6AbkTh2Iqv96jBIm9E8Pvb4lPQ2dklPOhoqOkXwfNAiEAwC1aldRb_92fshlSa0-J3g9gSPubvz6szPdfgmgXiHA%3D',
          },
        ]}
      />
      />
    </main>
  )
}

export default Search
