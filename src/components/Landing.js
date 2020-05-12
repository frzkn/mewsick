import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo-alt.png'

const Landing = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-red-400 main-landing">
      <img className="h-16 " src={logo} alt="" />
      <p className="w-56 m-1 text-center text-white">
        Download all your favourite songs for <span className="font-bold">free.</span>
      </p>
      <Link
        to="/search"
        className="flex items-center px-4 py-2 mt-4 text-gray-800 bg-white border rounded-full shadow hover:bg-gray-200"
      >
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
    </main>
  )
}

export default Landing
