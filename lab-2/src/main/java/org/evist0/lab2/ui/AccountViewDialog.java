package org.evist0.lab2.ui;

import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.TableView;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.stage.Window;
import org.evist0.lab2.model.entities.Account;
import org.evist0.lab2.model.entities.Client;
import org.evist0.lab2.model.entities.Deposit;
import org.evist0.lab2.model.services.AccountService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class AccountViewDialog extends Stage {
    private final AccountService accountService = AccountService.getInstance();
    private String shouldSelectClass;
    private List<Account> accountList;

    private final Object rootObject;

    @FXML
    private TableView<Account> accountTableView;

    public AccountViewDialog(Window owner, Object rootObject) throws IOException {
        this.rootObject = rootObject;

        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("account.fxml"));
        fxmlLoader.setController(this);

        Scene scene = new Scene(fxmlLoader.load());

        initOwner(owner);
        initModality(Modality.APPLICATION_MODAL);

        setTitle("Просмотр счетов");
        setResizable(false);
        setScene(scene);

        if (rootObject instanceof Client) {
            var rootAccounts = ((Client) rootObject).getAccounts();

            this.accountList = rootAccounts != null ? rootAccounts : new ArrayList<>();
            this.shouldSelectClass = Deposit.class.getName();
        }
        if (rootObject instanceof Deposit) {
            var rootAccounts = ((Deposit) rootObject).getAccounts();

            this.accountList = rootAccounts != null ? rootAccounts : new ArrayList<>();
            this.shouldSelectClass = Client.class.getName();
        }

        onAccountListChanged();

        show();
    }

    private void onAccountListChanged() {
        if (accountList == null) {
            accountTableView.setItems(FXCollections.observableList(Collections.emptyList()));
            return;
        }

        accountTableView.setItems(FXCollections.observableList(accountList));
        accountTableView.refresh();
    }

    @FXML
    protected void initialize() {
        TableInitializer.InitializeAccountTable(accountTableView);
    }

    @FXML
    public void onCreateAccount() throws IOException {
        if(Objects.equals(shouldSelectClass, Client.class.getName())) {
            var clientPicker = new ClientPickerDialog(getOwner());

            clientPicker.showAndWait().ifPresent(client -> {
                var account = new Account((Deposit) rootObject, client);
                accountService.save(account);
                accountList.add(account);
            });
        } else {
            var depositPicker = new DepositPickerDialog(getOwner());

            depositPicker.showAndWait().ifPresent(deposit -> {
                var account = new Account(deposit, (Client) rootObject);
                accountService.save(account);
                accountList.add(account);
            });
        }

        onAccountListChanged();
    }

    @FXML
    public void onEditAccount() throws IOException {
        var selectedAccount = accountTableView.getSelectionModel().getSelectedItem();

        if(Objects.equals(shouldSelectClass, Client.class.getName())) {
            var clientPicker = new ClientPickerDialog(getOwner());
            clientPicker.showAndWait().ifPresent(selectedAccount::setClient);
        } else {
            var depositPicker = new DepositPickerDialog(getOwner());
            depositPicker.showAndWait().ifPresent(selectedAccount::setDeposit);
        }

        accountService.edit(selectedAccount);

        onAccountListChanged();
    }

    @FXML
    public void onDeleteAccount() {
        var selectedAccount = accountTableView.getSelectionModel().getSelectedItem();
        accountService.delete(selectedAccount);
        accountList.remove(selectedAccount);
        onAccountListChanged();
    }
}
