<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="app.css">

    <title>PHOSE - Series of Beautiful Memory</title>

    <!-- Javscript -->
    <script src = "script.js"></script>

</head>

<body>
    <nav id="mainNavbar" class="navbar navbar-dark navbar-expand-md py-0 fixed-top">
        <a href="index.md" class="navbar-brand">PHOSE</a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navLinks" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navLinks">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="video-maker.html" class="nav-link">Video Maker</a>
                </li>
            </ul>
        </div>
    </nav>
    
    <section class="container-fluid px-0">
        <div class="row align-items-center">
            <div class="col-lg-12">
                <div id="headingGroup" class="text-white text-center d-none d-lg-block mt-5">
                    <h1></h1>
                    <h1 class=""><b>PHOSE </b></h1>
                    <h3 class="">Compile your photos into a video, on your browser, without uploading photos or downloading software</h3>
                </div>
        </div>
    </section>

            
     <section class="container-fluid px-0">

            <div class="col-md-12-2">
                <div class ="sizeing">
                <img src="imgs/a (5).jpg" alt="" class="img-thumbnail">
                </div>
            </div>
        </section>
    <div class="col-md-12 text-center order-1 order-md-2">
        <div class="row justify-content-center">
            <div class="col-10 col-lg-8 blurb mb-5 mb-md-0">
                <input type="button" class="btn btn-primary" onclick="location.href='video-maker.html';" value="Start Creating Video" />

               
            </div>
        </div>
        </div>
    </div>
    <hr/>
        <div class="row align-items-center content">
            <div class="col-md-12 text-center order-1 order-md-2">
                <div class="row justify-content-center">
                    <div class="col-10 col-lg-8 blurb mb-5 mb-md-0">
                        <h2>How it works</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center content">
            <div class="col-md-6 text-center">
                <div class="row justify-content-center">
                    <div class="col-10 col-lg-8 blurb mb-5 mb-md-0">
                        <h2>Add your favorite images</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <img src="imgs/a (4).jpg" alt="" class="img-thumbnail">
            </div>
        </div>
        <div class="row align-items-center content">
            <div class="col-md-6 order-2 order-md-1">
                <img src="imgs/a (6).jpg" alt="" class="img-thumbnail">
            </div>
            <div class="col-md-6 text-center order-1 order-md-2">
                <div class="row justify-content-center">
                    <div class="col-10 col-lg-8 blurb mb-5 mb-md-0">
                        <h2>Drag to order your photos</h2>
                        <img src="imgs/lolli_icon.png" alt="" class="d-none d-lg-inline">
                    </div>
                </div>
            </div>
        </div>

        <div class="row align-items-center content">
            <div class="col-md-6 text-center">
                <div class="row justify-content-center">
                    <div class="col-10 col-lg-8 blurb mb-5 mb-md-0">
                        <h2>Configure your video settings</h2>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <img src="imgs/a (9).jpg" alt="" class="img-thumbnail">
            </div>

        <div class="row align-items-center content">
            <div class="col-md-6 order-2 order-md-1">
                <img src="imgs/a (6).jpg" alt="" class="img-thumbnail">
            </div>
            <div class="col-md-6 text-center order-1 order-md-2">
                <div class="row justify-content-center">
                    <div class="col-10 col-lg-8 blurb mb-5 mb-md-0">
                        <h2>Download your video</h2>
                        <img src="imgs/lolli_icon.png" alt="" class="d-none d-lg-inline">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>

    <script>
        $(function () {
            $(document).scroll(function () {
                var $nav = $("#mainNavbar");
                $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
            });
        });
    </script>
</body>

</html>