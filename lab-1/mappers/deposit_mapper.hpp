#ifndef DATABASE_PROGRAMMING_1_DEPOSIT_MAPPER_HPP
#define DATABASE_PROGRAMMING_1_DEPOSIT_MAPPER_HPP

#include <vector>
#include "sql_executor.hpp"
#include "entities/deposit.hpp"

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

        SQLHSTMT statement = executor_->execute(query);
        auto retcode = SQLFetch(statement);
    };

    deposit create(const deposit& deposit_) {
        std::wstringstream query_builder;

        query_builder <<
                      "insert into deposits(name, term, annual)" << std::endl <<
                      "values" << std::endl << '(' <<
                      '\'' << deposit_.name << '\'' << ',' <<
                      deposit_.term << ',' <<
                      deposit_.annual <<
                      ')' << std::endl <<
                      "returning id";

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);

        retcode = SQLFetch(statement);

        auto new_deposit = deposit_;
        new_deposit.id = id;
        return new_deposit;
    }

    std::vector<deposit> read() {
        SQLHSTMT statement = executor_->execute("select * from deposits");

        std::vector<deposit> result;

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
                result.push_back({ .id = id, .name = name, .term = term, .annual = annual });
            }
            else if (retcode == SQL_NO_DATA) {
                break;
            }
        }

        return result;
    }

    deposit read(int id_) {
        std::stringstream query_builder;

        query_builder <<
                      "select * from deposits" << std::endl <<
                      "where id = " << id_;

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLWCHAR name[255];
        SQLINTEGER term;
        SQLREAL annual;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &term, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_FLOAT, &annual, 0, nullptr);

        retcode = SQLFetch(statement);

        deposit fetched = {
                .id = id,
                .name = name,
                .term = term,
                .annual = annual,
        };

        return fetched;
    }

    deposit update(const deposit& deposit_) {
        if (!deposit_.id.has_value()) {
            throw std::runtime_error("[deposit_mapper]: record doesn't exists");
        }

        std::wstringstream query_builder;

        query_builder <<
                      "update deposits" << std::endl <<
                      "set " <<
                      "name=" << '\'' << deposit_.name << '\'' << ',' <<
                      "term=" << deposit_.term << ',' <<
                      "annual=" << deposit_.annual << std::endl <<
                      "where id = " << deposit_.id.value() << std::endl <<
                      "returning *";

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLWCHAR name[255];
        SQLINTEGER term;
        SQLREAL annual;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &term, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_FLOAT, &annual, 0, nullptr);

        retcode = SQLFetch(statement);

        deposit fetched = {
                .id = id,
                .name = name,
                .term = term,
                .annual = annual
        };

        return fetched;
    }

    deposit remove(int id_) {
        std::stringstream query_builder;

        query_builder <<
                      "delete from deposits" << std::endl <<
                      "where id = " << id_ << std::endl <<
                      "returning *";

        SQLHSTMT statement = executor_->execute(query_builder.str());

        SQLINTEGER id;
        SQLWCHAR name[255];
        SQLINTEGER term;
        SQLREAL annual;

        auto retcode = SQLBindCol(statement, 1, SQL_C_LONG, &id, 0, nullptr);
        retcode = SQLBindCol(statement, 2, SQL_C_WCHAR, &name, 255, nullptr);
        retcode = SQLBindCol(statement, 3, SQL_C_LONG, &term, 0, nullptr);
        retcode = SQLBindCol(statement, 4, SQL_C_FLOAT, &annual, 0, nullptr);

        retcode = SQLFetch(statement);

        deposit fetched = {
                .id = id,
                .name = name,
                .term = term,
                .annual = annual
        };

        return fetched;
    }

private:
    sql_executor* executor_;
};

#endif //DATABASE_PROGRAMMING_1_DEPOSIT_MAPPER_HPP
