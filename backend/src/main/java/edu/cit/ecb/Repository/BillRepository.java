package edu.cit.ecb.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import edu.cit.ecb.Entity.BillEntity;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Integer>
{
    public BillEntity findByBillID(Integer billID);
    public List<BillEntity> findByCustomerID(Integer customerID);
}