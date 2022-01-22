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
            <Link to="/">Dali</Link>
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
              <MenuItem onClick={handleClose}>
                <Link to="/sketch">Sketch</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/design">Design</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/icon-generator">Icon Generator</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
