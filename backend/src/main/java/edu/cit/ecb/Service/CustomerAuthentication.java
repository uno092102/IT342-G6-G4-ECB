package edu.cit.ecb.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.cit.ecb.DTO.LoginDTO;
import edu.cit.ecb.DTO.SignupDTO;
import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Repository.UserRepository;

@Service
public class CustomerAuthentication {
    @Autowired
    private final UserRepository crepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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
        customer.setPassword(signupRequest.getPassword());

        return crepo.save(customer);
    }

    public boolean loginCustomer(LoginDTO loginRequest){
        UserEntity customer = crepo.findByUsername(loginRequest.getUsername());

        return customer != null && passwordEncoder.matches(loginRequest.getPassword(), customer.getPassword());
    }
}
