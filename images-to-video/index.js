const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true});

const FRAME_RATES = [1, 2, 6, 12, 24, 25, 30];

const CROP_MODES = new Map([
    ["Remove black bars", "CROP"],
    ["Shrink to fit", "PAD"]
]);

const ASPECT_RATIOS = new Map([
    ["1:1", {
            large: 1,
            small: 1,
        }
    ],
    ["16:9", {
            large: 16,
            small: 9,
        }
    ],
    ["5:4", {
            large: 5,
            small: 4,
        }
    ]
]);

const ORIENTATIONS = new Map([
    ["Landscape", "LS"],
    ["Portrait", "PT"]
]);

const RESOLUTIONS = new Map([
    ["1080p", 1080],
    ["720p", 720],
    ["480p", 480]
]);

let images = new Array();
let imageFiles = new Array();
window.onload = function () {
    let photoImport = document.getElementById('photo-import');
    photoImport.addEventListener("change", importPhotos);
    let makeVideoButton = document.getElementById('make-video-button');
    makeVideoButton.addEventListener("click", makeVideo);

    let framerateSelector = document.getElementById('framerate-selector');
    FRAME_RATES.forEach(framerate => {
        let option = document.createElement('option');
        option.value = framerate;
        option.innerHTML = framerate.toString();
        framerateSelector.appendChild(option);
    });

    let cropSelector = document.getElementById('crop-selector');
    CROP_MODES.forEach((value, key) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = key;
        cropSelector.appendChild(option);
    });

    let aspectRatioSelector = document.getElementById('aspect-ratio-selector');
    ASPECT_RATIOS.forEach((value, key) => {
        let option = document.createElement('option');
        option.value = key;
        option.innerHTML = key;
        aspectRatioSelector.appendChild(option);
    });

    let orientationSelector = document.getElementById('orientation-selector');
    ORIENTATIONS.forEach((value, key) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = key;
        orientationSelector.appendChild(option);
    });

    let resolutionSelector = document.getElementById('resolution-selector');
    RESOLUTIONS.forEach((value, key) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = key;
        resolutionSelector.appendChild(option);
    });
};

function importPhotos() {
    console.log("importing photos...");
    if (this.files) {
        let thumnailsPreviewContainer = document.getElementById('thumbnails-preview-container');

        Array.from(this.files).forEach(file => {
            let reader = new FileReader();

            reader.onload = function() {
                /*let thumbnail = new Image();
                thumbnail.height = 100;
                thumbnail.title = file.name;
                thumbnail.src = String(this.result);
                thumbnail.classList.add("thumbnails");
                thumnailsPreviewContainer.appendChild(thumbnail);*/

                imageFiles.push({
                    name: file.name,
                    src: String(this.result)
                });
            };

            reader.readAsDataURL(file);
        });
    }

    console.log(imageFiles);
    console.log("photos imported");
};

function getVideoFilter() {
    let cropMode =  document.getElementById('crop-selector').value;
    let aspectRatio = ASPECT_RATIOS.get(document.getElementById('aspect-ratio-selector').value);
    let orientation = document.getElementById('orientation-selector').value;
    let resolution = document.getElementById('resolution-selector').value;

    if (orientation == "LS") {
        height = resolution;
        width = height / aspectRatio.small * aspectRatio.large;
    } else {
        width = resolution;
        height = width / aspectRatio.small * aspectRatio.large;
    }

    // https://superuser.com/a/991412
    if (cropMode == "PAD") {
        //return `scale=-1:${height},pad=${width}:ih:(ow-iw)/2`
        return `scale=w=${width}:h=${height}:force_original_aspect_ratio=1,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`;
    } else {
        //return `scale=${width}:-1,crop=iw:${height}`
        return `scale=w=${width}:h=${height}:force_original_aspect_ratio=2,crop=${width}:${height}`;
    }
}

function getFrameRate() {
    return document.getElementById('framerate-selector').value;
}

function render() {
    new Promise((onResolve, onError) => {
        try {
            imageFiles.forEach(imageFile => {
                fetchFile(imageFile.src).then(
                    (file) => {
                        ffmpeg.FS("writeFile", imageFile.name, file);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            });
            onResolve();
        } catch (e) {
            onError(e);
        }
    }).then(
        () => {
            let framerate = getFrameRate();
            let videoFilter = getVideoFilter()
            ffmpeg.run("-framerate", framerate, "-pattern_type", "glob", "-i", "*.jpg", "-vcodec", "libx264", "-vf", videoFilter, "-pix_fmt", "yuv420p", "video.mp4").then(
                () => {
                    let video = ffmpeg.FS("readFile", "video.mp4");
                    let url = URL.createObjectURL(new Blob([video.buffer], { type: "video/mp4" }));
                    let videoPreview = document.getElementById('video-preview');
                    videoPreview.src = url;
                },
                () => {
                    console.log(error);
                }
            );
        },
        () => {
            console.log(error);
        }
    )
}

function makeVideo() {
    console.log("making video...");

    if (ffmpeg.isLoaded()) {
        render();
    } else {
        ffmpeg.load().then(
            () => {
                render();
            },
            (error) => {
                console.log(error);
            }
        );
    }
};