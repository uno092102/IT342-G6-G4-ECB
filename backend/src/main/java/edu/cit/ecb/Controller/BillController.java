package edu.cit.ecb.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Service.BillService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService billService;

    // ✅ PUT SPECIFIC PATHS FIRST (before generic {billId})
    @GetMapping("/getAllBills")
    public ResponseEntity<?> getAllBills() {
        try {
            List<BillEntity> bills = billService.getAllBill();
            return ResponseEntity.ok(bills);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error fetching all bills: " + e.getMessage()));
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getBillsByCustomerId(@PathVariable int customerId) {
        try {
            List<BillEntity> bills = billService.getBillsByCustomerId(customerId);
            return ResponseEntity.ok(bills);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error fetching bills: " + e.getMessage()));
        }
    }

    // ✅ GENERIC PATH VARIABLES GO LAST
    @GetMapping("/{billId}")
    public ResponseEntity<?> getBillById(@PathVariable int billId) {
        try {
            BillEntity bill = billService.findBillById(billId);
            if (bill == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Bill not found"));
            }
            return ResponseEntity.ok(bill);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error fetching bill: " + e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBill(@RequestBody BillEntity bill) {
        try {
            BillEntity savedBill = billService.postBill(bill);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBill);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error creating bill: " + e.getMessage()));
        }
    }

    @PutMapping("/update/{billId}")
    public ResponseEntity<?> updateBill(@PathVariable int billId, @RequestBody BillEntity billDetails) {
        try {
            BillEntity updatedBill = billService.updateBill(billId, billDetails);
            return ResponseEntity.ok(updatedBill);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error updating bill: " + e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{billId}")
    public ResponseEntity<?> deleteBill(@PathVariable int billId) {
        try {
            String message = billService.deleteBill(billId);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error deleting bill: " + e.getMessage()));
        }
    }
}
