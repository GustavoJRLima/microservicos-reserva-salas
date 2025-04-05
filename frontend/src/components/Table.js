import React from 'react'

const Table = ({ data, salas, usuarios }) => {
  const headers = Object.keys(data[0])

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
  
    date.setHours(date.getHours() - 3)
  
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const ano = date.getFullYear()
    const hora = String(date.getHours()).padStart(2, '0')
    const minuto = String(date.getMinutes()).padStart(2, '0')
  
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`
  }

  return (
    <div className="overflow-x-auto px-8">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            {headers.map((key) => (
              <th key={key} className="py-2 px-4 border-b font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              {headers.map((key) => (
                <td key={key} className="py-2 px-4 border-b">
                  {key === 'dataHora'
                    ? formatDateTime(row[key])
                    : key === 'salaId'
                    ? salas.find((sala) => sala.id === row[key])?.nome || 'Sala não encontrada'
                    : key === 'usuarioId'
                    ? `${usuarios.find((usuario) => usuario.id === row[key])?.nome} (${usuarios.find((usuario) => usuario.id === row[key])?.email})` || 'Usuário não encontrado'
                    : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
