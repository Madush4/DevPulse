import express from "express";
import {isCacheFresh, refreshCache} from '../services/cache.js';
import {getFullProfile} from '../db/queries.js';

const router = express.Router();

router.get('/:username', async (req, res) => {

    const {username} = req.params

    if(!/^[a-zA-Z0-9-]+$/.test(username)){
        return res.status(400).json({
            error:'Invalid username format'
        })
    }


try {
    if(!isCacheFresh(username)){
        console.log(`Cache miss for ${username} - fetching from GitHub`)
        await refreshCache(username)
    } else {
        console.log(`Cache hit for ${username} - Serving from SQL`)
    }

    const profile = getFullProfile(username)

    if(!profile){
        return res.status(404).json({
            error:`GitHub user '${username}' not found`
        })
    }

    return res.status(200).json(profile)
    
}catch (error) {
    
    console.error(`Error fetching profile for ${username}:`, error.message)

    if(error.status === 404){
        return res.status(404).json({
            error:`GitHub user '${username}' not found`
        })
    }

    if(error.status === 403){
        return res.status(429).json({
            error: 'Github API rate limit reached. Please try again in one hour.'
        })
    }

    return res.status(500).json({
        error: 'Something went wrong . Pleae try again later.'
    })
}

})

export default router;
