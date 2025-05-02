package com.task.taskmanager.repositories;

import org.springframework.stereotype.Repository;

import com.task.taskmanager.entities.Task;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
}

