package edu.cit.ecb.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.ChargeEntity;
import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.Entity.UserEntity;
import edu.cit.ecb.Entity.TariffEntity;
import edu.cit.ecb.Repository.BillRepository;
import edu.cit.ecb.Repository.ChargeRepository;
import edu.cit.ecb.Repository.ConsumptionRepository;
import edu.cit.ecb.Repository.TariffRepository;
import edu.cit.ecb.Utility.ChargeCalculationUtility;

@Service
public class BillService {

    @Autowired
    private BillRepository brepo;

    @Autowired
    private UserService cserv;

    @Autowired
    private ConsumptionRepository crepo;

    @Autowired
    private TariffRepository trepo;

    @Autowired
    private ChargeRepository chargeRepo;

    public BillEntity postBill(BillEntity bill) {
        UserEntity customer = cserv.findByAccountId(bill.getCustomer().getAccountId());
        if (customer == null) throw new IllegalArgumentException("Customer not found.");
        bill.setCustomer(customer);
    
        ConsumptionEntity consumption = crepo.findById(bill.getConsumption().getConsumptionId())
            .orElseThrow(() -> new IllegalArgumentException("Consumption not found."));
    
        List<ChargeEntity> charges = chargeRepo.findAll();
        List<TariffEntity> tariffs = trepo.findAll();
    
        double finalBillAmount = ChargeCalculationUtility.calculateFinalBill(consumption, charges, tariffs);
    
        bill.setBillDate(Date.valueOf(LocalDate.now()));
        bill.setDueDate(Date.valueOf(LocalDate.now().plusDays(30)));
        bill.setTotalAmount((float) finalBillAmount);
        bill.setStatus("Unpaid");
    
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
                .orElseThrow(() -> new IllegalArgumentException("Bill not found"));
    
        existingBill.setBillDate(updatedBill.getBillDate());
        existingBill.setDueDate(updatedBill.getDueDate());
        existingBill.setCustomer(updatedBill.getCustomer());
        existingBill.setStatus(updatedBill.getStatus());
    
        // Validate and recalculate
        ConsumptionEntity consumption = crepo.findById(existingBill.getConsumption().getConsumptionId())
                .orElseThrow(() -> new IllegalArgumentException("Consumption data not found"));
    
        List<TariffEntity> tariffs = trepo.findAll();
        List<ChargeEntity> charges = chargeRepo.findAll();
    
        double totalAmount = ChargeCalculationUtility.calculateFinalBill(consumption, charges, tariffs);
        existingBill.setTotalAmount((float) totalAmount);
    
        return brepo.save(existingBill);
    }
    

    public String deleteBill(int id) {
        brepo.deleteById(id);
        return "Bill deleted successfully";
    }

    public BillEntity findBillById(int id) {
        return brepo.findByBillId(id);
    }

    public void calculateTotalBill(BillEntity bill) {
        ConsumptionEntity consumption = crepo.findById(bill.getConsumption().getConsumptionId())
                                            .orElseThrow(() -> new RuntimeException("Consumption not found"));

        List<TariffEntity> tariffs = trepo.findAll();
        List<ChargeEntity> charges = chargeRepo.findAll();

        double total = ChargeCalculationUtility.calculateFinalBill(consumption, charges, tariffs);
        bill.setTotalAmount((float) total);
    }

    public BillEntity save(BillEntity bill) {
        return brepo.save(bill);
    }
}
