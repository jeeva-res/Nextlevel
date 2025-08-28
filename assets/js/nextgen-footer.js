function headerComponent() {
    var ngFooter = `
<div class="container">
        <div class="d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-center justify-content-md-between text-center text-md-start">
            <figure><a href="#"><img src="assets/images/nextlevel-footer-logo.svg" alt="Next Level" width="100" height="50" loading="lazy"></a></figure>
            <p class="text-white mt-4 mb-0 mt-md-0">Copyright © 2025 NEXT LEVEL TECH SERVICES INC.</p>
            <div class="tnc-links mt-3 mt-md-0">
                <a href="terms-and-conditions.html" class="px-2">T&C</a>
                <a href="privacy-policy.html" class="px-2 pe-md-0">Privacy Policy</a>
            </div>
        </div>        
    </div>
`;
    document.getElementById('NGFooter').insertAdjacentHTML('afterbegin', ngFooter);
}
headerComponent();