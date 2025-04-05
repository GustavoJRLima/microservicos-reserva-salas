import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'

const NovoUsuarioModal = ({ onClose, onSuccess }) => {
    const modalRef = useRef(null)

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        rua: '',
        numero: '',
        cidade: '',
        cep: '',
        cpf: '',
        dataNascimento: '',
        dataCadastro: new Date().toISOString().split('T')[0],
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

    const isValidCpf = (cpf) => /^\d{11}$/.test(cpf)
    const isValidNome = (nome) => nome && nome.trim().length >= 3

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValidNome(form.nome)) {
            alert("O nome deve ter pelo menos 3 caracteres.")
            return
        }

        if (!isValidCpf(form.cpf)) {
            alert("CPF inválido. Use apenas números (11 dígitos).")
            return
        }

        try {
            await axios.post('http://localhost:8083/usuarios/salvar', form)
            onSuccess()
            onClose()
        } catch (err) {
            if (err.response) {
                console.error('Erro ao cadastrar usuário:', err.response.data)
                alert(`Erro ${err.response.status}: ${err.response.data.error || 'Verifique os campos e tente novamente.'}`)
            } else {
                console.error('Erro ao cadastrar usuário:', err)
                alert('Erro ao cadastrar usuário. Tente novamente.')
            }
        }
    }

    const camposVisiveis = Object.keys(form).filter((campo) => campo !== 'dataCadastro')

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Novo Usuário</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {camposVisiveis.map((field) => (
                        <div key={field} className="col-span-2">
                            <label className="block mb-1 capitalize">{field}</label>
                            <input
                                type={
                                    field.includes("data")
                                        ? "date"
                                        : field.includes("senha")
                                        ? "password"
                                        : "text"
                                }
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>
                    ))}
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

export default NovoUsuarioModal
