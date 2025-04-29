package edu.cit.ecb.Controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
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

    // POST - Create a new charge
    @PostMapping("/createCharge")
    public ResponseEntity<?> createCharge(@RequestBody ChargeEntity charge) {
        try {
            ChargeEntity createdCharge = chargeService.addCharge(charge);
            return ResponseEntity.ok(createdCharge);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating charge: " + e.getMessage());
        }
    }

    // GET - Retrieve all charges
    @GetMapping("/getAll")
    public ResponseEntity<List<ChargeEntity>> getAllCharges() {
        return ResponseEntity.ok(chargeService.getAllCharge());
    }

    // PUT - Update an existing charge
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCharge(@PathVariable int id, @RequestBody ChargeEntity updatedCharge) {
        try {
            ChargeEntity existing = chargeService.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Charge not found with ID: " + id));

            existing.setChargeType(updatedCharge.getChargeType());
            existing.setRatePerKwh(updatedCharge.getRatePerKwh());

            chargeService.save(existing);
            return ResponseEntity.ok(existing);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE - Remove a charge
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCharge(@PathVariable int id) {
        try {
            chargeService.deleteCharge(id);
            return ResponseEntity.ok("Charge deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting charge: " + e.getMessage());
        }
    }
}
