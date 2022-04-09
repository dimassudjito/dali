import React, { useState, useEffect, useRef } from 'react'
import { Box, Grid, TextareaAutosize, Button } from '@mui/material'
import { Download as DownloadIcon } from '@mui/icons-material'

export const Notepad: React.FC = () => {
  const [text, setText] = useState('')
  const [textList, setTextList] = useState<String[]>([])

  const svgRef = useRef(new Array())

  useEffect(() => {
    const paragraphs = text.split('\n\n')
    setTextList(paragraphs)
  }, [text])

  let convertSvgToImage = () => {
    /**
     * @todo need to use base64 in the svg to download as svg
     */
    for (let i = 0; i < svgRef.current.length; i++) {
      const svg = svgRef.current[i]
      if (svg) {
        let svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'canvas')
        const svgSize = svg.getBoundingClientRect()
        canvas.width = svgSize.width
        canvas.height = svgSize.height
        const img = document.createElement('img')
        img.setAttribute(
          'src',
          'data:image/svg+xml;base64,' +
            btoa(unescape(encodeURIComponent(svgData)))
        )
        img.onload = function () {
          const context = canvas.getContext('2d')
          if (context) {
            context.drawImage(img, 0, 0)
            const canvasdata = canvas.toDataURL('image/png')
            const a = document.createElement('a')
            a.download = 'notepad' + (i + 1) + '.png'
            a.href = canvasdata
            document.body.appendChild(a)
            a.click()
          }
        }
      }
    }
  }

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
          <Box>
            <Button onClick={convertSvgToImage}>
              <DownloadIcon />
            </Button>
          </Box>
          {textList.map((text, i) => (
            <svg
              id="svg_ref"
              ref={(element) => {
                if (svgRef) {
                  svgRef.current[i] = element
                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="500"
              height="500"
              style={{ backgroundColor: 'white' }}
              key={i}
            >
              {/* <image href="images/blue-bg.jpg" width="500" height="500" /> */}
              <rect x="0" y="0" width="500" height="500" fill="wheat" />
              <foreignObject x="50" y="50" width="400" height="400">
                <p>{text}</p>
              </foreignObject>
            </svg>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
