package edu.cit.ecb.Entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.cit.ecb.Enum.Role;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;
    
    @Column(name = "fname")
    private String fname;
    
    @Column(name = "lname")
    private String lname;
    
    @Column(name = "email", unique = true)
    private String email;
    
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "username", unique = true)
    private String username;
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @Column(name = "customer_image")
    @Lob
    private byte[] customerImage;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BillEntity> bills;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ConsumptionEntity> consumptions;
    
    public UserEntity() {}
    
    public UserEntity(String fname, String lname, String email, String username, String password, Role role) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
    
    // Getters and Setters
    public int getAccountId() { return accountId; }
    public void setAccountId(int accountId) { this.accountId = accountId; }
    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }
    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public byte[] getCustomerImage() {
        return customerImage;
    }
    public void setCustomerImage(byte[] customerImage) {
        this.customerImage = customerImage;
    }
    public List<BillEntity> getBills() { return bills; }
    public void setBills(List<BillEntity> bills) { this.bills = bills; }
    public List<ConsumptionEntity> getConsumptions() { return consumptions; }
    public void setConsumptions(List<ConsumptionEntity> consumptions) { this.consumptions = consumptions; }
}

