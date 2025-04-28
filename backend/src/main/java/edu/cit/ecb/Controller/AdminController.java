package edu.cit.ecb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Service.BillService;
import edu.cit.ecb.Service.ConsumptionService;
import edu.cit.ecb.Service.PaymentService;
import edu.cit.ecb.Service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService customerService;

    @Autowired
    private BillService billService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ConsumptionService consumptionService;

    // Secure Dashboard
    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String adminDashboard() {
        return "Welcome to the Admin Dashboard!";
    }

    // Get All Customers
    @GetMapping("/customers")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UserEntity> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Update Customer Role
    @PutMapping("/updateRole/{accountId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateCustomerRole(@PathVariable int accountId, @RequestParam String role) {
        try {
            UserEntity customer = customerService.findByAccountId(accountId);

            if ("ADMIN".equalsIgnoreCase(role)) {
                customer.setRole(edu.cit.ecb.Enum.Role.ADMIN);
            } else if ("CUSTOMER".equalsIgnoreCase(role)) {
                customer.setRole(edu.cit.ecb.Enum.Role.CUSTOMER);
            } else {
                return ResponseEntity.badRequest().body("Invalid role. Use 'ADMIN' or 'CUSTOMER'.");
            }

            customerService.save(customer);
            return ResponseEntity.ok("Customer role updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Customer not found.");
        }
    }

    // Delete Customer
    @DeleteMapping("/delete/{accountId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deleteCustomer(@PathVariable int accountId) {
        try {
            String result = customerService.deleteCustomer(accountId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Error deleting customer: " + e.getMessage());
        }
    }

    @GetMapping("/reports")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAllActivityLogs() {
        Map<String, Object> activity = new HashMap<>();
        activity.put("bills", billService.getAllBill());
        activity.put("payments", paymentService.findAllPaymentRecords());
        activity.put("consumptions", consumptionService.getAllConsumption());
        return ResponseEntity.ok(activity);
    }
}
