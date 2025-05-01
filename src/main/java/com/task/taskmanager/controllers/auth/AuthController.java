package com.task.taskmanager.controllers.auth;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import com.task.taskmanager.Dto.AuthentificationRequest;
import com.task.taskmanager.Dto.AuthentificationResponse;
import com.task.taskmanager.Dto.SignupRequest;
import com.task.taskmanager.Dto.UserDto;
import com.task.taskmanager.entities.User;
import com.task.taskmanager.repositories.UserRepository;
import com.task.taskmanager.services.auth.AuthService;
import com.task.taskmanager.services.jwt.UserService;
import com.task.taskmanager.utils.JwtUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final UserService userService;

    private final AuthenticationManager authenticationManager;


    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody @Valid SignupRequest signupRequest){
        if(authService.hasUserWithEmail(signupRequest.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exit with this email!");
        }
        
        UserDto createUserDto = authService.signupUser(signupRequest);
        if(createUserDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not created!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createUserDto);
    }


    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthentificationRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email or password");
        }
    
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(request.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(request.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
    
        if(optionalUser.isPresent()){
            AuthentificationResponse response = new AuthentificationResponse();
            response.setJwt(jwtToken);
            response.setUserId(optionalUser.get().getId());
            response.setUserRole(optionalUser.get().getUserRole());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    
}
