module org.evist0.lab2 {
    requires java.naming;
    requires javafx.controls;
    requires javafx.fxml;
    requires lombok;
    requires org.hibernate.orm.core;
    requires org.hibernate.commons.annotations;
    requires jakarta.persistence;
    requires jakarta.xml.bind;
    requires com.fasterxml.classmate;
    requires net.bytebuddy;

    opens org.evist0.lab2 to javafx.fxml;
    opens org.evist0.lab2.model.entities to org.hibernate.orm.core, org.hibernate.commons.annotations;

    exports org.evist0.lab2;
    exports org.evist0.lab2.ui;
    exports org.evist0.lab2.model.entities;
    exports org.evist0.lab2.model.services;

    opens org.evist0.lab2.ui to javafx.fxml;
}