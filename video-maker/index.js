const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true});

const FRAME_RATES = [1, 2, 6, 12, 24, 25, 30];

let CROP_MODES = [
    ["Remove black bars", "CROP"],
    ["Shrink to fit", "PAD"]
];

let ASPECT_RATIOS = new Map([
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

let ORIENTATIONS = [
    ["Landscape", "LS"],
    ["Portrait", "PT"]
];

let RESOLUTIONS = [
    ["1080p", 1080],
    ["720p", 720],
    ["480p", 480]
];

let imageFiles = [];
window.onload = function () {
    let photoImport = document.getElementById('photo-import');
    // clearing the file input on the web page load
    photoImport.value = '';
    photoImport.addEventListener("change", importPhotos(imageFiles));

    let $sortableList = $("#thumbnails-preview-container");
    $sortableList.sortable({
        placeholder: "ui-state-highlight",
        update: function () {
            let listElements = $sortableList.children();

            // setting a empty javascript array
            imageFiles = [];

            listElements.each(function (index, value) {
                imageFiles.push({
                    name: value.title,
                    src: value.src,
                });
            });
        },
    });
    $sortableList.disableSelection();

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
    CROP_MODES.forEach(([value, key]) => {
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
    ORIENTATIONS.forEach(([value, key]) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = key;
        orientationSelector.appendChild(option);
    });

    let resolutionSelector = document.getElementById('resolution-selector');
    RESOLUTIONS.forEach(([value, key]) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = key;
        resolutionSelector.appendChild(option);
    });

    let sortAscendingButton = document.getElementById('sort-ascending-button');
    sortAscendingButton.addEventListener("click", () => {
        let resortedImages = sortAscending(imageFiles);

        repopulateThumbnailPreviews(resortedImages);
    });

    let sortDescendingButton = document.getElementById('sort-descending-button');
    sortDescendingButton.addEventListener("click", () => {
        let resortedImages = sortDescending(imageFiles);

        repopulateThumbnailPreviews(resortedImages);
    });
};

function importPhotos(imageFiles) {
    return function() {
        if (this.files) {
            console.log("importing photos...");

            let thumnailsPreviewContainer = document.getElementById('thumbnails-preview-container');
            let files = Array.from(this.files);

            files.forEach(file => {
                let reader = new FileReader();

                reader.onload = function() {
                    let img = {
                        name: file.name,
                        src: String(this.result)
                    };

                    imageFiles.push(img);

                    let thumbnail = createThumbnail(img);
                    thumnailsPreviewContainer.appendChild(thumbnail);    
                };

                reader.readAsDataURL(file);
            });

            console.log("photos imported");
        }
    }
};

function sortAscending(images) {
    return images.sort((a, b) => (a.name > b.name) ? 1 : -1);
}

function sortDescending(images) {
  return images.sort((a, b) => (a.name < b.name ? 1 : -1));
}

function createThumbnail(img) {
    let thumbnail = new Image();

    thumbnail.height = 100;
    thumbnail.title = img.name;
    thumbnail.src = String(img.src);
    thumbnail.classList.add("thumbnail");

    return thumbnail;
}

function repopulateThumbnailPreviews(thumbnails) {
    let thumnailsPreviewContainer = document.getElementById('thumbnails-preview-container');
    thumnailsPreviewContainer.innerHTML = "";

    thumbnails.forEach((file) => {
      let thumbnail = createThumbnail(file);

      thumnailsPreviewContainer.appendChild(thumbnail);
    });
}

function displayProgress() {
    document.getElementById("loading-overlay").style.display = "block";
    document.getElementById("progress").style.width = 1;
    document.getElementById("progress-text").innerText = 1;
}

function updateProgress(ratio) {
    let percentage = Math.max(Math.round(ratio * 100), 1);
    document.getElementById("progress").style.width = percentage;
    document.getElementById("progress-text").innerText = percentage;
}

function removeProgress() {
    document.getElementById("loading-overlay").style.display = "none";
}

function getFrameRate() {
  return document.getElementById("framerate-selector").value;
}

function enableDownload(src, filename) {
    let downloadVideoButton = document.getElementById('download-video-button');
    downloadVideoButton.href = src;
    downloadVideoButton.download = filename;
    downloadVideoButton.style.visibility = "visible";
}

function getVideoFilter() {
    let selectedAspectRatio = document.getElementById("aspect-ratio-selector").value;
    let orientation = document.getElementById('orientation-selector').value;
    let resolution = document.getElementById('resolution-selector').value;
    let cropMode =  document.getElementById('crop-selector').value;
    let aspectRatio = ASPECT_RATIOS.get(selectedAspectRatio);

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

function render() {
    new Promise((onResolve, onError) => {
        try {
            displayProgress();

            imageFiles.forEach((imageFile, index) => {
                fetchFile(imageFile.src).then(
                    (file) => {
                        console.log(imageFile.name);
                        ffmpeg.FS("writeFile", `${index.toString()}.jpg`, file);
                    },
                    (error) => {
                        console.log(error);
                        window.alert(error);
                    }
                );
            });
            onResolve();
        } catch (e) {
            onError(e);
        }
    }).then(
        () => {
            ffmpeg.setProgress(({ ratio }) => {
                updateProgress(ratio);
            });

            ffmpeg.run("-framerate", getFrameRate(), "-start_number", "0", "-i", "%d.jpg", "-vcodec", "libx264", "-vf", getVideoFilter(), "-pix_fmt", "yuv420p", "video.mp4").then(
                () => {
                    let video = ffmpeg.FS("readFile", "video.mp4");
                    let url = URL.createObjectURL(new Blob([video.buffer], { type: "video/mp4" }));
                    let videoPreview = document.getElementById('video-preview');
                    videoPreview.src = url;
                    enableDownload(url, "video.mp4");
                    removeProgress();
                }
            );
        }
    )
}

function showError(error) {
    window.alert(error);
    console.log(error);
}

function makeVideo() {
    console.log("making video...");

    if (ffmpeg.isLoaded()) {
        render().catch(showError);
    } else {
        ffmpeg.load().then(
            render
        ).catch(showError);
    }
};