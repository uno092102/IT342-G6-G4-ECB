package edu.cit.ecb.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cit.ecb.Entity.FeedbackEntity;
import edu.cit.ecb.Service.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/customer/{accountId}")
    public ResponseEntity<?> getAllFeedback(@PathVariable int accountId) {
        try {
            List<FeedbackEntity> feedbackList = feedbackService.getAllFeedbackByCustomer(accountId);
            return ResponseEntity.ok(feedbackList);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestParam int accountId, @RequestParam String message) {
        try {
            FeedbackEntity feedback = feedbackService.submitFeedback(accountId, message);
            return ResponseEntity.ok(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{feedbackId}")
    public ResponseEntity<String> deleteFeedback(@PathVariable int feedbackId) {
        try {
            feedbackService.deleteFeedback(feedbackId);
            return ResponseEntity.ok("Feedback deleted.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}