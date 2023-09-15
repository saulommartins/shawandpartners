import { Router } from 'express';
import multer from 'multer';
import Papa, { ParseConfig, ParseResult, ParseError } from 'papaparse';
import db from '../../database';

const router = Router();

// Setup multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// In-memory database (just for the sake of this example)
let users: any[] = [];

// POST /api/files - Upload CSV file
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded.' });
    }

    const csvData = req.file.buffer.toString('utf-8');
    Papa.parse<any>(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (result: ParseResult<any>) => {
            users = result.data;

            // Insert records into the SQLite database
            const stmt = db.prepare("INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)");

            users.forEach(record => {
                stmt.run([record.name, record.city, record.country, record.favorite_sport]);
            });
            
            stmt.finalize();

            // res.send('CSV file uploaded and stored in database.');
            return res.status(200).send({ message: "File uploaded successfully." });
        },
        error: (error: Error) => { // Cast 'error' to the more general 'Error' type
            return res.status(500).send({ error: error.message });
        }
    });
});
export default router;
