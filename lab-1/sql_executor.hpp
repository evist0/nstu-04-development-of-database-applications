#ifndef DATABASE_PROGRAMMING_1_SQL_EXECUTOR_HPP
#define DATABASE_PROGRAMMING_1_SQL_EXECUTOR_HPP

#include <sstream>
#include <iostream>
#include "windows.h"
#include <sql.h>
#include <sqlext.h>
#include <string>

struct connection_data_s {
    const char* username;
    const char* password;
    const char* database;
    const char* server;
    const char* port;
    const char* driver;
};

class sql_executor {
public:
    explicit sql_executor(connection_data_s connection_data) {
        connect(connection_data);
    };

    SQLHSTMT execute(const wchar_t* sql) {
        reset_handler();

        SQLRETURN retcode = SQLExecDirectW(hstmt, (SQLWCHAR*)sql, SQL_NTS);

        if (SQL_SUCCEEDED(retcode) || retcode == SQL_NO_DATA) {
            return this->hstmt;
        }

        throw std::runtime_error(error(this->hstmt));
    };

    SQLHSTMT execute(const std::wstring& sql) {
        return this->execute(sql.c_str());
    };

    SQLHSTMT execute(const char* sql) {
        reset_handler();

        SQLRETURN retcode = SQLExecDirect(hstmt, (SQLCHAR*)sql, SQL_NTS);

        if (SQL_SUCCEEDED(retcode) || retcode == SQL_NO_DATA) {
            return this->hstmt;
        }

        throw std::runtime_error(error(this->hstmt));
    };

    SQLHSTMT execute(const std::string& sql) {
        return this->execute(sql.c_str());
    };

    std::string error(SQLHANDLE hStm = SQL_NULL_HANDLE) {
        wchar_t msg[SQL_MAX_MESSAGE_LENGTH + 1]{};
        SQLErrorW(henv, hdbc, hStm, nullptr, nullptr, (SQLWCHAR*)msg, sizeof(msg), nullptr);

        return { static_cast<char>(msg[0]), static_cast<char>(msg[SQL_MAX_MESSAGE_LENGTH]) };
    }

    ~sql_executor() {
        if (this->hstmt != SQL_NULL_HSTMT) {
            SQLFreeHandle(SQL_HANDLE_STMT, this->hstmt);
        }

        if (this->hdbc != SQL_NULL_HDBC) {
            SQLDisconnect(this->hdbc);
            SQLFreeHandle(SQL_HANDLE_DBC, this->hdbc);
        }

        if (this->henv != SQL_NULL_HENV) {
            SQLFreeHandle(SQL_HANDLE_ENV, this->henv);
        }
    }

private:
    SQLHENV henv = SQL_NULL_HENV;
    SQLHDBC hdbc = SQL_NULL_HDBC;
    SQLHSTMT hstmt = SQL_NULL_HSTMT;

    HWND desktopHandle = GetDesktopWindow();

    static std::string get_connection_string(connection_data_s connection_data) {
        std::stringstream connection_string;

        connection_string
                << "Driver=" << connection_data.driver << ";"
                << "Server=" << connection_data.server << ";"
                << "Port=" << connection_data.port << ";"
                << "Database=" << connection_data.database << ";"
                << "Uid=" << connection_data.username << ";"
                << "Pwd=" << connection_data.password << ";";

        return connection_string.str();
    };

    void connect(connection_data_s connection_data) {
        SQLRETURN retcode;

        SQLCHAR OutConnStr[255];
        SQLSMALLINT OutConnStrLen;

        // Allocate henv handle
        retcode = SQLAllocHandle(SQL_HANDLE_ENV, SQL_NULL_HANDLE, &henv);
        if (retcode != SQL_SUCCESS && retcode != SQL_SUCCESS_WITH_INFO) {
            throw std::runtime_error("Unable to allocate henv handle");
        }

        // Set the ODBC version environment attribute
        retcode = SQLSetEnvAttr(henv, SQL_ATTR_ODBC_VERSION, (SQLPOINTER*)SQL_OV_ODBC3, 0);
        if (retcode != SQL_SUCCESS && retcode != SQL_SUCCESS_WITH_INFO) {
            SQLFreeHandle(SQL_HANDLE_ENV, henv);

            throw std::runtime_error("Unable to set the ODBC version environment attribute");
        }

        // Allocate connection handle
        retcode = SQLAllocHandle(SQL_HANDLE_DBC, henv, &hdbc);
        if (retcode != SQL_SUCCESS && retcode != SQL_SUCCESS_WITH_INFO) {
            SQLFreeHandle(SQL_HANDLE_ENV, henv);

            throw std::runtime_error("Unable to allocate connection handle");
        }

        // Set login timeout to 5 seconds
        SQLSetConnectAttr(hdbc, SQL_LOGIN_TIMEOUT, (SQLPOINTER)5, 0);

        auto connectionString = get_connection_string(connection_data);

        retcode = SQLDriverConnect( // SQL_NULL_HDBC
                hdbc,
                desktopHandle,
                (SQLCHAR*)connectionString.c_str(),
                SQL_NTS,
                OutConnStr,
                255,
                &OutConnStrLen,
                SQL_DRIVER_NOPROMPT);
        if (retcode != SQL_SUCCESS && retcode != SQL_SUCCESS_WITH_INFO) {
            SQLFreeHandle(SQL_HANDLE_DBC, hdbc);
            SQLFreeHandle(SQL_HANDLE_ENV, henv);

            throw std::runtime_error("Unable to connect database");
        }

        // Allocate statement handle
        retcode = SQLAllocHandle(SQL_HANDLE_STMT, hdbc, &hstmt);
        if (retcode != SQL_SUCCESS && retcode != SQL_SUCCESS_WITH_INFO) {
            SQLDisconnect(hdbc);
            SQLFreeHandle(SQL_HANDLE_DBC, hdbc);
            SQLFreeHandle(SQL_HANDLE_ENV, henv);

            throw std::runtime_error("Unable to allocate statement handle");
        }
    };

    void reset_handler() {
        if (this->hstmt != SQL_NULL_HSTMT) {
            SQLFreeHandle(SQL_HANDLE_STMT, this->hstmt);

            // Allocate statement handle
            auto retcode = SQLAllocHandle(SQL_HANDLE_STMT, hdbc, &hstmt);
            if (retcode != SQL_SUCCESS && retcode != SQL_SUCCESS_WITH_INFO) {
                SQLDisconnect(hdbc);
                SQLFreeHandle(SQL_HANDLE_DBC, hdbc);
                SQLFreeHandle(SQL_HANDLE_ENV, henv);

                throw std::runtime_error("Unable to allocate statement handle");
            }
        }
    };
};

#endif //DATABASE_PROGRAMMING_1_SQL_EXECUTOR_HPP
