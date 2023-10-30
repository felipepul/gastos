import PropTypes from 'prop-types';
import Gasto from './Gasto';

const ListadosGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  return (
    <div className="Listado-gastos contenedor">
      {
        filtro ? (
          <>
           <h2> {gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria '} </h2>
         { gastosFiltrados.map( gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
            ))}
          </>
        ) : (
          <>
           <h2> {gastos.length ? 'Gastos' : 'No hay gastos  en esta categoria'} </h2>
          {gastos.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto} />
          ))}
          </>
          )
      }
    </div>
  )
}

ListadosGastos.propTypes = {
  gastos: PropTypes.array.isRequired,
  setGastoEditar: PropTypes.func.isRequired,
  eliminarGasto: PropTypes.func.isRequired,
  filtro: PropTypes.string.isRequired,
  gastosFiltrados: PropTypes.array.isRequired,
};

export default ListadosGastos
