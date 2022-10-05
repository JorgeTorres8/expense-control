import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import "../index.css";
const ControlPresupuesto = ({
  presupuesto,
  setPresupuesto, 
  gastos,
  setGastos,
  setIsValidPresupuesto
}) => {
  
  const [procentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)


    setDisponible(totalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje); 
    }, 1000);
  }, [gastos])


  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
  }

  const handleResetApp = () => {
    Swal.fire({
      title: 'Do you want to reset the budget and expenses?',
      text: "You will not be able to reverse this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(220 38 38)',
      cancelButtonColor: 'rgb(79 70 229)',
      confirmButtonText: 'Yes',
      customClass: 'swal-wide'
    }).then((result) => {
      if (result.isConfirmed) {
          setGastos([]);
          setPresupuesto(0);
          setIsValidPresupuesto(false);
          Swal.fire({
            title: 'You have reset your budget',
            text:'',
            icon:'success',
            customClass: 'swal-wide',}
        )
      }
    })
  } 

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
              styles={buildStyles({
                pathColor: procentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: procentaje > 100 ? '#DC2626' : '#3B82F6'
              })}
              value={procentaje}
              text={`${procentaje}% Spent`}
            />
        </div>

        <div className="contenido-presupuesto">

            <button 
              className='reset-app'
              type='button'
              onClick={handleResetApp}
            >
              Reset App
            </button>  
            
            <p>
                <span>Budget: </span>{formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>  Available: </span>{formatearCantidad(disponible)}
            </p>

            <p>
                <span>Spent: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto