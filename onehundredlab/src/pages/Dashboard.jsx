import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Dashboard({ dark, setDark, user }) {
  const [plans, setPlans] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchPlans()
  }, [user])

  const fetchPlans = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('diet_plans')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setPlans(data)
    setLoading(false)
  }

  const deletePlan = async (id) => {
    await supabase.from('diet_plans').delete().eq('id', id)
    setPlans(plans.filter(p => p.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const displayName = user?.user_metadata?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0]

  const formatDate = (str) => new Date(str).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className="bg-[#FAF7F2] dark:bg-zinc-950 min-h-screen transition-colors duration-500">
      <Navbar dark={dark} setDark={setDark} user={user} />

      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-amber-700 dark:text-yellow-500 text-xs tracking-[0.4em] uppercase mb-2">Dashboard</p>
          <h1 style={{fontFamily:'Cormorant Garamond,serif'}} className="text-5xl font-black text-zinc-900 dark:text-white">
            Welcome back, {displayName} 👋
          </h1>
          <p className="text-zinc-400 dark:text-zinc-500 mt-2">Here are your saved diet plans.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            ['Total Plans', plans.length],
            ['Latest Goal', plans[0]?.goal || '—'],
            ['Member Since', user ? formatDate(user.created_at) : '—'],
          ].map(([label, val]) => (
            <div key={label} className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-stone-100 dark:border-zinc-800">
              <p className="text-xs tracking-widest uppercase text-zinc-400 dark:text-zinc-500">{label}</p>
              <p style={{fontFamily:'Cormorant Garamond,serif'}} className="text-2xl font-black text-amber-700 dark:text-yellow-400 mt-1">{val}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-700 dark:border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 dark:text-zinc-500 text-lg mb-4">No diet plans yet.</p>
            <button
              onClick={() => navigate('/chat')}
              className="bg-amber-700 dark:bg-yellow-400 text-white dark:text-black px-8 py-3 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-amber-800 transition-all"
            >
              Generate Your First Plan →
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {/* Plans list */}
            <div className="space-y-3">
              <h2 style={{fontFamily:'Cormorant Garamond,serif'}} className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Your Plans</h2>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelected(plan)}
                  className={`bg-white dark:bg-zinc-900 rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md ${
                    selected?.id === plan.id
                      ? 'border-amber-700 dark:border-yellow-400'
                      : 'border-stone-100 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{fontFamily:'Cormorant Garamond,serif'}} className="text-lg font-bold text-zinc-900 dark:text-white">
                        {plan.goal}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{formatDate(plan.created_at)}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deletePlan(plan.id) }}
                      className="text-zinc-300 dark:text-zinc-600 hover:text-red-400 transition-colors text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-2 line-clamp-2">
                    {plan.plan_text.substring(0, 100)}...
                  </p>
                </div>
              ))}

              <button
                onClick={() => navigate('/chat')}
                className="w-full border border-amber-700/40 dark:border-yellow-400/40 text-amber-700 dark:text-yellow-400 py-3 rounded-2xl text-sm font-medium tracking-widest uppercase hover:border-amber-700 transition-all mt-2"
              >
                + Generate New Plan
              </button>
            </div>

            {/* Plan viewer */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-stone-100 dark:border-zinc-800 p-6 h-fit sticky top-28">
              {selected ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p style={{fontFamily:'Cormorant Garamond,serif'}} className="text-xl font-bold text-zinc-900 dark:text-white">{selected.goal}</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">{formatDate(selected.created_at)}</p>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-zinc-700 dark:text-zinc-300 max-h-[60vh] overflow-y-auto" style={{userSelect:'text', cursor:'text'}}>
                    <ReactMarkdown>{selected.plan_text}</ReactMarkdown>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-4xl mb-3">📋</p>
                  <p className="text-zinc-400 dark:text-zinc-500 text-sm">Select a plan on the left to view it</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}