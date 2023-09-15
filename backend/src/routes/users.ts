import { Router } from 'express';
import multer from 'multer';
import db from '../../database';

const router = Router();

// Setup multer for file handling
const storage = multer.memoryStorage();


// Constants for pagination
const ITEMS_PER_PAGE = 10;

type CountRow = {
  totalCount: number;
};


// GET /api/users - Search for users
router.get('/', (req, res) => {
    const query = req.query.q as string;
    const page = Number(req.query.page) || 1;

    if (!query) {
        return res.status(400).send('Query parameter q is required.');
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Get total count for pagination calculation
    db.get(`SELECT COUNT(*) as totalCount FROM users WHERE 
            name LIKE ? OR 
            city LIKE ? OR 
            country LIKE ? OR 
            favorite_sport LIKE ?`, 
            [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
            (err, row: CountRow) => {
                if (err) {
                    return res.status(500).send('Error querying the database for count.');
                }
                
                const totalCount = row.totalCount;
                const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

                // Fetch paginated data
                db.all(`SELECT * FROM users WHERE 
                        name LIKE ? OR 
                        city LIKE ? OR 
                        country LIKE ? OR 
                        favorite_sport LIKE ? 
                        LIMIT ? OFFSET ?`, 
                        [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, ITEMS_PER_PAGE, offset], 
                        (err, rows) => {
                            if (err) {
                                return res.status(500).send('Error querying the database for data.');
                            }
                            
                            res.json({
                                users: rows,
                                totalPages: totalPages
                            });
                        });
            });
});



export default router;
