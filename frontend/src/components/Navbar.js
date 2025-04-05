import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <ul className='bg-gray-100 grid grid-cols-4 border-b-2 border-gray-300'>
            <Link to="/" className='p-4 text-center hover:bg-gray-300 border-x border-gray-300 transition-colors duration-150 ease-in-out'>Home</Link>
            <Link to="/reserva" className='p-4 text-center hover:bg-gray-300 border-x border-gray-300 transition-colors duration-150 ease-in-out'>Reservas</Link>
            <Link to="/sala" className='p-4 text-center hover:bg-gray-300 border-x border-gray-300 transition-colors duration-150 ease-in-out'>Salas</Link>
            <Link to="/usuario" className='p-4 text-center hover:bg-gray-300 border-x border-gray-300 transition-colors duration-150 ease-in-out'>Usuarios</Link>
        </ul>
    </nav>
  )
}

export default Navbar