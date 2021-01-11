# Phose
Phose is a web application for stitching images in to a video locally. 

[TRY IT NOW](https://thanh-to.github.io/Phose/video-maker.html)

This is a project for [nwHacks 2021](https://devpost.com/software/phose)

## Inspiration

With the rise in popularity of social media and the decline in attention span, we often find our friends, family, and followers unable to browse through the photos from our lives. At the end of 2020, Thanky made a video collage of the photos he took that year. After sharing it on Instagram, a few people asked him which app he used to make such videos. Finding no quick and safe solutions other than expensive and bulky desktop video editing software or slow and insecure cloud web applications, we decided to build one of our own. 

## What it does

PHOSE, or Photo Serialiser, enables you to compile their photos into a video, on your browser, without uploading photos or downloading software. You can upload the pictures and rearrange them based on the preferable order in the videos. The pictures will then merge into a video, ready to be downloaded and shared.

PHOSE is powered by Web Assembly via ffmepg.js, meaning all the processing happens locally on your computer. No more downloading software or uploading your photos to some unknown server.

## How we built it

Our team explored some web development technologies and various Javascript libraries to come up with the front-end portion of the website.

The processing of the images and video is also done on the front-end of the web application using ffmpeg.js.

## Challenges we ran into

With a beginner and experienced developers mixed combination in this Hackaton scene, the progress of this application was delayed slightly. The learning process from researching the new technology (front-end) and watching various videos about web-dev technology often leads to unending errors. 

Web Assembly, particularly the ffmpeg.js library, is still relatively new, so we had some difficulties finding solutions to issues. 

## Accomplishments that we're proud of

Every member of the team put the greatest effort into contributing to this application. We are proud of the significant learning, knowledge, and mentorship that we gained from this collaborative project. As for our own trophy, we have developed various knowledge of project development.

## What we learned

We learned about the importance of communication and working together. As for some of us, we learned that “Rome was not built in a day” and thus the self-competence needs to be improved. 

Web Assembly has great potential to make web applications that require no installation with near-native performance.


## What's next for PHOSE

PHOSE has the potential to be developed into a full-fledged video editing web application

## Built With

HTML, Javascript, CSS

[ffmpeg.js](https://github.com/ffmpegwasm/ffmpeg.wasm)

## Compatibilities

[ffmpegwasm may not work on some browser](https://github.com/ffmpegwasm/ffmpeg.wasm/issues/119) due to missing support for [Shared Array Buffer](https://caniuse.com/sharedarraybuffer).