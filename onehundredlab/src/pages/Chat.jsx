import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Chat({ dark, setDark }) {
  const [step, setStep] = useState('form') // 'form' or 'chat'
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState('')
  const [form, setForm] = useState({
    age: '', weight: '', height: '', goal: '', activity: '', diet: '', health: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const generatePlan = async () => {
          setLoading(true)
          setStep('chat')
          const prompt = `You are a professional nutritionist. Generate a detailed, personalized 7-day meal plan for the following person:
      - Age: ${form.age}
      - Weight: ${form.weight}kg
      - Height: ${form.height}cm
      - Goal: ${form.goal}
      - Activity Level: ${form.activity}
      - Dietary Restrictions: ${form.diet || 'None'}
      - Health Conditions: ${form.health || 'None'}

      Format the response clearly with each day labeled, breakfast, lunch, dinner and snacks. Include estimated calories per meal. End with a brief nutrition tip.`

          try {
            const res = await fetch('http://127.0.0.1:54321/functions/v1/generate-plan', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
              },
              body: JSON.stringify({ prompt })
            })

            const data = await res.json()
            console.log('API response:', data)

            if (data.error) {
              setPlan('API Error: ' + data.error)
              setLoading(false)
              return
            }

            setPlan(data.text)

          } catch (err) {
            console.error('Full error:', err)
            setPlan('Error: ' + err.message)
          }

          setLoading(false)
        }

  return (
    <div className="bg-[#FAF7F2] dark:bg-zinc-950 min-h-screen transition-colors duration-500">
      <Navbar dark={dark} setDark={setDark} />

      <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">

        {step === 'form' && (
          <>
            <div className="text-center mb-12">
              <p className="text-amber-700 dark:text-yellow-500 text-xs tracking-[0.4em] uppercase mb-3">AI Powered</p>
              <h1 style={{fontFamily:'Cormorant Garamond,serif'}} className="text-5xl font-black text-zinc-900 dark:text-white">
                Your Personal Diet Plan
              </h1>
              <p className="text-zinc-500 dark:text-white/40 mt-4">Tell us about yourself and we'll generate a full meal plan instantly.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-stone-100 dark:border-zinc-800 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Age</label>
                  <input name="age" value={form.age} onChange={handleChange} placeholder="e.g. 24" className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors" style={{userSelect:'text', cursor:'text'}} />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Weight (kg)</label>
                  <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 75" className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors" style={{userSelect:'text', cursor:'text'}} />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Height (cm)</label>
                  <input name="height" value={form.height} onChange={handleChange} placeholder="e.g. 175" className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors" style={{userSelect:'text', cursor:'text'}} />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Goal</label>
                  <select name="goal" value={form.goal} onChange={handleChange} className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors">
                    <option value="">Select goal</option>
                    <option>Lose weight</option>
                    <option>Gain muscle</option>
                    <option>Maintain weight</option>
                    <option>Improve performance</option>
                    <option>General health</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Activity Level</label>
                <select name="activity" value={form.activity} onChange={handleChange} className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors">
                  <option value="">Select activity level</option>
                  <option>Sedentary (little or no exercise)</option>
                  <option>Lightly active (1-3 days/week)</option>
                  <option>Moderately active (3-5 days/week)</option>
                  <option>Very active (6-7 days/week)</option>
                  <option>Athlete (2x per day)</option>
                </select>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Dietary Restrictions</label>
                <input name="diet" value={form.diet} onChange={handleChange} placeholder="e.g. Vegetarian, No gluten, No dairy..." className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors" style={{userSelect:'text', cursor:'text'}} />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Health Conditions <span className="normal-case text-zinc-300 dark:text-zinc-600">(optional)</span></label>
                <input name="health" value={form.health} onChange={handleChange} placeholder="e.g. Diabetes, High blood pressure..." className="w-full mt-2 bg-[#FAF7F2] dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-amber-700 dark:focus:border-yellow-400 transition-colors" style={{userSelect:'text', cursor:'text'}} />
              </div>

              <button
                onClick={generatePlan}
                disabled={!form.age || !form.weight || !form.height || !form.goal || !form.activity}
                className="w-full bg-amber-700 dark:bg-yellow-400 text-white dark:text-black py-4 rounded-full font-medium text-sm tracking-widest uppercase hover:bg-amber-800 dark:hover:bg-yellow-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                Generate My Diet Plan →
              </button>
            </div>
          </>
        )}

        {step === 'chat' && (
          <>
            <div className="text-center mb-10">
              <h1 style={{fontFamily:'Cormorant Garamond,serif'}} className="text-5xl font-black text-zinc-900 dark:text-white">Your Diet Plan</h1>
              <p className="text-zinc-400 dark:text-zinc-500 mt-2 text-sm">Personalized just for you</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-stone-100 dark:border-zinc-800">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-8 h-8 border-2 border-amber-700 dark:border-yellow-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-zinc-400 dark:text-zinc-500 text-sm tracking-widest uppercase">Crafting your plan...</p>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed" style={{fontFamily:'DM Sans, sans-serif', userSelect:'text', cursor:'text'}}>
                  {plan}
                </pre>
              )}
            </div>

            <button
              onClick={() => { setStep('form'); setPlan('') }}
              className="mt-6 w-full border border-amber-700/40 dark:border-yellow-400/40 text-amber-700 dark:text-yellow-400 py-4 rounded-full font-medium text-sm tracking-widest uppercase hover:border-amber-700 dark:hover:border-yellow-400 transition-all"
            >
              ← Generate Another Plan
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}