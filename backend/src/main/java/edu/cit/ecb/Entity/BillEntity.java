package edu.cit.ecb.Entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

@Entity
public class BillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "billid")
    private int billId;

    private Date billDate;
    private float totalAmount;
    private Date dueDate;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    @JsonIgnore // Changed from @JsonManagedReference
    private CustomerEntity customer;
    
    private int tariffID;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PaymentEntity> payments;

    public BillEntity()
    {
        super();
    }

    public BillEntity(int billId, Date billDate, float totalAmount, Date dueDate, CustomerEntity customer, int tariffID)
    {
        super();
        this.billId = billId;
        this.billDate = billDate;
        this.totalAmount = totalAmount;
        this.dueDate = dueDate;
        this.customer = customer;
        this.tariffID = tariffID;
    }

    public void setBillDate(Date billDate) {
        this.billDate = billDate;
    }

    public void setBillID(int billId) {
        this.billId = billId;
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
        return billId;
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

    public List<PaymentEntity> getPaymentId() {
        return payments;
    }

    public void setPaymentId(List<PaymentEntity> payments) {
        this.payments = payments;
    }

    public List<PaymentEntity> getPayments() {
        return payments;
    }

    public void setPayments(List<PaymentEntity> payments) {
        this.payments = payments;
    }
}

