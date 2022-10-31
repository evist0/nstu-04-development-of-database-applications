package org.evist0.lab2.model.services;

import org.evist0.lab2.model.HibernateSessionFactory;
import org.evist0.lab2.model.entities.Client;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractService<T, ID extends Serializable> {
    public List<T> findAll() {
        var hql = String.format("from %s", getTableName());

        var session = HibernateSessionFactory.getSessionFactory().openSession();

        var list = session.createQuery(hql, getType()).list();

        session.close();

        return list;
    }

    public T findById(ID id) {
        var hql = String.format("from %s where id = :id", getTableName());

        var session = HibernateSessionFactory.getSessionFactory().openSession();

        var query = session.createQuery(hql, getType());
        query.setParameter("id", id);

        var result = query.getSingleResult();

        session.close();

        return result;
    }

    public void save(T entity) {
        var session = HibernateSessionFactory.getSessionFactory().openSession();

        var transaction = session.beginTransaction();

        session.persist(entity);

        transaction.commit();

        session.close();
    }

    public void edit(T entity) {
        var session = HibernateSessionFactory.getSessionFactory().openSession();

        var transaction = session.beginTransaction();

        session.merge(entity);

        transaction.commit();

        session.close();
    }

    public void delete(T entity) {
        var session = HibernateSessionFactory.getSessionFactory().openSession();

        var transaction = session.beginTransaction();

        session.remove(entity);

        transaction.commit();

        session.close();
    }

    protected List<T> findByStringField(String field, String value) {
        if (value.isEmpty()) {
            return findAll();
        }

        var hql = String.format("from %s where cast(%s as text) ilike :value", getTableName(), field);

        var session = HibernateSessionFactory.getSessionFactory().openSession();

        var query = session.createQuery(hql, getType());
        query.setParameter("value", '%' + value + '%');

        var result = query.getResultList();

        session.close();

        return result;
    }

    protected abstract Class<T> getType();

    protected abstract String getTableName();
}
