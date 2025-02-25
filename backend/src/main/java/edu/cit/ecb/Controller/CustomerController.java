package edu.cit.ecb.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import edu.cit.ecb.DTO.LoginDTO;
import edu.cit.ecb.DTO.SignupDTO;
import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Service.CustomerAuthentication;
import edu.cit.ecb.Service.CustomerService;

@RestController
@RequestMapping("/customer")
//@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    @Autowired
    CustomerService cserv;

    @Autowired
    CustomerAuthentication aserv;



    //GET Methods
    @GetMapping("/")
    public String index(){
        return "index.html";
    }

    @GetMapping("/print")
    public String print(){
        return "Welcome to Electricity Consumption BIlling";
    }

    @GetMapping("/profile")
    public ResponseEntity<CustomerEntity> getCustomerProfile(@AuthenticationPrincipal CustomerEntity customerEntity){
        String email = customerEntity.getEmail();
        CustomerEntity customer = cserv.findByEmail(email);
        if(customer != null){
            return ResponseEntity.ok(customer);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/getallcustomers")
    public List<CustomerEntity> getAllCustomers(){
        return cserv.getAllCustomers();
    }

    @GetMapping("/profile/image/{accountId}")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable int accountId){
        CustomerEntity customer = cserv.findByAccountId(accountId);
        if(customer == null || customer.getCustomerImage() == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header("Content-Type", "image/jpeg")
                .body(customer.getCustomerImage());
    }




    //POST Methods
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupDTO signupRequest){
        aserv.signupCustomer(signupRequest);
        return ResponseEntity.ok("Signup Successful!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginRequest){
        boolean isAuthenticated = aserv.loginCustomer(loginRequest);
        if(isAuthenticated){
            return ResponseEntity.ok("Login Successful!");
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password.");
        }
    }

    @PostMapping("/postcustomer")
    public CustomerEntity postCustomerAccount(@RequestBody CustomerEntity customer){
        return cserv.postCustomerAccount(customer);
    }

    @PostMapping("/profile/uploadimage")
    public ResponseEntity<?> uploadCustomerImage(@RequestParam("accountId") int accountId, @RequestParam("ownerImage") MultipartFile file){
        try{
            CustomerEntity customer = cserv.findByAccountId(accountId);
            if(customer == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
            }

            customer.setCustomerImage(file.getBytes());
            cserv.save(customer);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image: " + e.getMessage());
        }
    }



    //PUT Methods
    @PutMapping("/profile/edit/{accountId}")
    public ResponseEntity<CustomerEntity> editProfile(@PathVariable int id, @RequestBody CustomerEntity updatedProfile){
        CustomerEntity updatedCustomer = cserv.updateProfile(id, updatedProfile);
        return ResponseEntity.ok(updatedCustomer);
    }



    //DELETE Methods
    @DeleteMapping("/deletecustomer")
    public String deleteCustomer(@PathVariable int id){
        return cserv.deleteCustomer(id);
    }

    



}