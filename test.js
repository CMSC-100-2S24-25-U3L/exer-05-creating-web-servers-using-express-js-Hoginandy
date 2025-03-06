import needle from 'needle';

// test cases
const booksToAdd = [
    { bookName: '1984', isbn: '1234567890', author: 'George Orwell', yearPublished: '1949' },
    { bookName: 'The Little Prince', isbn: '978-0156012195', author: 'Antoine Saint-Exupery', yearPublished: '1943' },
    { bookName: "Harry Potter and the Philosopher’s Stone", isbn: '0-7475-3849-2', author: 'J.K Rowling', yearPublished: '1997'},
    { bookName: "Harry Potter and the Chamber of Secrets", isbn: '0-7475-3849-2', author: 'J.K Rowling', yearPublished: '1998'}
];

// adds each book
booksToAdd.forEach((book) => {
    needle.post(
        'http://localhost:3000/add-book',
        book,
        { json: true },
        (err, res) => {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('Is book added: ', res.body);
            }
        }
    );
});

// test case 1
needle.get('http://localhost:3000/find-by-isbn-and-author?isbn=1234567890&author=George%20Orwell', (err, res) => {
    console.log('Find by ISBN and Author (1984):', res.body);
});

// test case 2
needle.get('http://localhost:3000/find-by-author?author=Antoine%20Saint-Exupery', (err, res) => {
    console.log('Find by Author (Little Prince):', res.body);
});
