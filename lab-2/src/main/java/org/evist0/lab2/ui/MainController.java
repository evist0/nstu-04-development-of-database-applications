package org.evist0.lab2.ui;

import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;
import org.evist0.lab2.model.entities.Client;
import org.evist0.lab2.model.entities.Deposit;
import org.evist0.lab2.model.services.ClientService;
import org.evist0.lab2.model.services.DepositService;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class MainController {
    private final ClientService clientService = ClientService.getInstance();
    private final DepositService depositService = DepositService.getInstance();

    private List<Client> clientList;
    @FXML
    public TableView<Client> clientTableView;

    @FXML
    public TextField clientSearchbarInput;

    private List<Deposit> depositList;
    @FXML
    public TableView<Deposit> depositTableView;

    @FXML
    public TextField depositSearchbarInput;

    Stage stage;

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    private void onClientListChanged() {
        if (clientList == null) {
            clientTableView.setItems(FXCollections.observableList(Collections.emptyList()));
            return;
        }

        clientTableView.setItems(FXCollections.observableList(clientList));
        clientTableView.refresh();
    }

    private void onDepositListChange() {
        if (depositList == null) {
            depositTableView.setItems(FXCollections.observableList(Collections.emptyList()));
            return;
        }

        depositTableView.setItems(FXCollections.observableList(depositList));
        depositTableView.refresh();
    }

    @FXML
    private void initialize() {
        TableInitializer.InitializeClientTable(clientTableView);
        TableInitializer.InitializeDepositTable(depositTableView);

        clientList = clientService.findAll();
        depositList = depositService.findAll();
        onClientListChanged();
        onDepositListChange();
    }

    // @section Clients
    public void onClientSearchbarChange() {
        if (clientSearchbarInput.getText().isEmpty()) {
            clientList = clientService.findAll();
            onClientListChanged();
        }
    }

    public void onFindClientByFio() {
        var fio = clientSearchbarInput.getText();

        clientList = clientService.findClientByFio(fio);
        onClientListChanged();
    }

    public void onFindClientByPassport() {
        var passport = clientSearchbarInput.getText();

        clientList = clientService.findClientByPassport(passport);
        onClientListChanged();
    }

    public void onFindClientByPhone() {
        var phone = clientSearchbarInput.getText();

        clientList = clientService.findClientByPhone(phone);
        onClientListChanged();
    }

    @FXML
    protected void onCreateClientButtonClick() throws IOException {
        var modal = new ClientDialog(stage);

        modal.showAndWait().ifPresent(client -> {
            clientService.save(client);
            clientList.add(client);
            onClientListChanged();

            modal.close();
        });
    }

    @FXML
    protected void onChangeClientButtonClick() throws IOException {
        var selectedClient = clientTableView.getSelectionModel().getSelectedItem();

        var modal = new ClientDialog(stage, selectedClient);

        modal.showAndWait().ifPresent(client -> {
            var selectedIndex = clientList.indexOf(selectedClient);

            clientService.edit(client);
            clientList.set(selectedIndex, client);
            onClientListChanged();

            modal.close();
        });
    }

    @FXML
    protected void onDeleteClientButtonClick() {
        var selectedClient = clientTableView.getSelectionModel().getSelectedItem();

        clientTableView.getSelectionModel().selectNext();

        clientService.delete(selectedClient);
        clientList.remove(selectedClient);
        onClientListChanged();
    }

    public void onViewClientAccounts() throws IOException {
        var selectedClient = clientTableView.getSelectionModel().getSelectedItem();

        var accountDialog = new AccountViewDialog(stage, selectedClient);
        accountDialog.setOnHiding((WindowEvent windowEvent) -> {
            this.depositList = this.depositService.findAll();
            onDepositListChange();
        });
    }

    // @section Deposits
    public void onDepositSearchbarChange() {
        if (depositSearchbarInput.getText().isEmpty()) {
            depositList = depositService.findAll();
            onDepositListChange();
        }
    }

    public void onFindDepositByName() {
        var name = depositSearchbarInput.getText();

        depositList = depositService.findDepositByName(name);
        onDepositListChange();
    }

    public void onFindDepositByTerm() {
        var term = depositSearchbarInput.getText();

        depositList = depositService.findDepositByTerm(term);
        onDepositListChange();
    }

    public void onFindDepositByAnnual() {
        var annual = depositSearchbarInput.getText();

        depositList = depositService.findDepositByAnnual(annual);
        onDepositListChange();
    }

    public void onCreateDepositButtonClick() throws IOException {
        var modal = new DepositDialog(stage);

        modal.showAndWait().ifPresent(deposit -> {
            depositService.save(deposit);
            depositList.add(deposit);
            onDepositListChange();

            modal.close();
        });
    }

    public void onChangeDepositButtonClick() throws IOException {
        var selectedDeposit = depositTableView.getSelectionModel().getSelectedItem();

        var modal = new DepositDialog(stage, selectedDeposit);

        modal.showAndWait().ifPresent(deposit -> {
            var selectedIndex = depositList.indexOf(selectedDeposit);

            depositService.edit(deposit);
            depositList.set(selectedIndex, deposit);
            onDepositListChange();

            modal.close();
        });
    }

    public void onDeleteDepositButtonClick() {
        var selectedDeposit = depositTableView.getSelectionModel().getSelectedItem();

        depositTableView.getSelectionModel().selectNext();

        depositService.delete(selectedDeposit);
        depositList.remove(selectedDeposit);
        onDepositListChange();
    }

    public void onViewDepositAccounts() throws IOException {
        var selectedDeposit = depositTableView.getSelectionModel().getSelectedItem();

        var accountDialog = new AccountViewDialog(stage, selectedDeposit);
        accountDialog.setOnHiding((WindowEvent windowEvent) -> {
            this.clientList = this.clientService.findAll();
            onClientListChanged();
        });
    }
}