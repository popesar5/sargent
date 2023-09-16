class BankAccount {
    constructor(accountHolderName, accountType, initialBalance) {
      this.accountHolderName = accountHolderName;
      this.accountType = accountType;
      this.balance = initialBalance;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Invalid deposit amount. Please enter a positive value.");
        }
        this.balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Invalid withdrawal amount. Please enter a positive value.");
        }
        if (this.balance >= amount) {
            this.balance -= amount;
        } else {
            throw new Error("Insufficient funds");
        }
    }

    checkBalance() {
      return this.balance;
    }

    transfer(amount, targetAccount) {
        if (amount <= 0) {
            throw new Error("Invalid transfer amount. Please enter a positive value.");
        }
        if (this.balance >= amount) {
            this.balance -= amount;
            targetAccount.deposit(amount);
        } else {
            throw new Error("Insufficient funds");
        }
    }
}

    let bankAccount;

    function createAccount() {
        const accountName = document.getElementById("accountName").value;
        const accountType = document.getElementById("accountType").value;
        const initialBalance = parseFloat(document.getElementById("initialBalance").value);

        if (accountName === "" || accountType === "" || isNaN(initialBalance)) {
            document.getElementById("resultArea").innerHTML = "Please fill in all fields with valid values.";
            return;
        }

        bankAccount = new BankAccount(accountName, accountType, initialBalance);
        document.getElementById("resultArea").innerHTML = `Account created successfully for ${accountName}.`;
        toggleTransactionArea(true);
    }

    function executeTransaction(transactionType) {
        const amount = parseFloat(document.getElementById("transactionAmount").value);

        try {
            switch (transactionType) {
                case "deposit":
                bankAccount.deposit(amount);
                document.getElementById("resultArea").innerHTML = `Deposit of $${amount.toFixed(2)} successful. New balance: $${bankAccount.checkBalance().toFixed(2)}`;
                break;

                case "withdraw":
                    bankAccount.withdraw(amount);
                    document.getElementById("resultArea").innerHTML = `Withdrawal of $${amount.toFixed(2)} successful. New balance: $${bankAccount.checkBalance().toFixed(2)}`;
                    break;

                case "checkBalance":
                    document.getElementById("resultArea").innerHTML = `Current balance: $${bankAccount.checkBalance().toFixed(2)}`;
                    break;

                case "transfer":
                    const targetAccountName = prompt("Enter the account holder name to transfer funds to:");
                    const targetAccount = new BankAccount(targetAccountName, "", 0);
                    bankAccount.transfer(amount, targetAccount);
                    document.getElementById("resultArea").innerHTML = `Transfer of $${amount.toFixed(2)} to ${targetAccountName} successful. New balance: $${bankAccount.checkBalance().toFixed(2)}`;
                    break;

                default:
                    throw new Error("Invalid transaction type.");
            }
        } catch (error) {
            document.getElementById("resultArea").innerHTML = error.message;
        }
    }

    function toggleTransactionArea(show) {
        const transactionArea = document.getElementById("transactionArea");
        transactionArea.style.display = show ? "block" : "none";
    }