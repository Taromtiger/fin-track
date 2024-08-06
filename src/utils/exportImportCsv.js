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
      complete: async function (results) {
        console.log(results.data.length <= 1);
        if (results.data.length <= 1) {
          toast.error('File is Empty');
        } else {
          for (const transaction of results.data) {
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
