import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

const menuStyle = { textDecoration: 'none', color: 'black' }
const logoStyle = { textDecoration: 'none', color: 'white' }

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (e: any) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link style={logoStyle} to="/">
              Dali
            </Link>
          </Typography>
          <div>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link style={menuStyle} to="/sketch">
                <MenuItem onClick={handleClose}>Sketch</MenuItem>
              </Link>
              <Link style={menuStyle} to="/notepad">
                <MenuItem onClick={handleClose}>Notepad</MenuItem>
              </Link>
              <Link style={menuStyle} to="/design">
                <MenuItem onClick={handleClose}>Design</MenuItem>
              </Link>
              <Link style={menuStyle} to="/icon-generator">
                <MenuItem onClick={handleClose}>Icon Generator</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
