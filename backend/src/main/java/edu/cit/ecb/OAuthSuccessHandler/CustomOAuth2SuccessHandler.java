package edu.cit.ecb.OAuthSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.IOException;

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

        // redirect to frontend
        response.sendRedirect("http://localhost:3000/dashboard");
    }
}

