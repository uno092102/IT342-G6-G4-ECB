package edu.cit.ecb.OAuthSuccessHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Enum.Role;
import edu.cit.ecb.Repository.UserRepository;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        UserEntity user = userRepository.findByEmail(email);

        if (user == null) {
            user = new UserEntity();
            user.setEmail(email);
            user.setFname(name.split(" ")[0]);
            user.setLname(name.contains(" ") ? name.substring(name.indexOf(" ") + 1) : "");
            user.setUsername(email.split("@")[0]);
            user.setPassword("GOOGLE_USER");
            user.setRole(Role.CUSTOMER);
            userRepository.save(user);
        }

        // 👇 Pass user role and email to frontend
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().toString());
        User userPrincipal = new User(user.getUsername(), "", List.of(new SimpleGrantedAuthority(user.getRole().toString())));
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        SecurityContextHolder.getContext().setAuthentication(auth);
        System.out.println("Authority after OAuth login: " + auth.getAuthorities());

        String redirectUrl = String.format("http://localhost:3000/oauth2-success?role=%s&email=%s",
            URLEncoder.encode(user.getRole().name(), StandardCharsets.UTF_8),
            URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8));

        response.sendRedirect(redirectUrl);

    }
}
