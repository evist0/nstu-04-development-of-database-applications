package org.evist0.lab2.model;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateSessionFactory {
    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
                sessionFactory = new Configuration().configure().buildSessionFactory();
        }

        return sessionFactory;
    }
}