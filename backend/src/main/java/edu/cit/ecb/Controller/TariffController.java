package edu.cit.ecb.Controller;

import edu.cit.ecb.Entity.TariffEntity;
import edu.cit.ecb.Service.TariffService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/tariffs")
public class TariffController {

    @Autowired
    private TariffService tariffService;

    // POST - Create a new tariff
    @PostMapping("/createTariff")
    public ResponseEntity<?> createTariff(@RequestBody TariffEntity tariff) {
        try {
            TariffEntity createdTariff = tariffService.postTariff(tariff);
            return ResponseEntity.ok(createdTariff);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating tariff: " + e.getMessage());
        }
    }

    // GET - Retrieve all tariffs
    @GetMapping("/getAll")
    public ResponseEntity<List<TariffEntity>> getAllTariffs() {
        return ResponseEntity.ok(tariffService.getAllTariff());
    }

    // PUT - Update an existing tariff
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTariff(@PathVariable int id, @RequestBody TariffEntity updatedTariff) {
        try {
            TariffEntity updated = tariffService.updateTariff(id, updatedTariff);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body("Error updating tariff: " + e.getMessage());
        }
    }

    // DELETE - Remove a tariff by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTariff(@PathVariable int id) {
        String message = tariffService.deleteTariff(id);
        return ResponseEntity.ok(message);
    }
}
