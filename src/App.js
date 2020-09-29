// MODULE
import React from 'react'
import { Switch, Route, withRouter, useHistory } from 'react-router-dom'

// COMPONENT
import HomeScreen from './Pages/Home'
import LoginScreen from './Pages/Login'

function App () {

  return (
    <div style={{width : "100%"}}>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/" component={HomeScreen} />
      </Switch>
    </div>
  )

}

export default withRouter(App)