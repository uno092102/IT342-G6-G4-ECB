package edu.cit.ecb.Entity;

import jakarta.persistence.*;

@Entity
public class ChargeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chargeId;

    private String chargeType; // Generation, Transmission, System Loss, etc.
    private double ratePerKwh;

    public ChargeEntity() {}

    public ChargeEntity(String chargeType, double ratePerKwh) {
        this.chargeType = chargeType;
        this.ratePerKwh = ratePerKwh;
    }

    public int getChargeId() {
        return chargeId;
    }

    public void setChargeId(int chargeId) {
        this.chargeId = chargeId;
    }

    public String getChargeType() {
        return chargeType;
    }

    public void setChargeType(String chargeType) {
        this.chargeType = chargeType;
    }

    public double getRatePerKwh() {
        return ratePerKwh;
    }

    public void setRatePerKwh(double ratePerKwh) {
        this.ratePerKwh = ratePerKwh;
    }
}
