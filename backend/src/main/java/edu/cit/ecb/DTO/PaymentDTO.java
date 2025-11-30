package edu.cit.ecb.DTO;

public class PaymentDTO {
    private int paymentId;
    private int billId;
    private String paymentDate;
    private String paymentMethod;
    private double amountPaid;

    public PaymentDTO() {}

    public PaymentDTO(int paymentId, int billId, String paymentDate, String paymentMethod, double amountPaid) {
        this.paymentId = paymentId;
        this.billId = billId;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.amountPaid = amountPaid;
    }

    public int getPaymentId() { return paymentId; }
    public void setPaymentId(int paymentId) { this.paymentId = paymentId; }
    
    public int getBillId() { return billId; }
    public void setBillId(int billId) { this.billId = billId; }
    
    public String getPaymentDate() { return paymentDate; }
    public void setPaymentDate(String paymentDate) { this.paymentDate = paymentDate; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public double getAmountPaid() { return amountPaid; }
    public void setAmountPaid(double amountPaid) { this.amountPaid = amountPaid; }
}