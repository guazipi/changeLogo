/**
 * Created by Administrator on 2016/4/14.
 */
function fileQueued(e) {
    try {
        var t = new FileProgress(e, this.customSettings.progressTarget);
        t.setStatus("等待上传..."), t.toggleCancel(!0, this)
    } catch (n) {
        this.debug(n)
    }
}
function fileQueueError(e, t, n) {
    try {
        if (t === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED)return void alert("为了保证您的上传速度，一次最多上传" + n + "个文件.");
        var i = new FileProgress(e, this.customSettings.progressTarget);
        switch (i.setError(), i.toggleCancel(!1), t) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                i.setStatus("文件大小超出范围."), this.debug("Error Code: File too big, File name: " + e.name + ", File size: " + e.size + ", Message: " + n);
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                i.setStatus("文件大小为空."), this.debug("Error Code: Zero byte file, File name: " + e.name + ", File size: " + e.size + ", Message: " + n);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                i.setStatus("无效的文件格式."), this.debug("Error Code: Invalid File Type, File name: " + e.name + ", File size: " + e.size + ", Message: " + n);
                break;
            default:
                null !== e && i.setStatus("Unhandled Error"), this.debug("Error Code: " + t + ", File name: " + e.name + ", File size: " + e.size + ", Message: " + n)
        }
    } catch (o) {
        this.debug(o)
    }
}
function fileDialogComplete(e) {
    try {
        e > 0 && (document.getElementById(this.customSettings.cancelButtonId).disabled = !1, this.startUpload())
    } catch (t) {
        this.debug(t)
    }
}
function uploadStart(e) {
    try {
        var t = new FileProgress(e, this.customSettings.progressTarget);
        t.setStatus("正在上传..."), t.toggleCancel(!0, this)
    } catch (n) {
    }
    return !0
}
function uploadProgress(e, t) {
    try {
        var n = Math.ceil(t / e.size * 100), i = new FileProgress(e, this.customSettings.progressTarget);
        i.setProgress(n), 100 === n ? (i.setStatus(""), i.toggleCancel(!1, this)) : (i.setStatus("正在上传..."), i.toggleCancel(!0, this))
    } catch (o) {
        this.debug(o)
    }
}
function uploadSuccess(e) {
    try {
        var t = new FileProgress(e, this.customSettings.progressTarget);
        t.setComplete(), t.setStatus("已完成."), t.toggleCancel(!1)
    } catch (n) {
        this.debug(n)
    }
}
function uploadError(e, t, n) {
    try {
        var i = new FileProgress(e, this.customSettings.progressTarget);
        switch (i.setError(), i.toggleCancel(!1), t) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                i.setStatus("Upload Error: " + n), this.debug("Error Code: HTTP Error, File name: " + e.name + ", Message: " + n);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                i.setStatus("Upload Failed."), this.debug("Error Code: Upload Failed, File name: " + e.name + ", File size: " + e.size + ", Message: " + n);
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                i.setStatus("Server (IO) Error"), this.debug("Error Code: IO Error, File name: " + e.name + ", Message: " + n);
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                i.setStatus("Security Error"), this.debug("Error Code: Security Error, File name: " + e.name + ", Message: " + n);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                i.setStatus("Upload limit exceeded."), this.debug("Error Code: Upload Limit Exceeded, File name: " + e.name + ", File size: " + e.size + ", Message: " + n);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                i.setStatus("Failed Validation.  Upload skipped."), this.debug("Error Code: File Validation Failed, File name: " + e.name + ", File size: " + e.size + ", Message: " + n);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                0 === this.getStats().files_queued && (document.getElementById(this.customSettings.cancelButtonId).disabled = !0), i.setStatus("取消上传."), i.setCancelled();
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                i.setStatus("中止上传.");
                break;
            default:
                i.setStatus("Unhandled Error: " + t), this.debug("Error Code: " + t + ", File name: " + e.name + ", File size: " + e.size + ", Message: " + n)
        }
    } catch (o) {
        this.debug(o)
    }
}
function uploadComplete(e) {
    try {
        if (this.getStats().files_queued > 0)this.startUpload(); else {
            var t = new FileProgress(e, this.customSettings.progressTarget);
            t.setComplete(), t.setStatus("<font color='red'>所有文件上传完毕!</b></font>"), t.toggleCancel(!1)
        }
    } catch (n) {
        this.debug(n)
    }
}
function FileProgress(e) {
    this.fileProgressID = e.id, this.fileProgressWrapper = document.getElementById(this.fileProgressID), this.fileProgressElement = document.getElementById(this.fileProgressID), this.cancelElement = document.getElementById("del_pic_" + this.fileProgressID), this.reset(), this.height = this.fileProgressWrapper.offsetHeight, this.setTimer(null)
}
function fadeIn(e, t) {
    var n = 5, i = 30;
    if (100 > t)if (t += n, t > 100 && (t = 100), e.filters)try {
        e.filters.item("DXImageTransform.Microsoft.Alpha").opacity = t
    } catch (o) {
        e.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + t + ")"
    } else e.style.opacity = t / 100;
    100 > t && setTimeout(function () {
        fadeIn(e, t)
    }, i)
}
function mixin(e, t) {
    for (var n in t)e[n] = t[n];
    return e
}
!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = e.length, n = ot.type(e);
        return "function" === n || ot.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function i(e, t, n) {
        if (ot.isFunction(t))return ot.grep(e, function (e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType)return ot.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (pt.test(t))return ot.filter(t, e, n);
            t = ot.filter(t, e)
        }
        return ot.grep(e, function (e) {
            return ot.inArray(e, t) >= 0 !== n
        })
    }

    function o(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function r(e) {
        var t = xt[e] = {};
        return ot.each(e.match(bt) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function a() {
        ht.addEventListener ? (ht.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (ht.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (ht.addEventListener || "load" === event.type || "complete" === ht.readyState) && (a(), ot.ready())
    }

    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(Et, "-$1").toLowerCase();
            if (n = e.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Tt.test(n) ? ot.parseJSON(n) : n
                } catch (o) {
                }
                ot.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function u(e) {
        var t;
        for (t in e)if (("data" !== t || !ot.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
        return !0
    }

    function c(e, t, n, i) {
        if (ot.acceptData(e)) {
            var o, r, a = ot.expando, s = e.nodeType, l = s ? ot.cache : e, u = s ? e[a] : e[a] && a;
            if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof t)return u || (u = s ? e[a] = V.pop() || ot.guid++ : a), l[u] || (l[u] = s ? {} : {toJSON: ot.noop}), ("object" == typeof t || "function" == typeof t) && (i ? l[u] = ot.extend(l[u], t) : l[u].data = ot.extend(l[u].data, t)), r = l[u], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[ot.camelCase(t)] = n), "string" == typeof t ? (o = r[t], null == o && (o = r[ot.camelCase(t)])) : o = r, o
        }
    }

    function d(e, t, n) {
        if (ot.acceptData(e)) {
            var i, o, r = e.nodeType, a = r ? ot.cache : e, s = r ? e[ot.expando] : ot.expando;
            if (a[s]) {
                if (t && (i = n ? a[s] : a[s].data)) {
                    ot.isArray(t) ? t = t.concat(ot.map(t, ot.camelCase)) : t in i ? t = [t] : (t = ot.camelCase(t), t = t in i ? [t] : t.split(" ")), o = t.length;
                    for (; o--;)delete i[t[o]];
                    if (n ? !u(i) : !ot.isEmptyObject(i))return
                }
                (n || (delete a[s].data, u(a[s]))) && (r ? ot.cleanData([e], !0) : nt.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
            }
        }
    }

    function p() {
        return !0
    }

    function f() {
        return !1
    }

    function h() {
        try {
            return ht.activeElement
        } catch (e) {
        }
    }

    function m(e) {
        var t = Mt.split("|"), n = e.createDocumentFragment();
        if (n.createElement)for (; t.length;)n.createElement(t.pop());
        return n
    }

    function g(e, t) {
        var n, i, o = 0, r = typeof e.getElementsByTagName !== St ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== St ? e.querySelectorAll(t || "*") : void 0;
        if (!r)for (r = [], n = e.childNodes || e; null != (i = n[o]); o++)!t || ot.nodeName(i, t) ? r.push(i) : ot.merge(r, g(i, t));
        return void 0 === t || t && ot.nodeName(e, t) ? ot.merge([e], r) : r
    }

    function v(e) {
        Nt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function y(e, t) {
        return ot.nodeName(e, "table") && ot.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function b(e) {
        return e.type = (null !== ot.find.attr(e, "type")) + "/" + e.type, e
    }

    function x(e) {
        var t = Xt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function _(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++)ot._data(n, "globalEval", !t || ot._data(t[i], "globalEval"))
    }

    function w(e, t) {
        if (1 === t.nodeType && ot.hasData(e)) {
            var n, i, o, r = ot._data(e), a = ot._data(t, r), s = r.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s)for (i = 0, o = s[n].length; o > i; i++)ot.event.add(t, n, s[n][i])
            }
            a.data && (a.data = ot.extend({}, a.data))
        }
    }

    function S(e, t) {
        var n, i, o;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !nt.noCloneEvent && t[ot.expando]) {
                o = ot._data(t);
                for (i in o.events)ot.removeEvent(t, i, o.handle);
                t.removeAttribute(ot.expando)
            }
            "script" === n && t.text !== e.text ? (b(t).text = e.text, x(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), nt.html5Clone && e.innerHTML && !ot.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Nt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function T(t, n) {
        var i, o = ot(n.createElement(t)).appendTo(n.body), r = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(o[0])) ? i.display : ot.css(o[0], "display");
        return o.detach(), r
    }

    function E(e) {
        var t = ht, n = Zt[e];
        return n || (n = T(e, t), "none" !== n && n || (Kt = (Kt || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Kt[0].contentWindow || Kt[0].contentDocument).document, t.write(), t.close(), n = T(e, t), Kt.detach()), Zt[e] = n), n
    }

    function C(e, t) {
        return {
            get: function () {
                var n = e();
                return null != n ? n ? void delete this.get : (this.get = t).apply(this, arguments) : void 0
            }
        }
    }

    function F(e, t) {
        if (t in e)return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, o = fn.length; o--;)if (t = fn[o] + n, t in e)return t;
        return i
    }

    function k(e, t) {
        for (var n, i, o, r = [], a = 0, s = e.length; s > a; a++)i = e[a], i.style && (r[a] = ot._data(i, "olddisplay"), n = i.style.display, t ? (r[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && kt(i) && (r[a] = ot._data(i, "olddisplay", E(i.nodeName)))) : (o = kt(i), (n && "none" !== n || !o) && ot._data(i, "olddisplay", o ? n : ot.css(i, "display"))));
        for (a = 0; s > a; a++)i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[a] || "" : "none"));
        return e
    }

    function U(e, t, n) {
        var i = un.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function N(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > r; r += 2)"margin" === n && (a += ot.css(e, n + Ft[r], !0, o)), i ? ("content" === n && (a -= ot.css(e, "padding" + Ft[r], !0, o)), "margin" !== n && (a -= ot.css(e, "border" + Ft[r] + "Width", !0, o))) : (a += ot.css(e, "padding" + Ft[r], !0, o), "padding" !== n && (a += ot.css(e, "border" + Ft[r] + "Width", !0, o)));
        return a
    }

    function P(e, t, n) {
        var i = !0, o = "width" === t ? e.offsetWidth : e.offsetHeight, r = en(e), a = nt.boxSizing && "border-box" === ot.css(e, "boxSizing", !1, r);
        if (0 >= o || null == o) {
            if (o = tn(e, t, r), (0 > o || null == o) && (o = e.style[t]), on.test(o))return o;
            i = a && (nt.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + N(e, t, n || (a ? "border" : "content"), i, r) + "px"
    }

    function D(e, t, n, i, o) {
        return new D.prototype.init(e, t, n, i, o)
    }

    function I() {
        return setTimeout(function () {
            hn = void 0
        }), hn = ot.now()
    }

    function L(e, t) {
        var n, i = {height: e}, o = 0;
        for (t = t ? 1 : 0; 4 > o; o += 2 - t)n = Ft[o], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function A(e, t, n) {
        for (var i, o = (xn[t] || []).concat(xn["*"]), r = 0, a = o.length; a > r; r++)if (i = o[r].call(n, t, e))return i
    }

    function M(e, t, n) {
        var i, o, r, a, s, l, u, c, d = this, p = {}, f = e.style, h = e.nodeType && kt(e), m = ot._data(e, "fxshow");
        n.queue || (s = ot._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
            s.unqueued || l()
        }), s.unqueued++, d.always(function () {
            d.always(function () {
                s.unqueued--, ot.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], u = ot.css(e, "display"), c = "none" === u ? ot._data(e, "olddisplay") || E(e.nodeName) : u, "inline" === c && "none" === ot.css(e, "float") && (nt.inlineBlockNeedsLayout && "inline" !== E(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", nt.shrinkWrapBlocks() || d.always(function () {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in t)if (o = t[i], gn.exec(o)) {
            if (delete t[i], r = r || "toggle" === o, o === (h ? "hide" : "show")) {
                if ("show" !== o || !m || void 0 === m[i])continue;
                h = !0
            }
            p[i] = m && m[i] || ot.style(e, i)
        } else u = void 0;
        if (ot.isEmptyObject(p))"inline" === ("none" === u ? E(e.nodeName) : u) && (f.display = u); else {
            m ? "hidden" in m && (h = m.hidden) : m = ot._data(e, "fxshow", {}), r && (m.hidden = !h), h ? ot(e).show() : d.done(function () {
                ot(e).hide()
            }), d.done(function () {
                var t;
                ot._removeData(e, "fxshow");
                for (t in p)ot.style(e, t, p[t])
            });
            for (i in p)a = A(h ? m[i] : 0, i, d), i in m || (m[i] = a.start, h && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function R(e, t) {
        var n, i, o, r, a;
        for (n in e)if (i = ot.camelCase(n), o = t[i], r = e[n], ot.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), a = ot.cssHooks[i], a && "expand" in a) {
            r = a.expand(r), delete e[i];
            for (n in r)n in e || (e[n] = r[n], t[n] = o)
        } else t[i] = o
    }

    function W(e, t, n) {
        var i, o, r = 0, a = bn.length, s = ot.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (o)return !1;
            for (var t = hn || I(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, r = 1 - i, a = 0, l = u.tweens.length; l > a; a++)u.tweens[a].run(r);
            return s.notifyWith(e, [u, r, n]), 1 > r && l ? n : (s.resolveWith(e, [u]), !1)
        }, u = s.promise({
            elem: e,
            props: ot.extend({}, t),
            opts: ot.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: hn || I(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var i = ot.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(i), i
            },
            stop: function (t) {
                var n = 0, i = t ? u.tweens.length : 0;
                if (o)return this;
                for (o = !0; i > n; n++)u.tweens[n].run(1);
                return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
            }
        }), c = u.props;
        for (R(c, u.opts.specialEasing); a > r; r++)if (i = bn[r].call(u, e, c, u.opts))return i;
        return ot.map(c, A, u), ot.isFunction(u.opts.start) && u.opts.start.call(e, u), ot.fx.timer(ot.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function H(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0, r = t.toLowerCase().match(bt) || [];
            if (ot.isFunction(n))for (; i = r[o++];)"+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function O(e, t, n, i) {
        function o(s) {
            var l;
            return r[s] = !0, ot.each(e[s] || [], function (e, s) {
                var u = s(t, n, i);
                return "string" != typeof u || a || r[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), o(u), !1)
            }), l
        }

        var r = {}, a = e === zn;
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }

    function j(e, t) {
        var n, i, o = ot.ajaxSettings.flatOptions || {};
        for (i in t)void 0 !== t[i] && ((o[i] ? e : n || (n = {}))[i] = t[i]);
        return n && ot.extend(!0, e, n), e
    }

    function q(e, t, n) {
        for (var i, o, r, a, s = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
        if (o)for (a in s)if (s[a] && s[a].test(o)) {
            l.unshift(a);
            break
        }
        if (l[0] in n)r = l[0]; else {
            for (a in n) {
                if (!l[0] || e.converters[a + " " + l[0]]) {
                    r = a;
                    break
                }
                i || (i = a)
            }
            r = r || i
        }
        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
    }

    function B(e, t, n, i) {
        var o, r, a, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1])for (a in e.converters)u[a.toLowerCase()] = e.converters[a];
        for (r = c.shift(); r;)if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = c.shift())if ("*" === r)r = l; else if ("*" !== l && l !== r) {
            if (a = u[l + " " + r] || u["* " + r], !a)for (o in u)if (s = o.split(" "), s[1] === r && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                a === !0 ? a = u[o] : u[o] !== !0 && (r = s[0], c.unshift(s[1]));
                break
            }
            if (a !== !0)if (a && e["throws"])t = a(t); else try {
                t = a(t)
            } catch (d) {
                return {state: "parsererror", error: a ? d : "No conversion from " + l + " to " + r}
            }
        }
        return {state: "success", data: t}
    }

    function z(e, t, n, i) {
        var o;
        if (ot.isArray(t))ot.each(t, function (t, o) {
            n || Vn.test(e) ? i(e, o) : z(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, i)
        }); else if (n || "object" !== ot.type(t))i(e, t); else for (o in t)z(e + "[" + o + "]", t[o], n, i)
    }

    function $() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function Q() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function X(e) {
        return ot.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    var V = [], Y = V.slice, G = V.concat, J = V.push, K = V.indexOf, Z = {}, et = Z.toString, tt = Z.hasOwnProperty, nt = {}, it = "1.11.1", ot = function (e, t) {
        return new ot.fn.init(e, t)
    }, rt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, at = /^-ms-/, st = /-([\da-z])/gi, lt = function (e, t) {
        return t.toUpperCase()
    };
    ot.fn = ot.prototype = {
        jquery: it, constructor: ot, selector: "", length: 0, toArray: function () {
            return Y.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : Y.call(this)
        }, pushStack: function (e) {
            var t = ot.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return ot.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(ot.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(Y.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: J, sort: V.sort, splice: V.splice
    }, ot.extend = ot.fn.extend = function () {
        var e, t, n, i, o, r, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || ot.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)if (null != (o = arguments[s]))for (i in o)e = a[i], n = o[i], a !== n && (u && n && (ot.isPlainObject(n) || (t = ot.isArray(n))) ? (t ? (t = !1, r = e && ot.isArray(e) ? e : []) : r = e && ot.isPlainObject(e) ? e : {}, a[i] = ot.extend(u, r, n)) : void 0 !== n && (a[i] = n));
        return a
    }, ot.extend({
        expando: "jQuery" + (it + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === ot.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === ot.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return !ot.isArray(e) && e - parseFloat(e) >= 0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, isPlainObject: function (e) {
            var t;
            if (!e || "object" !== ot.type(e) || e.nodeType || ot.isWindow(e))return !1;
            try {
                if (e.constructor && !tt.call(e, "constructor") && !tt.call(e.constructor.prototype, "isPrototypeOf"))return !1
            } catch (n) {
                return !1
            }
            if (nt.ownLast)for (t in e)return tt.call(e, t);
            for (t in e);
            return void 0 === t || tt.call(e, t)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[et.call(e)] || "object" : typeof e
        }, globalEval: function (t) {
            t && ot.trim(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        }, camelCase: function (e) {
            return e.replace(at, "ms-").replace(st, lt)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, i) {
            var o, r = 0, a = e.length, s = n(e);
            if (i) {
                if (s)for (; a > r && (o = t.apply(e[r], i), o !== !1); r++); else for (r in e)if (o = t.apply(e[r], i), o === !1)break
            } else if (s)for (; a > r && (o = t.call(e[r], r, e[r]), o !== !1); r++); else for (r in e)if (o = t.call(e[r], r, e[r]), o === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(rt, "")
        }, makeArray: function (e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? ot.merge(i, "string" == typeof e ? [e] : e) : J.call(i, e)), i
        }, inArray: function (e, t, n) {
            var i;
            if (t) {
                if (K)return K.call(t, e, n);
                for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)if (n in t && t[n] === e)return n
            }
            return -1
        }, merge: function (e, t) {
            for (var n = +t.length, i = 0, o = e.length; n > i;)e[o++] = t[i++];
            if (n !== n)for (; void 0 !== t[i];)e[o++] = t[i++];
            return e.length = o, e
        }, grep: function (e, t, n) {
            for (var i, o = [], r = 0, a = e.length, s = !n; a > r; r++)i = !t(e[r], r), i !== s && o.push(e[r]);
            return o
        }, map: function (e, t, i) {
            var o, r = 0, a = e.length, s = n(e), l = [];
            if (s)for (; a > r; r++)o = t(e[r], r, i), null != o && l.push(o); else for (r in e)o = t(e[r], r, i), null != o && l.push(o);
            return G.apply([], l)
        }, guid: 1, proxy: function (e, t) {
            var n, i, o;
            return "string" == typeof t && (o = e[t], t = e, e = o), ot.isFunction(e) ? (n = Y.call(arguments, 2), i = function () {
                return e.apply(t || this, n.concat(Y.call(arguments)))
            }, i.guid = e.guid = e.guid || ot.guid++, i) : void 0
        }, now: function () {
            return +new Date
        }, support: nt
    }), ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    });
    var ut = function (e) {
        function t(e, t, n, i) {
            var o, r, a, s, l, u, d, f, h, m;
            if ((t ? t.ownerDocument || t : O) !== D && P(t), t = t || D, n = n || [], !e || "string" != typeof e)return n;
            if (1 !== (s = t.nodeType) && 9 !== s)return [];
            if (L && !i) {
                if (o = yt.exec(e))if (a = o[1]) {
                    if (9 === s) {
                        if (r = t.getElementById(a), !r || !r.parentNode)return n;
                        if (r.id === a)return n.push(r), n
                    } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(a)) && W(t, r) && r.id === a)return n.push(r), n
                } else {
                    if (o[2])return Z.apply(n, t.getElementsByTagName(e)), n;
                    if ((a = o[3]) && _.getElementsByClassName && t.getElementsByClassName)return Z.apply(n, t.getElementsByClassName(a)), n
                }
                if (_.qsa && (!A || !A.test(e))) {
                    if (f = d = H, h = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (u = E(e), (d = t.getAttribute("id")) ? f = d.replace(xt, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = u.length; l--;)u[l] = f + p(u[l]);
                        h = bt.test(e) && c(t.parentNode) || t, m = u.join(",")
                    }
                    if (m)try {
                        return Z.apply(n, h.querySelectorAll(m)), n
                    } catch (g) {
                    } finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return F(e.replace(lt, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = i
            }

            var t = [];
            return e
        }

        function i(e) {
            return e[H] = !0, e
        }

        function o(e) {
            var t = D.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function r(e, t) {
            for (var n = e.split("|"), i = e.length; i--;)w.attrHandle[n[i]] = t
        }

        function a(e, t) {
            var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (i)return i;
            if (n)for (; n = n.nextSibling;)if (n === t)return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return i(function (t) {
                return t = +t, i(function (n, i) {
                    for (var o, r = e([], n.length, t), a = r.length; a--;)n[o = r[a]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }

        function c(e) {
            return e && typeof e.getElementsByTagName !== X && e
        }

        function d() {
        }

        function p(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++)i += e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir, o = n && "parentNode" === i, r = q++;
            return t.first ? function (t, n, r) {
                for (; t = t[i];)if (1 === t.nodeType || o)return e(t, n, r)
            } : function (t, n, a) {
                var s, l, u = [j, r];
                if (a) {
                    for (; t = t[i];)if ((1 === t.nodeType || o) && e(t, n, a))return !0
                } else for (; t = t[i];)if (1 === t.nodeType || o) {
                    if (l = t[H] || (t[H] = {}), (s = l[i]) && s[0] === j && s[1] === r)return u[2] = s[2];
                    if (l[i] = u, u[2] = e(t, n, a))return !0
                }
            }
        }

        function h(e) {
            return e.length > 1 ? function (t, n, i) {
                for (var o = e.length; o--;)if (!e[o](t, n, i))return !1;
                return !0
            } : e[0]
        }

        function m(e, n, i) {
            for (var o = 0, r = n.length; r > o; o++)t(e, n[o], i);
            return i
        }

        function g(e, t, n, i, o) {
            for (var r, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(r = e[s]) && (!n || n(r, i, o)) && (a.push(r), u && t.push(s));
            return a
        }

        function v(e, t, n, o, r, a) {
            return o && !o[H] && (o = v(o)), r && !r[H] && (r = v(r, a)), i(function (i, a, s, l) {
                var u, c, d, p = [], f = [], h = a.length, v = i || m(t || "*", s.nodeType ? [s] : s, []), y = !e || !i && t ? v : g(v, p, e, s, l), b = n ? r || (i ? e : h || o) ? [] : a : y;
                if (n && n(y, b, s, l), o)for (u = g(b, f), o(u, [], s, l), c = u.length; c--;)(d = u[c]) && (b[f[c]] = !(y[f[c]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (u = [], c = b.length; c--;)(d = b[c]) && u.push(y[c] = d);
                            r(null, b = [], u, l)
                        }
                        for (c = b.length; c--;)(d = b[c]) && (u = r ? tt.call(i, d) : p[c]) > -1 && (i[u] = !(a[u] = d))
                    }
                } else b = g(b === a ? b.splice(h, b.length) : b), r ? r(null, a, b, l) : Z.apply(a, b)
            })
        }

        function y(e) {
            for (var t, n, i, o = e.length, r = w.relative[e[0].type], a = r || w.relative[" "], s = r ? 1 : 0, l = f(function (e) {
                return e === t
            }, a, !0), u = f(function (e) {
                return tt.call(t, e) > -1
            }, a, !0), c = [function (e, n, i) {
                return !r && (i || n !== k) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i))
            }]; o > s; s++)if (n = w.relative[e[s].type])c = [f(h(c), n)]; else {
                if (n = w.filter[e[s].type].apply(null, e[s].matches), n[H]) {
                    for (i = ++s; o > i && !w.relative[e[i].type]; i++);
                    return v(s > 1 && h(c), s > 1 && p(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(lt, "$1"), n, i > s && y(e.slice(s, i)), o > i && y(e = e.slice(i)), o > i && p(e))
                }
                c.push(n)
            }
            return h(c)
        }

        function b(e, n) {
            var o = n.length > 0, r = e.length > 0, a = function (i, a, s, l, u) {
                var c, d, p, f = 0, h = "0", m = i && [], v = [], y = k, b = i || r && w.find.TAG("*", u), x = j += null == y ? 1 : Math.random() || .1, _ = b.length;
                for (u && (k = a !== D && a); h !== _ && null != (c = b[h]); h++) {
                    if (r && c) {
                        for (d = 0; p = e[d++];)if (p(c, a, s)) {
                            l.push(c);
                            break
                        }
                        u && (j = x)
                    }
                    o && ((c = !p && c) && f--, i && m.push(c))
                }
                if (f += h, o && h !== f) {
                    for (d = 0; p = n[d++];)p(m, v, a, s);
                    if (i) {
                        if (f > 0)for (; h--;)m[h] || v[h] || (v[h] = J.call(l));
                        v = g(v)
                    }
                    Z.apply(l, v), u && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                }
                return u && (j = x, k = y), m
            };
            return o ? i(a) : a
        }

        var x, _, w, S, T, E, C, F, k, U, N, P, D, I, L, A, M, R, W, H = "sizzle" + -new Date, O = e.document, j = 0, q = 0, B = n(), z = n(), $ = n(), Q = function (e, t) {
            return e === t && (N = !0), 0
        }, X = "undefined", V = 1 << 31, Y = {}.hasOwnProperty, G = [], J = G.pop, K = G.push, Z = G.push, et = G.slice, tt = G.indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                return -1
            }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", it = "[\\x20\\t\\r\\n\\f]", ot = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", rt = ot.replace("w", "w#"), at = "\\[" + it + "*(" + ot + ")(?:" + it + "*([*^$|!~]?=)" + it + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + rt + "))|)" + it + "*\\]", st = ":(" + ot + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|.*)\\)|)", lt = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"), ut = new RegExp("^" + it + "*," + it + "*"), ct = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"), dt = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"), pt = new RegExp(st), ft = new RegExp("^" + rt + "$"), ht = {
            ID: new RegExp("^#(" + ot + ")"),
            CLASS: new RegExp("^\\.(" + ot + ")"),
            TAG: new RegExp("^(" + ot.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + at),
            PSEUDO: new RegExp("^" + st),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + nt + ")$", "i"),
            needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
        }, mt = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, bt = /[+~]/, xt = /'|\\/g, _t = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"), wt = function (e, t, n) {
            var i = "0x" + t - 65536;
            return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        };
        try {
            Z.apply(G = et.call(O.childNodes), O.childNodes), G[O.childNodes.length].nodeType
        } catch (St) {
            Z = {
                apply: G.length ? function (e, t) {
                    K.apply(e, et.call(t))
                } : function (e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        _ = t.support = {}, T = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, P = t.setDocument = function (e) {
            var t, n = e ? e.ownerDocument || e : O, i = n.defaultView;
            return n !== D && 9 === n.nodeType && n.documentElement ? (D = n, I = n.documentElement, L = !T(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function () {
                P()
            }, !1) : i.attachEvent && i.attachEvent("onunload", function () {
                P()
            })), _.attributes = o(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), _.getElementsByTagName = o(function (e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), _.getElementsByClassName = vt.test(n.getElementsByClassName) && o(function (e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), _.getById = o(function (e) {
                return I.appendChild(e).id = H, !n.getElementsByName || !n.getElementsByName(H).length
            }), _.getById ? (w.find.ID = function (e, t) {
                if (typeof t.getElementById !== X && L) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, w.filter.ID = function (e) {
                var t = e.replace(_t, wt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete w.find.ID, w.filter.ID = function (e) {
                var t = e.replace(_t, wt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), w.find.TAG = _.getElementsByTagName ? function (e, t) {
                return typeof t.getElementsByTagName !== X ? t.getElementsByTagName(e) : void 0
            } : function (e, t) {
                var n, i = [], o = 0, r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[o++];)1 === n.nodeType && i.push(n);
                    return i
                }
                return r
            }, w.find.CLASS = _.getElementsByClassName && function (e, t) {
                    return typeof t.getElementsByClassName !== X && L ? t.getElementsByClassName(e) : void 0
                }, M = [], A = [], (_.qsa = vt.test(n.querySelectorAll)) && (o(function (e) {
                e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && A.push("[*^$]=" + it + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || A.push("\\[" + it + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || A.push(":checked")
            }), o(function (e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && A.push("name" + it + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || A.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), A.push(",.*:")
            })), (_.matchesSelector = vt.test(R = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && o(function (e) {
                _.disconnectedMatch = R.call(e, "div"), R.call(e, "[s!='']:x"), M.push("!=", st)
            }), A = A.length && new RegExp(A.join("|")), M = M.length && new RegExp(M.join("|")), t = vt.test(I.compareDocumentPosition), W = t || vt.test(I.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !!i && 1 === i.nodeType && !!(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, Q = t ? function (e, t) {
                if (e === t)return N = !0, 0;
                var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !_.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === O && W(O, e) ? -1 : t === n || t.ownerDocument === O && W(O, t) ? 1 : U ? tt.call(U, e) - tt.call(U, t) : 0 : 4 & i ? -1 : 1)
            } : function (e, t) {
                if (e === t)return N = !0, 0;
                var i, o = 0, r = e.parentNode, s = t.parentNode, l = [e], u = [t];
                if (!r || !s)return e === n ? -1 : t === n ? 1 : r ? -1 : s ? 1 : U ? tt.call(U, e) - tt.call(U, t) : 0;
                if (r === s)return a(e, t);
                for (i = e; i = i.parentNode;)l.unshift(i);
                for (i = t; i = i.parentNode;)u.unshift(i);
                for (; l[o] === u[o];)o++;
                return o ? a(l[o], u[o]) : l[o] === O ? -1 : u[o] === O ? 1 : 0
            }, n) : D
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== D && P(e), n = n.replace(dt, "='$1']"), !(!_.matchesSelector || !L || M && M.test(n) || A && A.test(n)))try {
                var i = R.call(e, n);
                if (i || _.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
            } catch (o) {
            }
            return t(n, D, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== D && P(e), W(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== D && P(e);
            var n = w.attrHandle[t.toLowerCase()], i = n && Y.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
            return void 0 !== i ? i : _.attributes || !L ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], i = 0, o = 0;
            if (N = !_.detectDuplicates, U = !_.sortStable && e.slice(0), e.sort(Q), N) {
                for (; t = e[o++];)t === e[o] && (i = n.push(o));
                for (; i--;)e.splice(n[i], 1)
            }
            return U = null, e
        }, S = t.getText = function (e) {
            var t, n = "", i = 0, o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += S(e)
                } else if (3 === o || 4 === o)return e.nodeValue
            } else for (; t = e[i++];)n += S(t);
            return n
        }, w = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: ht,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(_t, wt), e[3] = (e[3] || e[4] || e[5] || "").replace(_t, wt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return ht.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pt.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(_t, wt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + it + ")" + e + "(" + it + "|$)")) && B(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== X && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, n, i) {
                    return function (o) {
                        var r = t.attr(o, e);
                        return null == r ? "!=" === n : n ? (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r + " ").indexOf(i) > -1 : "|=" === n ? r === i || r.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, i, o) {
                    var r = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === i && 0 === o ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var u, c, d, p, f, h, m = r !== a ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s;
                        if (g) {
                            if (r) {
                                for (; m;) {
                                    for (d = t; d = d[m];)if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType)return !1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                for (c = g[H] || (g[H] = {}), u = c[e] || [], f = u[0] === j && u[1], p = u[0] === j && u[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (p = f = 0) || h.pop();)if (1 === d.nodeType && ++p && d === t) {
                                    c[e] = [j, f, p];
                                    break
                                }
                            } else if (y && (u = (t[H] || (t[H] = {}))[e]) && u[0] === j)p = u[1]; else for (; (d = ++f && d && d[m] || (p = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++p || (y && ((d[H] || (d[H] = {}))[e] = [j, p]), d !== t)););
                            return p -= o, p === i || p % i === 0 && p / i >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var o, r = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[H] ? r(n) : r.length > 1 ? (o = [e, e, "", n], w.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                        for (var i, o = r(e, n), a = o.length; a--;)i = tt.call(e, o[a]), e[i] = !(t[i] = o[a])
                    }) : function (e) {
                        return r(e, 0, o)
                    }) : r
                }
            },
            pseudos: {
                not: i(function (e) {
                    var t = [], n = [], o = C(e.replace(lt, "$1"));
                    return o[H] ? i(function (e, t, n, i) {
                        for (var r, a = o(e, null, i, []), s = e.length; s--;)(r = a[s]) && (e[s] = !(t[s] = r))
                    }) : function (e, i, r) {
                        return t[0] = e, o(t, null, r, n), !n.pop()
                    }
                }), has: i(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: i(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                    }
                }), lang: i(function (e) {
                    return ft.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(_t, wt).toLowerCase(), function (t) {
                        var n;
                        do if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === I
                }, focus: function (e) {
                    return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !w.pseudos.empty(e)
                }, header: function (e) {
                    return gt.test(e.nodeName)
                }, input: function (e) {
                    return mt.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: u(function () {
                    return [0]
                }), last: u(function (e, t) {
                    return [t - 1]
                }), eq: u(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: u(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: u(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: u(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0;)e.push(i);
                    return e
                }), gt: u(function (e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;)e.push(i);
                    return e
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (x in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})w.pseudos[x] = s(x);
        for (x in{submit: !0, reset: !0})w.pseudos[x] = l(x);
        return d.prototype = w.filters = w.pseudos, w.setFilters = new d, E = t.tokenize = function (e, n) {
            var i, o, r, a, s, l, u, c = z[e + " "];
            if (c)return n ? 0 : c.slice(0);
            for (s = e, l = [], u = w.preFilter; s;) {
                (!i || (o = ut.exec(s))) && (o && (s = s.slice(o[0].length) || s), l.push(r = [])), i = !1, (o = ct.exec(s)) && (i = o.shift(), r.push({
                    value: i,
                    type: o[0].replace(lt, " ")
                }), s = s.slice(i.length));
                for (a in w.filter)!(o = ht[a].exec(s)) || u[a] && !(o = u[a](o)) || (i = o.shift(), r.push({
                    value: i,
                    type: a,
                    matches: o
                }), s = s.slice(i.length));
                if (!i)break
            }
            return n ? s.length : s ? t.error(e) : z(e, l).slice(0)
        }, C = t.compile = function (e, t) {
            var n, i = [], o = [], r = $[e + " "];
            if (!r) {
                for (t || (t = E(e)), n = t.length; n--;)r = y(t[n]), r[H] ? i.push(r) : o.push(r);
                r = $(e, b(o, i)), r.selector = e
            }
            return r
        }, F = t.select = function (e, t, n, i) {
            var o, r, a, s, l, u = "function" == typeof e && e, d = !i && E(e = u.selector || e);
            if (n = n || [], 1 === d.length) {
                if (r = d[0] = d[0].slice(0), r.length > 2 && "ID" === (a = r[0]).type && _.getById && 9 === t.nodeType && L && w.relative[r[1].type]) {
                    if (t = (w.find.ID(a.matches[0].replace(_t, wt), t) || [])[0], !t)return n;
                    u && (t = t.parentNode), e = e.slice(r.shift().value.length)
                }
                for (o = ht.needsContext.test(e) ? 0 : r.length; o-- && (a = r[o], !w.relative[s = a.type]);)if ((l = w.find[s]) && (i = l(a.matches[0].replace(_t, wt), bt.test(r[0].type) && c(t.parentNode) || t))) {
                    if (r.splice(o, 1), e = i.length && p(r), !e)return Z.apply(n, i), n;
                    break
                }
            }
            return (u || C(e, d))(i, t, !L, n, bt.test(e) && c(t.parentNode) || t), n
        }, _.sortStable = H.split("").sort(Q).join("") === H, _.detectDuplicates = !!N, P(), _.sortDetached = o(function (e) {
            return 1 & e.compareDocumentPosition(D.createElement("div"))
        }), o(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), _.attributes && o(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || r("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), o(function (e) {
            return null == e.getAttribute("disabled")
        }) || r(nt, function (e, t, n) {
            var i;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    ot.find = ut, ot.expr = ut.selectors, ot.expr[":"] = ot.expr.pseudos, ot.unique = ut.uniqueSort, ot.text = ut.getText, ot.isXMLDoc = ut.isXML, ot.contains = ut.contains;
    var ct = ot.expr.match.needsContext, dt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, pt = /^.[^:#\[\.,]*$/;
    ot.filter = function (e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ot.find.matchesSelector(i, e) ? [i] : [] : ot.find.matches(e, ot.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, ot.fn.extend({
        find: function (e) {
            var t, n = [], i = this, o = i.length;
            if ("string" != typeof e)return this.pushStack(ot(e).filter(function () {
                for (t = 0; o > t; t++)if (ot.contains(i[t], this))return !0
            }));
            for (t = 0; o > t; t++)ot.find(e, i[t], n);
            return n = this.pushStack(o > 1 ? ot.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        }, filter: function (e) {
            return this.pushStack(i(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(i(this, e || [], !0))
        }, is: function (e) {
            return !!i(this, "string" == typeof e && ct.test(e) ? ot(e) : e || [], !1).length
        }
    });
    var ft, ht = e.document, mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, gt = ot.fn.init = function (e, t) {
        var n, i;
        if (!e)return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : mt.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ft).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof ot ? t[0] : t, ot.merge(this, ot.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : ht, !0)), dt.test(n[1]) && ot.isPlainObject(t))for (n in t)ot.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (i = ht.getElementById(n[2]), i && i.parentNode) {
                if (i.id !== n[2])return ft.find(e);
                this.length = 1, this[0] = i
            }
            return this.context = ht, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ot.isFunction(e) ? "undefined" != typeof ft.ready ? ft.ready(e) : e(ot) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ot.makeArray(e, this))
    };
    gt.prototype = ot.fn, ft = ot(ht);
    var vt = /^(?:parents|prev(?:Until|All))/, yt = {children: !0, contents: !0, next: !0, prev: !0};
    ot.extend({
        dir: function (e, t, n) {
            for (var i = [], o = e[t]; o && 9 !== o.nodeType && (void 0 === n || 1 !== o.nodeType || !ot(o).is(n));)1 === o.nodeType && i.push(o), o = o[t];
            return i
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), ot.fn.extend({
        has: function (e) {
            var t, n = ot(e, this), i = n.length;
            return this.filter(function () {
                for (t = 0; i > t; t++)if (ot.contains(this, n[t]))return !0
            })
        }, closest: function (e, t) {
            for (var n, i = 0, o = this.length, r = [], a = ct.test(e) || "string" != typeof e ? ot(e, t || this.context) : 0; o > i; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ot.find.matchesSelector(n, e))) {
                r.push(n);
                break
            }
            return this.pushStack(r.length > 1 ? ot.unique(r) : r)
        }, index: function (e) {
            return e ? "string" == typeof e ? ot.inArray(this[0], ot(e)) : ot.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(ot.unique(ot.merge(this.get(), ot(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ot.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return ot.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return ot.dir(e, "parentNode", n)
        }, next: function (e) {
            return o(e, "nextSibling")
        }, prev: function (e) {
            return o(e, "previousSibling")
        }, nextAll: function (e) {
            return ot.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return ot.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return ot.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return ot.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return ot.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return ot.sibling(e.firstChild)
        }, contents: function (e) {
            return ot.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ot.merge([], e.childNodes)
        }
    }, function (e, t) {
        ot.fn[e] = function (n, i) {
            var o = ot.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = ot.filter(i, o)), this.length > 1 && (yt[e] || (o = ot.unique(o)), vt.test(e) && (o = o.reverse())), this.pushStack(o)
        }
    });
    var bt = /\S+/g, xt = {};
    ot.Callbacks = function (e) {
        e = "string" == typeof e ? xt[e] || r(e) : ot.extend({}, e);
        var t, n, i, o, a, s, l = [], u = !e.once && [], c = function (r) {
            for (n = e.memory && r, i = !0, a = s || 0, s = 0, o = l.length, t = !0; l && o > a; a++)if (l[a].apply(r[0], r[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1, l && (u ? u.length && c(u.shift()) : n ? l = [] : d.disable())
        }, d = {
            add: function () {
                if (l) {
                    var i = l.length;
                    !function r(t) {
                        ot.each(t, function (t, n) {
                            var i = ot.type(n);
                            "function" === i ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
                        })
                    }(arguments), t ? o = l.length : n && (s = i, c(n))
                }
                return this
            }, remove: function () {
                return l && ot.each(arguments, function (e, n) {
                    for (var i; (i = ot.inArray(n, l, i)) > -1;)l.splice(i, 1), t && (o >= i && o--, a >= i && a--)
                }), this
            }, has: function (e) {
                return e ? ot.inArray(e, l) > -1 : !!l && !!l.length
            }, empty: function () {
                return l = [], o = 0, this
            }, disable: function () {
                return l = u = n = void 0, this
            }, disabled: function () {
                return !l
            }, lock: function () {
                return u = void 0, n || d.disable(), this
            }, locked: function () {
                return !u
            }, fireWith: function (e, n) {
                return !l || i && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : c(n)), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!i
            }
        };
        return d
    }, ot.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", ot.Callbacks("once memory"), "resolved"], ["reject", "fail", ot.Callbacks("once memory"), "rejected"], ["notify", "progress", ot.Callbacks("memory")]], n = "pending", i = {
                state: function () {
                    return n
                }, always: function () {
                    return o.done(arguments).fail(arguments), this
                }, then: function () {
                    var e = arguments;
                    return ot.Deferred(function (n) {
                        ot.each(t, function (t, r) {
                            var a = ot.isFunction(e[t]) && e[t];
                            o[r[1]](function () {
                                var e = a && a.apply(this, arguments);
                                e && ot.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                            })
                        }), e = null
                    }).promise()
                }, promise: function (e) {
                    return null != e ? ot.extend(e, i) : i
                }
            }, o = {};
            return i.pipe = i.then, ot.each(t, function (e, r) {
                var a = r[2], s = r[3];
                i[r[1]] = a.add, s && a.add(function () {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function () {
                    return o[r[0] + "With"](this === o ? i : this, arguments), this
                }, o[r[0] + "With"] = a.fireWith
            }), i.promise(o), e && e.call(o, o), o
        }, when: function (e) {
            var t, n, i, o = 0, r = Y.call(arguments), a = r.length, s = 1 !== a || e && ot.isFunction(e.promise) ? a : 0, l = 1 === s ? e : ot.Deferred(), u = function (e, n, i) {
                return function (o) {
                    n[e] = this, i[e] = arguments.length > 1 ? Y.call(arguments) : o, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                }
            };
            if (a > 1)for (t = new Array(a), n = new Array(a), i = new Array(a); a > o; o++)r[o] && ot.isFunction(r[o].promise) ? r[o].promise().done(u(o, i, r)).fail(l.reject).progress(u(o, n, t)) : --s;
            return s || l.resolveWith(i, r), l.promise()
        }
    });
    var _t;
    ot.fn.ready = function (e) {
        return ot.ready.promise().done(e), this
    }, ot.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? ot.readyWait++ : ot.ready(!0)
        }, ready: function (e) {
            if (e === !0 ? !--ot.readyWait : !ot.isReady) {
                if (!ht.body)return setTimeout(ot.ready);
                ot.isReady = !0, e !== !0 && --ot.readyWait > 0 || (_t.resolveWith(ht, [ot]), ot.fn.triggerHandler && (ot(ht).triggerHandler("ready"), ot(ht).off("ready")))
            }
        }
    }), ot.ready.promise = function (t) {
        if (!_t)if (_t = ot.Deferred(), "complete" === ht.readyState)setTimeout(ot.ready); else if (ht.addEventListener)ht.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1); else {
            ht.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && ht.documentElement
            } catch (i) {
            }
            n && n.doScroll && !function o() {
                if (!ot.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(o, 50)
                    }
                    a(), ot.ready()
                }
            }()
        }
        return _t.promise(t)
    };
    var wt, St = "undefined";
    for (wt in ot(nt))break;
    nt.ownLast = "0" !== wt, nt.inlineBlockNeedsLayout = !1, ot(function () {
        var e, t, n, i;
        n = ht.getElementsByTagName("body")[0], n && n.style && (t = ht.createElement("div"), i = ht.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== St && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", nt.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
    }), function () {
        var e = ht.createElement("div");
        if (null == nt.deleteExpando) {
            nt.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                nt.deleteExpando = !1
            }
        }
        e = null
    }(), ot.acceptData = function (e) {
        var t = ot.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
    var Tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Et = /([A-Z])/g;
    ot.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (e) {
            return e = e.nodeType ? ot.cache[e[ot.expando]] : e[ot.expando], !!e && !u(e)
        },
        data: function (e, t, n) {
            return c(e, t, n)
        },
        removeData: function (e, t) {
            return d(e, t)
        },
        _data: function (e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return d(e, t, !0)
        }
    }), ot.fn.extend({
        data: function (e, t) {
            var n, i, o, r = this[0], a = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (o = ot.data(r), 1 === r.nodeType && !ot._data(r, "parsedAttrs"))) {
                    for (n = a.length; n--;)a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = ot.camelCase(i.slice(5)), l(r, i, o[i])));
                    ot._data(r, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function () {
                ot.data(this, e)
            }) : arguments.length > 1 ? this.each(function () {
                ot.data(this, e, t)
            }) : r ? l(r, e, ot.data(r, e)) : void 0
        }, removeData: function (e) {
            return this.each(function () {
                ot.removeData(this, e)
            })
        }
    }), ot.extend({
        queue: function (e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue", i = ot._data(e, t), n && (!i || ot.isArray(n) ? i = ot._data(e, t, ot.makeArray(n)) : i.push(n)), i || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = ot.queue(e, t), i = n.length, o = n.shift(), r = ot._queueHooks(e, t), a = function () {
                ot.dequeue(e, t)
            };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, a, r)), !i && r && r.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return ot._data(e, n) || ot._data(e, n, {
                    empty: ot.Callbacks("once memory").add(function () {
                        ot._removeData(e, t + "queue"), ot._removeData(e, n)
                    })
                })
        }
    }), ot.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ot.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = ot.queue(this, e, t);
                ot._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ot.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                ot.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, i = 1, o = ot.Deferred(), r = this, a = this.length, s = function () {
                --i || o.resolveWith(r, [r])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)n = ot._data(r[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
            return s(), o.promise(t)
        }
    });
    var Ct = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Ft = ["Top", "Right", "Bottom", "Left"], kt = function (e, t) {
        return e = t || e, "none" === ot.css(e, "display") || !ot.contains(e.ownerDocument, e)
    }, Ut = ot.access = function (e, t, n, i, o, r, a) {
        var s = 0, l = e.length, u = null == n;
        if ("object" === ot.type(n)) {
            o = !0;
            for (s in n)ot.access(e, t, s, n[s], !0, r, a)
        } else if (void 0 !== i && (o = !0, ot.isFunction(i) || (a = !0), u && (a ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                return u.call(ot(e), n)
            })), t))for (; l > s; s++)t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
        return o ? e : u ? t.call(e) : l ? t(e[0], n) : r
    }, Nt = /^(?:checkbox|radio)$/i;
    !function () {
        var e = ht.createElement("input"), t = ht.createElement("div"), n = ht.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", nt.leadingWhitespace = 3 === t.firstChild.nodeType, nt.tbody = !t.getElementsByTagName("tbody").length, nt.htmlSerialize = !!t.getElementsByTagName("link").length, nt.html5Clone = "<:nav></:nav>" !== ht.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), nt.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", nt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", nt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, nt.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                nt.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == nt.deleteExpando) {
            nt.deleteExpando = !0;
            try {
                delete t.test
            } catch (i) {
                nt.deleteExpando = !1
            }
        }
    }(), function () {
        var t, n, i = ht.createElement("div");
        for (t in{
            submit: !0,
            change: !0,
            focusin: !0
        })n = "on" + t, (nt[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), nt[t + "Bubbles"] = i.attributes[n].expando === !1);
        i = null
    }();
    var Pt = /^(?:input|select|textarea)$/i, Dt = /^key/, It = /^(?:mouse|pointer|contextmenu)|click/, Lt = /^(?:focusinfocus|focusoutblur)$/, At = /^([^.]*)(?:\.(.+)|)$/;
    ot.event = {
        global: {},
        add: function (e, t, n, i, o) {
            var r, a, s, l, u, c, d, p, f, h, m, g = ot._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, o = l.selector), n.guid || (n.guid = ot.guid++), (a = g.events) || (a = g.events = {}), (c = g.handle) || (c = g.handle = function (e) {
                    return typeof ot === St || e && ot.event.triggered === e.type ? void 0 : ot.event.dispatch.apply(c.elem, arguments)
                }, c.elem = e), t = (t || "").match(bt) || [""], s = t.length; s--;)r = At.exec(t[s]) || [], f = m = r[1], h = (r[2] || "").split(".").sort(), f && (u = ot.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, u = ot.event.special[f] || {}, d = ot.extend({
                    type: f,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && ot.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, l), (p = a[f]) || (p = a[f] = [], p.delegateCount = 0, u.setup && u.setup.call(e, i, h, c) !== !1 || (e.addEventListener ? e.addEventListener(f, c, !1) : e.attachEvent && e.attachEvent("on" + f, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), ot.event.global[f] = !0);
                e = null
            }
        },
        remove: function (e, t, n, i, o) {
            var r, a, s, l, u, c, d, p, f, h, m, g = ot.hasData(e) && ot._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(bt) || [""], u = t.length; u--;)if (s = At.exec(t[u]) || [], f = m = s[1], h = (s[2] || "").split(".").sort(), f) {
                    for (d = ot.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, p = c[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;)a = p[r], !o && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (p.splice(r, 1), a.selector && p.delegateCount--, d.remove && d.remove.call(e, a));
                    l && !p.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || ot.removeEvent(e, f, g.handle), delete c[f])
                } else for (f in c)ot.event.remove(e, f + t[u], n, i, !0);
                ot.isEmptyObject(c) && (delete g.handle, ot._removeData(e, "events"))
            }
        },
        trigger: function (t, n, i, o) {
            var r, a, s, l, u, c, d, p = [i || ht], f = tt.call(t, "type") ? t.type : t, h = tt.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = i = i || ht, 3 !== i.nodeType && 8 !== i.nodeType && !Lt.test(f + ot.event.triggered) && (f.indexOf(".") >= 0 && (h = f.split("."), f = h.shift(), h.sort()), a = f.indexOf(":") < 0 && "on" + f, t = t[ot.expando] ? t : new ot.Event(f, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : ot.makeArray(n, [t]), u = ot.event.special[f] || {}, o || !u.trigger || u.trigger.apply(i, n) !== !1)) {
                if (!o && !u.noBubble && !ot.isWindow(i)) {
                    for (l = u.delegateType || f, Lt.test(l + f) || (s = s.parentNode); s; s = s.parentNode)p.push(s), c = s;
                    c === (i.ownerDocument || ht) && p.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = p[d++]) && !t.isPropagationStopped();)t.type = d > 1 ? l : u.bindType || f, r = (ot._data(s, "events") || {})[t.type] && ot._data(s, "handle"), r && r.apply(s, n), r = a && s[a], r && r.apply && ot.acceptData(s) && (t.result = r.apply(s, n), t.result === !1 && t.preventDefault());
                if (t.type = f, !o && !t.isDefaultPrevented() && (!u._default || u._default.apply(p.pop(), n) === !1) && ot.acceptData(i) && a && i[f] && !ot.isWindow(i)) {
                    c = i[a], c && (i[a] = null), ot.event.triggered = f;
                    try {
                        i[f]()
                    } catch (m) {
                    }
                    ot.event.triggered = void 0, c && (i[a] = c)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = ot.event.fix(e);
            var t, n, i, o, r, a = [], s = Y.call(arguments), l = (ot._data(this, "events") || {})[e.type] || [], u = ot.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (a = ot.event.handlers.call(this, e, l), t = 0; (o = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = o.elem, r = 0; (i = o.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((ot.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, i, o, r, a = [], s = t.delegateCount, l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (o = [], r = 0; s > r; r++)i = t[r], n = i.selector + " ", void 0 === o[n] && (o[n] = i.needsContext ? ot(n, this).index(l) >= 0 : ot.find(n, this, null, [l]).length), o[n] && o.push(i);
                o.length && a.push({elem: l, handlers: o})
            }
            return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
        },
        fix: function (e) {
            if (e[ot.expando])return e;
            var t, n, i, o = e.type, r = e, a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = It.test(o) ? this.mouseHooks : Dt.test(o) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new ot.Event(r), t = i.length; t--;)n = i[t], e[n] = r[n];
            return e.target || (e.target = r.srcElement || ht), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, r) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, i, o, r = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || ht, o = i.documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== h() && this.focus)try {
                        return this.focus(), !1
                    } catch (e) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === h() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return ot.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return ot.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, i) {
            var o = ot.extend(new ot.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            i ? ot.event.trigger(o, null, t) : ot.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault()
        }
    }, ot.removeEvent = ht.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var i = "on" + t;
        e.detachEvent && (typeof e[i] === St && (e[i] = null), e.detachEvent(i, n))
    }, ot.Event = function (e, t) {
        return this instanceof ot.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p : f) : this.type = e, t && ot.extend(this, t), this.timeStamp = e && e.timeStamp || ot.now(), void(this[ot.expando] = !0)) : new ot.Event(e, t)
    }, ot.Event.prototype = {
        isDefaultPrevented: f,
        isPropagationStopped: f,
        isImmediatePropagationStopped: f,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = p, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = p, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ot.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        ot.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, i = this, o = e.relatedTarget, r = e.handleObj;
                return (!o || o !== i && !ot.contains(i, o)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), nt.submitBubbles || (ot.event.special.submit = {
        setup: function () {
            return ot.nodeName(this, "form") ? !1 : void ot.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target, n = ot.nodeName(t, "input") || ot.nodeName(t, "button") ? t.form : void 0;
                n && !ot._data(n, "submitBubbles") && (ot.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), ot._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ot.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            return ot.nodeName(this, "form") ? !1 : void ot.event.remove(this, "._submit")
        }
    }), nt.changeBubbles || (ot.event.special.change = {
        setup: function () {
            return Pt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ot.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), ot.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), ot.event.simulate("change", this, e, !0)
            })), !1) : void ot.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Pt.test(t.nodeName) && !ot._data(t, "changeBubbles") && (ot.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ot.event.simulate("change", this.parentNode, e, !0)
                }), ot._data(t, "changeBubbles", !0))
            })
        }, handle: function (e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return ot.event.remove(this, "._change"), !Pt.test(this.nodeName)
        }
    }), nt.focusinBubbles || ot.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            ot.event.simulate(t, e.target, ot.event.fix(e), !0)
        };
        ot.event.special[t] = {
            setup: function () {
                var i = this.ownerDocument || this, o = ot._data(i, t);
                o || i.addEventListener(e, n, !0), ot._data(i, t, (o || 0) + 1)
            }, teardown: function () {
                var i = this.ownerDocument || this, o = ot._data(i, t) - 1;
                o ? ot._data(i, t, o) : (i.removeEventListener(e, n, !0), ot._removeData(i, t))
            }
        }
    }), ot.fn.extend({
        on: function (e, t, n, i, o) {
            var r, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (r in e)this.on(r, t, n, e[r], o);
                return this
            }
            if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1)i = f; else if (!i)return this;
            return 1 === o && (a = i, i = function (e) {
                return ot().off(e), a.apply(this, arguments)
            }, i.guid = a.guid || (a.guid = ot.guid++)), this.each(function () {
                ot.event.add(this, e, i, n, t)
            })
        }, one: function (e, t, n, i) {
            return this.on(e, t, n, i, 1)
        }, off: function (e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj)return i = e.handleObj, ot(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (o in e)this.off(o, t, e[o]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = f), this.each(function () {
                ot.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                ot.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? ot.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Mt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Rt = / jQuery\d+="(?:null|\d+)"/g, Wt = new RegExp("<(?:" + Mt + ")[\\s/>]", "i"), Ht = /^\s+/, Ot = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, jt = /<([\w:]+)/, qt = /<tbody/i, Bt = /<|&#?\w+;/, zt = /<(?:script|style|link)/i, $t = /checked\s*(?:[^=]|=\s*.checked.)/i, Qt = /^$|\/(?:java|ecma)script/i, Xt = /^true\/(.*)/, Vt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Yt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: nt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, Gt = m(ht), Jt = Gt.appendChild(ht.createElement("div"));
    Yt.optgroup = Yt.option, Yt.tbody = Yt.tfoot = Yt.colgroup = Yt.caption = Yt.thead, Yt.th = Yt.td, ot.extend({
        clone: function (e, t, n) {
            var i, o, r, a, s, l = ot.contains(e.ownerDocument, e);
            if (nt.html5Clone || ot.isXMLDoc(e) || !Wt.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Jt.innerHTML = e.outerHTML, Jt.removeChild(r = Jt.firstChild)), !(nt.noCloneEvent && nt.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ot.isXMLDoc(e)))for (i = g(r), s = g(e), a = 0; null != (o = s[a]); ++a)i[a] && S(o, i[a]);
            if (t)if (n)for (s = s || g(e), i = i || g(r), a = 0; null != (o = s[a]); a++)w(o, i[a]); else w(e, r);
            return i = g(r, "script"), i.length > 0 && _(i, !l && g(e, "script")), i = s = o = null, r
        }, buildFragment: function (e, t, n, i) {
            for (var o, r, a, s, l, u, c, d = e.length, p = m(t), f = [], h = 0; d > h; h++)if (r = e[h], r || 0 === r)if ("object" === ot.type(r))ot.merge(f, r.nodeType ? [r] : r); else if (Bt.test(r)) {
                for (s = s || p.appendChild(t.createElement("div")), l = (jt.exec(r) || ["", ""])[1].toLowerCase(), c = Yt[l] || Yt._default, s.innerHTML = c[1] + r.replace(Ot, "<$1></$2>") + c[2], o = c[0]; o--;)s = s.lastChild;
                if (!nt.leadingWhitespace && Ht.test(r) && f.push(t.createTextNode(Ht.exec(r)[0])), !nt.tbody)for (r = "table" !== l || qt.test(r) ? "<table>" !== c[1] || qt.test(r) ? 0 : s : s.firstChild, o = r && r.childNodes.length; o--;)ot.nodeName(u = r.childNodes[o], "tbody") && !u.childNodes.length && r.removeChild(u);
                for (ot.merge(f, s.childNodes), s.textContent = ""; s.firstChild;)s.removeChild(s.firstChild);
                s = p.lastChild
            } else f.push(t.createTextNode(r));
            for (s && p.removeChild(s), nt.appendChecked || ot.grep(g(f, "input"), v), h = 0; r = f[h++];)if ((!i || -1 === ot.inArray(r, i)) && (a = ot.contains(r.ownerDocument, r), s = g(p.appendChild(r), "script"), a && _(s), n))for (o = 0; r = s[o++];)Qt.test(r.type || "") && n.push(r);
            return s = null, p
        }, cleanData: function (e, t) {
            for (var n, i, o, r, a = 0, s = ot.expando, l = ot.cache, u = nt.deleteExpando, c = ot.event.special; null != (n = e[a]); a++)if ((t || ot.acceptData(n)) && (o = n[s], r = o && l[o])) {
                if (r.events)for (i in r.events)c[i] ? ot.event.remove(n, i) : ot.removeEvent(n, i, r.handle);
                l[o] && (delete l[o], u ? delete n[s] : typeof n.removeAttribute !== St ? n.removeAttribute(s) : n[s] = null, V.push(o))
            }
        }
    }), ot.fn.extend({
        text: function (e) {
            return Ut(this, function (e) {
                return void 0 === e ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ht).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, i = e ? ot.filter(e, this) : this, o = 0; null != (n = i[o]); o++)t || 1 !== n.nodeType || ot.cleanData(g(n)), n.parentNode && (t && ot.contains(n.ownerDocument, n) && _(g(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ot.cleanData(g(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
                e.options && ot.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return ot.clone(this, e, t)
            })
        }, html: function (e) {
            return Ut(this, function (e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(Rt, "") : void 0;
                if (!("string" != typeof e || zt.test(e) || !nt.htmlSerialize && Wt.test(e) || !nt.leadingWhitespace && Ht.test(e) || Yt[(jt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Ot, "<$1></$2>");
                    try {
                        for (; i > n; n++)t = this[n] || {}, 1 === t.nodeType && (ot.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (o) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, ot.cleanData(g(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = G.apply([], e);
            var n, i, o, r, a, s, l = 0, u = this.length, c = this, d = u - 1, p = e[0], f = ot.isFunction(p);
            if (f || u > 1 && "string" == typeof p && !nt.checkClone && $t.test(p))return this.each(function (n) {
                var i = c.eq(n);
                f && (e[0] = p.call(this, n, i.html())), i.domManip(e, t)
            });
            if (u && (s = ot.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (r = ot.map(g(s, "script"), b), o = r.length; u > l; l++)i = s, l !== d && (i = ot.clone(i, !0, !0), o && ot.merge(r, g(i, "script"))), t.call(this[l], i, l);
                if (o)for (a = r[r.length - 1].ownerDocument, ot.map(r, x), l = 0; o > l; l++)i = r[l], Qt.test(i.type || "") && !ot._data(i, "globalEval") && ot.contains(a, i) && (i.src ? ot._evalUrl && ot._evalUrl(i.src) : ot.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Vt, "")));
                s = n = null
            }
            return this
        }
    }), ot.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        ot.fn[e] = function (e) {
            for (var n, i = 0, o = [], r = ot(e), a = r.length - 1; a >= i; i++)n = i === a ? this : this.clone(!0), ot(r[i])[t](n), J.apply(o, n.get());
            return this.pushStack(o)
        }
    });
    var Kt, Zt = {};
    !function () {
        var e;
        nt.shrinkWrapBlocks = function () {
            if (null != e)return e;
            e = !1;
            var t, n, i;
            return n = ht.getElementsByTagName("body")[0], n && n.style ? (t = ht.createElement("div"), i = ht.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== St && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(ht.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
        }
    }();
    var en, tn, nn = /^margin/, on = new RegExp("^(" + Ct + ")(?!px)[a-z%]+$", "i"), rn = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (en = function (e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    }, tn = function (e, t, n) {
        var i, o, r, a, s = e.style;
        return n = n || en(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || ot.contains(e.ownerDocument, e) || (a = ot.style(e, t)), on.test(a) && nn.test(t) && (i = s.width, o = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = o, s.maxWidth = r)), void 0 === a ? a : a + ""
    }) : ht.documentElement.currentStyle && (en = function (e) {
        return e.currentStyle
    }, tn = function (e, t, n) {
        var i, o, r, a, s = e.style;
        return n = n || en(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), on.test(a) && !rn.test(t) && (i = s.left, o = e.runtimeStyle, r = o && o.left, r && (o.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = i, r && (o.left = r)), void 0 === a ? a : a + "" || "auto"
    }), !function () {
        function t() {
            var t, n, i, o;
            n = ht.getElementsByTagName("body")[0], n && n.style && (t = ht.createElement("div"), i = ht.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", r = a = !1, l = !0, e.getComputedStyle && (r = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {width: "4px"}).width, o = t.appendChild(ht.createElement("div")), o.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", o.style.marginRight = o.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = t.getElementsByTagName("td"), o[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === o[0].offsetHeight, s && (o[0].style.display = "", o[1].style.display = "none", s = 0 === o[0].offsetHeight), n.removeChild(i))
        }

        var n, i, o, r, a, s, l;
        n = ht.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", o = n.getElementsByTagName("a")[0], (i = o && o.style) && (i.cssText = "float:left;opacity:.5", nt.opacity = "0.5" === i.opacity, nt.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", nt.clearCloneStyle = "content-box" === n.style.backgroundClip, nt.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, ot.extend(nt, {
            reliableHiddenOffsets: function () {
                return null == s && t(), s
            }, boxSizingReliable: function () {
                return null == a && t(), a
            }, pixelPosition: function () {
                return null == r && t(), r
            }, reliableMarginRight: function () {
                return null == l && t(), l
            }
        }))
    }(), ot.swap = function (e, t, n, i) {
        var o, r, a = {};
        for (r in t)a[r] = e.style[r], e.style[r] = t[r];
        o = n.apply(e, i || []);
        for (r in t)e.style[r] = a[r];
        return o
    };
    var an = /alpha\([^)]*\)/i, sn = /opacity\s*=\s*([^)]*)/, ln = /^(none|table(?!-c[ea]).+)/, un = new RegExp("^(" + Ct + ")(.*)$", "i"), cn = new RegExp("^([+-])=(" + Ct + ")", "i"), dn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, pn = {letterSpacing: "0", fontWeight: "400"}, fn = ["Webkit", "O", "Moz", "ms"];
    ot.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = tn(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": nt.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, a, s = ot.camelCase(t), l = e.style;
                if (t = ot.cssProps[s] || (ot.cssProps[s] = F(l, s)), a = ot.cssHooks[t] || ot.cssHooks[s], void 0 === n)return a && "get" in a && void 0 !== (o = a.get(e, !1, i)) ? o : l[t];
                if (r = typeof n, "string" === r && (o = cn.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(ot.css(e, t)), r = "number"), null != n && n === n && ("number" !== r || ot.cssNumber[s] || (n += "px"), nt.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, i)))))try {
                    l[t] = n
                } catch (u) {
                }
            }
        },
        css: function (e, t, n, i) {
            var o, r, a, s = ot.camelCase(t);
            return t = ot.cssProps[s] || (ot.cssProps[s] = F(e.style, s)), a = ot.cssHooks[t] || ot.cssHooks[s], a && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = tn(e, t, i)), "normal" === r && t in pn && (r = pn[t]), "" === n || n ? (o = parseFloat(r), n === !0 || ot.isNumeric(o) ? o || 0 : r) : r
        }
    }), ot.each(["height", "width"], function (e, t) {
        ot.cssHooks[t] = {
            get: function (e, n, i) {
                return n ? ln.test(ot.css(e, "display")) && 0 === e.offsetWidth ? ot.swap(e, dn, function () {
                    return P(e, t, i)
                }) : P(e, t, i) : void 0
            }, set: function (e, n, i) {
                var o = i && en(e);
                return U(e, n, i ? N(e, t, i, nt.boxSizing && "border-box" === ot.css(e, "boxSizing", !1, o), o) : 0)
            }
        }
    }), nt.opacity || (ot.cssHooks.opacity = {
        get: function (e, t) {
            return sn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, i = e.currentStyle, o = ot.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", r = i && i.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === ot.trim(r.replace(an, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = an.test(r) ? r.replace(an, o) : r + " " + o)
        }
    }), ot.cssHooks.marginRight = C(nt.reliableMarginRight, function (e, t) {
        return t ? ot.swap(e, {display: "inline-block"}, tn, [e, "marginRight"]) : void 0
    }), ot.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        ot.cssHooks[e + t] = {
            expand: function (n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++)o[e + Ft[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        }, nn.test(e) || (ot.cssHooks[e + t].set = U)
    }), ot.fn.extend({
        css: function (e, t) {
            return Ut(this, function (e, t, n) {
                var i, o, r = {}, a = 0;
                if (ot.isArray(t)) {
                    for (i = en(e), o = t.length; o > a; a++)r[t[a]] = ot.css(e, t[a], !1, i);
                    return r
                }
                return void 0 !== n ? ot.style(e, t, n) : ot.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return k(this, !0)
        }, hide: function () {
            return k(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                kt(this) ? ot(this).show() : ot(this).hide()
            })
        }
    }), ot.Tween = D, D.prototype = {
        constructor: D, init: function (e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (ot.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = D.propHooks[this.prop];
            return e && e.get ? e.get(this) : D.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = D.propHooks[this.prop];
            return this.pos = t = this.options.duration ? ot.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
        }
    }, D.prototype.init.prototype = D.prototype, D.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ot.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                ot.fx.step[e.prop] ? ot.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ot.cssProps[e.prop]] || ot.cssHooks[e.prop]) ? ot.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ot.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, ot.fx = D.prototype.init, ot.fx.step = {};
    var hn, mn, gn = /^(?:toggle|show|hide)$/, vn = new RegExp("^(?:([+-])=|)(" + Ct + ")([a-z%]*)$", "i"), yn = /queueHooks$/, bn = [M], xn = {
        "*": [function (e, t) {
            var n = this.createTween(e, t), i = n.cur(), o = vn.exec(t), r = o && o[3] || (ot.cssNumber[e] ? "" : "px"), a = (ot.cssNumber[e] || "px" !== r && +i) && vn.exec(ot.css(n.elem, e)), s = 1, l = 20;
            if (a && a[3] !== r) {
                r = r || a[3], o = o || [], a = +i || 1;
                do s = s || ".5", a /= s, ot.style(n.elem, e, a + r); while (s !== (s = n.cur() / i) && 1 !== s && --l)
            }
            return o && (a = n.start = +a || +i || 0, n.unit = r, n.end = o[1] ? a + (o[1] + 1) * o[2] : +o[2]), n
        }]
    };
    ot.Animation = ot.extend(W, {
        tweener: function (e, t) {
            ot.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, i = 0, o = e.length; o > i; i++)n = e[i], xn[n] = xn[n] || [], xn[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? bn.unshift(e) : bn.push(e)
        }
    }), ot.speed = function (e, t, n) {
        var i = e && "object" == typeof e ? ot.extend({}, e) : {
            complete: n || !n && t || ot.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !ot.isFunction(t) && t
        };
        return i.duration = ot.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ot.fx.speeds ? ot.fx.speeds[i.duration] : ot.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            ot.isFunction(i.old) && i.old.call(this), i.queue && ot.dequeue(this, i.queue)
        }, i
    }, ot.fn.extend({
        fadeTo: function (e, t, n, i) {
            return this.filter(kt).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
        }, animate: function (e, t, n, i) {
            var o = ot.isEmptyObject(e), r = ot.speed(t, n, i), a = function () {
                var t = W(this, ot.extend({}, e), r);
                (o || ot._data(this, "finish")) && t.stop(!0)
            };
            return a.finish = a, o || r.queue === !1 ? this.each(a) : this.queue(r.queue, a)
        }, stop: function (e, t, n) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, o = null != e && e + "queueHooks", r = ot.timers, a = ot._data(this);
                if (o)a[o] && a[o].stop && i(a[o]); else for (o in a)a[o] && a[o].stop && yn.test(o) && i(a[o]);
                for (o = r.length; o--;)r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                (t || !n) && ot.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = ot._data(this), i = n[e + "queue"], o = n[e + "queueHooks"], r = ot.timers, a = i ? i.length : 0;
                for (n.finish = !0, ot.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;)r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                for (t = 0; a > t; t++)i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }), ot.each(["toggle", "show", "hide"], function (e, t) {
        var n = ot.fn[t];
        ot.fn[t] = function (e, i, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(L(t, !0), e, i, o)
        }
    }), ot.each({
        slideDown: L("show"),
        slideUp: L("hide"),
        slideToggle: L("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        ot.fn[e] = function (e, n, i) {
            return this.animate(t, e, n, i)
        }
    }), ot.timers = [], ot.fx.tick = function () {
        var e, t = ot.timers, n = 0;
        for (hn = ot.now(); n < t.length; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || ot.fx.stop(), hn = void 0
    }, ot.fx.timer = function (e) {
        ot.timers.push(e), e() ? ot.fx.start() : ot.timers.pop()
    }, ot.fx.interval = 13, ot.fx.start = function () {
        mn || (mn = setInterval(ot.fx.tick, ot.fx.interval))
    }, ot.fx.stop = function () {
        clearInterval(mn), mn = null
    }, ot.fx.speeds = {slow: 600, fast: 200, _default: 400}, ot.fn.delay = function (e, t) {
        return e = ot.fx ? ot.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var i = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(i)
            }
        })
    }, function () {
        var e, t, n, i, o;
        t = ht.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = t.getElementsByTagName("a")[0], n = ht.createElement("select"), o = n.appendChild(ht.createElement("option")), e = t.getElementsByTagName("input")[0], i.style.cssText = "top:1px", nt.getSetAttribute = "t" !== t.className, nt.style = /top/.test(i.getAttribute("style")), nt.hrefNormalized = "/a" === i.getAttribute("href"), nt.checkOn = !!e.value, nt.optSelected = o.selected, nt.enctype = !!ht.createElement("form").enctype, n.disabled = !0, nt.optDisabled = !o.disabled, e = ht.createElement("input"), e.setAttribute("value", ""), nt.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), nt.radioValue = "t" === e.value
    }();
    var _n = /\r/g;
    ot.fn.extend({
        val: function (e) {
            var t, n, i, o = this[0];
            return arguments.length ? (i = ot.isFunction(e), this.each(function (n) {
                var o;
                1 === this.nodeType && (o = i ? e.call(this, n, ot(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ot.isArray(o) && (o = ot.map(o, function (e) {
                    return null == e ? "" : e + ""
                })), t = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
            })) : o ? (t = ot.valHooks[o.type] || ot.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(_n, "") : null == n ? "" : n)) : void 0
        }
    }), ot.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = ot.find.attr(e, "value");
                    return null != t ? t : ot.trim(ot.text(e))
                }
            }, select: {
                get: function (e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, a = r ? null : [], s = r ? o + 1 : i.length, l = 0 > o ? s : r ? o : 0; s > l; l++)if (n = i[l], !(!n.selected && l !== o || (nt.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ot.nodeName(n.parentNode, "optgroup"))) {
                        if (t = ot(n).val(), r)return t;
                        a.push(t)
                    }
                    return a
                }, set: function (e, t) {
                    for (var n, i, o = e.options, r = ot.makeArray(t), a = o.length; a--;)if (i = o[a], ot.inArray(ot.valHooks.option.get(i), r) >= 0)try {
                        i.selected = n = !0
                    } catch (s) {
                        i.scrollHeight
                    } else i.selected = !1;
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), ot.each(["radio", "checkbox"], function () {
        ot.valHooks[this] = {
            set: function (e, t) {
                return ot.isArray(t) ? e.checked = ot.inArray(ot(e).val(), t) >= 0 : void 0
            }
        }, nt.checkOn || (ot.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var wn, Sn, Tn = ot.expr.attrHandle, En = /^(?:checked|selected)$/i, Cn = nt.getSetAttribute, Fn = nt.input;
    ot.fn.extend({
        attr: function (e, t) {
            return Ut(this, ot.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                ot.removeAttr(this, e)
            })
        }
    }), ot.extend({
        attr: function (e, t, n) {
            var i, o, r = e.nodeType;
            return e && 3 !== r && 8 !== r && 2 !== r ? typeof e.getAttribute === St ? ot.prop(e, t, n) : (1 === r && ot.isXMLDoc(e) || (t = t.toLowerCase(), i = ot.attrHooks[t] || (ot.expr.match.bool.test(t) ? Sn : wn)), void 0 === n ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = ot.find.attr(e, t), null == o ? void 0 : o) : null !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : void ot.removeAttr(e, t)) : void 0
        }, removeAttr: function (e, t) {
            var n, i, o = 0, r = t && t.match(bt);
            if (r && 1 === e.nodeType)for (; n = r[o++];)i = ot.propFix[n] || n, ot.expr.match.bool.test(n) ? Fn && Cn || !En.test(n) ? e[i] = !1 : e[ot.camelCase("default-" + n)] = e[i] = !1 : ot.attr(e, n, ""), e.removeAttribute(Cn ? n : i)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!nt.radioValue && "radio" === t && ot.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), Sn = {
        set: function (e, t, n) {
            return t === !1 ? ot.removeAttr(e, n) : Fn && Cn || !En.test(n) ? e.setAttribute(!Cn && ot.propFix[n] || n, n) : e[ot.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, ot.each(ot.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = Tn[t] || ot.find.attr;
        Tn[t] = Fn && Cn || !En.test(t) ? function (e, t, i) {
            var o, r;
            return i || (r = Tn[t], Tn[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, Tn[t] = r), o
        } : function (e, t, n) {
            return n ? void 0 : e[ot.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), Fn && Cn || (ot.attrHooks.value = {
        set: function (e, t, n) {
            return ot.nodeName(e, "input") ? void(e.defaultValue = t) : wn && wn.set(e, t, n)
        }
    }), Cn || (wn = {
        set: function (e, t, n) {
            var i = e.getAttributeNode(n);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, Tn.id = Tn.name = Tn.coords = function (e, t, n) {
        var i;
        return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }, ot.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        }, set: wn.set
    }, ot.attrHooks.contenteditable = {
        set: function (e, t, n) {
            wn.set(e, "" === t ? !1 : t, n)
        }
    }, ot.each(["width", "height"], function (e, t) {
        ot.attrHooks[t] = {
            set: function (e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), nt.style || (ot.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || void 0
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var kn = /^(?:input|select|textarea|button|object)$/i, Un = /^(?:a|area)$/i;
    ot.fn.extend({
        prop: function (e, t) {
            return Ut(this, ot.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return e = ot.propFix[e] || e, this.each(function () {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {
                }
            })
        }
    }), ot.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
            var i, o, r, a = e.nodeType;
            return e && 3 !== a && 8 !== a && 2 !== a ? (r = 1 !== a || !ot.isXMLDoc(e), r && (t = ot.propFix[t] || t, o = ot.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]) : void 0
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = ot.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : kn.test(e.nodeName) || Un.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), nt.hrefNormalized || ot.each(["href", "src"], function (e, t) {
        ot.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), nt.optSelected || (ot.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ot.propFix[this.toLowerCase()] = this
    }), nt.enctype || (ot.propFix.enctype = "encoding");
    var Nn = /[\t\r\n\f]/g;
    ot.fn.extend({
        addClass: function (e) {
            var t, n, i, o, r, a, s = 0, l = this.length, u = "string" == typeof e && e;
            if (ot.isFunction(e))return this.each(function (t) {
                ot(this).addClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(bt) || []; l > s; s++)if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nn, " ") : " ")) {
                for (r = 0; o = t[r++];)i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                a = ot.trim(i), n.className !== a && (n.className = a)
            }
            return this
        }, removeClass: function (e) {
            var t, n, i, o, r, a, s = 0, l = this.length, u = 0 === arguments.length || "string" == typeof e && e;
            if (ot.isFunction(e))return this.each(function (t) {
                ot(this).removeClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(bt) || []; l > s; s++)if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nn, " ") : "")) {
                for (r = 0; o = t[r++];)for (; i.indexOf(" " + o + " ") >= 0;)i = i.replace(" " + o + " ", " ");
                a = e ? ot.trim(i) : "", n.className !== a && (n.className = a)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ot.isFunction(e) ? function (n) {
                ot(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n)for (var t, i = 0, o = ot(this), r = e.match(bt) || []; t = r[i++];)o.hasClass(t) ? o.removeClass(t) : o.addClass(t); else(n === St || "boolean" === n) && (this.className && ot._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ot._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Nn, " ").indexOf(t) >= 0)return !0;
            return !1
        }
    }), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        ot.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ot.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, i) {
            return this.on(t, e, n, i)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Pn = ot.now(), Dn = /\?/, In = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ot.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
        var n, i = null, o = ot.trim(t + "");
        return o && !ot.trim(o.replace(In, function (e, t, o, r) {
            return n && t && (i = 0), 0 === i ? e : (n = o || t, i += !r - !o, "")
        })) ? Function("return " + o)() : ot.error("Invalid JSON: " + t)
    }, ot.parseXML = function (t) {
        var n, i;
        if (!t || "string" != typeof t)return null;
        try {
            e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (o) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + t), n
    };
    var Ln, An, Mn = /#.*$/, Rn = /([?&])_=[^&]*/, Wn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Hn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, On = /^(?:GET|HEAD)$/, jn = /^\/\//, qn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Bn = {}, zn = {}, $n = "*/".concat("*");
    try {
        An = location.href
    } catch (Qn) {
        An = ht.createElement("a"), An.href = "", An = An.href
    }
    Ln = qn.exec(An.toLowerCase()) || [], ot.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: An,
            type: "GET",
            isLocal: Hn.test(Ln[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $n,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": ot.parseJSON, "text xml": ot.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? j(j(e, ot.ajaxSettings), t) : j(ot.ajaxSettings, e)
        },
        ajaxPrefilter: H(Bn),
        ajaxTransport: H(zn),
        ajax: function (e, t) {
            function n(e, t, n, i) {
                var o, c, v, y, x, w = t;
                2 !== b && (b = 2, s && clearTimeout(s), u = void 0, a = i || "", _.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, n && (y = q(d, _, n)), y = B(d, y, _, o), o ? (d.ifModified && (x = _.getResponseHeader("Last-Modified"), x && (ot.lastModified[r] = x), x = _.getResponseHeader("etag"), x && (ot.etag[r] = x)), 204 === e || "HEAD" === d.type ? w = "nocontent" : 304 === e ? w = "notmodified" : (w = y.state, c = y.data, v = y.error, o = !v)) : (v = w, (e || !w) && (w = "error", 0 > e && (e = 0))), _.status = e, _.statusText = (t || w) + "", o ? h.resolveWith(p, [c, w, _]) : h.rejectWith(p, [_, w, v]), _.statusCode(g), g = void 0, l && f.trigger(o ? "ajaxSuccess" : "ajaxError", [_, d, o ? c : v]), m.fireWith(p, [_, w]), l && (f.trigger("ajaxComplete", [_, d]), --ot.active || ot.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var i, o, r, a, s, l, u, c, d = ot.ajaxSetup({}, t), p = d.context || d, f = d.context && (p.nodeType || p.jquery) ? ot(p) : ot.event, h = ot.Deferred(), m = ot.Callbacks("once memory"), g = d.statusCode || {}, v = {}, y = {}, b = 0, x = "canceled", _ = {
                readyState: 0,
                getResponseHeader: function (e) {
                    var t;
                    if (2 === b) {
                        if (!c)for (c = {}; t = Wn.exec(a);)c[t[1].toLowerCase()] = t[2];
                        t = c[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function () {
                    return 2 === b ? a : null
                },
                setRequestHeader: function (e, t) {
                    var n = e.toLowerCase();
                    return b || (e = y[n] = y[n] || e, v[e] = t), this
                },
                overrideMimeType: function (e) {
                    return b || (d.mimeType = e), this
                },
                statusCode: function (e) {
                    var t;
                    if (e)if (2 > b)for (t in e)g[t] = [g[t], e[t]]; else _.always(e[_.status]);
                    return this
                },
                abort: function (e) {
                    var t = e || x;
                    return u && u.abort(t), n(0, t), this
                }
            };
            if (h.promise(_).complete = m.add, _.success = _.done, _.error = _.fail, d.url = ((e || d.url || An) + "").replace(Mn, "").replace(jn, Ln[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = ot.trim(d.dataType || "*").toLowerCase().match(bt) || [""], null == d.crossDomain && (i = qn.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === Ln[1] && i[2] === Ln[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Ln[3] || ("http:" === Ln[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ot.param(d.data, d.traditional)), O(Bn, d, t, _), 2 === b)return _;
            l = d.global, l && 0 === ot.active++ && ot.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !On.test(d.type), r = d.url, d.hasContent || (d.data && (r = d.url += (Dn.test(r) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Rn.test(r) ? r.replace(Rn, "$1_=" + Pn++) : r + (Dn.test(r) ? "&" : "?") + "_=" + Pn++)), d.ifModified && (ot.lastModified[r] && _.setRequestHeader("If-Modified-Since", ot.lastModified[r]), ot.etag[r] && _.setRequestHeader("If-None-Match", ot.etag[r])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && _.setRequestHeader("Content-Type", d.contentType), _.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + $n + "; q=0.01" : "") : d.accepts["*"]);
            for (o in d.headers)_.setRequestHeader(o, d.headers[o]);
            if (!d.beforeSend || d.beforeSend.call(p, _, d) !== !1 && 2 !== b) {
                x = "abort";
                for (o in{success: 1, error: 1, complete: 1})_[o](d[o]);
                if (u = O(zn, d, t, _)) {
                    _.readyState = 1, l && f.trigger("ajaxSend", [_, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                        _.abort("timeout")
                    }, d.timeout));
                    try {
                        b = 1, u.send(v, n)
                    } catch (w) {
                        if (!(2 > b))throw w;
                        n(-1, w)
                    }
                } else n(-1, "No Transport");
                return _
            }
            return _.abort()
        },
        getJSON: function (e, t, n) {
            return ot.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return ot.get(e, void 0, t, "script")
        }
    }), ot.each(["get", "post"], function (e, t) {
        ot[t] = function (e, n, i, o) {
            return ot.isFunction(n) && (o = o || i, i = n, n = void 0), ot.ajax({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            })
        }
    }), ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        ot.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), ot._evalUrl = function (e) {
        return ot.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, ot.fn.extend({
        wrapAll: function (e) {
            if (ot.isFunction(e))return this.each(function (t) {
                ot(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = ot(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return this.each(ot.isFunction(e) ? function (t) {
                ot(this).wrapInner(e.call(this, t))
            } : function () {
                var t = ot(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = ot.isFunction(e);
            return this.each(function (n) {
                ot(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ot.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !nt.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ot.css(e, "display"))
    }, ot.expr.filters.visible = function (e) {
        return !ot.expr.filters.hidden(e)
    };
    var Xn = /%20/g, Vn = /\[\]$/, Yn = /\r?\n/g, Gn = /^(?:submit|button|image|reset|file)$/i, Jn = /^(?:input|select|textarea|keygen)/i;
    ot.param = function (e, t) {
        var n, i = [], o = function (e, t) {
            t = ot.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(e) || e.jquery && !ot.isPlainObject(e))ot.each(e, function () {
            o(this.name, this.value)
        }); else for (n in e)z(n, e[n], t, o);
        return i.join("&").replace(Xn, "+")
    }, ot.fn.extend({
        serialize: function () {
            return ot.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = ot.prop(this, "elements");
                return e ? ot.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !ot(this).is(":disabled") && Jn.test(this.nodeName) && !Gn.test(e) && (this.checked || !Nt.test(e))
            }).map(function (e, t) {
                var n = ot(this).val();
                return null == n ? null : ot.isArray(n) ? ot.map(n, function (e) {
                    return {name: t.name, value: e.replace(Yn, "\r\n")}
                }) : {name: t.name, value: n.replace(Yn, "\r\n")}
            }).get()
        }
    }), ot.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && $() || Q()
    } : $;
    var Kn = 0, Zn = {}, ei = ot.ajaxSettings.xhr();
    e.ActiveXObject && ot(e).on("unload", function () {
        for (var e in Zn)Zn[e](void 0, !0)
    }), nt.cors = !!ei && "withCredentials" in ei, ei = nt.ajax = !!ei, ei && ot.ajaxTransport(function (e) {
        if (!e.crossDomain || nt.cors) {
            var t;
            return {
                send: function (n, i) {
                    var o, r = e.xhr(), a = ++Kn;
                    if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (o in e.xhrFields)r[o] = e.xhrFields[o];
                    e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (o in n)void 0 !== n[o] && r.setRequestHeader(o, n[o] + "");
                    r.send(e.hasContent && e.data || null), t = function (n, o) {
                        var s, l, u;
                        if (t && (o || 4 === r.readyState))if (delete Zn[a], t = void 0, r.onreadystatechange = ot.noop, o)4 !== r.readyState && r.abort(); else {
                            u = {}, s = r.status, "string" == typeof r.responseText && (u.text = r.responseText);
                            try {
                                l = r.statusText
                            } catch (c) {
                                l = ""
                            }
                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                        }
                        u && i(s, l, u, r.getAllResponseHeaders())
                    }, e.async ? 4 === r.readyState ? setTimeout(t) : r.onreadystatechange = Zn[a] = t : t()
                }, abort: function () {
                    t && t(void 0, !0)
                }
            }
        }
    }), ot.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return ot.globalEval(e), e
            }
        }
    }), ot.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ot.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n = ht.head || ot("head")[0] || ht.documentElement;
            return {
                send: function (i, o) {
                    t = ht.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                }, abort: function () {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var ti = [], ni = /(=)\?(?=&|$)|\?\?/;
    ot.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = ti.pop() || ot.expando + "_" + Pn++;
            return this[e] = !0, e
        }
    }), ot.ajaxPrefilter("json jsonp", function (t, n, i) {
        var o, r, a, s = t.jsonp !== !1 && (ni.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ni.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = ot.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ni, "$1" + o) : t.jsonp !== !1 && (t.url += (Dn.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function () {
            return a || ot.error(o + " was not called"), a[0]
        }, t.dataTypes[0] = "json", r = e[o], e[o] = function () {
            a = arguments
        }, i.always(function () {
            e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, ti.push(o)), a && ot.isFunction(r) && r(a[0]), a = r = void 0
        }), "script") : void 0
    }), ot.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || ht;
        var i = dt.exec(e), o = !n && [];
        return i ? [t.createElement(i[1])] : (i = ot.buildFragment([e], t, o), o && o.length && ot(o).remove(), ot.merge([], i.childNodes))
    };
    var ii = ot.fn.load;
    ot.fn.load = function (e, t, n) {
        if ("string" != typeof e && ii)return ii.apply(this, arguments);
        var i, o, r, a = this, s = e.indexOf(" ");
        return s >= 0 && (i = ot.trim(e.slice(s, e.length)), e = e.slice(0, s)), ot.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && ot.ajax({
            url: e,
            type: r,
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, a.html(i ? ot("<div>").append(ot.parseHTML(e)).find(i) : e)
        }).complete(n && function (e, t) {
                a.each(n, o || [e.responseText, t, e])
            }), this
    }, ot.expr.filters.animated = function (e) {
        return ot.grep(ot.timers, function (t) {
            return e === t.elem
        }).length
    };
    var oi = e.document.documentElement;
    ot.offset = {
        setOffset: function (e, t, n) {
            var i, o, r, a, s, l, u, c = ot.css(e, "position"), d = ot(e), p = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), r = ot.css(e, "top"), l = ot.css(e, "left"), u = ("absolute" === c || "fixed" === c) && ot.inArray("auto", [r, l]) > -1, u ? (i = d.position(), a = i.top, o = i.left) : (a = parseFloat(r) || 0, o = parseFloat(l) || 0), ot.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + o), "using" in t ? t.using.call(e, p) : d.css(p)
        }
    }, ot.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                ot.offset.setOffset(this, e, t)
            });
            var t, n, i = {top: 0, left: 0}, o = this[0], r = o && o.ownerDocument;
            return r ? (t = r.documentElement, ot.contains(t, o) ? (typeof o.getBoundingClientRect !== St && (i = o.getBoundingClientRect()), n = X(r), {
                top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : i) : void 0
        }, position: function () {
            if (this[0]) {
                var e, t, n = {top: 0, left: 0}, i = this[0];
                return "fixed" === ot.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ot.nodeName(e[0], "html") || (n = e.offset()), n.top += ot.css(e[0], "borderTopWidth", !0), n.left += ot.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - ot.css(i, "marginTop", !0),
                    left: t.left - n.left - ot.css(i, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || oi; e && !ot.nodeName(e, "html") && "static" === ot.css(e, "position");)e = e.offsetParent;
                return e || oi
            })
        }
    }), ot.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = /Y/.test(t);
        ot.fn[e] = function (i) {
            return Ut(this, function (e, i, o) {
                var r = X(e);
                return void 0 === o ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void(r ? r.scrollTo(n ? ot(r).scrollLeft() : o, n ? o : ot(r).scrollTop()) : e[i] = o)
            }, e, i, arguments.length, null)
        }
    }), ot.each(["top", "left"], function (e, t) {
        ot.cssHooks[t] = C(nt.pixelPosition, function (e, n) {
            return n ? (n = tn(e, t), on.test(n) ? ot(e).position()[t] + "px" : n) : void 0
        })
    }), ot.each({Height: "height", Width: "width"}, function (e, t) {
        ot.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
            ot.fn[i] = function (i, o) {
                var r = arguments.length && (n || "boolean" != typeof i), a = n || (i === !0 || o === !0 ? "margin" : "border");
                return Ut(this, function (t, n, i) {
                    var o;
                    return ot.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? ot.css(t, n, a) : ot.style(t, n, i, a)
                }, t, r ? i : void 0, r, null)
            }
        })
    }), ot.fn.size = function () {
        return this.length
    }, ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return ot
    });
    var ri = e.jQuery, ai = e.$;
    return ot.noConflict = function (t) {
        return e.$ === ot && (e.$ = ai), t && e.jQuery === ot && (e.jQuery = ri), ot
    }, typeof t === St && (e.jQuery = e.$ = ot), ot
}), define("UtilController", ["jquery"], function () {
    var e = {
        getAction: function (e) {
            if (e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random()), e.data)for (var t in e.data)e.url += "&" + t + "=" + e.data[t];
            e.alertFalse = e.alertFalse || "yes";
            var n = {
                url: e.url + "&_dt_=" + Math.random(),
                type: e.method || "GET",
                contentType: "application/json",
                dataType: "json",
                action: e.alert || "alert",
                isBack: e.back || "back",
                callback: function () {
                },
                success: function (t) {
                    t && (t.success ? e.callback && e.callback(t) : (t.message && "yes" == e.alertFalse && Tip.alert(t.message), "back" == n.isBack && e.callback && e.callback(t)))
                }
            };
            $.ajax(n)
        }, saveAction: function (e) {
            e.alertFalse = e.alertFalse || "yes", NProgress.start();
            var t = setInterval(function () {
                NProgress.inc()
            }, 200);
            e.url.indexOf("?") < 0 && (e.url += "?_dt=" + Math.random());
            var n = {
                url: e.url + "&_dt_=" + Math.random(),
                type: e.method || "POST",
                data: JSON.stringify(e.data),
                contentType: "application/json",
                dataType: "json",
                timeout: e.timeout || 1e4,
                success: function (n) {
                    clearInterval(t), NProgress.done(), n && (n.success || n.message && "yes" == e.alertFalse && Tip.alert(n.message), e.callback && e.callback(n))
                }
            };
            $.ajax(n)
        }, getQueryString: function () {
            for (var e = location.search.match(new RegExp("[?&][^?&]+=[^?&]+", "g")), t = 0; t < e.length; t++)e[t] = e[t].substring(1);
            return e
        }, getQueryStringByName: function (e) {
            var t = location.search.match(new RegExp("[?&]" + e + "=([^&]+)", "i"));
            return null == t || t.length < 1 ? "" : t[1]
        }, setCookie: function (e, t, n, i, o, r) {
            var a = new Date, n = arguments[2] ? arguments[2] : 604800;
            a.setTime(a.getTime() + 1e3 * n), document.cookie = escape(e) + "=" + escape(t) + (a ? ";expires=" + a.toGMTString() : "") + (i ? ";path=" + i : "/") + (o ? ";domain=" + o : "") + (r ? ";secure" : "")
        }, getCookie: function (e) {
            var t = document.cookie.indexOf(e), n = document.cookie.indexOf(";", t);
            return -1 == t ? "" : unescape(document.cookie.substring(t + e.length + 1, n > t ? n : document.cookie.length))
        }, delCookie: function (e, t) {
            var t = arguments[1] ? arguments[1] : null, n = new Date;
            n.setTime(n.getTime() - 1);
            var i = this.getCookie(e);
            null != i && (document.cookie = e + "=" + t + ";expires=" + n.toGMTString())
        }, isIE: function (e) {
            var t = document.createElement("b");
            return t.innerHTML = "<!--[if IE " + e + "]><i></i><![endif]-->", 1 === t.getElementsByTagName("i").length
        }
    };
    return e
}), define("HeaderController", ["UtilController"], function (e) {
    function t() {
        var e = "notice", t = UtilTool.getCookie(e);
        o.notice = "" == t || "false" == t ? !1 : !0
    }

    function n() {
        var e = "notice";
        UtilTool.setCookie(e, o.notice)
    }

    var i = qq, o = avalon.define("HeaderController", function (t) {
        t.qqNum = i[0], t.qqSrc = "http://wpa.qq.com/msgrd?v=3&uin=" + i[0] + "&site=qq&menu=yes", t.chat = function () {
            window.open(t.qqSrc)
        }, t.id = "", t.userName = "", t.email = "", t.raw = "", t.point = 0, t.balance = 0, t.headImageId = "", t.headImageUrl = "", t.cartNum = 0, t.login = !1, t.current = "", t.pageLevel = base, t.rel = "nofollow", t.referrerLinkRaw = "", t.referrerLink = "", t.actionForProduct = !1, t.setCurrent = function (e) {
            o.current = e
        }, t.toLogin = function () {
            var e = "";
            location.href.indexOf("sign") < 0 && (e = encodeURIComponent(location.href)), location.href = base + "sign/signIn.html?from=" + e
        }, t.whoAmI = function (t) {
            e.getAction({
                url: APITool.whoAmI, alertFalse: "no", callback: function (e) {
                    e.value = e.value || {};
                    var n = Math.floor(e.value.phoneMobile / 1e8) + "****" + e.value.phoneMobile % 1e4;
                    o.userName = e.value.name || n || "", o.cartNum = e.value.myShoppingCartCount || 0, o.login = e.success, o.point = e.value.point, o.balance = e.value.balance, o.id = e.value.id, o.raw = e.value, o.referrerLinkRaw = e.value.referrerLink;
                    var i = window.location.protocol + "//" + window.location.host;
                    o.referrerLink = i.indexOf("meprint.com") >= 0 ? i + "/sign/signUp.html?link=" + e.value.referrerLink : location.href.indexOf("avant-dev") >= 0 ? i + "/avant-dev/sign/signUp.html?link=" + e.value.referrerLink : i + "/sign/signUp.html?link=" + e.value.referrerLink, o.headImageId = e.value.headImageId || "", o.headImageUrl = o.headImageId ? HOST_URL + "pattern/image?serial=" + e.value.headImageId + "&width=100&height=100" : base_head_img, o.email = e.value.email, t && t()
                }
            })
        }, t.init = t.whoAmI, t.logoutHandler = function () {
            e.getAction({
                url: APITool.logout, callback: function () {
                    location.href = base + "index.html"
                }
            })
        }, t.logout = t.logoutHandler, t.checkWhoAmI = function (t) {
            e.getAction({
                url: APITool.whoAmI, alertFalse: "no", callback: function (e) {
                    t(e.success)
                }
            })
        }, t.copyed = !1, t.copyHandler = function () {
        }, t.showNotice = showNotice, t.notice = !1, t.close = function () {
            o.notice = !o.notice, n(o.notice)
        }
    });
    return t(), $(function () {
        var e = $(window).height();
        $(".main-content").css("min-height", e - 140)
    }), o
});
var SWFUpload;
define("Upload_SwfUpload", [], function () {
    return void 0 == SWFUpload && (SWFUpload = function (e) {
        this.initSWFUpload(e)
    }), SWFUpload.prototype.initSWFUpload = function (e) {
        try {
            this.customSettings = {}, this.settings = e, this.eventQueue = [], this.movieName = "SWFUpload_" + SWFUpload.movieCount++, this.movieElement = null, SWFUpload.instances[this.movieName] = this, this.initSettings(), this.loadFlash(), this.displayDebugInfo()
        } catch (t) {
            throw delete SWFUpload.instances[this.movieName], t
        }
    }, SWFUpload.instances = {}, SWFUpload.movieCount = 0, SWFUpload.version = "2.2.0 2009-03-25", SWFUpload.QUEUE_ERROR = {
        QUEUE_LIMIT_EXCEEDED: -100,
        FILE_EXCEEDS_SIZE_LIMIT: -110,
        ZERO_BYTE_FILE: -120,
        INVALID_FILETYPE: -130
    }, SWFUpload.UPLOAD_ERROR = {
        HTTP_ERROR: -200,
        MISSING_UPLOAD_URL: -210,
        IO_ERROR: -220,
        SECURITY_ERROR: -230,
        UPLOAD_LIMIT_EXCEEDED: -240,
        UPLOAD_FAILED: -250,
        SPECIFIED_FILE_ID_NOT_FOUND: -260,
        FILE_VALIDATION_FAILED: -270,
        FILE_CANCELLED: -280,
        UPLOAD_STOPPED: -290
    }, SWFUpload.FILE_STATUS = {
        QUEUED: -1,
        IN_PROGRESS: -2,
        ERROR: -3,
        COMPLETE: -4,
        CANCELLED: -5
    }, SWFUpload.BUTTON_ACTION = {
        SELECT_FILE: -100,
        SELECT_FILES: -110,
        START_UPLOAD: -120
    }, SWFUpload.CURSOR = {ARROW: -1, HAND: -2}, SWFUpload.WINDOW_MODE = {
        WINDOW: "window",
        TRANSPARENT: "transparent",
        OPAQUE: "opaque"
    }, SWFUpload.completeURL = function (e) {
        if ("string" != typeof e || e.match(/^https?:\/\//i) || e.match(/^\//))return e;
        var t = (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""), window.location.pathname.lastIndexOf("/"));
        return path = 0 >= t ? "/" : window.location.pathname.substr(0, t) + "/", path + e
    }, SWFUpload.prototype.initSettings = function () {
        this.ensureDefault = function (e, t) {
            this.settings[e] = void 0 == this.settings[e] ? t : this.settings[e]
        }, this.ensureDefault("upload_url", ""), this.ensureDefault("preserve_relative_urls", !1), this.ensureDefault("file_post_name", "Filedata"), this.ensureDefault("post_params", {}), this.ensureDefault("use_query_string", !1), this.ensureDefault("requeue_on_error", !1), this.ensureDefault("http_success", []), this.ensureDefault("assume_success_timeout", 0), this.ensureDefault("file_types", "*.*"), this.ensureDefault("file_types_description", "All Files"), this.ensureDefault("file_size_limit", 0), this.ensureDefault("file_upload_limit", 0), this.ensureDefault("file_queue_limit", 0), this.ensureDefault("flash_url", "swfupload.swf"), this.ensureDefault("prevent_swf_caching", !0), this.ensureDefault("button_image_url", ""), this.ensureDefault("button_width", 1), this.ensureDefault("button_height", 1), this.ensureDefault("button_text", ""), this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;"), this.ensureDefault("button_text_top_padding", 0), this.ensureDefault("button_text_left_padding", 0), this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES), this.ensureDefault("button_disabled", !1), this.ensureDefault("button_placeholder_id", ""), this.ensureDefault("button_placeholder", null), this.ensureDefault("button_cursor", SWFUpload.CURSOR.HAND), this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.OPAQUE), this.ensureDefault("debug", !1), this.settings.debug_enabled = this.settings.debug, this.settings.return_upload_start_handler = this.returnUploadStart, this.ensureDefault("swfupload_loaded_handler", null), this.ensureDefault("file_dialog_start_handler", null), this.ensureDefault("file_queued_handler", null), this.ensureDefault("file_queue_error_handler", null), this.ensureDefault("file_dialog_complete_handler", null), this.ensureDefault("upload_start_handler", null), this.ensureDefault("upload_progress_handler", null), this.ensureDefault("upload_error_handler", null), this.ensureDefault("upload_success_handler", null), this.ensureDefault("upload_complete_handler", null), this.ensureDefault("debug_handler", this.debugMessage), this.ensureDefault("custom_settings", {}), this.customSettings = this.settings.custom_settings, !this.settings.prevent_swf_caching || (this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime()), this.settings.preserve_relative_urls || (this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url), this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url)), delete this.ensureDefault
    }, SWFUpload.prototype.loadFlash = function () {
        var e, t;
        if (null !== document.getElementById(this.movieName))throw"ID " + this.movieName + " is already in use. The Flash Object could not be added";
        if (e = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder, void 0 == e)throw"Could not find the placeholder element: " + this.settings.button_placeholder_id;
        t = document.createElement("div"), t.innerHTML = this.getFlashHTML(), e.parentNode.replaceChild(t.firstChild, e), void 0 == window[this.movieName] && (window[this.movieName] = this.getMovieElement())
    }, SWFUpload.prototype.getFlashHTML = function () {
        return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
    }, SWFUpload.prototype.getFlashVars = function () {
        var e = this.buildParamString(), t = this.settings.http_success.join(",");
        return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(t), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(e), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
    }, SWFUpload.prototype.getMovieElement = function () {
        if (void 0 == this.movieElement && (this.movieElement = document.getElementById(this.movieName)), null === this.movieElement)throw"Could not find Flash element";
        return this.movieElement
    }, SWFUpload.prototype.buildParamString = function () {
        var e = this.settings.post_params, t = [];
        if ("object" == typeof e)for (var n in e)e.hasOwnProperty(n) && t.push(encodeURIComponent(n.toString()) + "=" + encodeURIComponent(e[n].toString()));
        return t.join("&amp;")
    }, SWFUpload.prototype.destroy = function () {
        try {
            this.cancelUpload(null, !1);
            var e = null;
            if (e = this.getMovieElement(), e && "unknown" == typeof e.CallFunction) {
                for (var t in e)try {
                    "function" == typeof e[t] && (e[t] = null)
                } catch (n) {
                }
                try {
                    e.parentNode.removeChild(e)
                } catch (i) {
                }
            }
            return window[this.movieName] = null, SWFUpload.instances[this.movieName] = null, delete SWFUpload.instances[this.movieName], this.movieElement = null, this.settings = null, this.customSettings = null, this.eventQueue = null, this.movieName = null, !0
        } catch (o) {
            return !1
        }
    }, SWFUpload.prototype.displayDebugInfo = function () {
        this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "	", "upload_url:               ", this.settings.upload_url, "\n", "	", "flash_url:                ", this.settings.flash_url, "\n", "	", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "	", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "	", "http_success:             ", this.settings.http_success.join(", "), "\n", "	", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "	", "file_post_name:           ", this.settings.file_post_name, "\n", "	", "post_params:              ", this.settings.post_params.toString(), "\n", "	", "file_types:               ", this.settings.file_types, "\n", "	", "file_types_description:   ", this.settings.file_types_description, "\n", "	", "file_size_limit:          ", this.settings.file_size_limit, "\n", "	", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "	", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "	", "debug:                    ", this.settings.debug.toString(), "\n", "	", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "	", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "	", "button_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n", "	", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "	", "button_width:             ", this.settings.button_width.toString(), "\n", "	", "button_height:            ", this.settings.button_height.toString(), "\n", "	", "button_text:              ", this.settings.button_text.toString(), "\n", "	", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "	", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "	", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "	", "button_action:            ", this.settings.button_action.toString(), "\n", "	", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "	", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "	", "swfupload_loaded_handler assigned:  ", ("function" == typeof this.settings.swfupload_loaded_handler).toString(), "\n", "	", "file_dialog_start_handler assigned: ", ("function" == typeof this.settings.file_dialog_start_handler).toString(), "\n", "	", "file_queued_handler assigned:       ", ("function" == typeof this.settings.file_queued_handler).toString(), "\n", "	", "file_queue_error_handler assigned:  ", ("function" == typeof this.settings.file_queue_error_handler).toString(), "\n", "	", "upload_start_handler assigned:      ", ("function" == typeof this.settings.upload_start_handler).toString(), "\n", "	", "upload_progress_handler assigned:   ", ("function" == typeof this.settings.upload_progress_handler).toString(), "\n", "	", "upload_error_handler assigned:      ", ("function" == typeof this.settings.upload_error_handler).toString(), "\n", "	", "upload_success_handler assigned:    ", ("function" == typeof this.settings.upload_success_handler).toString(), "\n", "	", "upload_complete_handler assigned:   ", ("function" == typeof this.settings.upload_complete_handler).toString(), "\n", "	", "debug_handler assigned:             ", ("function" == typeof this.settings.debug_handler).toString(), "\n"].join(""))
    }, SWFUpload.prototype.addSetting = function (e, t, n) {
        return this.settings[e] = void 0 == t ? n : t
    }, SWFUpload.prototype.getSetting = function (e) {
        return void 0 != this.settings[e] ? this.settings[e] : ""
    }, SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
        argumentArray = argumentArray || [];
        var movieElement = this.getMovieElement(), returnValue, returnString;
        try {
            returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>"), returnValue = eval(returnString)
        } catch (ex) {
            throw"Call to " + functionName + " failed"
        }
        return void 0 != returnValue && "object" == typeof returnValue.post && (returnValue = this.unescapeFilePostParams(returnValue)), returnValue
    }, SWFUpload.prototype.selectFile = function () {
        this.callFlash("SelectFile")
    }, SWFUpload.prototype.selectFiles = function () {
        this.callFlash("SelectFiles")
    }, SWFUpload.prototype.startUpload = function (e) {
        this.callFlash("StartUpload", [e])
    }, SWFUpload.prototype.cancelUpload = function (e, t) {
        t !== !1 && (t = !0), this.callFlash("CancelUpload", [e, t])
    }, SWFUpload.prototype.stopUpload = function () {
        this.callFlash("StopUpload")
    }, SWFUpload.prototype.getStats = function () {
        return this.callFlash("GetStats")
    }, SWFUpload.prototype.setStats = function (e) {
        this.callFlash("SetStats", [e])
    }, SWFUpload.prototype.getFile = function (e) {
        return "number" == typeof e ? this.callFlash("GetFileByIndex", [e]) : this.callFlash("GetFile", [e])
    }, SWFUpload.prototype.addFileParam = function (e, t, n) {
        return this.callFlash("AddFileParam", [e, t, n])
    }, SWFUpload.prototype.removeFileParam = function (e, t) {
        this.callFlash("RemoveFileParam", [e, t])
    }, SWFUpload.prototype.setUploadURL = function (e) {
        this.settings.upload_url = e.toString(), this.callFlash("SetUploadURL", [e])
    }, SWFUpload.prototype.setPostParams = function (e) {
        this.settings.post_params = e, this.callFlash("SetPostParams", [e])
    }, SWFUpload.prototype.addPostParam = function (e, t) {
        this.settings.post_params[e] = t, this.callFlash("SetPostParams", [this.settings.post_params])
    }, SWFUpload.prototype.removePostParam = function (e) {
        delete this.settings.post_params[e], this.callFlash("SetPostParams", [this.settings.post_params])
    }, SWFUpload.prototype.setFileTypes = function (e, t) {
        this.settings.file_types = e, this.settings.file_types_description = t, this.callFlash("SetFileTypes", [e, t])
    }, SWFUpload.prototype.setFileSizeLimit = function (e) {
        this.settings.file_size_limit = e, this.callFlash("SetFileSizeLimit", [e])
    }, SWFUpload.prototype.setFileUploadLimit = function (e) {
        this.settings.file_upload_limit = e, this.callFlash("SetFileUploadLimit", [e])
    }, SWFUpload.prototype.setFileQueueLimit = function (e) {
        this.settings.file_queue_limit = e, this.callFlash("SetFileQueueLimit", [e])
    }, SWFUpload.prototype.setFilePostName = function (e) {
        this.settings.file_post_name = e, this.callFlash("SetFilePostName", [e])
    }, SWFUpload.prototype.setUseQueryString = function (e) {
        this.settings.use_query_string = e, this.callFlash("SetUseQueryString", [e])
    }, SWFUpload.prototype.setRequeueOnError = function (e) {
        this.settings.requeue_on_error = e, this.callFlash("SetRequeueOnError", [e])
    }, SWFUpload.prototype.setHTTPSuccess = function (e) {
        "string" == typeof e && (e = e.replace(" ", "").split(",")), this.settings.http_success = e, this.callFlash("SetHTTPSuccess", [e])
    }, SWFUpload.prototype.setAssumeSuccessTimeout = function (e) {
        this.settings.assume_success_timeout = e, this.callFlash("SetAssumeSuccessTimeout", [e])
    }, SWFUpload.prototype.setDebugEnabled = function (e) {
        this.settings.debug_enabled = e, this.callFlash("SetDebugEnabled", [e])
    }, SWFUpload.prototype.setButtonImageURL = function (e) {
        void 0 == e && (e = ""), this.settings.button_image_url = e, this.callFlash("SetButtonImageURL", [e])
    }, SWFUpload.prototype.setButtonDimensions = function (e, t) {
        this.settings.button_width = e, this.settings.button_height = t;
        var n = this.getMovieElement();
        void 0 != n && (n.style.width = e + "px", n.style.height = t + "px"), this.callFlash("SetButtonDimensions", [e, t])
    }, SWFUpload.prototype.setButtonText = function (e) {
        this.settings.button_text = e, this.callFlash("SetButtonText", [e])
    }, SWFUpload.prototype.setButtonTextPadding = function (e, t) {
        this.settings.button_text_top_padding = t, this.settings.button_text_left_padding = e, this.callFlash("SetButtonTextPadding", [e, t])
    }, SWFUpload.prototype.setButtonTextStyle = function (e) {
        this.settings.button_text_style = e, this.callFlash("SetButtonTextStyle", [e])
    }, SWFUpload.prototype.setButtonDisabled = function (e) {
        this.settings.button_disabled = e, this.callFlash("SetButtonDisabled", [e])
    }, SWFUpload.prototype.setButtonAction = function (e) {
        this.settings.button_action = e, this.callFlash("SetButtonAction", [e])
    }, SWFUpload.prototype.setButtonCursor = function (e) {
        this.settings.button_cursor = e, this.callFlash("SetButtonCursor", [e])
    }, SWFUpload.prototype.queueEvent = function (e, t) {
        void 0 == t ? t = [] : t instanceof Array || (t = [t]);
        var n = this;
        if ("function" == typeof this.settings[e])this.eventQueue.push(function () {
            this.settings[e].apply(this, t)
        }), setTimeout(function () {
            n.executeNextEvent()
        }, 0); else if (null !== this.settings[e])throw"Event handler " + e + " is unknown or is not a function"
    }, SWFUpload.prototype.executeNextEvent = function () {
        var e = this.eventQueue ? this.eventQueue.shift() : null;
        "function" == typeof e && e.apply(this)
    }, SWFUpload.prototype.unescapeFilePostParams = function (e) {
        var t, n = /[$]([0-9a-f]{4})/i, i = {};
        if (void 0 != e) {
            for (var o in e.post)if (e.post.hasOwnProperty(o)) {
                t = o;
                for (var r; null !== (r = n.exec(t));)t = t.replace(r[0], String.fromCharCode(parseInt("0x" + r[1], 16)));
                i[t] = e.post[o]
            }
            e.post = i
        }
        return e
    }, SWFUpload.prototype.testExternalInterface = function () {
        try {
            return this.callFlash("TestExternalInterface")
        } catch (e) {
            return !1
        }
    }, SWFUpload.prototype.flashReady = function () {
        var e = this.getMovieElement();
        return e ? (this.cleanUp(e), void this.queueEvent("swfupload_loaded_handler")) : void this.debug("Flash called back ready but the flash movie can't be found.")
    }, SWFUpload.prototype.cleanUp = function (e) {
        try {
            if (this.movieElement && "unknown" == typeof e.CallFunction) {
                this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
                for (var t in e)try {
                    "function" == typeof e[t] && (e[t] = null)
                } catch (n) {
                }
            }
        } catch (i) {
        }
        window.__flash__removeCallback = function (e, t) {
            try {
                e && (e[t] = null)
            } catch (n) {
            }
        }
    }, SWFUpload.prototype.fileDialogStart = function () {
        this.queueEvent("file_dialog_start_handler")
    }, SWFUpload.prototype.fileQueued = function (e) {
        e = this.unescapeFilePostParams(e), this.queueEvent("file_queued_handler", e)
    }, SWFUpload.prototype.fileQueueError = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("file_queue_error_handler", [e, t, n])
    }, SWFUpload.prototype.fileDialogComplete = function (e, t, n) {
        this.queueEvent("file_dialog_complete_handler", [e, t, n])
    }, SWFUpload.prototype.uploadStart = function (e) {
        e = this.unescapeFilePostParams(e), this.queueEvent("return_upload_start_handler", e)
    }, SWFUpload.prototype.returnUploadStart = function (e) {
        var t;
        if ("function" == typeof this.settings.upload_start_handler)e = this.unescapeFilePostParams(e), t = this.settings.upload_start_handler.call(this, e); else if (void 0 != this.settings.upload_start_handler)throw"upload_start_handler must be a function";
        void 0 === t && (t = !0), t = !!t, this.callFlash("ReturnUploadStart", [t])
    }, SWFUpload.prototype.uploadProgress = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_progress_handler", [e, t, n])
    }, SWFUpload.prototype.uploadError = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_error_handler", [e, t, n])
    }, SWFUpload.prototype.uploadSuccess = function (e, t, n) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_success_handler", [e, t, n])
    }, SWFUpload.prototype.uploadComplete = function (e) {
        e = this.unescapeFilePostParams(e), this.queueEvent("upload_complete_handler", e)
    }, SWFUpload.prototype.debug = function (e) {
        this.queueEvent("debug_handler", e)
    }, SWFUpload.prototype.debugMessage = function (e) {
        if (this.settings.debug) {
            var t, n = [];
            if ("object" == typeof e && "string" == typeof e.name && "string" == typeof e.message) {
                for (var i in e)e.hasOwnProperty(i) && n.push(i + ": " + e[i]);
                t = n.join("\n") || "", n = t.split("\n"), t = "EXCEPTION: " + n.join("\nEXCEPTION: "), SWFUpload.Console.writeLine(t)
            } else SWFUpload.Console.writeLine(e)
        }
    }, SWFUpload.Console = {}, SWFUpload.Console.writeLine = function (e) {
        var t, n;
        try {
            t = document.getElementById("SWFUpload_Console"), t || (n = document.createElement("form"), document.getElementsByTagName("body")[0].appendChild(n), t = document.createElement("textarea"), t.id = "SWFUpload_Console", t.style.fontFamily = "monospace", t.setAttribute("wrap", "off"), t.wrap = "off", t.style.overflow = "auto", t.style.width = "700px", t.style.height = "350px", t.style.margin = "5px", n.appendChild(t)), t.value += e + "\n", t.scrollTop = t.scrollHeight - t.clientHeight
        } catch (i) {
            alert("Exception: " + i.name + " Message: " + i.message)
        }
    }, SWFUpload
}), define("Upload_Handler", [], function () {
    return {}
}), FileProgress.prototype.setTimer = function (e) {
    this.fileProgressElement.FP_TIMER = e
}, FileProgress.prototype.getTimer = function () {
    return this.fileProgressElement.FP_TIMER || null
}, FileProgress.prototype.reset = function () {
    this.fileProgressElement.childNodes[1].style.width = "0%", this.appear()
}, FileProgress.prototype.setProgress = function (e) {
    this.fileProgressElement.childNodes[1].style.width = e + "%", this.appear()
}, FileProgress.prototype.setComplete = function () {
    this.fileProgressElement.childNodes[1].style.width = "";
    var e = this;
    this.setTimer(setTimeout(function () {
        e.disappear()
    }, 1e3))
}, FileProgress.prototype.setError = function () {
    this.fileProgressElement.childNodes[1].style.width = "";
    var e = this;
    this.setTimer(setTimeout(function () {
        e.disappear()
    }, 1500))
}, FileProgress.prototype.setCancelled = function () {
    this.fileProgressElement.childNodes[1].style.width = "";
    var e = this;
    this.setTimer(setTimeout(function () {
        e.disappear()
    }, 1500))
}, FileProgress.prototype.setStatus = function () {
}, FileProgress.prototype.toggleCancel = function (e) {
    this.cancelElement.style.display = e ? "block" : "none"
}, FileProgress.prototype.appear = function () {
    if (null !== this.getTimer() && (clearTimeout(this.getTimer()), this.setTimer(null)), this.fileProgressWrapper.filters)try {
        this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100
    } catch (e) {
        this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)"
    } else this.fileProgressWrapper.style.opacity = 1;
    this.fileProgressWrapper.style.height = "", this.opacity = 100, this.fileProgressWrapper.style.display = ""
}, FileProgress.prototype.disappear = function () {
    var e = 15, t = 4, n = 30;
    if (this.opacity > 0)if (this.opacity -= e, this.opacity < 0 && (this.opacity = 0), this.fileProgressWrapper.filters)try {
        this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity
    } catch (i) {
        this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")"
    } else this.fileProgressWrapper.style.opacity = this.opacity / 100;
    if (this.height > 0 && (this.height -= t, this.height < 0 && (this.height = 0), this.fileProgressWrapper.style.height = this.height + "px"), this.height > 0 || this.opacity > 0) {
        var o = this;
        this.setTimer(setTimeout(function () {
            o.disappear()
        }, n))
    } else this.fileProgressWrapper.style.display = "none", this.setTimer(null)
}, define("UploadBase", ["Upload_SwfUpload", "Upload_Handler"], function (e) {
    var t = function (e) {
        var t = {
            upload_url: HOST_URL,
            custom_settings: {progressTarget: "", cancelButtonId: ""},
            file_size_limit: "1024 MB",
            file_upload_limit: 200,
            file_types: "*.jpg;*.jpeg;*.tif;*.rar;*.zip;*.tiff;",
            file_types_description: "请选择图片格式或压缩文件格式上传",
            file_queued_handler: fileQueued,
            file_queue_error_handler: fileQueueError,
            file_dialog_complete_handler: fileDialogComplete,
            upload_start_handler: uploadStart,
            upload_progress_handler: uploadProgress,
            upload_error_handler: uploadError,
            upload_success_handler: uploadSuccess,
            upload_complete_handler: uploadComplete,
            button_image_url: base + "images/uploadBtn_03.png",
            button_width: "300",
            button_height: "38",
            button_placeholder_id: "",
            flash_url: base + "libs/Swfupload/vendor/swfupload.swf"
        };
        t = mixin(t, e), this.options = t
    };
    return t.prototype = {
        init: function () {
            var t = this;
            return new e(t.options)
        }
    }, t
}), define("UploadController", ["UploadBase", "UtilController"], function (e, t) {
    function n(e) {
        var t = {
            fid: e.id,
            thumbUrl: "",
            serial: null,
            fname: e.name,
            error: null,
            state: "wait",
            value: null,
            name: e.name,
            tags: ""
        };
        e.size > 1073741824 && (t.error = "sizeError", t.state = "stop"), s.list.push(t), s.totalPages = Math.ceil(s.list.length / s.limit), s.showList = s.list.slice((s.curPage - 1) * s.limit, s.curPage * s.limit), s.listVisible = !0
    }

    function i(e) {
        var t = s.findItemByFile(e);
        if (e.size > 104857600)return t.error = "sizeError", t.state = "stop", a.swf.cancelUpload(e.id, !1), !1;
        if (e.size > 1024 * (r.limitDiskQuota - r.hasUsedDiskQuota) * 1024)return alert("您的磁盘空间不足！"), t ? (t.error = "sizeError", t.state = "stop", a.swf.cancelUpload(null, !1), !1) : !1;
        if (!t)return !1;
        t.state = "inprogress";
        var n = s.findIndex(t);
        s.curPage = Math.floor(n / s.limit) + 1, s.showList = s.list.slice((s.curPage - 1) * s.limit, s.curPage * s.limit)
    }

    function o(e, t) {
        var n = s.findItemByFile(e);
        if (t = JSON.parse(t), !t.success)return n.error = "uploadError", void(n.state = "stop");
        var i = t.value[0] && t.value[0].dpi[0];
        (!i || i > 300 || 100 > i) && (n.error = "dpiError"), n.state = "finish", s.list.forEach(function (i) {
            i.fid == e.id && (n.thumbUrl = APITool.getUserPicUrl(t.value[0].serial), n.serial = t.value[0].serial, n.value = t.value[0], s.selectHandler(null, n))
        });
        for (var o = 1; o < t.value.length; o++) {
            var r = t.value[o].dpi[0], a = !r || r > 300 || 100 > r, l = {
                fid: e.id + "_" + o,
                serial: t.value[o].serial,
                value: t.value[o],
                fname: e.name,
                error: a ? "dpiError" : "",
                state: "stop",
                thumbUrl: APITool.getUserPicUrl(t.value[o].serial),
                name: e.name,
                tags: ""
            };
            s.list.push(l), s.totalPages = Math.ceil(s.list.length / s.limit)
        }
        s.showList = s.list.slice((s.curPage - 1) * s.limit, s.curPage * s.limit), s.showList.forEach(function (t) {
            t.fid == e.id && s.showCancelHandler(t, "hidden")
        })
    }

    var r, a = {
        swf: null,
        params: {
            custom_settings: {progressTarget: "UploadProgress", cancelButtonId: "CancelBtn"},
            button_placeholder_id: "UploadBtn",
            upload_url: HOST_URL + "resourceManage/upload?login_user_id=",
            upload_success_handler: o,
            upload_start_handler: i,
            file_queued_handler: n
        },
        upload_class: null,
        getInstance: function () {
            var e = new a.upload_class(a.params);
            return this.swf = e.init(), this.swf
        }
    }, s = avalon.define("UploadController", function (n) {
        n.showWin = !1, n.listVisible = !1, n.scrollTop = 0, n.flashVisible = !0, n.showHandler = function (t) {
            var n = avalon.vmodels.HeaderController;
            return n.login ? (s.showWin = t, s.clearHandler(), !a.swf && t && (a.params.upload_url = HOST_URL + "resourceManage/upload?login_user_id=" + UtilTool.getCookie("login_user_id"), a.upload_class = e, a.getInstance(), window.swfobject && !swfobject.hasFlashPlayerVersion("11.1.0") && (s.flashVisible = !1)), t && (a.params.upload_url = HOST_URL + "resourceManage/upload?login_user_id=" + UtilTool.getCookie("login_user_id"), s.scrollTop = UtilTool.bodyScrollTop() + 150), void 0) : (alert("点击确定跳转到登录页面"), void(location.href = base + "sign/signIn.html?from=" + encodeURIComponent(location.href)))
        }, n.list = [], n.showList = [], n.curPage = 1, n.limit = 200, n.totalPages = 0, n.selectItem = {
            thumbUrl: "",
            name: "",
            tags: "",
            fid: null
        }, n.selectHandler = function () {
        }, n.clearHandler = function () {
            s.list = [], s.showList = [], s.curPage = 1, s.totalPages = 0, s.selectItem = {
                thumbUrl: "",
                name: "",
                tags: "",
                fid: null
            }, s.listVisible = !1
        }, n.findItemByFile = function (e) {
            for (var t = 0; t < s.list.length; t++)if (s.list[t].fid == e.id)return s.list[t];
            return null
        }, n.findIndex = function (e) {
            for (var t = null, n = 0; n < s.list.length; n++)if (s.list[n].fid == e.fid) {
                t = n;
                break
            }
            return t
        }, n.cancelUploadHandler = function (e, t) {
            ("inprogress" == t.state || "wait" == t.state) && a.swf.cancelUpload(t.fid);
            var n = s.findIndex(t);
            n >= 0 && (s.list.splice(n, 1), s.totalPages = Math.ceil(s.list.length / s.limit), s.curPage = Math.min(s.curPage, s.totalPages) || 1, s.showList = s.list.slice((s.curPage - 1) * s.limit, s.curPage * s.limit), !(t.fid == s.selectItem.fid && s.showList.length || s.showList.length))
        }, n.showCancelHandler = function (e, t) {
            if ("inprogress" != e.state && "wait" != e.state) {
                var n = document.getElementById("del_pic_" + e.fid);
                n && (n.style.display = "hidden" == t ? "none" : "block")
            }
        }, n.confirmBtnHandler = function () {
            var e = [];
            s.list.forEach(function (e) {
                e.fid == s.selectItem.fid && (e.name = s.selectItem.name, e.tags = s.selectItem.tags)
            });
            var n = [], i = [];
            if (s.list.forEach(function (t) {
                    if (t.value && !t.error) {
                        var o = t.value;
                        o.thumbUrl = t.thumbUrl, o.selected = !0, e.push(o), i.push(o.serial)
                    } else("inprogress" == t.state || "wait" == t.state) && n.push(t)
                }), n.length) {
                if (!confirm("您有图片未上传完成，确认取消图片上传吗？"))return;
                n.forEach(function (e) {
                    a.swf.cancelUpload(e.fid)
                })
            }
            var o = window.use, r = avalon.vmodels.PatternListController;
            r && i.length ? t.saveAction({
                url: APITool.confirmUpload(i, o), callback: function () {
                    r && r.init(), s.showHandler(!1)
                }
            }) : s.needUpload ? t.saveAction({
                url: APITool.confirmUpload(i), callback: function () {
                    s.showHandler(!1), "function" == typeof s.confirmCallback && s.confirmCallback(e)
                }
            }) : s.showHandler(!1)
        }, n.confirmCallback = function () {
        }, n.needUpload = !1, n.removeBtnHandler = function () {
            var e = [];
            return s.list.forEach(function (t) {
                t.serial && e.push(t.serial)
            }), e.length ? (t.getAction({
                url: APITool.delMyImages,
                data: {serials: e.toString()},
                callback: function () {
                    r.init()
                }
            }), void s.showHandler(!1)) : void s.showHandler(!1)
        }
    });
    return r = avalon.define("QuotaController", function (e) {
        e.hasUsedDiskQuota = 0, e.limitDiskQuota = 30, e.limitDiskQuotaText = "", e.hasUsedDiskQuotaText = "", e.usedW = "", e.limitW = "", e.percent = 0, e.init = function () {
            t.getAction({
                url: APITool.getUserDiskQuota, callback: function (e) {
                    e.value && (r.limitDiskQuotaText = r.fixData(e.value.limitDiskQuota), r.hasUsedDiskQuotaText = r.fixData(e.value.hasUsedDiskQuota), r.hasUsedDiskQuota = e.value.hasUsedDiskQuota, r.limitDiskQuota = e.value.limitDiskQuota, r.usedW = Math.floor(70 * r.hasUsedDiskQuota / r.limitDiskQuota) + "px", r.limitW = 70 - Math.floor(70 * r.hasUsedDiskQuota / r.limitDiskQuota) + "px", r.percent = Math.ceil(100 * e.value.hasUsedDiskQuota / e.value.limitDiskQuota) + "%")
                }
            })
        }, e.fixData = function (e) {
            return e > 0 && 1024 > e ? e.toFixed(2) + "M" : 0 == e ? "0M" : (e / 1024).toFixed(2) + "G"
        }
    }), r.init(), s
}), define("BookDialogController", [], function () {
    var e = avalon.define({
        $id: "BookDialogController",
        copy: 0,
        price: 0,
        visible: !1,
        scrollTop: 0,
        title: "样布卡册",
        btnVisible: !0,
        cancelHandler: function () {
            e.visible = !1
        },
        showHandler: function () {
            e.visible = !0, e.scrollTop = UtilTool.bodyScrollTop() + 100
        },
        toPlaceHandler: function () {
        },
        rePrinting: function () {
            require(["UtilController"], function (e) {
                var t = {};
                t[Session_Step_Key] = JSON.stringify({});
                var n = {};
                for (var i in t)n.key = i, n.value = t[i];
                e.saveAction({
                    url: APITool.session, data: n, callback: function () {
                        location.href = "patternList.html?type=printing"
                    }
                })
            })
        }
    });
    return e
}), function (e) {
    function t(e) {
        null == e && (e = []);
        var n = [e[0] || 1, e[1] || 0, e[2] || 0, e[3] || 1, e[4] || 0, e[5] || 0];
        return n.getAngle = function () {
            return Math.atan2(this[1], this[0])
        }, n.concat = function (e) {
            return t([this[0] * e[0] + this[2] * e[1], this[1] * e[0] + this[3] * e[1], this[0] * e[2] + this[2] * e[3], this[1] * e[2] + this[3] * e[3], this[0] * e[4] + this[2] * e[5] + this[4], this[1] * e[4] + this[3] * e[5] + this[5]])
        }, n.rotate = function (e, n) {
            return this.concat(t.rotate(e, n))
        }, n.setRotation = function (e, t) {
            return this.rotate(e - this.getAngle(), t)
        }, n.scale = function (e, n, i) {
            return this.concat(t.scale(e, n, i))
        }, n.translate = function (e, n) {
            return this.concat(t.translate(e, n))
        }, n.toCSSTransform = function () {
            return "matrix(" + this.join(", ") + ")"
        }, n
    }

    t.rotate = function (e, n) {
        var i = t([Math.cos(e), Math.sin(e), -Math.sin(e), Math.cos(e), 0, 0]);
        return n && (i = t.translate(n[0], n[1]).concat(i).concat(t.translate(-n[0], -n[1]))), i
    }, t.scale = function (e, n, i) {
        n = n || e;
        var o = t([e, 0, 0, n, 0, 0]);
        return i && (o = t.translate(i[0], i[1]).concat(o).concat(t.translate(-i[0], -i[1]))), o
    }, t.translate = function (e, n) {
        return t([1, 0, 0, 1, e, n])
    }, e.Matrix = t
}(window), function (e, t) {
    var n = e.document;
    n.createDragManager = function (i, o, r, a, s) {
        return new function () {
            function l(o) {
                o = e.event || o, UtilTool.preventDefault(o), UtilTool.stopPropagation(o), d = o.pageX, p = o.pageY, f = parseInt(i.style.left, 10) || 0, h = parseInt(i.style.top, 10) || 0, t(n).bind("mousemove", c), t(i).bind("mouseup", u), t(i).css("opacity", .5), m = !0, r.addClass("active")
            }

            function u(o) {
                o = e.event || o, UtilTool.stopPropagation(o), t(n).unbind("mousemove", c), t(i).unbind("mouseup", u), t(i).css("opacity", 1), m = !1
            }

            function c(e) {
                var n = f, r = h, l = e.pageX - d, u = e.pageY - p, c = t(i).data("raw");
                c.left = n + l, c.top = r + u;
                var m = o.data("raw");
                m.left = n + l - a, m.top = r + u - s, t(i).css({
                    left: n + l,
                    top: r + u
                }).data("raw", c), o.css({left: n + l - a, top: r + u - s}).data("raw", m)
            }

            var d = 0, p = 0, f = 0, h = 0, m = !1;
            t(i).css("position", "absolute").unbind("mousedown", l).bind("mousedown", l), o[0].style.transform = Matrix([1, 0, 0, 1, 0, 0]).toCSSTransform()
        }
    }, n.createResizeManager = function (i, o, r, a, s) {
        return new function () {
            function l() {
                var t = e.getComputedStyle(i, null), n = t.getPropertyValue("-webkit-transform") || t.getPropertyValue("-moz-transform") || t.getPropertyValue("-ms-transform") || t.getPropertyValue("-o-transform") || t.getPropertyValue("transform") || null;
                return n = String(n).replace("matrix(", "").replace(")", "").replace(" ", ""), n = n.split(","), Matrix([parseFloat(n[0], 10) || 1, parseFloat(n[1], 10) || 0, parseFloat(n[2], 10) || 0, parseFloat(n[3], 10) || 1, parseFloat(n[4], 10) || 0, parseFloat(n[5], 10) || 0])
            }

            function u(o) {
                o = e.event || o, UtilTool.preventDefault(o), UtilTool.stopPropagation(o), S = !0, f = o, h = o.target, b = f.pageX, x = f.pageY, _ = t(i).width(), w = t(i).height(), t(n).bind("mousemove", d).bind("mouseup", c), t(i).css("opacity", .5)
            }

            function c() {
                t(n).unbind("mousemove", d).unbind("mouseup", c), t(i).css("opacity", 1), S = !1, a.addClass("active")
            }

            function d(e) {
                if (!S)return !1;
                var n = y.angle, a = e.pageX - b, s = e.pageY - x, u = Math.round(s * Math.cos(n) - a * Math.sin(n)), c = u * o, d = Math.round(_), p = Math.round(w);
                if (g.is(h) && (d += Math.round(c), p += Math.round(u)), !(20 > d || 20 > p)) {
                    i.style.width = d + 2 + "px", i.style.height = p + 2 + "px", i.style.transform = l().toCSSTransform(), r[0].style.width = d + "px", r[0].style.height = p + "px", r[0].style.transform = l().toCSSTransform();
                    var f = t(i).data("raw");
                    f.width = d + 2, f.height = p + 2;
                    var m = r.data("raw");
                    m.width = d, m.height = p, t(i).data("raw", f), r.data("raw", m)
                }
            }

            function p() {
                {
                    var e = y.angle + 180 * Math.PI / 360;
                    t(i).width(), t(i).height()
                }
                r[0].style.transform = l().setRotation(e, [0, 0]).toCSSTransform(), i.style.transform = l().setRotation(e, [0, 0]).toCSSTransform(), y.angle = e, y.rotate = (y.rotate + 90) % 360, r.attr("rotate", y.rotate);
                var n = t(i).data("raw");
                n.rotate = y.rotate;
                var o = r.data("raw");
                o.rotate = y.rotate, t(i).data("raw", n), r.data("raw", o)
            }

            var f, h, m = t(n.createElement("div")).addClass("resizeHandler topRightHandler").appendTo(i), g = t(n.createElement("div")).addClass("resizeHandler bottomRightHandler").appendTo(i), v = t(n.createElement("div")).addClass("resizeHandler bottomLeftHandler").appendTo(i), y = this;
            this.angle = 0, this.rotate = 0;
            var b = 0, x = 0, _ = 0, w = 0, S = !1;
            m.bind("click", s), g.bind("mousedown", u), g.bind("mouseup", c), v.bind("click", p)
        }
    }, n.createRotateManager = function (i) {
        return new function () {
            function o(e) {
                e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
                var o = i.getBoundingClientRect(), a = o.left + o.width / 2, l = o.top + o.height / 2;
                u = c = Math.atan2(e.pageY - l, e.pageX - a), t(n).bind("mousemove", s).bind("mouseup", r)
            }

            function r() {
                l.angle = c - u + l.angle, t(n).unbind("mousemove", s).unbind("mouseup", r)
            }

            function a() {
                var t = e.getComputedStyle(i, null), n = t.getPropertyValue("-webkit-transform") || t.getPropertyValue("-moz-transform") || t.getPropertyValue("-ms-transform") || t.getPropertyValue("-o-transform") || t.getPropertyValue("transform") || null;
                return n = String(n).replace("matrix(", "").replace(")", "").replace(" ", ""), n = n.split(","), Matrix([parseFloat(n[0], 10) || 1, parseFloat(n[1], 10) || 0, parseFloat(n[2], 10) || 0, parseFloat(n[3], 10) || 1, parseFloat(n[4], 10) || 0, parseFloat(n[5], 10) || 0])
            }

            function s(e) {
                var n = i.getBoundingClientRect(), o = n.left + n.width / 2, r = n.top + n.height / 2, s = t(i).width(), d = t(i).height(), f = c - u + l.angle, h = 360 * (f > 0 ? f : 2 * Math.PI + f) / (2 * Math.PI);
                i.style.transform = a().setRotation(f, [s / 2, d / 2]).toCSSTransform(), c = Math.atan2(e.pageY - r, e.pageX - o), p.text(Math.round(h))
            }

            var l = this, u = null, c = null, d = t(n.createElement("div")).addClass("rotateHandler").appendTo(i), p = t(n.createElement("span")).addClass("degreePrinter").text("0").appendTo(i);
            this.angle = null, d.bind("mousedown", o)
        }
    };
    var i = {
        draggable: !0, resizable: !0, rotatable: !0, scale: 1, removeHandler: function () {
        }
    };
    t.fn.objectbox = function (e) {
        return e = t.extend({}, i, e), e.scale = e.scale || 1, e.removeHandler = e.removeHandler || function () {
            }, this.each(function () {
            var i = this, o = {angle: 0};
            e.draggable && n.createDragManager(i, e.targetDom, e.displayDom, e.startX, e.startY), e.rotatable && (o = n.createRotateManager(i)), e.resizable && n.createResizeManager(i, e.scale, e.targetDom, e.displayDom, e.removeHandler), e.displayDom.addClass("active"), t("body").mouseup(function () {
                e.displayDom.removeClass("active")
            })
        })
    }
}(window, jQuery), define("ObjectBox", ["jquery"], function (e) {
    return function () {
        var t;
        return t || e.ObjectBox
    }
}(this)), define("ScrollTopController", [], function () {
    function e() {
        var e = t.length, n = Math.floor(Math.random() * e);
        return t[n]
    }

    var t = qq, n = e(), i = avalon.define("ScrollTopController", function (e) {
        e.pageLevel = base, e.qqSrc = "http://wpa.qq.com/msgrd?v=3&uin=" + n + "&site=qq&menu=yes", e.chat = function () {
            window.open(e.qqSrc)
        }, e.help = function () {
            window.open("../question.html")
        }, e.toTop = function () {
            window.scrollTo(0, 0), window.SwiperSlider && void 0 != window.SwiperSlider && SwiperSlider.slideTo(0)
        }
    });
    return i
}), require(["HeaderController", "UtilController", "UploadController", "BookDialogController", "ObjectBox", "ScrollTopController"], function (e, t, n) {
    function i(e) {
        var t = $(".shirt.current"), n = t.find(".box-image"), i = t.find(".object-box");
        i && i.remove(), t.append($("<div class='object-box'></div>")), i = t.find(".object-box");
        var o = e.patternAttr.printSize;
        o[0] = Number(o[0]), o[1] = Number(o[1]);
        var r = e.patternAttr.dpi[0], a = Number((o[0] * r / 400).toFixed(1)), l = Number((o[1] * r / 400).toFixed(1)), c = Number((o[0] * r / 100).toFixed(1)), d = Number((o[1] * r / 100).toFixed(1)), p = 248, f = 359, h = s, m = 215, g = 200, v = p / h, y = Math.round((p - Math.round(a * v)) / 2), b = Math.round((f - Math.round(l * v)) / 2);
        n.css({
            width: Math.round(a * v),
            height: Math.round(l * v),
            maxWidth: Math.round(c * v),
            maxHeight: Math.round(d * v),
            minWidth: Math.round(a * v),
            minHeight: Math.round(l * v),
            left: y,
            top: b
        }).data("raw", {
            rotate: 0,
            serial: e.serialNo,
            unit: v,
            width: Math.round(a * v),
            height: Math.round(l * v),
            maxWidth: Math.round(c * v),
            maxHeight: Math.round(d * v),
            minWidth: Math.round(a * v),
            minHeight: Math.round(l * v),
            left: y,
            top: b
        }), i.css({
            width: Math.round(a * v) + 2,
            height: Math.round(l * v) + 2,
            maxWidth: Math.round(c * v) + 2,
            maxHeight: Math.round(d * v) + 2,
            minWidth: Math.round(a * v) + 2,
            minHeight: Math.round(l * v) + 2,
            left: m + y,
            top: g + b
        }).objectbox({
            resizable: !0,
            rotatable: !1,
            draggable: !0,
            scale: Number((o[0] / o[1]).toFixed(2)),
            targetDom: n,
            displayDom: t,
            startX: m,
            startY: g,
            removeHandler: function () {
                i.remove(), 1 == u.faceIndex && (u.frontPicUrl = ""), 2 == u.faceIndex && (u.backPicUrl = ""), u.calTotalPrice()
            }
        }).data("raw", {
            width: Math.round(a * v) + 2,
            height: Math.round(l * v) + 2,
            maxWidth: Math.round(c * v) + 2,
            maxHeight: Math.round(d * v) + 2,
            minWidth: Math.round(a * v) + 2,
            minHeight: Math.round(l * v) + 2,
            left: m + y,
            top: g + b
        })
    }

    function o() {
        function e(e) {
            if (!e || !e.length)return null;
            var t = e.data("raw");
            t.width = Math.min(t.width, t.maxWidth), t.height = Math.min(t.height, t.maxHeight);
            var n = Number((t.width / t.unit).toFixed(1)), i = Number((t.height / t.unit).toFixed(1));
            return t.serial ? {
                patternSerial: t.serial,
                angle: t.rotate || 0,
                width: n.toFixed(2),
                height: i.toFixed(2),
                xPosition: Number((t.left / t.unit).toFixed(1)),
                yPosition: Number((t.top / t.unit).toFixed(1))
            } : void 0
        }

        var t = $(".front .box-image"), n = $(".back .box-image");
        return {front: e(t), back: e(n)}
    }

    e.init(), e.setCurrent("custom");
    var r = [{
        id: 11287,
        name: "全棉",
        skus: [{
            fabricTypeCate: "Fiber",
            id: 1469,
            inventory: 1111100,
            modifiedPrice: null,
            price: 0,
            name: "全棉",
            width: 100
        }]
    }], a = {
        "黑S2": 12,
        "黑S1": 9,
        "黑S0": 9,
        "黑M2": 13,
        "黑M1": 10,
        "黑M0": 10,
        "黑L2": 14,
        "黑L1": 11,
        "黑L0": 11,
        "白S2": 18,
        "白S1": 15,
        "白S0": 15,
        "白M2": 19,
        "白M1": 16,
        "白M0": 16,
        "白L2": 20,
        "白L1": 17,
        "白L0": 17
    }, s = 31, l = 46, u = avalon.define("CustomShirtController", function (n) {
        n.patternList = [], n.copy = 1, n.totalPrice = 0, n.shirtUrl = "", n.frontPicUrl = "", n.backPicUrl = "", n.faceIndex = 1, n.faceHandle = function (e, t) {
            t = window.event || t, UtilTool.stopPropagation(t), u.faceIndex = e, u.shirtUrl = u.getShirtUrl()
        }, n.colorList = [{value: "黑"}, {value: "白"}], n.colorIndex = 0, n.colorHandle = function (e, t) {
            u.colorIndex = t, u.shirtUrl = u.getShirtUrl(), u.calTotalPrice()
        }, n.sizeList = [{value: 160, size: "S"}, {value: 170, size: "M"}, {
            value: 180,
            size: "L"
        }], n.sizeIndex = 0, n.sizeHandle = function (e, t) {
            u.sizeIndex = t
        }, n.changeCopy = function (e) {
            if ("reduce" == e)u.copy = Math.max(1, u.copy - 1); else if ("add" == e)u.copy++; else {
                var t = /^[1-9]+[0-9]*]*$/;
                t.test(u.copy) || (u.copy = 1)
            }
            u.calTotalPrice()
        }, n.patternSelectHandler = function (e, t) {
            if (t = window.event || t, UtilTool.stopPropagation(t), 1 == u.faceIndex) {
                if (u.frontPicUrl.indexOf(e.serialNo) >= 0)return;
                u.frontPicUrl = APITool.getUserPicUrl(e.serialNo, 800, 800)
            } else {
                if (u.backPicUrl.indexOf(e.serialNo) >= 0)return;
                u.backPicUrl = APITool.getUserPicUrl(e.serialNo, 800, 800)
            }
            i(e), u.calTotalPrice()
        }, n.calTotalPrice = function () {
            var e = 0;
            e = u.frontPicUrl && u.backPicUrl ? 0 == u.colorIndex ? 74.8 : 54.8 : 0 == u.colorIndex ? 49.8 : 39.8, u.totalPrice = Number((e * u.copy).toFixed(1))
        }, n.addToCart = function () {
            function n(e) {
                avalon.each(p, function (t, n) {
                    e ? (n.patternSerial = e.value[t], i.front && n.orderItemResourceList.push({
                        copy: 1,
                        memo: "正面",
                        resourceSerial: e.value[0],
                        rotate: 0,
                        toningType: 0
                    }), i.back && n.orderItemResourceList.push({
                        copy: 1,
                        memo: "背面",
                        resourceSerial: 2 == e.value.length ? e.value[1] : e.value[0],
                        rotate: 0,
                        toningType: 0
                    }), i.front && i.back ? (n.memo += ";2张图】", n.serviceComment += ";2张图】") : i.front ? (n.memo += ";1张图正面】", n.serviceComment += ";1张图正面】") : (n.memo += ";1张图背面】", n.serviceComment += ";1张图背面】")) : (n.patternSerial = "", n.needMerged = !0, n.memo += ";无图】", n.serviceComment += ";无图】")
                }), t.saveAction({
                    url: APITool.addToShoppingCart, data: p, callback: function (e) {
                        e.success && require(["ArtDialogPlugin", "text!views/addToCart.html"], function (e, t) {
                            var n = dialog({title: "加入购物车", fixed: !0, width: 600, height: 230, content: t + ""});
                            n.showModal(), avalon.scan()
                        })
                    }
                })
            }

            e.login || (alert("点击确定跳转到登录页面。"), location.href = base + "sign/signIn.html?from=" + encodeURIComponent(location.href));
            var i = o(), a = r[0], c = [];
            i.front && c.push({
                length: l,
                width: s,
                returnRepeat: "独幅",
                patterns: [i.front],
                needMerged: !0,
                type: "TSHIRT"
            }), i.back && c.push({
                length: l,
                width: s,
                returnRepeat: "独幅",
                patterns: [i.back],
                needMerged: !0,
                type: "TSHIRT"
            });
            var d = u.getSkuInfo(c), p = [{
                type: 4,
                copy: Number(u.copy),
                patternSerial: "",
                orderItemResourceList: [],
                customFactoryRelatedTech: {id: d.skuId},
                returnRepeat: "独幅",
                length: l,
                printLength: l,
                sku: {id: a.skus[0].id},
                source: "ALLADIN",
                needMerged: !0,
                revisedPrice: Number(u.totalPrice),
                memo: "【定制间：T恤;面料：" + a.skus[0].name + ";颜色：" + d.color + ";尺码：" + d.size,
                serviceComment: "【定制间：T恤;面料：" + a.skus[0].name + ";颜色：" + d.color + ";尺码：" + d.size
            }];
            i.front || i.back ? t.saveAction({
                url: APITool.mergeImage, data: c, callback: function (e) {
                    n(e)
                }
            }) : n()
        }, n.placeOrderNow = function () {
            function n(e) {
                avalon.each(p, function (t, n) {
                    e ? (n.patternSerial = e.value[t], n.thumbUrl = APITool.getUserPicUrl(e.value[t]), i.front && n.orderItemResourceList.push({
                        copy: 1,
                        memo: "正面",
                        resourceSerial: e.value[0],
                        rotate: 0,
                        toningType: 0
                    }), i.back && n.orderItemResourceList.push({
                        copy: 1,
                        memo: "背面",
                        resourceSerial: 2 == e.value.length ? e.value[1] : e.value[0],
                        rotate: 0,
                        toningType: 0
                    })) : (n.patternSerial = "", n.thumbUrl = "images/shirt/ht1.png", 1 == u.colorIndex && (n.thumbUrl = "images/shirt/bt1.png")), i.front && i.back ? (n.memo += ";2张图】", n.serviceComment += ";2张图】") : i.front ? (n.memo += ";1张图正面】", n.serviceComment += ";1张图正面】") : i.back ? (n.memo += ";1张图背面】", n.serviceComment += ";1张图背面】") : (n.memo += ";无图】", n.serviceComment += ";无图】")
                });
                var n = [{
                    fabricInfo: {
                        name: a.skus[0].name,
                        width: a.skus[0].width,
                        price: a.skus[0].price,
                        type: a.fabricTypeCate
                    }, items: p, type: "shirt", printLen: l, totalPrice: u.totalPrice, totalPriceThrough: u.totalPrice
                }], o = {};
                o[Session_Order_Key] = JSON.stringify(n);
                var r = {};
                for (var s in o)r.key = s, r.value = o[s];
                t.saveAction({
                    url: APITool.session, data: r, callback: function () {
                        location.href = base + "buyNow.html?from=now"
                    }
                })
            }

            e.login || (alert("点击确定跳转到登录页面。"), location.href = base + "sign/signIn.html?from=" + encodeURIComponent(location.href));
            var i = o(), a = r[0], c = [];
            i.front && c.push({
                length: l,
                width: s,
                returnRepeat: "独幅",
                patterns: [i.front],
                needMerged: !0,
                type: "TSHIRT"
            }), i.back && c.push({
                length: l,
                width: s,
                returnRepeat: "独幅",
                patterns: [i.back],
                needMerged: !0,
                type: "TSHIRT"
            });
            var d = u.getSkuInfo(c), p = [{
                type: 4,
                copy: Number(u.copy),
                patternSerial: "",
                orderItemResourceList: [],
                customFactoryRelatedTech: {id: d.skuId},
                returnRepeat: "独幅",
                length: l,
                printLength: l,
                sku: {id: a.skus[0].id},
                source: "ALLADIN",
                needMerged: !0,
                price: Number(u.totalPrice),
                priceInfo: {unitPrice: Number(u.totalPrice / u.copy)},
                productInfoText: "",
                memo: "【定制间：T恤;面料：" + a.skus[0].name + ";颜色：" + d.color + ";尺码：" + d.size,
                serviceComment: "【定制间：T恤;面料：" + a.skus[0].name + ";颜色：" + d.color + ";尺码：" + d.size,
                skuInfoText: "<p>T恤定制</p><p>份数" + u.copy + "</p><p>面料：" + a.skus[0].name + "</p><p>颜色：" + d.color + "</p><p>尺码：" + d.size + "</p>"
            }];
            i.front || i.back ? t.saveAction({
                url: APITool.mergeImage, data: c, callback: function (e) {
                    n(e)
                }
            }) : n()
        }, n.init = function () {
            u.shirtUrl = u.getShirtUrl(), u.getPatternList(), u.calTotalPrice()
        }, n.sizeTable = function () {
            require(["ArtDialogPlugin", "text!views/sizeTable.html"], function (e, t) {
                var n = dialog({title: "尺码信息", fixed: !0, width: 700, height: 230, content: t});
                n.showModal()
            })
        }, n.getShirtUrl = function () {
            var e = "images/shirt/";
            return e = 0 == u.colorIndex ? e + "ht" + u.faceIndex + ".png" : e + "bt" + u.faceIndex + ".png"
        }, n.getPatternList = function () {
            var e = {start: 0, limit: 1e3, type: "PATTERNIMG", sortField: {createDate: "desc"}};
            t.saveAction({
                url: APITool.myImagesNew, data: e, callback: function (e) {
                    e.success && (avalon.each(e.list, function (e, t) {
                        t.thumbUrl = APITool.getUserPicUrl(t.serialNo), t.select = !1, t.printSize = t.patternAttr.resolution
                    }), u.patternList = e.list), avalon.each(u.patternList, function (e, t) {
                        t.thumbUrl = APITool.getUserPicUrl(t.serialNo)
                    })
                }
            })
        }, n.getSkuInfo = function (e) {
            var t = {color: "黑", size: u.sizeList[u.sizeIndex].size};
            1 == u.colorIndex && (t.color = "白");
            var n = t.color + t.size + e.length;
            return t.skuId = a[n], t
        }
    });
    u.init(), n.needUpload = !0, n.confirmCallback = function () {
        u.getPatternList()
    }, avalon.scan()
}), define("controllers/CustomShirtController", function () {
});