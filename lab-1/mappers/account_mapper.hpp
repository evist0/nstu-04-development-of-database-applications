#ifndef DATABASE_PROGRAMMING_1_ACCOUNT_MAPPER_HPP
#define DATABASE_PROGRAMMING_1_ACCOUNT_MAPPER_HPP

#include <vector>
#include <entities/account.hpp>
#include "sql_executor.hpp"

class account_mapper {
public:
    explicit account_mapper(sql_executor* executor, deposit_mapper* deposit_mapper, client_mapper* client_mapper)
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

        sql_statement statement = executor_->execute(query);
        auto retcode = SQLFetch(statement);

        this->deposit_mapper_ = deposit_mapper;
        this->client_mapper_ = client_mapper;
    };

    account* create(account* account) {
        if (account->id.has_value()) {
            throw std::runtime_error("[account_mapper]: already exists");
        }

        if (!account->client->id.has_value()) {
            client_mapper_->create(account->client);
        }

        if (!account->deposit->id.has_value()) {
            deposit_mapper_->create(account->deposit);
        }

        std::wstringstream query_builder;

        query_builder <<
                      "insert into accounts(deposit_id, client_id, opening_date, closing_date)" << std::endl <<
                      "values" << std::endl << '(' <<
                      account->deposit->id.value() << ',' <<
                      account->client->id.value() << ',' <<

                      // 'yyyy-mm-dd',
                      '\'' << account->opening_date.year << '-' << account->opening_date.month << '-'
                      << account->opening_date.day << '\'' << ',' <<

                      // 'yyyy-mm-dd'
                      '\'' << account->closing_date.year << '-' << account->closing_date.month << '-'
                      << account->closing_date.day << '\'' <<

                      ')' << std::endl <<
                      "returning id";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);

        retcode = SQLFetch(statement);

        account->id = id;

        this->accounts_.push_back(account);

        return account;
    }

    std::vector<account*> read() {
        sql_statement statement = executor_->execute(
                "select * from accounts");

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
                auto new_account = new account();
                new_account->id = id;
                new_account->deposit = deposit_mapper_->read_id(deposit_id);
                new_account->client = client_mapper_->read_id(client_id);
                new_account->opening_date = opening_date;
                new_account->closing_date = closing_date;

                bool found = false;
                for (auto account: accounts_) {
                    if (account->id.value() == new_account->id.value()) {
                        account->id = id;
                        account->deposit = new_account->deposit;
                        account->client = new_account->client;
                        account->opening_date = new_account->opening_date;
                        account->closing_date = new_account->closing_date;
                        found = true;
                    }
                }

                if (!found) {
                    accounts_.push_back(new_account);
                }
                else {
                    delete new_account;
                }
            }
            else if (retcode == SQL_NO_DATA) {
                break;
            }
        }

        return accounts_;
    }

    account* read(const int& position) {
        if (position > accounts_.size()) {
            throw std::runtime_error("[account_mapper]: out of bounds");
        }

        return accounts_[position];
    }

    account* read_id(const int& id) {
        account* result = nullptr;

        // Ищем локально
        for (auto account: accounts_) {
            if (account->id == id) {
                result = account;
                return result;
            }
        }

        std::stringstream query_builder;

        query_builder <<
                      "select * from accounts" << std::endl <<
                      "where id = " << id;

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER deposit_id;
        SQLINTEGER client_id;
        SQL_DATE_STRUCT opening_date;
        SQL_DATE_STRUCT closing_date;

        auto retcode = SQLBindCol(statement, 2, SQL_C_LONG, &deposit_id, 0, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &client_id, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_DATE, &opening_date, 0, nullptr);
        retcode = SQLBindCol(statement, 5, SQL_C_DATE, &closing_date, 0, nullptr);

        retcode = SQLFetch(statement);

        // Сохранили локально
        result = new account();
        result->id = id;
        result->deposit = deposit_mapper_->read_id(deposit_id);
        result->client = client_mapper_->read_id(client_id);
        result->opening_date = opening_date;
        result->closing_date = closing_date;

        accounts_.push_back(result);

        return result;
    }

    account* update(account* account) {
        if (!account->id.has_value()) {
            throw std::runtime_error("[account_mapper]: record doesn't exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "update accounts" << std::endl <<
                      "set " <<
                      "deposit_id=" << account->deposit->id.value() << ',' <<
                      "client_id=" << account->client->id.value() << std::endl <<
                      "where id = " << account->id.value() << std::endl <<
                      "returning *";

        sql_statement statement = executor_->execute(query_builder.str());

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

        account->deposit = deposit_mapper_->read_id(deposit_id);
        account->client = client_mapper_->read_id(deposit_id);

        return account;
    }

    int remove(const int& position) {
        if (position > accounts_.size()) {
            throw std::runtime_error("[account_mapper]: out of bounds");
        }

        std::stringstream query_builder;

        query_builder <<
                      "delete from accounts" << std::endl <<
                      "where id = " << accounts_[position]->id.value() << std::endl <<
                      "returning id";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLFetch(statement);

        delete accounts_[position];
        accounts_.erase(accounts_.begin() + position);

        return id;
    }

private:
    sql_executor* executor_;
    deposit_mapper* deposit_mapper_;
    client_mapper* client_mapper_;

    std::vector<account*> accounts_;
};

#endif //DATABASE_PROGRAMMING_1_ACCOUNT_MAPPER_HPP
