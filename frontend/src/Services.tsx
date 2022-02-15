import axios from "axios";
import { url } from "inspector";
import { ResultFoods } from "./models/IFoods";
import { autControl } from "./Util";


const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    auth:{
        username: process.env.REACT_APP_GLOBAL_USERNAME!,
        password: process.env.REACT_APP_GLOBAL_PASSWORD!
    }
})


// All Foods List
export const allFoodsList = () => {
    return axiosConfig.get("foods/list");
}

//user Food List
export const userFoodsList = () => {
    const headers = autControl()
    return axios.get(process.env.REACT_APP_BASE_URL+"/foods/userFoodList",{
        headers: headers
    })
}

//register
export const userRegisterService=(name:string,surname:string,cityid:number,phone:string,email:string,password:string)=>{

    const params={
        "name": name,
        "surname": surname,
        "cityid": cityid,
        "mobile": phone,
        "email": email,
        "password": password,
        "enabled": true,
        "tokenExpired": true,
        "roles": [
            {
                "rid": 2,
                "name": "ROLE_user"
            }
        ]
    }

    return axios.post(process.env.REACT_APP_BASE_URL+"/register/userRegister",params);
}

//add food
export const addFood=(name:string,glyIndex:number,source:string,cid:number,image:string)=>{

    const headers=autControl()

    const params={
        "cid":cid,
        "name": name,
        "glycemicindex": glyIndex,
        "image": image,
        "source": source,
        "enabled": false,
    }

    return axios.post(process.env.REACT_APP_BASE_URL+"/foods/save",params,{
        headers:headers
    })
}

//user and admin login

export const userAndAdminLogin=(email:string,password:string)=>{

    const newAxios=axios.create({
        baseURL:process.env.REACT_APP_BASE_URL,
        auth:{
            username: email!,
            password: password!
        }
    })

    const params={
        email:email
    }

    return newAxios.post("register/login",{},{params:params});
}

//user and admin logout
export const logout=()=>{
    return axiosConfig.get("register/userLogout");
}


export const foodDetail=(url:string)=>{
    const newUrl:string="/foods/detail/"+url;
    return axiosConfig.get(process.env.REACT_APP_BASE_URL+newUrl)
}


// admin wait foods list
export const adminWaitFoodList = () => {
    const headers = autControl()
    return axios.get(process.env.REACT_APP_BASE_URL+"/foods/adminWaitFoodList",{
        headers: headers
    })
}




// admin wait foods push update
export const adminWaitPushFood = (item: ResultFoods) => {
    const headers = autControl()
    const obj = {
        "gid": item.gid,
        "cid": item.cid,
        "name": item.name,
        "glycemicindex": item.glycemicindex,
        "image": item.image,
        "source": item.source,
        "enabled": item.enabled,
        "url": item.url
    }
  return axios.put(process.env.REACT_APP_BASE_URL+"/foods/userFoodUpdate",obj,{
      headers: headers
  })
}


// admin wait foods push update
export const adminhFoodDelete = ( gid: number ) => {
    const headers = autControl()
    const obj = {
        "gid": gid,
    }
  return axios.delete(process.env.REACT_APP_BASE_URL+"/foods/userFoodDelete",{
      headers: headers,
      params: obj
  })
}
