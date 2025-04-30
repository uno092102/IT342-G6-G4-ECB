package edu.cit.ecb.Controller;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Service.BillService;
import edu.cit.ecb.Service.ConsumptionService;
import edu.cit.ecb.Service.UserService;
import edu.cit.ecb.Utility.PreAuthorize;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @Autowired
    private UserService customerService;

    @Autowired
    private ConsumptionService consumptionService;

    @PostMapping("/generate/{customerId}/{consumptionId}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public ResponseEntity<?> generateBill(@PathVariable int customerId, @PathVariable int consumptionId) {
        try {
            UserEntity customer = customerService.findByAccountId(customerId);
            if (customer == null) {
                return ResponseEntity.status(404).body("Customer not found with ID: " + customerId);
            }

            ConsumptionEntity consumption = consumptionService.getConsumptionById(consumptionId).orElse(null);
            if (consumption == null) {
                return ResponseEntity.status(404).body("Consumption not found with ID: " + consumptionId);
            }

            BillEntity bill = new BillEntity();
            bill.setCustomer(customer);
            bill.setConsumption(consumption);

            // 🟢 Set billDate as the end of the period
            java.sql.Date periodTo = consumption.getPeriodTo();
            bill.setBillDate(periodTo);

            // 🟢 Set dueDate 30 days after the end of the period
            long thirtyDays = 30L * 24 * 60 * 60 * 1000;
            bill.setDueDate(new java.sql.Date(periodTo.getTime() + thirtyDays));

            bill.setTotalAmount(0); // Placeholder
            billService.calculateTotalBill(bill);

            return ResponseEntity.ok(billService.postBill(bill));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error generating bill: " + e.getMessage());
        }
    }


    // Get all bills
    @GetMapping("/getAllBills")
    @PreAuthorize("hasAuthority('SCOPE_read')")
    public List<BillEntity> getAllBills() {
        return billService.getAllBill();
    }

    // Get a specific bill by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBillById(@PathVariable int id) {
        try {
            BillEntity bill = billService.findBillById(id);
            return ResponseEntity.ok(bill);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Bill not found with ID: " + id);
        }
    }

    // ✅ GET bills by customer ID
// ✅ GET bills by customer ID
    @GetMapping("/customer/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> getBillsByCustomerId(@PathVariable int id) {
        try {
            List<BillEntity> bills = billService.getBillsByCustomerId(id);
            return ResponseEntity.ok(bills);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching bills: " + e.getMessage());
        }
    }



    // Update a Bill with Recalculation
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public ResponseEntity<?> updateBill(@PathVariable int id, @RequestBody BillEntity updatedBill) {
        try {
            BillEntity bill = billService.updateBill(id, updatedBill);
            return ResponseEntity.ok(bill);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating bill: " + e.getMessage());
        }
    }

    // Delete a Bill
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public ResponseEntity<String> deleteBill(@PathVariable int id) {
        try {
            String message = billService.deleteBill(id);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Bill not found: " + e.getMessage());
        }
    }
}
