import React  from "react";
import { searchToken } from "../../api";

export default function SearchToken() {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        if(!query.trim()){
            setQuery([])
            return;
        }

        const delayDounce = setTimeout(async ()=> {
            setLoading(true)
        try{
            const tokens = await searchToken(query)
            setResults(tokens)
        }catch(err){
            console.log("Search error:", err)
        }finally{
            setLoading(false)
        }
            }, 400)

            return ()=> clearTimeout(delayDounce)
    },[query])

    return (
    <div className="absolute w-full top-full left-0 mt-2">
      {loading && (
        <p className="px-3 py-2 text-gray-400 text-sm bg-slate-800 rounded-lg">
          Searching...
        </p>
      )}

      {results.length > 0 && (
        <ul className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 max-h-60 overflow-y-auto">
          {results.map((coin) => (
            <li
              key={coin.id}
              className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer transition"
            >
              <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full" />
              <div>
                <p className="font-semibold text-white">{coin.name}</p>
                <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}