import React from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'

import Search from './components/Search'
import Landing from './components/Landing'

import './App.scss'

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </Switch>
  )
}
export default App
