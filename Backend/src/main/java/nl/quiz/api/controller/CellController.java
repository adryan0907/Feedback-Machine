package nl.quiz.api.controller;

import nl.quiz.api.entity.Cell;
import nl.quiz.api.service.CellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cells")
public class CellController {

    @Autowired
    private CellService cellService;

    // Create or update multiple cells
    @PostMapping
    public List<Cell> saveCells(@RequestBody String[][] colorArray) {
        List<Cell> cells = new ArrayList<>();
        for (int i = 0; i < colorArray.length; i++) {
            for (int j = 0; j < colorArray[i].length; j++) {
                Cell cell = new Cell();
                cell.setColor(colorArray[i][j]);
                cells.add(cell);
            }
        }
        return cellService.saveAllCells(cells);
    }

    // Get all cells
    @GetMapping
    public List<Cell> getAllCells() {
        return cellService.getAllCells();
    }

    // Get cell by ID
    @GetMapping("/{id}")
    public Optional<Cell> getCellById(@PathVariable Long id) {
        return cellService.getCellById(id);
    }

    // Update cell by ID
    @PutMapping("/{id}")
    public Cell updateCell(@PathVariable Long id, @RequestBody Cell updatedCell) {
        return cellService.updateCell(id, updatedCell);
    }

    // Delete cell by ID
    @DeleteMapping("/{id}")
    public void deleteCellById(@PathVariable Long id) {
        cellService.deleteCellById(id);
    }
}
