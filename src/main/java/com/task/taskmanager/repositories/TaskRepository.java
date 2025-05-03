package com.task.taskmanager.repositories;

import org.springframework.stereotype.Repository;

import com.task.taskmanager.entities.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByPriorityIgnoreCase(String priority);

    List<Task> findAllByTitleContaining(String title);

    List<Task> findAllByUserId(Long id);
    
}

