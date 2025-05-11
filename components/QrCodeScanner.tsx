'use client'
import jsQR from 'jsqr'
import React, { useRef, useState, useEffect, FC } from 'react'

type Props = {}
const QrCodeScanner: FC<Props> = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [result, setResult] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if(!result
        ){
            const constraints = {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    aspectRatio: { ideal: 16/9 }
                },
            }

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream
                        videoRef.current.play()
                        scanQrCode()
                    }
                })
                .catch((err) => console.error('Error accessing media devices:', err))

            const currentVideoRef = videoRef.current

        return () => {
            if (currentVideoRef && currentVideoRef.srcObject) {
                const stream = currentVideoRef.srcObject as MediaStream
                const tracks = stream.getTracks()
                tracks.forEach((track) => track.stop())
            }
        }

        }
    }, [result])

    useEffect(() => {
        if (result) {
            setTimeout(() => {
                setResult('')
            }, 3000)
        }
    }, [result]);


    const scanQrCode = () => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (canvas && video) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                const width = window.innerWidth * 0.75
                const height = window.innerHeight * 0.75
                canvas.width = width
                canvas.height = height
                
                ctx.drawImage(video, 0, 0, width, height)
                const imageData = ctx.getImageData(0, 0, width, height)
                const qrCodeData = jsQR(imageData.data, imageData.width, imageData.height)
                if (qrCodeData) {
                    if (qrCodeData.data !== 'http://localhost:3000/result') {
                        setTimeout(scanQrCode, 100)
                        return
                    }
                    setResult(qrCodeData.data)
                    return
                }
                setTimeout(scanQrCode, 100)
            }
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
            {!result && (
                <div className='w-full flex justify-center items-center'>
                    <div className='relative aspect-video w-[75vw] max-w-[75vw] mx-auto'>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover' 
                        />
                        <canvas 
                            ref={canvasRef} 
                            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full' 
                        />
                    </div>
                </div>
            )}
            {result && (
                <div className='flex justify-center'>
                    <p>入場を受け付けました</p>
                </div>
            )}
            {error && <p className='text-center text-xs text-red-500'>{error}</p>}
        </div>
    )
}

export default QrCodeScanner