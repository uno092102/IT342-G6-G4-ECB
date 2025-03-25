package edu.cit.ecb.Controller;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public BillEntity createBill(@RequestBody BillEntity bill, JwtAuthenticationToken token) {
        return billService.postBill(bill);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_read')")
    public List<BillEntity> getAllBills(JwtAuthenticationToken token) {
        return billService.getAllBill();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public BillEntity updateBill(@PathVariable int id, @RequestBody BillEntity bill, JwtAuthenticationToken token) {
        return billService.updateBill(id, bill);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write')")
    public String deleteBill(@PathVariable int id, JwtAuthenticationToken token) {
        return billService.deleteBill(id);
    }
}
