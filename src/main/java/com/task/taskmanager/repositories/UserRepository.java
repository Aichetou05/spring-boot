package com.task.taskmanager.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.taskmanager.entities.User;
import com.task.taskmanager.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByEmail(String username);

    Optional<User> findByUserRole(UserRole userRole);

    // Recherche par nom ou email
    List<User> findByNameContainingOrEmailContaining(String name, String email);

    // Recherche par nom
    List<User> findByNameContaining(String name);

    // Recherche par email
    List<User> findByEmailContaining(String email);

    Optional<User> findByEmail(String email);

}