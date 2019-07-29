import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Home from '@material-ui/icons/Home'
import Input from '@material-ui/icons/Input'
import Lock from '@material-ui/icons/Lock'
import ImageSearch from '@material-ui/icons/ImageSearch'
import Collections from '@material-ui/icons/Collections'
import OpenInBrowser from '@material-ui/icons/OpenInBrowser'

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: '1rem',
    color: 'white',
    outline: 'none'
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 300
  }
}

class Header extends Component {
  constructor () {
    super()

    this.state = {
      open: false
    }
  }

  toggleDrawer = toggle => () => {
    this.setState({
      open: toggle
    })
  }

  render () {
    const authenticatedSideOptions = (
      <div style={styles.list}>
        <div className="side-nav-title">
          <Typography variant="h6" style={styles.title}>
            Picture It
          </Typography>
        </div>
        <Divider />
        <List component="nav">
          <ListItem className="side-nav-btns" button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/images">
            <ListItemIcon>
              <Collections />
            </ListItemIcon>
            <ListItemText primary="My Collection" />
          </ListItem>
          <ListItem button component={Link} to="/image-search">
            <ListItemIcon>
              <ImageSearch />
            </ListItemIcon>
            <ListItemText primary="Search Images" />
          </ListItem>
          {/* <ListItem button component={Link} to="/LINK">
            <ListItemIcon>
              And another option
            </ListItemIcon>
            <ListItemText primary="" />
          </ListItem>
          <ListItem button component={Link} to="">
            <ListItemIcon>
              One more option
            </ListItemIcon>
            <ListItemText primary="" />
          </ListItem> */}
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/change-password">
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
          <ListItem button component={Link} to="/sign-out">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </div>
    )

    const unauthenticatedSideOptions = (
      <div style={styles.list}>
        <div className="side-nav-title">
          <Typography variant="h6" style={styles.title}>
            Picture It
          </Typography>
        </div>
        <Divider />
        <List component="nav">
          <ListItem className="side-nav-btns" button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/sign-in">
            <ListItemIcon>
              <Input />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem button component={Link} to="/sign-up">
            <ListItemIcon>
              <OpenInBrowser />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      </div>
    )

    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              style={styles.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}>
              <MenuIcon/>
            </IconButton>
            <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}>
                { this.props.user ? authenticatedSideOptions : unauthenticatedSideOptions }
              </div>
            </Drawer>
            <Typography variant="h6" style={styles.title}>
              Picture It
            </Typography>
            { this.props.user && <span>Welcome, {this.props.user.email}</span>}
            {/* user ? (
              <React.Fragment>
                <Button style={styles.menuButton} component={Link} to="/change-password">Change Password</Button>
                <Button style={styles.menuButton} component={Link} to="/sign-out">Sign Out</Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button style={styles.menuButton} component={Link} to="/sign-up">Sign Up</Button>
                <Button style={styles.menuButton} component={Link} to="/sign-in">Sign In</Button>
              </React.Fragment>
            ) */}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Header
