package edu.cit.ecb.Entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ConsumptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consumptionId;

    @ManyToOne
    @JoinColumn(name = "accountId",nullable = false)
    private CustomerEntity accountId;
    
    private Date periodFrom;
    private Date periodTo;
    private int numDays;
    private float avgKwhPerDay;
    private float totalKwh;

    public ConsumptionEntity(){
        super();
    }

    public ConsumptionEntity(int consumptionId, CustomerEntity accountId, Date periodFrom, Date periodTo, int numDays, float avgKwhPerDay, float totalKwh){
        super();
        this.consumptionId = consumptionId;
        this.accountId = accountId;
        this.periodFrom = periodFrom;
        this.periodTo = periodTo;
        this.numDays = numDays;
        this.avgKwhPerDay = avgKwhPerDay;
        this.totalKwh = totalKwh;
    }

    //GETTERSETTER
    public int getConsumptionId() {
        return consumptionId;
    }

    public void setConsumptionId(int consumptionId) {
        this.consumptionId = consumptionId;
    }

    public CustomerEntity getAccountId() {
        return accountId;
    }

    public void setAccountId(CustomerEntity accountId) {
        this.accountId = accountId;
    }

    public Date getPeriodFrom() {
        return periodFrom;
    }

    public void setPeriodFrom(Date periodFrom) {
        this.periodFrom = periodFrom;
    }

    public Date getPeriodTo() {
        return periodTo;
    }

    public void setPeriodTo(Date periodTo) {
        this.periodTo = periodTo;
    }

    public int getNumDays() {
        return numDays;
    }

    public void setNumDays(int numDays) {
        this.numDays = numDays;
    }

    public float getAvgKwhPerDay() {
        return avgKwhPerDay;
    }

    public void setAvgKwhPerDay(float avgKwhPerDay) {
        this.avgKwhPerDay = avgKwhPerDay;
    }

    public float getTotalKwh() {
        return totalKwh;
    }

    public void setTotalKwh(float totalKwh) {
        this.totalKwh = totalKwh;
    }
     
}