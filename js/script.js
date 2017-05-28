

$(document).ready(function () {

    var $form = $("#fin-problems__form"),
        $rows = $(".fin-problems__row", $form),
        $result = $(".fin-problems__result", $form),
        $resultTitle = $("#result-phrase", $result),
        result = 0;




    function animateHideShow(hideObj, showObj) {
        var $dfd = new $.Deferred(),
            $promise = $dfd.promise();

        if (hideObj) {
            hideObj
                .animate({
                    opacity: 0,
                    top: -20
                }, {
                    duration: 600,
                    complete: function () {
                        hideObj.hide();
                        $dfd.resolve();
                    }
                });
        } else {
            $dfd.resolve();
        }

        $.when($promise).then(function () {
            showObj.css({
                opacity: 0,
                top: 20
            });

            showObj
                .show()
                .animate({
                    opacity: 1,
                    top: 0
                }, {
                    duration: 600,
                    complete: function () {
                        initBlock(showObj);
                    }
                });
        });

    }

    function initBlock($block) {
        $block.delegate("input", "change", function () {
            var $thisInput = $(this),
                $next = $block.next(".fin-problems__row");

            refreshResult($thisInput.val());

            if ($next.is(":hidden")) {
                animateHideShow($block, $next);
            }

        });
    }

    function refreshResult(answer) {

        result = result + parseInt(answer);

        $resultTitle.toggleClass("hasProblems", !!result);

    }



    animateHideShow(null, $rows.eq(0));


});