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
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || `https://asdf.herokuapp.com`

  const { setSongInfo } = useContext(SongContext)
  const { setAudioSRC } = useContext(AudioContext)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([
    {
      title: 'OnePlus 8 Pro - Lead with Speed',
      thumbnail:
        'https://i.ytimg.com/vi/sfQjKndZbZg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAnv6YvJJHuIikV_RtiSb9AS1S39w',
      duration: '1:01',
      views: 236036,
      id: 'sfQjKndZbZg',
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
        .get(`${API_ENDPOINT}/search?q=${encodeURI(searchQuery)}`)
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
        <div className="z-10 flex flex-col w-full max-w-xs px-4 py-2 text-gray-700 bg-white border rounded-lg shadow search-absolute md:max-w-xl ">
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
      <section className="container m-8 mx-auto mb-64 ">
        {loading && <Loader />}
        {!loading && searchResults.length > 1 && (
          <h1 className="container max-w-xs mx-auto mt-12 font-bold text-gray-800 lg:max-w-xl md:max-w-xl">
            Found {searchResults.length} results
          </h1>
        )}
        {!loading &&
          searchResults &&
          searchResults.map((song) => (
            <Song key={song.id} song={song} setAudioSRC={setAudioSRC} setSongInfo={setSongInfo} />
          ))}
      </section>
      {/* <ReactJkMusicPlayer
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
      /> */}
    </main>
  )
}

export default Search
