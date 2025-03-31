package edu.cit.ecb.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import edu.cit.ecb.DTO.LoginDTO;
import edu.cit.ecb.DTO.SignupDTO;
import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Enum.Role;
import edu.cit.ecb.Service.CustomerAuthentication;
import edu.cit.ecb.Service.CustomerService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerService cserv;

    @Autowired
    CustomerAuthentication aserv;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // GET Home
    @GetMapping("/")
    public String index() {
        return "Welcome to the Electricity Consumption Billing System";
    }

    @GetMapping("/print")
    public String print() {
        return "Welcome to Electricity Consumption Billing";
    }

    // View Customer Profile (Only accessible by the authenticated customer)
    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<CustomerEntity> getCustomerProfile(@AuthenticationPrincipal CustomerEntity customerEntity) {
        String email = customerEntity.getEmail();
        CustomerEntity customer = cserv.findByEmail(email);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get Profile Image
    @GetMapping("/profile/image/{accountId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable int accountId) {
        CustomerEntity customer = cserv.findByAccountId(accountId);
        if (customer == null || customer.getCustomerImage() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok().header("Content-Type", "image/jpeg").body(customer.getCustomerImage());
    }

    // Signup - Create Customer Account (Default role is CUSTOMER)
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupDTO signupRequest) {
        try {
            CustomerEntity customer = new CustomerEntity();
            customer.setFname(signupRequest.getFname());
            customer.setLname(signupRequest.getLname());
            customer.setEmail(signupRequest.getEmail());
            customer.setPhoneNumber(signupRequest.getPhoneNumber());
            customer.setAddress(signupRequest.getAddress());
            customer.setUsername(signupRequest.getUsername());
            customer.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            
            // Set default role to CUSTOMER
            customer.setRole(Role.CUSTOMER);

            cserv.postCustomerAccount(customer);
            return ResponseEntity.ok("Signup Successful!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Customer Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginRequest) {
        boolean isAuthenticated = aserv.loginCustomer(loginRequest);
        if (isAuthenticated) {
            return ResponseEntity.ok("Login Successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password.");
        }
    }

    @PostMapping("/profile/uploadimage")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> uploadCustomerImage(@RequestParam("accountId") int accountId, @RequestParam("ownerImage") MultipartFile file) {
        try {
            CustomerEntity customer = cserv.findByAccountId(accountId);
            if (customer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
            }
            customer.setCustomerImage(file.getBytes());
            cserv.save(customer);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image: " + e.getMessage());
        }
    }

    // Edit Customer Profile (Only customers can edit their own profiles)
    @PutMapping("/profile/edit/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<CustomerEntity> editProfile(@PathVariable int id, @RequestBody CustomerEntity updatedProfile) {
        CustomerEntity updatedCustomer = cserv.updateProfile(id, updatedProfile);
        return ResponseEntity.ok(updatedCustomer);
    }
}
