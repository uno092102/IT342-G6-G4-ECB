package edu.cit.ecb.Controller;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Map;
import java.util.ArrayList;
import java.math.BigDecimal;
import java.math.RoundingMode;

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

@CrossOrigin(origins = {"http://localhost:3000", "https://ecbfrontend.netlify.app"}, allowCredentials = "true")
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
    public ResponseEntity<List<PaymentEntity>> getAllPayments() {
        List<PaymentEntity> payments = pserv.findAllPaymentRecords();
        return ResponseEntity.ok(payments != null ? payments : new ArrayList<>());
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
    public ResponseEntity<List<PaymentEntity>> getPaymentsByCustomer(@PathVariable int customerId) {
        List<PaymentEntity> payments = pserv.getPaymentRecordsByCustomer(customerId);
        return ResponseEntity.ok(payments != null ? payments : new ArrayList<>());
    }

    @GetMapping("/bill/{billId}")
    public ResponseEntity<List<PaymentEntity>> getPaymentsByBill(@PathVariable int billId) {
        List<PaymentEntity> payments = pserv.getPaymentRecordsByBill(billId);
        return ResponseEntity.ok(payments != null ? payments : new ArrayList<>());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPayment(@RequestBody Map<String, Object> paymentRequest) {
        try {
            int billId = (int) paymentRequest.get("billId");
            double amountPaid = ((Number) paymentRequest.get("amountPaid")).doubleValue();
            String paymentMethod = (String) paymentRequest.get("paymentMethod");
            String paymentDateStr = (String) paymentRequest.get("paymentDate");

            // Round the amount to 2 decimal places
            BigDecimal roundedAmount = new BigDecimal(amountPaid).setScale(2, RoundingMode.HALF_UP);
            amountPaid = roundedAmount.doubleValue();

            BillEntity bill = billService.findBillById(billId);
            if (bill == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bill not found.");
            }

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            UserEntity customer = cserv.findByUsername(username);

            if (customer == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated.");
            }

            PaymentEntity payment = new PaymentEntity();
            payment.setBill(bill);
            payment.setCustomer(customer);
            payment.setAmountPaid(amountPaid);
            payment.setPaymentMethod(paymentMethod);
            
            // Parse the payment date from the request
            Date paymentDate = paymentDateStr != null ? Date.valueOf(paymentDateStr) : new Date(System.currentTimeMillis());
            payment.setPaymentDate(paymentDate);

            PaymentEntity saved = pserv.addPayment(payment);
            System.out.println("Bill Amount in DB: " + bill.getTotalAmount());
            System.out.println("Amount Paid: " + amountPaid);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payment: " + e.getMessage());
        }
    }

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