import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import axios from 'axios'
import Table from '../components/Table'
import NovoUsuarioModal from '../components/Modals/NovoUsuarioModal'

const Usuario = () => {
    const [usuarios, setUsuarios] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const getUsuarios = async () => {
        try {
            const resp = await axios.get('http://localhost:8083/usuarios')
            setUsuarios(resp.data || [])
        } catch (err) {
            console.error('Erro ao buscar usuários:', err)
        }
    }

    useEffect(() => {
        getUsuarios()
    }, [])

    const handleAddButtonClick = () => {
        setShowModal(true)
    }

    if (usuarios === null) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <h1 className='text-3xl font-semibold'>Carregando...</h1>
            </div>
        )
    }

    return (
        <div>
            <div className='flex items-center justify-between py-4 px-8'>
                <h1 className='text-3xl font-semibold'>Usuários</h1>
                <AddButton text='Novo Usuário' handleAddButtonClick={handleAddButtonClick} />
            </div>

            {usuarios.length === 0 ? (
                <div className='flex items-center justify-center h-[70vh]'>
                    <h1 className='text-3xl font-semibold'>Nenhum usuário encontrado</h1>
                </div>
            ) : <Table data={usuarios} />}

            {showModal && <NovoUsuarioModal onClose={() => setShowModal(false)} onSuccess={getUsuarios} />}
        </div>
    )
}

export default Usuario
