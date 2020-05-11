/*************************************************
 * author: Awedoo Studio
 * template: Cube - Creative Coming Soon Template
 * version: v1.0
 * url: http://themeforest.net/user/AwedooStudio
 ************************************************/


//  enabled = true;
//  disabled = false;
//  1 second = 1000;


///** PRELOADER **/

var awd_preloader = true; //

///** ANIMATION **/

var awd_animated = false;

///** BACKGROUND IMAGES **/

var awd_bg_images = true;
var awd_bg_parallax_images = true; // mouse move parallax effect
var awd_bg_images_array = [
    "background/slide-1.jpg",
    "background/slide-2.jpg",
    "background/slide-3.jpg",
    "background/slide-4.jpg"
];

///** BACKGROUND COLOR OVERLAY **/

var awd_bg_overlay = 'gradient'; // "color" or "gradient"
var awd_bg_overlay_opacity = '0.7';
var awd_bg_overlay_color_array = [
    "#000000",
    "#2196F3",
    "#FF640A",
    "#7e5bbd"
];

var awd_bg_overlay_gradient_rotate = '-45';
var awd_bg_overlay_gradient_array = [
    ["#000000", "#222222"],
    ["#2196F3", "#00ADFF"],
    ["#FF640A", "#F22B29"],
    ["#7e5bbd", "#B73A5C"]
];

///** COUNTDOWN **/

var awd_countdown = true;
var awd_countdown_date = '2020/09/11 00:00:00'; // 2016-11-09

///** BORDER **/

var awd_bordered = true;

///** CONTACT **/

var awd_contact_email = 'info@awedoo.com'; // contact email address
var awd_contact_success = '<i class="icons fa fa-check valid"></i> Message has been sent'; // success submit message
var awd_contact_input_error = '<i class="icons fa fa-close error"></i> all fields are required'; // input error message
var awd_contact_email_error = '<i class="icons fa fa-close error"></i> email address is invalid'; // email error message

///** SUBSCRIBE **/

var awd_subscribe = 3; // 1 = php send email, 2 = save to txt file, 3 = mailchimp

///* PHP SEND EMAIL */

var awd_subscribe_email = 'info@awedoo.com'; // subscribe email address
var awd_subscribe_success = '<i class="icons fa fa-check valid"></i> thank you for subscribing'; // subscribe success message
var awd_subscribe_error = '<i class="icons fa fa-close error"></i> email address is invalid'; // subscribe error message

///* MAILCHIMP */

var awd_mailchimp_url = '//awedoo.us12.list-manage.com/subscribe/post?u=a54029bb78d4affa708c9d4b3&amp;id=179774c456'; // mailchimp post url

$.ajaxChimp.translations.eng = { // custom mailchimp message
    'submit': 'please wait',
    0: '<i class="icons fa fa-check"></i> We have sent you a confirmation email',
    1: '<i class="icons fa fa-close"></i> Please enter a value',
    2: '<i class="icons fa fa-close"></i> An email address must contain a single @',
    3: '<i class="icons fa fa-close"></i> e-mail address is not valid',
    4: '<i class="icons fa fa-close"></i> e-mail address is not valid',
    5: '<i class="icons fa fa-close"></i> e-mail address is not valid'
};
