/* eslint-disable no-undef */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { daysBetween } from '../../utils/days';


const CardFuna = (props) => {

    const [data, setData] = React.useState(null);
    const [clicks, setClicks] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [nombre, setNombre] = React.useState('');
    const [motivo, setMotivo] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        axios.post('https://6442db6776540ce22597173e.mockapi.io/funados', { nombre: nombre, motivo: motivo, fecha: new Date().toISOString(), dias: data }).then((response) => { 
            axios.post('https://6442db6776540ce22597173e.mockapi.io/funa', { fecha: new Date().toISOString() }).then((response) => {
                setClicks(clicks + 1);
                props.onHttpRequest(clicks);
            });
        });

    };


    React.useEffect(() => {
        axios.get('https://6442db6776540ce22597173e.mockapi.io/funa').then((response) => {
            const date = new Date(Math.max.apply(null, response.data.map(function (e) {
                return new Date(e.fecha);
            })));
            const days = daysBetween(date, new Date())
            setData(days);
        });
    }, [clicks]);


    return (
        <div>
            <Box sx={{ maxWidth: 275 }}>
                <Card variant="outlined" sx={{ borderRadius: '20px' }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 30, fontWeight: 500 }} variant="h1" gutterBottom>
                            LLEVAMOS
                        </Typography>
                        <Typography variant="h5" component="div">
                            {data}
                        </Typography>
                        <Typography sx={{ mb: 0.5 }} color="text.secondary">
                            {data === 1 ? 'Dia sin funas' : 'Dias sin funas'}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'block' }}>
                        <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen}>Reportar Funa</Button>
                    </CardActions>
                </Card>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Reporte de funa</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Usted esta a punto de reportar funa, favor rellene los siguientes datos:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="nombre"
                            label="Nombre"
                            fullWidth
                            variant="standard"
                            value={nombre}
                            onChange={event => {
                                setNombre(event.target.value)
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="motivo"
                            label="Motivo"
                            fullWidth
                            variant="standard"
                            value={motivo}
                            onChange={event => {
                                setMotivo(event.target.value)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Funar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    )

}


export default CardFuna;