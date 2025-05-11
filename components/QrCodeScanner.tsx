'use client'
import jsQR from 'jsqr'
import React, { useRef, useEffect, useState } from 'react'

export default function QrCodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        video.srcObject = stream
        video.play()

        const scanQR = () => {
          if (!isScanning) return

          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.height = video.videoHeight
            canvas.width = video.videoWidth
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            const code = jsQR(imageData.data, imageData.width, imageData.height)

            if (code) {
              if (code.data === 'http://localhost:3000/result') {
                setIsScanning(false)
                // ここで入場処理を行う
                console.log('入場を受け付けました')
              }
            }
          }
          requestAnimationFrame(scanQR)
        }

        scanQR()
      } catch (err) {
        setError('カメラへのアクセスに失敗しました')
        console.error('カメラエラー:', err)
      }
    }

    startCamera()

    return () => {
      const stream = video.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [isScanning])

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!isScanning) {
    return (
      <div className="text-center p-4">
        <p className="text-green-500">入場を受け付けました</p>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <video
        ref={videoRef}
        className="w-full rounded-lg"
        data-testid="video"
      />
      <canvas
        ref={canvasRef}
        className="hidden"
        data-testid="canvas"
      />
    </div>
  )
}