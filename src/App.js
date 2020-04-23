import React, { useState } from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'

import Search from './components/Search'
import Landing from './components/Landing'
import Music from './components/Music'

import './App.scss'

function App() {
  const [audioSRC, setAudioSRC] = useState('')
  const [songInfo, setSongInfo] = useState({ title: '', thumbnail: '' })
  return (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/search">
        <Search setAudioSRC={setAudioSRC} setSongInfo={setSongInfo} />
        <Music audioSRC={audioSRC} songInfo={songInfo} />
      </Route>
    </Switch>
  )
}
export default App
