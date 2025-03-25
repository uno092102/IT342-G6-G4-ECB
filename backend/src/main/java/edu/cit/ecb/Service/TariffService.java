package edu.cit.ecb.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.ecb.Entity.TariffEntity;
import edu.cit.ecb.Repository.TariffRepository;

@Service
public class TariffService {
    @Autowired
    TariffRepository trepo;

    public TariffService()
    {
        super();
    }

    //POST
    public TariffEntity postTariff(TariffEntity tariff)
    {
        return trepo.save(tariff);
    }

    //GET
    public List<TariffEntity> getAllTariff()
    {
        return trepo.findAll();
    }

    //UPDATE
    public TariffEntity updateTariff(int id, TariffEntity updatedTariff)
    {
        TariffEntity newTariff = trepo.findById(id).orElseThrow(() ->new NoSuchElementException("Tariff ID does not exist."));

        newTariff.setTariffType(updatedTariff.getTariffType());

        return trepo.save(newTariff);
    }


    //DELETE
    public String deleteTariff(int id)
    {
        Optional<TariffEntity> tariffOptional = trepo.findById(id);
        if(tariffOptional.isPresent())
        {
            TariffEntity tariff = tariffOptional.get();
            trepo.delete(tariff);

            return "Tariff record successfully deleted";
        }

        else
        {
            return "Tariff with ID \"" + id + "\" doest not exist";
        }
    }
}
