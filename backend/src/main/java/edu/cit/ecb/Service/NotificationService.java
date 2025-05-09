package edu.cit.ecb.Service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Entity.NotificationEntity;
import edu.cit.ecb.Repository.NotificationRepository;
import edu.cit.ecb.Repository.UserRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository nrepo;

    @Autowired
    private UserRepository crepo;

    public List<NotificationEntity> getAllNotificationsByCustomer(int accountId) {
        return nrepo.findByCustomer_AccountId(accountId);
    }

    public List<NotificationEntity> getAllNotifications() {
        return nrepo.findAll();
    }

    public List<NotificationEntity> getUnreadNotificationsByCustomer(int accountId) {
        return nrepo.findByIsReadFalseAndCustomer_AccountId(accountId);
    }

    public List<NotificationEntity> getReadNotificationsByCustomer(int accountId) {
        return nrepo.findByIsReadTrueAndCustomer_AccountId(accountId);
    }

    public NotificationEntity createNotification(int accountId, String message) {
        UserEntity customer = crepo.findByAccountId(accountId);
        if (customer == null) {
            throw new RuntimeException("Customer not found.");
        }

        NotificationEntity notification = new NotificationEntity(customer, message, new Date(System.currentTimeMillis()), false);
        return nrepo.save(notification);
    }

    public void markNotificationAsRead(int notificationId) {
        NotificationEntity notification = nrepo.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        nrepo.save(notification);
    }

    public void deleteNotification(int notificationId) {
        nrepo.deleteById(notificationId);
    }
}
