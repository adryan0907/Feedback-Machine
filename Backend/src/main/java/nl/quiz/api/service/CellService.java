package nl.quiz.api.service;

import nl.quiz.api.entity.Cell;
import nl.quiz.api.repository.CellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CellService {

    @Autowired
    private CellRepository cellRepository;

    // Create or Update multiple cells
    public List<Cell> saveAllCells(List<Cell> cells) {
        return cellRepository.saveAll(cells);
    }

    // Get all cells
    public List<Cell> getAllCells() {
        return cellRepository.findAll();
    }

    // Get cell by ID
    public Optional<Cell> getCellById(Long id) {
        return cellRepository.findById(id);
    }

    // Update cell by ID
    public Cell updateCell(Long id, Cell updatedCell) {
        return cellRepository.findById(id).map(cell -> {
            cell.setColor(updatedCell.getColor());
            return cellRepository.save(cell);
        }).orElseThrow(() -> new RuntimeException("Cell not found with id " + id));
    }

    // Delete cell by ID
    public void deleteCellById(Long id) {
        cellRepository.deleteById(id);
    }
}