import React, { useEffect, useMemo, useState } from 'react';
import { allFoodsList } from './Services';
import { ToastContainer, toast } from 'react-toastify';
import { IFoods, ResultFoods } from './models/IFoods';
import { Button, Card, Dropdown, Flag, Form, Grid, GridColumn, Header, Icon, Input, Label, Modal, Pagination, Select, Table, TableCell, TableRow } from 'semantic-ui-react';

import NavMenu from './components/NavMenu';
import FoodsItem from './components/FoodsItem';





export default function Home() {

  const options = [
    { key: 'n', text: 'Kategori Seç', value: '' },
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);
  const [searchArr, setSearchArr] = useState<ResultFoods[]>([]);

  //foodarr içerisindeki eleman sayısına göre sayfa üretme pagination

  //pages
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {

    toast.loading("Yükleniyor.")
    allFoodsList().then(res => {
      const dt: IFoods = res.data;
      setFoodsArr(dt.result!)
      setSearchArr(dt.result!)
      toast.dismiss();
    }).catch(err => {
      toast.dismiss();
      toast.error("" + err)
    })

  }, []);


  const search = (q: string) => {

    if (q === "") {
      setFoodsArr(searchArr)
    } else {
      q = q.toLowerCase()
      const newArr = searchArr.filter(item => item.name?.toLowerCase().includes(q))
      setFoodsArr(newArr)
    }

  }




  return (
    <>
      <ToastContainer />
      <NavMenu></NavMenu>

      <Grid columns='2' style={{ marginTop: 10 }}>
        <Grid.Row>
          <Grid.Column>
            <Input onChange={(e) => search(e.target.value)} fluid icon='search' placeholder='Arama...' />
          </Grid.Column>

          <Grid.Column>
            <Select fluid placeholder='Kategori Seç' options={options} />
          </Grid.Column>


        </Grid.Row>
      </Grid>

      <Grid>
        {foodsArr.map((item, index) =>
          <FoodsItem key={index} item={item} />
        )}

      </Grid>
      <Grid>
       <Pagination defaultActivePage={5} totalPages={10} />
      </Grid>

    </>
  );
}

