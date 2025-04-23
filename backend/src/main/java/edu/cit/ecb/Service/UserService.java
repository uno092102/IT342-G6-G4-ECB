package edu.cit.ecb.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Enum.Role;
import edu.cit.ecb.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository crepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(){
        super();
    }

    public UserEntity postCustomerAccount(UserEntity customer) {
        if (customer.getRole() == null) {
            customer.setRole(Role.CUSTOMER); // Set CUSTOMER as default
        }
        return crepo.save(customer);
    }

    public List<UserEntity> getAllCustomers(){
        return crepo.findAll();
    }

    public UserEntity findByAccountId(int accountId) {
        return crepo.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public UserEntity findByEmail(String email) {
        return crepo.findByEmail(email);
    }

    public UserEntity findByUsername(String username) {
        return crepo.findByUsername(username);
    }
    
    public UserEntity updateProfile(int id, UserEntity updatedProfile) {
        UserEntity existingUser = crepo.findByAccountId(id);
    
        if (existingUser == null) {
            throw new RuntimeException("User not found with ID: " + id);
        }
    
        existingUser.setFname(updatedProfile.getFname());
        existingUser.setLname(updatedProfile.getLname());
        existingUser.setEmail(updatedProfile.getEmail());
        existingUser.setPhoneNumber(updatedProfile.getPhoneNumber());
        existingUser.setAddress(updatedProfile.getAddress());
        existingUser.setUsername(updatedProfile.getUsername());
    
        if (updatedProfile.getPassword() != null && !updatedProfile.getPassword().isBlank()) {
            existingUser.setPassword(passwordEncoder.encode(updatedProfile.getPassword()));
        }
    
        return crepo.save(existingUser);
    }
    

    public String deleteCustomer(int id){
        Optional<UserEntity> customerOptional = crepo.findById(id);
        if(customerOptional.isPresent()){
            UserEntity customer = customerOptional.get();
            customer.getBills().clear();
            customer.getPayments().clear();
            crepo.delete(customer);

            return "Customer with ID \"" + id + "\" record successfully deleted";
        }else{
            return "Customer with ID \"" + id + "\" does not exist.";
        }
    }

    public UserEntity save(UserEntity customer){
        return crepo.save(customer);
    }

}
