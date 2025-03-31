package edu.cit.ecb.Service;

import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Repository.CustomerRepository;
import edu.cit.ecb.Enum.Role;
import org.springframework.security.core.userdetails.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(@Lazy CustomerRepository customerRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomerEntity user = customerRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new User(user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().toString())));
    }

    public CustomerEntity saveAdmin(CustomerEntity admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole(Role.ADMIN);
        return customerRepository.save(admin);
    }

    public CustomerEntity saveCustomer(CustomerEntity customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setRole(Role.CUSTOMER);
        return customerRepository.save(customer);
    }
}
