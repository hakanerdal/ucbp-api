const C = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
function A(i, t, e) {
  let n, s;
  return t < i[0] ? n = i[0] - t : i[2] < t ? n = t - i[2] : n = 0, e < i[1] ? s = i[1] - e : i[3] < e ? s = e - i[3] : s = 0, n * n + s * s;
}
function ye(i, t, e) {
  return i[0] <= t && t <= i[2] && i[1] <= e && e <= i[3];
}
function zt(i, t) {
  const e = i[0], n = i[1], s = i[2], r = i[3], o = t[0], l = t[1];
  let h = C.UNKNOWN;
  return o < e ? h = h | C.LEFT : o > s && (h = h | C.RIGHT), l < n ? h = h | C.BELOW : l > r && (h = h | C.ABOVE), h === C.UNKNOWN && (h = C.INTERSECTING), h;
}
function wt() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function _e(i, t, e, n, s) {
  return s ? (s[0] = i, s[1] = t, s[2] = e, s[3] = n, s) : [i, t, e, n];
}
function It(i) {
  return _e(1 / 0, 1 / 0, -1 / 0, -1 / 0, i);
}
function me(i, t) {
  const e = i[0], n = i[1];
  return _e(e, n, e, n, t);
}
function Tt(i, t, e, n, s) {
  const r = It(s);
  return pe(r, i, t, e, n);
}
function Je(i, t) {
  return t[0] < i[0] && (i[0] = t[0]), t[2] > i[2] && (i[2] = t[2]), t[1] < i[1] && (i[1] = t[1]), t[3] > i[3] && (i[3] = t[3]), i;
}
function pe(i, t, e, n, s) {
  for (; e < n; e += s)
    qe(i, t[e], t[e + 1]);
  return i;
}
function qe(i, t, e) {
  i[0] = Math.min(i[0], t), i[1] = Math.min(i[1], e), i[2] = Math.max(i[2], t), i[3] = Math.max(i[3], e);
}
function Ze(i, t) {
  let e;
  return e = t(Ve(i)), e || (e = t(ze(i)), e) || (e = t(tn(i)), e) || (e = t(Qe(i)), e) ? e : !1;
}
function Ve(i) {
  return [i[0], i[1]];
}
function ze(i) {
  return [i[2], i[1]];
}
function ht(i) {
  return [(i[0] + i[2]) / 2, (i[1] + i[3]) / 2];
}
function Q(i) {
  return i[3] - i[1];
}
function Qe(i) {
  return [i[0], i[3]];
}
function tn(i) {
  return [i[2], i[3]];
}
function en(i, t) {
  return i[0] <= t[2] && i[2] >= t[0] && i[1] <= t[3] && i[3] >= t[1];
}
function nn(i, t) {
  return t ? (t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t) : i;
}
function sn(i, t, e) {
  let n = !1;
  const s = zt(i, t), r = zt(i, e);
  if (s === C.INTERSECTING || r === C.INTERSECTING)
    n = !0;
  else {
    const o = i[0], l = i[1], h = i[2], a = i[3], u = t[0], c = t[1], g = e[0], f = e[1], d = (f - c) / (g - u);
    let y, _;
    r & C.ABOVE && !(s & C.ABOVE) && (y = g - (f - a) / d, n = y >= o && y <= h), !n && r & C.RIGHT && !(s & C.RIGHT) && (_ = f - (g - h) * d, n = _ >= l && _ <= a), !n && r & C.BELOW && !(s & C.BELOW) && (y = g - (f - l) / d, n = y >= o && y <= h), !n && r & C.LEFT && !(s & C.LEFT) && (_ = f - (g - o) * d, n = _ >= l && _ <= a);
  }
  return n;
}
function m() {
  throw new Error("Unimplemented abstract method.");
}
let rn = 0;
function on(i) {
  return i.ol_uid || (i.ol_uid = String(++rn));
}
const ln = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: "propertychange"
};
function Ce(i) {
  for (const t in i)
    delete i[t];
}
function Ee(i) {
  let t;
  for (t in i)
    return !1;
  return !t;
}
function W(i, t, e, n, s) {
  if (s) {
    const o = e;
    e = function(l) {
      return i.removeEventListener(t, e), o.call(n ?? this, l);
    };
  } else n && n !== i && (e = e.bind(n));
  const r = {
    target: i,
    type: t,
    listener: e
  };
  return i.addEventListener(t, e), r;
}
function Qt(i, t, e, n) {
  return W(i, t, e, n, !0);
}
function tt(i) {
  i && i.target && (i.target.removeEventListener(i.type, i.listener), Ce(i));
}
const St = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */
  CHANGE: "change"
};
class hn {
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
function an(i, t, e) {
  let n, s;
  e = e || Pe;
  let r = 0, o = i.length, l = !1;
  for (; r < o; )
    n = r + (o - r >> 1), s = +e(i[n], t), s < 0 ? r = n + 1 : (o = n, l = !s);
  return l ? r : ~r;
}
function Pe(i, t) {
  return i > t ? 1 : i < t ? -1 : 0;
}
function F(i, t) {
  const e = Array.isArray(t) ? t : [t], n = e.length;
  for (let s = 0; s < n; s++)
    i[i.length] = e[s];
}
function un(i, t) {
  const e = i.length;
  if (e !== t.length)
    return !1;
  for (let n = 0; n < e; n++)
    if (i[n] !== t[n])
      return !1;
  return !0;
}
function te() {
}
function Ge(i) {
  let t, e, n;
  return function() {
    const s = Array.prototype.slice.call(arguments);
    return (!e || this !== n || !un(s, e)) && (n = this, e = s, t = i.apply(this, arguments)), t;
  };
}
class Me {
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
class cn extends hn {
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
    const n = this.listeners_ || (this.listeners_ = {}), s = n[t] || (n[t] = []);
    s.includes(e) || s.push(e);
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
    const e = typeof t == "string", n = e ? t : t.type, s = this.listeners_ && this.listeners_[n];
    if (!s)
      return;
    const r = e ? new Me(t) : (
      /** @type {Event} */
      t
    );
    r.target || (r.target = this.eventTarget_ || this);
    const o = this.dispatching_ || (this.dispatching_ = {}), l = this.pendingRemovals_ || (this.pendingRemovals_ = {});
    n in o || (o[n] = 0, l[n] = 0), ++o[n];
    let h;
    for (let a = 0, u = s.length; a < u; ++a)
      if ("handleEvent" in s[a] ? h = /** @type {import("../events.js").ListenerObject} */
      s[a].handleEvent(r) : h = /** @type {import("../events.js").ListenerFunction} */
      s[a].call(this, r), h === !1 || r.propagationStopped) {
        h = !1;
        break;
      }
    if (--o[n] === 0) {
      let a = l[n];
      for (delete l[n]; a--; )
        this.removeEventListener(n, te);
      delete o[n];
    }
    return h;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.listeners_ && Ce(this.listeners_);
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
    const s = n.indexOf(e);
    s !== -1 && (this.pendingRemovals_ && t in this.pendingRemovals_ ? (n[s] = te, ++this.pendingRemovals_[t]) : (n.splice(s, 1), n.length === 0 && delete this.listeners_[t]));
  }
}
class at extends cn {
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
    ++this.revision_, this.dispatchEvent(St.CHANGE);
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
      const n = t.length, s = new Array(n);
      for (let r = 0; r < n; ++r)
        s[r] = W(this, t[r], e);
      return s;
    }
    return W(
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
      const s = t.length;
      n = new Array(s);
      for (let r = 0; r < s; ++r)
        n[r] = Qt(this, t[r], e);
    } else
      n = Qt(
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
      gn(n);
    else if (Array.isArray(t))
      for (let s = 0, r = t.length; s < r; ++s)
        this.removeEventListener(t[s], e);
    else
      this.removeEventListener(t, e);
  }
}
at.prototype.on;
at.prototype.once;
at.prototype.un;
function gn(i) {
  if (Array.isArray(i))
    for (let t = 0, e = i.length; t < e; ++t)
      tt(i[t]);
  else
    tt(
      /** @type {import("./events.js").EventsKey} */
      i
    );
}
class ee extends Me {
  /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */
  constructor(t, e, n) {
    super(t), this.key = e, this.oldValue = n;
  }
}
class ve extends at {
  /**
   * @param {NoInfer<Properties>} [values] An object with key-value pairs.
   */
  constructor(t) {
    super(), this.on, this.once, this.un, on(this), this.values_ = null, t !== void 0 && this.setProperties(t);
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
    n = `change:${t}`, this.hasListener(n) && this.dispatchEvent(new ee(n, t, e)), n = ln.PROPERTYCHANGE, this.hasListener(n) && this.dispatchEvent(new ee(n, t, e));
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
    const s = this.values_ || (this.values_ = {});
    if (n)
      s[t] = e;
    else {
      const r = s[t];
      s[t] = e, r !== e && this.notify(t, r);
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
      delete this.values_[t], Ee(this.values_) && (this.values_ = null), e || this.notify(t, n);
    }
  }
}
function fn(i, t, e, n, s, r) {
  const o = s - e, l = r - n;
  if (o !== 0 || l !== 0) {
    const h = ((i - e) * o + (t - n) * l) / (o * o + l * l);
    h > 1 ? (e = s, n = r) : h > 0 && (e += o * h, n += l * h);
  }
  return S(i, t, e, n);
}
function S(i, t, e, n) {
  const s = e - i, r = n - t;
  return s * s + r * r;
}
function ne(i) {
  return i * 180 / Math.PI;
}
function z(i) {
  return i * Math.PI / 180;
}
function Nt(i, t, e) {
  return i + e * (t - i);
}
function Et(i, t, e) {
  if (i >= t && i < e)
    return i;
  const n = e - t;
  return ((i - t) % n + n) % n + t;
}
const dn = {
  // use the radius of the Normal sphere
  radians: 6370997 / (2 * Math.PI),
  degrees: 2 * Math.PI * 6370997 / 360,
  ft: 0.3048,
  m: 1,
  "us-ft": 1200 / 3937
};
class At {
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
    return this.metersPerUnit_ || dn[this.units_];
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
const H = 6378137, X = Math.PI * H, yn = [-X, -X, X, X], _n = [-180, -85, 180, 85], Z = H * Math.log(Math.tan(Math.PI / 2));
class j extends At {
  /**
   * @param {string} code Code.
   */
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: yn,
      global: !0,
      worldExtent: _n,
      getPointResolution: function(e, n) {
        return e / Math.cosh(n[1] / H);
      }
    });
  }
}
const ie = [
  new j("EPSG:3857"),
  new j("EPSG:102100"),
  new j("EPSG:102113"),
  new j("EPSG:900913"),
  new j("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new j("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function mn(i, t, e, n) {
  const s = i.length;
  e = e > 1 ? e : 2, n = n ?? e, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(s));
  for (let r = 0; r < s; r += n) {
    t[r] = X * i[r] / 180;
    let o = H * Math.log(Math.tan(Math.PI * (+i[r + 1] + 90) / 360));
    o > Z ? o = Z : o < -Z && (o = -Z), t[r + 1] = o;
  }
  return t;
}
function pn(i, t, e, n) {
  const s = i.length;
  e = e > 1 ? e : 2, n = n ?? e, t === void 0 && (e > 2 ? t = i.slice() : t = new Array(s));
  for (let r = 0; r < s; r += n)
    t[r] = 180 * i[r] / X, t[r + 1] = 360 * Math.atan(Math.exp(i[r + 1] / H)) / Math.PI - 90;
  return t;
}
const Cn = 6378137, se = [-180, -90, 180, 90], En = Math.PI * Cn / 180;
class w extends At {
  /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: se,
      axisOrientation: e,
      global: !0,
      metersPerUnit: En,
      worldExtent: se
    });
  }
}
const re = [
  new w("CRS:84"),
  new w("EPSG:4326", "neu"),
  new w("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new w("urn:ogc:def:crs:OGC:2:84"),
  new w("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new w("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new w("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];
let Pt = {};
function Pn(i) {
  return Pt[i] || Pt[i.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function Gn(i, t) {
  Pt[i] = t;
}
let Y = {};
function K(i, t, e) {
  const n = i.getCode(), s = t.getCode();
  n in Y || (Y[n] = {}), Y[n][s] = e;
}
function mt(i, t) {
  return i in Y && t in Y[i] ? Y[i][t] : null;
}
const et = 0.9996, M = 669438e-8, ut = M * M, ct = ut * M, I = M / (1 - M), oe = Math.sqrt(1 - M), b = (1 - oe) / (1 + oe), Fe = b * b, Lt = Fe * b, Ot = Lt * b, Re = Ot * b, we = 1 - M / 4 - 3 * ut / 64 - 5 * ct / 256, Mn = 3 * M / 8 + 3 * ut / 32 + 45 * ct / 1024, vn = 15 * ut / 256 + 45 * ct / 1024, Fn = 35 * ct / 3072, Rn = 3 / 2 * b - 27 / 32 * Lt + 269 / 512 * Re, wn = 21 / 16 * Fe - 55 / 32 * Ot, In = 151 / 96 * Lt - 417 / 128 * Re, Tn = 1097 / 512 * Ot, nt = 6378137;
function Sn(i, t, e) {
  const n = i - 5e5, o = (e.north ? t : t - 1e7) / et / (nt * we), l = o + Rn * Math.sin(2 * o) + wn * Math.sin(4 * o) + In * Math.sin(6 * o) + Tn * Math.sin(8 * o), h = Math.sin(l), a = h * h, u = Math.cos(l), c = h / u, g = c * c, f = g * g, d = 1 - M * a, y = Math.sqrt(1 - M * a), _ = nt / y, E = (1 - M) / d, p = I * u ** 2, v = p * p, P = n / (_ * et), R = P * P, $ = R * P, Zt = $ * P, Vt = Zt * P, Be = Vt * P, He = l - c / E * (R / 2 - Zt / 24 * (5 + 3 * g + 10 * p - 4 * v - 9 * I)) + Be / 720 * (61 + 90 * g + 298 * p + 45 * f - 252 * I - 3 * v);
  let _t = (P - $ / 6 * (1 + 2 * g + p) + Vt / 120 * (5 - 2 * p + 28 * g - 3 * v + 8 * I + 24 * f)) / u;
  return _t = Et(
    _t + z(Ie(e.number)),
    -Math.PI,
    Math.PI
  ), [ne(_t), ne(He)];
}
const le = -80, he = 84, Nn = -180, An = 180;
function Ln(i, t, e) {
  i = Et(i, Nn, An), t < le ? t = le : t > he && (t = he);
  const n = z(t), s = Math.sin(n), r = Math.cos(n), o = s / r, l = o * o, h = l * l, a = z(i), u = Ie(e.number), c = z(u), g = nt / Math.sqrt(1 - M * s ** 2), f = I * r ** 2, d = r * Et(a - c, -Math.PI, Math.PI), y = d * d, _ = y * d, E = _ * d, p = E * d, v = p * d, P = nt * (we * n - Mn * Math.sin(2 * n) + vn * Math.sin(4 * n) - Fn * Math.sin(6 * n)), R = et * g * (d + _ / 6 * (1 - l + f) + p / 120 * (5 - 18 * l + h + 72 * f - 58 * I)) + 5e5;
  let $ = et * (P + g * o * (y / 2 + E / 24 * (5 - l + 9 * f + 4 * f ** 2) + v / 720 * (61 - 58 * l + h + 600 * f - 330 * I)));
  return e.north || ($ += 1e7), [R, $];
}
function Ie(i) {
  return (i - 1) * 6 - 180 + 3;
}
const On = [
  /^EPSG:(\d+)$/,
  /^urn:ogc:def:crs:EPSG::(\d+)$/,
  /^http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/(\d+)$/
];
function Te(i) {
  let t = 0;
  for (const s of On) {
    const r = i.match(s);
    if (r) {
      t = parseInt(r[1]);
      break;
    }
  }
  if (!t)
    return null;
  let e = 0, n = !1;
  return t > 32700 && t < 32761 ? e = t - 32700 : t > 32600 && t < 32661 && (n = !0, e = t - 32600), e ? { number: e, north: n } : null;
}
function ae(i, t) {
  return function(e, n, s, r) {
    const o = e.length;
    s = s > 1 ? s : 2, r = r ?? s, n || (s > 2 ? n = e.slice() : n = new Array(o));
    for (let l = 0; l < o; l += r) {
      const h = e[l], a = e[l + 1], u = i(h, a, t);
      n[l] = u[0], n[l + 1] = u[1];
    }
    return n;
  };
}
function jn(i) {
  return Te(i) ? new At({ code: i, units: "m" }) : null;
}
function xn(i) {
  const t = Te(i.getCode());
  return t ? {
    forward: ae(Ln, t),
    inverse: ae(Sn, t)
  } : null;
}
const Xn = [xn], Yn = [jn];
function jt(i, t) {
  if (t !== void 0) {
    for (let e = 0, n = i.length; e < n; ++e)
      t[e] = i[e];
    t = t;
  } else
    t = i.slice();
  return t;
}
function Gt(i) {
  Gn(i.getCode(), i), K(i, i, jt);
}
function bn(i) {
  i.forEach(Gt);
}
function G(i) {
  if (typeof i != "string")
    return i;
  const t = Pn(i);
  if (t)
    return t;
  for (const e of Yn) {
    const n = e(i);
    if (n)
      return n;
  }
  return null;
}
function ue(i) {
  bn(i), i.forEach(function(t) {
    i.forEach(function(e) {
      t !== e && K(t, e, jt);
    });
  });
}
function Un(i, t, e, n) {
  i.forEach(function(s) {
    t.forEach(function(r) {
      K(s, r, e), K(r, s, n);
    });
  });
}
function Dn(i, t) {
  if (i === t)
    return !0;
  const e = i.getUnits() === t.getUnits();
  return (i.getCode() === t.getCode() || Se(i, t) === jt) && e;
}
function Se(i, t) {
  const e = i.getCode(), n = t.getCode();
  let s = mt(e, n);
  if (s)
    return s;
  let r = null, o = null;
  for (const h of Xn)
    r || (r = h(i)), o || (o = h(t));
  if (!r && !o)
    return null;
  const l = "EPSG:4326";
  if (o)
    if (r)
      s = pt(
        r.inverse,
        o.forward
      );
    else {
      const h = mt(e, l);
      h && (s = pt(
        h,
        o.forward
      ));
    }
  else {
    const h = mt(l, n);
    h && (s = pt(
      r.inverse,
      h
    ));
  }
  return s && (Gt(i), Gt(t), K(i, t, s)), s;
}
function pt(i, t) {
  return function(e, n, s, r) {
    return n = i(e, n, s, r), t(n, n, s, r);
  };
}
function Mt(i, t) {
  const e = G(i), n = G(t);
  return Se(e, n);
}
function kn() {
  ue(ie), ue(re), Un(
    re,
    ie,
    mn,
    pn
  );
}
kn();
function $n(i, t) {
  if (!i)
    throw new Error(t);
}
const Wn = [1, 0, 0, 1, 0, 0];
new Array(6);
function Ne() {
  return Wn.slice(0);
}
function Ae(i, t, e, n, s, r, o, l) {
  const h = Math.sin(r), a = Math.cos(r);
  return i[0] = n * a, i[1] = s * h, i[2] = -n * h, i[3] = s * a, i[4] = o * n * a - l * n * h + t, i[5] = o * s * h + l * s * a + e, i;
}
function Le(i, t, e, n, s, r, o) {
  r = r || [], o = o || 2;
  let l = 0;
  for (let h = t; h < e; h += n) {
    const a = i[h], u = i[h + 1];
    r[l++] = s[0] * a + s[2] * u + s[4], r[l++] = s[1] * a + s[3] * u + s[5];
    for (let c = 2; c < o; c++)
      r[l++] = i[h + c];
  }
  return r && r.length != l && (r.length = l), r;
}
function Kn(i, t, e, n, s, r, o) {
  o = o || [];
  const l = Math.cos(s), h = Math.sin(s), a = r[0], u = r[1];
  let c = 0;
  for (let g = t; g < e; g += n) {
    const f = i[g] - a, d = i[g + 1] - u;
    o[c++] = a + f * l - d * h, o[c++] = u + f * h + d * l;
    for (let y = g + 2; y < g + n; ++y)
      o[c++] = i[y];
  }
  return o && o.length != c && (o.length = c), o;
}
function Bn(i, t, e, n, s, r, o, l) {
  l = l || [];
  const h = o[0], a = o[1];
  let u = 0;
  for (let c = t; c < e; c += n) {
    const g = i[c] - h, f = i[c + 1] - a;
    l[u++] = h + s * g, l[u++] = a + r * f;
    for (let d = c + 2; d < c + n; ++d)
      l[u++] = i[d];
  }
  return l && l.length != u && (l.length = u), l;
}
function Hn(i, t, e, n, s, r, o) {
  o = o || [];
  let l = 0;
  for (let h = t; h < e; h += n) {
    o[l++] = i[h] + s, o[l++] = i[h + 1] + r;
    for (let a = h + 2; a < h + n; ++a)
      o[l++] = i[a];
  }
  return o && o.length != l && (o.length = l), o;
}
const ce = Ne(), Jn = [NaN, NaN];
class Oe extends ve {
  constructor() {
    super(), this.extent_ = wt(), this.extentRevision_ = -1, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.simplifyTransformedInternal = Ge(
      (t, e, n) => {
        if (!n)
          return this.getSimplifiedGeometry(e);
        const s = this.clone();
        return s.applyTransform(n), s.getSimplifiedGeometry(e);
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
    return m();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(t, e, n, s) {
    return m();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(t, e) {
    return this.closestPointXY(t, e, Jn, Number.MIN_VALUE) === 0;
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
    return m();
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
      (isNaN(e[0]) || isNaN(e[1])) && It(e), this.extentRevision_ = this.getRevision();
    }
    return nn(this.extent_, t);
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
    m();
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
    m();
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
    return m();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return m();
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
    m();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(t) {
    return m();
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
    m();
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
    const n = G(t), s = n.getUnits() == "tile-pixels" ? function(r, o, l) {
      const h = n.getExtent(), a = n.getWorldExtent(), u = Q(a) / Q(h);
      Ae(
        ce,
        a[0],
        a[3],
        u,
        -u,
        0,
        0,
        0
      );
      const c = Le(
        r,
        0,
        r.length,
        l,
        ce,
        o
      ), g = Mt(n, e);
      return g ? g(c, c, l) : c;
    } : Mt(n, e);
    return this.applyTransform(s), this;
  }
}
class L extends Oe {
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
    return Tt(
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
    return m();
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
    this.stride = ge(t), this.layout = t, this.flatCoordinates = e;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(t, e) {
    m();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(t, e, n) {
    let s;
    if (t)
      s = ge(t);
    else {
      for (let r = 0; r < n; ++r) {
        if (e.length === 0) {
          this.layout = "XY", this.stride = 2;
          return;
        }
        e = /** @type {Array<unknown>} */
        e[0];
      }
      s = e.length, t = O(s);
    }
    this.layout = t, this.stride = s;
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
      const s = this.getStride();
      Kn(
        n,
        0,
        n.length,
        s,
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
    e === void 0 && (e = t), n || (n = ht(this.getExtent()));
    const s = this.getFlatCoordinates();
    if (s) {
      const r = this.getStride();
      Bn(
        s,
        0,
        s.length,
        r,
        t,
        e,
        n,
        s
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
      const s = this.getStride();
      Hn(
        n,
        0,
        n.length,
        s,
        t,
        e,
        n
      ), this.changed();
    }
  }
}
function O(i) {
  let t;
  return i == 2 ? t = "XY" : i == 3 ? t = "XYZ" : i == 4 && (t = "XYZM"), /** @type {import("./Geometry.js").GeometryLayout} */
  t;
}
function ge(i) {
  let t;
  return i == "XY" ? t = 2 : i == "XYZ" || i == "XYM" ? t = 3 : i == "XYZM" && (t = 4), /** @type {number} */
  t;
}
function qn(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s)
    i[t++] = e[s];
  return t;
}
function gt(i, t, e, n) {
  for (let s = 0, r = e.length; s < r; ++s) {
    const o = e[s];
    for (let l = 0; l < n; ++l)
      i[t++] = o[l];
  }
  return t;
}
function J(i, t, e, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, l = e.length; o < l; ++o) {
    const h = gt(
      i,
      t,
      e[o],
      n
    );
    s[r++] = h, t = h;
  }
  return s.length = r, s;
}
function je(i, t, e, n, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, l = e.length; o < l; ++o) {
    const h = J(
      i,
      t,
      e[o],
      n,
      s[r]
    );
    h.length === 0 && (h[0] = t), s[r++] = h, t = h[h.length - 1];
  }
  return s.length = r, s;
}
class xt extends ve {
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
      new xt()
    ), e = this.geometryName_;
    t.setGeometryName(e);
    const n = this.getPropertiesInternal();
    if (n) {
      const r = this.getGeometry();
      for (const o in n)
        o === e && r ? t.set(o, r.clone()) : t.set(o, n[o], !0);
    }
    const s = this.getStyle();
    return s && t.setStyle(s), t;
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
    this.geometryChangeKey_ && (tt(this.geometryChangeKey_), this.geometryChangeKey_ = null);
    const t = this.getGeometry();
    t && (this.geometryChangeKey_ = W(
      t,
      St.CHANGE,
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
    this.style_ = t, this.styleFunction_ = t ? Zn(t) : void 0, this.changed();
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
function Zn(i) {
  if (typeof i == "function")
    return i;
  let t;
  return Array.isArray(i) ? t = i : ($n(
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
function fe(i, t, e, n, s, r, o) {
  const l = i[t], h = i[t + 1], a = i[e] - l, u = i[e + 1] - h;
  let c;
  if (a === 0 && u === 0)
    c = t;
  else {
    const g = ((s - l) * a + (r - h) * u) / (a * a + u * u);
    if (g > 1)
      c = e;
    else if (g > 0) {
      for (let f = 0; f < n; ++f)
        o[f] = Nt(
          i[t + f],
          i[e + f],
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
function Xt(i, t, e, n, s) {
  let r = i[t], o = i[t + 1];
  for (t += n; t < e; t += n) {
    const l = i[t], h = i[t + 1], a = S(r, o, l, h);
    a > s && (s = a), r = l, o = h;
  }
  return s;
}
function Yt(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r];
    s = Xt(i, t, l, n, s), t = l;
  }
  return s;
}
function Vn(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r];
    s = Yt(i, t, l, n, s), t = l[l.length - 1];
  }
  return s;
}
function bt(i, t, e, n, s, r, o, l, h, a, u) {
  if (t == e)
    return a;
  let c, g;
  if (s === 0) {
    if (g = S(
      o,
      l,
      i[t],
      i[t + 1]
    ), g < a) {
      for (c = 0; c < n; ++c)
        h[c] = i[t + c];
      return h.length = n, g;
    }
    return a;
  }
  u = u || [NaN, NaN];
  let f = t + n;
  for (; f < e; )
    if (fe(
      i,
      f - n,
      f,
      n,
      o,
      l,
      u
    ), g = S(o, l, u[0], u[1]), g < a) {
      for (a = g, c = 0; c < n; ++c)
        h[c] = u[c];
      h.length = n, f += n;
    } else
      f += n * Math.max(
        (Math.sqrt(g) - Math.sqrt(a)) / s | 0,
        1
      );
  if (r && (fe(
    i,
    e - n,
    t,
    n,
    o,
    l,
    u
  ), g = S(o, l, u[0], u[1]), g < a)) {
    for (a = g, c = 0; c < n; ++c)
      h[c] = u[c];
    h.length = n;
  }
  return a;
}
function Ut(i, t, e, n, s, r, o, l, h, a, u) {
  u = u || [NaN, NaN];
  for (let c = 0, g = e.length; c < g; ++c) {
    const f = e[c];
    a = bt(
      i,
      t,
      f,
      n,
      s,
      r,
      o,
      l,
      h,
      a,
      u
    ), t = f;
  }
  return a;
}
function zn(i, t, e, n, s, r, o, l, h, a, u) {
  u = u || [NaN, NaN];
  for (let c = 0, g = e.length; c < g; ++c) {
    const f = e[c];
    a = Ut(
      i,
      t,
      f,
      n,
      s,
      r,
      o,
      l,
      h,
      a,
      u
    ), t = f[f.length - 1];
  }
  return a;
}
function ft(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = t; o < e; o += n)
    s[r++] = i.slice(o, o + n);
  return s.length = r, s;
}
function Dt(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, l = e.length; o < l; ++o) {
    const h = e[o];
    s[r++] = ft(
      i,
      t,
      h,
      n,
      s[r]
    ), t = h;
  }
  return s.length = r, s;
}
function Qn(i, t, e, n, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, l = e.length; o < l; ++o) {
    const h = e[o];
    s[r++] = h.length === 1 && h[0] === t ? [] : Dt(
      i,
      t,
      h,
      n,
      s[r]
    ), t = h[h.length - 1];
  }
  return s.length = r, s;
}
function it(i, t, e, n, s, r, o) {
  let l, h;
  const a = (e - t) / n;
  if (a === 1)
    l = t;
  else if (a === 2)
    l = t, h = s;
  else if (a !== 0) {
    let u = i[t], c = i[t + 1], g = 0;
    const f = [0];
    for (let _ = t + n; _ < e; _ += n) {
      const E = i[_], p = i[_ + 1];
      g += Math.sqrt((E - u) * (E - u) + (p - c) * (p - c)), f.push(g), u = E, c = p;
    }
    const d = s * g, y = an(f, d);
    y < 0 ? (h = (d - f[-y - 2]) / (f[-y - 1] - f[-y - 2]), l = t + (-y - 2) * n) : l = t + y * n;
  }
  o = o > 1 ? o : 2, r = r || new Array(o);
  for (let u = 0; u < o; ++u)
    r[u] = l === void 0 ? NaN : h === void 0 ? i[l + u] : Nt(i[l + u], i[l + n + u], h);
  return r;
}
function vt(i, t, e, n, s, r) {
  if (e == t)
    return null;
  let o;
  if (s < i[t + n - 1])
    return r ? (o = i.slice(t, t + n), o[n - 1] = s, o) : null;
  if (i[e - 1] < s)
    return r ? (o = i.slice(e - n, e), o[n - 1] = s, o) : null;
  if (s == i[t + n - 1])
    return i.slice(t, t + n);
  let l = t / n, h = e / n;
  for (; l < h; ) {
    const g = l + h >> 1;
    s < i[(g + 1) * n - 1] ? h = g : l = g + 1;
  }
  const a = i[l * n - 1];
  if (s == a)
    return i.slice((l - 1) * n, (l - 1) * n + n);
  const u = i[(l + 1) * n - 1], c = (s - a) / (u - a);
  o = [];
  for (let g = 0; g < n - 1; ++g)
    o.push(
      Nt(
        i[(l - 1) * n + g],
        i[l * n + g],
        c
      )
    );
  return o.push(s), o;
}
function ti(i, t, e, n, s, r, o) {
  if (o)
    return vt(
      i,
      t,
      e[e.length - 1],
      n,
      s,
      r
    );
  let l;
  if (s < i[n - 1])
    return r ? (l = i.slice(0, n), l[n - 1] = s, l) : null;
  if (i[i.length - 1] < s)
    return r ? (l = i.slice(i.length - n), l[n - 1] = s, l) : null;
  for (let h = 0, a = e.length; h < a; ++h) {
    const u = e[h];
    if (t != u) {
      if (s < i[t + n - 1])
        return null;
      if (s <= i[u - 1])
        return vt(
          i,
          t,
          u,
          n,
          s,
          !1
        );
      t = u;
    }
  }
  return null;
}
function ei(i, t, e, n, s) {
  return !Ze(
    s,
    /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */
    function(o) {
      return !T(
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
function T(i, t, e, n, s, r) {
  let o = 0, l = i[e - n], h = i[e - n + 1];
  for (; t < e; t += n) {
    const a = i[t], u = i[t + 1];
    h <= r ? u > r && (a - l) * (r - h) - (s - l) * (u - h) > 0 && o++ : u <= r && (a - l) * (r - h) - (s - l) * (u - h) < 0 && o--, l = a, h = u;
  }
  return o !== 0;
}
function kt(i, t, e, n, s, r) {
  if (e.length === 0 || !T(i, t, e[0], n, s, r))
    return !1;
  for (let o = 1, l = e.length; o < l; ++o)
    if (T(i, e[o - 1], e[o], n, s, r))
      return !1;
  return !0;
}
function ni(i, t, e, n, s, r) {
  if (e.length === 0)
    return !1;
  for (let o = 0, l = e.length; o < l; ++o) {
    const h = e[o];
    if (kt(i, t, h, n, s, r))
      return !0;
    t = h[h.length - 1];
  }
  return !1;
}
function xe(i, t, e, n, s) {
  let r;
  for (t += n; t < e; t += n)
    if (r = s(
      i.slice(t - n, t),
      i.slice(t, t + n)
    ), r)
      return r;
  return !1;
}
function q(i, t, e, n, s, r) {
  return r = r ?? pe(wt(), i, t, e, n), en(s, r) ? r[0] >= s[0] && r[2] <= s[2] || r[1] >= s[1] && r[3] <= s[3] ? !0 : xe(
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
    function(o, l) {
      return sn(s, o, l);
    }
  ) : !1;
}
function ii(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    if (q(i, t, e[r], n, s))
      return !0;
    t = e[r];
  }
  return !1;
}
function si(i, t, e, n, s) {
  return !!(q(i, t, e, n, s) || T(
    i,
    t,
    e,
    n,
    s[0],
    s[1]
  ) || T(
    i,
    t,
    e,
    n,
    s[0],
    s[3]
  ) || T(
    i,
    t,
    e,
    n,
    s[2],
    s[1]
  ) || T(
    i,
    t,
    e,
    n,
    s[2],
    s[3]
  ));
}
function Xe(i, t, e, n, s) {
  if (!si(i, t, e[0], n, s))
    return !1;
  if (e.length === 1)
    return !0;
  for (let r = 1, o = e.length; r < o; ++r)
    if (ei(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ) && !q(
      i,
      e[r - 1],
      e[r],
      n,
      s
    ))
      return !1;
  return !0;
}
function ri(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r];
    if (Xe(i, t, l, n, s))
      return !0;
    t = l[l.length - 1];
  }
  return !1;
}
function Ye(i, t, e, n) {
  let s = i[t], r = i[t + 1], o = 0;
  for (let l = t + n; l < e; l += n) {
    const h = i[l], a = i[l + 1];
    o += Math.sqrt((h - s) * (h - s) + (a - r) * (a - r)), s = h, r = a;
  }
  return o;
}
function dt(i, t, e, n, s, r, o) {
  const l = (e - t) / n;
  if (l < 3) {
    for (; t < e; t += n)
      r[o++] = i[t], r[o++] = i[t + 1];
    return o;
  }
  const h = new Array(l);
  h[0] = 1, h[l - 1] = 1;
  const a = [t, e - n];
  let u = 0;
  for (; a.length > 0; ) {
    const c = a.pop(), g = a.pop();
    let f = 0;
    const d = i[g], y = i[g + 1], _ = i[c], E = i[c + 1];
    for (let p = g + n; p < c; p += n) {
      const v = i[p], P = i[p + 1], R = fn(v, P, d, y, _, E);
      R > f && (u = p, f = R);
    }
    f > s && (h[(u - t) / n] = 1, g + n < u && a.push(g, u), u + n < c && a.push(u, c));
  }
  for (let c = 0; c < l; ++c)
    h[c] && (r[o++] = i[t + c * n], r[o++] = i[t + c * n + 1]);
  return o;
}
function be(i, t, e, n, s, r, o, l) {
  for (let h = 0, a = e.length; h < a; ++h) {
    const u = e[h];
    o = dt(
      i,
      t,
      u,
      n,
      s,
      r,
      o
    ), l.push(o), t = u;
  }
  return o;
}
function x(i, t) {
  return t * Math.round(i / t);
}
function oi(i, t, e, n, s, r, o) {
  if (t == e)
    return o;
  let l = x(i[t], s), h = x(i[t + 1], s);
  t += n, r[o++] = l, r[o++] = h;
  let a, u;
  do
    if (a = x(i[t], s), u = x(i[t + 1], s), t += n, t == e)
      return r[o++] = a, r[o++] = u, o;
  while (a == l && u == h);
  for (; t < e; ) {
    const c = x(i[t], s), g = x(i[t + 1], s);
    if (t += n, c == a && g == u)
      continue;
    const f = a - l, d = u - h, y = c - l, _ = g - h;
    if (f * _ == d * y && (f < 0 && y < f || f == y || f > 0 && y > f) && (d < 0 && _ < d || d == _ || d > 0 && _ > d)) {
      a = c, u = g;
      continue;
    }
    r[o++] = a, r[o++] = u, l = a, h = u, a = c, u = g;
  }
  return r[o++] = a, r[o++] = u, o;
}
function $t(i, t, e, n, s, r, o, l) {
  for (let h = 0, a = e.length; h < a; ++h) {
    const u = e[h];
    o = oi(
      i,
      t,
      u,
      n,
      s,
      r,
      o
    ), l.push(o), t = u;
  }
  return o;
}
function li(i, t, e, n, s, r, o, l) {
  for (let h = 0, a = e.length; h < a; ++h) {
    const u = e[h], c = [];
    o = $t(
      i,
      t,
      u,
      n,
      s,
      r,
      o,
      c
    ), l.push(c), t = u[u.length - 1];
  }
  return o;
}
class U extends L {
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
    F(this.flatCoordinates, t), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LineString} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new U(
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
  closestPointXY(t, e, n, s) {
    return s < A(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Xt(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), bt(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !1,
      t,
      e,
      n,
      s
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
    return xe(
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
    return this.layout != "XYM" && this.layout != "XYZM" ? null : (e = e !== void 0 ? e : !1, vt(
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
    return ft(
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
    return it(
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
    return Ye(
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
    return e.length = dt(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new U(e, "XY");
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
    return q(
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
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = gt(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
class st extends L {
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
      const s = (
        /** @type {Array<LineString>} */
        t
      ), r = [], o = [];
      for (let h = 0, a = s.length; h < a; ++h) {
        const u = s[h];
        F(r, u.getFlatCoordinates()), o.push(r.length);
      }
      const l = s.length === 0 ? this.getLayout() : s[0].getLayout();
      this.setFlatCoordinates(l, r), this.ends_ = o;
    }
  }
  /**
   * Append the passed linestring to the multilinestring.
   * @param {LineString} lineString LineString.
   * @api
   */
  appendLineString(t) {
    F(this.flatCoordinates, t.getFlatCoordinates().slice()), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiLineString} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new st(
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
  closestPointXY(t, e, n, s) {
    return s < A(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Yt(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ut(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !1,
      t,
      e,
      n,
      s
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
    return this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0 ? null : (e = e !== void 0 ? e : !1, n = n !== void 0 ? n : !1, ti(
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
    return Dt(
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
    return t < 0 || this.ends_.length <= t ? null : new U(
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
    const t = this.flatCoordinates, e = this.ends_, n = this.layout, s = [];
    let r = 0;
    for (let o = 0, l = e.length; o < l; ++o) {
      const h = e[o], a = new U(
        t.slice(r, h),
        n
      );
      s.push(a), r = h;
    }
    return s;
  }
  /**
   * Return the sum of all line string lengths
   * @return {number} Length (on projected plane).
   * @api
   */
  getLength() {
    const t = this.ends_;
    let e = 0, n = 0;
    for (let s = 0, r = t.length; s < r; ++s)
      n += Ye(
        this.flatCoordinates,
        e,
        t[s],
        this.stride
      ), e = t[s];
    return n;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    const t = [], e = this.flatCoordinates;
    let n = 0;
    const s = this.ends_, r = this.stride;
    for (let o = 0, l = s.length; o < l; ++o) {
      const h = s[o], a = it(
        e,
        n,
        h,
        r,
        0.5
      );
      F(t, a), n = h;
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
    return e.length = be(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      t,
      e,
      0,
      n
    ), new st(e, "XY", n);
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
    return ii(
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
    const n = J(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
class D extends L {
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
    const t = new D(this.flatCoordinates.slice(), this.layout);
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
  closestPointXY(t, e, n, s) {
    const r = this.flatCoordinates, o = S(
      t,
      e,
      r[0],
      r[1]
    );
    if (o < s) {
      const l = this.stride;
      for (let h = 0; h < l; ++h)
        n[h] = r[h];
      return n.length = l, o;
    }
    return s;
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
    return me(this.flatCoordinates, t);
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
    return ye(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(t, e) {
    this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = qn(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
class yt extends L {
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
    F(this.flatCoordinates, t.getFlatCoordinates()), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPoint} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new yt(
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
  closestPointXY(t, e, n, s) {
    if (s < A(this.getExtent(), t, e))
      return s;
    const r = this.flatCoordinates, o = this.stride;
    for (let l = 0, h = r.length; l < h; l += o) {
      const a = S(
        t,
        e,
        r[l],
        r[l + 1]
      );
      if (a < s) {
        s = a;
        for (let u = 0; u < o; ++u)
          n[u] = r[l + u];
        n.length = o;
      }
    }
    return s;
  }
  /**
   * Return the coordinates of the multipoint.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return ft(
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
    return t < 0 || e <= t ? null : new D(
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
    const t = this.flatCoordinates, e = this.layout, n = this.stride, s = [];
    for (let r = 0, o = t.length; r < o; r += n) {
      const l = new D(t.slice(r, r + n), e);
      s.push(l);
    }
    return s;
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
    for (let s = 0, r = e.length; s < r; s += n) {
      const o = e[s], l = e[s + 1];
      if (ye(t, o, l))
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
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = gt(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
function Ue(i, t, e, n) {
  let s = 0;
  const r = i[e - n], o = i[e - n + 1];
  let l = 0, h = 0;
  for (; t < e; t += n) {
    const a = i[t] - r, u = i[t + 1] - o;
    s += h * a - l * u, l = a, h = u;
  }
  return s / 2;
}
function De(i, t, e, n) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r];
    s += Ue(i, t, l, n), t = l;
  }
  return s;
}
function hi(i, t, e, n) {
  let s = 0;
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r];
    s += De(i, t, l, n), t = l[l.length - 1];
  }
  return s;
}
class B extends L {
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
    return new B(this.flatCoordinates.slice(), this.layout);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(t, e, n, s) {
    return s < A(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Xt(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), bt(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return Ue(
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
    return ft(
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
    return e.length = dt(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      0
    ), new B(e, "XY");
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
    return q(
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
    this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = gt(
      this.flatCoordinates,
      0,
      t,
      this.stride
    ), this.changed();
  }
}
function Wt(i, t, e, n, s, r, o) {
  let l, h, a, u, c, g, f;
  const d = s[r + 1], y = [];
  for (let p = 0, v = e.length; p < v; ++p) {
    const P = e[p];
    for (u = i[P - n], g = i[P - n + 1], l = t; l < P; l += n)
      c = i[l], f = i[l + 1], (d <= g && f <= d || g <= d && d <= f) && (a = (d - g) / (f - g) * (c - u) + u, y.push(a)), u = c, g = f;
  }
  let _ = NaN, E = -1 / 0;
  for (y.sort(Pe), u = y[0], l = 1, h = y.length; l < h; ++l) {
    c = y[l];
    const p = Math.abs(c - u);
    p > E && (a = (u + c) / 2, kt(i, t, e, n, a, d) && (_ = a, E = p)), u = c;
  }
  return isNaN(_) && (_ = s[r]), o ? (o.push(_, d, E), o) : [_, d, E];
}
function ke(i, t, e, n, s) {
  let r = [];
  for (let o = 0, l = e.length; o < l; ++o) {
    const h = e[o];
    r = Wt(
      i,
      t,
      h,
      n,
      s,
      2 * o,
      r
    ), t = h[h.length - 1];
  }
  return r;
}
function ai(i, t, e, n) {
  for (; t < e - n; ) {
    for (let s = 0; s < n; ++s) {
      const r = i[t + s];
      i[t + s] = i[e - n + s], i[e - n + s] = r;
    }
    t += n, e -= n;
  }
}
function Kt(i, t, e, n) {
  let s = 0, r = i[e - n], o = i[e - n + 1];
  for (; t < e; t += n) {
    const l = i[t], h = i[t + 1];
    s += (l - r) * (h + o), r = l, o = h;
  }
  return s === 0 ? void 0 : s > 0;
}
function Bt(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r], h = Kt(
      i,
      t,
      l,
      n
    );
    if (r === 0) {
      if (s && h || !s && !h)
        return !1;
    } else if (s && !h || !s && h)
      return !1;
    t = l;
  }
  return !0;
}
function $e(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r];
    if (!Bt(i, t, l, n, s))
      return !1;
    l.length && (t = l[l.length - 1]);
  }
  return !0;
}
function rt(i, t, e, n, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = e.length; r < o; ++r) {
    const l = e[r], h = Kt(
      i,
      t,
      l,
      n
    );
    (r === 0 ? s && h || !s && !h : s && !h || !s && h) && ai(i, t, l, n), t = l;
  }
  return t;
}
function Ft(i, t, e, n, s) {
  for (let r = 0, o = e.length; r < o; ++r)
    t = rt(
      i,
      t,
      e[r],
      n,
      s
    );
  return t;
}
function ui(i, t) {
  const e = [];
  let n = 0, s = 0, r;
  for (let o = 0, l = t.length; o < l; ++o) {
    const h = t[o], a = Kt(i, n, h, 2);
    if (r === void 0 && (r = a), a === r)
      e.push(t.slice(s, o + 1));
    else {
      if (e.length === 0)
        continue;
      e[e.length - 1].push(t[s]);
    }
    s = o + 1, n = h;
  }
  return e;
}
class k extends L {
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
    this.flatCoordinates ? F(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new k(
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
  closestPointXY(t, e, n, s) {
    return s < A(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Yt(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), Ut(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(t, e) {
    return kt(
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
    return De(
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
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), rt(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, Dt(e, 0, this.ends_, this.stride);
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
      const t = ht(this.getExtent());
      this.flatInteriorPoint_ = Wt(
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
    return new D(this.getFlatInteriorPoint(), "XYM");
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
    return t < 0 || this.ends_.length <= t ? null : new B(
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
    const t = this.layout, e = this.flatCoordinates, n = this.ends_, s = [];
    let r = 0;
    for (let o = 0, l = n.length; o < l; ++o) {
      const h = n[o], a = new B(
        e.slice(r, h),
        t
      );
      s.push(a), r = h;
    }
    return s;
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      Bt(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = rt(
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
    return e.length = $t(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new k(e, "XY", n);
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
    return Xe(
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
    const n = J(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1], this.changed();
  }
}
function We(i, t, e, n) {
  const s = [];
  let r = wt();
  for (let o = 0, l = e.length; o < l; ++o) {
    const h = e[o];
    r = Tt(
      i,
      t,
      h[0],
      n
    ), s.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2), t = h[h.length - 1];
  }
  return s;
}
class ot extends L {
  /**
   * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
   */
  constructor(t, e, n) {
    if (super(), this.endss_ = [], this.flatInteriorPointsRevision_ = -1, this.flatInteriorPoints_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, !n && !Array.isArray(t[0])) {
      const s = (
        /** @type {Array<Polygon>} */
        t
      ), r = [], o = [];
      for (let l = 0, h = s.length; l < h; ++l) {
        const a = s[l], u = r.length, c = a.getEnds();
        for (let g = 0, f = c.length; g < f; ++g)
          c[g] += u;
        F(r, a.getFlatCoordinates()), o.push(c);
      }
      e = s.length === 0 ? this.getLayout() : s[0].getLayout(), t = r, n = o;
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
      F(this.flatCoordinates, t.getFlatCoordinates()), e = t.getEnds().slice();
      for (let s = 0, r = e.length; s < r; ++s)
        e[s] += n;
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
    for (let s = 0; s < t; ++s)
      e[s] = this.endss_[s].slice();
    const n = new ot(
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
  closestPointXY(t, e, n, s) {
    return s < A(this.getExtent(), t, e) ? s : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(
      Vn(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        0
      )
    ), this.maxDeltaRevision_ = this.getRevision()), zn(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      this.maxDelta_,
      !0,
      t,
      e,
      n,
      s
    ));
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(t, e) {
    return ni(
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
    return hi(
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
    return t !== void 0 ? (e = this.getOrientedFlatCoordinates().slice(), Ft(
      e,
      0,
      this.endss_,
      this.stride,
      t
    )) : e = this.flatCoordinates, Qn(
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
      const t = We(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride
      );
      this.flatInteriorPoints_ = ke(
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
    return new yt(this.getFlatInteriorPoints().slice(), "XYM");
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates;
      $e(t, 0, this.endss_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = Ft(
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
    return e.length = li(
      this.flatCoordinates,
      0,
      this.endss_,
      this.stride,
      Math.sqrt(t),
      e,
      0,
      n
    ), new ot(e, "XY", n);
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
      const r = this.endss_[t - 1];
      e = r[r.length - 1];
    }
    const n = this.endss_[t].slice(), s = n[n.length - 1];
    if (e !== 0)
      for (let r = 0, o = n.length; r < o; ++r)
        n[r] -= e;
    return new k(
      this.flatCoordinates.slice(e, s),
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
    const t = this.layout, e = this.flatCoordinates, n = this.endss_, s = [];
    let r = 0;
    for (let o = 0, l = n.length; o < l; ++o) {
      const h = n[o].slice(), a = h[h.length - 1];
      if (r !== 0)
        for (let c = 0, g = h.length; c < g; ++c)
          h[c] -= r;
      const u = new k(
        e.slice(r, a),
        t,
        h
      );
      s.push(u), r = a;
    }
    return s;
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
    return ri(
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
    const n = je(
      this.flatCoordinates,
      0,
      t,
      this.stride,
      this.endss_
    );
    if (n.length === 0)
      this.flatCoordinates.length = 0;
    else {
      const s = n[n.length - 1];
      this.flatCoordinates.length = s.length === 0 ? 0 : s[s.length - 1];
    }
    this.changed();
  }
}
const de = Ne();
class N {
  /**
   * @param {Type} type Geometry type.
   * @param {Array<number>} flatCoordinates Flat coordinates. These always need
   *     to be right-handed for polygons.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Object<string, *>} properties Properties.
   * @param {number|string|undefined} id Feature id.
   */
  constructor(t, e, n, s, r, o) {
    this.styleFunction, this.extent_, this.id_ = o, this.type_ = t, this.flatCoordinates_ = e, this.flatInteriorPoints_ = null, this.flatMidpoints_ = null, this.ends_ = n || null, this.properties_ = r, this.squaredTolerance_, this.stride_ = s, this.simplifiedGeometry_;
  }
  /**
   * Get a feature property by its key.
   * @param {string} key Key
   * @return {*} Value for the requested key.
   * @api
   */
  get(t) {
    return this.properties_[t];
  }
  /**
   * Get the extent of this feature's geometry.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_ || (this.extent_ = this.type_ === "Point" ? me(this.flatCoordinates_) : Tt(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      this.stride_
    )), this.extent_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoint() {
    if (!this.flatInteriorPoints_) {
      const t = ht(this.getExtent());
      this.flatInteriorPoints_ = Wt(
        this.flatCoordinates_,
        0,
        this.ends_,
        this.stride_,
        t,
        0
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (!this.flatInteriorPoints_) {
      const t = ui(this.flatCoordinates_, this.ends_), e = We(
        this.flatCoordinates_,
        0,
        t,
        this.stride_
      );
      this.flatInteriorPoints_ = ke(
        this.flatCoordinates_,
        0,
        t,
        this.stride_,
        e
      );
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    return this.flatMidpoints_ || (this.flatMidpoints_ = it(
      this.flatCoordinates_,
      0,
      this.flatCoordinates_.length,
      this.stride_,
      0.5
    )), this.flatMidpoints_;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = [];
      const t = this.flatCoordinates_;
      let e = 0;
      const n = (
        /** @type {Array<number>} */
        this.ends_
      );
      for (let s = 0, r = n.length; s < r; ++s) {
        const o = n[s], l = it(
          t,
          e,
          o,
          this.stride_,
          0.5
        );
        F(this.flatMidpoints_, l), e = o;
      }
    }
    return this.flatMidpoints_;
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is set when reading data from a remote source.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getOrientedFlatCoordinates() {
    return this.flatCoordinates_;
  }
  /**
   * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
   * determining the geometry type in style function (see {@link #getType}).
   * @return {RenderFeature} Feature.
   * @api
   */
  getGeometry() {
    return this;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {RenderFeature} Simplified geometry.
   */
  getSimplifiedGeometry(t) {
    return this;
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {RenderFeature} Simplified geometry.
   */
  simplifyTransformed(t, e) {
    return this;
  }
  /**
   * Get the feature properties.
   * @return {Object<string, *>} Feature properties.
   * @api
   */
  getProperties() {
    return this.properties_;
  }
  /**
   * Get an object of all property names and values.  This has the same behavior as getProperties,
   * but is here to conform with the {@link module:ol/Feature~Feature} interface.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.properties_;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride_;
  }
  /**
   * @return {import('../style/Style.js').StyleFunction|undefined} Style
   */
  getStyleFunction() {
    return this.styleFunction;
  }
  /**
   * Get the type of this feature's geometry.
   * @return {Type} Geometry type.
   * @api
   */
  getType() {
    return this.type_;
  }
  /**
   * Transform geometry coordinates from tile pixel space to projected.
   *
   * @param {import("../proj.js").ProjectionLike} projection The data projection
   */
  transform(t) {
    t = G(t);
    const e = t.getExtent(), n = t.getWorldExtent();
    if (e && n) {
      const s = Q(n) / Q(e);
      Ae(
        de,
        n[0],
        n[3],
        s,
        -s,
        0,
        0,
        0
      ), Le(
        this.flatCoordinates_,
        0,
        this.flatCoordinates_.length,
        this.stride_,
        de,
        this.flatCoordinates_
      );
    }
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   */
  applyTransform(t) {
    t(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
  }
  /**
   * @return {RenderFeature} A cloned render feature.
   */
  clone() {
    var t;
    return new N(
      this.type_,
      this.flatCoordinates_.slice(),
      (t = this.ends_) == null ? void 0 : t.slice(),
      this.stride_,
      Object.assign({}, this.properties_),
      this.id_
    );
  }
  /**
   * @return {Array<number>|null} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Add transform and resolution based geometry simplification to this instance.
   * @return {RenderFeature} This render feature.
   */
  enableSimplifyTransformed() {
    return this.simplifyTransformed = Ge((t, e) => {
      if (t === this.squaredTolerance_)
        return this.simplifiedGeometry_;
      this.simplifiedGeometry_ = this.clone(), e && this.simplifiedGeometry_.applyTransform(e);
      const n = this.simplifiedGeometry_.getFlatCoordinates();
      let s;
      switch (this.type_) {
        case "LineString":
          n.length = dt(
            n,
            0,
            this.simplifiedGeometry_.flatCoordinates_.length,
            this.simplifiedGeometry_.stride_,
            t,
            n,
            0
          ), s = [n.length];
          break;
        case "MultiLineString":
          s = [], n.length = be(
            n,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            t,
            n,
            0,
            s
          );
          break;
        case "Polygon":
          s = [], n.length = $t(
            n,
            0,
            this.simplifiedGeometry_.ends_,
            this.simplifiedGeometry_.stride_,
            Math.sqrt(t),
            n,
            0,
            s
          );
          break;
      }
      return s && (this.simplifiedGeometry_ = new N(
        this.type_,
        n,
        s,
        this.stride_,
        this.properties_,
        this.id_
      )), this.squaredTolerance_ = t, this.simplifiedGeometry_;
    }), this;
  }
}
N.prototype.getFlatCoordinates = N.prototype.getOrientedFlatCoordinates;
class lt extends Oe {
  /**
   * @param {Array<Geometry>} geometries Geometries.
   */
  constructor(t) {
    super(), this.geometries_ = t, this.changeEventsKeys_ = [], this.listenGeometriesChange_();
  }
  /**
   * @private
   */
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(tt), this.changeEventsKeys_.length = 0;
  }
  /**
   * @private
   */
  listenGeometriesChange_() {
    const t = this.geometries_;
    for (let e = 0, n = t.length; e < n; ++e)
      this.changeEventsKeys_.push(
        W(t[e], St.CHANGE, this.changed, this)
      );
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!GeometryCollection} Clone.
   * @api
   * @override
   */
  clone() {
    const t = new lt(
      Ct(this.geometries_)
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
  closestPointXY(t, e, n, s) {
    if (s < A(this.getExtent(), t, e))
      return s;
    const r = this.geometries_;
    for (let o = 0, l = r.length; o < l; ++o)
      s = r[o].closestPointXY(
        t,
        e,
        n,
        s
      );
    return s;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(t, e) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s)
      if (n[s].containsXY(t, e))
        return !0;
    return !1;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(t) {
    It(t);
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      Je(t, e[n].getExtent());
    return t;
  }
  /**
   * Return the geometries that make up this geometry collection.
   * @return {Array<Geometry>} Geometries.
   * @api
   */
  getGeometries() {
    return Ct(this.geometries_);
  }
  /**
   * @return {Array<Geometry>} Geometries.
   */
  getGeometriesArray() {
    return this.geometries_;
  }
  /**
   * @return {Array<Geometry>} Geometries.
   */
  getGeometriesArrayRecursive() {
    let t = [];
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      e[n].getType() === this.getType() ? t = t.concat(
        /** @type {GeometryCollection} */
        e[n].getGeometriesArrayRecursive()
      ) : t.push(e[n]);
    return t;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {GeometryCollection} Simplified GeometryCollection.
   * @override
   */
  getSimplifiedGeometry(t) {
    if (this.simplifiedGeometryRevision !== this.getRevision() && (this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t < this.simplifiedGeometryMaxMinSquaredTolerance)
      return this;
    const e = [], n = this.geometries_;
    let s = !1;
    for (let r = 0, o = n.length; r < o; ++r) {
      const l = n[r], h = l.getSimplifiedGeometry(t);
      e.push(h), h !== l && (s = !0);
    }
    return s ? new lt(
      e
    ) : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "GeometryCollection";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(t) {
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      if (e[n].intersectsExtent(t))
        return !0;
    return !1;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.geometries_.length === 0;
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   * @override
   */
  rotate(t, e) {
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s)
      n[s].rotate(t, e);
    this.changed();
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
   * @override
   */
  scale(t, e, n) {
    n || (n = ht(this.getExtent()));
    const s = this.geometries_;
    for (let r = 0, o = s.length; r < o; ++r)
      s[r].scale(t, e, n);
    this.changed();
  }
  /**
   * Set the geometries that make up this geometry collection.
   * @param {Array<Geometry>} geometries Geometries.
   * @api
   */
  setGeometries(t) {
    this.setGeometriesArray(Ct(t));
  }
  /**
   * @param {Array<Geometry>} geometries Geometries.
   */
  setGeometriesArray(t) {
    this.unlistenGeometriesChange_(), this.geometries_ = t, this.listenGeometriesChange_(), this.changed();
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
    const e = this.geometries_;
    for (let n = 0, s = e.length; n < s; ++n)
      e[n].applyTransform(t);
    this.changed();
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
    const n = this.geometries_;
    for (let s = 0, r = n.length; s < r; ++s)
      n[s].translate(t, e);
    this.changed();
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.unlistenGeometriesChange_(), super.disposeInternal();
  }
}
function Ct(i) {
  return i.map((t) => t.clone());
}
class ci {
  constructor() {
    this.dataProjection = void 0, this.defaultFeatureProjection = void 0, this.featureClass = /** @type {FeatureToFeatureClass<FeatureType>} */
    xt, this.supportedMediaTypes = null;
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
      let n = e.dataProjection ? G(e.dataProjection) : this.readProjection(t);
      e.extent && n && n.getUnits() === "tile-pixels" && (n = G(n), n.setWorldExtent(e.extent)), e = {
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
    return m();
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
    return m();
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
    return m();
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
    return m();
  }
  /**
   * Read the projection from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default|undefined} Projection.
   */
  readProjection(t) {
    return m();
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
    return m();
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
    return m();
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
    return m();
  }
}
function Ht(i, t, e) {
  const n = e ? G(e.featureProjection) : null, s = e ? G(e.dataProjection) : null;
  let r = i;
  if (n && s && !Dn(n, s)) {
    t && (r = /** @type {T} */
    i.clone());
    const o = t ? n : s, l = t ? s : n;
    o.getUnits() === "tile-pixels" ? r.transform(o, l) : r.applyTransform(Mt(o, l));
  }
  if (t && e && /** @type {WriteOptions} */
  e.decimals !== void 0) {
    const o = Math.pow(
      10,
      /** @type {WriteOptions} */
      e.decimals
    ), l = function(h) {
      for (let a = 0, u = h.length; a < u; ++a)
        h[a] = Math.round(h[a] * o) / o;
      return h;
    };
    r === i && (r = /** @type {T} */
    i.clone()), r.applyTransform(l);
  }
  return r;
}
const gi = {
  Point: D,
  LineString: U,
  Polygon: k,
  MultiPoint: yt,
  MultiLineString: st,
  MultiPolygon: ot
};
function fi(i, t, e) {
  return Array.isArray(t[0]) ? ($e(i, 0, t, e) || (i = i.slice(), Ft(i, 0, t, e)), i) : (Bt(i, 0, t, e) || (i = i.slice(), rt(i, 0, t, e)), i);
}
function Ke(i, t) {
  var r;
  const e = i.geometry;
  if (!e)
    return [];
  if (Array.isArray(e))
    return e.map((o) => Ke({ ...i, geometry: o })).flat();
  const n = e.type === "MultiPolygon" ? "Polygon" : e.type;
  if (n === "GeometryCollection" || n === "Circle")
    throw new Error("Unsupported geometry type: " + n);
  const s = e.layout.length;
  return Ht(
    new N(
      n,
      n === "Polygon" ? fi(e.flatCoordinates, e.ends, s) : e.flatCoordinates,
      (r = e.ends) == null ? void 0 : r.flat(),
      s,
      i.properties || {},
      i.id
    ).enableSimplifyTransformed(),
    !1,
    t
  );
}
function Jt(i, t) {
  if (!i)
    return null;
  if (Array.isArray(i)) {
    const n = i.map(
      (s) => Jt(s, t)
    );
    return new lt(n);
  }
  const e = gi[i.type];
  return Ht(
    new e(i.flatCoordinates, i.layout || "XY", i.ends),
    !1,
    t
  );
}
class di extends ci {
  constructor() {
    super();
  }
  /**
   * @return {import("./Feature.js").Type} Format.
   * @override
   */
  getType() {
    return "json";
  }
  /**
   * Read a feature.  Only works for a single feature. Use `readFeatures` to
   * read a feature collection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {FeatureType|Array<FeatureType>} Feature.
   * @api
   * @override
   */
  readFeature(t, e) {
    return this.readFeatureFromObject(
      V(t),
      this.getReadOptions(t, e)
    );
  }
  /**
   * Read all features.  Works with both a single feature and a feature
   * collection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {Array<FeatureType>} Features.
   * @api
   * @override
   */
  readFeatures(t, e) {
    return this.readFeaturesFromObject(
      V(t),
      this.getReadOptions(t, e)
    );
  }
  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {FeatureType|Array<FeatureType>} Feature.
   */
  readFeatureFromObject(t, e) {
    return m();
  }
  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {Array<FeatureType>} Features.
   */
  readFeaturesFromObject(t, e) {
    return m();
  }
  /**
   * Read a geometry.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   * @api
   * @override
   */
  readGeometry(t, e) {
    return this.readGeometryFromObject(
      V(t),
      this.getReadOptions(t, e)
    );
  }
  /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */
  readGeometryFromObject(t, e) {
    return m();
  }
  /**
   * Read the projection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   * @override
   */
  readProjection(t) {
    return this.readProjectionFromObject(V(t));
  }
  /**
   * @abstract
   * @param {Object} object Object.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */
  readProjectionFromObject(t) {
    return m();
  }
  /**
   * Encode a feature as string.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded feature.
   * @api
   * @override
   */
  writeFeature(t, e) {
    return JSON.stringify(this.writeFeatureObject(t, e));
  }
  /**
   * @abstract
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {Object} Object.
   */
  writeFeatureObject(t, e) {
    return m();
  }
  /**
   * Encode an array of features as string.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded features.
   * @api
   * @override
   */
  writeFeatures(t, e) {
    return JSON.stringify(this.writeFeaturesObject(t, e));
  }
  /**
   * @abstract
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {Object} Object.
   */
  writeFeaturesObject(t, e) {
    return m();
  }
  /**
   * Encode a geometry as string.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded geometry.
   * @api
   * @override
   */
  writeGeometry(t, e) {
    return JSON.stringify(this.writeGeometryObject(t, e));
  }
  /**
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {Object} Object.
   */
  writeGeometryObject(t, e) {
    return m();
  }
}
function V(i) {
  if (typeof i == "string") {
    const t = JSON.parse(i);
    return t || null;
  }
  return i !== null ? i : null;
}
class Si extends di {
  /**
   * @param {Options<FeatureType>} [options] Options.
   */
  constructor(t) {
    t = t || {}, super(), this.dataProjection = G(
      t.dataProjection ? t.dataProjection : "EPSG:4326"
    ), t.featureProjection && (this.defaultFeatureProjection = G(t.featureProjection)), t.featureClass && (this.featureClass = t.featureClass), this.geometryName_ = t.geometryName, this.extractGeometryName_ = t.extractGeometryName, this.supportedMediaTypes = [
      "application/geo+json",
      "application/vnd.geo+json"
    ];
  }
  /**
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {FeatureType|Array<FeatureType>} Feature.
   * @override
   */
  readFeatureFromObject(t, e) {
    let n = null;
    t.type === "Feature" ? n = /** @type {GeoJSONFeature} */
    t : n = {
      type: "Feature",
      geometry: (
        /** @type {GeoJSONGeometry} */
        t
      ),
      properties: null
    };
    const s = qt(n.geometry);
    if (this.featureClass === N)
      return (
        /** @type {FeatureType|Array<FeatureType>} */
        Ke(
          {
            geometry: s,
            id: n.id,
            properties: n.properties
          },
          e
        )
      );
    const r = (
      /** @type {typeof import("../Feature.js").default} */
      this.featureClass
    ), o = new r();
    return this.geometryName_ ? o.setGeometryName(this.geometryName_) : this.extractGeometryName_ && n.geometry_name && o.setGeometryName(n.geometry_name), o.setGeometry(Jt(s, e)), "id" in n && o.setId(n.id), n.properties && o.setProperties(n.properties, !0), /** @type {FeatureType|Array<FeatureType>} */
    o;
  }
  /**
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {Array<FeatureType>} Features.
   * @override
   */
  readFeaturesFromObject(t, e) {
    const n = (
      /** @type {GeoJSONObject} */
      t
    );
    let s = null;
    if (n.type === "FeatureCollection") {
      const r = (
        /** @type {GeoJSONFeatureCollection} */
        t
      );
      s = [];
      const o = r.features;
      for (let l = 0, h = o.length; l < h; ++l) {
        const a = this.readFeatureFromObject(
          o[l],
          e
        );
        a && s.push(a);
      }
    } else
      s = [this.readFeatureFromObject(t, e)];
    return (
      /** @type {Array<FeatureType>} */
      s.flat()
    );
  }
  /**
   * @param {GeoJSONGeometry} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   * @override
   */
  readGeometryFromObject(t, e) {
    return yi(t, e);
  }
  /**
   * @param {Object} object Object.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   * @override
   */
  readProjectionFromObject(t) {
    const e = t.crs;
    let n;
    if (e)
      if (e.type == "name")
        n = G(e.properties.name);
      else if (e.type === "EPSG")
        n = G("EPSG:" + e.properties.code);
      else
        throw new Error("Unknown SRS type");
    else
      n = this.dataProjection;
    return (
      /** @type {import("../proj/Projection.js").default} */
      n
    );
  }
  /**
   * Encode a feature as a GeoJSON Feature object.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {GeoJSONFeature} Object.
   * @api
   * @override
   */
  writeFeatureObject(t, e) {
    e = this.adaptOptions(e);
    const n = {
      type: "Feature",
      geometry: null,
      properties: null
    }, s = t.getId();
    if (s !== void 0 && (n.id = s), !t.hasProperties())
      return n;
    const r = t.getProperties(), o = t.getGeometry();
    return o && (n.geometry = Rt(o, e), delete r[t.getGeometryName()]), Ee(r) || (n.properties = r), n;
  }
  /**
   * Encode an array of features as a GeoJSON object.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {GeoJSONFeatureCollection} GeoJSON Object.
   * @api
   * @override
   */
  writeFeaturesObject(t, e) {
    e = this.adaptOptions(e);
    const n = [];
    for (let s = 0, r = t.length; s < r; ++s)
      n.push(this.writeFeatureObject(t[s], e));
    return {
      type: "FeatureCollection",
      features: n
    };
  }
  /**
   * Encode a geometry as a GeoJSON object.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {GeoJSONGeometry|GeoJSONGeometryCollection} Object.
   * @api
   * @override
   */
  writeGeometryObject(t, e) {
    return Rt(t, this.adaptOptions(e));
  }
}
function qt(i, t) {
  if (!i)
    return null;
  let e;
  switch (i.type) {
    case "Point": {
      e = mi(
        /** @type {GeoJSONPoint} */
        i
      );
      break;
    }
    case "LineString": {
      e = pi(
        /** @type {GeoJSONLineString} */
        i
      );
      break;
    }
    case "Polygon": {
      e = Gi(
        /** @type {GeoJSONPolygon} */
        i
      );
      break;
    }
    case "MultiPoint": {
      e = Ei(
        /** @type {GeoJSONMultiPoint} */
        i
      );
      break;
    }
    case "MultiLineString": {
      e = Ci(
        /** @type {GeoJSONMultiLineString} */
        i
      );
      break;
    }
    case "MultiPolygon": {
      e = Pi(
        /** @type {GeoJSONMultiPolygon} */
        i
      );
      break;
    }
    case "GeometryCollection": {
      e = _i(
        /** @type {GeoJSONGeometryCollection} */
        i
      );
      break;
    }
    default:
      throw new Error("Unsupported GeoJSON type: " + i.type);
  }
  return e;
}
function yi(i, t) {
  const e = qt(i);
  return Jt(e, t);
}
function _i(i, t) {
  return i.geometries.map(
    /**
     * @param {GeoJSONGeometry} geometry Geometry.
     * @return {import("./Feature.js").GeometryObject} geometry Geometry.
     */
    function(n) {
      return qt(n);
    }
  );
}
function mi(i) {
  const t = i.coordinates;
  return {
    type: "Point",
    flatCoordinates: t,
    layout: O(t.length)
  };
}
function pi(i) {
  var n;
  const t = i.coordinates, e = t.flat();
  return {
    type: "LineString",
    flatCoordinates: e,
    ends: [e.length],
    layout: O(((n = t[0]) == null ? void 0 : n.length) || 2)
  };
}
function Ci(i) {
  var r, o;
  const t = i.coordinates, e = ((o = (r = t[0]) == null ? void 0 : r[0]) == null ? void 0 : o.length) || 2, n = [], s = J(n, 0, t, e);
  return {
    type: "MultiLineString",
    flatCoordinates: n,
    ends: s,
    layout: O(e)
  };
}
function Ei(i) {
  var e;
  const t = i.coordinates;
  return {
    type: "MultiPoint",
    flatCoordinates: t.flat(),
    layout: O(((e = t[0]) == null ? void 0 : e.length) || 2)
  };
}
function Pi(i) {
  var r, o;
  const t = i.coordinates, e = [], n = ((o = (r = t[0]) == null ? void 0 : r[0]) == null ? void 0 : o[0].length) || 2, s = je(
    e,
    0,
    t,
    n
  );
  return {
    type: "MultiPolygon",
    flatCoordinates: e,
    ends: s,
    layout: O(n)
  };
}
function Gi(i) {
  var r, o;
  const t = i.coordinates, e = [], n = (o = (r = t[0]) == null ? void 0 : r[0]) == null ? void 0 : o.length, s = J(e, 0, t, n);
  return {
    type: "Polygon",
    flatCoordinates: e,
    ends: s,
    layout: O(n)
  };
}
function Rt(i, t) {
  i = Ht(i, !0, t);
  const e = i.getType();
  let n;
  switch (e) {
    case "Point": {
      n = Ii(
        /** @type {import("../geom/Point.js").default} */
        i
      );
      break;
    }
    case "LineString": {
      n = vi(
        /** @type {import("../geom/LineString.js").default} */
        i
      );
      break;
    }
    case "Polygon": {
      n = Ti(
        /** @type {import("../geom/Polygon.js").default} */
        i,
        t
      );
      break;
    }
    case "MultiPoint": {
      n = Ri(
        /** @type {import("../geom/MultiPoint.js").default} */
        i
      );
      break;
    }
    case "MultiLineString": {
      n = Fi(
        /** @type {import("../geom/MultiLineString.js").default} */
        i
      );
      break;
    }
    case "MultiPolygon": {
      n = wi(
        /** @type {import("../geom/MultiPolygon.js").default} */
        i,
        t
      );
      break;
    }
    case "GeometryCollection": {
      n = Mi(
        /** @type {import("../geom/GeometryCollection.js").default} */
        i,
        t
      );
      break;
    }
    case "Circle": {
      n = {
        type: "GeometryCollection",
        geometries: []
      };
      break;
    }
    default:
      throw new Error("Unsupported geometry type: " + e);
  }
  return n;
}
function Mi(i, t) {
  return t = Object.assign({}, t), delete t.featureProjection, {
    type: "GeometryCollection",
    geometries: i.getGeometriesArray().map(function(n) {
      return Rt(n, t);
    })
  };
}
function vi(i, t) {
  return {
    type: "LineString",
    coordinates: i.getCoordinates()
  };
}
function Fi(i, t) {
  return {
    type: "MultiLineString",
    coordinates: i.getCoordinates()
  };
}
function Ri(i, t) {
  return {
    type: "MultiPoint",
    coordinates: i.getCoordinates()
  };
}
function wi(i, t) {
  let e;
  return t && (e = t.rightHanded), {
    type: "MultiPolygon",
    coordinates: i.getCoordinates(e)
  };
}
function Ii(i, t) {
  return {
    type: "Point",
    coordinates: i.getCoordinates()
  };
}
function Ti(i, t) {
  let e;
  return t && (e = t.rightHanded), {
    type: "Polygon",
    coordinates: i.getCoordinates(e)
  };
}
export {
  Si as default
};
