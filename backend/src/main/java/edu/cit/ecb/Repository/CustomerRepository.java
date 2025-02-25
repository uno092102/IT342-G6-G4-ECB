package edu.cit.ecb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.cit.ecb.Entity.CustomerEntity;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer>{
    public CustomerEntity findByAccountId(Integer accountId);
    public CustomerEntity findByUsername(String username);
    public CustomerEntity findByEmail(String email);
} 
