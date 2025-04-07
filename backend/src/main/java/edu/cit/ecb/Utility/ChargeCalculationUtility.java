package edu.cit.ecb.Utility;

import java.util.List;

import edu.cit.ecb.Entity.ChargeEntity;
import edu.cit.ecb.Entity.ConsumptionEntity;
import edu.cit.ecb.Entity.TariffEntity;

public class ChargeCalculationUtility {

    // // Fixed Rates
    // private static final double GENERATION_RATE = 5.3145;
    // private static final double TRANSMISSION_RATE = 0.2996;
    // private static final double SYSTEM_LOSS_RATE = 0.6478;
    // private static final double DISTRIBUTION_RATE = 1.7506;
    // private static final double SUPPLY_RATE = 0.4118;
    // private static final double METERING_RATE = 0.6989;

    // // Tariff Rates
    // private static final double MISSIONARY_ELECTRIFICATION_RATE = 0.1561;
    // private static final double ENVIRONMENTAL_RATE = 0.0025;
    // private static final double NPC_STRANDED_DEBTS_RATE = 0.0428;

    public static double calculateTotalCharges(ConsumptionEntity consumption, List<ChargeEntity> charges) {
        double totalKwh = consumption.getTotalKwh();
        return charges.stream().mapToDouble(c -> totalKwh * c.getRatePerKwh()).sum();
    }

    public static double calculateDynamicTariffs(ConsumptionEntity consumption, List<TariffEntity> tariffs) {
        double totalKwh = consumption.getTotalKwh();
        return tariffs.stream().mapToDouble(t -> totalKwh * t.getRate()).sum();
    }

    public static double calculateFinalBill(ConsumptionEntity consumption, List<ChargeEntity> charges, List<TariffEntity> tariffs) {
        return calculateTotalCharges(consumption, charges) + calculateDynamicTariffs(consumption, tariffs);
    }

}
