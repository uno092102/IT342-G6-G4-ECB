package edu.cit.ecb.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.ChargeEntity;
import edu.cit.ecb.Repository.BillRepository;
import edu.cit.ecb.Repository.ChargeRepository;

@Service
public class ChargeService {

    @Autowired
    private ChargeRepository chargeRepository;

    @Autowired
    private BillRepository billRepository;

    // Create or add a new charge
    public ChargeEntity addCharge(int billId, String chargeType, double ratePerKwh, double amount) {
        BillEntity bill = billRepository.findById(billId).orElseThrow(() -> new NoSuchElementException("Bill not found"));
        ChargeEntity charge = new ChargeEntity(bill, chargeType, ratePerKwh, amount);
        return chargeRepository.save(charge);
    }

    // Get all charges for a specific bill
    public List<ChargeEntity> getChargesByBillId(int billId) {
        return chargeRepository.findByBill_BillId(billId);
    }

    // Get all charges of a specific type
    public List<ChargeEntity> getChargesByType(String chargeType) {
        return chargeRepository.findByChargeType(chargeType);
    }

    // Delete a charge by ID
    public void deleteCharge(int chargeId) {
        if (!chargeRepository.existsById(chargeId)) {
            throw new NoSuchElementException("Charge not found with ID: " + chargeId);
        }
        chargeRepository.deleteById(chargeId);
    }
}