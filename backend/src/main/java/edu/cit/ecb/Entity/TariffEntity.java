package edu.cit.ecb.Entity;
import jakarta.persistence.*;

@Entity
public class TariffEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tariffID;

    private String tariffType;

    private double ratePerKwh;

    public TariffEntity()
    {
        super();
    }

    public TariffEntity(int tariffID, String tariffType, double ratePerKwh) {
        super();
        this.tariffID = tariffID;
        this.tariffType = tariffType;
        this.ratePerKwh = ratePerKwh;
    }
    

    //SETTER
    public void setTariffID(int tariffID) {
        this.tariffID = tariffID;
    }

    public void setTariffType(String tariffType) {
        this.tariffType = tariffType;
    }

    //Getter
    public int getTariffID() {
        return tariffID;
    }

    public String getTariffType() {
        return tariffType;
    }

    public double getRate() { 
        return ratePerKwh; 
    }
    public void setRate(double ratePerKwh) { 
        this.ratePerKwh = ratePerKwh; 
    }

    
}
