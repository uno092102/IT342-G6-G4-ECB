package edu.cit.ecb.Controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.DTO.ConsumptionDTO;
import edu.cit.ecb.Service.ConsumptionService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/consumption")
public class ConsumptionController {

    @Autowired
    private ConsumptionService consumptionService;

    @GetMapping("/all")
    public List<ConsumptionDTO> getAllConsumption() {
        List<ConsumptionEntity> entities = consumptionService.getAllConsumption();
        return entities.stream()
                .map(consumption -> new ConsumptionDTO(
                        consumption.getConsumptionId(),
                        (consumption.getCustomer() != null)
                                ? consumption.getCustomer().getFname() + " " + consumption.getCustomer().getLname()
                                : "N/A",
                        consumption.getPeriodFrom(),
                        consumption.getPeriodTo(),
                        consumption.getNumDays(),
                        consumption.getAvgKwhPerDay(),
                        consumption.getTotalKwh()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsumptionEntity> getConsumptionById(@PathVariable int id) {
        Optional<ConsumptionEntity> consumption = consumptionService.getConsumptionById(id);
        return consumption.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{accountId}")
    public List<ConsumptionEntity> getConsumptionByAccountId(@PathVariable int accountId) {
        return consumptionService.getConsumptionByAccountId(accountId);
    }

    @PostMapping("/new")
    public ResponseEntity<?> addConsumption(@RequestParam int customerId, @RequestBody ConsumptionEntity consumption) {
        try {
            return ResponseEntity.ok(consumptionService.addConsumption(customerId, consumption));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateConsumption(@PathVariable int id, @RequestBody ConsumptionEntity input) {
        try {
            ConsumptionEntity updated = consumptionService.updateConsumption(id, input);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteConsumption(@PathVariable int id) {
        Optional<ConsumptionEntity> existingConsumption = consumptionService.getConsumptionById(id);
        if (existingConsumption.isPresent()) {
            consumptionService.deleteConsumption(id);
            return ResponseEntity.ok("Consumption Deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
