import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo-alt.png'

const Landing = () => {
  return (
    <main className="main-landing flex flex-col h-screen justify-center items-center bg-red-400">
      <img className=" h-16" src={logo} alt="" />
      <p className="text-white w-56 text-center m-1">
        Download all your favourite songs for <span className="font-bold">free.</span>
      </p>
      <button className="mt-4 bg-white py-2 px-4 border rounded-full shadow text-gray-800">
        <Link to="/search" className="flex items-center ">
          <p className="mr-3">Get Started </p>
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </Link>
      </button>
    </main>
  )
}

export default Landing
