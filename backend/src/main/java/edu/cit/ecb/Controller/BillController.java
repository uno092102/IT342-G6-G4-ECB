package edu.cit.ecb.Controller;

import edu.cit.ecb.DTO.BillRequestDTO;
import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Service.BillService;
import edu.cit.ecb.Service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> createBill(@RequestBody BillRequestDTO billRequest, JwtAuthenticationToken token) {
        try {
            CustomerEntity customer = customerService.findByAccountId(billRequest.getCustomerId());
            if (customer == null) {
                return ResponseEntity.badRequest().body("Invalid customer ID.");
            }

            BillEntity bill = new BillEntity();
            bill.setBillDate(billRequest.getBillDate());
            bill.setTotalAmount(billRequest.getTotalAmount());
            bill.setDueDate(billRequest.getDueDate());
            bill.setCustomer(customer);
            bill.setTariffID(billRequest.getTariffID());

            return ResponseEntity.ok(billService.postBill(bill));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating bill: " + e.getMessage());
        }
    }


    @GetMapping("/getAllBills")
    @PreAuthorize("hasAuthority('SCOPE_read')")
    public List<BillEntity> getAllBills(JwtAuthenticationToken token) {
        return billService.getAllBill();
    }

    @PutMapping("/updateBill/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public ResponseEntity<?> updateBill(@PathVariable int id, @RequestBody BillRequestDTO billRequest, JwtAuthenticationToken token) {
        try {
            CustomerEntity customer = customerService.findByAccountId(billRequest.getCustomerId());
            if (customer == null) {
                return ResponseEntity.badRequest().body("Invalid customer ID.");
            }

            BillEntity existingBill = billService.findBillById(id);
            existingBill.setBillDate(billRequest.getBillDate());
            existingBill.setTotalAmount(billRequest.getTotalAmount());
            existingBill.setDueDate(billRequest.getDueDate());
            existingBill.setCustomer(customer);
            existingBill.setTariffID(billRequest.getTariffID());

            return ResponseEntity.ok(billService.updateBill(id, existingBill));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating bill: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteBill/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public String deleteBill(@PathVariable int id, JwtAuthenticationToken token) {
        return billService.deleteBill(id);
    }  
}
