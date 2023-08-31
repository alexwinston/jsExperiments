// https://github.com/mhyfritz/hilbert-curve v2.0.5 Copyright 2020 Markus Hsi-Yang Fritz
!function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((t = t || self).HilbertCurve = {})
}(this, (function(t) {
    "use strict";
    function n(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
    }
    function r(t) {
        var r;
        return 1 === t.length && (r = t, t = function(t, e) {
            return n(r(t), e)
        }), {
            left: function(n, r, e, o) {
                for (null == e && (e = 0), null == o && (o = n.length); e < o;) {
                    var f = e + o >>> 1;
                    t(n[f], r) < 0 ? e = f + 1 : o = f
                }
                return e
            },
            right: function(n, r, e, o) {
                for (null == e && (e = 0), null == o && (o = n.length); e < o;) {
                    var f = e + o >>> 1;
                    t(n[f], r) > 0 ? o = f : e = f + 1
                }
                return e
            }
        }
    }
    var e = r(n),
        o = e.right,
        f = e.left;
    function u(t) {
        return 0 | t.length
    }
    function i(t) {
        return !(t > 0)
    }
    function l(t) {
        return "object" != typeof t || "length" in t ? t : Array.from(t)
    }
    function a(t, n) {
        let r,
            e = 0,
            o = 0,
            f = 0;
        if (void 0 === n)
            for (let n of t)
                null != n && (n = +n) >= n && (r = n - o, o += r / ++e, f += r * (n - o));
        else {
            let u = -1;
            for (let i of t)
                null != (i = n(i, ++u, t)) && (i = +i) >= i && (r = i - o, o += r / ++e, f += r * (i - o))
        }
        if (e > 1)
            return f / (e - 1)
    }
    function c(t, n) {
        const r = a(t, n);
        return r ? Math.sqrt(r) : r
    }
    function s(t, n) {
        let r,
            e;
        if (void 0 === n)
            for (const n of t)
                null != n && (void 0 === r ? n >= n && (r = e = n) : (r > n && (r = n), e < n && (e = n)));
        else {
            let o = -1;
            for (let f of t)
                null != (f = n(f, ++o, t)) && (void 0 === r ? f >= f && (r = e = f) : (r > f && (r = f), e < f && (e = f)))
        }
        return [r, e]
    }
    function h(t) {
        return t
    }
    function v(t, n, r, e) {
        return function t(o, f) {
            if (f >= e.length)
                return r(o);
            const u = new Map,
                i = e[f++];
            let l = -1;
            for (const t of o) {
                const n = i(t, ++l, o),
                    r = u.get(n);
                r ? r.push(t) : u.set(n, [t])
            }
            for (const [n, r] of u)
                u.set(n, t(r, f));
            return n(u)
        }(t, 0)
    }
    var d = Array.prototype,
        M = d.slice,
        g = d.map;
    function y(t) {
        return function() {
            return t
        }
    }
    function p(t, n, r) {
        t = +t,
        n = +n,
        r = (o = arguments.length) < 2 ? (n = t, t = 0, 1) : o < 3 ? 1 : +r;
        for (var e = -1, o = 0 | Math.max(0, Math.ceil((n - t) / r)), f = new Array(o); ++e < o;)
            f[e] = t + e * r;
        return f
    }
    var m = Math.sqrt(50),
        A = Math.sqrt(10),
        x = Math.sqrt(2);
    function w(t, n, r) {
        var e = (n - t) / Math.max(0, r),
            o = Math.floor(Math.log(e) / Math.LN10),
            f = e / Math.pow(10, o);
        return o >= 0 ? (f >= m ? 10 : f >= A ? 5 : f >= x ? 2 : 1) * Math.pow(10, o) : -Math.pow(10, -o) / (f >= m ? 10 : f >= A ? 5 : f >= x ? 2 : 1)
    }
    function b(t, n, r) {
        var e = Math.abs(n - t) / Math.max(0, r),
            o = Math.pow(10, Math.floor(Math.log(e) / Math.LN10)),
            f = e / o;
        return f >= m ? o *= 10 : f >= A ? o *= 5 : f >= x && (o *= 2), n < t ? -o : o
    }
    function q(t) {
        return Math.ceil(Math.log(t.length) / Math.LN2) + 1
    }
    function N() {
        var t = h,
            n = s,
            r = q;
        function e(e) {
            Array.isArray(e) || (e = Array.from(e));
            var f,
                u,
                i = e.length,
                l = new Array(i);
            for (f = 0; f < i; ++f)
                l[f] = t(e[f], f, e);
            var a = n(l),
                c = a[0],
                s = a[1],
                h = r(l, c, s);
            Array.isArray(h) || (h = b(c, s, h), h = p(Math.ceil(c / h) * h, s, h));
            for (var v = h.length; h[0] <= c;)
                h.shift(),
                --v;
            for (; h[v - 1] > s;)
                h.pop(),
                --v;
            var d,
                M = new Array(v + 1);
            for (f = 0; f <= v; ++f)
                (d = M[f] = []).x0 = f > 0 ? h[f - 1] : c,
                d.x1 = f < v ? h[f] : s;
            for (f = 0; f < i; ++f)
                c <= (u = l[f]) && u <= s && M[o(h, u, 0, v)].push(e[f]);
            return M
        }
        return e.value = function(n) {
            return arguments.length ? (t = "function" == typeof n ? n : y(n), e) : t
        }, e.domain = function(t) {
            return arguments.length ? (n = "function" == typeof t ? t : y([t[0], t[1]]), e) : n
        }, e.thresholds = function(t) {
            return arguments.length ? (r = "function" == typeof t ? t : Array.isArray(t) ? y(M.call(t)) : y(t), e) : r
        }, e
    }
    function I(t) {
        return null === t ? NaN : +t
    }
    function* j(t, n) {
        if (void 0 === n)
            for (let n of t)
                null != n && (n = +n) >= n && (yield n);
        else {
            let r = -1;
            for (let e of t)
                null != (e = n(e, ++r, t)) && (e = +e) >= e && (yield e)
        }
    }
    function k(t, r, e) {
        return F(Float64Array.from(j(t, e)).sort(n), r)
    }
    function F(t, n, r=I) {
        if (e = t.length) {
            if ((n = +n) <= 0 || e < 2)
                return +r(t[0], 0, t);
            if (n >= 1)
                return +r(t[e - 1], e - 1, t);
            var e,
                o = (e - 1) * n,
                f = Math.floor(o),
                u = +r(t[f], f, t);
            return u + (+r(t[f + 1], f + 1, t) - u) * (o - f)
        }
    }
    function L(t, n) {
        let r;
        if (void 0 === n)
            for (const n of t)
                null != n && (r < n || void 0 === r && n >= n) && (r = n);
        else {
            let e = -1;
            for (let o of t)
                null != (o = n(o, ++e, t)) && (r < o || void 0 === r && o >= o) && (r = o)
        }
        return r
    }
    function S(t, n) {
        let r,
            e = -1,
            o = -1;
        if (void 0 === n)
            for (const n of t)
                ++o,
                null != n && (r < n || void 0 === r && n >= n) && (r = n, e = o);
        else
            for (let f of t)
                null != (f = n(f, ++o, t)) && (r < f || void 0 === r && f >= f) && (r = f, e = o);
        return e
    }
    function z(t, r, e=0, o=t.length - 1, f=n) {
        for (; o > e;) {
            if (o - e > 600) {
                const n = o - e + 1,
                    u = r - e + 1,
                    i = Math.log(n),
                    l = .5 * Math.exp(2 * i / 3),
                    a = .5 * Math.sqrt(i * l * (n - l) / n) * (u - n / 2 < 0 ? -1 : 1);
                z(t, r, Math.max(e, Math.floor(r - u * l / n + a)), Math.min(o, Math.floor(r + (n - u) * l / n + a)), f)
            }
            const n = t[r];
            let u = e,
                i = o;
            for (O(t, e, r), f(t[o], n) > 0 && O(t, e, o); u < i;) {
                for (O(t, u, i), ++u, --i; f(t[u], n) < 0;)
                    ++u;
                for (; f(t[i], n) > 0;)
                    --i
            }
            0 === f(t[e], n) ? O(t, e, i) : (++i, O(t, i, o)),
            i <= r && (e = i + 1),
            r <= i && (o = i - 1)
        }
        return t
    }
    function O(t, n, r) {
        const e = t[n];
        t[n] = t[r],
        t[r] = e
    }
    function P(t, n) {
        let r;
        if (void 0 === n)
            for (const n of t)
                null != n && (r > n || void 0 === r && n >= n) && (r = n);
        else {
            let e = -1;
            for (let o of t)
                null != (o = n(o, ++e, t)) && (r > o || void 0 === r && o >= o) && (r = o)
        }
        return r
    }
    function T(t, n) {
        let r,
            e = -1,
            o = -1;
        if (void 0 === n)
            for (const n of t)
                ++o,
                null != n && (r > n || void 0 === r && n >= n) && (r = n, e = o);
        else
            for (let f of t)
                null != (f = n(f, ++o, t)) && (r > f || void 0 === r && f >= f) && (r = f, e = o);
        return e
    }
    function _(t, n) {
        return [t, n]
    }
    function C(t, r=n) {
        if (1 === r.length)
            return T(t, r);
        let e,
            o = -1,
            f = -1;
        for (const n of t)
            ++f,
            (o < 0 ? 0 === r(n, n) : r(n, e) < 0) && (e = n, o = f);
        return o
    }
    function D(t) {
        if (!(o = t.length))
            return [];
        for (var n = -1, r = P(t, R), e = new Array(r); ++n < r;)
            for (var o, f = -1, u = e[n] = new Array(o); ++f < o;)
                u[f] = t[f][n];
        return e
    }
    function R(t) {
        return t.length
    }
    var B = Object.freeze({
        bisect: o,
        bisectRight: o,
        bisectLeft: f,
        ascending: n,
        bisector: r,
        count: function(t, n) {
            let r = 0;
            if (void 0 === n)
                for (let n of t)
                    null != n && (n = +n) >= n && ++r;
            else {
                let e = -1;
                for (let o of t)
                    null != (o = n(o, ++e, t)) && (o = +o) >= o && ++r
            }
            return r
        },
        cross: function(...t) {
            const n = "function" == typeof t[t.length - 1] && function(t) {
                    return n => t(...n)
                }(t.pop()),
                r = (t = t.map(l)).map(u),
                e = t.length - 1,
                o = new Array(e + 1).fill(0),
                f = [];
            if (e < 0 || r.some(i))
                return f;
            for (;;) {
                f.push(o.map((n, r) => t[r][n]));
                let u = e;
                for (; ++o[u] === r[u];) {
                    if (0 === u)
                        return n ? f.map(n) : f;
                    o[u--] = 0
                }
            }
        },
        descending: function(t, n) {
            return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
        },
        deviation: c,
        extent: s,
        group: function(t, ...n) {
            return v(t, h, h, n)
        },
        groups: function(t, ...n) {
            return v(t, Array.from, h, n)
        },
        rollup: function(t, n, ...r) {
            return v(t, h, n, r)
        },
        rollups: function(t, n, ...r) {
            return v(t, Array.from, n, r)
        },
        bin: N,
        histogram: N,
        thresholdFreedmanDiaconis: function(t, r, e) {
            return t = g.call(t, I).sort(n), Math.ceil((e - r) / (2 * (k(t, .75) - k(t, .25)) * Math.pow(t.length, -1 / 3)))
        },
        thresholdScott: function(t, n, r) {
            return Math.ceil((r - n) / (3.5 * c(t) * Math.pow(t.length, -1 / 3)))
        },
        thresholdSturges: q,
        max: L,
        maxIndex: S,
        mean: function(t, n) {
            let r = 0,
                e = 0;
            if (void 0 === n)
                for (let n of t)
                    null != n && (n = +n) >= n && (++r, e += n);
            else {
                let o = -1;
                for (let f of t)
                    null != (f = n(f, ++o, t)) && (f = +f) >= f && (++r, e += f)
            }
            if (r)
                return e / r
        },
        median: function(t, n) {
            if (!(t = Float64Array.from(j(t, n))).length)
                return;
            const r = t.length,
                e = r >> 1;
            return z(t, e - 1, 0), 0 == (1 & r) && z(t, e, e), k(t, .5)
        },
        merge: function(t) {
            return Array.from(function* (t) {
                for (const n of t)
                    yield *n
            }(t))
        },
        min: P,
        minIndex: T,
        pairs: function(t, n=_) {
            const r = [];
            let e,
                o = !1;
            for (const f of t)
                o && r.push(n(e, f)),
                e = f,
                o = !0;
            return r
        },
        permute: function(t, n) {
            return Array.from(n, n => t[n])
        },
        quantile: k,
        quantileSorted: F,
        quickselect: z,
        range: p,
        least: function(t, r=n) {
            let e,
                o = !1;
            if (1 === r.length) {
                let f;
                for (const u of t) {
                    const t = r(u);
                    (o ? n(t, f) < 0 : 0 === n(t, t)) && (e = u, f = t, o = !0)
                }
            } else
                for (const n of t)
                    (o ? r(n, e) < 0 : 0 === r(n, n)) && (e = n, o = !0);
            return e
        },
        leastIndex: C,
        greatest: function(t, r=n) {
            let e,
                o = !1;
            if (1 === r.length) {
                let f;
                for (const u of t) {
                    const t = r(u);
                    (o ? n(t, f) > 0 : 0 === n(t, t)) && (e = u, f = t, o = !0)
                }
            } else
                for (const n of t)
                    (o ? r(n, e) > 0 : 0 === r(n, n)) && (e = n, o = !0);
            return e
        },
        greatestIndex: function(t, r=n) {
            if (1 === r.length)
                return S(t, r);
            let e,
                o = -1,
                f = -1;
            for (const n of t)
                ++f,
                (o < 0 ? 0 === r(n, n) : r(n, e) > 0) && (e = n, o = f);
            return o
        },
        scan: function(t, n) {
            const r = C(t, n);
            return r < 0 ? void 0 : r
        },
        shuffle: function(t, n=0, r=t.length) {
            for (var e, o, f = r - (n = +n); f;)
                o = Math.random() * f-- | 0,
                e = t[f + n],
                t[f + n] = t[o + n],
                t[o + n] = e;
            return t
        },
        sum: function(t, n) {
            let r = 0;
            if (void 0 === n)
                for (let n of t)
                    (n = +n) && (r += n);
            else {
                let e = -1;
                for (let o of t)
                    (o = +n(o, ++e, t)) && (r += o)
            }
            return r
        },
        ticks: function(t, n, r) {
            var e,
                o,
                f,
                u,
                i = -1;
            if (r = +r, (t = +t) === (n = +n) && r > 0)
                return [t];
            if ((e = n < t) && (o = t, t = n, n = o), 0 === (u = w(t, n, r)) || !isFinite(u))
                return [];
            if (u > 0)
                for (t = Math.ceil(t / u), n = Math.floor(n / u), f = new Array(o = Math.ceil(n - t + 1)); ++i < o;)
                    f[i] = (t + i) * u;
            else
                for (t = Math.floor(t * u), n = Math.ceil(n * u), f = new Array(o = Math.ceil(t - n + 1)); ++i < o;)
                    f[i] = (t - i) / u;
            return e && f.reverse(), f
        },
        tickIncrement: w,
        tickStep: b,
        transpose: D,
        variance: a,
        zip: function() {
            return D(arguments)
        }
    });
    function E(t, n) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : L;
        Array.isArray(t) || (t = Array.from(t));
        var e = G(t, n);
        return e.map((function(t) {
            return r(t.data)
        }))
    }
    function G(t, n) {
        for (var r = new Array(n), e = t.length / n, o = 0, f = 0, u = 0; o < n; o += 1) {
            u = Math.round((o + 1) * e);
            var i = t.slice(f, u);
            r[o] = {
                start: f,
                end: u - 1,
                data: i
            },
            f = u
        }
        return r
    }
    function H(t, n) {
        for (var r, e, o, f = Math.pow(2, n), u = new Array(f * f), i = 0; i < t.length; i += 1) {
            var l = J(i, n);
            u[(r = l.x, e = l.y, o = f, e * o + r)] = t[i]
        }
        return u
    }
    function J(t, n) {
        for (var r, e, o = Math.pow(2, n), f = {
                x: 0,
                y: 0
            }, u = 1, i = t; u < o; u *= 2)
            K(f, r = 1 & i / 2, e = 1 & (i ^ r), u),
            f.x += u * r,
            f.y += u * e,
            i /= 4;
        return f
    }
    function K(t, n, r, e) {
        if (0 === r) {
            1 === n && (t.x = e - 1 - t.x, t.y = e - 1 - t.y);
            var o = [t.y, t.x];
            t.x = o[0],
            t.y = o[1]
        }
    }
    t.construct = function(t, n) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : B.max;
        Array.isArray(t) || (t = Array.from(t));
        var e = Math.ceil(Math.log2(Math.sqrt(t.length)));
        if (void 0 === n || n >= e)
            return H(t, e);
        var o = Math.pow(2, n),
            f = E(t, o * o, r);
        return H(f, n)
    },
    t.point = J,
    t.pointToIndex = function(t, n) {
        for (var r, e, o = Math.pow(2, n), f = 0, u = o / 2; u > 0; u = Math.floor(u / 2))
            f += u * u * (3 * (r = (t.x & u) > 0 ? 1 : 0) ^ (e = (t.y & u) > 0 ? 1 : 0)),
            K(t, r, e, o);
        return f
    },
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
}));

