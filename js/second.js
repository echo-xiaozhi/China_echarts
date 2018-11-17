function deepClone(obj) {
    var result = {},
        oClass = isClass(obj);
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}

var Oni = function () {
    var myChart;
    var circleValue = 200;
    var loopNum = 300;
    var _topCeilNum = 0.1;
    var keepTime = 3000;

    option = {
        title: {
            // text: '测试',
            x: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: 'china2',
            left: 319,
            top: 26,
            width: 1385,
            height: 1020,
            silent: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                emphasis: {
                    areaColor: '#2a333d',
                    borderWidth: 0
                },
                opacity: 0.9
            },
            regions: [{
                name: '北京',
                itemStyle: {
                    areaColor: '#06487a',
                    borderWidth: 0
                }
            }, {
                name: '山东',
                itemStyle: {
                    areaColor: '#042161',
                    borderWidth: 0
                }
            }, {
                name: '黑龙江',
                itemStyle: {
                    areaColor: '#0c8a9e',
                    borderWidth: 0
                }
            }, {
                name: '内蒙古',
                itemStyle: {
                    areaColor: '#096a8e',
                    borderWidth: 0
                }
            }, {
                name: '吉林',
                itemStyle: {
                    areaColor: '#0b809a',
                    borderWidth: 0
                }
            }, {
                name: '辽宁',
                itemStyle: {
                    areaColor: '#05366b',
                    borderWidth: 0
                }
            }, {
                name: '河北',
                itemStyle: {
                    areaColor: '#042a64',
                    borderWidth: 0
                }
            }, {
                name: '天津',
                itemStyle: {
                    areaColor: '#0a7897',
                    borderWidth: 0
                }
            }, {
                name: '陕西',
                itemStyle: {
                    areaColor: '#064075',
                    borderWidth: 0
                }
            }, {
                name: '山西',
                itemStyle: {
                    areaColor: '#08658c',
                    borderWidth: 0
                }
            }, {
                name: '宁夏',
                itemStyle: {
                    areaColor: '#0c8fa8',
                    borderWidth: 0
                }
            }, {
                name: '新疆',
                itemStyle: {
                    areaColor: '#0c8da4',
                    borderWidth: 0
                }
            }, {
                name: '青海',
                itemStyle: {
                    areaColor: '#0c96ae',
                    borderWidth: 0
                }
            }, {
                name: '甘肃',
                itemStyle: {
                    areaColor: '#0b82a1',
                    borderWidth: 0
                }
            }, {
                name: '河南',
                itemStyle: {
                    areaColor: '#031f5f',
                    borderWidth: 0
                }
            }, {
                name: '湖北',
                itemStyle: {
                    areaColor: '#096a8f',
                    borderWidth: 0
                }
            }, {
                name: '湖南',
                itemStyle: {
                    areaColor: '#085f85',
                    borderWidth: 0
                }
            }, {
                name: '四川',
                itemStyle: {
                    areaColor: '#06527f',
                    borderWidth: 0
                }
            }, {
                name: '广东',
                itemStyle: {
                    areaColor: '#06527f',
                    borderWidth: 0
                }
            }, {
                name: '海南',
                itemStyle: {
                    areaColor: '#0b7d96',
                    borderWidth: 0
                }
            }, {
                name: '台湾',
                itemStyle: {
                    areaColor: '#0a7d9a',
                    borderWidth: 0
                }
            }, {
                name: '福建',
                itemStyle: {
                    areaColor: '#03205c',
                    borderWidth: 0
                }
            }, {
                name: '上海',
                itemStyle: {
                    areaColor: '#0a7997',
                    borderWidth: 0
                }
            }, {
                name: '西藏',
                itemStyle: {
                    areaColor: '#0c91a6',
                    borderWidth: 0
                }
            }, {
                name: '香港',
                itemStyle: {
                    areaColor: '#031c58',
                    borderWidth: 0
                }
            }, {
                name: '江苏',
                itemStyle: {
                    areaColor: '#061e5d',
                    borderWidth: 0
                }
            }, {
                name: '安徽',
                itemStyle: {
                    areaColor: '#053b70',
                    borderWidth: 0
                }
            }, {
                name: '浙江',
                itemStyle: {
                    areaColor: '#074977',
                    borderWidth: 0
                }
            }, {
                name: '江西',
                itemStyle: {
                    areaColor: '#096c8d',
                    borderWidth: 0
                }
            }, {
                name: '重庆',
                itemStyle: {
                    areaColor: '#096d90',
                    borderWidth: 0
                }
            }, {
                name: '贵州',
                itemStyle: {
                    areaColor: '#0b7997',
                    borderWidth: 0
                }
            }, {
                name: '广西',
                itemStyle: {
                    areaColor: '#074875',
                    borderWidth: 0
                }
            }, {
                name: '云南',
                itemStyle: {
                    areaColor: '#096b8c',
                    borderWidth: 0
                }
            }]
        },
    };
    var _topNum = 5;
    var _top = {
        old: data.sort(function (a, b) {
            return b.value - a.value;
        }).slice(0, 5),
        change: data.sort(function (a, b) {
            return b.value - a.value;
        }).slice(0, 5),
    };

    var setMap = function (series) {
        setSeries(series)
        setPoint()
    }

    var setPoint = function () {
        setSeries()

        myChart.setOption(option);
    }

    var setSeries = function (series) {
        option.series = series || [{
            name: 'all',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#13e3e7'
                }
            }
        },
            {
                name: 'top',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                // 外圈+文字
                data: convertData(_top.change),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'fill'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#13e3e7',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    }

    var setTopPoint = function () {
        randomTopPoint();
        setMap()
        fadeSmallPoint();
    }

    var randomTopPoint = function () {
        _top = {
            old: [],
            change: []
        }
        for (i = 0; i < 5; i++) {
            var index = Math.floor((Math.random() * data.length));
            var point = data[index];
            _top.old.push(deepClone(point))
            _top.change.push(point)
        }
        // console.log(_top)
    }

    var fadeSmallPoint = function (fadeNum) {
        var _topChange = []
        var _topNum = parseInt(loopNum * _topCeilNum)
        var _minusNum = loopNum - _topNum

        var _fade = function (num) {
            if (num == _topNum + 1) {
                _topChange = []
            }
            _top.old.forEach(function (point, index) {
                var oldValue = point.value
                var changeValue = _top.change[index].value
                var diff;

                if (num <= _topNum) {
                    diff = _topChange[index] || (circleValue - oldValue) / _topNum
                    if (num == 1) {
                        _topChange.push(diff)
                    }

                    if (num == _topNum) {
                        _top.change[index].value = circleValue
                        return;
                    }
                    _top.change[index].value = changeValue + diff
                } else {
                    diff = _topChange[index] || (circleValue - oldValue) / _minusNum
                    if (num == _topNum + 1) {
                        _topChange.push(diff)
                    }
                    if (num == loopNum) {
                        _top.change = _top.old
                        return;
                    }
                    var _v = changeValue - diff
                    _top.change[index].value = _v < oldValue ? oldValue : _v
                }
            })
            var _series = {
                name: 'top',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                // 外圈+文字
                data: convertData(_top.change),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'fill'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#13e3e7',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
            setMap(_series)
            return _topNum;
        }

        var _fadeNum = fadeNum || 0,
            _interval = setInterval(function () {
                _fadeNum++;
                var topNum = _fade(_fadeNum)
                // console.log(_fadeNum)
                // if (topNum == _fadeNum && keepTime) {
                //   clearInterval(_interval)
                //   setTimeout(function () {
                //     fadeSmallPoint(_fadeNum)
                //   }, keepTime)
                // }
                if (_fadeNum >= loopNum) {
                    clearInterval(_interval)
                    setTopPoint()
                }
            }, 1)


        // setSeries()
    }

    var clearFade = function () {
        setMap()
    }

    var initMap = function () {
        var dom = document.getElementById("container");
        myChart = echarts.init(dom);
        setMap();
        setTopPoint();
    }

    /**
     *
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                var value = data[i].value
                res.push({
                    value: geoCoord.concat(value)
                });
            }
        }
        return res;
    };

    return {

        init: function () {
            initMap();
        },

        clear: function () {
            clearFade()
        }
    }
}();

document.addEventListener('DOMContentLoaded', function () {
    Oni.init();
});

