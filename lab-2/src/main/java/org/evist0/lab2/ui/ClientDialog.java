package org.evist0.lab2.ui;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.*;
import javafx.stage.Modality;
import javafx.stage.Window;
import org.evist0.lab2.model.entities.Client;

import java.io.IOException;

public class ClientDialog extends Dialog<Client> {
    private Client modifyingClient;

    @FXML
    public TextField nameTextField;
    @FXML
    public TextField surnameTextField;

    @FXML
    public TextField patronymicTextField;

    @FXML
    public TextField passportTextField;

    @FXML
    public TextField addressTextField;

    @FXML
    public TextField phoneTextField;

    public ClientDialog(Window owner) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("client.fxml"));
        fxmlLoader.setController(this);

        DialogPane dialogPane = fxmlLoader.load();

        initOwner(owner);
        initModality(Modality.APPLICATION_MODAL);

        setTitle("Создать клиента");
        setResizable(false);
        setDialogPane(dialogPane);

        setResultConverter(buttonType -> {
            if (buttonType != null && buttonType.getButtonData() == ButtonBar.ButtonData.APPLY) {
                var name = nameTextField.getText();
                var surname = surnameTextField.getText();
                var patronymic = patronymicTextField.getText();
                var passport = passportTextField.getText();
                var address = addressTextField.getText();
                var phone = phoneTextField.getText();

                if (modifyingClient != null) {
                    modifyingClient.setName(name);
                    modifyingClient.setSurname(surname);
                    modifyingClient.setPatronymic(patronymic);
                    modifyingClient.setPassport(passport);
                    modifyingClient.setAddress(address);
                    modifyingClient.setPhone(phone);

                    return modifyingClient;
                }

                return new Client(name, surname, patronymic, passport, address, phone);
            }

            return null;
        });

        setOnShowing(dialogEvent -> Platform.runLater(() -> surnameTextField.requestFocus()));
    }

    public ClientDialog(Window owner, Client client) throws IOException {
        this(owner);

        modifyingClient = client;

        nameTextField.setText(client.getName());
        surnameTextField.setText(client.getSurname());
        patronymicTextField.setText(client.getPatronymic());
        passportTextField.setText(client.getPassport());
        addressTextField.setText(client.getAddress());
        phoneTextField.setText(client.getPhone());
    }
}
