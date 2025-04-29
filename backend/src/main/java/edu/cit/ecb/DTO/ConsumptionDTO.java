package edu.cit.ecb.DTO;

import java.sql.Date;

public class ConsumptionDTO {
    private int consumptionId;
    private String customerFullName;
    private Date periodFrom;
    private Date periodTo;
    private int numDays;
    private float avgKwhPerDay;
    private float totalKwh;

    public ConsumptionDTO() {}

    public ConsumptionDTO(int consumptionId, String customerFullName, Date periodFrom, Date periodTo, int numDays, float avgKwhPerDay, float totalKwh) {
        this.consumptionId = consumptionId;
        this.customerFullName = customerFullName;
        this.periodFrom = periodFrom;
        this.periodTo = periodTo;
        this.numDays = numDays;
        this.avgKwhPerDay = avgKwhPerDay;
        this.totalKwh = totalKwh;
    }

    public int getConsumptionId() {
        return consumptionId;
    }

    public void setConsumptionId(int consumptionId) {
        this.consumptionId = consumptionId;
    }

    public String getCustomerFullName() {
        return customerFullName;
    }

    public void setCustomerFullName(String customerFullName) {
        this.customerFullName = customerFullName;
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
