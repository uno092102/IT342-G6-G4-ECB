package edu.cit.ecb.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.ChargeEntity;
import edu.cit.ecb.Service.ChargeService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/charges")
public class ChargeController {

    @Autowired
    private ChargeService chargeService;

    @PostMapping("/add")
    public ResponseEntity<ChargeEntity> addCharge(@RequestBody ChargeEntity charge) {
        return ResponseEntity.ok(chargeService.addCharge(charge));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ChargeEntity>> getAllCharges() {
        return ResponseEntity.ok(chargeService.getAllCharge());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCharge(@PathVariable int id, @RequestBody ChargeEntity updatedCharge) {
        Optional<ChargeEntity> existingOpt = chargeService.findById(id); // Ensure this method exists

        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Charge not found.");
        }

        ChargeEntity existing = existingOpt.get();
        existing.setChargeType(updatedCharge.getChargeType());
        existing.setRatePerKwh(updatedCharge.getRatePerKwh());

        chargeService.save(existing);
        return ResponseEntity.ok("Charge updated successfully.");
    }

    @DeleteMapping("/delete/{chargeId}")
    public ResponseEntity<String> deleteCharge(@PathVariable int chargeId) {
        chargeService.deleteCharge(chargeId);
        return ResponseEntity.ok("Charge deleted successfully.");
    }
}