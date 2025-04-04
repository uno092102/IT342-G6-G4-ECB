package edu.cit.ecb.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.cit.ecb.Entity.ChargeEntity;

@Repository
public interface ChargeRepository extends JpaRepository<ChargeEntity, Integer> {
    boolean existsByChargeType(String chargeType);
    List<ChargeEntity> findByChargeType(String chargeType);
}
