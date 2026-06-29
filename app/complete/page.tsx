'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Complete() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(interval)
          window.location.href = 'https://jackie-jeans.vercel.app/'
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'sans-serif',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{fontSize: '64px', marginBottom: '24px'}}>✨</div>
      
      <span style={{
        color: '#c8a96e',
        fontSize: '12px',
        letterSpacing: '3px',
        marginBottom: '16px',
        display: 'block'
      }}>
        JACKIE JEANS
      </span>

      <h1 style={{
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '12px'
      }}>
        Your fit profile is ready!
      </h1>

      <p style={{color: '#666', marginBottom: '32px'}}>
        Redirecting to Jackie Jeans in {seconds} seconds...
      </p>

      <button
        onClick={() => window.location.href = 'https://jackie-jeans.vercel.app/'}
        style={{
          padding: '16px 32px',
          background: '#c8a96e',
          border: 'none',
          borderRadius: '12px',
          color: '#000',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer'
        }}>
        Go Now →
      </button>
    </div>
  )
}