package org.evist0.lab2.ui;

import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.*;
import javafx.scene.input.KeyEvent;
import javafx.stage.Modality;
import javafx.stage.Window;
import org.evist0.lab2.model.entities.Deposit;
import org.evist0.lab2.model.services.DepositService;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class DepositPickerDialog extends Dialog<Deposit> {
    private final DepositService depositService = DepositService.getInstance();

    private List<Deposit> depositList;
    @FXML
    public TableView<Deposit> depositTableView;

    @FXML
    public TextField depositSearchbarInput;

    public DepositPickerDialog(Window owner) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("deposit-picker.fxml"));
        fxmlLoader.setController(this);

        DialogPane dialogPane = fxmlLoader.load();

        initOwner(owner);
        initModality(Modality.APPLICATION_MODAL);

        setTitle("Выбор счёта");
        setResizable(false);
        setDialogPane(dialogPane);

        setResultConverter(buttonType -> {
            if (buttonType != null && buttonType.getButtonData() == ButtonBar.ButtonData.APPLY) {
                return depositTableView.getSelectionModel().getSelectedItem();
            }

            return null;
        });
    }

    private void onDepositListChanged() {
        if (depositList == null) {
            depositTableView.setItems(FXCollections.observableList(Collections.emptyList()));
            return;
        }

        depositTableView.setItems(FXCollections.observableList(depositList));
        depositTableView.refresh();
    }

    @FXML
    protected void initialize() {
        TableInitializer.InitializeDepositTable(depositTableView);

        depositList = depositService.findAll();
        depositTableView.setItems(FXCollections.observableList(depositList));
        onDepositListChanged();
    }

    @FXML
    public void onDepositSearchbarChange(KeyEvent keyEvent) {
        if (depositSearchbarInput.getText().isEmpty()) {
            depositList = depositService.findAll();
            onDepositListChanged();
        }
    }

    @FXML
    public void onFindDepositByName(ActionEvent actionEvent) {
        var fio = depositSearchbarInput.getText();

        depositList = depositService.findDepositByName(fio);
        onDepositListChanged();
    }

    @FXML
    public void onFindDepositByTerm(ActionEvent actionEvent) {
        var passport = depositSearchbarInput.getText();

        depositList = depositService.findDepositByTerm(passport);
        onDepositListChanged();
    }

    @FXML
    public void onFindDepositByAnnual(ActionEvent actionEvent) {
        var phone = depositSearchbarInput.getText();

        depositList = depositService.findDepositByAnnual(phone);
        onDepositListChanged();
    }
}
