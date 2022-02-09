import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Image, Button, Grid, Label, Icon, Dimmer, Header, Segment } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import FoodDetails from '../FoodDetails';
import { ResultFoods } from '../models/IFoods';


interface itemType {
    item: ResultFoods
}



export default function FoodsItem(props: itemType) {

    const navigate = useNavigate()

    const fncDateConvert = (time: number): string => {
        let dt = new Date();
        if (time === 0) {
            dt = new Date(time);
        }
        return dt.getDate() + "/" + ((dt.getMonth() + 1) > 9 ? (dt.getMonth() + 1) : "0" + (dt.getMonth() + 1)) + "/" + dt.getFullYear();

    }

    const glycemicColor = (index: number): SemanticCOLORS => {
        var color: SemanticCOLORS = 'red'
        if (index > 0 && index <= 55) {
            color = 'green';
        } else if (index > 55 && index <= 70) {
            color = 'orange';
        } else {
            color = 'red';
        }
        return color;
    }

    //go to detail
    const fncGotoDetail = (url: string) => {

        navigate("/detail/" + url)

    }


    return (
        <>
            <Grid.Column mobile={8} tablet={8} computer={4}>
                <Card fluid>
                    <Card.Content>
                        {props.item.image !== "" &&
                            <Image
                                floated='right'
                                size='tiny'
                                src={props.item.image}
                            />
                        }
                        {props.item.image === "" &&
                            <Image
                            floated='right'
                            size='tiny'
                            src='./foods.png'
                        />
                        }
                        <Card.Header>{props.item.name}</Card.Header>
                        <Label size='big' circular style={{ marginTop: 10, }} color={glycemicColor(props.item.glycemicindex!)}>{props.item.glycemicindex!}</Label>
                        <Card.Description>
                            <Card.Meta>{props.item.createdBy === null ? 'user@mail.com' : props.item.createdBy}</Card.Meta>
                            <Card.Meta>{fncDateConvert(props.item.createdDate!)}</Card.Meta>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={() => fncGotoDetail(props.item.url!)}>
                                <Icon name='info' />Detay
                            </Button>
                            <Button basic color='red'>
                                <Icon name='food' />Ekle
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </>
    );
}