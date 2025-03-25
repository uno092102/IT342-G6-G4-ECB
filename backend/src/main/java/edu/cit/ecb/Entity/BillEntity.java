package edu.cit.ecb.Entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billID;



    private Date billDate;
    private float totalAmount;
    private Date dueDate;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    @JsonBackReference
    private CustomerEntity customer;

    private int tariffID;

    public BillEntity()
    {
        super();
    }

    public BillEntity(int billID, Date billDate, float totalAmount, Date dueDate, CustomerEntity account, int tariffID)
    {
        super();
        this.billID = billID;
        this.billDate = billDate;
        this.totalAmount = totalAmount;
        this.dueDate = dueDate;
        this.customer = customer;
        this.tariffID = tariffID;
    }

    
    //SETTER
    public void setBillDate(Date billDate) {
        this.billDate = billDate;
    }

    public void setBillID(int billID) {
        this.billID = billID;
    }

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public void setTariffID(int tariffID) {
        this.tariffID = tariffID;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    //GETTER
    public Date getBillDate() {
        return billDate;
    }

    public int getBillID() {
        return billID;
    }

    public CustomerEntity getCustomer() {
        return customer;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public int getTariffID() {
        return tariffID;
    }

    public float getTotalAmount() {
        return totalAmount;
    }
}

