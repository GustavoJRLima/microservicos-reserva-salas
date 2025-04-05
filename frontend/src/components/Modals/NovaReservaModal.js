import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'

const NovaReservaModal = ({ onClose, onSuccess, salas, usuarios }) => {
    const modalRef = useRef(null)

    const [form, setForm] = useState({
        dataHora: '',
        salaId: '',
        usuarioId: '',
    })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClose])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8084/reservas/salvar', {
                ...form,
                dataHora: new Date(form.dataHora).toISOString(),
            })
            onSuccess()
            onClose()
        } catch (err) {
            if (err.response) {
                console.error('Erro ao cadastrar reserva:', err.response.data)
                alert(`Erro ${err.response.status}: ${err.response.data.error || 'Verifique os campos e tente novamente.'}`)
            } else {
                console.error('Erro ao cadastrar reserva:', err)
                alert('Erro ao cadastrar reserva. Tente novamente.')
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Nova Reserva</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block mb-1">Data e Hora</label>
                        <input
                            type="datetime-local"
                            name="dataHora"
                            value={form.dataHora}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1">Sala</label>
                        <select
                            name="salaId"
                            value={form.salaId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        >
                            <option value="">Selecione uma sala</option>
                            {salas.map((sala) => (
                                <option key={sala.id} value={sala.id}>
                                    {sala.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1">Usuário</label>
                        <select
                            name="usuarioId"
                            value={form.usuarioId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        >
                            <option value="">Selecione um usuário</option>
                            {usuarios.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.nome} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2 flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NovaReservaModal
