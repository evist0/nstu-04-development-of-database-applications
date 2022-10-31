#ifndef DATABASE_PROGRAMMING_1_CLIENT_HPP
#define DATABASE_PROGRAMMING_1_CLIENT_HPP

#include <optional>
#include <utility>

struct client {
    std::optional<int> id;

    std::wstring name;
    std::wstring surname;
    std::wstring patronymic;

    std::wstring passport;

    std::wstring address;

    std::wstring phone;

    static client read(std::wistream& in, std::wostream& out) {
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

        return { .name = name_, .surname = surname_, .patronymic = patronymic_, .passport = passport_, .address = address_, .phone = phone_ };
    }

    friend std::wostream& operator<<(std::wostream& out, client& client_) {
        if (client_.id.has_value()) {
            out << client_.id.value() << ' ';
        }

        out << client_.surname << ' ' << client_.name << ' ' << client_.patronymic << ' '
            << client_.passport << ' ' << client_.phone << ' ' << client_.address;
    };
};

#endif //DATABASE_PROGRAMMING_1_CLIENT_HPP
