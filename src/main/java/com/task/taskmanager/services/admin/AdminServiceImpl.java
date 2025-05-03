package com.task.taskmanager.services.admin;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.task.taskmanager.Dto.TaskDto;
import com.task.taskmanager.Dto.UserDto;
import com.task.taskmanager.entities.Task;
import com.task.taskmanager.repositories.UserRepository;

import jakarta.xml.bind.annotation.XmlElement.DEFAULT;

import com.task.taskmanager.entities.User; 
import com.task.taskmanager.enums.TaskStatus;
import com.task.taskmanager.enums.UserRole;
import com.task.taskmanager.repositories.TaskRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final UserRepository userRepository;

    private final TaskRepository taskRepository;


    @Override
    public List<UserDto> getUsers() {
        return userRepository
        .findAll()
        .stream()
        .filter(user -> user.getUserRole() == UserRole.EMPLOYEE)
        .map(User::getUserDto)
        .collect(Collectors.toList());
    }

    @Override
    public TaskDto createTaskDto(TaskDto taskDto) {
        Optional<User> optionalUser = userRepository.findById(taskDto.getEmployeeId());
        if(optionalUser.isPresent()){
            Task task = new Task();
            task.setTitle(taskDto.getTitle());
            task.setDescription(taskDto.getDescription());
            task.setPriority(taskDto.getPriority());
            task.setDueDate(taskDto.getDueDate());
            task.setTaskStatus(TaskStatus.INPROGRESS);
            task.setUser(optionalUser.get());
            return taskRepository.save(task).getTaskDto();
        }
        return null;
    }

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll()
        .stream()
        .sorted(Comparator.comparing(Task::getDueDate).reversed())
        .map(Task::getTaskDto)
        .collect(Collectors.toList());
    }

    @Override
    public void delateTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.map(Task::getTaskDto).orElse(null);
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        Optional<User> optionalUser = userRepository.findById(taskDto.getEmployeeId());
        if (optionalTask.isPresent() && optionalUser.isPresent()) {
            Task existingTask = optionalTask.get();
            existingTask.setTitle(taskDto.getTitle());
            existingTask.setDescription(taskDto.getDescription());
            existingTask.setDueDate(taskDto.getDueDate());
            existingTask.setPriority(taskDto.getPriority());
            existingTask.setTaskStatus(mapStringToTaskStatus(String.valueOf(taskDto.getTaskStatus())));
            
            existingTask.setUser(optionalUser.get());
            return taskRepository.save(existingTask).getTaskDto();
        }
        return null;
    }

    private TaskStatus mapStringToTaskStatus(String status) {
        return switch (status) {
            case "PENDING" -> TaskStatus.PENDING;
            case "COMPLETED" -> TaskStatus.COMPLETED;
            case "DEFERRED" -> TaskStatus.DEFERRED;
            case "CANCELLED" -> TaskStatus.CANCELLED;
            default -> TaskStatus.INPROGRESS;
        };
    }
    
    @Override
    public List<TaskDto> getTasksByPriority(String priority) {
        List<Task> tasks = taskRepository.findByPriorityIgnoreCase(priority);
        return tasks.stream()
                    .map(Task::getTaskDto)
                    .toList();
    }

    
}