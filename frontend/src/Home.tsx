import React, { useEffect, useState } from 'react';
import { allFoodsList } from './Services';
import { ToastContainer, toast } from 'react-toastify';
import { IFoods, ResultFoods } from './models/IFoods';
import { Button, Card, Dropdown, Flag, Form, Grid, GridColumn, Header, Icon, Input, Label, Modal, Table, TableCell, TableRow } from 'semantic-ui-react';

import NavMenu from './components/NavMenu';
import FoodsItem from './components/FoodsItem';

export default function Home() {

  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

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




  return (
    <>
      <ToastContainer />
      <NavMenu></NavMenu>


      <Input fluid style={{marginTop:10,marginBottom:10}}
        action={
          <Dropdown button basic floating options={options} defaultValue='page' />
        }
        icon='search'
        iconPosition='left'
        placeholder='Search...'
      />

      <Grid>
        {foodsArr.map((item, index) =>
          <FoodsItem key={index} item={item} />
        )}
      </Grid>

    </>
  );
}

