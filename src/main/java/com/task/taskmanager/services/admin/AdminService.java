package com.task.taskmanager.services.admin;

import java.util.List;

import com.task.taskmanager.Dto.UserDto;

public interface AdminService {
    List<UserDto> getUsers();
    
}