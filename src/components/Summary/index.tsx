import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((total, transaction) => {
        if (transaction.type === 'deposit') {
            total.deposity += transaction.amount;
            total.total += transaction.amount;
        } else {
            total.withdraw += transaction.amount;
            total.total -= transaction.amount;
        }

        return total;
    }, {
        deposity: 0,
        withdraw: 0,
        total: 0
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposity)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    - {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraw)}
                </strong>
            </div>

            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    );
}