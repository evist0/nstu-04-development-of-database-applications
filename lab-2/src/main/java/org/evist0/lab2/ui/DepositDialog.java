package org.evist0.lab2.ui;

import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.ButtonBar;
import javafx.scene.control.Dialog;
import javafx.scene.control.DialogPane;
import javafx.scene.control.TextField;
import javafx.stage.Modality;
import javafx.stage.Window;
import org.evist0.lab2.model.entities.Deposit;

import java.io.IOException;

public class DepositDialog extends Dialog<Deposit> {
    private Deposit modifyingDeposit;

    @FXML
    public TextField nameTextField;
    @FXML
    public TextField termTextField;

    @FXML
    public TextField annualTextField;

    public DepositDialog(Window owner) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("deposit.fxml"));
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
                var term = Integer.parseInt(termTextField.getText());
                var annual = Float.parseFloat(annualTextField.getText());

                if (modifyingDeposit != null) {
                    modifyingDeposit.setName(name);
                    modifyingDeposit.setTerm(term);
                    modifyingDeposit.setAnnual(annual);

                    return modifyingDeposit;
                }

                return new Deposit(name, term, annual);
            }

            return null;
        });

        setOnShowing(dialogEvent -> Platform.runLater(() -> nameTextField.requestFocus()));
    }

    public DepositDialog(Window owner, Deposit deposit) throws IOException {
        this(owner);

        modifyingDeposit = deposit;

        nameTextField.setText(deposit.getName());
        termTextField.setText(deposit.getTerm().toString());
        annualTextField.setText(deposit.getAnnual().toString());
    }
}
