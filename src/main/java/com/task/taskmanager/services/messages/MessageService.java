package com.task.taskmanager.services.messages;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.taskmanager.entities.Message;
import com.task.taskmanager.entities.User;
import com.task.taskmanager.repositories.MessageRepository;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    // Envoyer un message
    public Message sendMessage(String content, User sender, User receiver) {
        Message message = new Message(content, sender, receiver, java.time.LocalDateTime.now());
        return messageRepository.save(message);
    }

    // Récupérer les messages reçus par un utilisateur
    public List<Message> getMessagesForUser(User user) {
        return messageRepository.findByReceiverId(user.getId());
    }

    // Récupérer les messages envoyés par un utilisateur
    public List<Message> getSentMessagesForUser(User user) {
        return messageRepository.findBySenderId(user.getId());
    }

    public List<Message> getConversation(User user1, User user2) {
        return messageRepository.findConversation(user1, user2);
    }
    
}