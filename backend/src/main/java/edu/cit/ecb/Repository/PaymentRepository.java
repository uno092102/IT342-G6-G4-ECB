package edu.cit.ecb.Repository;

import edu.cit.ecb.Entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
    
    // Find payments by bill ID
    List<PaymentEntity> findByBill_BillId(int billId);
    
    // Find payments by customer (through bill -> customer relationship)
    List<PaymentEntity> findByBill_Customer_AccountId(int accountId);
    
    // Find all payments
    List<PaymentEntity> findAll();
}
