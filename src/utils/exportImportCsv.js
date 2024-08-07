import Papa, { parse } from 'papaparse';
import { addTransactionToDb } from '../firebase/addTransactionToDb';
import { toast } from 'react-toastify';

export const handleExportCsv = (transactions) => {
  const csv = Papa.unparse(transactions, {
    header: true,
    fields: ['date', 'type', 'name', 'amount', 'tag'],
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const handleImportCsv = (event, user) => {
  try {
    parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const validTransactions = results.data.filter((transaction) =>
          Object.values(transaction).some((value) => value)
        );

        if (validTransactions.length === 0) {
          toast.error('File is empty');
          return;
        } else {
          for (const transaction of validTransactions) {
            await addTransactionToDb(user, transaction);
          }
        }
      },
    });
    event.target.files = '';
  } catch (e) {
    console.log(e.message);
  }
};
