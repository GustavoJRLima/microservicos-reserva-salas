import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import axios from 'axios'
import Table from '../components/Table'
import NovaSalaModal from '../components/Modals/NovaSalaModal'

const Sala = () => {
    const [salas, setSalas] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const getSalas = async () => {
        try {
            const resp = await axios.get('http://localhost:8085/salas')
            setSalas(resp.data || [])
        } catch (err) {
            console.error('Erro ao buscar salas:', err)
        }
    }

    useEffect(() => {
        getSalas()
    }, [])

    const handleAddButtonClick = () => {
        setShowModal(true)
    }

    if (salas === null) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <h1 className='text-3xl font-semibold'>Carregando...</h1>
            </div>
        )
    }

    return (
        <div>
            <div className='flex items-center justify-between py-4 px-8'>
                <h1 className='text-3xl font-semibold'>Salas</h1>
                <AddButton text='Nova Sala' handleAddButtonClick={handleAddButtonClick} />
            </div>

            {salas.length === 0 ? (
                <div className='flex items-center justify-center h-[70vh]'>
                    <h1 className='text-3xl font-semibold'>Nenhuma sala encontrada</h1>
                </div>
            ) : <Table data={salas} />}

            {showModal && <NovaSalaModal onClose={() => setShowModal(false)} onSuccess={getSalas} />}
        </div>
    )
}

export default Sala