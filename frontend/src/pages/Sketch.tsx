import React, { useState, useEffect, useRef } from 'react'

export const Sketch: React.FC = () => {
  const [isDrawing, setIsDrawing] = useState(false)
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
        context.strokeStyle = 'black'
        context.lineWidth = 5
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

  // const clearCanvas = () => {
  //   const canvas = canvasRef.current
  //   if (canvas) {
  //     const context = canvas.getContext('2d')
  //     if (context) {
  //       context.fillStyle = 'white'
  //       context.fillRect(0, 0, canvas.width, canvas.height)
  //     }
  //   }
  // }

  useEffect(() => {
    prepareCanvas()
  }, [])

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{ border: '2px solid black' }}
    ></canvas>
  )
}
