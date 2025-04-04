package edu.cit.ecb.Service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Entity.FeedbackEntity;
import edu.cit.ecb.Repository.FeedbackRepository;
import edu.cit.ecb.Repository.UserRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository frepo;

    @Autowired
    private UserRepository crepo;

    public List<FeedbackEntity> getAllFeedbackByCustomer(int accountId) {
        return frepo.findByCustomer_AccountId(accountId);
    }

    public FeedbackEntity submitFeedback(int accountId, String message) {
        UserEntity customer = crepo.findByAccountId(accountId);
        if (customer == null) {
            throw new RuntimeException("Customer not found.");
        }

        FeedbackEntity feedback = new FeedbackEntity(customer, message, new Date(System.currentTimeMillis()));
        return frepo.save(feedback);
    }

    public void deleteFeedback(int feedbackId) {
        frepo.deleteById(feedbackId);
    }
}
