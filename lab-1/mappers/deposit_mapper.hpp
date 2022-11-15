#ifndef DATABASE_PROGRAMMING_1_DEPOSIT_MAPPER_HPP
#define DATABASE_PROGRAMMING_1_DEPOSIT_MAPPER_HPP

#include <vector>
#include <entities/deposit.hpp>
#include "sql_executor.hpp"

class deposit_mapper {
public:
    explicit deposit_mapper(sql_executor* executor)
            :executor_(executor) {
        auto query =
                "create table if not exists deposits\n"
                "(\n"
                "    id     serial primary key,\n"
                "\n"
                "    name   varchar(255) not null,\n"
                "\n"
                "    term   integer      not null,\n"
                "    annual decimal      not null\n"
                ")";

        sql_statement statement = executor_->execute(query);
        auto retcode = SQLFetch(statement);
    };

    deposit* create(deposit* deposit) {
        if (deposit->id.has_value()) {
            throw std::runtime_error("[deposit_mapper]: already exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "insert into deposits(name, term, annual)" << std::endl <<
                      "values" << std::endl << '(' <<
                      '\'' << deposit->name << '\'' << ',' <<
                      deposit->term << ',' <<
                      deposit->annual <<
                      ')' << std::endl <<
                      "returning id";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);

        retcode = SQLFetch(statement);

        deposit->id = id;

        this->deposits_.push_back(deposit);

        return deposit;
    }

    std::vector<deposit*> read() {
        sql_statement statement = executor_->execute("select * from deposits");

        SQLINTEGER id;
        SQLWCHAR name[255];
        SQLINTEGER term;
        SQLREAL annual;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &term, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_FLOAT, &annual, 0, nullptr);

        while (true) {
            retcode = SQLFetch(statement);

            if (retcode == SQL_SUCCESS || retcode == SQL_SUCCESS_WITH_INFO) {
                auto new_deposit = new deposit();
                new_deposit->id = id;
                new_deposit->name = name;
                new_deposit->annual = annual;
                new_deposit->term = term;

                bool found = false;
                for (auto deposit: deposits_) {
                    if (deposit->id.value() == new_deposit->id.value()) {
                        deposit->id = id;
                        deposit->name = name;
                        deposit->annual = annual;
                        deposit->term = term;
                        found = true;
                    }
                }

                if (!found) {
                    deposits_.push_back(new_deposit);
                } else {
                    delete new_deposit;
                }
            }
            else if (retcode == SQL_NO_DATA) {
                break;
            }
        }

        return deposits_;
    }

    deposit* read(const int& position) {
        if (position > deposits_.size()) {
            throw std::runtime_error("[deposit_mapper]: out of bounds");
        }

        return deposits_[position];
    }

    deposit* read_id(const int& id) {
        deposit* result = nullptr;

        // Ищем локально
        for (auto deposit: deposits_) {
            if (deposit->id == id) {
                result = deposit;
                return result;
            }
        }

        // Если не нашли - получаем из БД
        std::stringstream query_builder;

        query_builder <<
                      "select * from deposits" << std::endl <<
                      "where id = " << id;

        sql_statement statement = executor_->execute(query_builder.str());

        SQLWCHAR name[255];
        SQLINTEGER term;
        SQLREAL annual;

        auto retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &term, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_FLOAT, &annual, 0, nullptr);

        retcode = SQLFetch(statement);

        // Сохранили локально
        result = new deposit();
        result->id = id;
        result->name = name;
        result->annual = annual;
        result->term = term;

        deposits_.push_back(result);

        return result;
    }

    deposit* update(deposit* deposit) {
        if (!deposit->id.has_value()) {
            throw std::runtime_error("[deposit_mapper]: record doesn't exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "update deposits" << std::endl <<
                      "set " <<
                      "name=" << '\'' << deposit->name << '\'' << ',' <<
                      "term=" << deposit->term << ',' <<
                      "annual=" << deposit->annual << std::endl <<
                      "where id = " << deposit->id.value() << std::endl <<
                      "returning *";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLWCHAR name[255];
        SQLINTEGER term;
        SQLREAL annual;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &term, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_FLOAT, &annual, 0, nullptr);

        retcode = SQLFetch(statement);

        deposit->name = name;
        deposit->term = term;
        deposit->annual = annual;

        return deposit;
    }

    int remove(const int& position) {
        if (position > deposits_.size()) {
            throw std::runtime_error("[deposit_mapper]: out of bounds");
        }

        std::stringstream query_builder;

        query_builder <<
                      "delete from deposits" << std::endl <<
                      "where id = " << deposits_[position]->id.value() << std::endl <<
                      "returning id";

        sql_statement statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLFetch(statement);

        delete deposits_[position];
        deposits_.erase(deposits_.begin() + position);

        return id;
    }

private:
    sql_executor* executor_;
    std::vector<deposit*> deposits_;
};

#endif //DATABASE_PROGRAMMING_1_DEPOSIT_MAPPER_HPP
