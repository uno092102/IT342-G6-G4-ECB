package edu.cit.ecb.Entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class BillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billID;

    private Date billDate;
    private float totalAmount;
    private Date dueDate;
    private int customerID;
    private int tariffID;

    @OneToMany
    @JoinColumn(name = "paymentId")
    private List<PaymentEntity> paymentId;

    public BillEntity()
    {
        super();
    }

    public BillEntity(int billID, Date billDate, float totalAmount, Date dueDate, int customerID, int tariffID)
    {
        super();
        this.billID = billID;
        this.billDate = billDate;
        this.totalAmount = totalAmount;
        this.dueDate = dueDate;
        this.customerID = customerID;
        this.tariffID = tariffID;
    }

    
    //SETTER
    public void setBillDate(Date billDate) {
        this.billDate = billDate;
    }

    public void setBillID(int billID) {
        this.billID = billID;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
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

    public int getCustomerID() {
        return customerID;
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
        return paymentId;
    }

    public void setPaymentId(List<PaymentEntity> paymentId) {
        this.paymentId = paymentId;
    }
}

