import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, answers } = body

    const answeredIds = Object.keys(answers || {}).map(Number)
    const nextQ = [1,2,3,4,5,6,7,8,9,10]
      .find(id => !answeredIds.includes(id)) ?? null
    const total = answeredIds.length
    const done = total >= 10

    const questions: Record<number, string> = {
      1: "What is your height? Say something like five foot six.",
      2: "What is your weight in pounds? Say skip if you want.",
      3: "What is your waist in inches? Say a number like 30.",
      4: "What is your hip measurement in inches? Say a number like 36.",
      5: "How do you like jeans at the waist? Say Snug, Slightly Relaxed, or Relaxed.",
      6: "Where should the waistband sit? Say High Rise, Mid Rise, or Low Rise.",
      7: "How should jeans fit through your thighs? Say Fitted, Relaxed, or Loose.",
      8: "Which denim brands have you bought? Name them like Levis, Zara, Gap.",
      9: "What size did you buy in " + (Array.isArray(answers?.[8])
          ? answers[8].join(' and ') : 'those brands') + "?",
      10: "Last one! Biggest frustration buying jeans? Say Waist gap, Hip tightness, Wrong length, Thigh fit, Rise, or Other."
    }

    const lastUser = [...(messages || [])]
      .reverse()
      .find((m: any) => m.role === 'user')
    const userSaid = lastUser?.content || ''

    const systemMessage = done
      ? `Say quiz is complete. Return JSON: {"speech":"Amazing! Your fit profile is complete! Taking you to your recommendations now!","questionId":10,"extractedAnswer":null,"isComplete":true}`
      : `You are Jess, a friendly fit stylist for Jackie Jeans.

CURRENT STATE:
- User just said: "${userSaid}"
- Questions answered so far: ${JSON.stringify(answeredIds)}
- Next question number: ${nextQ}
- Current question: "${questions[nextQ!]}"
- Next question after this: "${nextQ! < 10 ? questions[nextQ! + 1] : 'none, quiz done'}"

YOUR TASK:
1. Extract the answer from what user said for question ${nextQ}
2. Height formats to accept: "5 ft 9", "five nine", "5'9", "five foot nine" — all valid
3. Confirm briefly then ask the NEXT question

RESPOND WITH ONLY THIS JSON, NO EXTRA TEXT:
{
  "speech": "brief confirmation + next question",
  "questionId": ${nextQ},
  "extractedAnswer": "extracted value",
  "isComplete": false
}

EXTRACTION:
- Q1 height: format as 5'9"
- Q2 weight: number or "skipped"
- Q3 waist: number like 30
- Q4 hip: number like 36
- Q5: exactly Snug or Slightly relaxed or Relaxed
- Q6: exactly High rise or Mid rise or Low rise
- Q7: exactly Fitted or Relaxed or Loose
- Q8: array like ["Levis","Zara"]
- Q9: object like {"Levis":"28"}
- Q10: array like ["Waist gap"]
- If unclear: null`

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage
        },
        {
          role: 'user',
          content: `User said: "${userSaid}". Respond with JSON only.`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: 'json_object' }
    })

    let text = completion.choices[0]?.message?.content || ''
    text = text.replace(/```json/g, '').replace(/```/g, '').trim()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON returned')

    const parsed = JSON.parse(jsonMatch[0])
    parsed.isComplete = done

    return NextResponse.json({ content: JSON.stringify(parsed) })

  } catch (err: any) {
    console.error('Error:', err.message)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}