package edu.cit.ecb.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.DTO.LoginDTO;
import edu.cit.ecb.DTO.SignupDTO;
import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Repository.CustomerRepository;

@Service
public class CustomerAuthentication {
    @Autowired
    private final CustomerRepository crepo;

    public CustomerAuthentication(CustomerRepository customerRepository){
        this.crepo = customerRepository;
    }

    public CustomerEntity signupCustomer(SignupDTO signupRequest){
        CustomerEntity customer = new CustomerEntity();
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
        CustomerEntity customer = crepo.findByUsername(loginRequest.getUsername());

        return customer != null && loginRequest.getPassword().equals(customer.getPassword());
    }
}
