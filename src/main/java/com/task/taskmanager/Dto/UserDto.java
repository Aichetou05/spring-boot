package com.task.taskmanager.Dto;

import com.task.taskmanager.enums.UserRole;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole userRole;
}
