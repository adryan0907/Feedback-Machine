package nl.quiz.api.repository;


import nl.quiz.api.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    // default crud
}