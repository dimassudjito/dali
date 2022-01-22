import React, { useState, useEffect, useRef } from 'react'
import { Box, Grid, ButtonGroup, Button } from '@mui/material'
import {
  ColorLens as ColorLensIcon,
  Brush as BrushIcon,
  Backspace as BackspaceIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material'
import { HexColorPicker } from 'react-colorful'

enum BrushType {
  Pen,
  Eraser
}

export const Sketch: React.FC = () => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('black')
  const [brushType, setBrushType] = useState<BrushType>(BrushType.Pen)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.strokeStyle = brushColor
        context.lineWidth = brushSize
        contextRef.current = context
      }
    }
  }

  const startDrawing = ({ nativeEvent }: { nativeEvent: any }) => {
    const { offsetX, offsetY } = nativeEvent
    if (contextRef.current) {
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
      // allow dot creation
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath()
    }
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }: { nativeEvent: any }) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = nativeEvent
    if (contextRef.current) {
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  const decreaseBrushSize = () => {
    const newBrushSize = brushSize - 1
    if (contextRef.current) {
      contextRef.current.lineWidth = newBrushSize
    }
    setBrushSize(newBrushSize)
  }

  const increaseBrushSize = () => {
    const newBrushSize = brushSize + 1
    if (contextRef.current) {
      contextRef.current.lineWidth = newBrushSize
    }
    setBrushSize(newBrushSize)
  }

  const changeColor = () => {
    const newColor = '#872538'
    if (contextRef.current) {
      contextRef.current.strokeStyle = newColor
    }
    setBrushColor(newColor)
  }

  const getBrush = () => {
    setBrushType(BrushType.Pen)
    if (contextRef.current) {
      contextRef.current.strokeStyle = brushColor
    }
  }

  const getEraser = () => {
    setBrushType(BrushType.Eraser)
    if (contextRef.current) {
      contextRef.current.strokeStyle = 'white'
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.fillStyle = 'white'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  useEffect(() => {
    prepareCanvas()
  }, [])

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = brushColor
    }
  }, [brushColor])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={1}>
          <ButtonGroup orientation="vertical">
            <Button
              onClick={() => {
                setShowColorPicker(!showColorPicker)
              }}
            >
              <ColorLensIcon />
            </Button>
            <Button
              onClick={getBrush}
              variant={brushType === BrushType.Pen ? 'contained' : 'outlined'}
            >
              <BrushIcon />
            </Button>
            <Button
              onClick={getEraser}
              variant={
                brushType === BrushType.Eraser ? 'contained' : 'outlined'
              }
            >
              <BackspaceIcon />
            </Button>
            <Button onClick={increaseBrushSize}>
              <AddIcon />
            </Button>
            <Button>{brushSize}</Button>
            <Button onClick={decreaseBrushSize}>
              <RemoveIcon />
            </Button>
            <Button onClick={clearCanvas}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>
          <Box sx={{ my: 2 }} />
          {showColorPicker && (
            <HexColorPicker color={brushColor} onChange={setBrushColor} />
          )}
        </Grid>
        <Grid item xs={12} md={11}>
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            style={{ border: '2px solid black' }}
          ></canvas>
        </Grid>
      </Grid>
    </Box>
  )
}
