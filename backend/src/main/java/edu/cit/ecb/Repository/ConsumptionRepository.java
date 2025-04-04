package edu.cit.ecb.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.cit.ecb.Entity.ConsumptionEntity;

@Repository
public interface ConsumptionRepository extends JpaRepository<ConsumptionEntity, Integer> {
    List<ConsumptionEntity> findByCustomer_AccountId(int accountId); 
}


