#ifndef DATABASE_PROGRAMMING_1_CLIENT_MAPPER_HPP
#define DATABASE_PROGRAMMING_1_CLIENT_MAPPER_HPP

#include <vector>
#include "sql_executor.hpp"
#include "entities/client.hpp"

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

        SQLHSTMT statement = executor_->execute(query);
        auto retcode = SQLFetch(statement);
    };

    client create(const client& client_) {
        std::wstringstream query_builder;

        query_builder <<
                      "insert into clients(name, surname, patronymic, passport, address, phone)" << std::endl <<
                      "values" << std::endl << '(' <<
                      '\'' << client_.name << '\'' << ',' <<
                      '\'' << client_.surname << '\'' << ',' <<
                      '\'' << client_.patronymic << '\'' << ',' <<
                      '\'' << client_.passport << '\'' << ',' <<
                      '\'' << client_.address << '\'' << ',' <<
                      '\'' << client_.phone << '\'' <<
                      ')' << std::endl <<
                      "returning id";

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);

        retcode = SQLFetch(statement);

        auto new_client = client_;
        new_client.id = id;
        return new_client;
    }

    std::vector<client> read() {
        SQLHSTMT statement = executor_->execute("select * from clients");

        std::vector<client> result;

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
                result.push_back({
                        .id = id,
                        .name = name,
                        .surname = surname,
                        .patronymic = patronymic,
                        .passport = passport,
                        .address = address,
                        .phone = phone
                });
            }
            else if (retcode == SQL_NO_DATA) {
                break;
            }
        }

        return result;
    }

    client read(int id_) {
        std::stringstream query_builder;

        query_builder <<
                      "select * from clients" << std::endl <<
                      "where id = " << id_;

        SQLHSTMT statement = executor_->execute(query_builder.str());

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

        client fetched = {
                .id = id,
                .name = name,
                .surname = surname,
                .patronymic = patronymic,
                .passport = passport,
                .address = address,
                .phone = phone
        };

        return fetched;
    }

    client update(const client& client_) {
        if (!client_.id.has_value()) {
            throw std::runtime_error("[client_mapper]: record doesn't exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "update clients" << std::endl <<
                      "set " <<
                      "name=" << '\'' << client_.name << '\'' << ',' <<
                      "surname=" << '\'' << client_.surname << '\'' << ',' <<
                      "patronymic=" << '\'' << client_.patronymic << '\'' << ',' <<
                      "passport=" << '\'' << client_.passport << '\'' << ',' <<
                      "address=" << '\'' << client_.address << '\'' << ',' <<
                      "phone=" << '\'' << client_.phone << '\'' << std::endl <<
                      "where id = " << client_.id.value() << std::endl <<
                      "returning *";

        SQLHSTMT statement = executor_->execute(query_builder.str());

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

        client fetched = {
                .id = id,
                .name = name,
                .surname = surname,
                .patronymic = patronymic,
                .passport = passport,
                .address = address,
                .phone = phone
        };

        return fetched;
    }

    client remove(int id_) {
        std::stringstream query_builder;

        query_builder <<
                      "delete from clients" << std::endl <<
                      "where id = " << id_ << std::endl <<
                      "returning *";

        SQLHSTMT statement = executor_->execute(query_builder.str());

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

        client fetched = {
                .id = id,
                .name = name,
                .surname = surname,
                .patronymic = patronymic,
                .passport = passport,
                .address = address,
                .phone = phone
        };

        return fetched;
    }

private:
    sql_executor* executor_;
};

#endif //DATABASE_PROGRAMMING_1_CLIENT_MAPPER_HPP
