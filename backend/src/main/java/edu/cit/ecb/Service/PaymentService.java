package edu.cit.ecb.Service;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.ArrayList;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

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

    @PersistenceContext
    private EntityManager entityManager;

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
        BillEntity billing = brepo.findById(paymentRequest.getBill().getBillId()) // Correct method name
        .orElseThrow(() -> new RuntimeException("Bill not found"));
    
        PaymentEntity payment = new PaymentEntity();
        payment.setPaymentDate(paymentRequest.getPaymentDate());
        payment.setPaymentMethod(paymentRequest.getPaymentMethod());
        payment.setAmountPaid(paymentRequest.getAmountPaid());
        payment.setBill(billing);

        if (billing != null) {
            double totalPaid = prepo
                .findByBill_BillId(billing.getBillId())
                .stream()
                .mapToDouble(PaymentEntity::getAmountPaid)
                .sum() + payment.getAmountPaid();
    
            if (totalPaid >= billing.getTotalAmount()) {
                billing.setStatus("PAID");
                brepo.save(billing);
            }
        }
    
        return prepo.save(payment);
    }

    public PaymentEntity save(PaymentEntity payment) {
        return prepo.save(payment);
    }

    public List<Object[]> getDailyPaymentTotals() {
        Query query = entityManager.createQuery(
            "SELECT FUNCTION('DATE', p.paymentDate), SUM(p.amountPaid) FROM PaymentEntity p GROUP BY FUNCTION('DATE', p.paymentDate) ORDER BY FUNCTION('DATE', p.paymentDate) ASC"
        );
        return query.getResultList();
    }
}
