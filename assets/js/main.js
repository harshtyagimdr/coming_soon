/*
 * author: Awedoo Studio
 * template: Cube - Creative Coming Soon Template
 * version: v1.0
 * url: http://themeforest.net/user/AwedooStudio
 */

(function ($) {
    "use strict";

    function awdDetectIE() {

        if (navigator.userAgent.indexOf('MSIE') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || !!navigator.userAgent.match(/Edge/) || !!navigator.userAgent.match(/iPad/)){
            return true;
        } else {
            return false;
        }
    }

    function awdMenu() {
        $(".menu-toggle").on('click', function (e) {
            $(this).toggleClass('opened');
            $("#awd-site-nav").toggleClass('active');
            $("body").toggleClass('awd');
        });
    }

    ///** ANIMATE ELEMENTS **/

    function awdAnimate(state) {
        if (!$('body').hasClass('mobile')) {

            var elements;

            if (state == "active") {
                elements = $('.start .active .animated');
            } else {
                elements = $('.start .animated');
            }

            elements.each(function () {
                var that = $(this);
                if (!that.hasClass('visible')) {
                    if (that.data('animation-delay')) {
                        setTimeout(function () {
                            that.addClass(that.data('animation') + " visible");
                        }, that.data('animation-delay'));
                    } else {
                        that.addClass(that.data('animation') + " visible");
                    }
                }
            });

        }
    }

    ///** CONTENT SLIDER **/

    function awdContentSlider() {
        var rotate_value = 0;
        var direction = 'up';

        var bg = $('#bg');
        var menu = $('#awd-site-nav');
        var menu_link = menu.find('li');

        menu_link.on('click', function (e) {
            e.preventDefault();
            var active_link = menu.find('.active');
            var active_link_index = active_link.index();
            var menu_link_index = $(this).index();


            if (active_link_index < menu_link_index) {
                if ((active_link_index == 0) && (menu_link_index == 3)) {
                    rotate_value -= 90;
                    direction = 'down';
                } else {
                    rotate_value += 90 * menu_link_index - 90 * active_link_index;
                    direction = 'up';
                }
            } else if (active_link_index > menu_link_index) {
                if ((active_link_index == 3) && (menu_link_index == 0)) {
                    rotate_value += 90;
                    direction = 'up';
                } else {
                    rotate_value += 90 * menu_link_index - 90 * active_link_index;
                    direction = 'down';
                }
            }

            var active_side = $(this).find('a').data('direction');

            $('.awd-cube-main').css('transform', 'rotateX(' + (rotate_value) + 'deg)');

            $('#awd-site-wrap').removeClass(active_link.find('a').data('direction')).addClass(active_side);
            if ($(window).width() < 769) {
                menu.removeClass('active');
                $('body').removeClass('awd');
                $(".menu-toggle").removeClass('opened');
            }

            if (!$(this).hasClass('active')) {

                menu_link.removeClass('active');
                $(this).addClass('active');

                var active_side_content = $('.awd-cube-item[data-cube=' + active_side + ']');
                if (active_side_content) {
                    $('.awd-cube-item').removeClass('up down active');
                    active_side_content.addClass(direction + ' active');

                    if (active_side_content.hasClass('active')) {
                        awdAnimate('active');
                    }

                }
            }

        });

        //* go to current slide */

        $('a.go-slide').on('click', function (e) {
            e.preventDefault();
            var active_side = $(this).data('side');
            menu.find('a[data-direction=' + active_side + ']').trigger("click");
        });

        $(".controls .btn").on('click', function () {
            var action = $(this).data('action');
            var menu_link = menu.find('li');
            var active_link = menu.find('li.active');
            if (action == 'top') {
                if (active_link.prev().length == 0) {
                    menu_link.last().find('a').trigger("click");
                }
                {
                    active_link.prev().find('a').trigger("click");
                }
            } else if (action == 'bottom') {
                if (active_link.next().length == 0) {
                    menu_link.first().find('a').trigger("click");
                }
                {
                    active_link.next().find('a').trigger("click");
                }
            } else {

            }
        });

    }

    ///** COUNTDOWN **/

    function awdCountdown() {
        $('.countdown').show();
        $('#clock').countdown(awd_countdown_date).on('update.countdown', function (event) {
            var $this = $(this).html(event.strftime(''
                + '<div class="counter-container"><div class="counter-date"><div class="counter-box first"><span>day%!d</span><div class="number">%-D</div></div></div>'
                + '<div class="counter-time"><div class="counter-box"><div class="number">%H:%M</div></div>'
                + '<div class="counter-box last"><div class="number">%S</div><span>seconds</span></div></div></div>'
            ));
        });
    }

    ///** EMAIL VALIDATION **/

    function awdFormValidation(email_address) {
        var pattern = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return pattern.test(email_address);
    }


    ///** SUBSCRIBE FORM **/

    function awdSubscribe() {
        if (awd_subscribe == 1 || awd_subscribe == 2) {
            awdSubscribeForm();
        } else if (awd_subscribe == 3) {
            awdMailchimp();
        }
    }

    //* mailchimp */

    function awdMailchimp() {

        var subscribe_form = $('#subscribe-form');
        var subscribe_email = $('#subscribe-email');

        function awdMailchimpStatus(resp) {

            if (resp.result === 'error') {
                subscribe_email.focus();
                $('.subscribe-notice').addClass('visible');
            }
            else if (resp.result === 'success') {
                subscribe_form[0].reset();
                subscribe_email.blur();
                $('.subscribe-notice').addClass('visible');
            }
        }

        subscribe_form.ajaxChimp({
            callback: awdMailchimpStatus,
            language: 'eng',
            type: 'POST',
            url: awd_mailchimp_url
        });
    }

    //* php */

    function awdSubscribeForm() {

        var subscribe_form = $('#subscribe-form');
        var subscribe_email = $('#subscribe-email');
        var subscribe_url;
        if (awd_subscribe == 1) {
            subscribe_url = 'assets/php/to-mail.php';
        } else if (awd_subscribe == 2) {
            subscribe_url = 'assets/php/to-file.php';
        }

        subscribe_email.prop('type', 'text');

        subscribe_form.on('submit', function (e) {

            var subscribe_email_val = subscribe_email.val();
            var subscribe_notice = $('.subscribe-notice');
            var subscribe_button = subscribe_form.find('button[type="submit"]');

            e.preventDefault();

            subscribe_button.prop('disabled', true);

            if (!awdFormValidation(subscribe_email_val)) {
                subscribe_notice.stop(true).hide().addClass('visible').html(awd_subscribe_error).fadeIn();
                subscribe_button.prop('disabled', false);
                subscribe_email.focus();
            }
            else {
                $.ajax({
                    type: 'POST',
                    url: subscribe_url,
                    data: {
                        email: subscribe_email_val,
                        emailAddress: awd_subscribe_email
                    },
                    success: function () {
                        subscribe_notice.stop(true).hide().addClass('visible').html(awd_subscribe_success).fadeIn();

                        subscribe_button.prop('disabled', false);
                        subscribe_form[0].reset();
                        subscribe_email.blur();

                    }
                });
            }
            return false;

        });

    }


    ///** CONTACT FORM **/

    function awdContactForm() {

        var contact_form = $('#contact-form');

        contact_form.on('submit', function (e) {

            var input = $(this).find('input, textarea');
            var required_fields = $(this).find('.required');
            var email_field = $('.contact-form-email');
            var contact_name_val = $('.contact-form-name').val();
            var contact_subject_val = $('.contact-form-subject').val();
            var contact_email_val = email_field.val();
            var contact_message_val = $('.contact-form-message').val();
            var contact_notice = $('.contact-notice');

            e.preventDefault();

            if (contact_name_val == '' || contact_email_val == '' || contact_message_val == '' || contact_subject_val == '') {
                contact_notice.stop(true).hide().html(awd_contact_input_error).fadeIn();
                required_fields.each(function () {
                    $(this).addClass("input-error");
                });

            } else if (!awdFormValidation(contact_email_val)) {
                contact_notice.stop(true).hide().html(awd_contact_email_error).fadeIn();
                email_field.addClass("input-error");
                $('#contact-email').focus();
            }
            else {
                $.ajax({
                    type: 'POST',
                    url: 'assets/php/contact.php',
                    data: {
                        name: contact_name_val,
                        email: contact_email_val,
                        message: contact_message_val,
                        subject: contact_subject_val,
                        emailAddress: awd_contact_email
                    },
                    success: function () {
                        contact_notice.stop(true).hide().html(awd_contact_success).fadeIn();
                        contact_form[0].reset();
                        input.blur();
                    }
                });
            }
            return false;

        });

    }

    ///** CUSTOM SCROLL **/

    function awdScrollbar() {

        $('.awd-cube-item-content').perfectScrollbar({
            suppressScrollX: true
        });

    }

    ///** BACKGROUND IMAGE PARALLAX EFFECT **/

    function awdItemBackgroundParallax() {

        $('body').on('mousemove', function (e) {
            $('.awd-cube-item-image').addClass('awd-parallax');
            var elem = $('.active .awd-cube-item-image > div'),
                pageX = (e.pageX - elem.offset().left) - (elem.outerWidth() / 2),
                pageY = (e.pageY - elem.offset().top) - (elem.outerHeight() / 2),
                newX = ((25 / elem.outerWidth() * pageX)) * -1,
                newY = ((25 / elem.outerHeight() * pageY)) * -1;

            $('.awd-cube-item-image > div').css({
                "-webkit-transform": "matrix(1.05,0,0,1.05," + newX + "," + newY + ")",
                "-moz-transform": "matrix(1.05,0,0,1.05," + newX + "," + newY + ")",
                "-o-transform": "matrix(1.05,0,0,1.05," + newX + "," + newY + ")",
                "transform": "matrix(1.05,0,0,1.05," + newX + "," + newY + ")",
                "-webkit-transition": "none",
                "-moz-transition": "none",
                "-o-transition": "none",
                "transition": "none"
            });
        });
    }

    ///** BACKGROUND IMAGE **/

    function awdItemBackgroundImage() {
        $('.awd-cube-item-bg').each(function (i) {
            var img = $('<div/>', {
                css: {
                    'background-image': 'url(' + awd_bg_images_array[i] + ')'
                }
            });

            var img_container = $('<div/>', {
                class: 'awd-cube-item-image'
            }).appendTo($(this));

            img.appendTo(img_container);
        });
    }

    ///** BACKGROUND COLOR OVERLAY **/

    function awdItemBackgroundColorOverlay() {
        $('.awd-cube-item-bg').each(function (i) {
            $('<div/>', {
                class: 'awd-cube-item-color',
                css: {
                    'background-color': awd_bg_overlay_color_array[i],
                    'opacity': awd_bg_overlay_opacity
                }
            }).appendTo($(this));
        });
    }

    ///** BACKGROUND GRADIENT OVERLAY **/

    function awdItemBackgroundGradientOverlay() {
        $('.awd-cube-item-bg').each(function (i) {
            $('<div/>', {
                class: 'awd-cube-item-color',
                style: 'background: -webkit-linear-gradient(' + awd_bg_overlay_gradient_rotate + 'deg, ' + awd_bg_overlay_gradient_array[i][0] + ' 0%, ' + awd_bg_overlay_gradient_array[i][1] + ' 100%); ' +
                'background: -moz-linear-gradient(' + awd_bg_overlay_gradient_rotate + 'deg, ' + awd_bg_overlay_gradient_array[i][0] + ' 0%, ' + awd_bg_overlay_gradient_array[i][1] + ' 100%); ' +
                'background: linear-gradient(' + awd_bg_overlay_gradient_rotate + 'deg, ' + awd_bg_overlay_gradient_array[i][0] + ' 0%, ' + awd_bg_overlay_gradient_array[i][1] + ' 100%); ' +
                'opacity: ' + awd_bg_overlay_opacity
            }).appendTo($(this));
        });
    }

    ///** BACKGROUND INIT **/

    function awdItemBackground() {

        if (awd_bg_images == true) {
            awdItemBackgroundImage();
        }

        if (awd_bg_parallax_images === true) {
            awdItemBackgroundParallax();
        }

        if (awd_bg_overlay === 'color') {
            awdItemBackgroundColorOverlay();
        } else if (awd_bg_overlay === 'gradient') {
            awdItemBackgroundGradientOverlay();
        }

    }

    ///** PRELOADER **/

    function awdPreloader() {
        $('#awd-preloader').show();
        $(window).on('load', function () {
            $('#awd-preloader').delay(100).fadeOut('slow');
        });
    }

    ///** DOCUMENT READY **/

    $(document).on('ready', function () {

        if (awdDetectIE()){
            $('body').addClass('ie');
        }

        FastClick.attach(document.body);

        if (awd_bordered === true) {
            $('body').addClass('bordered');
        }

        if (awd_preloader === true) {
            awdPreloader();
        }

        awdMenu();
        awdContentSlider();

        if (awd_countdown === true) {
            awdCountdown();
        }

        if (awd_animated === true) {
            $('body').addClass('start');
            awdAnimate();
        }
        awdSubscribe();
        awdContactForm();
        awdScrollbar();
        awdItemBackground();

    });


})(jQuery);
