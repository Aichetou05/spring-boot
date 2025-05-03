package com.task.taskmanager.controllers.admin;

import java.util.List;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.taskmanager.Dto.TaskDto;
import com.task.taskmanager.entities.Task;
import com.task.taskmanager.entities.User;
import com.task.taskmanager.repositories.TaskRepository;
import com.task.taskmanager.repositories.UserRepository;
import com.task.taskmanager.services.admin.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;


     @Autowired
    private UserRepository userRepository;


    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(adminService.getUsers());
    }

    @PostMapping("/task")
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
        TaskDto createdTaskDto = adminService.createTaskDto(taskDto);
        if(createdTaskDto == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTaskDto);
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        List<TaskDto> tasks = adminService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        adminService.delateTask(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id){
        return ResponseEntity.ok(adminService.getTaskById(id));
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,@RequestBody TaskDto taskDto){
        TaskDto updateTaskDto = adminService.updateTask(id,taskDto);
        if(updateTaskDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updateTaskDto);
    }

    @GetMapping("/tasks/filter")
    public ResponseEntity<List<TaskDto>> getTasksByPriority(@RequestParam(value = "priority", required = false) String priority) {
        if (priority != null && !priority.isEmpty()) {
            return ResponseEntity.ok(adminService.getTasksByPriority(priority));
        } else {
            return ResponseEntity.ok(adminService.getAllTasks());
        }
    }
    
    @GetMapping("/searchUser")
    public List<User> searchUsers(@RequestParam(required = false) String name, 
                                  @RequestParam(required = false) String email) {
        if (name != null && email != null) {
            return userRepository.findByNameContainingOrEmailContaining(name, email);
        } else if (name != null) {
            return userRepository.findByNameContaining(name);
        } else if (email != null) {
            return userRepository.findByEmailContaining(email);
        } else {
            return userRepository.findAll();
        }
    }

    

}
