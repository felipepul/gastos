import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import {CircularProgressbar, buildStyles}  from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [ disponible,setDisponoble] = useState(0);
    const [ gastado,setGastado] = useState(0);

    useEffect(() => {
    const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad + total, 0 )
    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = (( ( presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    setDisponoble(totalDisponible)
    setGastado(totalGastado)
    setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
    },2000);
    }, [gastos,presupuesto])

    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString ('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }
    const handleResetApp = ()=>{
        const resultado = confirm('¿Desea reiniciar los presupuesto y la app?');

        if (resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
     }
    
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
            styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',backgroundColor: '#f4f7fa',
            })}
            value={porcentaje}
            text= {`${porcentaje}% Gastado`}/>
        </div>
        <div className ="contenido-presupuesto">
            <button className='reset-app'
            type='button'
            onClick={handleResetApp}>
                RESETEAR APP
            </button>
            <p>
                <span>Presupuesto:</span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo': ''}`}>
                <span>Disponible:</span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado:</span>{formatearCantidad(gastado)}
            </p>
        </div>
      
    </div>
  )
}

ControlPresupuesto.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    gastos: PropTypes.array.isRequired,
    setPresupuesto: PropTypes.func.isRequired,
    setGastos:PropTypes.func.isRequired,
    setIsValidPresupuesto: PropTypes.func.isRequired,
  };

export default ControlPresupuesto
