package org.evist0.lab2.model.services;

import org.evist0.lab2.model.entities.Client;
import org.evist0.lab2.model.entities.Deposit;

import java.util.List;

public class DepositService extends AbstractService<Deposit, Long> {
    final static DepositService instance = new DepositService();

    public List<Deposit> findDepositByName(String name) {
        return this.findByStringField("name", name);
    }

    public List<Deposit> findDepositByTerm(String term) {
        return this.findByStringField("term", term);

    }

    public List<Deposit> findDepositByAnnual(String annual) {
        return this.findByStringField("annual", annual);
    }

    @Override
    protected Class<Deposit> getType() {
        return Deposit.class;
    }

    @Override
    protected String getTableName() {
        return "Deposit";
    }

    public static DepositService getInstance() {
        return instance;
    }
}
