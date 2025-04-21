package edu.cit.ecb.Entity;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;


@Entity
public class BillEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "billid")
    private int billId;

    private Date billDate;
    private float totalAmount;
    private Date dueDate;
    private String status; // Added Status Field

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    @JsonIgnore // Changed from @JsonManagedReference
    private UserEntity customer;

    @ManyToOne
    @JoinColumn(name = "consumptionId", nullable = false)
    @JsonIgnore
    private ConsumptionEntity consumption; // Added Relationship

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PaymentEntity> payments;

    // Constructors
    public BillEntity() {
        super();
    }

    public BillEntity(int billId, Date billDate, float totalAmount, Date dueDate, UserEntity customer, ConsumptionEntity consumption, String status) {
        super();
        this.billId = billId;
        this.billDate = billDate;
        this.totalAmount = totalAmount;
        this.dueDate = dueDate;
        this.customer = customer;
        this.consumption = consumption;
        this.status = status;
    }

    // Getters
    public Date getBillDate() {
        return billDate;
    }

    public int getBillId() {
        return billId;
    }

    public UserEntity getCustomer() {
        return customer;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public List<PaymentEntity> getPayments() {
        return payments;
    }

    public ConsumptionEntity getConsumption() {
        return consumption;
    }

    public String getStatus() {
        return status;
    }

    // Setters
    public void setBillDate(Date billDate) {
        this.billDate = billDate;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public void setCustomer(UserEntity customer) {
        this.customer = customer;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setPayments(List<PaymentEntity> payments) {
        this.payments = payments;
    }

    public void setConsumption(ConsumptionEntity consumption) {
        this.consumption = consumption;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
