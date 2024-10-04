//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import CardFuna from './components/cardFuna';
import { DataGrid} from '@mui/x-data-grid';

function App() {
  const [data, setData] = useState([]);
  const [clicks, setClicks] = useState(0);
  const handleHttpRequest = (clicks) => {
    setClicks(clicks + 1);
  }
  useEffect(() => {
      async function fetchData() {
        //cambia la api
        const response = await axios.get('https://66ffdf924da5bd2375524f96.mockapi.io/api/funa_v1/Tabla1');
        const modifiedData = response.data.map(item => {
          // Modificar la propiedad de fecha de cada objeto según tus necesidades
          const newDate = new Date(item.fecha);
          newDate.setDate(newDate.getDate());
          return { ...item, fecha: newDate };
        });
        setData(modifiedData);
      }
      fetchData();

  },[clicks])
  const rows = data;
  
  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 120 },
    { field: 'motivo', headerName: 'Motivo', width: 450 },
    { field: 'fecha', headerName: 'Fecha', width: 190 },
    { field: 'dias', headerName: 'Dias sin funa', width: 150 },
  ];
  return (
    <div className="app">
      <div className="center">
      <CardFuna className="center" onHttpRequest={handleHttpRequest}></CardFuna>
      </div >
      
      <div className="table">
      <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default App;
