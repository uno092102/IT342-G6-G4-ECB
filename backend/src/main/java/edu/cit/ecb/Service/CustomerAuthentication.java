package edu.cit.ecb.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.cit.ecb.DTO.LoginDTO;
import edu.cit.ecb.DTO.SignupDTO;
import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Repository.UserRepository;

@Service
public class CustomerAuthentication {
    @Autowired
    private final UserRepository crepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CustomerAuthentication(UserRepository customerRepository){
        this.crepo = customerRepository;
    }

    public UserEntity signupCustomer(SignupDTO signupRequest){
        UserEntity customer = new UserEntity();
        customer.setFname(signupRequest.getFname());
        customer.setLname(signupRequest.getLname());
        customer.setEmail(signupRequest.getEmail());
        customer.setPhoneNumber(signupRequest.getPhoneNumber());
        customer.setAddress(signupRequest.getAddress());
        customer.setUsername(signupRequest.getUsername());
        customer.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        return crepo.save(customer);
    }

    public boolean loginCustomer(LoginDTO loginRequest) {
        String input = loginRequest.getUsername();
        UserEntity customer = crepo.findByUsername(input);
    
        if (customer == null) {
            customer = crepo.findByEmail(input);
        }
    
        if (customer != null) {
            boolean matched = passwordEncoder.matches(loginRequest.getPassword(), customer.getPassword());
            if (matched) {
                System.out.println("Login success for: " + input);
                return true;
            } else {
                System.out.println("Password mismatch for: " + input);
            }
        } else {
            System.out.println("No user found for: " + input);
        }
    
        return false;
    }    

    public UserEntity findByUsernameOrEmail(String input) {
        UserEntity user = crepo.findByUsername(input);
        if (user == null) {
            user = crepo.findByEmail(input);
        }
        return user;
    }    
}
