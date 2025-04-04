package edu.cit.ecb.Config;

import edu.cit.ecb.Entity.ChargeEntity;
import edu.cit.ecb.Entity.TariffEntity;
import edu.cit.ecb.Repository.ChargeRepository;
import edu.cit.ecb.Repository.TariffRepository;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RateSeederConfig {

    @Autowired
    private TariffRepository tariffRepository;

    @Autowired
    private ChargeRepository chargeRepository;

    @PostConstruct
    public void seedRates() {
        seedTariffs();
        seedCharges();
    }

    private void seedTariffs() {
        seedTariff("Missionary Electrification", 0.1561);
        seedTariff("Environmental", 0.0025);
        seedTariff("NPC Stranded Debts", 0.0428);
    }

    private void seedCharges() {
        seedCharge("Generation", 5.3145);
        seedCharge("Transmission", 0.2996);
        seedCharge("System Loss", 0.6478);
        seedCharge("Distribution", 1.7506);
        seedCharge("Supply", 0.4118);
        seedCharge("Metering", 0.6989);
    }

    private void seedTariff(String type, double rate) {
        if (!tariffRepository.existsByTariffType(type)) {
            TariffEntity tariff = new TariffEntity();
            tariff.setTariffType(type);
            tariff.setRate(rate);
            tariffRepository.save(tariff);
            System.out.println("✅ Tariff seeded: " + type);
        }
    }

    private void seedCharge(String type, double ratePerKwh) {
        if (!chargeRepository.existsByChargeType(type)) {
            ChargeEntity charge = new ChargeEntity();
            charge.setChargeType(type);
            charge.setRatePerKwh(ratePerKwh);
            chargeRepository.save(charge);
            System.out.println("✅ Charge seeded: " + type);
        }
    }
}
