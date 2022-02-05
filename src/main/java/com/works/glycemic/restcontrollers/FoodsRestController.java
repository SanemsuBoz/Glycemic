package com.works.glycemic.restcontrollers;

import com.works.glycemic.models.Foods;
import com.works.glycemic.services.FoodService;
import com.works.glycemic.utils.REnum;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/foods")
public class FoodsRestController {

    final FoodService foodService;

    public FoodsRestController(FoodService foodService) {
        this.foodService = foodService;
    }


    //food save
    @PostMapping("/save")
    public Map<REnum,Object> save(@RequestBody Foods foods){
        Map<REnum,Object> hm=new LinkedHashMap<>();

        Foods f=foodService.foodSave(foods);
        if(f==null){
            hm.put(REnum.status,false);
            hm.put(REnum.message,"Bu ürün daha önce kayıt edilmiş!");
            hm.put(REnum.result,f);
        }else{
            hm.put(REnum.status,true);
            hm.put(REnum.message,"Kayıt işlemi başarılı!");
            hm.put(REnum.result,f);
        }

        return hm;
    }

    //foods list
    @GetMapping("/list")
    public Map<REnum,Object> list(){
        Map<REnum,Object> hm=new LinkedHashMap<>();

        hm.put(REnum.status,true);
        hm.put(REnum.message,"Ürün Listesi");
        hm.put(REnum.result,foodService.foodList());

        return hm;
    }


    //user foods list
    @GetMapping("/userFoodList")
    public Map<REnum,Object> userFoodList(){
        Map<REnum,Object> hm=new LinkedHashMap<>();

        hm.put(REnum.status,true);
        hm.put(REnum.message,"Ürün Listesi");
        hm.put(REnum.result,foodService.userFoodList());

        return hm;
    }

    @DeleteMapping("/userFoodDelete/{gid}")
    public Map<REnum,Object> userFoodDelete(@PathVariable Long gid){
        Map<REnum,Object> hm=new LinkedHashMap<>();
        String result=foodService.userFoodDelete(gid);
        if (result==""){
            hm.put(REnum.status,true);
            hm.put(REnum.message,"Bu İşlem İçin Yetkiniz Bulunmamaktadır!");
            hm.put(REnum.result,foodService.foodList());
        }else if (result=="Silmek İstediğiniz Ürün Bulunamadı!"){
            hm.put(REnum.status,true);
            hm.put(REnum.message,result);
            hm.put(REnum.result,foodService.userFoodList());
        }else {
            hm.put(REnum.status,true);
            hm.put(REnum.message,"Ürün Silindi");
            hm.put(REnum.result,foodService.userFoodList());
        }

        return hm;
    }

    @PutMapping("/userFoodUpdate")
    public Map<REnum,Object> userFoodUpdate(@RequestBody Foods foods){
        Map<REnum,Object> hm=new LinkedHashMap<>();

        String result=foodService.userFoodUpdate(foods);
        if (result==""){
            hm.put(REnum.status,true);
            hm.put(REnum.message,"Bu İşlem İçin Yetkiniz Bulunmamaktadır!");
            hm.put(REnum.result,foodService.foodList());
        }else if (result=="Düzenlemek İstediğiniz Ürün Bulunamadı!"){
            hm.put(REnum.status,true);
            hm.put(REnum.message,result);
            hm.put(REnum.result,foodService.userFoodList());
        }else {
            hm.put(REnum.status,true);
            hm.put(REnum.message,"Değişiklikler Kaydedildi");
            hm.put(REnum.result,foodService.userFoodList());
        }

        return hm;
    }


}
