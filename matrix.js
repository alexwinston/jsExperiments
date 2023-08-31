// https://code.tutsplus.com/tutorials/understanding-affine-transformations-with-matrix-mathematics--active-10884
// https://github.com/chrvadala/transformation-matrix
!function(r, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Matrix = t() : r.Matrix = t()
}(self, (() => (() => {
    "use strict";
    var r = {
            d: (t, e) => {
                for (var n in e)
                    r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
                        enumerable: !0,
                        get: e[n]
                    })
            },
            o: (r, t) => Object.prototype.hasOwnProperty.call(r, t),
            r: r => {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(r, "__esModule", {
                    value: !0
                })
            }
        },
        t = {};
    function e(r, t) {
        return Array.isArray(t) ? [r.a * t[0] + r.c * t[1] + r.e, r.b * t[0] + r.d * t[1] + r.f] : {
            x: r.a * t.x + r.c * t.y + r.e,
            y: r.b * t.x + r.d * t.y + r.f
        }
    }
    function n(r, t) {
        return t.map((function(t) {
            return e(r, t)
        }))
    }
    function o(r) {
        return {
            a: parseFloat(r.a),
            b: parseFloat(r.b),
            c: parseFloat(r.c),
            d: parseFloat(r.d),
            e: parseFloat(r.e),
            f: parseFloat(r.f)
        }
    }
    r.r(t),
    r.d(t, {
        apply: () => e,
        applyToPoints: () => n,
        compose: () => m,
        decomposeTSR: () => U,
        flipOrigin: () => L,
        flipX: () => q,
        flipY: () => $,
        fromDefinition: () => D,
        fromObject: () => o,
        fromOneMovingPoint: () => V,
        fromString: () => i,
        fromTransformAttribute: () => X,
        fromTriangles: () => N,
        fromTwoMovingPoints: () => z,
        identity: () => u,
        inverse: () => c,
        isAffineMatrix: () => p,
        rotate: () => S,
        rotateDEG: () => j,
        scale: () => C,
        shear: () => I,
        skew: () => P,
        skewDEG: () => O,
        smoothMatrix: () => T,
        toCSS: () => _,
        toSVG: () => F,
        toString: () => R,
        transform: () => x,
        translate: () => h
    });
    var a = /^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i;
    function i(r) {
        var t = r.match(a);
        if (null === t || t.length < 7)
            throw new Error("'".concat(r, "' is not a matrix"));
        return {
            a: parseFloat(t[1]),
            b: parseFloat(t[2]),
            c: parseFloat(t[3]),
            d: parseFloat(t[4]),
            e: parseFloat(t[5]),
            f: parseFloat(t[6])
        }
    }
    function u() {
        return {
            a: 1,
            c: 0,
            e: 0,
            b: 0,
            d: 1,
            f: 0
        }
    }
    function c(r) {
        var t = r.a,
            e = r.b,
            n = r.c,
            o = r.d,
            a = r.e,
            i = r.f,
            u = t * o - e * n;
        return {
            a: o / u,
            b: e / -u,
            c: n / -u,
            d: t / u,
            e: (o * a - n * i) / -u,
            f: (e * a - t * i) / u
        }
    }
    function l(r) {
        return l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
            return typeof r
        } : function(r) {
            return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r
        }, l(r)
    }
    function f(r) {
        return void 0 === r
    }
    function s(r) {
        return "number" == typeof r && !Number.isNaN(r) && Number.isFinite(r)
    }
    function p(r) {
        return "object" === l(t = r) && null !== t && !Array.isArray(t) && "a" in r && s(r.a) && "b" in r && s(r.b) && "c" in r && s(r.c) && "d" in r && s(r.d) && "e" in r && s(r.e) && "f" in r && s(r.f);
        var t
    }
    function h(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        return {
            a: 1,
            c: 0,
            e: r,
            b: 0,
            d: 1,
            f: t
        }
    }
    function y(r) {
        return function(r) {
                if (Array.isArray(r))
                    return b(r)
            }(r) || g(r) || v(r) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
    }
    function d(r) {
        return function(r) {
                if (Array.isArray(r))
                    return r
            }(r) || g(r) || v(r) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
    }
    function v(r, t) {
        if (r) {
            if ("string" == typeof r)
                return b(r, t);
            var e = Object.prototype.toString.call(r).slice(8, -1);
            return "Object" === e && r.constructor && (e = r.constructor.name), "Map" === e || "Set" === e ? Array.from(r) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? b(r, t) : void 0
        }
    }
    function b(r, t) {
        (null == t || t > r.length) && (t = r.length);
        for (var e = 0, n = new Array(t); e < t; e++)
            n[e] = r[e];
        return n
    }
    function g(r) {
        if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"])
            return Array.from(r)
    }
    function x() {
        for (var r = arguments.length, t = new Array(r), e = 0; e < r; e++)
            t[e] = arguments[e];
        var n = function(r, t) {
            return {
                a: r.a * t.a + r.c * t.b,
                c: r.a * t.c + r.c * t.d,
                e: r.a * t.e + r.c * t.f + r.e,
                b: r.b * t.a + r.d * t.b,
                d: r.b * t.c + r.d * t.d,
                f: r.b * t.e + r.d * t.f + r.f
            }
        };
        switch ((t = Array.isArray(t[0]) ? t[0] : t).length) {
        case 0:
            throw new Error("no matrices provided");
        case 1:
            return t[0];
        case 2:
            return n(t[0], t[1]);
        default:
            var o = t,
                a = d(o),
                i = a[0],
                u = a[1],
                c = a.slice(2),
                l = n(i, u);
            return x.apply(void 0, [l].concat(y(c)))
        }
    }
    function m() {
        return x.apply(void 0, arguments)
    }
    var A = Math.cos,
        M = Math.sin,
        w = Math.PI;
    function S(r, t, e) {
        var n = A(r),
            o = M(r),
            a = {
                a: n,
                c: -o,
                e: 0,
                b: o,
                d: n,
                f: 0
            };
        return f(t) || f(e) ? a : x([h(t, e), a, h(-t, -e)])
    }
    function j(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
        return S(r * w / 180, t, e)
    }
    function C(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
            n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : void 0;
        f(t) && (t = r);
        var o = {
            a: r,
            c: 0,
            e: 0,
            b: 0,
            d: t,
            f: 0
        };
        return f(e) || f(n) ? o : x([h(e, n), o, h(-e, -n)])
    }
    function I(r, t) {
        return {
            a: 1,
            c: r,
            e: 0,
            b: t,
            d: 1,
            f: 0
        }
    }
    var E = Math.tan;
    function P(r, t) {
        return {
            a: 1,
            c: E(r),
            e: 0,
            b: E(t),
            d: 1,
            f: 0
        }
    }
    function O(r, t) {
        return P(r * Math.PI / 180, t * Math.PI / 180)
    }
    function _(r) {
        return R(r)
    }
    function F(r) {
        return R(r)
    }
    function R(r) {
        return "matrix(".concat(r.a, ",").concat(r.b, ",").concat(r.c, ",").concat(r.d, ",").concat(r.e, ",").concat(r.f, ")")
    }
    function T(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e10;
        return {
            a: Math.round(r.a * t) / t,
            b: Math.round(r.b * t) / t,
            c: Math.round(r.c * t) / t,
            d: Math.round(r.d * t) / t,
            e: Math.round(r.e * t) / t,
            f: Math.round(r.f * t) / t
        }
    }
    function N(r, t) {
        var e = null != r[0].x ? r[0].x : r[0][0],
            n = null != r[0].y ? r[0].y : r[0][1],
            o = null != t[0].x ? t[0].x : t[0][0],
            a = null != t[0].y ? t[0].y : t[0][1],
            i = null != r[1].x ? r[1].x : r[1][0],
            u = null != r[1].y ? r[1].y : r[1][1],
            l = null != t[1].x ? t[1].x : t[1][0],
            f = null != t[1].y ? t[1].y : t[1][1],
            s = null != r[2].x ? r[2].x : r[2][0],
            p = null != r[2].y ? r[2].y : r[2][1],
            h = null != t[2].x ? t[2].x : t[2][0],
            y = null != t[2].y ? t[2].y : t[2][1];
        return T(x([{
            a: o - h,
            b: a - y,
            c: l - h,
            d: f - y,
            e: h,
            f: y
        }, c({
            a: e - s,
            b: n - p,
            c: i - s,
            d: u - p,
            e: s,
            f: p
        })]))
    }
    function D(r) {
        return Array.isArray(r) ? r.map(t) : t(r);
        function t(r) {
            switch (r.type) {
            case "matrix":
                if ("a" in r && "b" in r && "c" in r && "d" in r && "e" in r && "f" in r)
                    return o(r);
                throw new Error("MISSING_MANDATORY_PARAM");
            case "translate":
                if (!("tx" in r))
                    throw new Error("MISSING_MANDATORY_PARAM");
                return "ty" in r ? h(r.tx, r.ty) : h(r.tx);
            case "scale":
                if (!("sx" in r))
                    throw new Error("MISSING_MANDATORY_PARAM");
                return "sy" in r ? C(r.sx, r.sy) : C(r.sx);
            case "rotate":
                if (!("angle" in r))
                    throw new Error("MISSING_MANDATORY_PARAM");
                return "cx" in r && "cy" in r ? j(r.angle, r.cx, r.cy) : j(r.angle);
            case "skewX":
                if (!("angle" in r))
                    throw new Error("MISSING_MANDATORY_PARAM");
                return O(r.angle, 0);
            case "skewY":
                if (!("angle" in r))
                    throw new Error("MISSING_MANDATORY_PARAM");
                return O(0, r.angle);
            case "shear":
                if (!("shx" in r) || !("shy" in r))
                    throw new Error("MISSING_MANDATORY_PARAM");
                return I(r.shx, r.shy);
            default:
                throw new Error("UNSUPPORTED_DESCRIPTOR")
            }
        }
    }
    function Y(r, t, e, n) {
        var o = Error.call(this, r);
        return Object.setPrototypeOf && Object.setPrototypeOf(o, Y.prototype), o.expected = t, o.found = e, o.location = n, o.name = "SyntaxError", o
    }
    function k(r, t, e) {
        return e = e || " ", r.length > t ? r : (t -= r.length, r + (e += e.repeat(t)).slice(0, t))
    }
    function G(r, t) {
        var e,
            n,
            o,
            a,
            i = {},
            u = (t = void 0 !== t ? t : {}).grammarSource,
            c = {
                transformList: H
            },
            l = H,
            f = "matrix",
            s = "(",
            p = ")",
            h = "translate",
            y = "scale",
            d = "rotate",
            v = "skewX",
            b = "skewY",
            g = /^[eE]/,
            x = /^[+\-]/,
            m = /^[0-9]/,
            A = /^[ \t\r\n]/,
            M = $("matrix", !1),
            w = $("(", !1),
            S = $(")", !1),
            j = $("translate", !1),
            C = $("scale", !1),
            I = $("rotate", !1),
            E = $("skewX", !1),
            P = $("skewY", !1),
            O = $(",", !1),
            _ = {
                type: "other",
                description: "fractionalConstant"
            },
            F = $(".", !1),
            R = L(["e", "E"], !1, !1),
            T = L(["+", "-"], !1, !1),
            N = L([["0", "9"]], !1, !1),
            D = L([" ", "\t", "\r", "\n"], !1, !1),
            k = 0,
            G = [{
                line: 1,
                column: 1
            }],
            X = 0,
            U = [],
            q = 0;
        if ("startRule" in t) {
            if (!(t.startRule in c))
                throw new Error("Can't start parsing from rule \"" + t.startRule + '".');
            l = c[t.startRule]
        }
        function $(r, t) {
            return {
                type: "literal",
                text: r,
                ignoreCase: t
            }
        }
        function L(r, t, e) {
            return {
                type: "class",
                parts: r,
                inverted: t,
                ignoreCase: e
            }
        }
        function V(t) {
            var e,
                n = G[t];
            if (n)
                return n;
            for (e = t - 1; !G[e];)
                e--;
            for (n = {
                line: (n = G[e]).line,
                column: n.column
            }; e < t;)
                10 === r.charCodeAt(e) ? (n.line++, n.column = 1) : n.column++,
                e++;
            return G[t] = n, n
        }
        function z(r, t) {
            var e = V(r),
                n = V(t);
            return {
                source: u,
                start: {
                    offset: r,
                    line: e.line,
                    column: e.column
                },
                end: {
                    offset: t,
                    line: n.line,
                    column: n.column
                }
            }
        }
        function B(r) {
            k < X || (k > X && (X = k, U = []), U.push(r))
        }
        function H() {
            var r,
                t,
                e,
                n;
            for (k, r = [], t = ar(); t !== i;)
                r.push(t),
                t = ar();
            for ((t = J()) === i && (t = null), e = [], n = ar(); n !== i;)
                e.push(n),
                n = ar();
            return t
        }
        function J() {
            var r,
                t,
                e,
                n,
                o;
            if (r = k, (t = K()) !== i) {
                if (e = [], (n = Z()) !== i)
                    for (; n !== i;)
                        e.push(n),
                        n = Z();
                else
                    e = i;
                e !== i && (n = J()) !== i ? (o = n, r = t.concat(o)) : (k = r, r = i)
            } else
                k = r,
                r = i;
            return r === i && (r = K()), r
        }
        function K() {
            var t;
            return (t = function() {
                var t,
                    e,
                    n,
                    o,
                    a,
                    u,
                    c,
                    l,
                    h,
                    y,
                    d,
                    v,
                    b;
                if (t = k, r.substr(k, 6) === f ? (e = f, k += 6) : (e = i, 0 === q && B(M)), e !== i) {
                    for (n = [], o = ar(); o !== i;)
                        n.push(o),
                        o = ar();
                    if (40 === r.charCodeAt(k) ? (o = s, k++) : (o = i, 0 === q && B(w)), o !== i) {
                        for (a = [], u = ar(); u !== i;)
                            a.push(u),
                            u = ar();
                        if ((u = Q()) !== i)
                            if (Z() !== i)
                                if ((c = Q()) !== i)
                                    if (Z() !== i)
                                        if ((l = Q()) !== i)
                                            if (Z() !== i)
                                                if ((h = Q()) !== i)
                                                    if (Z() !== i)
                                                        if ((y = Q()) !== i)
                                                            if (Z() !== i)
                                                                if ((d = Q()) !== i) {
                                                                    for (v = [], b = ar(); b !== i;)
                                                                        v.push(b),
                                                                        b = ar();
                                                                    41 === r.charCodeAt(k) ? (b = p, k++) : (b = i, 0 === q && B(S)),
                                                                    b !== i ? t = [{
                                                                        type: "matrix",
                                                                        a: u,
                                                                        b: c,
                                                                        c: l,
                                                                        d: h,
                                                                        e: y,
                                                                        f: d
                                                                    }] : (k = t, t = i)
                                                                } else
                                                                    k = t,
                                                                    t = i;
                                                            else
                                                                k = t,
                                                                t = i;
                                                        else
                                                            k = t,
                                                            t = i;
                                                    else
                                                        k = t,
                                                        t = i;
                                                else
                                                    k = t,
                                                    t = i;
                                            else
                                                k = t,
                                                t = i;
                                        else
                                            k = t,
                                            t = i;
                                    else
                                        k = t,
                                        t = i;
                                else
                                    k = t,
                                    t = i;
                            else
                                k = t,
                                t = i;
                        else
                            k = t,
                            t = i
                    } else
                        k = t,
                        t = i
                } else
                    k = t,
                    t = i;
                return t
            }()) === i && (t = function() {
                var t,
                    e,
                    n,
                    o,
                    a,
                    u,
                    c,
                    l,
                    f,
                    y,
                    d;
                if (t = k, r.substr(k, 9) === h ? (e = h, k += 9) : (e = i, 0 === q && B(j)), e !== i) {
                    for (n = [], o = ar(); o !== i;)
                        n.push(o),
                        o = ar();
                    if (40 === r.charCodeAt(k) ? (o = s, k++) : (o = i, 0 === q && B(w)), o !== i) {
                        for (a = [], u = ar(); u !== i;)
                            a.push(u),
                            u = ar();
                        if ((u = Q()) !== i) {
                            for ((c = W()) === i && (c = null), l = [], f = ar(); f !== i;)
                                l.push(f),
                                f = ar();
                            41 === r.charCodeAt(k) ? (f = p, k++) : (f = i, 0 === q && B(S)),
                            f !== i ? (d = {
                                type: "translate",
                                tx: u
                            }, (y = c) && (d.ty = y), t = [d]) : (k = t, t = i)
                        } else
                            k = t,
                            t = i
                    } else
                        k = t,
                        t = i
                } else
                    k = t,
                    t = i;
                return t
            }()) === i && (t = function() {
                var t,
                    e,
                    n,
                    o,
                    a,
                    u,
                    c,
                    l,
                    f,
                    h,
                    d;
                if (t = k, r.substr(k, 5) === y ? (e = y, k += 5) : (e = i, 0 === q && B(C)), e !== i) {
                    for (n = [], o = ar(); o !== i;)
                        n.push(o),
                        o = ar();
                    if (40 === r.charCodeAt(k) ? (o = s, k++) : (o = i, 0 === q && B(w)), o !== i) {
                        for (a = [], u = ar(); u !== i;)
                            a.push(u),
                            u = ar();
                        if ((u = Q()) !== i) {
                            for ((c = W()) === i && (c = null), l = [], f = ar(); f !== i;)
                                l.push(f),
                                f = ar();
                            41 === r.charCodeAt(k) ? (f = p, k++) : (f = i, 0 === q && B(S)),
                            f !== i ? (d = {
                                type: "scale",
                                sx: u
                            }, (h = c) && (d.sy = h), t = [d]) : (k = t, t = i)
                        } else
                            k = t,
                            t = i
                    } else
                        k = t,
                        t = i
                } else
                    k = t,
                    t = i;
                return t
            }()) === i && (t = function() {
                var t,
                    e,
                    n,
                    o,
                    a,
                    u,
                    c,
                    l,
                    f,
                    h,
                    y;
                if (t = k, r.substr(k, 6) === d ? (e = d, k += 6) : (e = i, 0 === q && B(I)), e !== i) {
                    for (n = [], o = ar(); o !== i;)
                        n.push(o),
                        o = ar();
                    if (40 === r.charCodeAt(k) ? (o = s, k++) : (o = i, 0 === q && B(w)), o !== i) {
                        for (a = [], u = ar(); u !== i;)
                            a.push(u),
                            u = ar();
                        if ((u = Q()) !== i) {
                            for (c = function() {
                                var r,
                                    t,
                                    e;
                                return r = k, Z() !== i && (t = Q()) !== i && Z() !== i && (e = Q()) !== i ? r = [t, e] : (k = r, r = i), r
                            }(), c === i && (c = null), l = [], f = ar(); f !== i;)
                                l.push(f),
                                f = ar();
                            41 === r.charCodeAt(k) ? (f = p, k++) : (f = i, 0 === q && B(S)),
                            f !== i ? (y = {
                                type: "rotate",
                                angle: u
                            }, (h = c) && (y.cx = h[0], y.cy = h[1]), t = [y]) : (k = t, t = i)
                        } else
                            k = t,
                            t = i
                    } else
                        k = t,
                        t = i
                } else
                    k = t,
                    t = i;
                return t
            }()) === i && (t = function() {
                var t,
                    e,
                    n,
                    o,
                    a,
                    u,
                    c,
                    l;
                if (t = k, r.substr(k, 5) === v ? (e = v, k += 5) : (e = i, 0 === q && B(E)), e !== i) {
                    for (n = [], o = ar(); o !== i;)
                        n.push(o),
                        o = ar();
                    if (40 === r.charCodeAt(k) ? (o = s, k++) : (o = i, 0 === q && B(w)), o !== i) {
                        for (a = [], u = ar(); u !== i;)
                            a.push(u),
                            u = ar();
                        if ((u = Q()) !== i) {
                            for (c = [], l = ar(); l !== i;)
                                c.push(l),
                                l = ar();
                            41 === r.charCodeAt(k) ? (l = p, k++) : (l = i, 0 === q && B(S)),
                            l !== i ? t = [{
                                type: "skewX",
                                angle: u
                            }] : (k = t, t = i)
                        } else
                            k = t,
                            t = i
                    } else
                        k = t,
                        t = i
                } else
                    k = t,
                    t = i;
                return t
            }()) === i && (t = function() {
                var t,
                    e,
                    n,
                    o,
                    a,
                    u,
                    c,
                    l;
                if (t = k, r.substr(k, 5) === b ? (e = b, k += 5) : (e = i, 0 === q && B(P)), e !== i) {
                    for (n = [], o = ar(); o !== i;)
                        n.push(o),
                        o = ar();
                    if (40 === r.charCodeAt(k) ? (o = s, k++) : (o = i, 0 === q && B(w)), o !== i) {
                        for (a = [], u = ar(); u !== i;)
                            a.push(u),
                            u = ar();
                        if ((u = Q()) !== i) {
                            for (c = [], l = ar(); l !== i;)
                                c.push(l),
                                l = ar();
                            41 === r.charCodeAt(k) ? (l = p, k++) : (l = i, 0 === q && B(S)),
                            l !== i ? t = [{
                                type: "skewY",
                                angle: u
                            }] : (k = t, t = i)
                        } else
                            k = t,
                            t = i
                    } else
                        k = t,
                        t = i
                } else
                    k = t,
                    t = i;
                return t
            }()), t
        }
        function Q() {
            var t,
                e,
                n,
                o;
            return t = k, e = k, (n = er()) === i && (n = null), o = function() {
                var t,
                    e,
                    n;
                return t = k, e = function() {
                    var t,
                        e,
                        n,
                        o,
                        a,
                        u;
                    return q++, t = k, (e = nr()) === i && (e = null), 46 === r.charCodeAt(k) ? (n = ".", k++) : (n = i, 0 === q && B(F)), n !== i && (o = nr()) !== i ? (u = o, t = [(a = e) ? a.join("") : null, ".", u.join("")].join("")) : (k = t, t = i), t === i && (t = k, (e = nr()) !== i ? (46 === r.charCodeAt(k) ? (n = ".", k++) : (n = i, 0 === q && B(F)), n !== i ? t = e.join("") : (k = t, t = i)) : (k = t, t = i)), q--, t === i && (e = i, 0 === q && B(_)), t
                }(), e !== i ? ((n = tr()) === i && (n = null), t = [e, n || null].join("")) : (k = t, t = i), t === i && (t = k, (e = nr()) !== i && (n = tr()) !== i ? t = [e, n].join("") : (k = t, t = i)), t
            }(), o !== i ? e = n = [n, o] : (k = e, e = i), e !== i && (e = parseFloat(e.join(""))), (t = e) === i && (t = k, e = k, (n = er()) === i && (n = null), o = function() {
                var r;
                return k, (r = nr()) !== i && (r = r.join("")), r
            }(), o !== i ? e = n = [n, o] : (k = e, e = i), e !== i && (e = parseInt(e.join(""))), t = e), t
        }
        function W() {
            var r,
                t;
            return r = k, Z() !== i && (t = Q()) !== i ? r = t : (k = r, r = i), r
        }
        function Z() {
            var r,
                t,
                e,
                n,
                o;
            if (r = k, t = [], (e = ar()) !== i)
                for (; e !== i;)
                    t.push(e),
                    e = ar();
            else
                t = i;
            if (t !== i) {
                for ((e = rr()) === i && (e = null), n = [], o = ar(); o !== i;)
                    n.push(o),
                    o = ar();
                r = t = [t, e, n]
            } else
                k = r,
                r = i;
            if (r === i)
                if (r = k, (t = rr()) !== i) {
                    for (e = [], n = ar(); n !== i;)
                        e.push(n),
                        n = ar();
                    r = t = [t, e]
                } else
                    k = r,
                    r = i;
            return r
        }
        function rr() {
            var t;
            return 44 === r.charCodeAt(k) ? (t = ",", k++) : (t = i, 0 === q && B(O)), t
        }
        function tr() {
            var t,
                e,
                n,
                o;
            return t = k, g.test(r.charAt(k)) ? (e = r.charAt(k), k++) : (e = i, 0 === q && B(R)), e !== i ? ((n = er()) === i && (n = null), (o = nr()) !== i ? t = ["e", n, o.join("")].join("") : (k = t, t = i)) : (k = t, t = i), t
        }
        function er() {
            var t;
            return x.test(r.charAt(k)) ? (t = r.charAt(k), k++) : (t = i, 0 === q && B(T)), t
        }
        function nr() {
            var r,
                t;
            if (r = [], (t = or()) !== i)
                for (; t !== i;)
                    r.push(t),
                    t = or();
            else
                r = i;
            return r
        }
        function or() {
            var t;
            return m.test(r.charAt(k)) ? (t = r.charAt(k), k++) : (t = i, 0 === q && B(N)), t
        }
        function ar() {
            var t;
            return A.test(r.charAt(k)) ? (t = r.charAt(k), k++) : (t = i, 0 === q && B(D)), t
        }
        if ((e = l()) !== i && k === r.length)
            return e;
        throw e !== i && k < r.length && B({
            type: "end"
        }), n = U, o = X < r.length ? r.charAt(X) : null, a = X < r.length ? z(X, X + 1) : z(X, X), new Y(Y.buildMessage(n, o), n, o, a)
    }
    function X(r) {
        return G(r)
    }
    function U(r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        t ? r = m(r, C(e ? -1 : 1, -1)) : e && (r = m(r, C(-1, 1)));
        var n,
            o,
            a,
            i = r.a,
            u = r.b,
            c = r.c,
            l = r.d;
        if (0 !== i || 0 !== c) {
            var f = Math.hypot(i, c);
            n = f,
            o = (i * l - u * c) / f;
            var s = Math.acos(i / f);
            a = c > 0 ? -s : s
        } else if (0 !== u || 0 !== l) {
            var p = Math.hypot(u, l);
            n = (i * l - u * c) / p,
            o = p;
            var h = Math.acos(u / p);
            a = Math.PI / 2 + (l > 0 ? -h : h)
        } else
            n = 0,
            o = 0,
            a = 0;
        return e && (n = -n), t && (o = -o), {
            translate: {
                tx: r.e,
                ty: r.f
            },
            scale: {
                sx: n,
                sy: o
            },
            rotation: {
                angle: a
            }
        }
    }
    function q() {
        return {
            a: 1,
            c: 0,
            e: 0,
            b: 0,
            d: -1,
            f: 0
        }
    }
    function $() {
        return {
            a: -1,
            c: 0,
            e: 0,
            b: 0,
            d: 1,
            f: 0
        }
    }
    function L() {
        return {
            a: -1,
            c: 0,
            e: 0,
            b: 0,
            d: -1,
            f: 0
        }
    }
    function V(r, t) {
        return h(t.x - r.x, t.y - r.y)
    }
    function z(r, t, n, o) {
        var a = V(r, n),
            i = e(a, t),
            u = n,
            c = o,
            l = S(Math.atan2(c.y - u.y, c.x - u.x) - Math.atan2(i.y - u.y, i.x - u.x), u.x, u.y),
            f = Math.sqrt(Math.pow(i.x - u.x, 2) + Math.pow(i.y - u.y, 2)),
            s = Math.sqrt(Math.pow(c.x - u.x, 2) + Math.pow(c.y - u.y, 2)) / f;
        return m([a, C(s, s, u.x, u.y), l])
    }
    return function(r, t) {
        function e() {
            this.constructor = r
        }
        e.prototype = t.prototype,
        r.prototype = new e
    }(Y, Error), Y.prototype.format = function(r) {
        var t = "Error: " + this.message;
        if (this.location) {
            var e,
                n = null;
            for (e = 0; e < r.length; e++)
                if (r[e].source === this.location.source) {
                    n = r[e].text.split(/\r\n|\n|\r/g);
                    break
                }
            var o = this.location.start,
                a = this.location.source + ":" + o.line + ":" + o.column;
            if (n) {
                var i = this.location.end,
                    u = k("", o.line.toString().length, " "),
                    c = n[o.line - 1],
                    l = (o.line === i.line ? i.column : c.length + 1) - o.column || 1;
                t += "\n --\x3e " + a + "\n" + u + " |\n" + o.line + " | " + c + "\n" + u + " | " + k("", o.column - 1, " ") + k("", l, "^")
            } else
                t += "\n at " + a
        }
        return t
    }, Y.buildMessage = function(r, t) {
        var e = {
            literal: function(r) {
                return '"' + o(r.text) + '"'
            },
            class: function(r) {
                var t = r.parts.map((function(r) {
                    return Array.isArray(r) ? a(r[0]) + "-" + a(r[1]) : a(r)
                }));
                return "[" + (r.inverted ? "^" : "") + t.join("") + "]"
            },
            any: function() {
                return "any character"
            },
            end: function() {
                return "end of input"
            },
            other: function(r) {
                return r.description
            }
        };
        function n(r) {
            return r.charCodeAt(0).toString(16).toUpperCase()
        }
        function o(r) {
            return r.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(r) {
                return "\\x0" + n(r)
            })).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(r) {
                return "\\x" + n(r)
            }))
        }
        function a(r) {
            return r.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(r) {
                return "\\x0" + n(r)
            })).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(r) {
                return "\\x" + n(r)
            }))
        }
        function i(r) {
            return e[r.type](r)
        }
        return "Expected " + function(r) {
            var t,
                e,
                n = r.map(i);
            if (n.sort(), n.length > 0) {
                for (t = 1, e = 1; t < n.length; t++)
                    n[t - 1] !== n[t] && (n[e] = n[t], e++);
                n.length = e
            }
            switch (n.length) {
            case 1:
                return n[0];
            case 2:
                return n[0] + " or " + n[1];
            default:
                return n.slice(0, -1).join(", ") + ", or " + n[n.length - 1]
            }
        }(r) + " but " + function(r) {
            return r ? '"' + o(r) + '"' : "end of input"
        }(t) + " found."
    }, t
})()));
//# sourceMappingURL=transformation-matrix.min.js.map
