function st(i, t) {
  if (!i)
    throw new Error(t);
}
const F = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function zn(i, t, e) {
  const n = Math.min.apply(null, i), r = Math.min.apply(null, t), s = Math.max.apply(null, i), o = Math.max.apply(null, t);
  return mt(n, r, s, o, e);
}
function ut(i, t, e) {
  let n, r;
  return t < i[0] ? n = i[0] - t : i[2] < t ? n = t - i[2] : n = 0, e < i[1] ? r = i[1] - e : i[3] < e ? r = e - i[3] : r = 0, n * n + r * r;
}
function an(i, t, e) {
  return i[0] <= t && t <= i[2] && i[1] <= e && e <= i[3];
}
function Se(i, t) {
  const e = i[0], n = i[1], r = i[2], s = i[3], o = t[0], a = t[1];
  let l = F.UNKNOWN;
  return o < e ? l = l | F.LEFT : o > r && (l = l | F.RIGHT), a < n ? l = l | F.BELOW : a > s && (l = l | F.ABOVE), l === F.UNKNOWN && (l = F.INTERSECTING), l;
}
function Jt() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function mt(i, t, e, n, r) {
  return r ? (r[0] = i, r[1] = t, r[2] = e, r[3] = n, r) : [i, t, e, n];
}
function jt(i) {
  return mt(1 / 0, 1 / 0, -1 / 0, -1 / 0, i);
}
function Wn(i, t) {
  const e = i[0], n = i[1];
  return mt(e, n, e, n, t);
}
function ln(i, t, e, n, r) {
  const s = jt(r);
  return un(s, i, t, e, n);
}
function un(i, t, e, n, r) {
  for (; e < n; e += r)
    $n(i, t[e], t[e + 1]);
  return i;
}
function $n(i, t, e) {
  i[0] = Math.min(i[0], t), i[1] = Math.min(i[1], e), i[2] = Math.max(i[2], t), i[3] = Math.max(i[3], e);
}
function qn(i, t) {
  let e;
  return e = t(Hn(i)), e || (e = t(Kn(i)), e) || (e = t(Jn(i)), e) || (e = t(Qn(i)), e) ? e : !1;
}
function Hn(i) {
  return [i[0], i[1]];
}
function Kn(i) {
  return [i[2], i[1]];
}
function hn(i) {
  return [(i[0] + i[2]) / 2, (i[1] + i[3]) / 2];
}
function Ne(i) {
  return i[3] - i[1];
}
function Qn(i) {
  return [i[0], i[3]];
}
function Jn(i) {
  return [i[2], i[3]];
}
function jn(i, t) {
  return i[0] <= t[2] && i[2] >= t[0] && i[1] <= t[3] && i[3] >= t[1];
}
function kn(i) {
  return i[2] < i[0] || i[3] < i[1];
}
function tr(i, t) {
  return t ? (t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t) : i;
}
function er(i, t, e) {
  let n = !1;
  const r = Se(i, t), s = Se(i, e);
  if (r === F.INTERSECTING || s === F.INTERSECTING)
    n = !0;
  else {
    const o = i[0], a = i[1], l = i[2], u = i[3], h = t[0], c = t[1], g = e[0], d = e[1], m = (d - c) / (g - h);
    let R, S;
    s & F.ABOVE && !(r & F.ABOVE) && (R = g - (d - u) / m, n = R >= o && R <= l), !n && s & F.RIGHT && !(r & F.RIGHT) && (S = d - (g - l) * m, n = S >= a && S <= u), !n && s & F.BELOW && !(r & F.BELOW) && (R = g - (d - a) / m, n = R >= o && R <= l), !n && s & F.LEFT && !(r & F.LEFT) && (S = d - (g - o) * m, n = S >= a && S <= u);
  }
  return n;
}
function nr(i, t, e, n) {
  if (kn(i))
    return jt(e);
  let r = [];
  r = [
    i[0],
    i[1],
    i[2],
    i[1],
    i[2],
    i[3],
    i[0],
    i[3]
  ], t(r, r, 2);
  const s = [], o = [];
  for (let a = 0, l = r.length; a < l; a += 2)
    s.push(r[a]), o.push(r[a + 1]);
  return zn(s, o, e);
}
function rr(i, t, e, n, r, s) {
  const o = r - e, a = s - n;
  if (o !== 0 || a !== 0) {
    const l = ((i - e) * o + (t - n) * a) / (o * o + a * a);
    l > 1 ? (e = r, n = s) : l > 0 && (e += o * l, n += a * l);
  }
  return $(i, t, e, n);
}
function $(i, t, e, n) {
  const r = e - i, s = n - t;
  return r * r + s * s;
}
function Ce(i) {
  return i * 180 / Math.PI;
}
function St(i) {
  return i * Math.PI / 180;
}
function kt(i, t, e) {
  return i + e * (t - i);
}
function Vt(i, t, e) {
  if (i >= t && i < e)
    return i;
  const n = e - t;
  return ((i - t) % n + n) % n + t;
}
const ir = {
  // use the radius of the Normal sphere
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class te {
  /**
   * @param {Options} options Projection options.
   */
  constructor(t) {
    this.code_ = t.code, this.units_ = /** @type {import("./Units.js").Units} */
    t.units, this.extent_ = t.extent !== void 0 ? t.extent : null, this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null, this.axisOrientation_ = t.axisOrientation !== void 0 ? t.axisOrientation : "enu", this.global_ = t.global !== void 0 ? t.global : !1, this.canWrapX_ = !!(this.global_ && this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit;
  }
  /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */
  canWrapX() {
    return this.canWrapX_;
  }
  /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */
  getCode() {
    return this.code_;
  }
  /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */
  getUnits() {
    return this.units_;
  }
  /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */
  getMetersPerUnit() {
    return this.metersPerUnit_ || ir[this.units_];
  }
  /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getWorldExtent() {
    return this.worldExtent_;
  }
  /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */
  getAxisOrientation() {
    return this.axisOrientation_;
  }
  /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */
  isGlobal() {
    return this.global_;
  }
  /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */
  setGlobal(t) {
    this.global_ = t, this.canWrapX_ = !!(t && this.extent_);
  }
  /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */
  getDefaultTileGrid() {
    return this.defaultTileGrid_;
  }
  /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */
  setDefaultTileGrid(t) {
    this.defaultTileGrid_ = t;
  }
  /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  setExtent(t) {
    this.extent_ = t, this.canWrapX_ = !!(this.global_ && t);
  }
  /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */
  setWorldExtent(t) {
    this.worldExtent_ = t;
  }
  /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */
  setGetPointResolution(t) {
    this.getPointResolutionFunc_ = t;
  }
  /**
   * Get the custom point resolution function for this projection (if set).
   * @return {GetPointResolution|undefined} The custom point
   * resolution function (if set).
   */
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_;
  }
}
const yt = 6378137, tt = Math.PI * yt, sr = [-tt, -tt, tt, tt], or = [-180, -85, 180, 85], Rt = yt * Math.log(Math.tan(Math.PI / 2));
class J extends te {
  /**
   * @param {string} code Code.
   */
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: sr,
      global: !0,
      worldExtent: or,
      getPointResolution: function(e, n) {
        return e / Math.cosh(n[1] / yt);
      }
    });
  }
}
const Pe = [
  new J("EPSG:3857"),
  new J("EPSG:102100"),
  new J("EPSG:102113"),
  new J("EPSG:900913"),
  new J("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new J("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function ar(i, t, e, n) {
  const r = i.length;
  e = e > 1 ? e : 2, n = n ?? e, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(r));
  for (let s = 0; s < r; s += n) {
    t[s] = tt * i[s] / 180;
    let o = yt * Math.log(Math.tan(Math.PI * (+i[s + 1] + 90) / 360));
    o > Rt ? o = Rt : o < -Rt && (o = -Rt), t[s + 1] = o;
  }
  return t;
}
function lr(i, t, e, n) {
  const r = i.length;
  e = e > 1 ? e : 2, n = n ?? e, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(r));
  for (let s = 0; s < r; s += n)
    t[s] = 180 * i[s] / tt, t[s + 1] = 360 * Math.atan(Math.exp(i[s + 1] / yt)) / Math.PI - 90;
  return t;
}
const ur = 6378137, Me = [-180, -90, 180, 90], hr = Math.PI * ur / 180;
class V extends te {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: Me,
      axisOrientation: e,
      global: !0,
      metersPerUnit: hr,
      worldExtent: Me
    });
  }
}
const Ae = [
  new V("CRS:84"),
  new V("EPSG:4326", "neu"),
  new V("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new V("urn:ogc:def:crs:OGC:2:84"),
  new V("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new V("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new V("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let zt = {};
function cr(i) {
  return zt[i] || zt[i.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function gr(i, t) {
  zt[i] = t;
}
function cn(i) {
  for (const t in i)
    delete i[t];
}
function pr(i) {
  let t;
  for (t in i)
    return !1;
  return !t;
}
let it = {};
function gt(i, t, e) {
  const n = i.getCode(), r = t.getCode();
  n in it || (it[n] = {}), it[n][r] = e;
}
function Dt(i, t) {
  return i in it && t in it[i] ? it[i][t] : null;
}
const Nt = 0.9996, U = 669438e-8, It = U * U, Tt = It * U, z = U / (1 - U), Le = Math.sqrt(1 - U), ot = (1 - Le) / (1 + Le), gn = ot * ot, ee = gn * ot, ne = ee * ot, pn = ne * ot, fn = 1 - U / 4 - 3 * It / 64 - 5 * Tt / 256, fr = 3 * U / 8 + 3 * It / 32 + 45 * Tt / 1024, dr = 15 * It / 256 + 45 * Tt / 1024, mr = 35 * Tt / 3072, yr = 3 / 2 * ot - 27 / 32 * ee + 269 / 512 * pn, Er = 21 / 16 * gn - 55 / 32 * ne, Rr = 151 / 96 * ee - 417 / 128 * pn, wr = 1097 / 512 * ne, Ct = 6378137;
function _r(i, t, e) {
  const n = i - 5e5, o = (e.north ? t : t - 1e7) / Nt / (Ct * fn), a = o + yr * Math.sin(2 * o) + Er * Math.sin(4 * o) + Rr * Math.sin(6 * o) + wr * Math.sin(8 * o), l = Math.sin(a), u = l * l, h = Math.cos(a), c = l / h, g = c * c, d = g * g, m = 1 - U * u, R = Math.sqrt(1 - U * u), S = Ct / R, T = (1 - U) / m, M = z * h ** 2, b = M * M, O = n / (S * Nt), X = O * O, ct = X * O, we = ct * O, _e = we * O, Xn = _e * O, Vn = a - c / T * (X / 2 - we / 24 * (5 + 3 * g + 10 * M - 4 * b - 9 * z)) + Xn / 720 * (61 + 90 * g + 298 * M + 45 * d - 252 * z - 3 * b);
  let Ut = (O - ct / 6 * (1 + 2 * g + M) + _e / 120 * (5 - 2 * M + 28 * g - 3 * b + 8 * z + 24 * d)) / h;
  return Ut = Vt(
    Ut + St(dn(e.number)),
    -Math.PI,
    Math.PI
  ), [Ce(Ut), Ce(Vn)];
}
const Ie = -80, Te = 84, Sr = -180, Nr = 180;
function Cr(i, t, e) {
  i = Vt(i, Sr, Nr), t < Ie ? t = Ie : t > Te && (t = Te);
  const n = St(t), r = Math.sin(n), s = Math.cos(n), o = r / s, a = o * o, l = a * a, u = St(i), h = dn(e.number), c = St(h), g = Ct / Math.sqrt(1 - U * r ** 2), d = z * s ** 2, m = s * Vt(u - c, -Math.PI, Math.PI), R = m * m, S = R * m, T = S * m, M = T * m, b = M * m, O = Ct * (fn * n - fr * Math.sin(2 * n) + dr * Math.sin(4 * n) - mr * Math.sin(6 * n)), X = Nt * g * (m + S / 6 * (1 - a + d) + M / 120 * (5 - 18 * a + l + 72 * d - 58 * z)) + 5e5;
  let ct = Nt * (O + g * o * (R / 2 + T / 24 * (5 - a + 9 * d + 4 * d ** 2) + b / 720 * (61 - 58 * a + l + 600 * d - 330 * z)));
  return e.north || (ct += 1e7), [X, ct];
}
function dn(i) {
  return (i - 1) * 6 - 180 + 3;
}
const Pr = [
  /^EPSG:(\d+)$/,
  /^urn:ogc:def:crs:EPSG::(\d+)$/,
  /^http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/(\d+)$/
];
function mn(i) {
  let t = 0;
  for (const r of Pr) {
    const s = i.match(r);
    if (s) {
      t = parseInt(s[1]);
      break;
    }
  }
  if (!t)
    return null;
  let e = 0, n = !1;
  return t > 32700 && t < 32761 ? e = t - 32700 : t > 32600 && t < 32661 && (n = !0, e = t - 32600), e ? { number: e, north: n } : null;
}
function Fe(i, t) {
  return function(e, n, r, s) {
    const o = e.length;
    r = r > 1 ? r : 2, s = s ?? r, n || (r > 2 ? n = e.slice() : n = new Array(o));
    for (let a = 0; a < o; a += s) {
      const l = e[a], u = e[a + 1], h = i(l, u, t);
      n[a] = h[0], n[a + 1] = h[1];
    }
    return n;
  };
}
function Mr(i) {
  return mn(i) ? new te({ code: i, units: "m" }) : null;
}
function Ar(i) {
  const t = mn(i.getCode());
  return t ? {
    forward: Fe(Cr, t),
    inverse: Fe(_r, t)
  } : null;
}
const Lr = [Ar], Ir = [Mr];
function re(i, t) {
  if (t !== void 0) {
    for (let e = 0, n = i.length; e < n; ++e)
      t[e] = i[e];
    t = t;
  } else
    t = i.slice();
  return t;
}
function Wt(i) {
  gr(i.getCode(), i), gt(i, i, re);
}
function Tr(i) {
  i.forEach(Wt);
}
function v(i) {
  if (typeof i != "string")
    return i;
  const t = cr(i);
  if (t)
    return t;
  for (const e of Ir) {
    const n = e(i);
    if (n)
      return n;
  }
  return null;
}
function ve(i) {
  Tr(i), i.forEach(function(t) {
    i.forEach(function(e) {
      t !== e && gt(t, e, re);
    });
  });
}
function Fr(i, t, e, n) {
  i.forEach(function(r) {
    t.forEach(function(s) {
      gt(r, s, e), gt(s, r, n);
    });
  });
}
function yn(i, t) {
  if (i === t)
    return !0;
  const e = i.getUnits() === t.getUnits();
  return (i.getCode() === t.getCode() || En(i, t) === re) && e;
}
function En(i, t) {
  const e = i.getCode(), n = t.getCode();
  let r = Dt(e, n);
  if (r)
    return r;
  let s = null, o = null;
  for (const l of Lr)
    s || (s = l(i)), o || (o = l(t));
  if (!s && !o)
    return null;
  const a = "EPSG:4326";
  if (o)
    if (s)
      r = Bt(
        s.inverse,
        o.forward
      );
    else {
      const l = Dt(e, a);
      l && (r = Bt(
        l,
        o.forward
      ));
    }
  else {
    const l = Dt(a, n);
    l && (r = Bt(
      s.inverse,
      l
    ));
  }
  return r && (Wt(i), Wt(t), gt(i, t, r)), r;
}
function Bt(i, t) {
  return function(e, n, r, s) {
    return n = i(e, n, r, s), t(n, n, r, s);
  };
}
function Pt(i, t) {
  const e = v(i), n = v(t);
  return En(e, n);
}
function vr(i, t, e, n) {
  const r = Pt(t, e);
  return nr(i, r, void 0);
}
function Or() {
  ve(Pe), ve(Ae), Fr(
    Ae,
    Pe,
    ar,
    lr
  );
}
Or();
function xr(i, t, e) {
  let n, r;
  e = e || Rn;
  let s = 0, o = i.length, a = !1;
  for (; s < o; )
    n = s + (o - s >> 1), r = +e(i[n], t), r < 0 ? s = n + 1 : (o = n, a = !r);
  return a ? s : ~s;
}
function Rn(i, t) {
  return i > t ? 1 : i < t ? -1 : 0;
}
function x(i, t) {
  const e = Array.isArray(t) ? t : [t], n = e.length;
  for (let r = 0; r < n; r++)
    i[i.length] = e[r];
}
function Gr(i, t) {
  const e = i.length;
  if (e !== t.length)
    return !1;
  for (let n = 0; n < e; n++)
    if (i[n] !== t[n])
      return !1;
  return !0;
}
const $t = "http://www.w3.org/2001/XMLSchema-instance";
function _(i, t) {
  return ie().createElementNS(i, t);
}
function pt(i, t) {
  return wn(i, t, []).join("");
}
function wn(i, t, e) {
  if (i.nodeType == Node.CDATA_SECTION_NODE || i.nodeType == Node.TEXT_NODE)
    e.push(i.nodeValue);
  else {
    let n;
    for (n = i.firstChild; n; n = n.nextSibling)
      wn(n, t, e);
  }
  return e;
}
function et(i) {
  return "documentElement" in i;
}
function br(i, t, e) {
  return i.getAttributeNS(t, e) || "";
}
function nt(i) {
  return new DOMParser().parseFromString(i, "application/xml");
}
function _n(i, t) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @this {*}
     */
    function(e, n) {
      const r = i.call(this, e, n);
      if (r !== void 0) {
        const s = (
          /** @type {Array<*>} */
          n[n.length - 1]
        );
        x(s, r);
      }
    }
  );
}
function w(i, t) {
  return (
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @this {*}
     */
    function(e, n) {
      const r = i.call(t ?? this, e, n);
      r !== void 0 && /** @type {Array<*>} */
      n[n.length - 1].push(r);
    }
  );
}
function E(i, t) {
  return (
    /**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @this {*}
     */
    function(e, n) {
      const r = i.call(t ?? this, e, n);
      r !== void 0 && (n[n.length - 1] = r);
    }
  );
}
function D(i, t, e) {
  return (
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     * @this {*}
     */
    function(n, r) {
      const s = i.call(this, n, r);
      if (s !== void 0) {
        const o = (
          /** @type {!Object} */
          r[r.length - 1]
        ), a = t !== void 0 ? t : n.localName;
        o[a] = s;
      }
    }
  );
}
function p(i, t) {
  return (
    /**
     * @param {Element} node Node.
     * @param {*} value Value to be written.
     * @param {Array<*>} objectStack Object stack.
     * @this {*}
     */
    function(e, n, r) {
      i.call(t ?? this, e, n, r), /** @type {NodeStackItem} */
      r[r.length - 1].node.appendChild(e);
    }
  );
}
function G(i, t) {
  return (
    /**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [newNodeName] Node name.
     * @return {Node} Node.
     */
    function(e, n, r) {
      const o = /** @type {NodeStackItem} */ n[n.length - 1].node;
      let a = i;
      a === void 0 && (a = r);
      const l = t !== void 0 ? t : o.namespaceURI;
      return _(
        l,
        /** @type {string} */
        a
      );
    }
  );
}
const Sn = G();
function q(i, t, e, n) {
  let r;
  for (r = t.firstElementChild; r; r = r.nextElementSibling) {
    const s = i[r.namespaceURI];
    if (s !== void 0) {
      const o = s[r.localName];
      o !== void 0 && o.call(n, r, e);
    }
  }
}
function P(i, t, e, n, r) {
  return n.push(i), q(t, e, n, r), /** @type {T} */
  n.pop();
}
function Yr(i, t, e, n, r, s) {
  const o = (r !== void 0 ? r : e).length;
  let a, l;
  for (let u = 0; u < o; ++u)
    a = e[u], a !== void 0 && (l = t.call(
      s,
      a,
      n,
      r !== void 0 ? r[u] : void 0
    ), l !== void 0 && i[l.namespaceURI][l.localName].call(
      s,
      l,
      a,
      n
    ));
}
function A(i, t, e, n, r, s, o) {
  return r.push(i), Yr(t, e, n, r, s, o), /** @type {O|undefined} */
  r.pop();
}
let Zt;
function Ur() {
  return Zt === void 0 && typeof XMLSerializer < "u" && (Zt = new XMLSerializer()), Zt;
}
let Xt;
function ie() {
  return Xt === void 0 && typeof document < "u" && (Xt = document.implementation.createDocument("", "", null)), Xt;
}
const Dr = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
};
function Mt(i, t, e, n, r) {
  if (r) {
    const o = e;
    e = function(a) {
      return i.removeEventListener(t, e), o.call(n ?? this, a);
    };
  } else n && n !== i && (e = e.bind(n));
  const s = {
    target: i,
    type: t,
    listener: e
  };
  return i.addEventListener(t, e), s;
}
function Oe(i, t, e, n) {
  return Mt(i, t, e, n, !0);
}
function qt(i) {
  i && i.target && (i.target.removeEventListener(i.type, i.listener), cn(i));
}
const Nn = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change"
};
class Br {
  constructor() {
    this.disposed = !1;
  }
  /**
   * Clean up.
   */
  dispose() {
    this.disposed || (this.disposed = !0, this.disposeInternal());
  }
  /**
   * Extension point for disposable objects.
   * @protected
   */
  disposeInternal() {
  }
}
function xe() {
}
function Zr(i) {
  let t, e, n;
  return function() {
    const r = Array.prototype.slice.call(arguments);
    return (!e || this !== n || !Gr(r, e)) && (n = this, e = r, t = i.apply(this, arguments)), t;
  };
}
class Cn {
  /**
   * @param {string} type Type.
   */
  constructor(t) {
    this.propagationStopped, this.defaultPrevented, this.type = t, this.target = null;
  }
  /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */
  preventDefault() {
    this.defaultPrevented = !0;
  }
  /**
   * Stop event propagation.
   * @api
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
class Xr extends Br {
  /**
   * @param {*} [target] Default event target for dispatched events.
   */
  constructor(t) {
    super(), this.eventTarget_ = t, this.pendingRemovals_ = null, this.dispatching_ = null, this.listeners_ = null;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  addEventListener(t, e) {
    if (!t || !e)
      return;
    const n = this.listeners_ || (this.listeners_ = {}), r = n[t] || (n[t] = []);
    r.includes(e) || r.push(e);
  }
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */
  dispatchEvent(t) {
    const e = typeof t == "string", n = e ? t : t.type, r = this.listeners_ && this.listeners_[n];
    if (!r)
      return;
    const s = e ? new Cn(t) : (
      /** @type {Event} */
      t
    );
    s.target || (s.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    n in o || (o[n] = 0, a[n] = 0), ++o[n];
    let l;
    for (let u = 0, h = r.length; u < h; ++u)
      if ("handleEvent" in r[u] ? l = /** @type {import("../events.js").ListenerObject} */
      r[u].handleEvent(s) : l = /** @type {import("../events.js").ListenerFunction} */
      r[u].call(this, s), l === !1 || s.propagationStopped) {
        l = !1;
        break;
      }
    if (--o[n] === 0) {
      let u = a[n];
      for (delete a[n]; u--; )
        this.removeEventListener(n, xe);
      delete o[n];
    }
    return l;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.listeners_ && cn(this.listeners_);
  }
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */
  getListeners(t) {
    return this.listeners_ && this.listeners_[t] || void 0;
  }
  /**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */
  hasListener(t) {
    return this.listeners_ ? t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0 : !1;
  }
  /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */
  removeEventListener(t, e) {
    if (!this.listeners_)
      return;
    const n = this.listeners_[t];
    if (!n)
      return;
    const r = n.indexOf(e);
    r !== -1 && (this.pendingRemovals_ && t in this.pendingRemovals_ ? (n[r] = xe, ++this.pendingRemovals_[t]) : (n.splice(r, 1), n.length === 0 && delete this.listeners_[t]));
  }
}
class Ft extends Xr {
  constructor() {
    super(), this.on = /** @type {ObservableOnSignature<import("./events.js").EventsKey>} */
    this.onInternal, this.once = /** @type {ObservableOnSignature<import("./events.js").EventsKey>} */
    this.onceInternal, this.un = /** @type {ObservableOnSignature<void>} */
    this.unInternal, this.revision_ = 0;
  }
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */
  changed() {
    ++this.revision_, this.dispatchEvent(Nn.CHANGE);
  }
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */
  getRevision() {
    return this.revision_;
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onInternal(t, e) {
    if (Array.isArray(t)) {
      const n = t.length, r = new Array(n);
      for (let s = 0; s < n; ++s)
        r[s] = Mt(this, t[s], e);
      return r;
    }
    return Mt(
      this,
      /** @type {string} */
      t,
      e
    );
  }
  /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */
  onceInternal(t, e) {
    let n;
    if (Array.isArray(t)) {
      const r = t.length;
      n = new Array(r);
      for (let s = 0; s < r; ++s)
        n[s] = Oe(this, t[s], e);
    } else
      n = Oe(
        this,
        /** @type {string} */
        t,
        e
      );
    return e.ol_key = n, n;
  }
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
   * @protected
   */
  unInternal(t, e) {
    const n = (
      /** @type {Object} */
      e.ol_key
    );
    if (n)
      Vr(n);
    else if (Array.isArray(t))
      for (let r = 0, s = t.length; r < s; ++r)
        this.removeEventListener(t[r], e);
    else
      this.removeEventListener(t, e);
  }
}
Ft.prototype.on;
Ft.prototype.once;
Ft.prototype.un;
function Vr(i) {
  if (Array.isArray(i))
    for (let t = 0, e = i.length; t < e; ++t)
      qt(i[t]);
  else
    qt(
      /** @type {import("./events.js").EventsKey} */
      i
    );
}
function L() {
  throw new Error("Unimplemented abstract method.");
}
let zr = 0;
function Wr(i) {
  return i.ol_uid || (i.ol_uid = String(++zr));
}
class Ge extends Cn {
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */
  constructor(t, e, n) {
    super(t), this.key = e, this.oldValue = n;
  }
}
class Pn extends Ft {
  /**
   * @param {NoInfer<Properties>} [values] An object with key-value pairs.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, Wr(this), this.values_ = null, t !== void 0 && this.setProperties(t);
  }
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */
  get(t) {
    let e;
    return this.values_ && this.values_.hasOwnProperty(t) && (e = this.values_[t]), e;
  }
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */
  getKeys() {
    return this.values_ && Object.keys(this.values_) || [];
  }
  /**
   * Get an object of all property names and values.
   * @return {NoInfer<Properties>} Object.
   * @api
   */
  getProperties() {
    return (
      /** @type {NoInfer<Properties>} */
      this.values_ && Object.assign({}, this.values_) || {}
    );
  }
  /**
   * Get an object of all property names and values.
   * @return {Partial<NoInfer<Properties>>?} Object.
   */
  getPropertiesInternal() {
    return this.values_;
  }
  /**
   * @return {boolean} The object has properties.
   */
  hasProperties() {
    return !!this.values_;
  }
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */
  notify(t, e) {
    let n;
    n = `change:${t}`, this.hasListener(n) && this.dispatchEvent(new Ge(n, t, e)), n = Dr.PROPERTYCHANGE, this.hasListener(n) && this.dispatchEvent(new Ge(n, t, e));
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  addChangeListener(t, e) {
    this.addEventListener(`change:${t}`, e);
  }
  /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */
  removeChangeListener(t, e) {
    this.removeEventListener(`change:${t}`, e);
  }
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  set(t, e, n) {
    const r = this.values_ || (this.values_ = {});
    if (n)
      r[t] = e;
    else {
      const s = r[t];
      r[t] = e, s !== e && this.notify(t, s);
    }
  }
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Partial<NoInfer<Properties>>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */
  setProperties(t, e) {
    for (const n in t)
      this.set(n, t[n], e);
  }
  /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */
  applyProperties(t) {
    t.values_ && Object.assign(this.values_ || (this.values_ = {}), t.values_);
  }
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */
  unset(t, e) {
    if (this.values_ && t in this.values_) {
      const n = this.values_[t];
      delete this.values_[t], pr(this.values_) && (this.values_ = null), e || this.notify(t, n);
    }
  }
}
class vt extends Pn {
  /**
   * @param {Geometry|ObjectWithGeometry<Geometry, NoInfer<Properties>>} [geometryOrProperties]
   *     You may pass a Geometry object directly, or an object literal containing
   *     properties. If you pass an object literal, you may include a Geometry
   *     associated with a `geometry` key.
   */
  constructor(t) {
    if (super(), this.on, this.once, this.un, this.id_ = void 0, this.geometryName_ = "geometry", this.style_ = null, this.styleFunction_ = void 0, this.geometryChangeKey_ = null, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), t)
      if (typeof /** @type {?} */
      t.getSimplifiedGeometry == "function") {
        const e = (
          /** @type {Geometry} */
          t
        );
        this.setGeometry(e);
      } else {
        const e = t;
        this.setProperties(e);
      }
  }
  /**
   * Clone this feature. If the original feature has a geometry it
   * is also cloned. The feature id is not set in the clone.
   * @return {Feature<Geometry>} The clone.
   * @api
   */
  clone() {
    const t = (
      /** @type {Feature<Geometry>} */
      new vt()
    ), e = this.geometryName_;
    t.setGeometryName(e);
    const n = this.getPropertiesInternal();
    if (n) {
      const s = this.getGeometry();
      for (const o in n)
        o === e && s ? t.set(o, s.clone()) : t.set(o, n[o], !0);
    }
    const r = this.getStyle();
    return r && t.setStyle(r), t;
  }
  /**
   * Get the feature's default geometry.  A feature may have any number of named
   * geometries.  The "default" geometry (the one that is rendered by default) is
   * set when calling {@link module:ol/Feature~Feature#setGeometry}.
   * @return {Geometry|undefined} The default geometry for the feature.
   * @api
   * @observable
   */
  getGeometry() {
    return (
      /** @type {Geometry|undefined} */
      this.get(this.geometryName_)
    );
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is either set when reading data from a remote source or set explicitly by
   * calling {@link module:ol/Feature~Feature#setId}.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * Get the name of the feature's default geometry.  By default, the default
   * geometry is named `geometry`.
   * @return {string} Get the property name associated with the default geometry
   *     for this feature.
   * @api
   */
  getGeometryName() {
    return this.geometryName_;
  }
  /**
   * Get the feature's style. Will return what was provided to the
   * {@link module:ol/Feature~Feature#setStyle} method.
   * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the feature's style function.
   * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
   * representing the current style of this feature.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @private
   */
  handleGeometryChange_() {
    this.changed();
  }
  /**
   * @private
   */
  handleGeometryChanged_() {
    this.geometryChangeKey_ && (qt(this.geometryChangeKey_), this.geometryChangeKey_ = null);
    const t = this.getGeometry();
    t && (this.geometryChangeKey_ = Mt(
      t,
      Nn.CHANGE,
      this.handleGeometryChange_,
      this
    )), this.changed();
  }
  /**
   * Set the default geometry for the feature.  This will update the property
   * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
   * @param {Geometry|undefined} geometry The new geometry.
   * @api
   * @observable
   */
  setGeometry(t) {
    this.set(this.geometryName_, t);
  }
  /**
   * Set the style for the feature to override the layer style.  This can be a
   * single style object, an array of styles, or a function that takes a
   * resolution and returns an array of styles. To unset the feature style, call
   * `setStyle()` without arguments or a falsey value.
   * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setStyle(t) {
    this.style_ = t, this.styleFunction_ = t ? $r(t) : void 0, this.changed();
  }
  /**
   * Set the feature id.  The feature id is considered stable and may be used when
   * requesting features or comparing identifiers returned from a remote source.
   * The feature id can be used with the
   * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
   * @param {number|string|undefined} id The feature id.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */
  setId(t) {
    this.id_ = t, this.changed();
  }
  /**
   * Set the property name to be used when getting the feature's default geometry.
   * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
   * this name will be returned.
   * @param {string} name The property name of the default geometry.
   * @api
   */
  setGeometryName(t) {
    t !== this.geometryName_ && (this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_), this.geometryName_ = t, this.addChangeListener(this.geometryName_, this.handleGeometryChanged_), this.handleGeometryChanged_());
  }
}
function $r(i) {
  if (typeof i == "function")
    return i;
  let t;
  return Array.isArray(i) ? t = i : (st(
    typeof /** @type {?} */
    i.getZIndex == "function",
    "Expected an `ol/style/Style` or an array of `ol/style/Style.js`"
  ), t = [
    /** @type {import("./style/Style.js").default} */
    i
  ]), function() {
    return t;
  };
}
const qr = [1, 0, 0, 1, 0, 0];
new Array(6);
function Hr() {
  return qr.slice(0);
}
function Kr(i, t, e, n, r, s, o, a) {
  const l = Math.sin(s), u = Math.cos(s);
  return i[0] = n * u, i[1] = r * l, i[2] = -n * l, i[3] = r * u, i[4] = o * n * u - a * n * l + t, i[5] = o * r * l + a * r * u + e, i;
}
function Qr(i, t, e, n, r, s, o) {
  s = s || [], o = o || 2;
  let a = 0;
  for (let l = t; l < e; l += n) {
    const u = i[l], h = i[l + 1];
    s[a++] = r[0] * u + r[2] * h + r[4], s[a++] = r[1] * u + r[3] * h + r[5];
    for (let c = 2; c < o; c++)
      s[a++] = i[l + c];
  }
  return s && s.length != a && (s.length = a), s;
}
function Jr(i, t, e, n, r, s, o) {
  o = o || [];
  const a = Math.cos(r), l = Math.sin(r), u = s[0], h = s[1];
  let c = 0;
  for (let g = t; g < e; g += n) {
    const d = i[g] - u, m = i[g + 1] - h;
    o[c++] = u + d * a - m * l, o[c++] = h + d * l + m * a;
    for (let R = g + 2; R < g + n; ++R)
      o[c++] = i[R];
  }
  return o && o.length != c && (o.length = c), o;
}
function jr(i, t, e, n, r, s, o, a) {
  a = a || [];
  const l = o[0], u = o[1];
  let h = 0;
  for (let c = t; c < e; c += n) {
    const g = i[c] - l, d = i[c + 1] - u;
    a[h++] = l + r * g, a[h++] = u + s * d;
    for (let m = c + 2; m < c + n; ++m)
      a[h++] = i[m];
  }
  return a && a.length != h && (a.length = h), a;
}
function kr(i, t, e, n, r, s, o) {
  o = o || [];
  let a = 0;
  for (let l = t; l < e; l += n) {
    o[a++] = i[l] + r, o[a++] = i[l + 1] + s;
    for (let u = l + 2; u < l + n; ++u)
      o[a++] = i[u];
  }
  return o && o.length != a && (o.length = a), o;
}
const be = Hr(), ti = [NaN, NaN];
class Mn extends Pn {
  constructor() {
    super(), this.extent_ = Jt(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = Zr(
      (t, e, n) => {
        if (!n)
          return this.getSimplifiedGeometry(e);
        const r = this.clone();
        return r.applyTransform(n), r.getSimplifiedGeometry(e);
      }
    );
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */
  simplifyTransformed(t, e) {
    return this.simplifyTransformedInternal(
      this.getRevision(),
      t,
      e
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */
  clone() {
    return L();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(t, e, n, r) {
    return L();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(t, e) {
    return this.closestPointXY(t, e, ti, Number.MIN_VALUE) === 0;
  }
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */
  getClosestPoint(t, e) {
    return e = e || [NaN, NaN], this.closestPointXY(t[0], t[1], e, 1 / 0), e;
  }
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */
  intersectsCoordinate(t) {
    return this.containsXY(t[0], t[1]);
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(t) {
    return L();
  }
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */
  getExtent(t) {
    if (this.extentRevision_ != this.getRevision()) {
      const e = this.computeExtent(this.extent_);
      (isNaN(e[0]) || isNaN(e[1])) && jt(e), this.extentRevision_ = this.getRevision();
    }
    return tr(this.extent_, t);
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(t, e) {
    L();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(t, e, n) {
    L();
  }
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */
  simplify(t) {
    return this.getSimplifiedGeometry(t * t);
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */
  getSimplifiedGeometry(t) {
    return L();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return L();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */
  applyTransform(t) {
    L();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(t) {
    return L();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(t, e) {
    L();
  }
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {this} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */
  transform(t, e) {
    const n = v(t), r = n.getUnits() == "tile-pixels" ? function(s, o, a) {
      const l = n.getExtent(), u = n.getWorldExtent(), h = Ne(u) / Ne(l);
      Kr(
        be,
        u[0],
        u[3],
        h,
        -h,
        0,
        0,
        0
      );
      const c = Qr(
        s,
        0,
        s.length,
        a,
        be,
        o
      ), g = Pt(n, e);
      return g ? g(c, c, a) : c;
    } : Pt(n, e);
    return this.applyTransform(r), this;
  }
}
class Q extends Mn {
  constructor() {
    super(), this.layout = "XY", this.stride = 2, this.flatCoordinates;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(t) {
    return ln(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */
  getCoordinates() {
    return L();
  }
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */
  getLastCoordinate() {
    return this.flatCoordinates.slice(
      this.flatCoordinates.length - this.stride
    );
  }
  /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */
  getLayout() {
    return this.layout;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @override
   */
  getSimplifiedGeometry(t) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t <= this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const e = this.getSimplifiedGeometryInternal(t);
    return e.getFlatCoordinates().length < this.flatCoordinates.length ? e : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this);
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */
  getSimplifiedGeometryInternal(t) {
    return this;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride;
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */
  setFlatCoordinates(t, e) {
    this.stride = Ye(t), this.layout = t, this.flatCoordinates = e;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(t, e) {
    L();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(t, e, n) {
    let r;
    if (t)
      r = Ye(t);
    else {
      for (let s = 0; s < n; ++s) {
        if (e.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        }
        e = /** @type {Array<unknown>} */
        e[0];
      }
      r = e.length, t = ei(r);
    }
    this.layout = t, this.stride = r;
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   * @override
   */
  applyTransform(t) {
    this.flatCoordinates && (t(
      this.flatCoordinates,
      this.flatCoordinates,
      this.layout.startsWith("XYZ") ? 3 : 2,
      this.stride
    ), this.changed());
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   * @override
   */
  rotate(t, e) {
    const n = this.getFlatCoordinates();
    if (n) {
      const r = this.getStride();
      Jr(
        n,
        0,
        n.length,
        r,
        t,
        e,
        n
      ), this.changed();
    }
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   * @override
   */
  scale(t, e, n) {
    e === void 0 && (e = t), n || (n = hn(this.getExtent()));
    const r = this.getFlatCoordinates();
    if (r) {
      const s = this.getStride();
      jr(
        r,
        0,
        r.length,
        s,
        t,
        e,
        n,
        r
      ), this.changed();
    }
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   * @override
   */
  translate(t, e) {
    const n = this.getFlatCoordinates();
    if (n) {
      const r = this.getStride();
      kr(
        n,
        0,
        n.length,
        r,
        t,
        e,
        n
      ), this.changed();
    }
  }
}
function ei(i) {
  let t;
  return i == 2 ? t = "XY" : i == 3 ? t = "XYZ" : i == 4 && (t = "XYZM"), /** @type {import("./Geometry.js").GeometryLayout} */
  t;
}
function Ye(i) {
  let t;
  return i == "XY" ? t = 2 : i == "XYZ" || i == "XYM" ? t = 3 : i == "XYZM" && (t = 4), /** @type {number} */
  t;
}
function Ue(i, t, e, n, r, s, o) {
  const a = i[t], l = i[t + 1], u = i[e] - a, h = i[e + 1] - l;
  let c;
  if (u === 0 && h === 0)
    c = t;
  else {
    const g = ((r - a) * u + (s - l) * h) / (u * u + h * h);
    if (g > 1)
      c = e;
    else if (g > 0) {
      for (let d = 0; d < n; ++d)
        o[d] = kt(
          i[t + d],
          i[e + d],
          g
        );
      o.length = n;
      return;
    } else
      c = t;
  }
  for (let g = 0; g < n; ++g)
    o[g] = i[c + g];
  o.length = n;
}
function se(i, t, e, n, r) {
  let s = i[t], o = i[t + 1];
  for (t += n; t < e; t += n) {
    const a = i[t], l = i[t + 1], u = $(s, o, a, l);
    u > r && (r = u), s = a, o = l;
  }
  return r;
}
function oe(i, t, e, n, r) {
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s];
    r = se(i, t, a, n, r), t = a;
  }
  return r;
}
function ni(i, t, e, n, r) {
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s];
    r = oe(i, t, a, n, r), t = a[a.length - 1];
  }
  return r;
}
function ae(i, t, e, n, r, s, o, a, l, u, h) {
  if (t == e)
    return u;
  let c, g;
  if (r === 0) {
    if (g = $(
      o,
      a,
      i[t],
      i[t + 1]
    ), g < u) {
      for (c = 0; c < n; ++c)
        l[c] = i[t + c];
      return l.length = n, g;
    }
    return u;
  }
  h = h || [NaN, NaN];
  let d = t + n;
  for (; d < e; )
    if (Ue(
      i,
      d - n,
      d,
      n,
      o,
      a,
      h
    ), g = $(o, a, h[0], h[1]), g < u) {
      for (u = g, c = 0; c < n; ++c)
        l[c] = h[c];
      l.length = n, d += n;
    } else
      d += n * Math.max(
        (Math.sqrt(g) - Math.sqrt(u)) / r | 0,
        1
      );
  if (s && (Ue(
    i,
    e - n,
    t,
    n,
    o,
    a,
    h
  ), g = $(o, a, h[0], h[1]), g < u)) {
    for (u = g, c = 0; c < n; ++c)
      l[c] = h[c];
    l.length = n;
  }
  return u;
}
function le(i, t, e, n, r, s, o, a, l, u, h) {
  h = h || [NaN, NaN];
  for (let c = 0, g = e.length; c < g; ++c) {
    const d = e[c];
    u = ae(
      i,
      t,
      d,
      n,
      r,
      s,
      o,
      a,
      l,
      u,
      h
    ), t = d;
  }
  return u;
}
function ri(i, t, e, n, r, s, o, a, l, u, h) {
  h = h || [NaN, NaN];
  for (let c = 0, g = e.length; c < g; ++c) {
    const d = e[c];
    u = le(
      i,
      t,
      d,
      n,
      r,
      s,
      o,
      a,
      l,
      u,
      h
    ), t = d[d.length - 1];
  }
  return u;
}
function ii(i, t, e, n) {
  for (let r = 0, s = e.length; r < s; ++r)
    i[t++] = e[r];
  return t;
}
function Ot(i, t, e, n) {
  for (let r = 0, s = e.length; r < s; ++r) {
    const o = e[r];
    for (let a = 0; a < n; ++a)
      i[t++] = o[a];
  }
  return t;
}
function ue(i, t, e, n, r) {
  r = r || [];
  let s = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = Ot(
      i,
      t,
      e[o],
      n
    );
    r[s++] = l, t = l;
  }
  return r.length = s, r;
}
function si(i, t, e, n, r) {
  r = r || [];
  let s = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = ue(
      i,
      t,
      e[o],
      n,
      r[s]
    );
    l.length === 0 && (l[0] = t), r[s++] = l, t = l[l.length - 1];
  }
  return r.length = s, r;
}
function xt(i, t, e, n, r) {
  r = r !== void 0 ? r : [];
  let s = 0;
  for (let o = t; o < e; o += n)
    r[s++] = i.slice(o, o + n);
  return r.length = s, r;
}
function he(i, t, e, n, r) {
  r = r !== void 0 ? r : [];
  let s = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    r[s++] = xt(
      i,
      t,
      l,
      n,
      r[s]
    ), t = l;
  }
  return r.length = s, r;
}
function oi(i, t, e, n, r) {
  r = r !== void 0 ? r : [];
  let s = 0;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    r[s++] = l.length === 1 && l[0] === t ? [] : he(
      i,
      t,
      l,
      n,
      r[s]
    ), t = l[l.length - 1];
  }
  return r.length = s, r;
}
function An(i, t, e, n, r, s, o) {
  let a, l;
  const u = (e - t) / n;
  if (u === 1)
    a = t;
  else if (u === 2)
    a = t, l = r;
  else if (u !== 0) {
    let h = i[t], c = i[t + 1], g = 0;
    const d = [0];
    for (let S = t + n; S < e; S += n) {
      const T = i[S], M = i[S + 1];
      g += Math.sqrt((T - h) * (T - h) + (M - c) * (M - c)), d.push(g), h = T, c = M;
    }
    const m = r * g, R = xr(d, m);
    R < 0 ? (l = (m - d[-R - 2]) / (d[-R - 1] - d[-R - 2]), a = t + (-R - 2) * n) : a = t + R * n;
  }
  o = o > 1 ? o : 2, s = s || new Array(o);
  for (let h = 0; h < o; ++h)
    s[h] = a === void 0 ? NaN : l === void 0 ? i[a + h] : kt(i[a + h], i[a + n + h], l);
  return s;
}
function Ht(i, t, e, n, r, s) {
  if (e == t)
    return null;
  let o;
  if (r < i[t + n - 1])
    return s ? (o = i.slice(t, t + n), o[n - 1] = r, o) : null;
  if (i[e - 1] < r)
    return s ? (o = i.slice(e - n, e), o[n - 1] = r, o) : null;
  if (r == i[t + n - 1])
    return i.slice(t, t + n);
  let a = t / n, l = e / n;
  for (; a < l; ) {
    const g = a + l >> 1;
    r < i[(g + 1) * n - 1] ? l = g : a = g + 1;
  }
  const u = i[a * n - 1];
  if (r == u)
    return i.slice((a - 1) * n, (a - 1) * n + n);
  const h = i[(a + 1) * n - 1], c = (r - u) / (h - u);
  o = [];
  for (let g = 0; g < n - 1; ++g)
    o.push(
      kt(
        i[(a - 1) * n + g],
        i[a * n + g],
        c
      )
    );
  return o.push(r), o;
}
function ai(i, t, e, n, r, s, o) {
  if (o)
    return Ht(
      i,
      t,
      e[e.length - 1],
      n,
      r,
      s
    );
  let a;
  if (r < i[n - 1])
    return s ? (a = i.slice(0, n), a[n - 1] = r, a) : null;
  if (i[i.length - 1] < r)
    return s ? (a = i.slice(i.length - n), a[n - 1] = r, a) : null;
  for (let l = 0, u = e.length; l < u; ++l) {
    const h = e[l];
    if (t != h) {
      if (r < i[t + n - 1])
        return null;
      if (r <= i[h - 1])
        return Ht(
          i,
          t,
          h,
          n,
          r,
          !1
        );
      t = h;
    }
  }
  return null;
}
function li(i, t, e, n, r) {
  return !qn(
    r,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(o) {
      return !W(
        i,
        t,
        e,
        n,
        o[0],
        o[1]
      );
    }
  );
}
function W(i, t, e, n, r, s) {
  let o = 0, a = i[e - n], l = i[e - n + 1];
  for (; t < e; t += n) {
    const u = i[t], h = i[t + 1];
    l <= s ? h > s && (u - a) * (s - l) - (r - a) * (h - l) > 0 && o++ : h <= s && (u - a) * (s - l) - (r - a) * (h - l) < 0 && o--, a = u, l = h;
  }
  return o !== 0;
}
function ce(i, t, e, n, r, s) {
  if (e.length === 0 || !W(i, t, e[0], n, r, s))
    return !1;
  for (let o = 1, a = e.length; o < a; ++o)
    if (W(i, e[o - 1], e[o], n, r, s))
      return !1;
  return !0;
}
function ui(i, t, e, n, r, s) {
  if (e.length === 0)
    return !1;
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    if (ce(i, t, l, n, r, s))
      return !0;
    t = l[l.length - 1];
  }
  return !1;
}
function Ln(i, t, e, n, r) {
  let s;
  for (t += n; t < e; t += n)
    if (s = r(
      i.slice(t - n, t),
      i.slice(t, t + n)
    ), s)
      return s;
  return !1;
}
function Et(i, t, e, n, r, s) {
  return s = s ?? un(Jt(), i, t, e, n), jn(r, s) ? s[0] >= r[0] && s[2] <= r[2] || s[1] >= r[1] && s[3] <= r[3] ? !0 : Ln(
    i,
    t,
    e,
    n,
    /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */
    function(o, a) {
      return er(r, o, a);
    }
  ) : !1;
}
function hi(i, t, e, n, r) {
  for (let s = 0, o = e.length; s < o; ++s) {
    if (Et(i, t, e[s], n, r))
      return !0;
    t = e[s];
  }
  return !1;
}
function ci(i, t, e, n, r) {
  return !!(Et(i, t, e, n, r) || W(
    i,
    t,
    e,
    n,
    r[0],
    r[1]
  ) || W(
    i,
    t,
    e,
    n,
    r[0],
    r[3]
  ) || W(
    i,
    t,
    e,
    n,
    r[2],
    r[1]
  ) || W(
    i,
    t,
    e,
    n,
    r[2],
    r[3]
  ));
}
function In(i, t, e, n, r) {
  if (!ci(i, t, e[0], n, r))
    return !1;
  if (e.length === 1)
    return !0;
  for (let s = 1, o = e.length; s < o; ++s)
    if (li(
      i,
      e[s - 1],
      e[s],
      n,
      r
    ) && !Et(
      i,
      e[s - 1],
      e[s],
      n,
      r
    ))
      return !1;
  return !0;
}
function gi(i, t, e, n, r) {
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s];
    if (In(i, t, a, n, r))
      return !0;
    t = a[a.length - 1];
  }
  return !1;
}
function Tn(i, t, e, n) {
  let r = i[t], s = i[t + 1], o = 0;
  for (let a = t + n; a < e; a += n) {
    const l = i[a], u = i[a + 1];
    o += Math.sqrt((l - r) * (l - r) + (u - s) * (u - s)), r = l, s = u;
  }
  return o;
}
function ge(i, t, e, n, r, s, o) {
  const a = (e - t) / n;
  if (a < 3) {
    for (; t < e; t += n)
      s[o++] = i[t], s[o++] = i[t + 1];
    return o;
  }
  const l = new Array(a);
  l[0] = 1, l[a - 1] = 1;
  const u = [t, e - n];
  let h = 0;
  for (; u.length > 0; ) {
    const c = u.pop(), g = u.pop();
    let d = 0;
    const m = i[g], R = i[g + 1], S = i[c], T = i[c + 1];
    for (let M = g + n; M < c; M += n) {
      const b = i[M], O = i[M + 1], X = rr(b, O, m, R, S, T);
      X > d && (h = M, d = X);
    }
    d > r && (l[(h - t) / n] = 1, g + n < h && u.push(g, h), h + n < c && u.push(h, c));
  }
  for (let c = 0; c < a; ++c)
    l[c] && (s[o++] = i[t + c * n], s[o++] = i[t + c * n + 1]);
  return o;
}
function pi(i, t, e, n, r, s, o, a) {
  for (let l = 0, u = e.length; l < u; ++l) {
    const h = e[l];
    o = ge(
      i,
      t,
      h,
      n,
      r,
      s,
      o
    ), a.push(o), t = h;
  }
  return o;
}
function j(i, t) {
  return t * Math.round(i / t);
}
function fi(i, t, e, n, r, s, o) {
  if (t == e)
    return o;
  let a = j(i[t], r), l = j(i[t + 1], r);
  t += n, s[o++] = a, s[o++] = l;
  let u, h;
  do
    if (u = j(i[t], r), h = j(i[t + 1], r), t += n, t == e)
      return s[o++] = u, s[o++] = h, o;
  while (u == a && h == l);
  for (; t < e; ) {
    const c = j(i[t], r), g = j(i[t + 1], r);
    if (t += n, c == u && g == h)
      continue;
    const d = u - a, m = h - l, R = c - a, S = g - l;
    if (d * S == m * R && (d < 0 && R < d || d == R || d > 0 && R > d) && (m < 0 && S < m || m == S || m > 0 && S > m)) {
      u = c, h = g;
      continue;
    }
    s[o++] = u, s[o++] = h, a = u, l = h, u = c, h = g;
  }
  return s[o++] = u, s[o++] = h, o;
}
function Fn(i, t, e, n, r, s, o, a) {
  for (let l = 0, u = e.length; l < u; ++l) {
    const h = e[l];
    o = fi(
      i,
      t,
      h,
      n,
      r,
      s,
      o
    ), a.push(o), t = h;
  }
  return o;
}
function di(i, t, e, n, r, s, o, a) {
  for (let l = 0, u = e.length; l < u; ++l) {
    const h = e[l], c = [];
    o = Fn(
      i,
      t,
      h,
      n,
      r,
      s,
      o,
      c
    ), a.push(c), t = h[h.length - 1];
  }
  return o;
}
class H extends Q {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), this.flatMidpoint_ = null, this.flatMidpointRevision_ = -1, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, e !== void 0 && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ) : this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      t,
      e
    );
  }
  /**
   * Append the passed coordinate to the coordinates of the linestring.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @api
   */
  appendCoordinate(t) {
    x(this.flatCoordinates, t), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LineString} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new H(
      this.flatCoordinates.slice(),
      this.layout
    );
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, r) {
    return r < ut(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      se(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), ae(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !1,
      t,
      e,
      n,
      r
    ));
  }
  /**
   * Iterate over each segment, calling the provided callback.
   * If the callback returns a truthy value the function returns that
   * value immediately. Otherwise the function returns `false`.
   *
   * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
   *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
   * @return {T|boolean} Value.
   * @template T,S
   * @api
   */
  forEachSegment(t) {
    return Ln(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */
  getCoordinateAtM(t, e) {
    return this.layout != "XYM" && this.layout != "XYZM" ? null : (e = e !== void 0 ? e : !1, Ht(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e
    ));
  }
  /**
   * Return the coordinates of the linestring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return xt(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinate at the provided fraction along the linestring.
   * The `fraction` is a number between 0 and 1, where 0 is the start of the
   * linestring and 1 is the end.
   * @param {number} fraction Fraction.
   * @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
   *     be modified. If not provided, a new coordinate will be returned.
   * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
   * @api
   */
  getCoordinateAt(t, e) {
    return An(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      this.stride
    );
  }
  /**
   * Return the length of the linestring on projected plane.
   * @return {number} Length (on projected plane).
   * @api
   */
  getLength() {
    return Tn(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    return this.flatMidpointRevision_ != this.getRevision() && (this.flatMidpoint_ = this.getCoordinateAt(
      0.5,
      this.flatMidpoint_ ?? void 0
    ), this.flatMidpointRevision_ = this.getRevision()), /** @type {Array<number>} */
    this.flatMidpoint_;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} Simplified LineString.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return e.length = ge(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new H(e, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "LineString";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return Et(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      this.getExtent()
    );
  }
  /**
   * Set the coordinates of the linestring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Ot(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
class ft extends Q {
  /**
   * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
   *     Coordinates or LineString geometries. (For internal use, flat coordinates in
   *     combination with `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Flat coordinate ends for internal use.
   */
  constructor(t, e, n) {
    if (super(), this.ends_ = [], this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, Array.isArray(t[0]))
      this.setCoordinates(
        /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
        t,
        e
      );
    else if (e !== void 0 && n)
      this.setFlatCoordinates(
        e,
        /** @type {Array<number>} */
        t
      ), this.ends_ = n;
    else {
      const r = (
        /** @type {Array<LineString>} */
        t
      ), s = [], o = [];
      for (let l = 0, u = r.length; l < u; ++l) {
        const h = r[l];
        x(s, h.getFlatCoordinates()), o.push(s.length);
      }
      const a = r.length === 0 ? this.getLayout() : r[0].getLayout();
      this.setFlatCoordinates(a, s), this.ends_ = o;
    }
  }
  /**
   * Append the passed linestring to the multilinestring.
   * @param {LineString} lineString LineString.
   * @api
   */
  appendLineString(t) {
    x(this.flatCoordinates, t.getFlatCoordinates().slice()), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiLineString} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new ft(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, r) {
    return r < ut(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      oe(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), le(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !1,
      t,
      e,
      n,
      r
    ));
  }
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * `interpolate` controls interpolation between consecutive LineStrings
   * within the MultiLineString. If `interpolate` is `true` the coordinates
   * will be linearly interpolated between the last coordinate of one LineString
   * and the first coordinate of the next LineString.  If `interpolate` is
   * `false` then the function will return `null` for Ms falling between
   * LineStrings.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @param {boolean} [interpolate] Interpolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */
  getCoordinateAtM(t, e, n) {
    return this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0 ? null : (e = e !== void 0 ? e : !1, n = n !== void 0 ? n : !1, ai(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t,
      e,
      n
    ));
  }
  /**
   * Return the coordinates of the multilinestring.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return he(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Return the linestring at the specified index.
   * @param {number} index Index.
   * @return {LineString} LineString.
   * @api
   */
  getLineString(t) {
    return t < 0 || this.ends_.length <= t ? null : new H(
      this.flatCoordinates.slice(
        t === 0 ? 0 : this.ends_[t - 1],
        this.ends_[t]
      ),
      this.layout
    );
  }
  /**
   * Return the linestrings of this multilinestring.
   * @return {Array<LineString>} LineStrings.
   * @api
   */
  getLineStrings() {
    const t = this.flatCoordinates, e = this.ends_, n = this.layout, r = [];
    let s = 0;
    for (let o = 0, a = e.length; o < a; ++o) {
      const l = e[o], u = new H(
        t.slice(s, l),
        n
      );
      r.push(u), s = l;
    }
    return r;
  }
  /**
   * Return the sum of all line string lengths
   * @return {number} Length (on projected plane).
   * @api
   */
  getLength() {
    const t = this.ends_;
    let e = 0, n = 0;
    for (let r = 0, s = t.length; r < s; ++r)
      n += Tn(
        this.flatCoordinates,
        e,
        t[r],
        this.stride
      ), e = t[r];
    return n;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    const t = [], e = this.flatCoordinates;
    let n = 0;
    const r = this.ends_, s = this.stride;
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o], u = An(
        e,
        n,
        l,
        s,
        0.5
      );
      x(t, u), n = l;
    }
    return t;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiLineString} Simplified MultiLineString.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = pi(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t,
      e,
      0,
      n
    ), new ft(e, "XY", n);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "MultiLineString";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return hi(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  /**
   * Set the coordinates of the multilinestring.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = ue(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
class at extends Q {
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), this.setCoordinates(t, e);
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new at(this.flatCoordinates.slice(), this.layout);
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, r) {
    const s = this.flatCoordinates, o = $(
      t,
      e,
      s[0],
      s[1]
    );
    if (o < r) {
      const a = this.stride;
      for (let l = 0; l < a; ++l)
        n[l] = s[l];
      return n.length = a, o;
    }
    return r;
  }
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return this.flatCoordinates.slice();
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(t) {
    return Wn(this.flatCoordinates, t);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Point";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return an(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = ii(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
class Gt extends Q {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), e && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ) : this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      t,
      e
    );
  }
  /**
   * Append the passed point to this multipoint.
   * @param {Point} point Point.
   * @api
   */
  appendPoint(t) {
    x(this.flatCoordinates, t.getFlatCoordinates()), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPoint} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new Gt(
      this.flatCoordinates.slice(),
      this.layout
    );
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, r) {
    if (r < ut(this.getExtent(), t, e))
      return r;
    const s = this.flatCoordinates, o = this.stride;
    for (let a = 0, l = s.length; a < l; a += o) {
      const u = $(
        t,
        e,
        s[a],
        s[a + 1]
      );
      if (u < r) {
        r = u;
        for (let h = 0; h < o; ++h)
          n[h] = s[a + h];
        n.length = o;
      }
    }
    return r;
  }
  /**
   * Return the coordinates of the multipoint.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return xt(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the point at the specified index.
   * @param {number} index Index.
   * @return {Point} Point.
   * @api
   */
  getPoint(t) {
    const e = this.flatCoordinates.length / this.stride;
    return t < 0 || e <= t ? null : new at(
      this.flatCoordinates.slice(
        t * this.stride,
        (t + 1) * this.stride
      ),
      this.layout
    );
  }
  /**
   * Return the points of this multipoint.
   * @return {Array<Point>} Points.
   * @api
   */
  getPoints() {
    const t = this.flatCoordinates, e = this.layout, n = this.stride, r = [];
    for (let s = 0, o = t.length; s < o; s += n) {
      const a = new at(t.slice(s, s + n), e);
      r.push(a);
    }
    return r;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "MultiPoint";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    const e = this.flatCoordinates, n = this.stride;
    for (let r = 0, s = e.length; r < s; r += n) {
      const o = e[r], a = e[r + 1];
      if (an(t, o, a))
        return !0;
    }
    return !1;
  }
  /**
   * Set the coordinates of the multipoint.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Ot(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
function vn(i, t, e, n) {
  let r = 0;
  const s = i[e - n], o = i[e - n + 1];
  let a = 0, l = 0;
  for (; t < e; t += n) {
    const u = i[t] - s, h = i[t + 1] - o;
    r += l * u - a * h, a = u, l = h;
  }
  return r / 2;
}
function On(i, t, e, n) {
  let r = 0;
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s];
    r += vn(i, t, a, n), t = a;
  }
  return r;
}
function mi(i, t, e, n) {
  let r = 0;
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s];
    r += On(i, t, a, n), t = a[a.length - 1];
  }
  return r;
}
class lt extends Q {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(t, e) {
    super(), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, e !== void 0 && !Array.isArray(t[0]) ? this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ) : this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      t,
      e
    );
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   * @override
   */
  clone() {
    return new lt(this.flatCoordinates.slice(), this.layout);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, r) {
    return r < ut(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      se(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), ae(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      r
    ));
  }
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return vn(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return xt(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [];
    return e.length = ge(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new lt(e, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "LinearRing";
  }
  /**
   * Test if the geometry and the passed extent intersect. A linear ring is
   * treated as a line string for this test.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return Et(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t
    );
  }
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = Ot(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
function xn(i, t, e, n, r, s, o) {
  let a, l, u, h, c, g, d;
  const m = r[s + 1], R = [];
  for (let M = 0, b = e.length; M < b; ++M) {
    const O = e[M];
    for (h = i[O - n], g = i[O - n + 1], a = t; a < O; a += n)
      c = i[a], d = i[a + 1], (m <= g && d <= m || g <= m && m <= d) && (u = (m - g) / (d - g) * (c - h) + h, R.push(u)), h = c, g = d;
  }
  let S = NaN, T = -1 / 0;
  for (R.sort(Rn), h = R[0], a = 1, l = R.length; a < l; ++a) {
    c = R[a];
    const M = Math.abs(c - h);
    M > T && (u = (h + c) / 2, ce(i, t, e, n, u, m) && (S = u, T = M)), h = c;
  }
  return isNaN(S) && (S = r[s]), o ? (o.push(S, m, T), o) : [S, m, T];
}
function yi(i, t, e, n, r) {
  let s = [];
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    s = xn(
      i,
      t,
      l,
      n,
      r,
      2 * o,
      s
    ), t = l[l.length - 1];
  }
  return s;
}
function Ei(i, t, e, n) {
  for (; t < e - n; ) {
    for (let r = 0; r < n; ++r) {
      const s = i[t + r];
      i[t + r] = i[e - n + r], i[e - n + r] = s;
    }
    t += n, e -= n;
  }
}
function Gn(i, t, e, n) {
  let r = 0, s = i[e - n], o = i[e - n + 1];
  for (; t < e; t += n) {
    const a = i[t], l = i[t + 1];
    r += (a - s) * (l + o), s = a, o = l;
  }
  return r === 0 ? void 0 : r > 0;
}
function bn(i, t, e, n, r) {
  r = r !== void 0 ? r : !1;
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s], l = Gn(
      i,
      t,
      a,
      n
    );
    if (s === 0) {
      if (r && l || !r && !l)
        return !1;
    } else if (r && !l || !r && l)
      return !1;
    t = a;
  }
  return !0;
}
function Ri(i, t, e, n, r) {
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s];
    if (!bn(i, t, a, n, r))
      return !1;
    a.length && (t = a[a.length - 1]);
  }
  return !0;
}
function Kt(i, t, e, n, r) {
  r = r !== void 0 ? r : !1;
  for (let s = 0, o = e.length; s < o; ++s) {
    const a = e[s], l = Gn(
      i,
      t,
      a,
      n
    );
    (s === 0 ? r && l || !r && !l : r && !l || !r && l) && Ei(i, t, a, n), t = a;
  }
  return t;
}
function De(i, t, e, n, r) {
  for (let s = 0, o = e.length; s < o; ++s)
    t = Kt(
      i,
      t,
      e[s],
      n,
      r
    );
  return t;
}
class K extends Q {
  /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */
  constructor(t, e, n) {
    super(), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, e !== void 0 && n ? (this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ), this.ends_ = n) : this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      t,
      e
    );
  }
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */
  appendLinearRing(t) {
    this.flatCoordinates ? x(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new K(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    return t.applyProperties(this), t;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, r) {
    return r < ut(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      oe(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), le(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      r
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(t, e) {
    return ce(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      e
    );
  }
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return On(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), Kt(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, he(e, 0, this.ends_, this.stride);
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * @return {Array<number>} Interior point.
   */
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const t = hn(this.getExtent());
      this.flatInteriorPoint_ = xn(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
        0
      ), this.flatInteriorPointRevision_ = this.getRevision();
    }
    return (
      /** @type {import("../coordinate.js").Coordinate} */
      this.flatInteriorPoint_
    );
  }
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoint() {
    return new at(this.getFlatInteriorPoint(), "XYM");
  }
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */
  getLinearRingCount() {
    return this.ends_.length;
  }
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */
  getLinearRing(t) {
    return t < 0 || this.ends_.length <= t ? null : new lt(
      this.flatCoordinates.slice(
        t === 0 ? 0 : this.ends_[t - 1],
        this.ends_[t]
      ),
      this.layout
    );
  }
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */
  getLinearRings() {
    const t = this.layout, e = this.flatCoordinates, n = this.ends_, r = [];
    let s = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o], u = new lt(
        e.slice(s, l),
        t
      );
      r.push(u), s = l;
    }
    return r;
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      bn(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = Kt(
        this.orientedFlatCoordinates_,
        0,
        this.ends_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = Fn(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new K(e, "XY", n);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Polygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return In(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t
    );
  }
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    const n = ue(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
function wi(i, t, e, n) {
  const r = [];
  let s = Jt();
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o];
    s = ln(
      i,
      t,
      l[0],
      n
    ), r.push((s[0] + s[2]) / 2, (s[1] + s[3]) / 2), t = l[l.length - 1];
  }
  return r;
}
class dt extends Q {
  /**
   * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
   */
  constructor(t, e, n) {
    if (super(), this.endss_ = [], this.flatInteriorPointsRevision_ = -1, this.flatInteriorPoints_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, !n && !Array.isArray(t[0])) {
      const r = (
        /** @type {Array<Polygon>} */
        t
      ), s = [], o = [];
      for (let a = 0, l = r.length; a < l; ++a) {
        const u = r[a], h = s.length, c = u.getEnds();
        for (let g = 0, d = c.length; g < d; ++g)
          c[g] += h;
        x(s, u.getFlatCoordinates()), o.push(c);
      }
      e = r.length === 0 ? this.getLayout() : r[0].getLayout(), t = s, n = o;
    }
    e !== void 0 && n ? (this.setFlatCoordinates(
      e,
      /** @type {Array<number>} */
      t
    ), this.endss_ = n) : this.setCoordinates(
      /** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */
      t,
      e
    );
  }
  /**
   * Append the passed polygon to this multipolygon.
   * @param {Polygon} polygon Polygon.
   * @api
   */
  appendPolygon(t) {
    let e;
    if (!this.flatCoordinates)
      this.flatCoordinates = t.getFlatCoordinates().slice(), e = t.getEnds().slice(), this.endss_.push();
    else {
      const n = this.flatCoordinates.length;
      x(this.flatCoordinates, t.getFlatCoordinates()), e = t.getEnds().slice();
      for (let r = 0, s = e.length; r < s; ++r)
        e[r] += n;
    }
    this.endss_.push(e), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPolygon} Clone.
   * @api
   * @override
   */
  clone() {
    const t = this.endss_.length, e = new Array(t);
    for (let r = 0; r < t; ++r)
      e[r] = this.endss_[r].slice();
    const n = new dt(
      this.flatCoordinates.slice(),
      this.layout,
      e
    );
    return n.applyProperties(this), n;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, r) {
    return r < ut(this.getExtent(), t, e) ? r : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      ni(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), ri(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      r
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(t, e) {
    return ui(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t,
      e
    );
  }
  /**
   * Return the area of the multipolygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return mi(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for multi-polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates(t) {
    let e;
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), De(
      e,
      0,
      this.endss_,
      this.stride,
      t
    )) : e = this.flatCoordinates, oi(
      e,
      0,
      this.endss_,
      this.stride
    );
  }
  /**
   * @return {Array<Array<number>>} Endss.
   */
  getEndss() {
    return this.endss_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      const t = wi(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride
      );
      this.flatInteriorPoints_ = yi(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        t
      ), this.flatInteriorPointsRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.flatInteriorPoints_
    );
  }
  /**
   * Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
   * @return {MultiPoint} Interior points as XYM coordinates, where M is
   * the length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoints() {
    return new Gt(this.getFlatInteriorPoints().slice(), "XYM");
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      Ri(t, 0, this.endss_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = De(
        this.orientedFlatCoordinates_,
        0,
        this.endss_,
        this.stride
      )), this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiPolygon} Simplified MultiPolygon.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(t) {
    const e = [], n = [];
    return e.length = di(
      this.flatCoordinates,
      0,
      this.endss_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new dt(e, "XY", n);
  }
  /**
   * Return the polygon at the specified index.
   * @param {number} index Index.
   * @return {Polygon} Polygon.
   * @api
   */
  getPolygon(t) {
    if (t < 0 || this.endss_.length <= t)
      return null;
    let e;
    if (t === 0)
      e = 0;
    else {
      const s = this.endss_[t - 1];
      e = s[s.length - 1];
    }
    const n = this.endss_[t].slice(), r = n[n.length - 1];
    if (e !== 0)
      for (let s = 0, o = n.length; s < o; ++s)
        n[s] -= e;
    return new K(
      this.flatCoordinates.slice(e, r),
      this.layout,
      n
    );
  }
  /**
   * Return the polygons of this multipolygon.
   * @return {Array<Polygon>} Polygons.
   * @api
   */
  getPolygons() {
    const t = this.layout, e = this.flatCoordinates, n = this.endss_, r = [];
    let s = 0;
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o].slice(), u = l[l.length - 1];
      if (s !== 0)
        for (let c = 0, g = l.length; c < g; ++c)
          l[c] -= s;
      const h = new K(
        e.slice(s, u),
        t,
        l
      );
      r.push(h), s = u;
    }
    return r;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "MultiPolygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    return gi(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t
    );
  }
  /**
   * Set the coordinates of the multipolygon.
   * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 3), this.flatCoordinates || (this.flatCoordinates = []);
    const n = si(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.endss_
    );
    if (n.length === 0)
      this.flatCoordinates.length = 0;
    else {
      const r = n[n.length - 1];
      this.flatCoordinates.length = r.length === 0 ? 0 : r[r.length - 1];
    }
    this.changed();
  }
}
class _i {
  constructor() {
    this.dataProjection = void 0, this.defaultFeatureProjection = void 0, this.featureClass = /** @type {FeatureToFeatureClass<FeatureType>} */
    vt, this.supportedMediaTypes = null;
  }
  /**
   * Adds the data projection to the read options.
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Options.
   * @return {ReadOptions|undefined} Options.
   * @protected
   */
  getReadOptions(t, e) {
    if (e) {
      let n = e.dataProjection ? v(e.dataProjection) : this.readProjection(t);
      e.extent && n && n.getUnits() === "tile-pixels" && (n = v(n), n.setWorldExtent(e.extent)), e = {
        dataProjection: n,
        featureProjection: e.featureProjection
      };
    }
    return this.adaptOptions(e);
  }
  /**
   * Sets the `dataProjection` on the options, if no `dataProjection`
   * is set.
   * @param {WriteOptions|ReadOptions|undefined} options
   *     Options.
   * @protected
   * @return {WriteOptions|ReadOptions|undefined}
   *     Updated options.
   */
  adaptOptions(t) {
    return Object.assign(
      {
        dataProjection: this.dataProjection,
        featureProjection: this.defaultFeatureProjection,
        featureClass: this.featureClass
      },
      t
    );
  }
  /**
   * @abstract
   * @return {Type} The format type.
   */
  getType() {
    return L();
  }
  /**
   * Read a single feature from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {FeatureType|Array<FeatureType>} Feature.
   */
  readFeature(t, e) {
    return L();
  }
  /**
   * Read all features from a source.
   *
   * @abstract
   * @param {Document|Element|ArrayBuffer|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {Array<FeatureType>} Features.
   */
  readFeatures(t, e) {
    return L();
  }
  /**
   * Read a single geometry from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   */
  readGeometry(t, e) {
    return L();
  }
  /**
   * Read the projection from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default|undefined} Projection.
   */
  readProjection(t) {
    return L();
  }
  /**
   * Encode a feature in this format.
   *
   * @abstract
   * @param {Feature} feature Feature.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */
  writeFeature(t, e) {
    return L();
  }
  /**
   * Encode an array of features in this format.
   *
   * @abstract
   * @param {Array<Feature>} features Features.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */
  writeFeatures(t, e) {
    return L();
  }
  /**
   * Write a single geometry in this format.
   *
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */
  writeGeometry(t, e) {
    return L();
  }
}
function pe(i, t, e) {
  const n = e ? v(e.featureProjection) : null, r = e ? v(e.dataProjection) : null;
  let s = i;
  if (n && r && !yn(n, r)) {
    t && (s = /** @type {T} */
    i.clone());
    const o = t ? n : r, a = t ? r : n;
    o.getUnits() === "tile-pixels" ? s.transform(o, a) : s.applyTransform(Pt(o, a));
  }
  if (t && e && /** @type {WriteOptions} */
  e.decimals !== void 0) {
    const o = Math.pow(
      10,
      /** @type {WriteOptions} */
      e.decimals
    ), a = function(l) {
      for (let u = 0, h = l.length; u < h; ++u)
        l[u] = Math.round(l[u] * o) / o;
      return l;
    };
    s === i && (s = /** @type {T} */
    i.clone()), s.applyTransform(a);
  }
  return s;
}
function fe(i, t) {
  const e = t ? v(t.featureProjection) : null, n = t ? v(t.dataProjection) : null;
  return e && n && !yn(e, n) ? vr(i, n, e) : i;
}
class Yn extends _i {
  constructor() {
    super(), this.xmlSerializer_ = Ur();
  }
  /**
   * @return {import("./Feature.js").Type} Format.
   * @override
   */
  getType() {
    return "xml";
  }
  /**
   * Read a single feature.
   *
   * @param {Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {import("../Feature.js").default} Feature.
   * @api
   * @override
   */
  readFeature(t, e) {
    if (!t)
      return null;
    if (typeof t == "string") {
      const n = nt(t);
      return this.readFeatureFromDocument(n, e);
    }
    return et(t) ? this.readFeatureFromDocument(
      /** @type {Document} */
      t,
      e
    ) : this.readFeatureFromNode(
      /** @type {Element} */
      t,
      e
    );
  }
  /**
   * @param {Document} doc Document.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {import("../Feature.js").default} Feature.
   */
  readFeatureFromDocument(t, e) {
    const n = this.readFeaturesFromDocument(t, e);
    return n.length > 0 ? n[0] : null;
  }
  /**
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {import("../Feature.js").default} Feature.
   */
  readFeatureFromNode(t, e) {
    return null;
  }
  /**
   * Read all features from a feature collection.
   *
   * @param {Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {Array<import("../Feature.js").default>} Features.
   * @api
   * @override
   */
  readFeatures(t, e) {
    if (!t)
      return [];
    if (typeof t == "string") {
      const n = nt(t);
      return this.readFeaturesFromDocument(n, e);
    }
    return et(t) ? this.readFeaturesFromDocument(
      /** @type {Document} */
      t,
      e
    ) : this.readFeaturesFromNode(
      /** @type {Element} */
      t,
      e
    );
  }
  /**
   * @param {Document} doc Document.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {Array<import("../Feature.js").default>} Features.
   */
  readFeaturesFromDocument(t, e) {
    const n = [];
    for (let r = t.firstChild; r; r = r.nextSibling)
      r.nodeType == Node.ELEMENT_NODE && x(
        n,
        this.readFeaturesFromNode(
          /** @type {Element} */
          r,
          e
        )
      );
    return n;
  }
  /**
   * @abstract
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {Array<import("../Feature.js").default>} Features.
   */
  readFeaturesFromNode(t, e) {
    return L();
  }
  /**
   * Read a single geometry from a source.
   *
   * @param {Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   * @override
   */
  readGeometry(t, e) {
    if (!t)
      return null;
    if (typeof t == "string") {
      const n = nt(t);
      return this.readGeometryFromDocument(n, e);
    }
    return et(t) ? this.readGeometryFromDocument(
      /** @type {Document} */
      t,
      e
    ) : this.readGeometryFromNode(
      /** @type {Element} */
      t,
      e
    );
  }
  /**
   * @param {Document} doc Document.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */
  readGeometryFromDocument(t, e) {
    return null;
  }
  /**
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */
  readGeometryFromNode(t, e) {
    return null;
  }
  /**
   * Read the projection from the source.
   *
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   * @override
   */
  readProjection(t) {
    if (!t)
      return null;
    if (typeof t == "string") {
      const e = nt(t);
      return this.readProjectionFromDocument(e);
    }
    return et(t) ? this.readProjectionFromDocument(
      /** @type {Document} */
      t
    ) : this.readProjectionFromNode(
      /** @type {Element} */
      t
    );
  }
  /**
   * @param {Document} doc Document.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */
  readProjectionFromDocument(t) {
    return this.dataProjection;
  }
  /**
   * @param {Element} node Node.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */
  readProjectionFromNode(t) {
    return this.dataProjection;
  }
  /**
   * Encode a feature as string.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded feature.
   * @override
   */
  writeFeature(t, e) {
    const n = this.writeFeatureNode(t, e);
    return this.xmlSerializer_.serializeToString(n);
  }
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @protected
   * @return {Node} Node.
   */
  writeFeatureNode(t, e) {
    return null;
  }
  /**
   * Encode an array of features as string.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Result.
   * @api
   * @override
   */
  writeFeatures(t, e) {
    const n = this.writeFeaturesNode(t, e);
    return this.xmlSerializer_.serializeToString(n);
  }
  /**
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @return {Node} Node.
   */
  writeFeaturesNode(t, e) {
    return null;
  }
  /**
   * Encode a geometry as string.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded geometry.
   * @override
   */
  writeGeometry(t, e) {
    const n = this.writeGeometryNode(t, e);
    return this.xmlSerializer_.serializeToString(n);
  }
  /**
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @return {Node} Node.
   */
  writeGeometryNode(t, e) {
    return null;
  }
}
const B = "http://www.opengis.net/gml", Si = /^\s*$/;
class y extends Yn {
  /**
   * @param {Options} [options] Optional configuration object.
   */
  constructor(t) {
    super(), t = t || {}, this.featureType = t.featureType, this.featureNS = t.featureNS, this.srsName = t.srsName, this.schemaLocation = "", this.FEATURE_COLLECTION_PARSERS = {}, this.FEATURE_COLLECTION_PARSERS[this.namespace] = {
      featureMember: w(this.readFeaturesInternal),
      featureMembers: E(this.readFeaturesInternal)
    }, this.supportedMediaTypes = ["application/gml+xml"];
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<Feature> | undefined} Features.
   */
  readFeaturesInternal(t, e) {
    const n = t.localName;
    let r = null;
    if (n == "FeatureCollection")
      r = P(
        [],
        this.FEATURE_COLLECTION_PARSERS,
        t,
        e,
        this
      );
    else if (n == "featureMembers" || n == "featureMember" || n == "member") {
      const s = e[0];
      let o = s.featureType, a = s.featureNS;
      const l = "p", u = "p0";
      if (!o && t.childNodes) {
        o = [], a = {};
        for (let g = 0, d = t.childNodes.length; g < d; ++g) {
          const m = (
            /** @type {Element} */
            t.childNodes[g]
          );
          if (m.nodeType === 1) {
            const R = m.nodeName.split(":").pop();
            if (!o.includes(R)) {
              let S = "", T = 0;
              const M = m.namespaceURI;
              for (const b in a) {
                if (a[b] === M) {
                  S = b;
                  break;
                }
                ++T;
              }
              S || (S = l + T, a[S] = M), o.push(S + ":" + R);
            }
          }
        }
        n != "featureMember" && (s.featureType = o, s.featureNS = a);
      }
      if (typeof a == "string") {
        const g = a;
        a = {}, a[u] = g;
      }
      const h = {}, c = Array.isArray(o) ? o : [o];
      for (const g in a) {
        const d = {};
        for (let m = 0, R = c.length; m < R; ++m)
          (c[m].includes(":") ? c[m].split(":")[0] : u) === g && (d[c[m].split(":").pop()] = n == "featureMembers" ? w(this.readFeatureElement, this) : E(this.readFeatureElement, this));
        h[a[g]] = d;
      }
      n == "featureMember" || n == "member" ? r = P(void 0, h, t, e) : r = P([], h, t, e);
    }
    return r === null && (r = []), r;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {import("../geom/Geometry.js").default|import("../extent.js").Extent|undefined} Geometry.
   */
  readGeometryOrExtent(t, e) {
    const n = (
      /** @type {Object} */
      e[0]
    );
    return n.srsName = t.firstElementChild.getAttribute("srsName"), n.srsDimension = t.firstElementChild.getAttribute("srsDimension"), P(
      null,
      this.GEOMETRY_PARSERS,
      t,
      e,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {import("../extent.js").Extent|undefined} Geometry.
   */
  readExtentElement(t, e) {
    const n = (
      /** @type {Object} */
      e[0]
    ), r = (
      /** @type {import("../extent.js").Extent} */
      this.readGeometryOrExtent(t, e)
    );
    return r ? fe(r, n) : void 0;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {import("../geom/Geometry.js").default|undefined} Geometry.
   */
  readGeometryElement(t, e) {
    const n = (
      /** @type {Object} */
      e[0]
    ), r = (
      /** @type {import("../geom/Geometry.js").default} */
      this.readGeometryOrExtent(t, e)
    );
    return r ? pe(r, !1, n) : void 0;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @param {boolean} asFeature whether result should be wrapped as a feature.
   * @return {Feature|Object} Feature
   */
  readFeatureElementInternal(t, e, n) {
    let r;
    const s = {};
    for (let l = t.firstElementChild; l; l = l.nextElementSibling) {
      let u;
      const h = l.localName;
      l.childNodes.length === 0 || l.childNodes.length === 1 && (l.firstChild.nodeType === 3 || l.firstChild.nodeType === 4) ? (u = pt(l, !1), Si.test(u) && (u = void 0)) : (n && (u = h === "boundedBy" ? this.readExtentElement(l, e) : this.readGeometryElement(l, e)), u ? h !== "boundedBy" && (r = h) : u = this.readFeatureElementInternal(l, e, !1));
      const c = l.attributes.length;
      if (c > 0 && !(u instanceof Mn)) {
        u = { _content_: u };
        for (let g = 0; g < c; g++) {
          const d = l.attributes[g].name;
          u[d] = l.attributes[g].value;
        }
      }
      s[h] ? (s[h] instanceof Array || (s[h] = [s[h]]), s[h].push(u)) : s[h] = u;
    }
    if (!n)
      return s;
    const o = new vt(s);
    r && o.setGeometryName(r);
    const a = t.getAttribute("fid") || br(t, this.namespace, "id");
    return a && o.setId(a), o;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Feature} Feature.
   */
  readFeatureElement(t, e) {
    return this.readFeatureElementInternal(t, e, !0);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Point|undefined} Point.
   */
  readPoint(t, e) {
    const n = this.readFlatCoordinatesFromNode(t, e);
    if (n)
      return new at(n, "XYZ");
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {MultiPoint|undefined} MultiPoint.
   */
  readMultiPoint(t, e) {
    const n = P(
      [],
      this.MULTIPOINT_PARSERS,
      t,
      e,
      this
    );
    if (n)
      return new Gt(n);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {MultiLineString|undefined} MultiLineString.
   */
  readMultiLineString(t, e) {
    const n = P(
      [],
      this.MULTILINESTRING_PARSERS,
      t,
      e,
      this
    );
    if (n)
      return new ft(n);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {MultiPolygon|undefined} MultiPolygon.
   */
  readMultiPolygon(t, e) {
    const n = P(
      [],
      this.MULTIPOLYGON_PARSERS,
      t,
      e,
      this
    );
    if (n)
      return new dt(n);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  pointMemberParser(t, e) {
    q(this.POINTMEMBER_PARSERS, t, e, this);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  lineStringMemberParser(t, e) {
    q(this.LINESTRINGMEMBER_PARSERS, t, e, this);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  polygonMemberParser(t, e) {
    q(this.POLYGONMEMBER_PARSERS, t, e, this);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {LineString|undefined} LineString.
   */
  readLineString(t, e) {
    const n = this.readFlatCoordinatesFromNode(t, e);
    if (n)
      return new H(n, "XYZ");
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>|undefined} LinearRing flat coordinates.
   */
  readFlatLinearRing(t, e) {
    const n = P(
      null,
      this.GEOMETRY_FLAT_COORDINATES_PARSERS,
      t,
      e,
      this
    );
    if (n)
      return n;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {LinearRing|undefined} LinearRing.
   */
  readLinearRing(t, e) {
    const n = this.readFlatCoordinatesFromNode(t, e);
    if (n)
      return new lt(n, "XYZ");
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Polygon|undefined} Polygon.
   */
  readPolygon(t, e) {
    const n = P(
      [null],
      this.FLAT_LINEAR_RINGS_PARSERS,
      t,
      e,
      this
    );
    if (n && n[0]) {
      const r = n[0], s = [r.length];
      let o, a;
      for (o = 1, a = n.length; o < a; ++o)
        x(r, n[o]), s.push(r.length);
      return new K(r, "XYZ", s);
    }
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>} Flat coordinates.
   */
  readFlatCoordinatesFromNode(t, e) {
    return P(
      null,
      this.GEOMETRY_FLAT_COORDINATES_PARSERS,
      t,
      e,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   * @override
   */
  readGeometryFromNode(t, e) {
    const n = this.readGeometryElement(t, [
      this.getReadOptions(t, e || {})
    ]);
    return n || null;
  }
  /**
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {Array<import("../Feature.js").default>} Features.
   * @override
   */
  readFeaturesFromNode(t, e) {
    const n = {
      featureType: this.featureType,
      featureNS: this.featureNS
    };
    return n && Object.assign(n, this.getReadOptions(t, e)), this.readFeaturesInternal(t, [n]) || [];
  }
  /**
   * @param {Element} node Node.
   * @return {import("../proj/Projection.js").default} Projection.
   * @override
   */
  readProjectionFromNode(t) {
    return v(
      this.srsName ? this.srsName : t.firstElementChild.getAttribute("srsName")
    );
  }
}
y.prototype.namespace = B;
y.prototype.FLAT_LINEAR_RINGS_PARSERS = {
  "http://www.opengis.net/gml": {}
};
y.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS = {
  "http://www.opengis.net/gml": {}
};
y.prototype.GEOMETRY_PARSERS = {
  "http://www.opengis.net/gml": {}
};
y.prototype.MULTIPOINT_PARSERS = {
  "http://www.opengis.net/gml": {
    pointMember: w(y.prototype.pointMemberParser),
    pointMembers: w(y.prototype.pointMemberParser)
  }
};
y.prototype.MULTILINESTRING_PARSERS = {
  "http://www.opengis.net/gml": {
    lineStringMember: w(
      y.prototype.lineStringMemberParser
    ),
    lineStringMembers: w(
      y.prototype.lineStringMemberParser
    )
  }
};
y.prototype.MULTIPOLYGON_PARSERS = {
  "http://www.opengis.net/gml": {
    polygonMember: w(y.prototype.polygonMemberParser),
    polygonMembers: w(y.prototype.polygonMemberParser)
  }
};
y.prototype.POINTMEMBER_PARSERS = {
  "http://www.opengis.net/gml": {
    Point: w(y.prototype.readFlatCoordinatesFromNode)
  }
};
y.prototype.LINESTRINGMEMBER_PARSERS = {
  "http://www.opengis.net/gml": {
    LineString: w(y.prototype.readLineString)
  }
};
y.prototype.POLYGONMEMBER_PARSERS = {
  "http://www.opengis.net/gml": {
    Polygon: w(y.prototype.readPolygon)
  }
};
y.prototype.RING_PARSERS = {
  "http://www.opengis.net/gml": {
    LinearRing: E(y.prototype.readFlatLinearRing)
  }
};
function k(i) {
  const t = pt(i, !1);
  return rt(t);
}
function rt(i) {
  const t = /^\s*(\d+)\s*$/.exec(i);
  if (t)
    return parseInt(t[1], 10);
}
function Ni(i, t) {
  i.appendChild(ie().createCDATASection(t));
}
const Ci = /^\s/, Pi = /\s$/, Mi = /(\n|\t|\r|<|&| {2})/;
function I(i, t) {
  typeof t == "string" && (Ci.test(t) || Pi.test(t) || Mi.test(t)) ? t.split("]]>").forEach((e, n, r) => {
    n < r.length - 1 && (e += "]]"), n > 0 && (e = ">" + e), Ni(i, e);
  }) : i.appendChild(ie().createTextNode(t));
}
const Ai = B + " http://schemas.opengis.net/gml/2.1.2/feature.xsd", Li = {
  MultiLineString: "lineStringMember",
  MultiCurve: "curveMember",
  MultiPolygon: "polygonMember",
  MultiSurface: "surfaceMember"
};
class N extends y {
  /**
   * @param {import("./GMLBase.js").Options} [options] Optional configuration object.
   */
  constructor(t) {
    t = t || {}, super(t), this.FEATURE_COLLECTION_PARSERS[B].featureMember = w(
      this.readFeaturesInternal
    ), this.schemaLocation = t.schemaLocation ? t.schemaLocation : Ai;
  }
  /**
   * @param {Node} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>|undefined} Flat coordinates.
   */
  readFlatCoordinates(t, e) {
    const n = pt(t, !1).replace(/^\s*|\s*$/g, ""), s = /** @type {import("../xml.js").NodeStackItem} */ e[0].srsName;
    let o = "enu";
    if (s) {
      const u = v(s);
      u && (o = u.getAxisOrientation());
    }
    const a = n.trim().split(/\s+/), l = [];
    for (let u = 0, h = a.length; u < h; u++) {
      const c = a[u].split(/,+/), g = parseFloat(c[0]), d = parseFloat(c[1]), m = c.length === 3 ? parseFloat(c[2]) : 0;
      o.startsWith("en") ? l.push(g, d, m) : l.push(d, g, m);
    }
    return l;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {import("../extent.js").Extent|undefined} Envelope.
   */
  readBox(t, e) {
    const n = P(
      [null],
      this.BOX_PARSERS_,
      t,
      e,
      this
    );
    return mt(
      n[1][0],
      n[1][1],
      n[1][3],
      n[1][4]
    );
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  innerBoundaryIsParser(t, e) {
    const n = P(
      void 0,
      this.RING_PARSERS,
      t,
      e,
      this
    );
    n && /** @type {Array<Array<number>>} */
    e[e.length - 1].push(n);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  outerBoundaryIsParser(t, e) {
    const n = P(
      void 0,
      this.RING_PARSERS,
      t,
      e,
      this
    );
    if (n) {
      const r = (
        /** @type {Array<Array<number>>} */
        e[e.length - 1]
      );
      r[0] = n;
    }
  }
  /**
   * @const
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string} [nodeName] Node name.
   * @return {Element|undefined} Node.
   * @private
   */
  GEOMETRY_NODE_FACTORY_(t, e, n) {
    const r = e[e.length - 1], s = r.multiSurface, o = r.surface, a = r.multiCurve;
    return Array.isArray(t) ? n = "Envelope" : (n = /** @type {import("../geom/Geometry.js").default} */
    t.getType(), n === "MultiPolygon" && s === !0 ? n = "MultiSurface" : n === "Polygon" && o === !0 ? n = "Surface" : n === "MultiLineString" && a === !0 && (n = "MultiCurve")), _("http://www.opengis.net/gml", n);
  }
  /**
   * @param {Element} node Node.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {Array<*>} objectStack Node stack.
   */
  writeFeatureElement(t, e, n) {
    const r = e.getId();
    r && t.setAttribute(
      "fid",
      /** @type {string} */
      r
    );
    const s = (
      /** @type {Object} */
      n[n.length - 1]
    ), o = s.featureNS, a = e.getGeometryName();
    s.serializers || (s.serializers = {}, s.serializers[o] = {});
    const l = [], u = [];
    if (e.hasProperties()) {
      const c = e.getProperties();
      for (const g in c) {
        const d = c[g];
        d != null && (l.push(g), u.push(d), g == a || typeof /** @type {?} */
        d.getSimplifiedGeometry == "function" ? g in s.serializers[o] || (s.serializers[o][g] = p(
          this.writeGeometryElement,
          this
        )) : g in s.serializers[o] || (s.serializers[o][g] = p(I)));
      }
    }
    const h = Object.assign({}, s);
    h.node = t, A(
      /** @type {import("../xml.js").NodeStackItem} */
      h,
      s.serializers,
      G(void 0, o),
      u,
      n,
      l
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/LineString.js").default} geometry LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeCurveOrLineString(t, e, n) {
    const s = n[n.length - 1].srsName;
    if (t.nodeName !== "LineStringSegment" && s && t.setAttribute("srsName", s), t.nodeName === "LineString" || t.nodeName === "LineStringSegment") {
      const o = this.createCoordinatesNode_(t.namespaceURI);
      t.appendChild(o), this.writeCoordinates_(o, e, n);
    } else if (t.nodeName === "Curve") {
      const o = _(t.namespaceURI, "segments");
      t.appendChild(o), this.writeCurveSegments_(o, e, n);
    }
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/LineString.js").default} line LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeLineStringOrCurveMember(t, e, n) {
    const r = this.GEOMETRY_NODE_FACTORY_(e, n);
    r && (t.appendChild(r), this.writeCurveOrLineString(r, e, n));
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/MultiLineString.js").default} geometry MultiLineString geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeMultiCurveOrLineString(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName, a = r.curve;
    o && t.setAttribute("srsName", o);
    const l = e.getLineStrings();
    A(
      { node: t, hasZ: s, srsName: o, curve: a },
      this.LINESTRINGORCURVEMEMBER_SERIALIZERS,
      this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,
      l,
      n,
      void 0,
      this
    );
  }
  /**
   * @param {Node} node Node.
   * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeGeometryElement(t, e, n) {
    const r = (
      /** @type {import("./Feature.js").WriteOptions} */
      n[n.length - 1]
    ), s = Object.assign({}, r);
    s.node = t;
    let o;
    Array.isArray(e) ? o = fe(
      /** @type {import("../extent.js").Extent} */
      e,
      r
    ) : o = pe(
      /** @type {import("../geom/Geometry.js").default} */
      e,
      !0,
      r
    ), A(
      /** @type {import("../xml.js").NodeStackItem} */
      s,
      this.GEOMETRY_SERIALIZERS,
      this.GEOMETRY_NODE_FACTORY_,
      [o],
      n,
      void 0,
      this
    );
  }
  /**
   * @param {string} namespaceURI XML namespace.
   * @return {Element} coordinates node.
   * @private
   */
  createCoordinatesNode_(t) {
    const e = _(t, "coordinates");
    return e.setAttribute("decimal", "."), e.setAttribute("cs", ","), e.setAttribute("ts", " "), e;
  }
  /**
   * @param {Node} node Node.
   * @param {import("../geom/LineString.js").default|import("../geom/LinearRing.js").default} value Geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writeCoordinates_(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName, a = e.getCoordinates(), l = a.length, u = new Array(l);
    for (let h = 0; h < l; ++h) {
      const c = a[h];
      u[h] = this.getCoords_(c, o, s);
    }
    I(t, u.join(" "));
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/LineString.js").default} line LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writeCurveSegments_(t, e, n) {
    const r = _(t.namespaceURI, "LineStringSegment");
    t.appendChild(r), this.writeCurveOrLineString(r, e, n);
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/Polygon.js").default} geometry Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeSurfaceOrPolygon(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName;
    if (t.nodeName !== "PolygonPatch" && o && t.setAttribute("srsName", o), t.nodeName === "Polygon" || t.nodeName === "PolygonPatch") {
      const a = e.getLinearRings();
      A(
        { node: t, hasZ: s, srsName: o },
        this.RING_SERIALIZERS,
        this.RING_NODE_FACTORY_,
        a,
        n,
        void 0,
        this
      );
    } else if (t.nodeName === "Surface") {
      const a = _(t.namespaceURI, "patches");
      t.appendChild(a), this.writeSurfacePatches_(a, e, n);
    }
  }
  /**
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string} [nodeName] Node name.
   * @return {Node} Node.
   * @private
   */
  RING_NODE_FACTORY_(t, e, n) {
    const r = e[e.length - 1], s = r.node, o = r.exteriorWritten;
    return o === void 0 && (r.exteriorWritten = !0), _(
      s.namespaceURI,
      o !== void 0 ? "innerBoundaryIs" : "outerBoundaryIs"
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writeSurfacePatches_(t, e, n) {
    const r = _(t.namespaceURI, "PolygonPatch");
    t.appendChild(r), this.writeSurfaceOrPolygon(r, e, n);
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeRing(t, e, n) {
    const r = _(t.namespaceURI, "LinearRing");
    t.appendChild(r), this.writeLinearRing(r, e, n);
  }
  /**
   * @param {Array<number>} point Point geometry.
   * @param {string} [srsName] Optional srsName
   * @param {boolean} [hasZ] whether the geometry has a Z coordinate (is 3D) or not.
   * @return {string} The coords string.
   * @private
   */
  getCoords_(t, e, n) {
    let s = (e ? v(e).getAxisOrientation() : "enu").startsWith("en") ? t[0] + "," + t[1] : t[1] + "," + t[0];
    if (n) {
      const o = t[2] || 0;
      s += "," + o;
    }
    return s;
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/Point.js").default} geometry Point geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writePoint(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName;
    o && t.setAttribute("srsName", o);
    const a = this.createCoordinatesNode_(t.namespaceURI);
    t.appendChild(a);
    const l = e.getCoordinates(), u = this.getCoords_(l, o, s);
    I(a, u);
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeMultiPoint(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName;
    o && t.setAttribute("srsName", o);
    const a = e.getPoints();
    A(
      { node: t, hasZ: s, srsName: o },
      this.POINTMEMBER_SERIALIZERS,
      G("pointMember"),
      a,
      n,
      void 0,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/Point.js").default} point Point geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writePointMember(t, e, n) {
    const r = _(t.namespaceURI, "Point");
    t.appendChild(r), this.writePoint(r, e, n);
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeLinearRing(t, e, n) {
    const s = n[n.length - 1].srsName;
    s && t.setAttribute("srsName", s);
    const o = this.createCoordinatesNode_(t.namespaceURI);
    t.appendChild(o), this.writeCoordinates_(o, e, n);
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeMultiSurfaceOrPolygon(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName, a = r.surface;
    o && t.setAttribute("srsName", o);
    const l = e.getPolygons();
    A(
      { node: t, hasZ: s, srsName: o, surface: a },
      this.SURFACEORPOLYGONMEMBER_SERIALIZERS,
      this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,
      l,
      n,
      void 0,
      this
    );
  }
  /**
   * @param {Node} node Node.
   * @param {import("../geom/Polygon.js").default} polygon Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeSurfaceOrPolygonMember(t, e, n) {
    const r = this.GEOMETRY_NODE_FACTORY_(e, n);
    r && (t.appendChild(r), this.writeSurfaceOrPolygon(r, e, n));
  }
  /**
   * @param {Element} node Node.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {Array<*>} objectStack Node stack.
   */
  writeEnvelope(t, e, n) {
    const s = n[n.length - 1].srsName;
    s && t.setAttribute("srsName", s);
    const o = ["lowerCorner", "upperCorner"], a = [e[0] + " " + e[1], e[2] + " " + e[3]];
    A(
      /** @type {import("../xml.js").NodeStackItem} */
      { node: t },
      this.ENVELOPE_SERIALIZERS,
      Sn,
      a,
      n,
      o,
      this
    );
  }
  /**
   * @const
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string} [nodeName] Node name.
   * @return {Node|undefined} Node.
   * @private
   */
  MULTIGEOMETRY_MEMBER_NODE_FACTORY_(t, e, n) {
    const r = e[e.length - 1].node;
    return _(
      "http://www.opengis.net/gml",
      Li[r.nodeName]
    );
  }
}
N.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS = {
  "http://www.opengis.net/gml": {
    coordinates: E(N.prototype.readFlatCoordinates)
  }
};
N.prototype.FLAT_LINEAR_RINGS_PARSERS = {
  "http://www.opengis.net/gml": {
    innerBoundaryIs: N.prototype.innerBoundaryIsParser,
    outerBoundaryIs: N.prototype.outerBoundaryIsParser
  }
};
N.prototype.BOX_PARSERS_ = {
  "http://www.opengis.net/gml": {
    coordinates: w(N.prototype.readFlatCoordinates)
  }
};
N.prototype.GEOMETRY_PARSERS = {
  "http://www.opengis.net/gml": {
    Point: E(y.prototype.readPoint),
    MultiPoint: E(y.prototype.readMultiPoint),
    LineString: E(y.prototype.readLineString),
    MultiLineString: E(y.prototype.readMultiLineString),
    LinearRing: E(y.prototype.readLinearRing),
    Polygon: E(y.prototype.readPolygon),
    MultiPolygon: E(y.prototype.readMultiPolygon),
    Box: E(N.prototype.readBox)
  }
};
N.prototype.GEOMETRY_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    Curve: p(N.prototype.writeCurveOrLineString),
    MultiCurve: p(N.prototype.writeMultiCurveOrLineString),
    Point: p(N.prototype.writePoint),
    MultiPoint: p(N.prototype.writeMultiPoint),
    LineString: p(N.prototype.writeCurveOrLineString),
    MultiLineString: p(
      N.prototype.writeMultiCurveOrLineString
    ),
    LinearRing: p(N.prototype.writeLinearRing),
    Polygon: p(N.prototype.writeSurfaceOrPolygon),
    MultiPolygon: p(
      N.prototype.writeMultiSurfaceOrPolygon
    ),
    Surface: p(N.prototype.writeSurfaceOrPolygon),
    MultiSurface: p(
      N.prototype.writeMultiSurfaceOrPolygon
    ),
    Envelope: p(N.prototype.writeEnvelope)
  }
};
N.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    lineStringMember: p(
      N.prototype.writeLineStringOrCurveMember
    ),
    curveMember: p(
      N.prototype.writeLineStringOrCurveMember
    )
  }
};
N.prototype.RING_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    outerBoundaryIs: p(N.prototype.writeRing),
    innerBoundaryIs: p(N.prototype.writeRing)
  }
};
N.prototype.POINTMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    pointMember: p(N.prototype.writePointMember)
  }
};
N.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    surfaceMember: p(
      N.prototype.writeSurfaceOrPolygonMember
    ),
    polygonMember: p(
      N.prototype.writeSurfaceOrPolygonMember
    )
  }
};
N.prototype.ENVELOPE_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    lowerCorner: p(I),
    upperCorner: p(I)
  }
};
const Ii = B + " http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd", Ti = {
  MultiLineString: "lineStringMember",
  MultiCurve: "curveMember",
  MultiPolygon: "polygonMember",
  MultiSurface: "surfaceMember"
};
class f extends y {
  /**
   * @param {import("./GMLBase.js").Options} [options] Optional configuration object.
   */
  constructor(t) {
    t = t || {}, super(t), this.surface_ = t.surface !== void 0 ? t.surface : !1, this.curve_ = t.curve !== void 0 ? t.curve : !1, this.multiCurve_ = t.multiCurve !== void 0 ? t.multiCurve : !0, this.multiSurface_ = t.multiSurface !== void 0 ? t.multiSurface : !0, this.schemaLocation = t.schemaLocation ? t.schemaLocation : Ii, this.hasZ = t.hasZ !== void 0 ? t.hasZ : !1;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {MultiLineString|undefined} MultiLineString.
   */
  readMultiCurve(t, e) {
    const n = P(
      [],
      this.MULTICURVE_PARSERS,
      t,
      e,
      this
    );
    if (n)
      return new ft(n);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>|undefined} Polygon.
   */
  readFlatCurveRing(t, e) {
    const n = P(
      [],
      this.MULTICURVE_PARSERS,
      t,
      e,
      this
    ), r = [];
    for (let s = 0, o = n.length; s < o; ++s)
      x(r, n[s].getFlatCoordinates());
    return r;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {MultiPolygon|undefined} MultiPolygon.
   */
  readMultiSurface(t, e) {
    const n = P(
      [],
      this.MULTISURFACE_PARSERS,
      t,
      e,
      this
    );
    if (n)
      return new dt(n);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  curveMemberParser(t, e) {
    q(this.CURVEMEMBER_PARSERS, t, e, this);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  surfaceMemberParser(t, e) {
    q(this.SURFACEMEMBER_PARSERS, t, e, this);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<(Array<number>)>|undefined} flat coordinates.
   */
  readPatch(t, e) {
    return P(
      [null],
      this.PATCHES_PARSERS,
      t,
      e,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>|undefined} flat coordinates.
   */
  readSegment(t, e) {
    return P([], this.SEGMENTS_PARSERS, t, e, this);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<(Array<number>)>|undefined} flat coordinates.
   */
  readPolygonPatch(t, e) {
    return P(
      [null],
      this.FLAT_LINEAR_RINGS_PARSERS,
      t,
      e,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>|undefined} flat coordinates.
   */
  readLineStringSegment(t, e) {
    return P(
      [null],
      this.GEOMETRY_FLAT_COORDINATES_PARSERS,
      t,
      e,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  interiorParser(t, e) {
    const n = P(
      void 0,
      this.RING_PARSERS,
      t,
      e,
      this
    );
    n && /** @type {Array<Array<number>>} */
    e[e.length - 1].push(n);
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   */
  exteriorParser(t, e) {
    const n = P(
      void 0,
      this.RING_PARSERS,
      t,
      e,
      this
    );
    if (n) {
      const r = (
        /** @type {Array<Array<number>>} */
        e[e.length - 1]
      );
      r[0] = n;
    }
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Polygon|undefined} Polygon.
   */
  readSurface(t, e) {
    const n = P(
      [null],
      this.SURFACE_PARSERS,
      t,
      e,
      this
    );
    if (n && n[0]) {
      const r = n[0], s = [r.length];
      let o, a;
      for (o = 1, a = n.length; o < a; ++o)
        x(r, n[o]), s.push(r.length);
      return new K(r, "XYZ", s);
    }
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {LineString|undefined} LineString.
   */
  readCurve(t, e) {
    const n = P(
      [null],
      this.CURVE_PARSERS,
      t,
      e,
      this
    );
    if (n)
      return new H(n, "XYZ");
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {import("../extent.js").Extent|undefined} Envelope.
   */
  readEnvelope(t, e) {
    const n = P(
      [null],
      this.ENVELOPE_PARSERS,
      t,
      e,
      this
    );
    return mt(
      n[1][0],
      n[1][1],
      n[2][0],
      n[2][1]
    );
  }
  /**
   * @param {Node} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>|undefined} Flat coordinates.
   */
  readFlatPos(t, e) {
    let n = pt(t, !1);
    const r = /^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/, s = [];
    let o;
    for (; o = r.exec(n); )
      s.push(parseFloat(o[1])), n = n.substr(o[0].length);
    if (n !== "")
      return;
    const l = e[0].srsName;
    if ((l ? v(l).getAxisOrientation() : "enu") === "neu")
      for (let c = 0, g = s.length; c < g; c += 3) {
        const d = s[c], m = s[c + 1];
        s[c] = m, s[c + 1] = d;
      }
    const h = s.length;
    if (h == 2 && s.push(0), h !== 0)
      return s;
  }
  /**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @return {Array<number>|undefined} Flat coordinates.
   */
  readFlatPosList(t, e) {
    const n = pt(t, !1).replace(/^\s*|\s*$/g, ""), r = e[0], s = r.srsName, o = r.srsDimension, a = s ? v(s).getAxisOrientation() : "enu", l = n.split(/\s+/);
    let u = 2;
    t.getAttribute("srsDimension") ? u = rt(t.getAttribute("srsDimension")) : t.getAttribute("dimension") ? u = rt(t.getAttribute("dimension")) : /** @type {Element} */ t.parentNode.getAttribute("srsDimension") ? u = rt(
      /** @type {Element} */
      t.parentNode.getAttribute("srsDimension")
    ) : o && (u = rt(o));
    const h = a.startsWith("en");
    let c, g, d;
    const m = [];
    for (let R = 0, S = l.length; R < S; R += u)
      c = parseFloat(l[R]), g = parseFloat(l[R + 1]), d = u === 3 ? parseFloat(l[R + 2]) : 0, h ? m.push(c, g, d) : m.push(g, c, d);
    return m;
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/Point.js").default} value Point geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writePos_(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = s ? "3" : "2";
    t.setAttribute("srsDimension", o);
    const a = r.srsName, l = a ? v(a).getAxisOrientation() : "enu", u = e.getCoordinates();
    let h = l.startsWith("en") ? u[0] + " " + u[1] : u[1] + " " + u[0];
    if (s) {
      const c = u[2] || 0;
      h += " " + c;
    }
    I(t, h);
  }
  /**
   * @param {Array<number>} point Point geometry.
   * @param {string} [srsName] Optional srsName
   * @param {boolean} [hasZ] whether the geometry has a Z coordinate (is 3D) or not.
   * @return {string} The coords string.
   * @private
   */
  getCoords_(t, e, n) {
    let s = (e ? v(e).getAxisOrientation() : "enu").startsWith("en") ? t[0] + " " + t[1] : t[1] + " " + t[0];
    if (n) {
      const o = t[2] || 0;
      s += " " + o;
    }
    return s;
  }
  /**
   * @param {Element} node Node.
   * @param {LineString|import("../geom/LinearRing.js").default} value Geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writePosList_(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = s ? "3" : "2";
    t.setAttribute("srsDimension", o);
    const a = r.srsName, l = e.getCoordinates(), u = l.length, h = new Array(u);
    let c;
    for (let g = 0; g < u; ++g)
      c = l[g], h[g] = this.getCoords_(c, a, s);
    I(t, h.join(" "));
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/Point.js").default} geometry Point geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writePoint(t, e, n) {
    const s = n[n.length - 1].srsName;
    s && t.setAttribute("srsName", s);
    const o = _(t.namespaceURI, "pos");
    t.appendChild(o), this.writePos_(o, e, n);
  }
  /**
   * @param {Element} node Node.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {Array<*>} objectStack Node stack.
   */
  writeEnvelope(t, e, n) {
    const s = n[n.length - 1].srsName;
    s && t.setAttribute("srsName", s);
    const o = ["lowerCorner", "upperCorner"], a = [e[0] + " " + e[1], e[2] + " " + e[3]];
    A(
      /** @type {import("../xml.js").NodeStackItem} */
      { node: t },
      this.ENVELOPE_SERIALIZERS,
      Sn,
      a,
      n,
      o,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/LinearRing.js").default} geometry LinearRing geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeLinearRing(t, e, n) {
    const s = n[n.length - 1].srsName;
    s && t.setAttribute("srsName", s);
    const o = _(t.namespaceURI, "posList");
    t.appendChild(o), this.writePosList_(o, e, n);
  }
  /**
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string} [nodeName] Node name.
   * @return {Node} Node.
   * @private
   */
  RING_NODE_FACTORY_(t, e, n) {
    const r = e[e.length - 1], s = r.node, o = r.exteriorWritten;
    return o === void 0 && (r.exteriorWritten = !0), _(
      s.namespaceURI,
      o !== void 0 ? "interior" : "exterior"
    );
  }
  /**
   * @param {Element} node Node.
   * @param {Polygon} geometry Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeSurfaceOrPolygon(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName;
    if (t.nodeName !== "PolygonPatch" && o && t.setAttribute("srsName", o), t.nodeName === "Polygon" || t.nodeName === "PolygonPatch") {
      const a = e.getLinearRings();
      A(
        { node: t, hasZ: s, srsName: o },
        this.RING_SERIALIZERS,
        this.RING_NODE_FACTORY_,
        a,
        n,
        void 0,
        this
      );
    } else if (t.nodeName === "Surface") {
      const a = _(t.namespaceURI, "patches");
      t.appendChild(a), this.writeSurfacePatches_(a, e, n);
    }
  }
  /**
   * @param {Element} node Node.
   * @param {LineString} geometry LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeCurveOrLineString(t, e, n) {
    const s = n[n.length - 1].srsName;
    if (t.nodeName !== "LineStringSegment" && s && t.setAttribute("srsName", s), t.nodeName === "LineString" || t.nodeName === "LineStringSegment") {
      const o = _(t.namespaceURI, "posList");
      t.appendChild(o), this.writePosList_(o, e, n);
    } else if (t.nodeName === "Curve") {
      const o = _(t.namespaceURI, "segments");
      t.appendChild(o), this.writeCurveSegments_(o, e, n);
    }
  }
  /**
   * @param {Element} node Node.
   * @param {MultiPolygon} geometry MultiPolygon geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeMultiSurfaceOrPolygon(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName, a = r.surface;
    o && t.setAttribute("srsName", o);
    const l = e.getPolygons();
    A(
      { node: t, hasZ: s, srsName: o, surface: a },
      this.SURFACEORPOLYGONMEMBER_SERIALIZERS,
      this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,
      l,
      n,
      void 0,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/MultiPoint.js").default} geometry MultiPoint geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeMultiPoint(t, e, n) {
    const r = n[n.length - 1], s = r.srsName, o = r.hasZ;
    s && t.setAttribute("srsName", s);
    const a = e.getPoints();
    A(
      { node: t, hasZ: o, srsName: s },
      this.POINTMEMBER_SERIALIZERS,
      G("pointMember"),
      a,
      n,
      void 0,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {MultiLineString} geometry MultiLineString geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeMultiCurveOrLineString(t, e, n) {
    const r = n[n.length - 1], s = r.hasZ, o = r.srsName, a = r.curve;
    o && t.setAttribute("srsName", o);
    const l = e.getLineStrings();
    A(
      { node: t, hasZ: s, srsName: o, curve: a },
      this.LINESTRINGORCURVEMEMBER_SERIALIZERS,
      this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,
      l,
      n,
      void 0,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/LinearRing.js").default} ring LinearRing geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeRing(t, e, n) {
    const r = _(t.namespaceURI, "LinearRing");
    t.appendChild(r), this.writeLinearRing(r, e, n);
  }
  /**
   * @param {Node} node Node.
   * @param {Polygon} polygon Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeSurfaceOrPolygonMember(t, e, n) {
    const r = this.GEOMETRY_NODE_FACTORY_(e, n);
    r && (t.appendChild(r), this.writeSurfaceOrPolygon(r, e, n));
  }
  /**
   * @param {Element} node Node.
   * @param {import("../geom/Point.js").default} point Point geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writePointMember(t, e, n) {
    const r = _(t.namespaceURI, "Point");
    t.appendChild(r), this.writePoint(r, e, n);
  }
  /**
   * @param {Node} node Node.
   * @param {LineString} line LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeLineStringOrCurveMember(t, e, n) {
    const r = this.GEOMETRY_NODE_FACTORY_(e, n);
    r && (t.appendChild(r), this.writeCurveOrLineString(r, e, n));
  }
  /**
   * @param {Element} node Node.
   * @param {Polygon} polygon Polygon geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writeSurfacePatches_(t, e, n) {
    const r = _(t.namespaceURI, "PolygonPatch");
    t.appendChild(r), this.writeSurfaceOrPolygon(r, e, n);
  }
  /**
   * @param {Element} node Node.
   * @param {LineString} line LineString geometry.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writeCurveSegments_(t, e, n) {
    const r = _(t.namespaceURI, "LineStringSegment");
    t.appendChild(r), this.writeCurveOrLineString(r, e, n);
  }
  /**
   * @param {Node} node Node.
   * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
   * @param {Array<*>} objectStack Node stack.
   */
  writeGeometryElement(t, e, n) {
    const r = (
      /** @type {import("./Feature.js").WriteOptions} */
      n[n.length - 1]
    ), s = Object.assign({}, r);
    s.node = t;
    let o;
    Array.isArray(e) ? o = fe(
      /** @type {import("../extent.js").Extent} */
      e,
      r
    ) : o = pe(
      /** @type {import("../geom/Geometry.js").default} */
      e,
      !0,
      r
    ), A(
      /** @type {import("../xml.js").NodeStackItem} */
      s,
      this.GEOMETRY_SERIALIZERS,
      this.GEOMETRY_NODE_FACTORY_,
      [o],
      n,
      void 0,
      this
    );
  }
  /**
   * @param {Element} node Node.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {Array<*>} objectStack Node stack.
   */
  writeFeatureElement(t, e, n) {
    const r = e.getId();
    r && t.setAttribute(
      "fid",
      /** @type {string} */
      r
    );
    const s = (
      /** @type {Object} */
      n[n.length - 1]
    ), o = s.featureNS, a = e.getGeometryName();
    s.serializers || (s.serializers = {}, s.serializers[o] = {});
    const l = [], u = [];
    if (e.hasProperties()) {
      const c = e.getProperties();
      for (const g in c) {
        const d = c[g];
        d != null && (l.push(g), u.push(d), g == a || typeof /** @type {?} */
        d.getSimplifiedGeometry == "function" ? g in s.serializers[o] || (s.serializers[o][g] = p(
          this.writeGeometryElement,
          this
        )) : g in s.serializers[o] || (s.serializers[o][g] = p(I)));
      }
    }
    const h = Object.assign({}, s);
    h.node = t, A(
      /** @type {import("../xml.js").NodeStackItem} */
      h,
      s.serializers,
      G(void 0, o),
      u,
      n,
      l
    );
  }
  /**
   * @param {Node} node Node.
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {Array<*>} objectStack Node stack.
   * @private
   */
  writeFeatureMembers_(t, e, n) {
    const r = (
      /** @type {Object} */
      n[n.length - 1]
    ), s = r.featureType, o = r.featureNS, a = {};
    a[o] = {}, a[o][s] = p(
      this.writeFeatureElement,
      this
    );
    const l = Object.assign({}, r);
    l.node = t, A(
      /** @type {import("../xml.js").NodeStackItem} */
      l,
      a,
      G(s, o),
      e,
      n
    );
  }
  /**
   * @const
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string} [nodeName] Node name.
   * @return {Node|undefined} Node.
   * @private
   */
  MULTIGEOMETRY_MEMBER_NODE_FACTORY_(t, e, n) {
    const r = e[e.length - 1].node;
    return _(
      this.namespace,
      Ti[r.nodeName]
    );
  }
  /**
   * @const
   * @param {*} value Value.
   * @param {Array<*>} objectStack Object stack.
   * @param {string} [nodeName] Node name.
   * @return {Element|undefined} Node.
   * @private
   */
  GEOMETRY_NODE_FACTORY_(t, e, n) {
    const r = e[e.length - 1], s = r.multiSurface, o = r.surface, a = r.curve, l = r.multiCurve;
    return Array.isArray(t) ? n = "Envelope" : (n = /** @type {import("../geom/Geometry.js").default} */
    t.getType(), n === "MultiPolygon" && s === !0 ? n = "MultiSurface" : n === "Polygon" && o === !0 ? n = "Surface" : n === "LineString" && a === !0 ? n = "Curve" : n === "MultiLineString" && l === !0 && (n = "MultiCurve")), _(this.namespace, n);
  }
  /**
   * Encode a geometry in GML 3.1.1 Simple Features.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @return {Node} Node.
   * @api
   * @override
   */
  writeGeometryNode(t, e) {
    e = this.adaptOptions(e);
    const n = _(this.namespace, "geom"), r = {
      node: n,
      hasZ: this.hasZ,
      srsName: this.srsName,
      curve: this.curve_,
      surface: this.surface_,
      multiSurface: this.multiSurface_,
      multiCurve: this.multiCurve_
    };
    return e && Object.assign(r, e), this.writeGeometryElement(n, t, [r]), n;
  }
  /**
   * Encode an array of features in the GML 3.1.1 format as an XML node.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @return {Element} Node.
   * @api
   * @override
   */
  writeFeaturesNode(t, e) {
    e = this.adaptOptions(e);
    const n = _(this.namespace, "featureMembers");
    n.setAttributeNS(
      $t,
      "xsi:schemaLocation",
      this.schemaLocation
    );
    const r = {
      srsName: this.srsName,
      hasZ: this.hasZ,
      curve: this.curve_,
      surface: this.surface_,
      multiSurface: this.multiSurface_,
      multiCurve: this.multiCurve_,
      featureNS: this.featureNS,
      featureType: this.featureType
    };
    return e && Object.assign(r, e), this.writeFeatureMembers_(n, t, [r]), n;
  }
}
f.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS = {
  "http://www.opengis.net/gml": {
    pos: E(f.prototype.readFlatPos),
    posList: E(f.prototype.readFlatPosList),
    coordinates: E(N.prototype.readFlatCoordinates)
  }
};
f.prototype.FLAT_LINEAR_RINGS_PARSERS = {
  "http://www.opengis.net/gml": {
    interior: f.prototype.interiorParser,
    exterior: f.prototype.exteriorParser
  }
};
f.prototype.GEOMETRY_PARSERS = {
  "http://www.opengis.net/gml": {
    Point: E(y.prototype.readPoint),
    MultiPoint: E(y.prototype.readMultiPoint),
    LineString: E(y.prototype.readLineString),
    MultiLineString: E(y.prototype.readMultiLineString),
    LinearRing: E(y.prototype.readLinearRing),
    Polygon: E(y.prototype.readPolygon),
    MultiPolygon: E(y.prototype.readMultiPolygon),
    Surface: E(f.prototype.readSurface),
    MultiSurface: E(f.prototype.readMultiSurface),
    Curve: E(f.prototype.readCurve),
    MultiCurve: E(f.prototype.readMultiCurve),
    Envelope: E(f.prototype.readEnvelope)
  }
};
f.prototype.MULTICURVE_PARSERS = {
  "http://www.opengis.net/gml": {
    curveMember: w(f.prototype.curveMemberParser),
    curveMembers: w(f.prototype.curveMemberParser)
  }
};
f.prototype.MULTISURFACE_PARSERS = {
  "http://www.opengis.net/gml": {
    surfaceMember: w(f.prototype.surfaceMemberParser),
    surfaceMembers: w(f.prototype.surfaceMemberParser)
  }
};
f.prototype.CURVEMEMBER_PARSERS = {
  "http://www.opengis.net/gml": {
    LineString: w(y.prototype.readLineString),
    Curve: w(f.prototype.readCurve)
  }
};
f.prototype.SURFACEMEMBER_PARSERS = {
  "http://www.opengis.net/gml": {
    Polygon: w(y.prototype.readPolygon),
    Surface: w(f.prototype.readSurface)
  }
};
f.prototype.SURFACE_PARSERS = {
  "http://www.opengis.net/gml": {
    patches: E(f.prototype.readPatch)
  }
};
f.prototype.CURVE_PARSERS = {
  "http://www.opengis.net/gml": {
    segments: E(f.prototype.readSegment)
  }
};
f.prototype.ENVELOPE_PARSERS = {
  "http://www.opengis.net/gml": {
    lowerCorner: w(f.prototype.readFlatPosList),
    upperCorner: w(f.prototype.readFlatPosList)
  }
};
f.prototype.PATCHES_PARSERS = {
  "http://www.opengis.net/gml": {
    PolygonPatch: E(f.prototype.readPolygonPatch)
  }
};
f.prototype.SEGMENTS_PARSERS = {
  "http://www.opengis.net/gml": {
    LineStringSegment: _n(
      f.prototype.readLineStringSegment
    )
  }
};
y.prototype.RING_PARSERS = {
  "http://www.opengis.net/gml": {
    LinearRing: E(y.prototype.readFlatLinearRing),
    Ring: E(f.prototype.readFlatCurveRing)
  }
};
f.prototype.writeFeatures;
f.prototype.RING_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    exterior: p(f.prototype.writeRing),
    interior: p(f.prototype.writeRing)
  }
};
f.prototype.ENVELOPE_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    lowerCorner: p(I),
    upperCorner: p(I)
  }
};
f.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    surfaceMember: p(
      f.prototype.writeSurfaceOrPolygonMember
    ),
    polygonMember: p(
      f.prototype.writeSurfaceOrPolygonMember
    )
  }
};
f.prototype.POINTMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    pointMember: p(f.prototype.writePointMember)
  }
};
f.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    lineStringMember: p(
      f.prototype.writeLineStringOrCurveMember
    ),
    curveMember: p(
      f.prototype.writeLineStringOrCurveMember
    )
  }
};
f.prototype.GEOMETRY_SERIALIZERS = {
  "http://www.opengis.net/gml": {
    Curve: p(f.prototype.writeCurveOrLineString),
    MultiCurve: p(f.prototype.writeMultiCurveOrLineString),
    Point: p(f.prototype.writePoint),
    MultiPoint: p(f.prototype.writeMultiPoint),
    LineString: p(f.prototype.writeCurveOrLineString),
    MultiLineString: p(
      f.prototype.writeMultiCurveOrLineString
    ),
    LinearRing: p(f.prototype.writeLinearRing),
    Polygon: p(f.prototype.writeSurfaceOrPolygon),
    MultiPolygon: p(
      f.prototype.writeMultiSurfaceOrPolygon
    ),
    Surface: p(f.prototype.writeSurfaceOrPolygon),
    MultiSurface: p(
      f.prototype.writeMultiSurfaceOrPolygon
    ),
    Envelope: p(f.prototype.writeEnvelope)
  }
};
class C extends f {
  /**
   * @param {import("./GMLBase.js").Options} [options] Optional configuration object.
   */
  constructor(t) {
    t = t || {}, super(t), this.schemaLocation = t.schemaLocation ? t.schemaLocation : this.namespace + " http://schemas.opengis.net/gml/3.2.1/gml.xsd";
  }
  /**
   * @param {Node} node Node.
   * @param {import("../geom/Geometry.js").default|import("../extent.js").Extent} geometry Geometry.
   * @param {Array<*>} objectStack Node stack.
   * @override
   */
  writeGeometryElement(t, e, n) {
    const r = n[n.length - 1];
    n[n.length - 1] = Object.assign(
      { multiCurve: !0, multiSurface: !0 },
      r
    ), super.writeGeometryElement(t, e, n);
  }
}
C.prototype.namespace = "http://www.opengis.net/gml/3.2";
C.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    pos: E(f.prototype.readFlatPos),
    posList: E(f.prototype.readFlatPosList),
    coordinates: E(N.prototype.readFlatCoordinates)
  }
};
C.prototype.FLAT_LINEAR_RINGS_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    interior: f.prototype.interiorParser,
    exterior: f.prototype.exteriorParser
  }
};
C.prototype.GEOMETRY_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    Point: E(y.prototype.readPoint),
    MultiPoint: E(y.prototype.readMultiPoint),
    LineString: E(y.prototype.readLineString),
    MultiLineString: E(y.prototype.readMultiLineString),
    LinearRing: E(y.prototype.readLinearRing),
    Polygon: E(y.prototype.readPolygon),
    MultiPolygon: E(y.prototype.readMultiPolygon),
    Surface: E(C.prototype.readSurface),
    MultiSurface: E(f.prototype.readMultiSurface),
    Curve: E(C.prototype.readCurve),
    MultiCurve: E(f.prototype.readMultiCurve),
    Envelope: E(C.prototype.readEnvelope)
  }
};
C.prototype.MULTICURVE_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    curveMember: w(f.prototype.curveMemberParser),
    curveMembers: w(f.prototype.curveMemberParser)
  }
};
C.prototype.MULTISURFACE_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    surfaceMember: w(f.prototype.surfaceMemberParser),
    surfaceMembers: w(f.prototype.surfaceMemberParser)
  }
};
C.prototype.CURVEMEMBER_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    LineString: w(y.prototype.readLineString),
    Curve: w(f.prototype.readCurve)
  }
};
C.prototype.SURFACEMEMBER_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    Polygon: w(y.prototype.readPolygon),
    Surface: w(f.prototype.readSurface)
  }
};
C.prototype.SURFACE_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    patches: E(f.prototype.readPatch)
  }
};
C.prototype.CURVE_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    segments: E(f.prototype.readSegment)
  }
};
C.prototype.ENVELOPE_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    lowerCorner: w(f.prototype.readFlatPosList),
    upperCorner: w(f.prototype.readFlatPosList)
  }
};
C.prototype.PATCHES_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    PolygonPatch: E(f.prototype.readPolygonPatch)
  }
};
C.prototype.SEGMENTS_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    LineStringSegment: _n(
      f.prototype.readLineStringSegment
    )
  }
};
C.prototype.MULTIPOINT_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    pointMember: w(y.prototype.pointMemberParser),
    pointMembers: w(y.prototype.pointMemberParser)
  }
};
C.prototype.MULTILINESTRING_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    lineStringMember: w(
      y.prototype.lineStringMemberParser
    ),
    lineStringMembers: w(
      y.prototype.lineStringMemberParser
    )
  }
};
C.prototype.MULTIPOLYGON_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    polygonMember: w(y.prototype.polygonMemberParser),
    polygonMembers: w(y.prototype.polygonMemberParser)
  }
};
C.prototype.POINTMEMBER_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    Point: w(y.prototype.readFlatCoordinatesFromNode)
  }
};
C.prototype.LINESTRINGMEMBER_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    LineString: w(y.prototype.readLineString)
  }
};
C.prototype.POLYGONMEMBER_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    Polygon: w(y.prototype.readPolygon)
  }
};
C.prototype.RING_PARSERS = {
  "http://www.opengis.net/gml/3.2": {
    LinearRing: E(y.prototype.readFlatLinearRing),
    Ring: E(C.prototype.readFlatCurveRing)
  }
};
C.prototype.RING_SERIALIZERS = {
  "http://www.opengis.net/gml/3.2": {
    exterior: p(f.prototype.writeRing),
    interior: p(f.prototype.writeRing)
  }
};
C.prototype.ENVELOPE_SERIALIZERS = {
  "http://www.opengis.net/gml/3.2": {
    lowerCorner: p(I),
    upperCorner: p(I)
  }
};
C.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml/3.2": {
    surfaceMember: p(
      f.prototype.writeSurfaceOrPolygonMember
    ),
    polygonMember: p(
      f.prototype.writeSurfaceOrPolygonMember
    )
  }
};
C.prototype.POINTMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml/3.2": {
    pointMember: p(f.prototype.writePointMember)
  }
};
C.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS = {
  "http://www.opengis.net/gml/3.2": {
    lineStringMember: p(
      f.prototype.writeLineStringOrCurveMember
    ),
    curveMember: p(
      f.prototype.writeLineStringOrCurveMember
    )
  }
};
C.prototype.GEOMETRY_SERIALIZERS = {
  "http://www.opengis.net/gml/3.2": {
    Curve: p(f.prototype.writeCurveOrLineString),
    MultiCurve: p(f.prototype.writeMultiCurveOrLineString),
    Point: p(C.prototype.writePoint),
    MultiPoint: p(f.prototype.writeMultiPoint),
    LineString: p(f.prototype.writeCurveOrLineString),
    MultiLineString: p(
      f.prototype.writeMultiCurveOrLineString
    ),
    LinearRing: p(f.prototype.writeLinearRing),
    Polygon: p(f.prototype.writeSurfaceOrPolygon),
    MultiPolygon: p(
      f.prototype.writeMultiSurfaceOrPolygon
    ),
    Surface: p(f.prototype.writeSurfaceOrPolygon),
    MultiSurface: p(
      f.prototype.writeMultiSurfaceOrPolygon
    ),
    Envelope: p(f.prototype.writeEnvelope)
  }
};
class Un {
  /**
   * @param {!string} tagName The XML tag name for this filter.
   */
  constructor(t) {
    this.tagName_ = t;
  }
  /**
   * The XML tag name for a filter.
   * @return {!string} Name.
   */
  getTagName() {
    return this.tagName_;
  }
}
class Fi extends Un {
  /**
   * @param {!string} tagName The XML tag name for this filter.
   * @param {Array<import("./Filter.js").default>} conditions Conditions.
   */
  constructor(t, e) {
    super(t), this.conditions = e, st(this.conditions.length >= 2, "At least 2 conditions are required");
  }
}
class vi extends Fi {
  /**
   * @param {...import("./Filter.js").default} conditions Conditions.
   */
  constructor(t) {
    super("And", Array.prototype.slice.call(arguments));
  }
}
class Oi extends Un {
  /**
   * @param {!string} geometryName Geometry name to use.
   * @param {!import("../../extent.js").Extent} extent Extent.
   * @param {string} [srsName] SRS name. No srsName attribute will be set
   * on geometries when this is not provided.
   */
  constructor(t, e, n) {
    if (super("BBOX"), this.geometryName = t, this.extent = e, e.length !== 4)
      throw new Error(
        "Expected an extent with four values ([minX, minY, maxX, maxY])"
      );
    this.srsName = n;
  }
}
function xi(i) {
  const t = [null].concat(Array.prototype.slice.call(arguments));
  return new (Function.prototype.bind.apply(vi, t))();
}
function Gi(i, t, e) {
  return new Oi(i, t, e);
}
const Be = {
  "http://www.opengis.net/gml": {
    boundedBy: D(
      y.prototype.readExtentElement,
      "bounds"
    )
  },
  "http://www.opengis.net/wfs/2.0": {
    member: w(y.prototype.readFeaturesInternal)
  }
}, bi = {
  "http://www.opengis.net/wfs": {
    totalInserted: D(k),
    totalUpdated: D(k),
    totalDeleted: D(k)
  },
  "http://www.opengis.net/wfs/2.0": {
    totalInserted: D(k),
    totalUpdated: D(k),
    totalDeleted: D(k)
  }
}, Yi = {
  "http://www.opengis.net/wfs": {
    TransactionSummary: D(
      Xe,
      "transactionSummary"
    ),
    InsertResults: D(ze, "insertIds")
  },
  "http://www.opengis.net/wfs/2.0": {
    TransactionSummary: D(
      Xe,
      "transactionSummary"
    ),
    InsertResults: D(ze, "insertIds")
  }
}, Ui = {
  "http://www.opengis.net/wfs": {
    PropertyName: p(I)
  },
  "http://www.opengis.net/wfs/2.0": {
    PropertyName: p(I)
  }
}, Dn = {
  "http://www.opengis.net/wfs": {
    Insert: p(We),
    Update: p(qe),
    Delete: p($e),
    Property: p(He),
    Native: p(Ke)
  },
  "http://www.opengis.net/wfs/2.0": {
    Insert: p(We),
    Update: p(qe),
    Delete: p($e),
    Property: p(He),
    Native: p(Ke)
  }
}, Bn = "feature", de = "http://www.w3.org/2000/xmlns/", me = {
  "2.0.0": "http://www.opengis.net/ogc/1.1",
  "1.1.0": "http://www.opengis.net/ogc",
  "1.0.0": "http://www.opengis.net/ogc"
}, Qt = {
  "2.0.0": "http://www.opengis.net/wfs/2.0",
  "1.1.0": "http://www.opengis.net/wfs",
  "1.0.0": "http://www.opengis.net/wfs"
}, ye = {
  "2.0.0": "http://www.opengis.net/fes/2.0",
  "1.1.0": "http://www.opengis.net/fes",
  "1.0.0": "http://www.opengis.net/fes"
}, Ze = {
  "2.0.0": "http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd",
  "1.1.0": "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd",
  "1.0.0": "http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd"
}, Ee = {
  "2.0.0": C,
  "1.1.0": f,
  "1.0.0": N
}, Di = "1.1.0";
class Wi extends Yn {
  /**
   * @param {Options} [options] Optional configuration object.
   */
  constructor(t) {
    super(), t = t || {}, this.version_ = t.version ? t.version : Di, this.featureType_ = t.featureType, this.featureNS_ = t.featureNS, this.gmlFormat_ = t.gmlFormat ? t.gmlFormat : new Ee[this.version_](), this.schemaLocation_ = t.schemaLocation ? t.schemaLocation : Ze[this.version_];
  }
  /**
   * @return {Array<string>|string|undefined} featureType
   */
  getFeatureType() {
    return this.featureType_;
  }
  /**
   * @param {Array<string>|string|undefined} featureType Feature type(s) to parse.
   */
  setFeatureType(t) {
    this.featureType_ = t;
  }
  /**
   * @protected
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {Array<import("../Feature.js").default>} Features.
   * @override
   */
  readFeaturesFromNode(t, e) {
    const n = {
      node: t
    };
    Object.assign(n, {
      featureType: this.featureType_,
      featureNS: this.featureNS_
    }), Object.assign(n, this.getReadOptions(t, e || {}));
    const r = [n];
    let s;
    this.version_ === "2.0.0" ? s = Be : s = this.gmlFormat_.FEATURE_COLLECTION_PARSERS;
    let o = P(
      [],
      s,
      t,
      r,
      this.gmlFormat_
    );
    return o || (o = []), o;
  }
  /**
   * Read transaction response of the source.
   *
   * @param {Document|Element|Object|string} source Source.
   * @return {TransactionResponse|undefined} Transaction response.
   * @api
   */
  readTransactionResponse(t) {
    if (t) {
      if (typeof t == "string") {
        const e = nt(t);
        return this.readTransactionResponseFromDocument(e);
      }
      return et(t) ? this.readTransactionResponseFromDocument(
        /** @type {Document} */
        t
      ) : this.readTransactionResponseFromNode(
        /** @type {Element} */
        t
      );
    }
  }
  /**
   * Read feature collection metadata of the source.
   *
   * @param {Document|Element|Object|string} source Source.
   * @return {FeatureCollectionMetadata|undefined}
   *     FeatureCollection metadata.
   * @api
   */
  readFeatureCollectionMetadata(t) {
    if (t) {
      if (typeof t == "string") {
        const e = nt(t);
        return this.readFeatureCollectionMetadataFromDocument(e);
      }
      return et(t) ? this.readFeatureCollectionMetadataFromDocument(
        /** @type {Document} */
        t
      ) : this.readFeatureCollectionMetadataFromNode(
        /** @type {Element} */
        t
      );
    }
  }
  /**
   * @param {Document} doc Document.
   * @return {FeatureCollectionMetadata|undefined}
   *     FeatureCollection metadata.
   */
  readFeatureCollectionMetadataFromDocument(t) {
    for (let e = (
      /** @type {Node} */
      t.firstChild
    ); e; e = e.nextSibling)
      if (e.nodeType == Node.ELEMENT_NODE)
        return this.readFeatureCollectionMetadataFromNode(
          /** @type {Element} */
          e
        );
  }
  /**
   * @param {Element} node Node.
   * @return {FeatureCollectionMetadata|undefined}
   *     FeatureCollection metadata.
   */
  readFeatureCollectionMetadataFromNode(t) {
    const e = {}, n = rt(
      t.getAttribute("numberOfFeatures")
    );
    return e.numberOfFeatures = n, P(
      /** @type {FeatureCollectionMetadata} */
      e,
      Be,
      t,
      [],
      this.gmlFormat_
    );
  }
  /**
   * @param {Document} doc Document.
   * @return {TransactionResponse|undefined} Transaction response.
   */
  readTransactionResponseFromDocument(t) {
    for (let e = (
      /** @type {Node} */
      t.firstChild
    ); e; e = e.nextSibling)
      if (e.nodeType == Node.ELEMENT_NODE)
        return this.readTransactionResponseFromNode(
          /** @type {Element} */
          e
        );
  }
  /**
   * @param {Element} node Node.
   * @return {TransactionResponse|undefined} Transaction response.
   */
  readTransactionResponseFromNode(t) {
    return P(
      /** @type {TransactionResponse} */
      {},
      Yi,
      t,
      []
    );
  }
  /**
   * Encode format as WFS `GetFeature` and return the Node.
   *
   * @param {WriteGetFeatureOptions} options Options.
   * @return {Node} Result.
   * @api
   */
  writeGetFeature(t) {
    const e = _(Qt[this.version_], "GetFeature");
    e.setAttribute("service", "WFS"), e.setAttribute("version", this.version_), t.handle && e.setAttribute("handle", t.handle), t.outputFormat && e.setAttribute("outputFormat", t.outputFormat), t.maxFeatures !== void 0 && e.setAttribute("maxFeatures", String(t.maxFeatures)), t.resultType && e.setAttribute("resultType", t.resultType), t.startIndex !== void 0 && e.setAttribute("startIndex", String(t.startIndex)), t.count !== void 0 && e.setAttribute("count", String(t.count)), t.viewParams !== void 0 && e.setAttribute("viewParams", t.viewParams), e.setAttributeNS(
      $t,
      "xsi:schemaLocation",
      this.schemaLocation_
    );
    const n = {
      node: e
    };
    if (Object.assign(n, {
      version: this.version_,
      srsName: t.srsName,
      featureNS: t.featureNS ? t.featureNS : this.featureNS_,
      featurePrefix: t.featurePrefix,
      propertyNames: t.propertyNames ? t.propertyNames : []
    }), st(
      Array.isArray(t.featureTypes),
      "`options.featureTypes` must be an Array"
    ), typeof t.featureTypes[0] == "string") {
      let r = t.filter;
      t.bbox && (st(
        t.geometryName,
        "`options.geometryName` must also be provided when `options.bbox` is set"
      ), r = this.combineBboxAndFilter(
        t.geometryName,
        t.bbox,
        t.srsName,
        r
      )), Object.assign(n, {
        geometryName: t.geometryName,
        filter: r
      }), on(
        e,
        /** @type {!Array<string>} */
        t.featureTypes,
        [n]
      );
    } else
      t.featureTypes.forEach((r) => {
        const s = this.combineBboxAndFilter(
          r.geometryName,
          r.bbox,
          t.srsName,
          t.filter
        );
        Object.assign(n, {
          geometryName: r.geometryName,
          filter: s
        }), on(e, [r.name], [n]);
      });
    return e;
  }
  /**
   * Create a bbox filter and combine it with another optional filter.
   *
   * @param {!string} geometryName Geometry name to use.
   * @param {!import("../extent.js").Extent} extent Extent.
   * @param {string} [srsName] SRS name. No srsName attribute will be
   *    set on geometries when this is not provided.
   * @param {import("./filter/Filter.js").default} [filter] Filter condition.
   * @return {import("./filter/Filter.js").default} The filter.
   */
  combineBboxAndFilter(t, e, n, r) {
    const s = Gi(t, e, n);
    return r ? xi(r, s) : s;
  }
  /**
   * Encode format as WFS `Transaction` and return the Node.
   *
   * @param {Array<import("../Feature.js").default>} inserts The features to insert.
   * @param {Array<import("../Feature.js").default>} updates The features to update.
   * @param {Array<import("../Feature.js").default>} deletes The features to delete.
   * @param {WriteTransactionOptions} options Write options.
   * @return {Node} Result.
   * @api
   */
  writeTransaction(t, e, n, r) {
    const s = [], o = r.version ? r.version : this.version_, a = _(Qt[o], "Transaction");
    a.setAttribute("service", "WFS"), a.setAttribute("version", o);
    let l;
    r && (l = r.gmlOptions ? r.gmlOptions : {}, r.handle && a.setAttribute("handle", r.handle)), a.setAttributeNS(
      $t,
      "xsi:schemaLocation",
      Ze[o]
    );
    const u = Bi(a, l, o, r);
    return t && wt("Insert", t, s, u), e && wt("Update", e, s, u), n && wt("Delete", n, s, u), r.nativeElements && wt(
      "Native",
      r.nativeElements,
      s,
      u
    ), a;
  }
  /**
   * @param {Document} doc Document.
   * @return {import("../proj/Projection.js").default} Projection.
   * @override
   */
  readProjectionFromDocument(t) {
    for (let e = t.firstChild; e; e = e.nextSibling)
      if (e.nodeType == Node.ELEMENT_NODE)
        return this.readProjectionFromNode(
          /** @type {Element} */
          e
        );
    return null;
  }
  /**
   * @param {Element} node Node.
   * @return {import("../proj/Projection.js").default} Projection.
   * @override
   */
  readProjectionFromNode(t) {
    if (t.firstElementChild && t.firstElementChild.firstElementChild) {
      t = t.firstElementChild.firstElementChild;
      for (let e = t.firstElementChild; e; e = e.nextElementSibling)
        if (!(e.childNodes.length === 0 || e.childNodes.length === 1 && e.firstChild.nodeType === 3)) {
          const n = [{}];
          return this.gmlFormat_.readGeometryElement(e, n), v(n.pop().srsName);
        }
    }
    return null;
  }
}
function Bi(i, t, e, n) {
  const r = n.featurePrefix ? n.featurePrefix : Bn;
  let s;
  return e === "1.0.0" ? s = 2 : e === "1.1.0" ? s = 3 : e === "2.0.0" && (s = 3.2), Object.assign(
    { node: i },
    {
      version: e,
      featureNS: n.featureNS,
      featureType: n.featureType,
      featurePrefix: r,
      gmlVersion: s,
      hasZ: n.hasZ,
      srsName: n.srsName
    },
    t
  );
}
function wt(i, t, e, n) {
  A(
    n,
    Dn,
    G(i),
    t,
    e
  );
}
function Xe(i, t) {
  return P({}, bi, i, t);
}
const Zi = {
  "http://www.opengis.net/ogc": {
    FeatureId: w(function(i, t) {
      return i.getAttribute("fid");
    })
  },
  "http://www.opengis.net/ogc/1.1": {
    FeatureId: w(function(i, t) {
      return i.getAttribute("fid");
    })
  }
};
function Ve(i, t) {
  q(Zi, i, t);
}
const Xi = {
  "http://www.opengis.net/wfs": {
    Feature: Ve
  },
  "http://www.opengis.net/wfs/2.0": {
    Feature: Ve
  }
};
function ze(i, t) {
  return P([], Xi, i, t);
}
function We(i, t, e) {
  const n = e[e.length - 1], r = n.featureType, s = n.featureNS, o = n.gmlVersion, a = _(s, r);
  i.appendChild(a), o === 2 ? N.prototype.writeFeatureElement(a, t, e) : o === 3 ? f.prototype.writeFeatureElement(a, t, e) : C.prototype.writeFeatureElement(a, t, e);
}
function Zn(i, t, e) {
  const r = e[e.length - 1].version, s = me[r], o = _(s, "Filter"), a = _(s, "FeatureId");
  o.appendChild(a), a.setAttribute(
    "fid",
    /** @type {string} */
    t
  ), i.appendChild(o);
}
function Re(i, t) {
  i = i || Bn;
  const e = i + ":";
  return t.startsWith(e) ? t : e + t;
}
function $e(i, t, e) {
  const n = e[e.length - 1];
  st(t.getId() !== void 0, "Features must have an id set");
  const r = n.featureType, s = n.featurePrefix, o = n.featureNS, a = Re(s, r);
  i.setAttribute("typeName", a), i.setAttributeNS(de, "xmlns:" + s, o);
  const l = t.getId();
  l !== void 0 && Zn(i, l, e);
}
function qe(i, t, e) {
  const n = e[e.length - 1];
  st(t.getId() !== void 0, "Features must have an id set");
  const r = n.version, s = n.featureType, o = n.featurePrefix, a = n.featureNS, l = Re(o, s), u = t.getGeometryName();
  i.setAttribute("typeName", l), i.setAttributeNS(de, "xmlns:" + o, a);
  const h = t.getId();
  if (h !== void 0) {
    const c = t.getKeys(), g = [];
    for (let d = 0, m = c.length; d < m; d++) {
      const R = t.get(c[d]);
      if (R !== void 0) {
        let S = c[d];
        R && typeof /** @type {?} */
        R.getSimplifiedGeometry == "function" && (S = u), g.push({ name: S, value: R });
      }
    }
    A(
      /** @type {import("../xml.js").NodeStackItem} */
      {
        version: r,
        gmlVersion: n.gmlVersion,
        node: i,
        hasZ: n.hasZ,
        srsName: n.srsName
      },
      Dn,
      G("Property"),
      g,
      e
    ), Zn(i, h, e);
  }
}
function He(i, t, e) {
  const n = e[e.length - 1], r = n.version, s = Qt[r], a = _(s, r === "2.0.0" ? "ValueReference" : "Name"), l = n.gmlVersion;
  if (i.appendChild(a), I(a, t.name), t.value !== void 0 && t.value !== null) {
    const u = _(s, "Value");
    i.appendChild(u), t.value && typeof /** @type {?} */
    t.value.getSimplifiedGeometry == "function" ? l === 2 ? N.prototype.writeGeometryElement(u, t.value, e) : l === 3 ? f.prototype.writeGeometryElement(u, t.value, e) : C.prototype.writeGeometryElement(u, t.value, e) : I(u, t.value);
  }
}
function Ke(i, t, e) {
  t.vendorId && i.setAttribute("vendorId", t.vendorId), t.safeToIgnore !== void 0 && i.setAttribute("safeToIgnore", String(t.safeToIgnore)), t.value !== void 0 && I(i, t.value);
}
const bt = {
  "http://www.opengis.net/wfs": {
    Query: p(Qe)
  },
  "http://www.opengis.net/wfs/2.0": {
    Query: p(Qe)
  },
  "http://www.opengis.net/ogc": {
    During: p(ke),
    And: p(_t),
    Or: p(_t),
    Not: p(tn),
    BBOX: p(Je),
    Contains: p(Z),
    Intersects: p(Z),
    Within: p(Z),
    DWithin: p(je),
    PropertyIsEqualTo: p(Y),
    PropertyIsNotEqualTo: p(Y),
    PropertyIsLessThan: p(Y),
    PropertyIsLessThanOrEqualTo: p(Y),
    PropertyIsGreaterThan: p(Y),
    PropertyIsGreaterThanOrEqualTo: p(Y),
    PropertyIsNull: p(en),
    PropertyIsBetween: p(nn),
    PropertyIsLike: p(rn)
  },
  "http://www.opengis.net/fes/2.0": {
    During: p(ke),
    And: p(_t),
    Or: p(_t),
    Not: p(tn),
    BBOX: p(Je),
    Contains: p(Z),
    Disjoint: p(Z),
    Intersects: p(Z),
    ResourceId: p(zi),
    Within: p(Z),
    DWithin: p(je),
    PropertyIsEqualTo: p(Y),
    PropertyIsNotEqualTo: p(Y),
    PropertyIsLessThan: p(Y),
    PropertyIsLessThanOrEqualTo: p(Y),
    PropertyIsGreaterThan: p(Y),
    PropertyIsGreaterThanOrEqualTo: p(Y),
    PropertyIsNull: p(en),
    PropertyIsBetween: p(nn),
    PropertyIsLike: p(rn)
  }
};
function Qe(i, t, e) {
  const n = (
    /** @type {Object} */
    e[e.length - 1]
  ), r = n.version, s = n.featurePrefix, o = n.featureNS, a = n.propertyNames, l = n.srsName;
  let u;
  s ? u = Re(s, t) : u = t;
  let h;
  r === "2.0.0" ? h = "typeNames" : h = "typeName", i.setAttribute(h, u), l && i.setAttribute("srsName", l), o && i.setAttributeNS(de, "xmlns:" + s, o);
  const c = (
    /** @type {import("../xml.js").NodeStackItem} */
    Object.assign({}, n)
  );
  c.node = i, A(
    c,
    Ui,
    G("PropertyName"),
    a,
    e
  );
  const g = n.filter;
  if (g) {
    const d = _(Yt(r), "Filter");
    i.appendChild(d), Vi(d, g, e);
  }
}
function Vi(i, t, e) {
  const n = (
    /** @type {Object} */
    e[e.length - 1]
  ), r = { node: i };
  Object.assign(r, { context: n }), A(
    r,
    bt,
    G(t.getTagName()),
    [t],
    e
  );
}
function Je(i, t, e) {
  const n = (
    /** @type {Object} */
    e[e.length - 1]
  ), s = n.context.version;
  n.srsName = t.srsName;
  const o = Ee[s];
  ht(s, i, t.geometryName), o.prototype.writeGeometryElement(i, t.extent, e);
}
function zi(i, t, e) {
  i.setAttribute(
    "rid",
    /** @type {string} */
    t.rid
  );
}
function Z(i, t, e) {
  const n = (
    /** @type {Object} */
    e[e.length - 1]
  ), s = n.context.version;
  n.srsName = t.srsName;
  const o = Ee[s];
  ht(s, i, t.geometryName), o.prototype.writeGeometryElement(i, t.geometry, e);
}
function je(i, t, e) {
  const s = /** @type {Object} */ e[e.length - 1].context.version;
  Z(i, t, e);
  const o = _(Yt(s), "Distance");
  I(o, t.distance.toString()), s === "2.0.0" ? o.setAttribute("uom", t.unit) : o.setAttribute("units", t.unit), i.appendChild(o);
}
function ke(i, t, e) {
  const s = /** @type {Object} */ e[e.length - 1].context.version;
  At(ye[s], "ValueReference", i, t.propertyName);
  const o = _(B, "TimePeriod");
  i.appendChild(o);
  const a = _(B, "begin");
  o.appendChild(a), sn(a, t.begin);
  const l = _(B, "end");
  o.appendChild(l), sn(l, t.end);
}
function _t(i, t, e) {
  const r = /** @type {Object} */ e[e.length - 1].context, s = { node: i };
  Object.assign(s, { context: r });
  const o = t.conditions;
  for (let a = 0, l = o.length; a < l; ++a) {
    const u = o[a];
    A(
      s,
      bt,
      G(u.getTagName()),
      [u],
      e
    );
  }
}
function tn(i, t, e) {
  const r = /** @type {Object} */ e[e.length - 1].context, s = { node: i };
  Object.assign(s, { context: r });
  const o = t.condition;
  A(
    s,
    bt,
    G(o.getTagName()),
    [o],
    e
  );
}
function Y(i, t, e) {
  const s = /** @type {Object} */ e[e.length - 1].context.version;
  t.matchCase !== void 0 && i.setAttribute("matchCase", t.matchCase.toString()), ht(s, i, t.propertyName), Lt(s, i, "" + t.expression);
}
function en(i, t, e) {
  const s = /** @type {Object} */ e[e.length - 1].context.version;
  ht(s, i, t.propertyName);
}
function nn(i, t, e) {
  const s = /** @type {Object} */ e[e.length - 1].context.version, o = Yt(s);
  ht(s, i, t.propertyName);
  const a = _(o, "LowerBoundary");
  i.appendChild(a), Lt(s, a, "" + t.lowerBoundary);
  const l = _(o, "UpperBoundary");
  i.appendChild(l), Lt(s, l, "" + t.upperBoundary);
}
function rn(i, t, e) {
  const s = /** @type {Object} */ e[e.length - 1].context.version;
  i.setAttribute("wildCard", t.wildCard), i.setAttribute("singleChar", t.singleChar), i.setAttribute("escapeChar", t.escapeChar), t.matchCase !== void 0 && i.setAttribute("matchCase", t.matchCase.toString()), ht(s, i, t.propertyName), Lt(s, i, "" + t.pattern);
}
function At(i, t, e, n) {
  const r = _(i, t);
  I(r, n), e.appendChild(r);
}
function Lt(i, t, e) {
  At(Yt(i), "Literal", t, e);
}
function ht(i, t, e) {
  i === "2.0.0" ? At(ye[i], "ValueReference", t, e) : At(me[i], "PropertyName", t, e);
}
function sn(i, t) {
  const e = _(B, "TimeInstant");
  i.appendChild(e);
  const n = _(B, "timePosition");
  e.appendChild(n), I(n, t);
}
function on(i, t, e) {
  const n = (
    /** @type {Object} */
    e[e.length - 1]
  ), r = (
    /** @type {import("../xml.js").NodeStackItem} */
    Object.assign({}, n)
  );
  r.node = i, A(
    r,
    bt,
    G("Query"),
    t,
    e
  );
}
function Yt(i) {
  let t;
  return i === "2.0.0" ? t = ye[i] : t = me[i], t;
}
export {
  Wi as default
};
