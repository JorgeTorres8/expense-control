import { useState,useEffect } from 'react';
import Mensaje from './Mensaje'; 
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('');

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState(''); 
    const [id, setId] = useState('');

    useEffect(() => { 
        if(Object.keys(gastoEditar).length > 0) { 
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id); 
            setFecha(gastoEditar.fecha); 
          }
    }, [])
    

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({}); 
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = e => { 
        e.preventDefault();
        
        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('All fields are required');

            setTimeout(() => {
                setMensaje('');
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha});
    }

  return (
    <div className="modal">
        <div className='cerrar-modal'>
            <img 
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={ocultarModal}
            />
        </div>

        <form
            onSubmit={handleSubmit}  
            className={`formulario ${animarModal ? "animar" : 'cerrar'}`}> 
            <legend>{gastoEditar.nombre ? 'Edit Expense' : 'New Expense'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">New Expense</label>

                <input
                    id='nombre'
                    type="text" 
                    placeholder='Add the name of the Expense'
                    value={nombre} 
                    onChange= {e => setNombre(e.target.value)} 
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Amount</label>

                <input
                    id='cantidad'
                    type="number" 
                    placeholder='Add the amount of the expense'
                    value={cantidad} 
                    onChange= {e => setCantidad(Number(e.target.value))} 
                />
            </div>
            
            <div className='campo'>
                <label htmlFor="categoria">Category</label>
                <select 
                    id="categoria"
                    value={categoria} 
                    onChange= {e => setCategoria(e.target.value)} 
                >
                    <option value="">-- Select --</option>
                    <option value="savings">Savings</option>
                    <option value="food">Food</option>
                    <option value="house">House</option>
                    <option value="expenses">Various expenses</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={gastoEditar.nombre ? 'Save Changes' : 'Add Expenses'}
            />

        </form>
    </div>
  )
}

export default Modal