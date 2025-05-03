package com.task.taskmanager.services.empoyee;

import java.util.List;

import com.task.taskmanager.Dto.TaskDto;

public interface EmployeeService {
    List<TaskDto> getTasksByUserId();
}
