package com.works.glycemic.services;

import com.works.glycemic.config.AuditAwareConfig;
import com.works.glycemic.models.Foods;
import com.works.glycemic.models.User;
import com.works.glycemic.repositories.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    final FoodRepository fRepo;
    final AuditAwareConfig auditAwareConfig;

    public FoodService(FoodRepository fRepo, AuditAwareConfig auditAwareConfig) {
        this.fRepo = fRepo;
        this.auditAwareConfig = auditAwareConfig;
    }

    //food save

    public Foods foodSave(Foods foods){
        Optional<Foods> oFoods=fRepo.findByNameEqualsIgnoreCase(foods.getName());
        if (oFoods.isPresent()){
            return null;
        }else {
            foods.setEnabled(false);
            return fRepo.save(foods);
        }
    }

    //food list
    public List<Foods> foodList(){
        return fRepo.findAll();
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

    public String userFoodDelete(Long gid){
        Optional<String> oUserName=auditAwareConfig.getCurrentAuditor();

        if (oUserName.isPresent()){
            Optional<Foods> foodsOptional=fRepo.findByGidEquals(gid);
            if (foodsOptional.isPresent()){
                fRepo.deleteById(gid);
                return "Ürün Silindi!";
            }
            return "Silmek İstediğiniz Ürün Bulunamadı!";
        }else {
            return "";
        }
    }

    public String userFoodUpdate(Foods foods){
        Optional<String> oUserName=auditAwareConfig.getCurrentAuditor();

        if (oUserName.isPresent() ){
            Optional<Foods> foodsOptional=fRepo.findById(foods.getGid());
            if (foodsOptional.isPresent()) {
                Foods foods1=foodsOptional.get();
                foods1.setGlycemicindex(foods.getGlycemicindex());
                foods1.setImage(foods.getImage());
                foods1.setName(foods.getName());
                foods1.setCid(foods.getCid());
                foods1.setSource(foods.getSource());
                fRepo.save(foods1);
                return "Değişiklikler Kaydedildi!";
            }
            return "Düzenlemek İstediğiniz Ürün Bulunamadı!";
        }else {
            return "";
        }
    }

}
