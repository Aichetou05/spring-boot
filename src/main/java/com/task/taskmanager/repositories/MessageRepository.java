package com.task.taskmanager.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.task.taskmanager.entities.Message;
import com.task.taskmanager.entities.User;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE m.receiver.id = :receiverId ORDER BY m.timestamp ASC")
    List<Message> findByReceiverId(@Param("receiverId") Long receiverId);

    @Query("SELECT m FROM Message m WHERE m.sender.id = :senderId ORDER BY m.timestamp ASC")
    List<Message> findBySenderId(@Param("senderId") Long senderId);

    @Query("SELECT m FROM Message m WHERE " +
           "(m.sender = :user1 AND m.receiver = :user2) OR " +
           "(m.sender = :user2 AND m.receiver = :user1) " +
           "ORDER BY m.timestamp ASC")
    List<Message> findConversation(@Param("user1") User user1, @Param("user2") User user2);
}

