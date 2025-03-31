package edu.cit.ecb.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.cit.ecb.Entity.NotificationEntity;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {
    List<NotificationEntity> findByCustomer_AccountId(int accountId);
    List<NotificationEntity> findByIsReadFalseAndCustomer_AccountId(int accountId);
}
