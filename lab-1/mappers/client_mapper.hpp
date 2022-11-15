#ifndef DATABASE_PROGRAMMING_1_CLIENT_MAPPER_HPP
#define DATABASE_PROGRAMMING_1_CLIENT_MAPPER_HPP

#include <vector>
#include <entities/client.hpp>
#include "sql_executor.hpp"

class client_mapper {
public:
    explicit client_mapper(sql_executor* executor)
            :executor_(executor) {
        auto query =
                "create table if not exists clients\n"
                "(\n"
                "    id         serial primary key,\n"
                "\n"
                "    name       varchar(255) not null,\n"
                "    surname    varchar(255) not null,\n"
                "    patronymic varchar(255) not null,\n"
                "\n"
                "    passport   varchar(255) not null unique,\n"
                "\n"
                "    address    varchar(255) not null,\n"
                "\n"
                "    phone      varchar(255) not null\n"
                ")";

        sql_statement statement = executor_->execute(query);
        auto retcode = SQLFetch(statement);
    };

    client* create(client* client) {
        if (client->id.has_value()) {
            throw std::runtime_error("[client_mapper]: already exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "insert into clients(name, surname, patronymic, passport, address, phone)" << std::endl <<
                      "values" << std::endl << '(' <<
                      '\'' << client->name << '\'' << ',' <<
                      '\'' << client->surname << '\'' << ',' <<
                      '\'' << client->patronymic << '\'' << ',' <<
                      '\'' << client->passport << '\'' << ',' <<
                      '\'' << client->address << '\'' << ',' <<
                      '\'' << client->phone << '\'' <<
                      ')' << std::endl <<
                      "returning id";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);

        retcode = SQLFetch(statement);

        client->id = id;

        this->clients_.push_back(client);

        return client;
    }

    std::vector<client*> read() {
        sql_statement statement = executor_->execute("select * from clients");

        SQLINTEGER id;
        SQLWCHAR name[255];
        SQLWCHAR surname[255];
        SQLWCHAR patronymic[255];
        SQLWCHAR passport[255];
        SQLWCHAR address[255];
        SQLWCHAR phone[255];

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_WCHAR, &surname, 255, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_WCHAR, &patronymic, 255, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_WCHAR, &passport, 255, nullptr);
        retcode = SQLBindCol(statement, 6, SQL_C_WCHAR, &address, 255, nullptr);
        retcode = SQLBindCol(statement, 7, SQL_C_WCHAR, &phone, 255, nullptr);

        while (true) {
            retcode = SQLFetch(statement);

            if (retcode == SQL_SUCCESS || retcode == SQL_SUCCESS_WITH_INFO) {
                auto new_client = new client();
                new_client->id = id;
                new_client->name = name;
                new_client->surname = surname;
                new_client->patronymic = patronymic;
                new_client->passport = passport;
                new_client->address = address;
                new_client->phone = phone;

                bool found = false;
                for (auto client: clients_) {
                    if (client->id.value() == new_client->id.value()) {
                        client->id = id;
                        client->name = name;
                        client->surname = surname;
                        client->patronymic = patronymic;
                        client->passport = passport;
                        client->address = address;
                        client->phone = phone;
                        found = true;
                    }
                }

                if (!found) {
                    clients_.push_back(new_client);
                } else {
                    delete new_client;
                }
            }
            else if (retcode == SQL_NO_DATA) {
                break;
            }
        }

        return clients_;
    }

    client* read(const int& position) {
        if(position > clients_.size()) {
            throw std::runtime_error("[client_mapper]: out of bounds");
        }

        return clients_[position];
    }

    client* read_id(const int& id) {
        client* result = nullptr;

        // Ищем локально
        for (auto client: clients_) {
            if (client->id == id) {
                result = client;
                return result;
            }
        }

        // Если не нашли - получаем из БД
        std::stringstream query_builder;

        query_builder <<
                      "select * from clients" << std::endl <<
                      "where id = " << id;

        sql_statement statement = executor_->execute(query_builder.str());

        SQLWCHAR name[255];
        SQLWCHAR surname[255];
        SQLWCHAR patronymic[255];
        SQLWCHAR passport[255];
        SQLWCHAR address[255];
        SQLWCHAR phone[255];

        auto retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_WCHAR, &surname, 255, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_WCHAR, &patronymic, 255, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_WCHAR, &passport, 255, nullptr);
        retcode = SQLBindCol(statement, 6, SQL_C_WCHAR, &address, 255, nullptr);
        retcode = SQLBindCol(statement, 7, SQL_C_WCHAR, &phone, 255, nullptr);

        retcode = SQLFetch(statement);

        // Сохранили локально
        result = new client();
        result->id = id;
        result->name = name;
        result->surname = surname;
        result->patronymic = patronymic;
        result->passport = passport;
        result->address = address;
        result->phone = phone;

        clients_.push_back(result);

        return result;
    }

    client* update(client* client) {
        if (!client->id.has_value()) {
            throw std::runtime_error("[client_mapper]: record doesn't exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "update clients" << std::endl <<
                      "set " <<
                      "name=" << '\'' << client->name << '\'' << ',' <<
                      "surname=" << '\'' << client->surname << '\'' << ',' <<
                      "patronymic=" << '\'' << client->patronymic << '\'' << ',' <<
                      "passport=" << '\'' << client->passport << '\'' << ',' <<
                      "address=" << '\'' << client->address << '\'' << ',' <<
                      "phone=" << '\'' << client->phone << '\'' << std::endl <<
                      "where id = " << client->id.value() << std::endl <<
                      "returning *";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLWCHAR name[255];
        SQLWCHAR surname[255];
        SQLWCHAR patronymic[255];
        SQLWCHAR passport[255];
        SQLWCHAR address[255];
        SQLWCHAR phone[255];

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_WCHAR, &surname, 255, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_WCHAR, &patronymic, 255, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_WCHAR, &passport, 255, nullptr);
        retcode = SQLBindCol(statement, 6, SQL_C_WCHAR, &address, 255, nullptr);
        retcode = SQLBindCol(statement, 7, SQL_C_WCHAR, &phone, 255, nullptr);

        retcode = SQLFetch(statement);

        client->name = name;
        client->surname = surname;
        client->patronymic = patronymic;
        client->passport = passport;
        client->address = address;
        client->phone = phone;

        return client;
    }

    int remove(const int& position) {
        if(position > clients_.size()) {
            throw std::runtime_error("[client_mapper]: out of bounds");
        }

        std::stringstream query_builder;

        query_builder <<
                      "delete from clients" << std::endl <<
                      "where id = " << clients_[position]->id.value() << std::endl <<
                      "returning id";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLFetch(statement);

        delete clients_[position];
        clients_.erase(clients_.begin() + position);

        return id;
    }

private:
    sql_executor* executor_;
    std::vector<client*> clients_;
};

#endif //DATABASE_PROGRAMMING_1_CLIENT_MAPPER_HPP
