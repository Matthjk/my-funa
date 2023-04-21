import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { daysBetween } from '../../utils/days';


const CardFuna = () => {

    const [data, setData] = React.useState(null);
    const [clicks, setClicks] = React.useState(0);

    React.useEffect(() => {
      axios.get('https://6442db6776540ce22597173e.mockapi.io/funa').then((response) => {
        const date = new Date(Math.max.apply(null, response.data.map(function(e) {
            return new Date(e.fecha); 
          })));
        const days = daysBetween(date, new Date())
        setData(days);
      });
    }, [clicks]);

    const onClick = () => {
        axios.post('https://6442db6776540ce22597173e.mockapi.io/funa', {fecha: new Date().toISOString()}).then((response) => {
            setClicks(clicks + 1);
        });

    }

    return (
        <div>
        <Box sx={{ maxWidth: 275 }}>
        <Card variant="outlined" sx={{ borderRadius: '20px' }}>
        <CardContent>
                <Typography sx={{ fontSize: 30, fontWeight: 500}} variant="h1" gutterBottom>
                    LLEVAMOS
                </Typography>
                <Typography variant="h5" component="div">
                    {data}
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    {data === 1 ? 'Dia sin funas' : 'Dias sin funas'}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'block'}}>
                <Button variant="contained" color="secondary" size="small" onClick={onClick}>Reset</Button>
            </CardActions>
        </Card>
        </Box>
        </div>
    )

}


export default CardFuna;