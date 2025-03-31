package edu.cit.ecb.Utility;

import edu.cit.ecb.Entity.ConsumptionEntity;

public class ChargeCalculationUtility {

    // Fixed Rates
    private static final double GENERATION_RATE = 5.3145;
    private static final double TRANSMISSION_RATE = 0.2996;
    private static final double SYSTEM_LOSS_RATE = 0.6478;
    private static final double DISTRIBUTION_RATE = 1.7506;
    private static final double SUPPLY_RATE = 0.4118;
    private static final double METERING_RATE = 0.6989;

    // Tariff Rates
    private static final double MISSIONARY_ELECTRIFICATION_RATE = 0.1561;
    private static final double ENVIRONMENTAL_RATE = 0.0025;
    private static final double NPC_STRANDED_DEBTS_RATE = 0.0428;

    /**
     * Calculate total charges for a given consumption
     * @param consumption ConsumptionEntity
     * @return Total charge
     */
    public static double calculateTotalCharges(ConsumptionEntity consumption) {
        double totalKwh = consumption.getTotalKwh();

        // Basic Charges
        double generationCharge = totalKwh * GENERATION_RATE;
        double transmissionCharge = totalKwh * TRANSMISSION_RATE;
        double systemLossCharge = totalKwh * SYSTEM_LOSS_RATE;
        double distributionCharge = totalKwh * DISTRIBUTION_RATE;
        double supplyCharge = totalKwh * SUPPLY_RATE;
        double meteringCharge = totalKwh * METERING_RATE;

        return generationCharge + transmissionCharge + systemLossCharge +
               distributionCharge + supplyCharge + meteringCharge;
    }

    /**
     * Calculate total tariff charges for a given consumption
     * @param consumption ConsumptionEntity
     * @return Total tariff charge
     */
    public static double calculateTotalTariffs(ConsumptionEntity consumption) {
        double totalKwh = consumption.getTotalKwh();
        double missionaryCharge = totalKwh * MISSIONARY_ELECTRIFICATION_RATE;
        double environmentalCharge = totalKwh * ENVIRONMENTAL_RATE;
        double npcStrandedDebtCharge = totalKwh * NPC_STRANDED_DEBTS_RATE;
    
        return missionaryCharge + environmentalCharge + npcStrandedDebtCharge;
    }
    

    /**
     * Calculate final total bill amount (charges + tariffs)
     * @param consumption ConsumptionEntity
     * @return Total bill amount
     */
    public static double calculateFinalBill(ConsumptionEntity consumption) {
        double totalCharges = calculateTotalCharges(consumption);
        double totalTariffs = calculateTotalTariffs(consumption);

        return totalCharges + totalTariffs;
    }
}
