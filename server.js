import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

const BOOKS_FILE = 'books.txt';

// creates file if file doesn't exist
if (!fs.existsSync(BOOKS_FILE)) {
    fs.writeFileSync(BOOKS_FILE, '', 'utf8');
}

// adds book to file
app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body;

    console.log('Received Data:', req.body);

    if (!bookName || !isbn || !author || !yearPublished) {
        console.error('Missing required fields');
        return res.json({ success: false, message: 'Missing required fields' });
    }

    const bookEntry = `${bookName},${isbn},${author},${yearPublished}\n`;

    fs.appendFile(BOOKS_FILE, bookEntry, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.json({ success: false, message: 'File write error' });
        }
        res.json({ success: true });
    });
});

// find by isbn and author
app.get('/find-by-isbn-and-author', (req, res) => {
    const { isbn, author } = req.query;

    if (!isbn || !author) {
        return res.json({ success: false, message: 'ISBN and Author query parameters are required' });
    }

    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.json({ success: false, message: 'File read error' });
        }

        console.log('Books File Content:', data);

        const books = data.trim().split('\n').filter(line => {
            const fields = line.split(',').map(field => field.trim());
            const bookISBN = fields[1];
            const bookAuthor = fields[2]?.toLowerCase();

            return bookISBN === isbn.trim() && bookAuthor === author.trim().toLowerCase();
        });

        console.log('Books found:', books);
        res.json(books);
    });
});

// find by author
app.get('/find-by-author', (req, res) => {
    const { author } = req.query;

    if (!author) {
        return res.json({ success: false, message: 'Author query parameter is required' });
    }

    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.json({ success: false, message: 'File read error' });
        }

        console.log('Books File Content:', data);

        const books = data.trim().split('\n').filter(line => {
            const fields = line.split(',').map(field => field.trim());
            const bookAuthor = fields[2]?.toLowerCase();

            return bookAuthor === author.trim().toLowerCase();
        });

        console.log('Books found:', books);
        res.json(books);
    });
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});
