package edu.cit.ecb.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.Repository.ConsumptionRepository;

@Service
public class ConsumptionService {

    @Autowired
    private ConsumptionRepository consumptionRepository;


    // Get all consumption records
    public List<ConsumptionEntity> getAllConsumption() {
        return consumptionRepository.findAll();
    }

    // Get consumption by ID
    public Optional<ConsumptionEntity> getConsumptionById(int id) {
        return consumptionRepository.findById(id);
    }

    //all
    public List<ConsumptionEntity> getAllConsumptionRecords() {
        return consumptionRepository.findAll();
    }

    // Get consumption by Customer Account ID
    public List<ConsumptionEntity> getConsumptionByAccountId(int accountId) {
        return consumptionRepository.findByAccountId_AccountId(accountId); // Use the corrected repository method
    }

    
    // Save or update consumption record
    public ConsumptionEntity saveConsumption(ConsumptionEntity consumption) {
        return consumptionRepository.save(consumption);
    }

    // Delete consumption record
    public void deleteConsumption(int id) {
        consumptionRepository.deleteById(id);
    }
}
