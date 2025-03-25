package edu.cit.ecb.Controller;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Service.BillService;
import edu.cit.ecb.Service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private BillService billService;

    @PostMapping("/createBill")
@PreAuthorize("hasAuthority('SCOPE_write')")
public ResponseEntity<?> createBill(@RequestBody BillEntity bill, JwtAuthenticationToken token) {
    System.out.println("Received Bill: " + bill); // Debugging
    if (bill.getCustomer() == null || bill.getCustomer().getAccountId() == 0) {
        return ResponseEntity.badRequest().body("Customer information is required.");
    }

    CustomerEntity customer = customerService.findByAccountId(bill.getCustomer().getAccountId());
    if (customer == null) {
        return ResponseEntity.badRequest().body("Invalid customer ID.");
    }

    bill.setCustomer(customer);
    return ResponseEntity.ok(billService.postBill(bill));
}


    @GetMapping("/getAllBills")
    @PreAuthorize("hasAuthority('SCOPE_read')")
    public List<BillEntity> getAllBills(JwtAuthenticationToken token) {
        return billService.getAllBill();
    }

    @PutMapping("/updateBill/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public BillEntity updateBill(@PathVariable int id, @RequestBody BillEntity bill, JwtAuthenticationToken token) {
        return billService.updateBill(id, bill);
    }

    @DeleteMapping("/deleteBill/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public String deleteBill(@PathVariable int id, JwtAuthenticationToken token) {
        return billService.deleteBill(id);
    }

    
}
