package nl.quiz.api.repository;


import nl.quiz.api.entity.Cell;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CellRepository extends JpaRepository<Cell, Long> {
    // crud methods
}