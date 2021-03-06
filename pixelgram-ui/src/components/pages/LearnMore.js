import React from 'react';

class LearnMore extends React.Component{
    render(){
        return(
 <div className="LearnMore">
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>

<header className="masthead text-center text-white">
<div className="masthead-content">
 <div className="container">
   <h1 className="masthead-subheading mb-0">PixelGram</h1>
   <h3 className="mb-0">A Cloud-based Photo Sharing Application.</h3> 
   <h3 className="mb-0">Upload, Download, Share and Organize your photos.</h3> 
 </div>
</div>
</header>

<section>
<div className="container">
 <div className="row align-items-center">
 <div className="p-5">
       <h3 className="display-4">Upload Your Photos to Cloud.</h3>
       <p>Upload your precious memories on cloud in a click. Panorama provides features for single photo upload and bulk photos upload.</p>
</div>
<div className="p-5">
       <h3 className="display-4">Download your photos from Cloud.</h3>
       <p>Download photos from cloud in a click. You can download the photos on your device and google drives.   </p>
     </div>
 </div>
 <div className="p-5">
       <h3 className="display-4">Share your Photos with Friends and Family</h3>
       <p>PixelGram is a secure photo sharing application. Share your moments with your loved phones. PixelGram gives an option to grant access via email ids.</p>
     </div>
</div>
</section>

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