import React, { useState, useEffect, useRef } from 'react'

export const Sketch: React.FC = () => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#000000')

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
      contextRef.current.lineWidth = brushSize
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

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  useEffect(() => {
    prepareCanvas()
  }, [])

  return (
    <div>
      <button onClick={decreaseBrushSize}>-</button>
      <button onClick={increaseBrushSize}>+</button>
      <button onClick={changeColor}>Change Color</button>
      <button onClick={clearCanvas}>Clear</button>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        style={{ border: '2px solid black' }}
      ></canvas>
    </div>
  )
}
