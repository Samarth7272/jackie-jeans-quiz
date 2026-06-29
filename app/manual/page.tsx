'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { questions, brandSizes } from '../../lib/questions'

export default function ManualQuiz() {
  const router = useRouter()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number,any>>({})
  const [error, setError] = useState('')

  const q = questions[currentQ]
  const progress = Math.round(((currentQ) / questions.length) * 100)

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({...prev, [q.id]: value}))
    setError('')
  }

  const handleMultiToggle = (option: string) => {
    const current = answers[q.id] || []
    const updated = current.includes(option)
      ? current.filter((x:string) => x !== option)
      : [...current, option]
    handleAnswer(updated)
  }

  const handleBrandSize = (brand: string, size: string) => {
    const current = answers[9] || {}
    handleAnswer({...current, [brand]: size})
  }

  const handleNext = () => {
    // Validate
    if (!q.optional && !answers[q.id]) {
      setError('Please answer this question to continue')
      return
    }
    if (q.type === 'multi-select' && 
        !q.optional && 
        (!answers[q.id] || answers[q.id].length === 0)) {
      setError('Please select at least one option')
      return
    }
    
    if (currentQ === questions.length - 1) {
      // Save answers to localStorage
      localStorage.setItem('fitAnswers', JSON.stringify(answers))
      router.push('/complete')
    } else {
      setCurrentQ(prev => prev + 1)
      setError('')
    }
  }

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1)
      setError('')
    }
  }

  const handleSkip = () => {
    setCurrentQ(prev => prev + 1)
    setError('')
  }

  const selectedBrands = answers[8] || []

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      fontFamily: 'sans-serif',
      color: 'white',
      padding: '0'
    }}>
      {/* Top Bar */}
      <div style={{
        padding: '20px 24px 0',
        position: 'sticky',
        top: 0,
        background: '#0a0a0a',
        zIndex: 10
      }}>
        {/* Back + Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          {currentQ > 0 && (
            <button
              onClick={handleBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '24px',
                cursor: 'pointer',
                marginRight: '12px',
                padding: '0'
              }}>
              ←
            </button>
          )}
          <span style={{
            color: '#c8a96e',
            fontSize: '12px',
            letterSpacing: '3px'
          }}>
            JACKIE JEANS
          </span>
        </div>

        {/* Progress */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '4px'
        }}>
          <div style={{
            flex: 1,
            height: '3px',
            background: '#222',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: '#c8a96e',
              borderRadius: '2px',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <span style={{
            color: '#555',
            fontSize: '12px',
            whiteSpace: 'nowrap'
          }}>
            {currentQ + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Question Area */}
      <div style={{padding: '32px 24px 120px'}}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '8px',
          lineHeight: 1.3
        }}>
          {q.question}
        </h2>

        {q.optional && (
          <p style={{
            color: '#666',
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            This is optional — feel free to skip
          </p>
        )}

        <div style={{marginTop: '28px'}}>

          {/* DROPDOWN */}
          {q.type === 'dropdown' && (
            <select
              value={answers[q.id] || ''}
              onChange={e => handleAnswer(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#1a1a1a',
                border: `2px solid ${answers[q.id] ? '#c8a96e' : '#333'}`,
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                appearance: 'none',
                cursor: 'pointer'
              }}>
              <option value="" disabled>Select an option...</option>
              {q.options?.map(opt => (
                <option key={opt} value={opt} style={{background: '#1a1a1a'}}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {/* NUMBER INPUT */}
          {q.type === 'number' && (
            <input
              type="number"
              placeholder={q.placeholder}
              value={answers[q.id] || ''}
              onChange={e => handleAnswer(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                background: '#1a1a1a',
                border: `2px solid ${answers[q.id] ? '#c8a96e' : '#333'}`,
                borderRadius: '12px',
                color: 'white',
                fontSize: '18px',
                boxSizing: 'border-box'
              }}
            />
          )}

          {/* SINGLE SELECT */}
          {q.type === 'single-select' && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {q.options?.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  style={{
                    padding: '16px',
                    background: answers[q.id] === opt ? '#1e1508' : '#1a1a1a',
                    border: `2px solid ${answers[q.id] === opt ? '#c8a96e' : '#2a2a2a'}`,
                    borderRadius: '12px',
                    color: answers[q.id] === opt ? '#c8a96e' : 'white',
                    fontSize: '16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  {opt}
                  {answers[q.id] === opt && <span>✓</span>}
                </button>
              ))}
            </div>
          )}

          {/* MULTI SELECT */}
          {q.type === 'multi-select' && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {q.options?.map(opt => {
                const selected = (answers[q.id] || []).includes(opt)
                return (
                  <button
                    key={opt}
                    onClick={() => handleMultiToggle(opt)}
                    style={{
                      padding: '12px 16px',
                      background: selected ? '#1e1508' : '#1a1a1a',
                      border: `2px solid ${selected ? '#c8a96e' : '#2a2a2a'}`,
                      borderRadius: '10px',
                      color: selected ? '#c8a96e' : '#aaa',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                    {selected ? '✓ ' : ''}{opt}
                  </button>
                )
              })}
            </div>
          )}

          {/* BRAND SIZES (Q9) */}
          {q.type === 'brand-sizes' && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {selectedBrands.length === 0 ? (
                <p style={{color: '#666'}}>
                  No brands selected in previous step
                </p>
              ) : (
                selectedBrands.map((brand: string) => (
                  <div key={brand}>
                    <p style={{
                      color: '#888',
                      fontSize: '13px',
                      marginBottom: '6px'
                    }}>
                      {brand}
                    </p>
                    <select
                      value={(answers[9] || {})[brand] || ''}
                      onChange={e => handleBrandSize(brand, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#1a1a1a',
                        border: `2px solid ${(answers[9]||{})[brand] ? '#c8a96e' : '#333'}`,
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '15px'
                      }}>
                      <option value="" disabled>Select size...</option>
                      {brandSizes.map(s => (
                        <option key={s} value={s} style={{background:'#1a1a1a'}}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Error */}
        {error && (
          <p style={{
            color: '#e05555',
            fontSize: '14px',
            marginTop: '12px'
          }}>
            {error}
          </p>
        )}
      </div>

      {/* Bottom Buttons - Fixed */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px 32px',
        background: 'linear-gradient(transparent, #0a0a0a 30%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {q.optional && (
          <button
            onClick={handleSkip}
            style={{
              width: '100%',
              padding: '15px',
              background: 'transparent',
              border: '1px solid #333',
              borderRadius: '12px',
              color: '#666',
              fontSize: '15px',
              cursor: 'pointer'
            }}>
            Skip this question
          </button>
        )}
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            padding: '17px',
            background: '#c8a96e',
            border: 'none',
            borderRadius: '12px',
            color: '#000',
            fontSize: '17px',
            fontWeight: '700',
            cursor: 'pointer'
          }}>
          {currentQ === questions.length - 1 ? 'Complete Quiz →' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}