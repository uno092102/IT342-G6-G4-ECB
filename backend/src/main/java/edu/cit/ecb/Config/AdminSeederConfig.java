package edu.cit.ecb.Config;

import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Enum.Role;
import edu.cit.ecb.Repository.UserRepository;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AdminSeederConfig {

    @Autowired
    private UserRepository customerRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostConstruct
    public void init() {
        // Check if admin already exists
        if (customerRepository.findByUsername("admin") == null) {
            UserEntity admin = new UserEntity();
            admin.setFname("System");
            admin.setLname("Administrator");
            admin.setEmail("admin@ecb.com");
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123")); // default password
            admin.setPhoneNumber("0000000000");
            admin.setAddress("HQ");
            admin.setRole(Role.ADMIN);

            customerRepository.save(admin);
            System.out.println("✅ Default ADMIN user created: admin / admin123");
        } else {
            System.out.println("ℹ️ Admin user already exists.");
        }
    }
}
