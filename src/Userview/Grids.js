import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Grid } from '@mui/material';
import _ from 'lodash';
import { styled } from '@mui/material/styles';

export default function Grids(props) {

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '50%',
        maxHeight: '70%',
      });

    const [values, setValues] = React.useState([])

    React.useEffect(() => {
        console.log(props.product, "props")
        setValues(props.product)
    }, [props])


    return (
        <div>
            <Grid container spacing={2}>
                {_.map(values, o => {
                    return <Grid item xs={4}>
                        <Card >
                            { o.photos ? <CardContent>
                                 <Img src={`data:image/jpeg;base64,${o.photos}`} style={{width:'20rem',height:'10rem'}}></Img>
                            </CardContent> : " " }
                            {o.productName ? <CardContent>
                                productName: {o.productName}
                            </CardContent> : " " }
                            {o.productPrice ?<CardContent>
                                price:{o.productPrice}
                            </CardContent>:""}
                            {o.amount ? <CardContent>
                                Amount: {o.amount}
                            </CardContent>: " "}
                            
                          {o.date ?  <CardContent>
                                Date: {o.date}
                            </CardContent>:""}
                            {o.orderId ? <button onClick={()=>props.delete(o.orderId)} >delete</button>:""}
                            <button onClick={()=>props.placeOrder()}>BUY</button>
                         
                        </Card>
                    </Grid>
                })}
            </Grid>
        </div>
    );
}