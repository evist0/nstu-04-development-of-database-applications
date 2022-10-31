#ifndef DATABASE_PROGRAMMING_1_ACCOUNT_HPP
#define DATABASE_PROGRAMMING_1_ACCOUNT_HPP

#include <optional>
#include <sqlext.h>

struct account {
    std::optional<int> id;

    int deposit_id = 0;
    int client_id = 0;

    DATE_STRUCT opening_date = { .year=2000, .month = 0, .day = 0 };
    DATE_STRUCT closing_date = { .year=2000, .month = 0, .day = 0 };

    static account read(std::wistream& in, std::wostream& out) {
        int deposit_id_, client_id_;

        DATE_STRUCT opening_date_, closing_date_;

        out << L"Введите ID вклада:" << std::endl;
        in >> deposit_id_;

        out << L"Введите ID клиента:" << std::endl;
        in >> client_id_;

        out << L"Дата открытия:" << std::endl;
        out << L"Введите День:" << std::endl;
        in >> opening_date_.day;
        out << L"Введите Месяц:" << std::endl;
        in >> opening_date_.month;
        out << L"Введите Год:" << std::endl;
        in >> opening_date_.year;

        out << L"Дата закрытия:" << std::endl;
        out << L"Введите День:" << std::endl;
        in >> closing_date_.day;
        out << L"Введите Месяц:" << std::endl;
        in >> closing_date_.month;
        out << L"Введите Год:" << std::endl;
        in >> closing_date_.year;

        return { .deposit_id = deposit_id_, .client_id = client_id_, .opening_date = opening_date_, .closing_date = closing_date_ };
    }

    friend std::wostream& operator<<(std::wostream& out, account& account_) {
        if (account_.id.has_value()) {
            out << account_.id.value() << ' ';
        }

        out << account_.deposit_id << ' ' << account_.client_id << ' '
            << account_.opening_date.day << '-' << account_.opening_date.month << '-' << account_.opening_date.year
            << ' '
            << account_.closing_date.day << '-' << account_.closing_date.month << '-' << account_.closing_date.year;

        return out;
    };
};

#endif //DATABASE_PROGRAMMING_1_ACCOUNT_HPP
