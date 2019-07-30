import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import CreateImageEntry from './images/components/CreateImageEntry'
import ImageEntry from './images/components/ImageEntry'
import ImageEntryList from './images/components/ImageEntryList'
import EditImageEntry from './images/components/EditImageEntry'
import Home from './Home.js'
import SearchImages from './images/components/SearchImages'
import CreateImageEntryFromSearch from './images/components/CreateImageEntryFromSearch'

import { SnackbarProvider } from 'notistack'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  render () {
    const { user } = this.state

    return (
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <Header user={user} />
        <Route exact path='/' render={() => (
          <Home alert={this.alert} user={user} />
        )} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/create-image-entry' render={() => (
            <CreateImageEntry alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-image-entry-from-search' render={() => (
            <CreateImageEntryFromSearch alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/image-search' render={() => (
            <SearchImages alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/images' render={() => (
            <ImageEntryList alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/images/:id' render={() => (
            <ImageEntry alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/images/:id/edit' render={() => (
            <EditImageEntry alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </SnackbarProvider>
    )
  }
}

export default App
