package edu.cit.ecb.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.BillEntity;
import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.Entity.CustomerEntity;
import edu.cit.ecb.Entity.TariffEntity;
import edu.cit.ecb.Repository.BillRepository;
import edu.cit.ecb.Repository.ConsumptionRepository;
import edu.cit.ecb.Repository.TariffRepository;
import edu.cit.ecb.Utility.ChargeCalculationUtility;

@Service
public class BillService {

    @Autowired
    private BillRepository brepo;

    @Autowired
    private CustomerService cserv;

    @Autowired
    private ConsumptionRepository crepo;

    @Autowired
    private TariffRepository trepo;

    public BillEntity postBill(BillEntity bill) {
        // Validate Customer
        CustomerEntity customer = cserv.findByAccountId(bill.getCustomer().getAccountId());
        if (customer == null) {
            throw new IllegalArgumentException("Customer not found.");
        }
        bill.setCustomer(customer);

        // Validate Consumption
        Optional<ConsumptionEntity> consumptionOpt = crepo.findById(bill.getConsumption().getConsumptionId());
        if (consumptionOpt.isEmpty()) {
            throw new IllegalArgumentException("Consumption data not found for Consumption ID: " + bill.getConsumption().getConsumptionId());
        }

        // Calculate Charges and Tariffs
        ConsumptionEntity consumption = consumptionOpt.get();
        double totalCharge = ChargeCalculationUtility.calculateTotalCharges(consumption);
        double totalTariff = ChargeCalculationUtility.calculateTotalTariffs(consumption);
        double finalBillAmount = totalCharge + totalTariff;

        // Set Bill Details
        bill.setBillDate(java.sql.Date.valueOf(LocalDate.now()));
        bill.setDueDate(java.sql.Date.valueOf(LocalDate.now().plusDays(30)));
        bill.setTotalAmount((float) finalBillAmount);
        bill.setStatus("Unpaid");

        // Save the Bill
        bill = brepo.save(bill);

        // Save the Tariff Types
        saveTariffRecord(bill, "Missionary Electrification");
        saveTariffRecord(bill, "Environmental");
        saveTariffRecord(bill, "NPC Stranded Debts");

        return bill;
    }

    private void saveTariffRecord(BillEntity bill, String tariffType) {
        TariffEntity tariff = new TariffEntity();
        tariff.setBilling(bill);
        tariff.setTariffType(tariffType);
        trepo.save(tariff);
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

        // Recalculate the bill using utility
        Optional<ConsumptionEntity> consumptionOpt = crepo.findById(existingBill.getConsumption().getConsumptionId());
        if (consumptionOpt.isEmpty()) {
            throw new IllegalArgumentException("Consumption data not found for Bill ID: " + existingBill.getBillId());
        }

        ConsumptionEntity consumption = consumptionOpt.get();
        double totalAmount = ChargeCalculationUtility.calculateFinalBill(consumption);
        existingBill.setTotalAmount((float) totalAmount);

        return brepo.save(existingBill);
    }

    public String deleteBill(int id) {
        if (!brepo.existsById(id)) {
            throw new IllegalArgumentException("Bill not found");
        }
        brepo.deleteById(id);
        return "Bill deleted successfully";
    }

    public BillEntity findBillById(int id) {
        return brepo.findByBillId(id);
    }

    public void calculateTotalBill(BillEntity bill) {
        // Retrieve the associated consumption data
        Optional<ConsumptionEntity> consumptionOpt = crepo.findById(bill.getConsumption().getConsumptionId());
        if (consumptionOpt.isEmpty()) {
            throw new RuntimeException("Consumption data not found for bill ID: " + bill.getBillId());
        }
        ConsumptionEntity consumption = consumptionOpt.get();
    
        // Calculate charges and tariffs using the utility
        double totalAmount = ChargeCalculationUtility.calculateFinalBill(consumption);
    
        bill.setTotalAmount((float) totalAmount);
    }
}
