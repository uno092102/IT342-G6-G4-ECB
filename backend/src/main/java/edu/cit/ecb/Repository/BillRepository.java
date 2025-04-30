package edu.cit.ecb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import edu.cit.ecb.Entity.BillEntity;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Integer> {
    public BillEntity findByBillId(Integer billId); // Updated method name to match the correct attribute
    List<BillEntity> findByCustomer_AccountId(int accountId);
    List<BillEntity> findAllByOrderByCreatedAtDesc();


    @Transactional
    @Modifying
    @Query("DELETE FROM BillEntity b WHERE b.customer.accountId = :customerId")
    void deleteByCustomerId(@Param("customerId") int customerId);
}