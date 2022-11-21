$(function() {
    $('#downbtn').on('click', function(e) {
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        var de = percentComplete.toFixed(2);
                        $('#downtext').html('Downloading...' + de + "%");
                        $('.progress-bar').html(de + "%");
                        $('.progress-bar').attr("aria-valuenow", de);
                        $('.progress-bar').attr("style", "width: " + de + "%;");
                    }
                }, false);
                return xhr;
            },
            url: "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4",
            method: "GET",
            xhrFields: {
                responseType: 'blob'
            },
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $('#downtext').html('Downloading File...');
                $('#downicon').removeClass("bi-cloud-download").addClass("spinner-border spinner-border-sm text-light");
                $('.progress').attr("hidden", false);
            },
            success: function(data) {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(data);
                a.href = url;
                a.download = 'einv';
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                $('#downtext').html("Download Completed!!");
                $('#downicon').addClass("bi-check-all text-success").removeClass("spinner-border spinner-border-sm text-light");
            },
            error: function(jqXHR, exception) {
                var error_msg = '';
                if (jqXHR.status === 0) {
                    error_msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    // 404 page error
                    error_msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    // 500 Internal Server error
                    error_msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    // Requested JSON parse
                    error_msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    // Time out error
                    error_msg = 'Time out error.';
                } else if (exception === 'abort') {
                    // request aborte
                    error_msg = 'Ajax request aborted.';
                } else {
                    error_msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                // error alert message
                $('#downtext').html("Error Occured!!\n" + error_msg);
                $('.progress').attr("hidden", true);
                $('#downicon').removeClass("spinner-border spinner-border-sm text-light");
            },
        })
    });
});