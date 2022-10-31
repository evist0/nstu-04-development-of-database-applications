package org.evist0.lab2.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table
public class Deposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer term;
    private Float annual;

    @OneToMany(mappedBy = "deposit", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Account> accounts;

    public Deposit(String name, Integer term, Float annual) {
        this.name = name;
        this.term = term;
        this.annual = annual;
    }
}
