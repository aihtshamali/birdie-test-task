import * as express from "express";
const familyController =  require('../controllers/family');

const router = express.Router();
router.get("/:id", familyController.searchLastActivity)
router.get("/searchByDates/:id", familyController.searchByDates)
router.get("/searchByDatesEvent/:id", familyController.searchByDatesAndEvent);

module.exports = router