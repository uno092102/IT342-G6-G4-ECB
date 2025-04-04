package edu.cit.ecb.Service;

import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Repository.UserRepository;
import edu.cit.ecb.Enum.Role;
import org.springframework.security.core.userdetails.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(@Lazy UserRepository customerRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = customerRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new User(user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().toString())));
    }

    public UserEntity saveAdmin(UserEntity admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole(Role.ADMIN);
        return customerRepository.save(admin);
    }

    public UserEntity saveCustomer(UserEntity customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setRole(Role.CUSTOMER);
        return customerRepository.save(customer);
    }
}
