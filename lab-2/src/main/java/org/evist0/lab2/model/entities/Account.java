package org.evist0.lab2.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Deposit deposit;

    @ManyToOne
    private Client client;

    private Date openingDate;
    private Date closingDate;

    public Account(Deposit deposit, Client client) {
        this.deposit = deposit;
        this.client = client;

        this.openingDate = new Date();

        var calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, deposit.getTerm());

        this.closingDate = calendar.getTime();
    }

    public String getOwnerFio() {
        return client.getFullName();
    }

    public String getOwnerPassport() {
        return client.getPassport();
    }

    public String getDepositName() {
        return deposit.getName();
    }
}
