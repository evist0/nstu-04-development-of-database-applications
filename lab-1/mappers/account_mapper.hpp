#ifndef DATABASE_PROGRAMMING_1_ACCOUNT_MAPPER_HPP
#define DATABASE_PROGRAMMING_1_ACCOUNT_MAPPER_HPP

#include <vector>
#include "sql_executor.hpp"
#include "entities/account.hpp"

class account_mapper {
public:
    explicit account_mapper(sql_executor* executor)
            :executor_(executor) {
        auto query =
                "create table if not exists accounts\n"
                "(\n"
                "    id           serial primary key,\n"
                "\n"
                "    deposit_id   integer not null,\n"
                "    client_id    integer not null,\n"
                "\n"
                "    opening_date date    not null,\n"
                "    closing_date date    not null,\n"
                "\n"
                "    constraint fk_deposit_id\n"
                "        foreign key (deposit_id)\n"
                "            references deposits (id)\n"
                "            on delete cascade,\n"
                "\n"
                "    constraint fk_client_id\n"
                "        foreign key (client_id)\n"
                "            references clients (id)\n"
                "            on delete cascade\n"
                ")";

        SQLHSTMT statement = executor_->execute(query);
        auto retcode = SQLFetch(statement);
    };

    account create(const account& account_) {
        std::wstringstream query_builder;

        query_builder <<
                      "insert into accounts(deposit_id, client_id, opening_date, closing_date)" << std::endl <<
                      "values" << std::endl << '(' <<
                      account_.deposit_id << ',' <<
                      account_.client_id << ',' <<

                      // 'yyyy-mm-dd',
                      '\'' << account_.opening_date.year << '-' << account_.opening_date.month << '-'
                      << account_.opening_date.day << '\'' << ',' <<

                      // 'yyyy-mm-dd'
                      '\'' << account_.closing_date.year << '-' << account_.closing_date.month << '-'
                      << account_.closing_date.day << '\'' <<

                      ')' << std::endl <<
                      "returning id";

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);

        retcode = SQLFetch(statement);

        auto new_account = account_;
        new_account.id = id;
        return new_account;
    }

    std::vector<account> read() {
        SQLHSTMT statement = executor_->execute("select * from accounts");

        std::vector<account> result;

        SQLINTEGER id;
        SQLINTEGER deposit_id;
        SQLINTEGER client_id;
        SQL_DATE_STRUCT opening_date;
        SQL_DATE_STRUCT closing_date;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_LONG, &deposit_id, 0, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &client_id, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_DATE, &opening_date, 0, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_DATE, &closing_date, 0, nullptr);

        while (true) {
            retcode = SQLFetch(statement);

            if (retcode == SQL_SUCCESS || retcode == SQL_SUCCESS_WITH_INFO) {
                result.push_back({
                        .id = id,
                        .deposit_id = deposit_id,
                        .client_id = client_id,
                        .opening_date = opening_date,
                        .closing_date = closing_date
                });
            }
            else if (retcode == SQL_NO_DATA) {
                break;
            }
        }

        return result;
    }

    account read(int id_) {
        std::stringstream query_builder;

        query_builder <<
                      "select * from accounts" << std::endl <<
                      "where id = " << id_;

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLINTEGER deposit_id;
        SQLINTEGER client_id;
        SQL_DATE_STRUCT opening_date;
        SQL_DATE_STRUCT closing_date;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_LONG, &deposit_id, 0, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &client_id, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_DATE, &opening_date, 0, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_DATE, &closing_date, 0, nullptr);

        retcode = SQLFetch(statement);

        account fetched = {
                .id = id,
                .deposit_id = deposit_id,
                .client_id = client_id,
                .opening_date = opening_date,
                .closing_date = closing_date
        };

        return fetched;
    }

    account update(const account& account_) {
        if (!account_.id.has_value()) {
            throw std::runtime_error("[account_mapper]: record doesn't exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "update accounts" << std::endl <<
                      "set " <<
                      "deposit_id=" << account_.deposit_id << ',' <<
                      "client_id=" << account_.client_id << ',' <<
                      "opening_date=" << '\'' << account_.opening_date.year << '-' << account_.opening_date.month << '-'
                      << account_.opening_date.day << '\'' << ',' <<
                      "closing_date=" << '\'' << account_.closing_date.year << '-' << account_.closing_date.month << '-'
                      << account_.closing_date.day << '\'' << ',' <<
                      "where id = " << account_.id.value() << std::endl <<
                      "returning *";

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLINTEGER deposit_id;
        SQLINTEGER client_id;
        SQL_DATE_STRUCT opening_date;
        SQL_DATE_STRUCT closing_date;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_LONG, &deposit_id, 0, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &client_id, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_DATE, &opening_date, 0, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_DATE, &closing_date, 0, nullptr);

        retcode = SQLFetch(statement);

        account fetched = {
                .id = id,
                .deposit_id = deposit_id,
                .client_id = client_id,
                .opening_date = opening_date,
                .closing_date = closing_date
        };

        return fetched;
    }

    account remove(int id_) {
        std::stringstream query_builder;

        query_builder <<
                      "delete from accounts" << std::endl <<
                      "where id = " << id_ << std::endl <<
                      "returning *";

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLINTEGER deposit_id;
        SQLINTEGER client_id;
        SQL_DATE_STRUCT opening_date;
        SQL_DATE_STRUCT closing_date;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_LONG, &deposit_id, 0, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &client_id, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_DATE, &opening_date, 0, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_DATE, &closing_date, 0, nullptr);

        retcode = SQLFetch(statement);

        account fetched = {
                .id = id,
                .deposit_id = deposit_id,
                .client_id = client_id,
                .opening_date = opening_date,
                .closing_date = closing_date
        };

        return fetched;
    }

private:
    sql_executor* executor_;
};

#endif //DATABASE_PROGRAMMING_1_ACCOUNT_MAPPER_HPP
