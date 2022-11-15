#ifndef DATABASE_PROGRAMMING_1_ACCOUNT_HPP
#define DATABASE_PROGRAMMING_1_ACCOUNT_HPP

#include <optional>
#include "windows.h"
#include <sql.h>
#include <sqlext.h>
#include <ctime>
#include <entities/client.hpp>
#include <entities/deposit.hpp>
#include <mappers/client_mapper.hpp>
#include <mappers/deposit_mapper.hpp>

class account {
public:
    std::optional<int> id;

    client* client;
    deposit* deposit;

    DATE_STRUCT opening_date{};
    DATE_STRUCT closing_date{};

    account() = default;
    account(class client* client, class deposit* deposit);
    account(int id, class client* client, class deposit* deposit);

    static account* read(std::wistream& in, std::wostream& out, client_mapper& client_mapper, deposit_mapper& deposit_mapper) {
        int deposit_position, client_position;

        auto deposits = deposit_mapper.read();
        auto position = 1;
        for (auto deposit: deposits) {
            std::wcout << position++ << L". " << deposit << std::endl;
        }
        out << L"Введите позицию вклада:" << std::endl;
        in >> deposit_position;
        auto deposit = deposit_mapper.read(deposit_position - 1);

        auto clients = client_mapper.read();
        position = 1;
        for (auto client: clients) {
            std::wcout << position++ << L". " << client << std::endl;
        }
        out << L"Введите позицию клиента:" << std::endl;
        in >> client_position;
        auto client = client_mapper.read(client_position - 1);


        // Даты
        std::time_t t = std::time(nullptr);
        std::tm* const pTInfo = std::localtime(&t);

        DATE_STRUCT opening_date = { .year = (SQLSMALLINT)(1900 + pTInfo->tm_year), .month = (SQLUSMALLINT)(1 + pTInfo->tm_mon), .day = (SQLUSMALLINT)(pTInfo->tm_mday) };

        int closing_month = (opening_date.month + deposit->term) % 12;
        int closing_year = opening_date.year + (closing_month / 12);

        DATE_STRUCT closing_date = { .year = (SQLSMALLINT)(closing_year), .month = (SQLUSMALLINT)(closing_month), .day = opening_date.day };

        auto result = new account();

        result->client = client;
        result->deposit = deposit;
        result->opening_date = opening_date;
        result->closing_date = closing_date;

        return result;
    }

    friend std::wostream& operator<<(std::wostream& out, account& account);
    friend std::wostream& operator<<(std::wostream& out, account* account);
private:
    void set_dates();
};

#endif //DATABASE_PROGRAMMING_1_ACCOUNT_HPP
