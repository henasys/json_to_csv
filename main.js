const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const initCsv = (outFilePath) => {
  const csvWriter = createCsvWriter({
    path: outFilePath,
    header: [
      { id: 'isbn13', title: 'ISBN13' },
      // { id: 'isbn', title: 'ISBN' },
      // { id: 'title', title: '제목' },
      // { id: 'author', title: '저자' },
      // { id: 'publisher', title: '출판사' },
      // { id: 'pubdate', title: '발행일' },
      // { id: 'image', title: '이미지' },
      // { id: 'link', title: '링크' },
      // { id: 'description', title: '개요' },
      // { id: 'toc', title: '목차' },
    ],
  });

  return csvWriter;
};

const writeCsv = (csvWriter, records) => {
  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log('...Done', records.length);
    });
};

function main() {
  const filePath = './librolove-2022-03-08.json';
  const outFilePath = 'librolove-2022-03-08.csv';

  const bookList = require(filePath);
  const csvWriter = initCsv(outFilePath);

  const records = [];
  bookList.forEach(({ fields }) => {
    const isbn13 = fields.isbn13;
    const isbn = fields.isbn;
    const title = fields.title;
    const author = fields.author;
    const publisher = fields.publisher;
    const pubdate = fields.pubdate;
    const image = fields.image;
    const link = fields.link;
    const description = fields.description;
    const toc = fields.toc;

    const isbnFix = isbn13 ? isbn13 : isbn;
    if (isbnFix) {
      if (typeof isbnFix === 'string' || isbnFix instanceof String) {
        if (isbnFix.length === 10 || isbnFix.length === 13) {
          records.push({ isbn13: isbnFix });
        }
      }
    }
  });

  writeCsv(csvWriter, records);
}

main();
