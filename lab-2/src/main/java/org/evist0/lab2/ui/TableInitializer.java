package org.evist0.lab2.ui;

import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import org.evist0.lab2.model.entities.Account;
import org.evist0.lab2.model.entities.Client;
import org.evist0.lab2.model.entities.Deposit;

public class TableInitializer {
    public static void InitializeClientTable(TableView<Client> tableView) {
        TableColumn<Client, String> nameColumn = new TableColumn<>("Имя");
        nameColumn.setCellValueFactory(new PropertyValueFactory<>("name"));
        tableView.getColumns().add(nameColumn);

        TableColumn<Client, String> surnameColumn = new TableColumn<>("Фамилия");
        surnameColumn.setCellValueFactory(new PropertyValueFactory<>("surname"));
        tableView.getColumns().add(surnameColumn);

        TableColumn<Client, String> patronymicColumn = new TableColumn<>("Отчество");
        patronymicColumn.setCellValueFactory(new PropertyValueFactory<>("patronymic"));
        tableView.getColumns().add(patronymicColumn);

        TableColumn<Client, String> passportColumn = new TableColumn<>("Паспорт");
        passportColumn.setCellValueFactory(new PropertyValueFactory<>("passport"));
        tableView.getColumns().add(passportColumn);

        TableColumn<Client, String> addressColumn = new TableColumn<>("Адрес");
        addressColumn.setCellValueFactory(new PropertyValueFactory<>("address"));
        tableView.getColumns().add(addressColumn);

        TableColumn<Client, String> phoneColumn = new TableColumn<>("Телефон");
        phoneColumn.setCellValueFactory(new PropertyValueFactory<>("phone"));
        tableView.getColumns().add(phoneColumn);
    }
    
    public static void InitializeDepositTable(TableView<Deposit> tableView) {
        TableColumn<Deposit, String> nameColumn = new TableColumn<>("Название");
        nameColumn.setCellValueFactory(new PropertyValueFactory<>("name"));
        tableView.getColumns().add(nameColumn);

        TableColumn<Deposit, String> termColumn = new TableColumn<>("Срок");
        termColumn.setCellValueFactory(new PropertyValueFactory<>("term"));
        tableView.getColumns().add(termColumn);

        TableColumn<Deposit, String> annualColumn = new TableColumn<>("Ставка");
        annualColumn.setCellValueFactory(new PropertyValueFactory<>("annual"));
        tableView.getColumns().add(annualColumn);
    }

    public static void InitializeAccountTable(TableView<Account> tableView) {
        TableColumn<Account, String> ownerFioColumn = new TableColumn<>("ФИО");
        ownerFioColumn.setCellValueFactory(new PropertyValueFactory<>("ownerFio"));
        tableView.getColumns().add(ownerFioColumn);

        TableColumn<Account, String> ownerPassportColumn = new TableColumn<>("Паспорт");
        ownerPassportColumn.setCellValueFactory(new PropertyValueFactory<>("ownerPassport"));
        tableView.getColumns().add(ownerPassportColumn);

        TableColumn<Account, String> depositName = new TableColumn<>("Тариф");
        depositName.setCellValueFactory(new PropertyValueFactory<>("depositName"));
        tableView.getColumns().add(depositName);
    }
}
