import React, { useEffect, useState } from 'react';
import { allFoodsList } from './Services';
import { ToastContainer, toast } from 'react-toastify';
import { IFoods, ResultFoods } from './models/IFoods';
import { Button, Flag, Form, Grid, Header, Icon, Input, Label, Modal, Table, TableCell, TableRow } from 'semantic-ui-react';

import NavMenu from './components/NavMenu';

export default function Home() {

  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);

  useEffect(() => {

    toast.loading("Yükleniyor.")
    allFoodsList().then(res => {
      const dt: IFoods = res.data;
      setFoodsArr(dt.result!)
      toast.dismiss();
    }).catch(err => {
      toast.dismiss();
      toast.error("" + err)
    })

  }, []);

  function ColorTable(glyIndex:any) {
    if(glyIndex<=55){
      return <h4 style={{color:'green'}}> glyIndex </h4>
    }else if(glyIndex>55 && glyIndex<=70){
      return <h4 style={{color:'orange'}}> glyIndex </h4>
    }else{
      return <h4 style={{color:'red'}}> glyIndex </h4>
    }
  
  }


  return (
    <>
      <ToastContainer />
      <NavMenu></NavMenu>


      <h2>Glycemic List</h2>
      <Table>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Glycemic Index</Table.HeaderCell>
            <Table.HeaderCell>Source</Table.HeaderCell>
            <Table.HeaderCell>Info</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {foodsArr.map((item, index) =>
            <Table.Row key={index}>
              <Table.Cell>{item.image}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{ColorTable(item.glycemicindex)}</Table.Cell>
              <Table.Cell>{item.source}</Table.Cell>
              <TableCell>
                <TableRow>
                  <Table.Cell>{item.createdBy}</Table.Cell>
                  <Table.Cell>{item.createdDate}</Table.Cell>
                  <Table.Cell>{item.modifiedBy}</Table.Cell>
                  <Table.Cell>{item.modifiedDate}</Table.Cell>
                </TableRow>
              </TableCell>
            </Table.Row>


          )}
        </Table.Body>

      </Table>


    </>
  );
}

//<Table.Cell> <Button onClick={ (e) => deleteModalShow(index) } color='red' size='small' icon> <Icon name='trash alternate outline'/> Delete </Button> </Table.Cell>

/*<h1>Welcome Home</h1>
{ foodsArr.map((item, index) => 
   <div key={index}> <img src={ item.image } ></img> { item.name } { item.glycemicindex } </div> 
)}*/