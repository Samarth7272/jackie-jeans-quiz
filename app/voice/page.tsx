'use client'
import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function VoiceQuiz() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [aiText, setAiText] = useState('')
  const [userText, setUserText] = useState('')
  const [error, setError] = useState('')
  const [questionCount, setQuestionCount] = useState(0)

  // Use refs for answers and messages so they're always current
  const answersRef = useRef<Record<number,any>>({})
  const messagesRef = useRef<any[]>([])

  const speakText = (text: string, onDone: () => void) => {
    window.speechSynthesis.cancel()
    setAiText(text)
    setIsSpeaking(true)
    setIsListening(false)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.lang = 'en-US'

    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Karen') ||
      v.name.includes('Zira') ||
      v.lang === 'en-US'
    )
    if (preferred) utterance.voice = preferred

    utterance.onend = () => {
      setIsSpeaking(false)
      setTimeout(onDone, 500)
    }

    // Fallback timer
    const fallback = setTimeout(() => {
      setIsSpeaking(false)
      onDone()
    }, text.length * 80 + 3000)

    utterance.onend = () => {
      clearTimeout(fallback)
      setIsSpeaking(false)
      setTimeout(onDone, 500)
    }

    window.speechSynthesis.speak(utterance)
  }

  const startListening = () => {
    setError('')
    const SR = (window as any).SpeechRecognition ||
                (window as any).webkitSpeechRecognition
    if (!SR) {
      setError('Use Chrome browser!')
      return
    }

    const recognition = new SR()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
      setUserText('')
    }

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript
      setUserText(text)
      setIsListening(false)
      sendToAI(text)
    }

    recognition.onerror = () => {
      setIsListening(false)
      setError('Could not hear. Tap mic to try again.')
    }

    recognition.onend = () => setIsListening(false)
    recognition.start()
  }

  const sendToAI = async (userMessage: string) => {
    setIsThinking(true)
    setError('')

    // Add user message to history
    const newMessages = [
      ...messagesRef.current,
      { role: 'user', content: userMessage }
    ]
    messagesRef.current = newMessages

    console.log('Sending - answers:', answersRef.current)
    console.log('User said:', userMessage)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          answers: answersRef.current
        })
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'API failed')
      }

      const data = await res.json()
      const parsed = JSON.parse(data.content)

      console.log('AI response:', parsed)

      setIsThinking(false)

      // Save answer IMMEDIATELY using ref
      if (parsed.extractedAnswer !== null &&
          parsed.extractedAnswer !== undefined &&
          parsed.questionId) {
        answersRef.current = {
          ...answersRef.current,
          [parsed.questionId]: parsed.extractedAnswer
        }
        setQuestionCount(Object.keys(answersRef.current).length)
        console.log('Updated answers:', answersRef.current)
      }

      // Add AI message to history
      messagesRef.current = [
        ...messagesRef.current,
        { role: 'assistant', content: parsed.speech }
      ]

      if (parsed.isComplete) {
        speakText(parsed.speech, () => {
          setTimeout(() => {
            window.location.href = 'https://jackie-jeans.vercel.app/'
          }, 1500)
        })
      } else {
        // Speak then auto listen
        speakText(parsed.speech, () => {
          startListening()
        })
      }

    } catch (err: any) {
      setIsThinking(false)
      console.error('Error:', err.message)
      setError('Error: ' + err.message + '. Tap mic to retry.')
    }
  }

  const startConversation = () => {
    setStarted(true)
    answersRef.current = {}
    messagesRef.current = []
    setQuestionCount(0)

    const greeting = "Hi! I'm Jess, your fit stylist at Jackie Jeans. Let's find your perfect jeans! What is your height? Say something like five foot six."
    setAiText(greeting)
    messagesRef.current = [{ role: 'assistant', content: greeting }]

    speakText(greeting, () => {
      startListening()
    })
  }

  const orbColor = isSpeaking
    ? 'radial-gradient(circle, #c8a96e, #8b6914)'
    : isListening
    ? 'radial-gradient(circle, #4a9eff, #1a5fa0)'
    : isThinking
    ? 'radial-gradient(circle, #a855f7, #6b21a8)'
    : 'radial-gradient(circle, #1a1a1a, #000)'

  const orbEmoji = isListening ? '👂'
    : isSpeaking ? '🗣️'
    : isThinking ? '💭'
    : '🎤'

  const statusText = isListening ? '🎤 Listening... speak now!'
    : isSpeaking ? 'Jess is speaking...'
    : isThinking ? 'Thinking...'
    : started ? 'Tap mic to speak'
    : 'Tap to begin'

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'sans-serif',
      color: 'white'
    }}>
      <span style={{
        color: '#c8a96e',
        fontSize: '12px',
        letterSpacing: '4px',
        marginBottom: '40px'
      }}>
        JACKIE JEANS
      </span>

      {/* Orb */}
      <div style={{
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        background: orbColor,
        boxShadow: isListening ? '0 0 60px rgba(74,158,255,0.7)'
          : isSpeaking ? '0 0 60px rgba(200,169,110,0.7)'
          : '0 0 20px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '56px',
        transition: 'all 0.3s ease',
        transform: (isSpeaking || isListening) ? 'scale(1.1)' : 'scale(1)',
        marginBottom: '24px',
        cursor: 'pointer'
      }}
        onClick={() => {
          if (!isSpeaking && !isThinking && started) startListening()
        }}>
        {orbEmoji}
      </div>

      {/* Status */}
      <p style={{
        color: isListening ? '#4a9eff'
          : isSpeaking ? '#c8a96e'
          : isThinking ? '#a855f7' : '#555',
        fontSize: '16px',
        fontWeight: isListening ? '700' : '400',
        marginBottom: '20px'
      }}>
        {statusText}
      </p>

      {/* Progress */}
      {started && (
        <div style={{width:'100%', maxWidth:'320px', marginBottom:'20px'}}>
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            marginBottom:'6px'
          }}>
            <span style={{color:'#444',fontSize:'12px'}}>Progress</span>
            <span style={{color:'#c8a96e',fontSize:'12px'}}>
              {questionCount}/10
            </span>
          </div>
          <div style={{
            height:'3px', background:'#1a1a1a',
            borderRadius:'2px', overflow:'hidden'
          }}>
            <div style={{
              width:`${(questionCount/10)*100}%`,
              height:'100%', background:'#c8a96e',
              borderRadius:'2px', transition:'width 0.5s ease'
            }}/>
          </div>
        </div>
      )}

      {/* Jess bubble */}
      {aiText && (
        <div style={{
          background:'#111', border:'1px solid #222',
          borderRadius:'14px', padding:'16px 20px',
          maxWidth:'320px', width:'100%',
          textAlign:'center', marginBottom:'12px'
        }}>
          <p style={{
            color:'#c8a96e', fontSize:'11px',
            letterSpacing:'2px', marginBottom:'6px'
          }}>JESS</p>
          <p style={{color:'#eee', fontSize:'16px', lineHeight:1.5}}>
            {aiText}
          </p>
        </div>
      )}

      {/* User text */}
      {userText && (
        <p style={{
          color:'#444', fontSize:'14px',
          marginBottom:'12px', fontStyle:'italic'
        }}>
          You said: "{userText}"
        </p>
      )}

      {/* Error */}
      {error && (
        <p style={{
          color:'#e05555', fontSize:'13px',
          textAlign:'center', marginBottom:'12px',
          maxWidth:'300px'
        }}>
          {error}
        </p>
      )}

      {/* Start button */}
      {!started && (
        <button
          onClick={startConversation}
          style={{
            marginTop:'16px', padding:'18px 56px',
            background:'#c8a96e', border:'none',
            borderRadius:'50px', color:'#000',
            fontSize:'17px', fontWeight:'700', cursor:'pointer'
          }}>
          Start Voice Quiz
        </button>
      )}

      {/* Fallback mic button */}
      {started && !isSpeaking && !isThinking && !isListening && (
        <button
          onClick={startListening}
          style={{
            marginTop:'8px', padding:'14px 36px',
            background:'#1a1a1a', border:'2px solid #333',
            borderRadius:'50px', color:'#888',
            fontSize:'15px', cursor:'pointer'
          }}>
          🎤 Tap to speak
        </button>
      )}

      <button
        onClick={() => router.push('/')}
        style={{
          marginTop:'32px', background:'none',
          border:'none', color:'#222',
          fontSize:'13px', cursor:'pointer'
        }}>
        ← Switch to manual quiz
      </button>
    </div>
  )
}