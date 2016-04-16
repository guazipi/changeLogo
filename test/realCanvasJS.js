(function (e, S) {
    function T(a, b, U, c, f, g, e, h, k, q) {
        this.imageElement = a;
        this.url = b;
        this.file = U;
        this.width = c;
        this.height = f;
        this.scale = g;
        this.x = e;
        this.y = h;
        this.rotate = k;
        this.type = q
    }

    function E(a, d, c, g, e, l, h) {
        a = a + g / 2 - l + (l - l * Math.cos(Math.PI / 180 * c));
        d -= l * Math.sin(Math.PI / 180 * c);
        h && (b.beginPath(), b.arc(a, d, f / 2, 0, 2 * Math.PI), b.fillStyle = "#000000", b.fill(), b.lineWidth = 1, b.strokeStyle = "#000000", b.stroke(), b.closePath());
        return {x: a, y: d}
    }

    var g = "", b = "", L = !1, C = 0, D = 0, v = -1, w = -1, x = new List, u = -1, c = new List, V = "length array url file width height scale x y rotate type".split(" "), M = 5, a = null, p = -1, P = !1, F = 2, G = .1, n = 0, y = 0, J = !1, N = null, h = 0, H = 1, t = !1, z = 1, A = "#000000", B = "#000000", O = 1, f = 4, m = "", K = null, I = {
        params: {},
        init: function (a) {
            g = document.getElementById(a.diyid);
            //"undefined" != typeof window.G_vmlCanvasManager && (g = window.G_vmlCanvasManager.initElement(g));
            if (g) {
                b = g.getContext("2d");
                g.onmousedown = W;
                g.onmouseup = X;
                g.onmouseout = Y;
                g.onmousemove = Z;
                e("head").append('<style type="text/css">\n.cursor_default{cursor:default;}\n.cursor_move{cursor:move;}\n.cursor_ne-resize{cursor:ne-resize;}\n.cursor_se-resize{cursor:se-resize;}\n.cursor_s-resize{cursor:s-resize;}\n.cursor_w-resize{cursor:w-resize;}\n.cursor_rotate{cursor:pointer;}\n.cursor_pointer{cursor:pointer;}\ncanvas{ moz-user-select: -moz-none; -moz-user-select: none; -o-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none;}\n.diydropmenu{position:absolute;z-index:3;background:#fff;border:1px solid #A1A0A7;font-size:12px;padding:2px;/*box-shadow:2px 2px 2px #666;*/display:none;}\n.diydropmenu ul{margin:0;padding:0;font-family:"Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;}\n.diydropmenu ul li{list-style:none;}\n.diydropmenu ul li a{display:block;color:#666;line-height:26px;padding:2px 20px;text-decoration:none;}\n.diydropmenu ul li a:hover{background:#000;color:#fff;}\n</style>');
                m = e('<menu class="diydropmenu"><ul><li><a href="javascript:;" onclick="hbdiy.topImage();">\u9876\u90e8\u5bf9\u9f50</a></li><li><a href="javascript:;" onclick="hbdiy.middleImage();">\u5782\u76f4\u5c45\u4e2d</a></li><li><a href="javascript:;" onclick="hbdiy.bottomImage();">\u5e95\u90e8\u5bf9\u9f50</a></li><li><a href="javascript:;" onclick="hbdiy.leftImage();">\u5de6\u4fa7\u5bf9\u9f50</a></li><li><a href="javascript:;" onclick="hbdiy.centerImage();">\u6c34\u5e73\u5c45\u4e2d</a></li><li><a href="javascript:;" onclick="hbdiy.rightImage();">\u53f3\u4fa7\u5bf9\u9f50</a></li><li><a href="javascript:;" onclick="hbdiy.deleteImage();">\u5220\u9664\u5f53\u524d</a></li><li><a href="javascript:;" onclick="hbdiy.deleteAll();">\u91cd\u7f6e\u753b\u5e03</a></li><li><a href="javascript:;" onclick="hbdiy.undo();">\u64a4\u6d88</a></li><li><a href="javascript:;" onclick="hbdiy.redo();">\u91cd\u505a</a></li><li><a href="javascript:;" onclick="hbdiy.clearRotate();">\u65cb\u8f6c\u91cd\u7f6e</a></li><li><a href="javascript:;" onclick="hbdiy.clearScale();">\u7f29\u653e\u91cd\u7f6e</a></li></ul></menu>');
                e("body").append(m);
                C = a.scope_x || C;
                D = a.scope_y || D;
                v = a.scope_width || v;
                w = a.scope_height || w;
                M = a.maxSize_image || M;
                F = a.scaleScope_max || F;
                G = a.scaleScope_min || G;
                H = a.resizeType || H;
                t = a.debug || t;
                z = a.lineWidth || z;
                A = a.strokeStyle || A;
                B = a.fillStyle || B;
                O = a.nodeStyle || O;
                f = a.scaleAreaSize || f;
                -1 == v && (v = g.width);
                -1 == w && (w = g.height);
                P = a.autoSort || P;
                Q(a.tools, function (a) {
                    K = a
                });
                I.deleteAll();
                k.clear();
                N = null;
                b.fillStyle = "#959595";
                b.fillRect(0, 0, g.width, g.height);
                b.clearRect(C, D, v, w);
                a = b.getImageData(0, 0, g.width, g.height);
                b.clearRect(0, 0, g.width, g.height);
                for (var d = a.data, c = 0; c < g.width * g.height; c++) {
                    var h = d[4 * c + 1], r = d[4 * c + 2];
                    if (0 != d[4 * c + 0] || 0 != h || 0 != r)d[4 * c + 3] = 80
                }
                N = a;
                b.putImageData(a, 0, 0, 0, 0, g.width, g.height)
            } else alert("\u521d\u59cb\u5316\u5931\u8d25\uff01")
        },
        addImage: function (b, d, f) {
            c.size() == M ? alert("\u6700\u591a\u53ea\u80fd\u6dfb\u52a0" + M + "\u4e2a\u7d20\u6750\uff01") : Q(b, function (g) {
                var h = g.width, l = g.height, n = 1;
                h > l ? h > v && (n = v / h, h = v, l *= n) : l > w && (n = w / l, l = w, h *= n);
                g = new T(g, b, d, Math.round(h), Math.round(l), n, Math.round(C + (v - h) / 2), Math.round(D + (w - l) / 2), 0, f);
                k.preadd();
                c.add(g);
                k.add();
                a = c.get(c.size() - 1);
                p = c.size() - 1;
                t && e("#action") && e("#action").html(e("#action").html() + "\n\u52a0\u5165\u65b0\u56fe\u7247\uff0c\u5f53\u524d\u6709\uff1a" + c.size() + "\u4e2a\u56fe\u7247!");
                q(0)
            })
        },
        editImage: function (b, d) {
            a && Q(b, function (c) {
                a.height = a.width / c.width * c.height;
                a.imageElement = c;
                a.url = b;
                a.file = d;
                k.add();
                q(0)
            })
        },
        deleteImage: function () {
            0 < c.size() && (m.hide(), k.preadd(), c.remove(p), k.add(), a = null, p = -1, h = 0, q(0))
        },
        deleteText: function () {
            0 < c.size() && (m.hide(), k.preadd(), a && 2 == a.type && (c.remove(p), k.add(), a = null, p = -1, h = 0, q(0)))
        },
        deleteAll: function () {
            m.hide();
            c.removeAll();
            a = null;
            p = -1;
            q(0);
            k.clear()
        },
        addText: function (a) {
        },
        topImage: function () {
            a && (a.y = D, q(0), m.hide(), k.preadd(), k.add())
        },
        middleImage: function () {
            a && (a.y = (w - a.height) / 2 + D, q(0), m.hide(), k.preadd(), k.add())
        },
        bottomImage: function () {
            a && (a.y = w - a.height + D, q(0), m.hide(), k.preadd(), k.add())
        },
        leftImage: function () {
            a && (a.x = C, q(0), m.hide(), k.preadd(), k.add())
        },
        centerImage: function () {
            a && (a.x = (v - a.width) / 2 + C, q(0), m.hide(), k.preadd(), k.add())
        },
        rightImage: function () {
            a && (a.x = v - a.width + C, q(0), m.hide(), k.preadd(), k.add())
        },
        download: function () {
            0 < c.size() && (m.hide(), a = null, p = -1, q(0));
            var b = g.toDataURL("image/png");
            //window.location.href = b
            //return b;

            var ctx= g.getContext("2d");
            var imgData=ctx.getImageData(157,137,186,249);

            var newCanvas=document.createElement("canvas");
            newCanvas.width=186;
            newCanvas.height=249;
            var newCtx = newCanvas.getContext("2d");
            newCtx.putImageData(imgData,0,0);
            return newCanvas.toDataURL("image/png");

            //ctx.putImageData(imgData,0,0);
            //return g.toDataURL("image/png");
        },
        getResult: function () {
            e("#diyjson") && e("#diyjson").val(JSON.stringify(c, V))
        },
        blur: function () {
            a = null;
            p = -1;
            q(0)
        },
        undo: function () {
            k.undo();
            m.hide()
        },
        redo: function () {
            k.redo();
            m.hide()
        },
        clearRotate: function () {
            a && (a.rotate = 0, q(0), m.hide())
        },
        clearScale: function () {
            if (a) {
                var b = 1, d = a.width / a.scale, c = a.height / a.scale;
                1 != a.scale && (d > c ? d > v && (b = v / d, d = v, c *= b) : c > w && (b = w / c, c = w, d *= b), a.x = (a.width - d) / 2 + a.x, a.y = (a.height - c) / 2 + a.y, a.scale = b, a.width = d, a.height = c, q(0));
                m.hide()
            }
        },
        scope: function () {
            if (v != g.width || w != g.height) {
                var a = b.getImageData(0, 0, g.width, g.height);
                b.clearRect(0, 0, g.width, g.height);
                if (0 == L) {
                    b.fillStyle = "#959595";
                    b.fillRect(0, 0, g.width, g.height);
                    b.clearRect(C, D, v, w);
                    var d = b.getImageData(0, 0, g.width, g.height);
                    b.clearRect(0, 0, g.width, g.height);
                    if (N)b.putImageData(N, 0, 0, 0, 0, g.width, g.height); else {
                        for (var c = d.data, f = 0; f < g.width * g.height; f++) {
                            var h = c[4 * f + 1], e = c[4 * f + 2];
                            if (0 != c[4 * f + 0] || 0 != h || 0 != e)c[4 * f + 3] = 80
                        }
                        b.putImageData(d, 0, 0, 0, 0, g.width, g.height)
                    }
                }
                b.putImageData(a, 0, 0, C, D, v, w)
            }
        },
        lock: function () {
            L = !0;
            I.blur()
        },
        unlock: function () {
            L = !1;
            q(0)
        }
    }, k = {
        preadd: function () {
            if (u != x.size() - 1) {
                for (var a = new List, b = 0; b < u + 1; b++)a.add(e.extend(!0, {}, x.get(b)));
                x = a;
                t && e("#action") && e("#action").html(e("#action").html() + "\n\u64e6\u5b8c\u6570\u636e\uff1a" + JSON.stringify(x, null, 4))
            }
        }, add: function () {
            for (var a = new List, b = 0; b < c.length; b++)a.add(e.extend(!0, {}, c.get(b)));
            x.add(a);
            u++;
            this.refreshButton();
            t && e("#recordcursor") && e("#recordjson") && (e("#recordcursor").html(u), e("#recordjson").html(JSON.stringify(x, null, 4)))
        }, redo: function () {
            u < x.size() - 1 ? (u++, c = x.get(u), a = null, p = -1, h = 0, q(0)) : t && console.log("\u4e0d\u80fdredo\u4e86");
            t && e("#recordcursor") && e("#recordjson") && (e("#recordcursor").html(u), e("#recordjson").html(JSON.stringify(x, null, 4)));
            this.refreshButton()
        }, undo: function () {
            0 < u ? (u--, c = null, c = x.get(u), a = null, p = -1, h = 0, q(0)) : t && console.log("\u4e0d\u80fdundo\u4e86");
            t && e("#recordcursor") && e("#recordjson") && (e("#recordcursor").html(u), e("#recordjson").html(JSON.stringify(x, null, 4)));
            this.refreshButton()
        }, clear: function () {
            x.removeAll();
            u = -1;
            k.add();
            this.refreshButton();
            t && e("#recordcursor") && e("#recordjson") && (e("#recordcursor").html(u), e("#recordjson").html(JSON.stringify(x, null, 4)))
        }, refreshButton: function () {
            e(".repealNext") && e(".repealPrev") && (1 < x.size() ? (1 < x.size() - u ? e(".repealNext").addClass("usable") : e(".repealNext").removeClass("usable"), 0 < u ? e(".repealPrev").addClass("usable") : e(".repealPrev").removeClass("usable")) : (e(".repealPrev").removeClass("usable"), e(".repealNext").removeClass("usable")))
        }
    }, W = function (b) {
        b.preventDefault;
        if (1 == L)return !1;
        var d = b.offsetX;
        d || (d = b.x);
        var f = b.offsetY;
        f || (f = b.y);
        t && e("#action") && e("#action").html(e("#action").html() + "\n\u9f20\u6807\u6309\u4e0b\u5750\u6807\uff1a" + d + "|" + f);
        J = !0;
        if (0 >= h && (a = null, p = -1, t && e("#action") && e("#action").html(e("#action").html() + "\n\u6e05\u7a7a\u7126\u70b9\u56fe"), 0 < c.size()))for (var k = c.size() - 1; 0 <= k && (d > c.get(k).x && d < c.get(k).x + c.get(k).width && f > c.get(k).y && f < c.get(k).y + c.get(k).height ? (h = 1, a = c.get(k), p = k, R()) : (g.setAttribute("class", "cursor_default"), h = 0), !a); k--);
        if (0 < h) {
            if (11 == h)return I.deleteImage(), h = 0, !1;
            14 == h && 0 <= p && (c.remove(p), c.add(a), p = -1);
            n = d;
            y = f;
            startDragImagetX = a.x;
            startDragImagetY = a.y;
            t && e("#action") && e("#action").html(e("#action").html() + "\n\u521d\u59cb\u64cd\u4f5c\u5750\u6807\uff1a" + n + "|" + y + "," + startDragImagetX + "|" + startDragImagetY)
        }
        P && 0 <= p && (c.remove(p), c.add(a), p = -1);
        2 == b.button ? (m.hide(), a && m.css({top: b.pageY + 1 + "px", left: b.pageX + 1 + "px"}).show()) : m.hide()
    }, X = function (b) {
        b.preventDefault();
        b.stopPropagation();
        0 < h && t && e("#action") && e("#action").html(e("#action").html() + "\n\u9f20\u6807\u5f39\u8d77 X\uff1a" + a.x + "|Y:" + a.y + "|W:" + a.width + "|H:" + a.height);
        g.setAttribute("class", "cursor_default");
        J = !1;
        0 < c.size() && q(0);
        0 == b.button && a && (k.preadd(), k.add())
    }, Y = function (a) {
        a.preventDefault();
        g.setAttribute("class", "cursor_default");
        J = !1;
        0 < c.size() && q(0)
    }, Z = function (c) {
        c.preventDefault();
        var d = c.offsetX;
        d || (d = c.x);
        var e = c.offsetY;
        e || (e = c.y);
        if (!J) {
            if (a) {
                var k = Math.sqrt(a.width * a.width + a.height * a.height) / 2;
                c = E(a.x, a.y + a.height / 2, a.rotate + 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2)), a.width, a.height, k, !1);
                var r = E(a.x, a.y + a.height / 2, a.rotate + 90, a.width, a.height, a.height / 2, !1), l = E(a.x, a.y + a.height / 2, a.rotate + (180 - 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2))), a.width, a.height, k, !1), m = E(a.x, a.y + a.height / 2, a.rotate + 180, a.width, a.height, a.width / 2, !1), p = E(a.x, a.y + a.height / 2, a.rotate + (180 + 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2))), a.width, a.height, k, !1), u = E(a.x, a.y + a.height / 2, a.rotate + 270, a.width, a.height, a.height / 2, !1), k = E(a.x, a.y + a.height / 2, a.rotate + (360 - 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2))), a.width, a.height, k, !1), x = E(a.x, a.y + a.height / 2, a.rotate, a.width, a.height, a.width / 2, !1), t = Math.sqrt((a.width + 30) * (a.width + 30) + (a.height + 30) * (a.height + 30)) / 2, z = E(a.x, a.y + a.height / 2, a.rotate + 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2)), a.width, a.height, t, !1), A = E(a.x, a.y + a.height / 2, a.rotate + (180 - 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2))), a.width, a.height, t, !1), B = E(a.x, a.y + a.height / 2, a.rotate + (180 + 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2))), a.width, a.height, t, !1), t = E(a.x, a.y + a.height / 2, a.rotate + (360 - 180 / Math.PI * Math.atan(a.height / 2 / (a.width / 2))), a.width, a.height, t, !1);
                d > z.x - 15 && d < z.x + 15 && e > z.y - 15 && e < z.y + 15 ? (g.setAttribute("class", "cursor_pointer"), h = 11) : d > A.x - 15 && d < A.x + 15 && e > A.y - 15 && e < A.y + 15 ? (g.setAttribute("class", "cursor_pointer"), h = 12) : d > B.x - 15 && d < B.x + 15 && e > B.y - 15 && e < B.y + 15 ? (g.setAttribute("class", "cursor_pointer"), h = 13) : d > t.x - 15 && d < t.x + 15 && e > t.y - 15 && e < t.y + 15 ? (g.setAttribute("class", "cursor_pointer"), h = 14) : d > c.x - f / 2 && d < c.x + f / 2 && e > c.y - f / 2 && e < c.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_se-resize"), h = 2) : d > r.x - f / 2 && d < r.x + f / 2 && e > r.y - f / 2 && e < r.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_s-resize"), h = 3) : d > l.x - f / 2 && d < l.x + f / 2 && e > l.y - f / 2 && e < l.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_ne-resize"), h = 4) : d > m.x - f / 2 && d < m.x + f / 2 && e > m.y - f / 2 && e < m.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_w-resize"), h = 5) : d > p.x - f / 2 && d < p.x + f / 2 && e > p.y - f / 2 && e < p.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_se-resize"), h = 6) : d > u.x - f / 2 && d < u.x + f / 2 && e > u.y - f / 2 && e < u.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_s-resize"), h = 7) : d > k.x - f / 2 && d < k.x + f / 2 && e > k.y - f / 2 && e < k.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_ne-resize"), h = 8) : d > x.x - f / 2 && d < x.x + f / 2 && e > x.y - f / 2 && e < x.y + f / 2 && 1 == a.type ? (g.setAttribute("class", "cursor_w-resize"), h = 9) : d > a.x + a.width / 2 - 3 * f && d < a.x + a.width / 2 + 3 * f && e > a.y + a.height / 2 - 3 * f && e < a.y + a.height / 2 + 3 * f ? (g.setAttribute("class", "cursor_move"), h = 1) : (g.setAttribute("class", "cursor_default"), h = 0)
            }
        } else if (0 != h)if (1 == h)a.x = Math.round(startDragImagetX + d - n), a.y = Math.round(startDragImagetY + e - y), q(1), n = d, y = e, startDragImagetX = a.x, startDragImagetY = a.y, 0 == a.rotate && (a.y == D && (b.save(), b.translate(.5, .5), b.lineWidth = 1, b.beginPath(), b.moveTo(0, D), b.lineTo(g.width, D), b.globalAlpha = 1, b.strokeStyle = "#00EB93", b.stroke(), b.closePath(), b.restore()), a.x == C && (b.save(), b.translate(.5, .5), b.lineWidth = 1, b.beginPath(), b.moveTo(C, 0), b.lineTo(C, g.height), b.globalAlpha = 1, b.strokeStyle = "#00EB93", b.stroke(), b.closePath(), b.restore()), a.x + a.width == C + v && (b.save(), b.translate(.5, .5), b.lineWidth = 1, b.beginPath(), b.moveTo(C + v, 0), b.lineTo(C + v, g.height), b.globalAlpha = 1, b.strokeStyle = "#00EB93", b.stroke(), b.closePath(), b.restore()), a.y + a.height == D + w && (b.save(), b.translate(.5, .5), b.lineWidth = 1, b.beginPath(), b.moveTo(0, D + w), b.lineTo(g.width, D + w), b.globalAlpha = 1, b.strokeStyle = "#00EB93", b.stroke(), b.closePath(), b.restore())); else if (10 == h)l = d - (a.x + a.width / 2), c = a.y + a.height / 2 - e, r = Math.sqrt(l * l + c * c), a.rotate = 0 < l ? 180 / Math.PI * Math.acos(c / r) : 360 - 180 / Math.PI * Math.acos(c / r), q(2), n = d, y = e; else if (12 == h)l = d - (a.x + a.width / 2), c = a.y + a.height / 2 - e, r = Math.sqrt(l * l + c * c), m = a.width / 2 + 15, p = a.height / 2 + 15, m = 180 / Math.PI * Math.acos(p / Math.sqrt(m * m + p * p)), 0 < l ? (l = 180 / Math.PI * Math.acos(c / r) - m, a.rotate = 0 > l ? 360 + 180 / Math.PI * Math.acos(c / r) - m : l) : a.rotate = 360 - 180 / Math.PI * Math.acos(c / r) - m, q(2), n = d, y = e; else {
            2 == h && (0 == H ? (a.x -= n - d, a.y -= y - e, a.width += 2 * (n - d), a.height += 2 * (y - e)) : (c = a.width / (a.width + (d - n)), a.scale *= c, a.scale >= G && a.scale <= F ? (r = a.width, a.width *= c, l = a.height, a.height *= c, a.x -= a.width - r, a.y -= a.height - l) : a.scale /= c));
            3 == h && 0 != H && (c = a.height / (a.height + 2 * (e - y)), a.scale *= c, a.scale >= G && a.scale <= F ? (r = a.width, a.width *= c, l = a.height, a.height *= c, a.x -= (a.width - r) / 2, a.y -= (a.height - l) / 2) : a.scale /= c);
            4 == h && (0 == H ? (a.x -= d - n, a.y -= y - e, a.width += 2 * (d - n), a.height += 2 * (y - e)) : (c = a.width / (a.width + (n - d)), a.scale *= c, a.scale >= G && a.scale <= F ? (a.width *= c, l = a.height, a.height *= c, a.y -= a.height - l) : a.scale /= c));
            5 == h && 0 != H && (c = a.width / (a.width + 2 * (n - d)), a.scale *= c, a.scale >= G && a.scale <= F ? (r = a.width, a.width *= c, l = a.height, a.height *= c, a.x -= (a.width - r) / 2, a.y -= (a.height - l) / 2) : a.scale /= c);
            if (6 == h || 13 == h)0 == H ? (a.x -= d - n, a.y -= e - y, a.width += 2 * (d - n), a.height += 2 * (e - y)) : (c = a.width / (a.width + (n - d)), a.scale *= c, a.scale >= G && a.scale <= F ? (a.width *= c, a.height *= c) : a.scale /= c);
            7 == h && 0 != H && (c = a.height / (a.height + 2 * (y - e)), a.scale *= c, a.scale >= G && a.scale <= F ? (r = a.width, a.width *= c, l = a.height, a.height *= c, a.x -= (a.width - r) / 2, a.y -= (a.height - l) / 2) : a.scale /= c);
            8 == h && (0 == H ? (a.x -= n - d, a.y -= e - y, a.width += 2 * (n - d), a.height += 2 * (e - y)) : (c = a.width / (a.width + (d - n)), a.scale *= c, a.scale >= G && a.scale <= F ? (r = a.width, a.width *= c, a.height *= c, a.x -= a.width - r) : a.scale /= c));
            9 == h && 0 != H && (c = a.width / (a.width + 2 * (d - n)), a.scale *= c, a.scale >= G && a.scale <= F ? (r = a.width, a.width *= c, l = a.height, a.height *= c, a.x -= (a.width - r) / 2, a.y -= (a.height - l) / 2) : a.scale /= c);
            q(1);
            n = d;
            y = e;
            a.x = Math.round(a.x);
            a.y = Math.round(a.y);
            a.width = Math.round(a.width);
            a.height = Math.round(a.height)
        }
    }, Q = function (a, b) {
        var c = document.createElement("img");
        c.src = a;
        c.addEventListener("load", function () {
            y = n = 0;
            J = !1;
            h = 0;
            b.call(this, c)
        });
        c.addEventListener("error", function () {
            alert("\u56fe\u7247\u52a0\u8f7d\u5931\u8d25\uff01")
        })
    }, R = function () {
        I.scope();
        b.save();
        b.translate(a.x + a.width / 2, a.y + a.height / 2);
        b.rotate(a.rotate * Math.PI / 180);
        b.drawImage(K, 0, 0, 30, 30, -a.width / 2 - 30, -a.height / 2 - 30, 30, 30);
        b.drawImage(K, 50, 0, 30, 30, a.width / 2, -a.height / 2 - 30, 30, 30);
        b.drawImage(K, 150, 0, 30, 30, a.width / 2, a.height / 2, 30, 30);
        b.drawImage(K, 100, 0, 30, 30, -a.width / 2 - 30, a.height / 2, 30, 30);
        b.save();
        b.translate(.5, .5);
        b.beginPath();
        b.rect(-a.width / 2, -a.height / 2, a.width, a.height);
        b.fillStyle = "rgba(0, 0, 0, 0)";
        b.fill();
        b.lineWidth = z;
        b.strokeStyle = A;
        b.stroke();
        b.closePath();
        b.restore();
        1 == a.type && (1 == O && (b.save(), b.translate(.5, .5), b.beginPath(), b.rect(-a.width / 2 - f / 2, -a.height / 2 - f / 2, f, f), b.rect(-f / 2, -a.height / 2 - f / 2, f, f), b.rect(a.width / 2 - f / 2, -a.height / 2 - f / 2, f, f), b.rect(a.width / 2 - f / 2, -f / 2, f, f), b.rect(a.width / 2 - f / 2, a.height / 2 - f / 2, f, f), b.rect(-f / 2, a.height / 2 - f / 2, f, f), b.rect(-a.width / 2 - f / 2, a.height / 2 - f / 2, f, f), b.rect(-a.width / 2 - f / 2, -f / 2, f, f), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore()), 0 == O && (b.save(), b.beginPath(), b.arc(-a.width / 2, -a.height / 2, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore(), b.save(), b.beginPath(), b.arc(0, -a.height / 2, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore(), b.save(), b.beginPath(), b.arc(a.width / 2, -a.height / 2, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore(), b.save(), b.beginPath(), b.arc(a.width / 2, 0, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore(), b.save(), b.beginPath(), b.arc(a.width / 2, a.height / 2, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore(), b.save(), b.beginPath(), b.arc(0, a.height / 2, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore(), b.save(), b.beginPath(), b.arc(-a.width / 2, a.height / 2, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore(), b.save(), b.beginPath(), b.arc(-a.width / 2, 0, f / 2, 0, 2 * Math.PI), b.fillStyle = B, b.fill(), b.lineWidth = z, b.strokeStyle = A, b.stroke(), b.closePath(), b.restore()));
        b.restore()
    }, q = function (e) {
        if (!b)return alert("DIY\u533a\u8fd8\u6ca1\u6709\u521d\u59cb\u5316\uff01"), !1;
        if (0 == e && (b.clearRect(0, 0, g.width, g.height), b.globalAlpha = 1, 0 < c.size()))for (var d = 0; d < c.size(); d++)0 == c.get(d).rotate ? b.drawImage(c.get(d).imageElement, c.get(d).x, c.get(d).y, c.get(d).width, c.get(d).height) : (b.save(), b.translate(c.get(d).x + c.get(d).width / 2, c.get(d).y + c.get(d).height / 2), b.rotate(c.get(d).rotate * Math.PI / 180), b.drawImage(c.get(d).imageElement, -c.get(d).width / 2, -c.get(d).height / 2, c.get(d).width, c.get(d).height), b.restore());
        if (1 == e && (b.clearRect(0, 0, g.width, g.height), b.globalAlpha = .4, 0 < c.size()))for (d = 0; d < c.size(); d++)0 == c.get(d).rotate ? b.drawImage(c.get(d).imageElement, c.get(d).x, c.get(d).y, c.get(d).width, c.get(d).height) : (b.save(), b.translate(c.get(d).x + c.get(d).width / 2, c.get(d).y + c.get(d).height / 2), b.rotate(c.get(d).rotate * Math.PI / 180), b.drawImage(c.get(d).imageElement, -c.get(d).width / 2, -c.get(d).height / 2, c.get(d).width, c.get(d).height), b.restore());
        if (2 == e) {
            b.clearRect(0, 0, g.width, g.height);
            b.globalAlpha = .4;
            if (0 < c.size())for (d = 0; d < c.size(); d++)0 == c.get(d).rotate ? b.drawImage(c.get(d).imageElement, c.get(d).x, c.get(d).y, c.get(d).width, c.get(d).height) : (b.save(), b.translate(c.get(d).x + c.get(d).width / 2, c.get(d).y + c.get(d).height / 2), b.rotate(c.get(d).rotate * Math.PI / 180), b.drawImage(c.get(d).imageElement, -c.get(d).width / 2, -c.get(d).height / 2, c.get(d).width, c.get(d).height), b.restore());
            b.save();
            b.translate(a.x + a.width / 2, a.y + a.height / 2);
            b.rotate(a.rotate * Math.PI / 180);
            b.drawImage(a.imageElement, -a.width / 2, -a.height / 2, a.width, a.height);
            b.restore()
        }
        I.scope();
        a && R();
        I.getResult()
    };
    S.hbdiy = I
})(jQuery, window);