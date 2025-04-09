package edu.cit.ecb.Controller;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.PaymentEntity;
import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Service.BillService;
import edu.cit.ecb.Service.PaymentService;
import edu.cit.ecb.Service.UserService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    PaymentService pserv;

    @Autowired
    BillService billService;

    @Autowired
    UserService cserv;

    @GetMapping("/")
    public List<PaymentEntity> getAllPayments() {
        return pserv.findAllPaymentRecords();
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentEntity> getPaymentById(@PathVariable int paymentId) {
        try {
            PaymentEntity payment = pserv.findByPaymentId(paymentId);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/customer/{customerId}")
    public List<PaymentEntity> getPaymentsByCustomer(@PathVariable int customerId) {
        return pserv.getPaymentRecordsByCustomer(customerId);
    }

    // POST Methods
    @PostMapping("/add")
    public ResponseEntity<?> addPayment(@RequestBody Map<String, Object> paymentRequest) {
        try {
            int billId = (int) paymentRequest.get("billId");
            double amountPaid = ((Number) paymentRequest.get("amountPaid")).doubleValue();
            String paymentMethod = (String) paymentRequest.get("paymentMethod");

            BillEntity bill = billService.findBillById(billId);
            if (bill == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bill not found.");
            }

            // ✅ Get currently authenticated user
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            UserEntity customer = cserv.findByUsername(username); // Make sure this exists in UserService

            if (customer == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated.");
            }

            PaymentEntity payment = new PaymentEntity();
            payment.setBill(bill);
            payment.setCustomer(customer); // ✅ Fix here
            payment.setAmountPaid(amountPaid);
            payment.setPaymentMethod(paymentMethod);
            payment.setPaymentDate(new Date(System.currentTimeMillis()));

            PaymentEntity saved = pserv.save(payment);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payment: " + e.getMessage());
        }
    }



    // PUT Methods
    @PutMapping("/update/{paymentId}")
    public ResponseEntity<PaymentEntity> updatePayment(@PathVariable int paymentId, @RequestBody PaymentEntity updatedPayment) {
        try {
            PaymentEntity payment = pserv.updatePaymentEntity(paymentId, updatedPayment);
            return ResponseEntity.ok(payment);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @DeleteMapping("/delete/{paymentId}")
    public ResponseEntity<String> deletePayment(@PathVariable int paymentId) {
        try {
            String response = pserv.deletePaymentRecord(paymentId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment record not found with id: " + paymentId);
        }
    }
}
