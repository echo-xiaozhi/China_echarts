var scrollNum = function () {
    var options = {
        number: '0012345',
        old: 0,
        leng: 7
    }

    var container;

    var generateHtml = function () {
        var number = options.number
        var numHtml = '<ul class="dataNums inrow">'
        for (var i = 0; i < options.leng; i++) {
            var old = options.old ? options.old : false
            // console.log(old)
            if (old) {

                var repeatZero = options.leng.length < old.length

            }

            var htmlnum = old ? old[i] || 0 : 0
            // console.log(htmlnum)
            numHtml += `
        <li class="dataOne ">
          <div class="dataBoc">
            <div class="tt" t="38"><span class="showNum">${htmlnum}</span></div>
        </li>
      `
        }

        return numHtml += '</ul>';
    }

    var animate = function (index, num) {
        $('.showNum').eq(index).removeClass('slideOutUp animated').addClass('slideOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('slideOutUp animated').text(num).addClass('slideInUp animated');
        });
    }

    return {
        init: function (options, obj) {
            options = Object.assign(options, options)
            container = obj
        },

        start: function () {
            var html = generateHtml();
            container.html(html)
            var number = options.number;
            var numberLenth = number.length;
            var diff = options.leng - numberLenth
            // for (var i = 0; i < number.length; i++) {
            //     var old = parseInt($('.showNum').eq(i).text())
            //     var num = parseInt(number[i])
            //
            //     var loop = num - old
            //     // console.log(num)
            //
            //     if (num != old) {
            //         setInterval(function () {
            //             // animate(diff + i, old+loop)
            //         },1000)
            //         // console.log(i, diff);
            //         animate(diff + i, old+loop)
            //     }
            // }
            var i = 0;
            var test = setInterval(function () {
                var old = parseInt($('.showNum').eq(i).text());
                var num = parseInt(number[i]);
                // var loop = num - old;
                var j = i;
                if (num != old) {
                    // animate(diff + j, old+loop);
                    if (num - old > 0) {
                        var bigDiff = num - old;
                        var z = 0;
                        var endNum = old;
                        var test1 = setInterval(function () {
                            endNum++;
                            animate(diff + j, endNum);
                            z++;
                            if (z >= bigDiff) {
                                clearInterval(test1);
                            }
                        }, 500)
                    } else if (num - old < 0) {
                        var littleDiff = old - num;
                        console.log(littleDiff);
                        var y = 0;
                        var littleEndNum = old;
                        var test2 = setInterval(function () {
                            littleEndNum--;
                            animate(diff + j, littleEndNum);
                            y++;
                            if (y >= littleDiff) {
                                clearInterval(test2);
                            }
                        }, 500)
                    }
                }
                if (i >= number.length) {
                    clearInterval(test)
                }
                i++;
            }, 500);
            // test;
        },

        setOtion: function (option) {
            options =  Object.assign(options, options)
        },

        setNumber: function (number) {
            if (number.length < options.leng) {
                var _repeat = options.leng - number.length
                number = '0'.repeat(_repeat) + number
            } else {
                options.leng = number.length
            }
            options.old = options.number;
            options.number = number;
            scrollNum.start()
        }
    }
}();

document.addEventListener('DOMContentLoaded', function() {
    scrollNum.init({}, $('.num_num'))
    scrollNum.start()
});
