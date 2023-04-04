define(['jquery', 'Magento_Ui/js/modal/modal'], function($, modal) {
    const cookieName = 'popup-closed';
    const cookieDuration = 14;

    if (!getCookie(cookieName) && !sessionStorage.getItem(cookieName)) {
        const options = {
            modalClass: 'subscribe-modal',
            type: 'popup',
            responsive: true,
            title: 'Newsletter',
            buttons: [{
                text: 'Refuse',
                click: function () {
                    sessionStorage.setItem(cookieName, 'closed');
                    this.closeModal();
                },

            }]
        };
        const popup = modal(options, $('#popup-container'));
        popup.openModal();

        $('#popup-container').on('modalclosed', function() {
            sessionStorage.setItem(cookieName, 'closed');
        });

        $('#popup-container form').on('submit', function() {
            setCookie(cookieName, 'closed', cookieDuration);
        });
    }

//можемо встановити файли cookie так, як setCookie(key,value,expiry in days);
    function setCookie(name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    }
// можемо отримати cookie як подобається cookie так як getCookie('name');
    function getCookie(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }
    // якщо потрібно очистити cookie(name) файли;
    function eraseCookie(name) {
        setCookie(name, "", -1);
    }
});



