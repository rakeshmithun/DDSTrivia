# DDS Launchpad
The intent of the DDS Launchpad is to reduce the overhead on filling out fields on a L3 test environment with SAML or myGovId.

# Installation till the site is hosted on the same domain as the L3 test login pages
1. copy the DDSLaunchpad.zip file onto your PC and unzip the folder to some place like the desktop
2. Navigate to the following URL: http://10.7.253.160/
3. you will hit an error page! thats ok - using Fiddler - add an Autoresponder rule for the index.html, app.js, main.css and the images.
4. reload http://10.7.253.160/ - if you added the autoresponder rules correctly you should see the index.html load with css/js associated.

