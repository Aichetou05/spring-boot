package com.task.taskmanager.services.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.task.taskmanager.Dto.UserDto;
import com.task.taskmanager.repositories.UserRepository;
import com.task.taskmanager.entities.User; 
import com.task.taskmanager.enums.UserRole;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final UserRepository userRepository;

    @Override
    public List<UserDto> getUsers() {
        return userRepository
        .findAll()
        .stream()
        .filter(user -> user.getUserRole() == UserRole.EMPLOYEE)
        .map(User::getUserDto)
        .collect(Collectors.toList());
    }
    
}