'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'sans-serif'
    }}>
      {/* Logo */}
      <div style={{marginBottom: '8px'}}>
        <span style={{
          fontSize: '13px',
          letterSpacing: '4px',
          color: '#c8a96e',
          textTransform: 'uppercase'
        }}>
          JACKIE JEANS
        </span>
      </div>

      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginBottom: '12px',
        lineHeight: 1.2
      }}>
        Find jeans that<br />actually fit you.
      </h1>

      <p style={{
        color: '#888',
        textAlign: 'center',
        marginBottom: '48px',
        fontSize: '16px'
      }}>
        Answer 10 quick questions.<br />
        Get your perfect fit.
      </p>

      {/* Manual Button */}
      <button
        onClick={() => router.push('/manual')}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '18px',
          background: '#c8a96e',
          color: '#000',
          border: 'none',
          borderRadius: '14px',
          fontSize: '17px',
          fontWeight: '700',
          marginBottom: '14px',
          cursor: 'pointer'
        }}>
        📝 Take the Quiz Yourself
      </button>

      {/* Voice Button */}
      <button
        onClick={() => router.push('/voice')}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '18px',
          background: 'transparent',
          color: 'white',
          border: '2px solid #333',
          borderRadius: '14px',
          fontSize: '17px',
          fontWeight: '700',
          cursor: 'pointer'
        }}>
        🎤 Let AI Guide Me by Voice
      </button>

      <p style={{
        color: '#444',
        fontSize: '13px',
        marginTop: '32px',
        textAlign: 'center'
      }}>
        Takes about 2 minutes
      </p>
    </div>
  )
}