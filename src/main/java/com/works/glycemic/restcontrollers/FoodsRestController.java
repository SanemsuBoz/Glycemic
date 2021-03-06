package com.works.glycemic.restcontrollers;

import com.works.glycemic.models.Foods;
import com.works.glycemic.services.FoodService;
import com.works.glycemic.utils.REnum;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
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
    @Cacheable("foods_list")
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

    // foods List
    @GetMapping("/adminWaitFoodList")
    public Map<REnum, Object> adminWaitFoodList() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        hm.put(REnum.status, true);
        hm.put(REnum.message, "Ürün Listesi");
        hm.put(REnum.result, foodService.adminWaitFoodList());
        return hm;
    }

    @DeleteMapping("/userFoodDelete")
    public Map<REnum,Object> userFoodDelete(@RequestParam Long gid){
        return foodService.userFoodDelete(gid);
    }

    @PutMapping("/userFoodUpdate")
    public Map<REnum,Object> userFoodUpdate(@RequestBody Foods foods){
        return foodService.userUpdateFood(foods);
    }

    @GetMapping("/detail/{url}")
    public Map<REnum,Object> detailFood(@PathVariable String url){
        Map<REnum,Object> hm=new LinkedHashMap<>();
        Optional<Foods> optionalFoods=foodService.detailFoods(url);
        if (optionalFoods.isPresent()){
            hm.put(REnum.status,true);
            hm.put(REnum.message,"Ürün Detayı");
            hm.put(REnum.result,optionalFoods);
        }else {
            hm.put(REnum.status,false);
            hm.put(REnum.message,"Hata Oluştu");
            hm.put(REnum.result,null);
        }
        return hm;
    }

}
