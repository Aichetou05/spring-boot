package com.task.taskmanager.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthentificationRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
