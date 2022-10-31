package org.evist0.lab2.ui;

import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.*;
import javafx.stage.Modality;
import javafx.stage.Window;
import org.evist0.lab2.model.entities.Client;
import org.evist0.lab2.model.services.ClientService;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class ClientPickerDialog extends Dialog<Client> {
    private final ClientService clientService = ClientService.getInstance();

    private List<Client> clientList;
    @FXML
    public TableView<Client> clientTableView;

    @FXML
    public TextField clientSearchbarInput;

    public ClientPickerDialog(Window owner) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("client-picker.fxml"));
        fxmlLoader.setController(this);

        DialogPane dialogPane = fxmlLoader.load();

        initOwner(owner);
        initModality(Modality.APPLICATION_MODAL);

        setTitle("Выбор клиента");
        setResizable(false);
        setDialogPane(dialogPane);

        setResultConverter(buttonType -> {
            if (buttonType != null && buttonType.getButtonData() == ButtonBar.ButtonData.APPLY) {
                return clientTableView.getSelectionModel().getSelectedItem();
            }

            return null;
        });
    }

    private void onClientListChanged() {
        if (clientList == null) {
            clientTableView.setItems(FXCollections.observableList(Collections.emptyList()));
            return;
        }

        clientTableView.setItems(FXCollections.observableList(clientList));
        clientTableView.refresh();
    }

    @FXML
    protected void initialize() {
        TableInitializer.InitializeClientTable(clientTableView);
        clientList = clientService.findAll();
        clientTableView.setItems(FXCollections.observableList(clientList));
        onClientListChanged();
    }

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
}
