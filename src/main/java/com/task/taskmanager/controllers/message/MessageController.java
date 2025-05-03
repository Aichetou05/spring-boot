package com.task.taskmanager.controllers.message;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.task.taskmanager.entities.Message;
import com.task.taskmanager.entities.User;
import com.task.taskmanager.repositories.UserRepository;
import com.task.taskmanager.services.jwt.JwtService;
import com.task.taskmanager.services.messages.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public MessageController(MessageService messageService, UserRepository userRepository, JwtService jwtService) {
        this.messageService = messageService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    /**
     * Récupérer les messages entre l'utilisateur connecté et un autre utilisateur
     */
    @GetMapping("/{otherUserId}")
    public ResponseEntity<List<Message>> getMessagesWithUser(
            @PathVariable Long otherUserId,
            @RequestHeader("Authorization") String token) {

        // Extraire username à partir du JWT
        String jwt = token.replace("Bearer ", "");
        String currentUsername = jwtService.extractUsername(jwt);

        // Trouver l'utilisateur courant
        User currentUser = userRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        // Trouver l'autre utilisateur
        User otherUser = userRepository.findById(otherUserId)
                .orElseThrow(() -> new UsernameNotFoundException("Autre utilisateur non trouvé"));

        // Récupérer la conversation entre les deux utilisateurs
        List<Message> messages = messageService.getConversation(currentUser, otherUser);

        return ResponseEntity.ok(messages);
    }
}
