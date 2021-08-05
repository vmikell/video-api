const express = require('express')
const router = express.Router()
const Video = require('../models/video')

// get all
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find()
    res.json(videos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// get one
router.get('/:id', getVideo, (req, res) => {
  res.json(res.video)
})
// create one
router.post('/', async (req, res) => {
  const video = new Video({
    videoTitle: req.body.videoTitle,
    url: req.body.url,
  })
  try {
    const newVideo = await video.save()
    res.status(201).json(newVideo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// updating one
router.patch('/:id', getVideo, async (req, res) => {
  if (req.body.videoTitle != null) {
    res.video.videoTitle = req.body.videoTitle
  }
  if (req.body.url != null) {
    res.video.url = req.body.url
  }
  try {
    const updatedVideo = await res.video.save()
    res.json(updatedVideo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// delete one
router.delete('/:id', getVideo, async (req, res) => {
  try {
    await res.video.remove()
    res.json({ message: 'I have successfully deleted the video for you' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// middleware
async function getVideo(req, res, next) {
  let video
  try {
    video = await Video.findById(req.params.id)
    if (video == null) {
      return res
        .status(404)
        .json({ message: `I can't seem to find that video` })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.video = video
  next()
}

module.exports = router
