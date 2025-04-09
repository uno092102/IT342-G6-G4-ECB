package edu.cit.ecb.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Repository.ConsumptionRepository;
import edu.cit.ecb.Repository.UserRepository;

@Service
public class ConsumptionService {

    @Autowired
    private ConsumptionRepository consumptionRepository;

    @Autowired
    private BillService bserv;

    @Autowired
    private UserRepository userRepository;


    public ConsumptionEntity addConsumption(int customerId, ConsumptionEntity consumption) {
        UserEntity customer = userRepository.findById(customerId)
            .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        consumption.setCustomer(customer);
    
        ConsumptionEntity savedConsumption = consumptionRepository.save(consumption);
    
        BillEntity bill = new BillEntity();
        bill.setCustomer(customer);
        bill.setConsumption(savedConsumption);
    
        bserv.postBill(bill); // Calculates and saves bill
    
        return savedConsumption;
    }
    
    public ConsumptionEntity updateConsumption(int id, ConsumptionEntity input) {
        ConsumptionEntity existing = consumptionRepository.findById(id).orElseThrow(() ->
            new RuntimeException("Consumption record not found."));
    
        if (input.getAvgKwhPerDay() != 0) {
            existing.setAvgKwhPerDay(input.getAvgKwhPerDay());
        }
    
        if (input.getTotalKwh() != 0) {
            existing.setTotalKwh(input.getTotalKwh());
        }
    
        // Preserve original periodFrom, periodTo, numDays, etc.
        return consumptionRepository.save(existing);
    }
    
    

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
        return consumptionRepository.findByCustomer_AccountId(accountId);
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
