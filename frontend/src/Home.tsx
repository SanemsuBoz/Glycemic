import React, { useEffect, useState } from 'react';
import { allFoodsList } from './Services';
import { ToastContainer, toast } from 'react-toastify';
import { IFoods, ResultFoods } from './models/IFoods';

import NavMenu from './components/NavMenu';

export default function Home() {

  const [foodsArr, setFoodsArr] = useState<ResultFoods[]>([]);

  useEffect(() => {
    
    toast.loading("Yükleniyor.")
    allFoodsList().then( res => {
        const dt:IFoods = res.data;
        setFoodsArr( dt.result! )
        toast.dismiss();
    }).catch( err => {
        toast.dismiss();
        toast.error( ""+err )
    })

  }, []);
  

  return (
  <>
    <ToastContainer />
    <NavMenu></NavMenu>
    <h1>Welcome Home</h1>
    { foodsArr.map((item, index) => 
       <div key={index}> <img src={ item.image } ></img> { item.name } { item.glycemicindex } </div> 
    )}
  </>
  );
}