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
                    width: { ideal: 300 },
                    height: { ideal: 300 },
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
            }, 2000)
        }
    }, [result]);


    const scanQrCode = () => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (canvas && video) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
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
        <div>
            {!result && (
                <div className='flex justify-center'>
                    <div className='relative h-[300px] w-[300px]'>
                        <video ref={videoRef} autoPlay playsInline className='absolute left-0 top-0 -z-50 h-[300px] w-[300px]' />
                        <canvas ref={canvasRef} width='300' height='300' className='absolute left-0 top-0' />
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