package edu.cit.ecb.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Repository.BillRepository;

@Service
public class BillService {
    @Autowired
    BillRepository brepo;

    @Autowired
    private CustomerService cserv;

    public BillService()
    {
        super();
    }

    public BillEntity postBill(BillEntity bill) {
        CustomerEntity customer = cserv.findByAccountId(bill.getCustomer().getAccountId());
        if (customer == null) {
            throw new RuntimeException("Customer not found.");
        }
        bill.setCustomer(customer);
        return brepo.save(bill);
    }

    public List<BillEntity> getAllBill() {
        return brepo.findAll();
    }

    public List<BillEntity> getBillsByCustomerId(int customerId) {
        return brepo.findByCustomer_AccountId(customerId);
    }

    public BillEntity updateBill(int id, BillEntity updatedBill) {
        BillEntity existingBill = brepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
        
        existingBill.setBillDate(updatedBill.getBillDate());
        existingBill.setTotalAmount(updatedBill.getTotalAmount());
        existingBill.setDueDate(updatedBill.getDueDate());
        existingBill.setCustomer(updatedBill.getCustomer());
        existingBill.setTariffID(updatedBill.getTariffID());
        
        return brepo.save(existingBill);
    }

    public String deleteBill(int id) {
        if (!brepo.existsById(id)) {
            throw new RuntimeException("Bill not found");
        }
        brepo.deleteById(id);
        return "Bill deleted successfully";
    }

    public BillEntity findBillById(int id) {
        BillEntity bill = brepo.findByBillId(id);
        if (bill == null) {
            throw new RuntimeException("Bill not found");
        }
        return bill;
    }
}

