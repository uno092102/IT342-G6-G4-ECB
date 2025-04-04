package edu.cit.ecb.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.cit.ecb.Entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>{
    public UserEntity findByAccountId(Integer accountId);
    public UserEntity findByUsername(String username);
    public UserEntity findByEmail(String email);
} 
