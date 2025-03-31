package edu.cit.ecb.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ChargeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chargeId;

    @ManyToOne
    @JoinColumn(name = "billId", nullable = false)
    private BillEntity bill;

    private String chargeType; // Generation, Transmission, System Loss, etc.
    private double ratePerKwh;
    private double amount;

    public ChargeEntity() {}

    public ChargeEntity(BillEntity bill, String chargeType, double ratePerKwh, double amount) {
        this.bill = bill;
        this.chargeType = chargeType;
        this.ratePerKwh = ratePerKwh;
        this.amount = amount;
    }

    public int getChargeId() {
        return chargeId;
    }

    public void setChargeId(int chargeId) {
        this.chargeId = chargeId;
    }

    public BillEntity getBill() {
        return bill;
    }

    public void setBill(BillEntity bill) {
        this.bill = bill;
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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
