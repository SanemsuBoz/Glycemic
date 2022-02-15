import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Dimmer, Grid, Header, Icon, Image, Item, Label, Segment, SemanticCOLORS } from 'semantic-ui-react'
import { ISinglFoods, ResultFoods } from './models/IFoods'
import { foodDetail } from './Services'


export default function FoodDetails() {

    const [food, setFood] = useState<ResultFoods>()

    const { url } = useParams()
    useEffect(() => {
        foodDetail(url!).then(res => {
            const dt: ISinglFoods = res.data;
            setFood(dt.result!)
        }).catch(err => {
            toast.dismiss();
            toast.error("" + err)
        })
    }, [])

    const fncDateConvert = (time: number): string => {
        let dt = new Date();
        if (time === 0) {
            dt = new Date(time);
        }
        return ((dt.getDate() + 1) > 9 ? (dt.getDate() + 1) : "0" + (dt.getDate() + 1)) + "/" + ((dt.getMonth() + 1) > 9 ? (dt.getMonth() + 1) : "0" + (dt.getMonth() + 1)) + "/" + dt.getFullYear();

    }

    const glycemicColor = (index: number): SemanticCOLORS => {
        var color: SemanticCOLORS = 'red'
        if (index >= 0 && index <= 55) {
            color = 'green';
        } else if (index > 55 && index <= 70) {
            color = 'orange';
        } else {
            color = 'red';
        }
        return color;
    }


    return (
        <>

            <Dimmer.Dimmable as={Segment} style={{ marginBottom: 20, backgroundColor: '#EEEEEE' }}>
                <h1 style={{ textAlign: 'center' }}>Ürün Detay Sayfası</h1>
            </Dimmer.Dimmable>

            <Dimmer.Dimmable as={Segment} >

                <Grid columns='2'>
                    <Grid.Row>
                        <Grid.Column width='4'>
                            <Button style={{ marginTop: 90, marginLeft: 30 }} size='massive' color={glycemicColor(food?.glycemicindex!)} >{food?.glycemicindex!}</Button>

                        </Grid.Column>
                        <Grid.Column width='10'>
                            <Header as='h2' color='blue'>{food?.name}</Header>
                            <Header as='h3'>Ekleyen: {food?.createdBy === null ? 'user@mail.com' : food?.createdBy}</Header>
                            <Header as='h3'>Ekleme Tarihi: {fncDateConvert(food?.createdDate!)}</Header>
                            <Header as='h3'>Düzenleyen: {food?.modifiedBy === null ? '-' : food?.modifiedBy}</Header>
                            <Header as='h3'>Düzenleme Tarihi: {fncDateConvert(food?.modifiedDate!)}</Header>
                            <Header as='h3'>Kaynak: {food?.source!}</Header>
                        </Grid.Column>
                        <Grid.Column width='2'>
                            <Image.Group style={{ marginTop: 70 }} size='small' className='ui small images'>
                                <Image src={food?.image} />
                            </Image.Group>
                        </Grid.Column>

                    </Grid.Row>

                </Grid>



            </Dimmer.Dimmable>

        </>
    )
}

//<Label size='massive' circular style={{ margin: 40, }} color={glycemicColor(food?.glycemicindex!)}>{food?.glycemicindex!}</Label>


/*

 <Grid>
        <Dimmer.Dimmable as={Segment} >
                <Header as='h3'>{food?.name}</Header>
                <Image.Group size='small' className='ui small images'>
                    <Image src={food?.image} />
                </Image.Group>
                
                <Dimmer >
                    <Label size='big' circular style={{ marginTop: 10, }} color={glycemicColor(food?.glycemicindex!)}>{food?.glycemicindex!}</Label>
                    <Header as='h3'>{food?.createdBy === null ? 'user@mail.com' : food?.createdBy}</Header>
                    <Header as='h3'>{fncDateConvert(food?.createdDate!)}</Header>
                    <Header as='h3'>{fncDateConvert(food?.createdDate!)}</Header>
                    <Header as='h3'>{fncDateConvert(food?.modifiedDate!)}</Header>
                </Dimmer>
            </Dimmer.Dimmable>
        </Grid>




*/


/*
<Header as='h2'>{food?.name}</Header>
                    <Image.Group size='small' className='ui small images'>
                        <Image src={food?.image} />
                    </Image.Group>
                    <Label size='big' circular style={{ marginTop: 10, }} color={glycemicColor(food?.glycemicindex!)}>{food?.glycemicindex!}</Label>
                    <Header as='h3'>Ekleyen: {food?.createdBy === null ? 'user@mail.com' : food?.createdBy}</Header>
                    <Header as='h3'>Ekleme Tarihi: {fncDateConvert(food?.createdDate!)}</Header>
                    <Header as='h3'>Düzenleyen: {food?.modifiedBy === null ? '-' : food?.modifiedBy}</Header>
                    <Header as='h3'>Düzenleme Tarihi: {fncDateConvert(food?.modifiedDate!)}</Header>

*/


