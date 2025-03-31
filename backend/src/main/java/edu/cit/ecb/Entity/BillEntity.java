package edu.cit.ecb.Entity;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String status; // Added Status Field

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
<<<<<<< Updated upstream
    @JsonBackReference // Changed from @JsonManagedReference
=======
    @JsonIgnore
>>>>>>> Stashed changes
    private CustomerEntity customer;

    @ManyToOne
    @JoinColumn(name = "consumptionId", nullable = false)
    @JsonIgnore
    private ConsumptionEntity consumption; // Added Relationship

    @OneToMany(mappedBy = "billing", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<TariffEntity> tariffs; // Changed to OneToMany

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<PaymentEntity> payments;

    // Constructors
    public BillEntity() {
        super();
    }

    public BillEntity(int billId, Date billDate, float totalAmount, Date dueDate, CustomerEntity customer, ConsumptionEntity consumption, String status) {
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

    public CustomerEntity getCustomer() {
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

    public List<TariffEntity> getTariffs() {
        return tariffs;
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

    public void setCustomer(CustomerEntity customer) {
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

    public void setTariffs(List<TariffEntity> tariffs) {
        this.tariffs = tariffs;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
