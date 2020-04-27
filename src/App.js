import React, { useState } from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'

import Search from './components/Search'
import Landing from './components/Landing'
import Music from './components/Music'

import { AudioContext } from './context/AudioContext'
import { SongContext } from './context/SongContext'

import './App.scss'

function App() {
  // const AudioContext
  const [audioSRC, setAudioSRC] = useState('')
  const [songInfo, setSongInfo] = useState({ title: '', thumbnail: '' })
  return (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/search">
        <AudioContext.Provider value={{ audioSRC, setAudioSRC }}>
          <SongContext.Provider value={{ songInfo, setSongInfo }}>
            <Search />
            <Music />
          </SongContext.Provider>
        </AudioContext.Provider>
      </Route>
    </Switch>
  )
}
export default App
