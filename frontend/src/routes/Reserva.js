import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import axios from 'axios'
import Table from '../components/Table'
import NovaReservaModal from '../components/Modals/NovaReservaModal'

const Reserva = () => {
    const [reservas, setReservas] = useState(null)
    const [salas, setSalas] = useState(null);
    const [usuarios, setUsuarios] = useState(null);
    const [showModal, setShowModal] = useState(false)

    const getReservas = async () => {
        try {
            const resp = await axios.get('http://localhost:8084/reservas')
            setReservas(resp.data || [])
        } catch (err) {
            console.error('Erro ao buscar reservas:', err)
        }
    }

    const getSalas = async () => {
        try {
            const resp = await axios.get('http://localhost:8085/salas')
            setSalas(resp.data || [])
        } catch (err) {
            console.error('Erro ao buscar salas:', err)
        }
    }

    const getUsuarios = async () => {
        try {
            const resp = await axios.get('http://localhost:8083/usuarios')
            setUsuarios(resp.data || [])
        } catch (err) {
            console.error('Erro ao buscar usuários:', err)
        }
    }

    useEffect(() => {
        getReservas()
        getSalas()
        getUsuarios()
    }, [])

    const handleAddButtonClick = () => {
        setShowModal(true)
    }

    if (!reservas || !salas || !usuarios) {
        return (
          <div className='flex items-center justify-center h-screen'>
              <h1 className='text-3xl font-semibold'>Carregando...</h1>
          </div>
        )
    }

    return (
        <div>
            <div className='flex items-center justify-between py-4 px-8'>
                <h1 className='text-3xl font-semibold'>Reservas</h1>
                <AddButton text='Nova Reserva' handleAddButtonClick={handleAddButtonClick} />
            </div>

            {reservas.length === 0 ? (
                <div className='flex items-center justify-center h-[70vh]'>
                    <h1 className='text-3xl font-semibold'>Nenhuma reserva encontrada</h1>
                </div>
            ) : <Table data={reservas} salas={salas} usuarios={usuarios} />}

            {showModal && <NovaReservaModal onClose={() => setShowModal(false)} onSuccess={getReservas} salas={salas} usuarios={usuarios} />}
        </div>
    )
}

export default Reserva
