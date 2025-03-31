package edu.cit.ecb.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TariffEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tariffID;

    @ManyToOne
    @JoinColumn(name = "billID", nullable = false)
    private BillEntity billing; 

    private String tariffType;

    public TariffEntity()
    {
        super();
    }

    public TariffEntity(int tariffID, BillEntity billing, String tariffType)

    {
        super();
        this.tariffID = tariffID;
        this.billing = billing;
        this.tariffType = tariffType;
    }

    //SETTER
    public void setBilling(BillEntity billing) {
        this.billing = billing;
    }

    public void setTariffID(int tariffID) {
        this.tariffID = tariffID;
    }

    public void setTariffType(String tariffType) {
        this.tariffType = tariffType;
    }

    //Getter
    public BillEntity getBilling() {
        return billing;
    }
    public int getTariffID() {
        return tariffID;
    }

    public String getTariffType() {
        return tariffType;
    }

    
}
