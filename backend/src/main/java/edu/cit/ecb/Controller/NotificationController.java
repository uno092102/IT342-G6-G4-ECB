package edu.cit.ecb.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.NotificationEntity;
import edu.cit.ecb.Service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/customer/{accountId}")
    public ResponseEntity<List<NotificationEntity>> getAllNotifications(@PathVariable int accountId) {
        return ResponseEntity.ok(notificationService.getAllNotificationsByCustomer(accountId));
    }

    @GetMapping("/unread/{accountId}")
    public ResponseEntity<List<NotificationEntity>> getUnreadNotifications(@PathVariable int accountId) {
        return ResponseEntity.ok(notificationService.getUnreadNotificationsByCustomer(accountId));
    }

    @PostMapping("/create")
    public ResponseEntity<NotificationEntity> createNotification(@RequestParam int accountId, @RequestParam String message) {
        return ResponseEntity.ok(notificationService.createNotification(accountId, message));
    }

    @PutMapping("/markAsRead/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable int notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok("Notification marked as read.");
    }

    @DeleteMapping("/delete/{notificationId}")
    public ResponseEntity<String> deleteNotification(@PathVariable int notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok("Notification deleted.");
    }
}
