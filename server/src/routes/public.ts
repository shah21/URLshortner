/* Public router (Anyone can use it) */

import { Router } from "express";


import Url from '../models/url';
import { getUrl } from "../controllers/url";

const router = Router();


router.get('/:url',getUrl);

export default router;