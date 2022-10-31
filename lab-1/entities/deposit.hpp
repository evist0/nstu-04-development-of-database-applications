#ifndef DATABASE_PROGRAMMING_1_DEPOSIT_HPP
#define DATABASE_PROGRAMMING_1_DEPOSIT_HPP

#include <optional>
#include <utility>

struct deposit {
    std::optional<int> id;

    std::wstring name;

    int term;
    float annual;

    static deposit read(std::wistream& in, std::wostream& out) {
        std::wstring name_;
        int term_;
        float annual_;

        out << L"Введите название:" << std::endl;
        in >> name_;

        out << L"Введите длительность (месяцев):" << std::endl;
        in >> term_;

        out << L"Введите процент:" << std::endl;
        in >> annual_;

        return { .name = name_, .term=term_, .annual=annual_ };
    }

    friend std::wostream& operator<<(std::wostream& out, deposit& deposit_) {
        if (deposit_.id.has_value()) {
            out << deposit_.id.value() << ' ';
        }

        out << deposit_.name << ' ' << deposit_.term << ' ' << deposit_.annual;
    };
};

#endif //DATABASE_PROGRAMMING_1_DEPOSIT_HPP
