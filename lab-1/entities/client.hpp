#ifndef DATABASE_PROGRAMMING_1_CLIENT_HPP
#define DATABASE_PROGRAMMING_1_CLIENT_HPP

#include <optional>
#include <string>
#include <vector>
#include <iostream>

class client {
public:
    std::optional<int> id;

    std::wstring name;
    std::wstring surname;
    std::wstring patronymic;

    std::wstring passport;

    std::wstring address;

    std::wstring phone;

    static client* read(std::wistream& in, std::wostream& out) {
        std::wstring name_;
        std::wstring surname_;
        std::wstring patronymic_;

        std::wstring passport_;

        std::wstring address_;

        std::wstring phone_;

        out << L"Введите Фамилию:" << std::endl;
        in >> surname_;

        out << L"Введите Имя:" << std::endl;
        in >> name_;

        out << L"Введите Отчество:" << std::endl;
        in >> patronymic_;

        out << L"Введите Паспорт:" << std::endl;
        in >> passport_;

        out << L"Введите Телефон:" << std::endl;
        in >> phone_;

        out << L"Введите Адрес:" << std::endl;
        in >> address_;

        auto result = new client();

        result->name = name_;
        result->surname = surname_;
        result->patronymic = patronymic_;
        result->passport = passport_;
        result->address = address_;
        result->phone = phone_;

        return result;
    }

    friend std::wostream& operator<<(std::wostream& out, client& client_);

    friend std::wostream& operator<<(std::wostream& out, client* client_);
};
#endif //DATABASE_PROGRAMMING_1_CLIENT_HPP
