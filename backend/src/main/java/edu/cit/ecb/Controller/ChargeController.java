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
    public ResponseEntity<ChargeEntity> addCharge(@RequestParam int billId,
                                                   @RequestParam String chargeType,
                                                   @RequestParam double ratePerKwh,
                                                   @RequestParam double amount) {
        ChargeEntity charge = chargeService.addCharge(billId, chargeType, ratePerKwh, amount);
        return ResponseEntity.ok(charge);
    }

    @GetMapping("/bill/{billId}")
    public ResponseEntity<List<ChargeEntity>> getChargesByBillId(@PathVariable int billId) {
        return ResponseEntity.ok(chargeService.getChargesByBillId(billId));
    }

    @GetMapping("/type/{chargeType}")
    public ResponseEntity<List<ChargeEntity>> getChargesByType(@PathVariable String chargeType) {
        return ResponseEntity.ok(chargeService.getChargesByType(chargeType));
    }

    @DeleteMapping("/delete/{chargeId}")
    public ResponseEntity<String> deleteCharge(@PathVariable int chargeId) {
        chargeService.deleteCharge(chargeId);
        return ResponseEntity.ok("Charge deleted successfully.");
    }
} 