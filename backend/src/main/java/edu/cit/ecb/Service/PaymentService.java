package edu.cit.ecb.Service;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.ArrayList;
import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.PaymentEntity;
import edu.cit.ecb.Repository.BillRepository;
import edu.cit.ecb.Repository.PaymentRepository;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository prepo;

    @Autowired
    private BillRepository brepo;

    @Autowired
    private UserService cserv;

    public List<PaymentEntity> findAllPaymentRecords() {
        List<PaymentEntity> list = prepo.findAll();
        return list != null ? list : new ArrayList<>();
    }
    

    public PaymentEntity savePaymentRecord(PaymentEntity payment){
        return prepo.save(payment);
    }

    public PaymentEntity updatePaymentEntity (int paymentId, PaymentEntity newPaymentDetails){
        PaymentEntity existingPayment = prepo.findById(paymentId)
                .orElseThrow(() -> new NoSuchElementException ("Payment record not found with id: " + paymentId));
        existingPayment.setPaymentDate(newPaymentDetails.getPaymentDate());
        existingPayment.setPaymentMethod(newPaymentDetails.getPaymentMethod());
        existingPayment.setAmountPaid(newPaymentDetails.getAmountPaid());
        return prepo.save(existingPayment);
    }

    public String deletePaymentRecord(int paymentId) {
        if (!prepo.existsById(paymentId)) {
            throw new RuntimeException("Payment not found");
        }
        prepo.deleteById(paymentId);
        return "Payment deleted successfully";
    }

    public PaymentEntity findByPaymentId(int paymentId){
        return prepo.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment record not found with id: " + paymentId));
    }

    public List<PaymentEntity> getPaymentRecordsByCustomer(int customerId) {
        List<PaymentEntity> list = prepo.findByCustomer_AccountId(customerId);
        return list != null ? list : new ArrayList<>();
    }
    
    
    public PaymentEntity addPayment(PaymentEntity paymentRequest) {
        try {
            BillEntity bill = brepo.findById(paymentRequest.getBill().getBillId())
                .orElseThrow(() -> new RuntimeException("Bill not found"));

            double totalAmount = bill.getTotalAmount();
            double amountToPay = paymentRequest.getAmountPaid();

            // Round both amounts to 2 decimal places for comparison
            BigDecimal billAmount = new BigDecimal(totalAmount).setScale(2, RoundingMode.HALF_UP);
            BigDecimal paymentAmount = new BigDecimal(amountToPay).setScale(2, RoundingMode.HALF_UP);

            // Create payment entry
            PaymentEntity payment = new PaymentEntity();
            payment.setPaymentDate(new Date(System.currentTimeMillis()));
            payment.setPaymentMethod(paymentRequest.getPaymentMethod());
            payment.setAmountPaid(amountToPay);
            payment.setCustomer(paymentRequest.getCustomer());
            payment.setBill(bill);

            // Save payment
            PaymentEntity saved = prepo.save(payment);

            // Update bill status based on payment amount
            if (paymentAmount.compareTo(billAmount) >= 0) {
                bill.setStatus("PAID");
            } else if (paymentAmount.compareTo(BigDecimal.ZERO) > 0) {
                bill.setStatus("PENDING");
            }
            brepo.save(bill);

            return saved;
        } catch (Exception e) {
            throw new RuntimeException("Error processing payment: " + e.getMessage());
        }
    }

    public PaymentEntity save(PaymentEntity payment) {
        return prepo.save(payment);
    }

    public List<PaymentEntity> getPaymentRecordsByBill(int billId) {
        return prepo.findByBill_BillId(billId);
    }
}
