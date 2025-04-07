package edu.cit.ecb.Controller;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.PaymentEntity;
import edu.cit.ecb.Service.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    PaymentService pserv;

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
    public ResponseEntity<PaymentEntity> addPayment(@RequestBody PaymentEntity paymentRequest) {
        try {
            PaymentEntity payment = pserv.addPayment(paymentRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
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
