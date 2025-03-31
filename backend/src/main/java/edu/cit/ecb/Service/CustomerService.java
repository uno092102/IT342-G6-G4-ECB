package edu.cit.ecb.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Enum.Role;
import edu.cit.ecb.Repository.CustomerRepository;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository crepo;

    public CustomerService(){
        super();
    }

    public CustomerEntity postCustomerAccount(CustomerEntity customer) {
        if (customer.getRole() == null) {
            customer.setRole(Role.CUSTOMER); // Set CUSTOMER as default
        }
        return crepo.save(customer);
    }

    public List<CustomerEntity> getAllCustomers(){
        return crepo.findAll();
    }

    public CustomerEntity findByAccountId(int accountId) {
        return crepo.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public CustomerEntity findByEmail(String email) {
        return crepo.findByEmail(email);
    }

    public CustomerEntity updateProfile(int id, CustomerEntity updatedProfile){
        CustomerEntity customer = crepo.findById(id).orElseThrow(() -> new NoSuchElementException("Customer does not exist."));

        customer.setFname(updatedProfile.getFname());
        customer.setLname(updatedProfile.getLname());
        customer.setEmail(updatedProfile.getEmail());
        customer.setPhoneNumber(updatedProfile.getPhoneNumber());
        customer.setAddress(updatedProfile.getAddress());
        customer.setUsername(updatedProfile.getUsername());
        customer.setPassword(updatedProfile.getPassword());

        return crepo.save(customer);
    }

    public String deleteCustomer(int id){
        Optional<CustomerEntity> customerOptional = crepo.findById(id);
        if(customerOptional.isPresent()){
            CustomerEntity customer = customerOptional.get();
            customer.getBilling().clear();
            customer.getPayments().clear();
            crepo.delete(customer);

            return "Customer with ID \"" + id + "\" record successfully deleted";
        }else{
            return "Customer with ID \"" + id + "\" does not exist.";
        }
    }

    public CustomerEntity save(CustomerEntity customer){
        return crepo.save(customer);
    }

}
