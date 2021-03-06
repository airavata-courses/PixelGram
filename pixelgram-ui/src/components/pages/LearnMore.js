import React from 'react';

class LearnMore extends React.Component{
    render(){
        return(
 <div className="LearnMore">
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>

<header className="masthead text-center text-white">
   
</header>

<body>
<h1 className="masthead-subheading mb-0">PixelGram</h1>
   <h3 className="mb-1">A Cloud-based Photo Sharing Application.</h3> 
   <h3 className="mb-1">Upload, Download, Share and Organize your photos.</h3>
  <h3>***Upload Your Photos to Cloud***</h3>
       <p>Upload your precious memories on cloud in a click. Panorama provides features for single photo upload and bulk photos upload.</p>

       <h3 className="display-4">***Download your photos from Cloud***</h3>
       <p>Download photos from cloud in a click. You can download the photos on your device local storage.</p>

       <h3 className="display-4">***Share your Photos with Friends and Family***</h3>
       <p>PixelGram is a secure photo sharing application. PixelGram gives an option to grant access to images to other pixelGram users.</p>
</body>

<footer className="py-5 bg-black">
<div className="container">
 <p className="m-0 text-center text-white small">Copyright &copy; Panorama 2021</p>
</div>
</footer>

<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    </div>
    )
    }
}

export default LearnMore