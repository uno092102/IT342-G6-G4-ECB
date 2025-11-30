package edu.cit.ecb.Entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Date;

@Entity
@Table(name = "payments")
public class PaymentEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;
    
    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    @JsonIgnore
    private BillEntity bill;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "payment_date")
    private Date paymentDate;
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "amount_paid")
    private float amountPaid;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    
    public PaymentEntity() {}
    
    public PaymentEntity(BillEntity bill, float amountPaid) {
        this.bill = bill;
        this.amountPaid = amountPaid;
        this.paymentDate = new Date();
    }
    
    public int getPaymentId() { return paymentId; }
    public void setPaymentId(int paymentId) { this.paymentId = paymentId; }
    
    public BillEntity getBill() { return bill; }
    public void setBill(BillEntity bill) { this.bill = bill; }
    
    public Date getPaymentDate() { return paymentDate; }
    public void setPaymentDate(Date paymentDate) { this.paymentDate = paymentDate; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public float getAmountPaid() { return amountPaid; }
    public void setAmountPaid(float amountPaid) { this.amountPaid = amountPaid; }
    
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = new Date();
        if (paymentDate == null) paymentDate = new Date();
    }
}
