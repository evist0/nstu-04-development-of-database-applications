#include "client.hpp"

std::wostream& operator<<(std::wostream& out, client& client_) {
    out << &client_;
    return out;
}

std::wostream& operator<<(std::wostream& out, client* client_) {
    out << L"Имя: " << client_->name << std::endl
        << L"Фамилия: " << client_->surname << std::endl
        << L"Отчество: " << client_->patronymic << std::endl
        << L"Паспорт: " << client_->passport << std::endl
        << L"Адрес: " << client_->address << std::endl
        << L"Телефон:  " << client_->phone << std::endl;

    return out;
}
