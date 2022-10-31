package org.evist0.lab2.model.services;

import org.evist0.lab2.model.entities.Account;

import jakarta.persistence.Table;
import org.evist0.lab2.model.entities.Deposit;

public class AccountService extends AbstractService<Account, Long> {
    final static AccountService instance = new AccountService();

    @Override
    protected Class<Account> getType() {
        return Account.class;
    }

    @Override
    protected String getTableName() {
        return "Account";
    }

    public static AccountService getInstance() {
        return instance;
    }
}
