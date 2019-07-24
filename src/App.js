import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import CreateReview from './reviews/components/CreateReview'
import Review from './reviews/components/Review'
import ReviewsList from './reviews/components/ReviewsList'
import EditReview from './reviews/components/EditReview'
import Home from './Home.js'
import SearchImages from './reviews/components/SearchImages'

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
      <SnackbarProvider maxSnack={3}>
        <Header user={user} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Home alert={this.alert} user={user} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/create-review' render={() => (
            <CreateReview alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/image-search' render={() => (
            <SearchImages alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/reviews' render={() => (
            <ReviewsList alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/reviews/:id' render={() => (
            <Review alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/reviews/:id/edit' render={() => (
            <EditReview alert={this.alert} user={user} />
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
