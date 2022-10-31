package org.evist0.lab2.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;
    private String patronymic;

    @Formula(value = "concat(surname, ' ', name, ' ', patronymic)")
    private String fullName;

    private String passport;
    private String address;
    private String phone;

    @OneToMany(mappedBy = "client", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Account> accounts;

    public Client(String name, String surname, String patronymic, String passport, String address, String phone) {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.passport = passport;
        this.address = address;
        this.phone = phone;
    }
}
