package com.task.taskmanager.services.auth;

import com.task.taskmanager.Dto.SignupRequest;
import com.task.taskmanager.Dto.UserDto;

public interface AuthService {
    UserDto signupUser(SignupRequest signupRequest);

    boolean hasUserWithEmail(String email);
}
