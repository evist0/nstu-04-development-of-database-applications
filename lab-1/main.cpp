#include <fcntl.h>
#include "sql_executor.hpp"

#include "mappers/client_mapper.hpp"
#include "mappers/deposit_mapper.hpp"
#include "mappers/account_mapper.hpp"

bool menu(deposit_mapper& deposit_instance, client_mapper& client_instance,
        account_mapper& account_instance) {
    auto should_break = false;

    while (!should_break) {
        int choice = -1;

        std::wcout << L"--- Счета ---" << std::endl
                   << L"1. Показать все счета" << std::endl
                   << L"2. Найти счёт по индентификатору" << std::endl
                   << L"3. Изменить данные счёта" << std::endl
                   << L"4. Создать счёт" << std::endl
                   << L"5. Удалить счёт" << std::endl << std::endl;

        std::wcout << L"--- Клиенты ---" << std::endl
                   << L"6. Показать всех клиентов" << std::endl
                   << L"7. Найти клиента по индентификатору" << std::endl
                   << L"8. Изменить данные клиента" << std::endl
                   << L"9. Создать клиента" << std::endl
                   << L"10. Удалить клиента" << std::endl << std::endl;

        std::wcout << L"--- Вклады ---" << std::endl
                   << L"11. Показать все вклады" << std::endl
                   << L"12. Найти вклад по индентификатору" << std::endl
                   << L"13. Изменить данные вклада" << std::endl
                   << L"14. Создать вклад" << std::endl
                   << L"15. Удалить вклад" << std::endl << std::endl;

        std::wcout << L"0. Выход" << std::endl;
        std::wcout << std::endl;

        std::wcin >> choice;

        // accounts
        // 1. Показать все счета
        if (choice == 1) {
            auto result = account_instance.read();

            std::wcout << L"ID " << L"Вклад " << L"Клиент " << L"Дата открытия " << L"Дата закрытия " << std::endl;
            for (auto account: result) {
                std::wcout << account << std::endl;
            }
            std::wcout << std::endl;
        }

        // 2. Найти счёт по идентификатору
        if (choice == 2) {
            int id;
            std::wcin >> id;

            auto result = account_instance.read(id);

            std::wcout << L"ID " << L"Вклад " << L"Клиент " << L"Дата открытия " << L"Дата закрытия " << std::endl;
            std::wcout << result << std::endl;
        }

        // 3. Изменить данные счёта [TBD]
        if (choice == 3) {
        }

        // 4. Создать счёт
        if (choice == 4) {
            auto account = account::read(std::wcin, std::wcout);
            auto result = account_instance.create(account);

            std::wcout << L"ID " << L"Вклад " << L"Клиент " << L"Дата открытия " << L"Дата закрытия " << std::endl;
            std::wcout << result << std::endl;
        }

        // 5. Удалить счёт
        if (choice == 4) {
            int id;
            std::wcin >> id;

            auto result = account_instance.remove(id);

            std::wcout << L"ID " << L"Вклад " << L"Клиент " << L"Дата открытия " << L"Дата закрытия " << std::endl;
            std::wcout << result << std::endl;
        }

        // clients
        // 6. Показать всех клиентов
        if (choice == 6) {
            auto result = client_instance.read();

            std::wcout << L"ID " << L"Фамилия " << L"Имя " << L"Отчество " << L"Паспорт " << L"Телефон " << L"Адрес " << std::endl;
            for (auto client: result) {
                std::wcout << client << std::endl;
            }
            std::wcout << std::endl;
        }

        // 7. Найти клиента по индентификатору
        if (choice == 7) {
            int id;
            std::wcin >> id;

            auto result = client_instance.read(id);

            std::wcout << L"ID " << L"Фамилия " << L"Имя " << L"Отчество " << L"Паспорт " << L"Телефон " << L"Адрес " << std::endl;
            std::wcout << result << std::endl;
        }

        // 8. Изменить данные клиента [TBD]
        if (choice == 8) {
        }

        // 9. Создать клиента
        if (choice == 9) {
            auto client = client::read(std::wcin, std::wcout);
            auto result = client_instance.create(client);

            std::wcout << L"ID " << L"Фамилия " << L"Имя " << L"Отчество " << L"Паспорт " << L"Телефон " << L"Адрес " << std::endl;
            std::wcout << result << std::endl;
        }

        // 10. Удалить клиента
        if (choice == 10) {
            int id;
            std::wcin >> id;

            auto result = client_instance.remove(id);

            std::wcout << L"ID " << L"Фамилия " << L"Имя " << L"Отчество " << L"Паспорт " << L"Телефон " << L"Адрес " << std::endl;
            std::wcout << result << std::endl;
        }

        // deposits
        // 11. Показать все вклады
        if (choice == 11) {
            auto result = deposit_instance.read();

            std::wcout << L"ID " << L"Название " << L"Длительность " << L"Процент " << std::endl;
            for (auto deposit: result) {
                std::wcout << deposit << std::endl;
            }
            std::wcout << std::endl;
        }

        // 12. Найти вклад по индентификатору
        if (choice == 12) {
            int id;
            std::wcin >> id;

            auto result = deposit_instance.read(id);

            std::wcout << L"ID " << L"Название " << L"Длительность " << L"Процент " << std::endl;
            std::wcout << result << std::endl;
        }

        // 13. Изменить данные вклада [TBD]
        if (choice == 13) {
        }

        // 14. Создать вклад
        if (choice == 14) {
            auto deposit = deposit::read(std::wcin, std::wcout);
            auto result = deposit_instance.create(deposit);

            std::wcout << L"ID " << L"Название " << L"Длительность " << L"Процент " << std::endl;
            std::wcout << result << std::endl;
        }

        // 15. Удалить вклад
        if (choice == 15) {
            int id;
            std::wcin >> id;

            auto result = deposit_instance.remove(id);

            std::wcout << L"ID " << L"Название " << L"Длительность " << L"Процент " << std::endl;
            std::wcout << result << std::endl;
        }

        // 0. Выход
        if (choice == 0) {
            should_break = true;
        }
    }

    return true;
}

int main(int argc, char** argv) {
    _setmode(_fileno(stdin), _O_U16TEXT);
    _setmode(_fileno(stdout), _O_U16TEXT);
    _setmode(_fileno(stderr), _O_U16TEXT);

    try {
        connection_data_s connection_data = {
                .username = "lab-1-user",
                .password = "123456As",
                .database = "lab-1",
                .server = "localhost",
                .port = "5432",
                .driver = "{PostgreSQL UNICODE}",
        };

        auto executor = sql_executor(connection_data);

        auto deposit_mapper_instance = deposit_mapper(&executor);
        auto client_mapper_instance = client_mapper(&executor);
        auto account_mapper_instance = account_mapper(&executor);

        menu(deposit_mapper_instance, client_mapper_instance, account_mapper_instance);
    }
        /* Connection catch */
    catch (const std::exception& ex) {
        std::wcerr << ex.what() << std::endl;
    }

    return 0;
}
