package com.task.taskmanager.services.jwt;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.task.taskmanager.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    
    @Override
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findFirstByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    
}
