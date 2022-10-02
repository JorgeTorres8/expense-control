import {useState, useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filter expenses</label>
                <select 
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                >
                    <option value="">-- All Categories --</option>
                    <option value="savings">Savings</option>
                    <option value="food">Food</option>
                    <option value="house">House</option>
                    <option value="expenses">Various expenses</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros