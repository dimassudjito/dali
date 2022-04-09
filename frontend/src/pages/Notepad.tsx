import React, { useState } from 'react'
import { Box, Grid, TextareaAutosize } from '@mui/material'

export const Notepad: React.FC = () => {
  const [text, setText] = useState('')

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextareaAutosize
            aria-label="Textarea to type in your content"
            minRows={5}
            maxRows={30}
            placeholder="Type in your content here"
            style={{ width: '100%' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          photo area
        </Grid>
      </Grid>
    </Box>
  )
}
