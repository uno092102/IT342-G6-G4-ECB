package edu.cit.ecb.DTO;

public class CustomerDTO {
    private int accountId;
    private String fname;
    private String lname;
    private String email;
    private String phoneNumber;
    private String address;
    private String username;

    // Getters and setters
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
}