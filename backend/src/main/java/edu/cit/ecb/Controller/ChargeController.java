package edu.cit.ecb.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.ChargeEntity;
import edu.cit.ecb.Service.ChargeService;

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
    public ResponseEntity<ChargeEntity> updateCharge(@PathVariable int id, @RequestBody ChargeEntity updated) {
        return ResponseEntity.ok(chargeService.updateCharge(id, updated));
    }

    @DeleteMapping("/delete/{chargeId}")
    public ResponseEntity<String> deleteCharge(@PathVariable int chargeId) {
        chargeService.deleteCharge(chargeId);
        return ResponseEntity.ok("Charge deleted successfully.");
    }
}