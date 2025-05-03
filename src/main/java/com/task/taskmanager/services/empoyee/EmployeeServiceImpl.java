package com.task.taskmanager.services.empoyee;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.taskmanager.Dto.TaskDto;
import com.task.taskmanager.entities.Task;
import com.task.taskmanager.entities.User;
import com.task.taskmanager.repositories.TaskRepository;
import com.task.taskmanager.utils.JwtUtil;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    
    private final TaskRepository taskRepository;
    private final JwtUtil jwtUtil;


    @Override
    public List<TaskDto> getTasksByUserId() {
        User user = jwtUtil.getLogeedUser();
        if (user != null) {
            return taskRepository.findAllByUserId(user.getId())
                    .stream()
                    .sorted(Comparator.comparing(Task::getDueDate).reversed())
                    .map(Task::getTaskDto)
                    .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("User not found");
    }

}
