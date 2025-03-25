package edu.cit.ecb.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.Service.ConsumptionService;

@RestController
@RequestMapping("/api/consumption")
public class ConsumptionController {

    @Autowired
    private ConsumptionService consumptionService;

    // Get all consumption records
    @GetMapping ("/all")
    public List<ConsumptionEntity> getAllConsumption() {
        return consumptionService.getAllConsumption();
    }

    // Get consumption by ID
    @GetMapping("/{id}")
    public ResponseEntity<ConsumptionEntity> getConsumptionById(@PathVariable int id) {
        Optional<ConsumptionEntity> consumption = consumptionService.getConsumptionById(id);
        return consumption.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get consumption by Customer Account ID
    @GetMapping("/customer/{accountId}")
    public List<ConsumptionEntity> getConsumptionByAccountId(@PathVariable int accountId) {
        return consumptionService.getConsumptionByAccountId(accountId);
    }
    

    // Create a new consumption record
    @PostMapping("/post")
    public ConsumptionEntity createConsumption(@RequestBody ConsumptionEntity consumption) {
        return consumptionService.saveConsumption(consumption);
    }

    // Update an existing consumption record
    @PutMapping("/{id}")
    public ResponseEntity<ConsumptionEntity> updateConsumption(@PathVariable int id, @RequestBody ConsumptionEntity updatedConsumption) {
        Optional<ConsumptionEntity> existingConsumption = consumptionService.getConsumptionById(id);

        if (existingConsumption.isPresent()) {
            ConsumptionEntity consumption = existingConsumption.get();
            consumption.setPeriodFrom(updatedConsumption.getPeriodFrom());
            consumption.setPeriodTo(updatedConsumption.getPeriodTo());
            consumption.setNumDays(updatedConsumption.getNumDays());
            consumption.setAvgKwhPerDay(updatedConsumption.getAvgKwhPerDay());
            consumption.setTotalKwh(updatedConsumption.getTotalKwh());
            return ResponseEntity.ok(consumptionService.saveConsumption(consumption));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a consumption record
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsumption(@PathVariable int id) {
        consumptionService.deleteConsumption(id);
        return ResponseEntity.noContent().build();
    }
}
