import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const NovaSalaModal = ({ onClose, onSuccess }) => {
  const modalRef = useRef();
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8085/salas/salvar', {
        nome,
        capacidade: parseInt(capacidade)
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Erro ao cadastrar sala:', err);
      alert('Erro ao cadastrar sala.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Nova Sala</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da Sala"
            className="border p-2 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Capacidade"
            className="border p-2 rounded"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaSalaModal;
