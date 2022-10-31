package org.evist0.lab2;

import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import org.evist0.lab2.ui.MainController;

import java.io.IOException;

public class Main extends javafx.application.Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(Main.class.getResource("main.fxml"));
        Scene scene = new Scene(fxmlLoader.load());

        stage.setTitle("Танкофф Банк");
        stage.setResizable(false);
        stage.setScene(scene);

        MainController mainController = fxmlLoader.getController();
        mainController.setStage(stage);

        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}