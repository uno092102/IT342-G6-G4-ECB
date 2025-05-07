package edu.cit.ecb.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import edu.cit.ecb.DTO.LoginDTO;
import edu.cit.ecb.DTO.SignupDTO;
import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Enum.Role;
import edu.cit.ecb.Repository.UserRepository;
import edu.cit.ecb.Service.CustomerAuthentication;
import edu.cit.ecb.Service.UserService;
import edu.cit.ecb.JWT.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;



@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    UserService cserv;

    @Autowired
    CustomerAuthentication aserv;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // GET Home
    @GetMapping("/")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("✅ Electricity Consumption Billing Backend is running!");
    }
    

    @GetMapping("/print")
    public String print() {
        return "Welcome to Electricity Consumption Billing";
    }

    // View Customer Profile (Only accessible by the authenx`ticated customer)
    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<UserEntity> getCustomerProfile(Authentication authentication) {
        if (authentication == null) {
            System.out.println("⚠️ Authentication object is null");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        System.out.println("✅ Logged in as: " + authentication.getName());
        System.out.println("✅ Authorities: " + authentication.getAuthorities());

        UserEntity customer = cserv.findByUsername(authentication.getName());
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    // Get Profile Image
    @GetMapping("/profile/image/{accountId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable int accountId) {
        UserEntity customer = cserv.findByAccountId(accountId);
        if (customer == null || customer.getCustomerImage() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok().header("Content-Type", "image/jpeg").body(customer.getCustomerImage());
    }

    // Signup - Create Customer Account (Default role is CUSTOMER)
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupDTO signupRequest) {
        try {
            UserEntity customer = new UserEntity();
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
    public ResponseEntity<?> login(@RequestBody LoginDTO loginRequest) {
        boolean isAuthenticated = aserv.loginCustomer(loginRequest);
        if (isAuthenticated) {
            UserEntity user = aserv.findByUsernameOrEmail(loginRequest.getUsername());

            // ✅ Generate JWT token
            String jwtToken = jwtUtil.generateToken(user.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("accountId", user.getAccountId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole().toString());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Username or Password.");
        }
    }


    @PostMapping("/profile/uploadimage")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<?> uploadCustomerImage(@RequestParam("accountId") int accountId, @RequestParam("ownerImage") MultipartFile file) {
        try {
            UserEntity customer = cserv.findByAccountId(accountId);
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
    public ResponseEntity<?> editProfile(@PathVariable int id, @RequestBody UserEntity updatedProfile) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth.getName();

        UserEntity loggedInUser = userRepository.findByUsername(currentUsername);

        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
        }

        if (loggedInUser.getAccountId() != id) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update your own profile.");
        }

        try {
            UserEntity updated = cserv.updateProfile(id, updatedProfile);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile.");
        }
    }

    @GetMapping("/userinfo")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }

    @PutMapping("/complete-profile/{email}")
    public ResponseEntity<?> completeGoogleProfile(@PathVariable String email, @RequestBody UserEntity userInput) {
        UserEntity user = cserv.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        user.setFname(userInput.getFname());
        user.setLname(userInput.getLname());
        user.setPhoneNumber(userInput.getPhoneNumber());
        user.setAddress(userInput.getAddress());

        cserv.save(user);
        return ResponseEntity.ok("Profile completed.");
    }


}
