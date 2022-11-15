#ifndef DATABASE_PROGRAMMING_1_DEPOSIT_HPP
#define DATABASE_PROGRAMMING_1_DEPOSIT_HPP

#include <optional>
#include <string>
#include <vector>
#include <iostream>

class deposit {
public:
    std::optional<int> id;
    std::wstring name;

    int term;
    float annual;

    static deposit* read(std::wistream& in, std::wostream& out) {
        std::wstring name_;
        int term_;
        float annual_;

        out << L"Введите название:" << std::endl;
        in >> name_;

        out << L"Введите длительность:" << std::endl;
        in >> term_;

        out << L"Введите процентную ставку" << std::endl;
        in >> annual_;

        auto result = new deposit();
        result->name = name_;
        result->term = term_;
        result->annual = annual_;

        return result;
    }

    friend std::wostream& operator<<(std::wostream& out, deposit& deposit_);
    friend std::wostream& operator<<(std::wostream& out, deposit* deposit_);
};

#endif //DATABASE_PROGRAMMING_1_DEPOSIT_HPP
