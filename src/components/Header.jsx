import React, { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import logo from '../assets/images/Vector.png';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import SearchToken from './SearchToken';

export default function Header() {
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    
    return (
        <header className="bg-slate-800 border-b border-slate-700">
            <nav className="flex items-center justify-between px-6 py-4">
               
                <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
                    <img src={logo} alt="Coinkitty Logo" className="w-8 h-8"/>
                    <span className="text-xl font-semibold">Coinkitty</span>
                </Link>

               
                <div className="flex items-center space-x-8">
                    <NavLink 
                        to="/portfolio" 
                        className={({isActive}) => 
                            `text-gray-300 hover:text-white transition-colors ${isActive ? 'text-white font-medium' : ''}`
                        }
                    >
                        Portfolio
                    </NavLink>
                    <NavLink 
                        to="/insights" 
                        className={({isActive}) => 
                            `text-gray-300 hover:text-white transition-colors ${isActive ? 'text-white font-medium' : ''}`
                        }
                    >
                        Insights
                    </NavLink>
                    <NavLink 
                        to="/learn" 
                        className={({isActive}) => 
                            `text-gray-300 hover:text-white transition-colors ${isActive ? 'text-white font-medium' : ''}`
                        }
                    >
                        Learn
                    </NavLink>
                </div>

              
                <div className="flex items-center space-x-4">
                   
                    <div className="relative">
                        <IoMdSearch 
                            size={20} 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input 
                            type="text"
                            placeholder="Search cryptocurrencies..."
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setShowSearch(e.target.value.trim().length >0);
                            }}
                            onFocus={() => setShowSearch(query.trim().length > 0)}
                            onBlur={() => {
                                setTimeout(() => setShowSearch(false), 200);
                            }}
                            className="bg-slate-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-600 transition-all"
                        />
                        
                        {showSearch && (
                            <SearchToken 
                                query={query} 
                                onTokenClick={() => {
                                    setQuery("");
                                    setShowSearch(false);
                                }}
                            />
                        )}
                    </div>

                   
                    <button className="text-gray-300 hover:text-white transition-colors">
                        <IoIosNotificationsOutline size={25} />
                    </button>

                  
                    <Link 
                        to="/login" 
                        className="relative group text-gray-300 hover:text-white transition-colors"
                    >
                        <FaRegUserCircle size={25} />
                        
                      
                        <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-slate-600">
                            Sign In
                          
                            <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-900"></div>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    )
}