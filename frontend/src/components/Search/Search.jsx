import React from 'react'
import { BsSearch } from 'react-icons/bs'
import "./Search.css"
export default function Search({busca,setBusca}) {
  return (
    <div className="busca">
    {/* filtro */}
    <input
name="input"
      type="texts"
  autoComplete='input'
     value={busca}
     onChange={(e) => setBusca(e.target.value)}
     className="form-control  text-secondary"
      placeholder="Pesquise aqui"
style={{marginTop:"0px"}}
    />

    <div className="lupa">
      <BsSearch size={18} />
    </div>

    </div>
  )
}