// https://github.com/ryan-williams/hilbert-js
var Hilbert2d = function(options, axisOrderOpt) {
    options = options || {};
    if (typeof options == 'number') {
      this.size = options;
      this.anchorAxisOrder = axisOrderOpt || 'xy';
    } else if (typeof options == 'string') {
      this.anchorAxisOrder = options;
    } else {
      // should be empty if we're prioritizing bottom level.
      this.size = options.top;
      this.anchorAxisOrder = options.axisOrder || 'xy';
    }
  
    if (!(this.anchorAxisOrder in {xy:1,yx:1})) {
      throw new Error("Invalid axis order: " + anchorAxisOrder);
    }
  
    if (this.size) {
      this.log2size = 0;
      var pow2 = 1;
      for (; pow2 < this.size; pow2 *= 2, this.log2size++) {}
      if (pow2 != this.size) {
        throw new Error("Invalid size: " + this.size + ". Must be a power of 2.");
      }
      this.log2parity = (this.log2size % 2);
    }
  
    function invert(point) {
      return {
        x: point.y,
        y: point.x
      };
    }
  
    this.maybeRotate = function(point, iter) {
      if (this.size) {
        if (this.anchorAxisOrder == 'xy') {
          if (iter ^ this.log2parity) {
            return invert(point);
          }
        }
        if (this.anchorAxisOrder == 'yx') {
          if (!(iter ^ this.log2parity)) {
            return invert(point);
          }
        }
      } else {
        if (this.anchorAxisOrder == 'xy') {
          if (iter == 0) {
            return invert(point);
          }
        } else {
          if (iter == 1) {
            return invert(point);
          }
        }
      }
      return point;
    };
  
    this.d2xy = this.xy = function (d) {
      d = Math.floor(d);
      var curPos = {
        x: 0,
        y: 0
      };
      var s = 1;
      var iter = 0;
      var size = this.size || 0;
      while (d > 0 || s < size) {
        var ry = 1 & (d / 2);
        var rx = 1 & (ry ^ d);
  
        // Rotate, if need be
        if (rx == 0) {
          if (ry == 1) {
            curPos = {
              x: s - 1 - curPos.x,
              y: s - 1 - curPos.y
            };
          }
          curPos = invert(curPos);
        }
  
        curPos = {
          x: curPos.x + s * rx,
          y: curPos.y + s * ry
        };
  
        s *= 2;
        d = Math.floor(d / 4);
        iter = (iter + 1) % 2;
      }
      return this.maybeRotate(curPos, iter);
    };
  
    var horseshoe2d = [0, 1, 3, 2];
  
    this.xy2d = this.d = function (x, y) {
      var curPos = {
        x: Math.floor(x),
        y: Math.floor(y)
      };
      var s = 1;
      var level = 1;
      var max = Math.max(curPos.x, curPos.y);
      for (; 2 * s <= max; s *= 2) {
        level = (level + 1) % 2;
      }
      curPos = this.maybeRotate(curPos, level);
  
      var d = 0;
      while (s > 0) {
        var rx = curPos.x & s && 1;
        var ry = curPos.y & s && 1;
        d *= 4;
        d += horseshoe2d[2 * ry + rx];
        if (rx == 0) {
          if (ry == 1) {
            curPos = {
              x: s - 1 - curPos.x,
              y: s - 1 - curPos.y
            }
          }
          curPos = invert(curPos);
        }
        curPos = {
          x: curPos.x % s,
          y: curPos.y % s
        };
        s = Math.floor(s / 2);
      }
      return d;
    };
  };