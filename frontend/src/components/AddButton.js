import React from 'react'
import { FaPlus } from "react-icons/fa6";

const AddButton = ({ text, handleAddButtonClick }) => {
  return (
    <button onClick={() => handleAddButtonClick()} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out'>
        <div className='flex items-center justify-center gap-2'>
            <FaPlus />
            <span>{text}</span>
        </div>
    </button>
  )
}

export default AddButton