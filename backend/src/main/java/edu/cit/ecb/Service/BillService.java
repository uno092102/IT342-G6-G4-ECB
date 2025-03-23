package edu.cit.ecb.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Repository.BillRepository;

@Service
public class BillService {
    @Autowired
    BillRepository brepo;

    public BillService()
    {
        super();
    }

    public BillEntity postBill(BillEntity bill)
    {
            return brepo.save(bill);
        
    }

    public List<BillEntity> getAllBill()
    {
        return brepo.findAll();
    }

    public BillEntity updateBill(int id, BillEntity updatedBill)
    {
        BillEntity newBill = brepo.findById(id).orElseThrow(() -> new NoSuchElementException("Bill ID does not exist."));

        newBill.setBillDate(updatedBill.getBillDate());
        newBill.setDueDate(updatedBill.getDueDate());

        return brepo.save(newBill);
    }

    public String deleteBill(int id)
    {
        Optional<BillEntity> billOptional = brepo.findById(id);
        if(billOptional.isPresent())
        {
            BillEntity bill = billOptional.get();
            brepo.delete(bill);

            return "Bill record successfully deleted";
        }
        else
        {
            return "Bill with ID \"" + id + "\" does not exist.";
        }
    }



}

