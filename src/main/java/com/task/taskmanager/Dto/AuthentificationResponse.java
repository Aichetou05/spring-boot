package com.task.taskmanager.Dto;

import com.task.taskmanager.enums.UserRole;

import lombok.Data;

@Data
public class AuthentificationResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;
}
