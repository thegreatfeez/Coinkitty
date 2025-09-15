import { LockClosedIcon, SparklesIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function Insight() {
  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg text-white">
   
      <div className="flex items-center space-x-3">
        <SparklesIcon className="h-7 w-7 text-indigo-400" />
        <h2 className="text-2xl font-bold">Insight 🚀</h2>
      </div>

     
      <div className="mt-3 flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full w-fit text-sm font-medium">
        <LockClosedIcon className="h-4 w-4" />
        <span>Coming Soon — Subscribers Only</span>
      </div>

    
      <p className="mt-4 text-gray-300 leading-relaxed">
        Your on-chain trading advisor that helps you stay ahead of the market.  
        <br />
        <strong className="text-indigo-300">Insight</strong> scans profitable wallets, copies pro-level strategies, 
        analyzes tokens instantly, and provides professional trading tools — all while keeping your wallet safe.  
      </p>

   
      <ul className="mt-5 space-y-3">
        <li className="flex items-start space-x-2">
          <ChartBarIcon className="h-5 w-5 text-indigo-400 mt-0.5" />
          <span>Track and copy top wallets like a pro trader</span>
        </li>
        <li className="flex items-start space-x-2">
          <ChartBarIcon className="h-5 w-5 text-indigo-400 mt-0.5" />
          <span>Find alpha wallets before they explode 🚀</span>
        </li>
        <li className="flex items-start space-x-2">
          <ChartBarIcon className="h-5 w-5 text-indigo-400 mt-0.5" />
          <span>Paste any contract for instant token analysis</span>
        </li>
        <li className="flex items-start space-x-2">
          <ChartBarIcon className="h-5 w-5 text-indigo-400 mt-0.5" />
          <span>Built-in stop loss & profit taking tools</span>
        </li>
      </ul>

    
      <div className="mt-6 bg-gray-800/60 rounded-lg p-4 text-center border border-gray-700">
        <p className="text-sm text-gray-400">
          💡 Coming soon: Get the edge to spot the <span className="text-indigo-300 font-medium">next x10 token</span> before the crowd.
        </p>
        <button className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition">
          Subscribe to Unlock
        </button>
      </div>
    </div>
  )
}
