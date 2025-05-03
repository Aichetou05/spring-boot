package com.task.taskmanager.services.admin;

import java.util.List;

import com.task.taskmanager.Dto.TaskDto;
import com.task.taskmanager.Dto.UserDto;

public interface AdminService {
    List<UserDto> getUsers();
    
    TaskDto createTaskDto(TaskDto taskDto);

    List<TaskDto> getAllTasks();

    void delateTask(Long id);

    TaskDto getTaskById(Long id);

    TaskDto updateTask(Long id,TaskDto taskDto);
    List<TaskDto> getTasksByPriority(String priority);
}