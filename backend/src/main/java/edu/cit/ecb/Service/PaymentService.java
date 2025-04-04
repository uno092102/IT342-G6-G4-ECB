package edu.cit.ecb.Service;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.ArrayList;

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

    public List<PaymentEntity> findAllPaymentRecords(){
        return prepo.findAll();
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
        return prepo.findByCustomer_AccountId(customerId);
    }
    
    public PaymentEntity addPayment(PaymentEntity paymentRequest) {
        BillEntity billing = brepo.findById(paymentRequest.getBill().getBillId()) // Correct method name
        .orElseThrow(() -> new RuntimeException("Bill not found"));
    
        PaymentEntity payment = new PaymentEntity();
        payment.setPaymentDate(paymentRequest.getPaymentDate());
        payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        payment.setAmountPaid(paymentRequest.getAmountPaid());
        payment.setBill(billing);
    
        return prepo.save(payment);
    }
}
