import React from 'react';
import { Dimmer, Header, Icon, Segment,Image, Label, SemanticCOLORS } from 'semantic-ui-react';
import { ResultFoods } from './models/IFoods';

interface itemType {
    item: ResultFoods
}


export default function FoodDetails(props:itemType) {


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

    return(
        <>
          <Dimmer.Dimmable as={Segment} >
          <Header as='h3'>{props.item.name}</Header>
          <Image.Group size='small' className='ui small images'>
            <Image src={props.item.image} />
          </Image.Group>
          <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
          <Dimmer >
            <Label size='big' circular style={{marginTop:10,}} color={glycemicColor(props.item.glycemicindex!)}>{props.item.glycemicindex!}</Label>
            <Header as='h3'>{props.item.createdBy === null ? 'user@mail.com' : props.item.createdBy}</Header>
            <Header as='h3'>{fncDateConvert(props.item.createdDate!)}</Header>
            <Header as='h3'>{props.item.modifiedBy === null ? '' : props.item.modifiedBy}</Header>
            <Header as='h3'>{fncDateConvert(props.item.modifiedDate!)}</Header>
          </Dimmer>
        </Dimmer.Dimmable>
        
        </>
    );
    
};
