package edu.cit.ecb.Entity;

import java.util.List;

<<<<<<< Updated upstream
=======
import com.fasterxml.jackson.annotation.JsonIgnore;
>>>>>>> Stashed changes
import com.fasterxml.jackson.annotation.JsonManagedReference;

<<<<<<< Updated upstream
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
=======
import edu.cit.ecb.Enum.Role;
import jakarta.persistence.*;
>>>>>>> Stashed changes

@Entity
public class CustomerEntity {
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

    @Column(name = "customerImage", columnDefinition = "LONGBLOB")
    private byte[] customerImage;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BillEntity> bills;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PaymentEntity> payments;

    public CustomerEntity() {
        super();
    }

    public CustomerEntity(int accountId, String fname, String lname, String email, String phoneNumber, String address, 
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

    public List<BillEntity> getBilling() {
        return bills;
    }

    public void setBilling(List<BillEntity> bills) {
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

<<<<<<< Updated upstream
}
=======
    public List<ConsumptionEntity> getConsumptionId() {
        return consumptionId;
    }

    public void setConsumptionId(List<ConsumptionEntity> consumptionId) {
        this.consumptionId = consumptionId;
    }
}
>>>>>>> Stashed changes
