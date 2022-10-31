package org.evist0.lab2.model.services;

import org.evist0.lab2.model.entities.Client;

import java.util.List;

public class ClientService extends AbstractService<Client, Long> {
    final static ClientService instance = new ClientService();

    public List<Client> findClientByFio(String fio) {
        return this.findByStringField("fullName", fio);
    }

    public List<Client> findClientByPassport(String passport) {
        return this.findByStringField("passport", passport);
    }

    public List<Client> findClientByPhone(String phone) {
        return this.findByStringField("phone", phone);
    }

    @Override
    protected Class<Client> getType() {
        return Client.class;
    }

    @Override
    protected String getTableName() {
        return "Client";
    }

    public static ClientService getInstance() {
        return instance;
    }
}
