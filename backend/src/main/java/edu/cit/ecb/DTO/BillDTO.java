package edu.cit.ecb.DTO;

import java.util.Date;

public class BillDTO {
    private int billId;
    private Date billDate;
    private Date dueDate;
    private float totalAmount;
    private String status;
    private String createdAt;

    // Constructor
    public BillDTO(int billId, Date billDate, Date dueDate, float totalAmount, String status, String createdAt) {
        this.billId = billId;
        this.billDate = billDate;
        this.dueDate = dueDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public Date getBillDate() {
        return billDate;
    }

    public void setBillDate(Date billDate) {
        this.billDate = billDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}