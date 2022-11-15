#include "deposit.hpp"

std::wostream& operator<<(std::wostream& out, deposit& deposit_) {
    out << &deposit_;
    return out;
}

std::wostream& operator<<(std::wostream& out, deposit* deposit_) {
    out << L"Название: " << deposit_->name << std::endl
        << L"Длительность: " << deposit_->term << std::endl
        << L"Ставка: " << deposit_->annual << std::endl;

    return out;
}