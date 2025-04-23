package edu.cit.ecb.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.ChargeEntity;
import edu.cit.ecb.Entity.TariffEntity;
import edu.cit.ecb.Repository.BillRepository;
import edu.cit.ecb.Repository.ChargeRepository;

@Service
public class ChargeService {

    @Autowired
    private ChargeRepository chargeRepository;

    // Create or add a new charge
    public ChargeEntity addCharge(ChargeEntity charge) {
        return chargeRepository.save(charge);
    }

    //GET
    public List<ChargeEntity> getAllCharge() {
        return chargeRepository.findAll();
    }

    //UPDATE
    public ChargeEntity updateCharge(int id, ChargeEntity updatedCharge) {
        ChargeEntity newCharge = chargeRepository.findById(id).orElseThrow(() ->new NoSuchElementException("Tariff ID does not exist."));

        newCharge.setChargeType(updatedCharge.getChargeType());
        newCharge.setRatePerKwh(updatedCharge.getRatePerKwh());

        return chargeRepository.save(updatedCharge);
    }

    // Delete a charge by ID
    public void deleteCharge(int chargeId) {
        if (!chargeRepository.existsById(chargeId)) {
            throw new NoSuchElementException("Charge not found with ID: " + chargeId);
        }
        chargeRepository.deleteById(chargeId);
    }

    public Optional<ChargeEntity> findById(int id) {
        return chargeRepository.findById(id);
    }
    
    public ChargeEntity save(ChargeEntity charge) {
        return chargeRepository.save(charge);
    }
}