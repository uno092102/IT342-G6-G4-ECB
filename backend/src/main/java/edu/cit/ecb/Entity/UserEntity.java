package edu.cit.ecb.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import edu.cit.ecb.Enum.Role;
import jakarta.persistence.*;

@Entity(name="user_entity")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;

    private String fname;
    private String lname;

    @Column(unique = true)
    private String email;

    private String phoneNumber;
    private String address;

    @Column(unique = true)
    private String username;

    @Column
    private String password;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Lob
    @Column(name = "customer_image")
    private byte[] customerImage;

    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference(value = "user-bill") 
    private List<BillEntity> bills;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "user-payment")
    private List<PaymentEntity> payments;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ConsumptionEntity> consumptions;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<NotificationEntity> notifications;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<FeedbackEntity> feedbacks;


    public UserEntity() {
        super();
    }

    public UserEntity(int accountId, String fname, String lname, String email, String phoneNumber, String address, 
    String username, String password, Role role, List<BillEntity> bills) {
        super();
        this.accountId = accountId;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.username = username;
        this.password = password;
        this.role = role;
        this.bills = bills;
    }

    public List<BillEntity> getBills() {
        return bills;
    }
    
    public void setBills(List<BillEntity> bills) {
        this.bills = bills;
    }
    

    public List<PaymentEntity> getPayments() {
        return payments;
    }

    public void setPayments(List<PaymentEntity> payments) {
        this.payments = payments;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public byte[] getCustomerImage() {
        return customerImage;
    }

    public void setCustomerImage(byte[] customerImage) {
        this.customerImage = customerImage;
    }

    public List<ConsumptionEntity> getConsumptions() {
        return consumptions;
    }
    
    public void setConsumptions(List<ConsumptionEntity> consumptions) {
        this.consumptions = consumptions;
    }
}

