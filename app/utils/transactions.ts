// TODO: Adjust functions to use a database 

type Transaction = {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    date: string;
};

let transactions: Transaction[] = [];

// Registrar receita
export function registerIncome(amount: number, description: string) {
    const transaction: Transaction = {
        id: crypto.randomUUID(),
        type: 'income',
        amount,
        description,
        date: new Date().toISOString(),
    };
    transactions.push(transaction);
    return transaction;
}

// Registrar despesa
export function registerExpense(amount: number, description: string) {
    const transaction: Transaction = {
        id: crypto.randomUUID(),
        type: 'expense',
        amount,
        description,
        date: new Date().toISOString(),
    };
    transactions.push(transaction);
    return transaction;
}

// Retificar lançamento (editar)
export function editTransaction(id: string, newData: Partial<Transaction>) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        transactions[index] = { ...transactions[index], ...newData };
        return transactions[index];
    }
    return null;
}

// Excluir lançamento
export function deleteTransaction(id: string) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        return transactions.splice(index, 1)[0];
    }
    return null;
}
