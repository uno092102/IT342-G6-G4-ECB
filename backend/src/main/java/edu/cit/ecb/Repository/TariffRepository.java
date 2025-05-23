package edu.cit.ecb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.cit.ecb.Entity.TariffEntity;

@Repository
public interface TariffRepository extends JpaRepository<TariffEntity,Integer>{
    boolean existsByTariffType(String tariffType);
    public TariffEntity findByTariffID(Integer tariffID);
}
