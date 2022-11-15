#include "account.hpp"

account::account(class client* client, class deposit* deposit) {
    this->client = client;
    this->deposit = deposit;

    this->set_dates();
};

account::account(int id, class client* client, class deposit* deposit) {
    this->id = id;
    this->client = client;
    this->deposit = deposit;

    this->set_dates();
};

std::wostream& operator<<(std::wostream& out, account& account) {
    out << &account;
    return out;
}

std::wostream& operator<<(std::wostream& out, account* account) {
    out << L"ФИО Клиента: " << account->client->surname << L" " << account->client->name << L" "
        << account->client->patronymic << std::endl << std::endl
        << L"Информация о тарифе: " << std::endl
        << account->deposit << std::endl;

    return out;
}

void account::set_dates() {
    std::time_t t = std::time(nullptr);
    std::tm* const pTInfo = std::localtime(&t);

    this->opening_date = { .year = (SQLSMALLINT)(1900 + pTInfo->tm_year), .month = (SQLUSMALLINT)(1 + pTInfo->tm_mon), .day = (SQLUSMALLINT)(pTInfo->tm_mday) };

    int closing_month = (this->opening_date.month + this->deposit->term) % 12;
    int closing_year = this->opening_date.year + (closing_month / 12);

    this->closing_date = { .year = (SQLSMALLINT)(closing_year), .month = (SQLUSMALLINT)closing_month, .day = this->opening_date.day };
}
