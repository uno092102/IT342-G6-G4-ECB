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
    private PaymentRepository pserv;

    @Autowired
    private BillRepository bserv;

    public List<PaymentEntity> findAllPaymentRecords(){
        return pserv.findAll();
    }

    public PaymentEntity savePaymentRecord(PaymentEntity payment){
        return pserv.save(payment);
    }

    public PaymentEntity updatePaymentEntity (int paymentId, PaymentEntity newPaymentDetails){
        PaymentEntity existingPayment = pserv.findById(paymentId)
                .orElseThrow(() -> new NoSuchElementException ("Payment record not found with id: " + paymentId));
        existingPayment.setPaymentDate(newPaymentDetails.getPaymentDate());
        existingPayment.setPaymentMethod(newPaymentDetails.getPaymentMethod());
        existingPayment.setAmountPaid(newPaymentDetails.getAmountPaid());
        return pserv.save(existingPayment);
    }

    public String deletePaymentRecord(int paymentId) {
        PaymentEntity existingPayment = pserv.findById(paymentId)
                .orElseThrow(() -> new NoSuchElementException("Payment record not found with id: " + paymentId));
        pserv.delete(existingPayment);
        return "Payment record deleted successfully with id: " + paymentId;
    }

    public PaymentEntity findByPaymentId(int paymentId){
        return pserv.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment record not found with id: " + paymentId));
    }

    public List<PaymentEntity> getPaymentRecordsByCustomer(int customerId) {
        List<BillEntity> bills = bserv.findByCustomerID(customerId);
        List<PaymentEntity> payments = new ArrayList<>();
        for (BillEntity bill : bills) {
            payments.addAll(bill.getPaymentId());
        }
        return payments;
    }
    
    public PaymentEntity addPayment(int billingId, Date paymentDate, String paymentMethod, double amountPaid) {
        BillEntity billing = bserv.findById(billingId)
                .orElseThrow(() -> new RuntimeException("Billing record not found with id: " + billingId));
        
        PaymentEntity payment = new PaymentEntity();
        payment.setPaymentDate(paymentDate);
        payment.setPaymentMethod(paymentMethod);
        payment.setAmountPaid(amountPaid);
        payment.setBill(billing);
        
        return pserv.save(payment);
        
    }

}
