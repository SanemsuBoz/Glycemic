package com.works.glycemic.services;

import com.works.glycemic.config.AuditAwareConfig;
import com.works.glycemic.models.Foods;
import com.works.glycemic.repositories.FoodRepository;
import com.works.glycemic.utils.REnum;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FoodService {

    final FoodRepository fRepo;
    final AuditAwareConfig auditAwareConfig;
    final CacheManager cacheManager;

    public FoodService(FoodRepository fRepo, AuditAwareConfig auditAwareConfig, CacheManager cacheManager) {
        this.fRepo = fRepo;
        this.auditAwareConfig = auditAwareConfig;
        this.cacheManager = cacheManager;
    }

    //food save

    public Foods foodSave(Foods foods){
        Optional<Foods> oFoods=fRepo.findByNameEqualsIgnoreCase(foods.getName());
        if (oFoods.isPresent()){
            return null;
        }else {
            foods.setEnabled(false);
            foods.setName(foodNameCheck(foods.getName()));
            foods.setUrl(urlCheck(foods.getName()));
            return fRepo.save(foods);
        }
    }

    public String foodNameCheck(String foodName){
        char c = Character . toUpperCase ( foodName . charAt ( 0 ));
        foodName = c + foodName . substring ( 1 );
        String bosluk=" ";
        for (int i = 1 ; i<foodName.length();i++)
        {
            if (foodName.charAt(i)==' ')
            {
                c=Character.toUpperCase(foodName.charAt (i+1));
                foodName = foodName.substring(0,i)+bosluk +c  + foodName.substring(i+2);
            }

        }
        foodName=foodName.trim().replaceAll(" +", " ");
        return foodName;
    }

    public String urlCheck(String urlName){
        urlName=urlName.toLowerCase();
        urlName=urlName.replaceAll("ü","u");
        urlName=urlName.replaceAll("ğ","g");
        urlName=urlName.replaceAll("ş","s");
        urlName=urlName.replaceAll("ç","c");
        urlName=urlName.replaceAll("ö","o");
        urlName=urlName.replaceAll(" ","-");
        return urlName;
    }

    public Optional<Foods> detailFoods(String url){
        return fRepo.findByUrlEqualsIgnoreCase(url);
    }

    //food list
    public List<Foods> foodList(){
        return fRepo.findByEnabledEqualsOrderByGidAsc(true);
    }

    // admin Wait food list
    public List<Foods> adminWaitFoodList() {
        return fRepo.findByEnabledEqualsOrderByGidAsc(false);
    }

    //user food list
    public List<Foods> userFoodList(){
        Optional<String> oUserName=auditAwareConfig.getCurrentAuditor();
        if (oUserName.isPresent()){
            return fRepo.findByCreatedByEqualsIgnoreCase(oUserName.get());
        }else {
            return new ArrayList<Foods>();
        }
    }

    public Map<REnum,Object> userFoodDelete(Long gid){
        Map<REnum,Object> hm=new LinkedHashMap<>();
        hm.put(REnum.status,false);
        Optional<String> oUserName=auditAwareConfig.getCurrentAuditor();
        if (oUserName.isPresent()) {
            try {
                String userName = oUserName.get();
                if (auditAwareConfig.roles().contains("ROLE_admin")) {
                    fRepo.deleteById(gid);
                    hm.put(REnum.status,true);
                    hm.put(REnum.message,"Silme işlemi başarılı!");
                } else {
                    Optional<Foods> foodsOptional = fRepo.findByCreatedByEqualsIgnoreCaseAndGidEquals(userName, gid);
                    if (foodsOptional.isPresent()) {
                        fRepo.deleteById(gid);
                        hm.put(REnum.status,true);
                        hm.put(REnum.message,"Silme işlemi başarılı!");
                    } else {
                        hm.put(REnum.message,"Bu ürün size ait değil mi?");
                    }
                }
            } catch (Exception e) {
                hm.put(REnum.message,"Silme işlemi sırasında bir hata oluştu ya da id yanlış!");
            }
        } else {
            hm.put(REnum.message,"Bu işlem için yetkiniz yok!");
        }
        hm.put(REnum.result,gid);
        return hm;
    }

    public Map<REnum, Object> userUpdateFood(Foods food) {
        Map<REnum, Object> hm = new LinkedHashMap<>();

        hm.put(REnum.status, true);
        hm.put(REnum.message, "Ürün başarıyla güncellendi");
        hm.put(REnum.result, "id: " + food.getGid());

        Optional<String> oUserName = auditAwareConfig.getCurrentAuditor();
        if (oUserName.isPresent()) {
            String userName = oUserName.get();
            try {
                Foods userFood = fRepo.findById(food.getGid()).get();
                //admin food update
                if (auditAwareConfig.roles().contains("ROLE_admin")) {
                    userFood.setCid(food.getCid());
                    userFood.setName(foodNameCheck(food.getName()));
                    userFood.setGlycemicindex(food.getGlycemicindex());
                    userFood.setImage(food.getImage());
                    userFood.setSource(food.getSource());
                    userFood.setEnabled(food.isEnabled());
                    if (food.isEnabled()){
                        cacheManager.getCache("foods_list").clear();
                    }
                    userFood.setUrl(urlCheck(food.getName()));
                    hm.put(REnum.result, fRepo.saveAndFlush(userFood));
                }
                else {
                    //user food update
                    Optional<Foods> oFood = fRepo.findByCreatedByEqualsIgnoreCaseAndGidEquals(userName,food.getGid());
                    if (oFood.isPresent()) {
                        userFood.setCid(food.getCid());
                        userFood.setName(food.getName());
                        userFood.setGlycemicindex(food.getGlycemicindex());
                        userFood.setImage(food.getImage());
                        userFood.setSource(food.getSource());
                        hm.put(REnum.result, fRepo.saveAndFlush(userFood));
                    }
                    else {
                        hm.put(REnum.status, false);
                        hm.put(REnum.message, "Güncellemek istediğiniz ürün size ait değil!");
                    }
                }
            }
            catch (Exception ex) {
                hm.put(REnum.status, false);
                hm.put(REnum.message, "Update işlemi sırasında bir hata oluştu!");
            }
        } else {
            hm.put(REnum.status, false);
            hm.put(REnum.message, "Bu işleme yetkiniz yok!");
        }
        return hm;
    }


}
