package edu.cit.ecb.Entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "bills")
public class BillEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billId;
    
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    @JsonIgnore  // Prevent circular reference
    private UserEntity customer;
    
    @OneToOne
    @JoinColumn(name = "consumption_id", nullable = true)
    @JsonIgnore  // Prevent circular reference
    private ConsumptionEntity consumption;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "bill_date")
    private Date billDate;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "due_date")
    private Date dueDate;
    
    @Column(name = "total_amount")
    private float totalAmount;
    
    @Column(name = "status", nullable = false)
    private String status = "UNPAID";
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    
    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL)
    @JsonIgnore  // Prevent circular reference
    private List<PaymentEntity> payments;
    
    // Constructors
    public BillEntity() {}
    
    public BillEntity(UserEntity customer, ConsumptionEntity consumption) {
        this.customer = customer;
        this.consumption = consumption;
        this.status = "UNPAID";
    }
    
    // Getters and Setters
    public int getBillId() { return billId; }
    public void setBillId(int billId) { this.billId = billId; }
    public UserEntity getCustomer() { return customer; }
    public void setCustomer(UserEntity customer) { this.customer = customer; }
    public ConsumptionEntity getConsumption() { return consumption; }
    public void setConsumption(ConsumptionEntity consumption) { this.consumption = consumption; }
    public Date getBillDate() { return billDate; }
    public void setBillDate(Date billDate) { this.billDate = billDate; }
    public Date getDueDate() { return dueDate; }
    public void setDueDate(Date dueDate) { this.dueDate = dueDate; }
    public float getTotalAmount() { return totalAmount; }
    public void setTotalAmount(float totalAmount) { this.totalAmount = totalAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public List<PaymentEntity> getPayments() { return payments; }
    public void setPayments(List<PaymentEntity> payments) { this.payments = payments; }
    
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = new Date();
        if (status == null || status.isEmpty()) status = "UNPAID";
    }
}
