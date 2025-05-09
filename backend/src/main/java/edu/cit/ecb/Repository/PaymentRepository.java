package edu.cit.ecb.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.cit.ecb.Entity.PaymentEntity;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
    public PaymentEntity findByPaymentId(Integer paymentId);
    List<PaymentEntity> findByCustomer_AccountId(int accountId);
    List<PaymentEntity> findByBill_BillId(int billId);

    @Transactional
    @Modifying
    @Query("DELETE FROM PaymentEntity p WHERE p.bill.billId IN (SELECT b.billId FROM BillEntity b WHERE b.customer.accountId = :customerId)")
    void deleteByCustomerId(@Param("customerId") int customerId);

    @Query("SELECT DATE(p.paymentDate), SUM(p.amountPaid) FROM PaymentEntity p GROUP BY DATE(p.paymentDate) ORDER BY DATE(p.paymentDate)")
    List<Object[]> getDailyPaymentTotals();

}
