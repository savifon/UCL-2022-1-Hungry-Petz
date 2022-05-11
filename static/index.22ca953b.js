const ba = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerpolicy && (o.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
};
ba();
function Cs(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const _a =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  wa = Cs(_a);
function xi(e) {
  return !!e || e === "";
}
function xs(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = ve(r) ? xa(r) : xs(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (ve(e)) return e;
    if (be(e)) return e;
  }
}
const Ea = /;(?![^(]*\))/g,
  Ca = /:(.+)/;
function xa(e) {
  const t = {};
  return (
    e.split(Ea).forEach((n) => {
      if (n) {
        const r = n.split(Ca);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }),
    t
  );
}
function cr(e) {
  let t = "";
  if (ve(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const r = cr(e[n]);
      r && (t += r + " ");
    }
  else if (be(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const yt = (e) =>
    ve(e)
      ? e
      : e == null
      ? ""
      : D(e) || (be(e) && (e.toString === Ti || !K(e.toString)))
      ? JSON.stringify(e, Ai, 2)
      : String(e),
  Ai = (e, t) =>
    t && t.__v_isRef
      ? Ai(e, t.value)
      : Qt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : Ri(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : be(t) && !D(t) && !Pi(t)
      ? String(t)
      : t,
  fe = {},
  Xt = [],
  Ue = () => {},
  Aa = () => !1,
  Ra = /^on[^a-z]/,
  ar = (e) => Ra.test(e),
  As = (e) => e.startsWith("onUpdate:"),
  xe = Object.assign,
  Rs = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Sa = Object.prototype.hasOwnProperty,
  G = (e, t) => Sa.call(e, t),
  D = Array.isArray,
  Qt = (e) => lr(e) === "[object Map]",
  Ri = (e) => lr(e) === "[object Set]",
  K = (e) => typeof e == "function",
  ve = (e) => typeof e == "string",
  Ss = (e) => typeof e == "symbol",
  be = (e) => e !== null && typeof e == "object",
  Si = (e) => be(e) && K(e.then) && K(e.catch),
  Ti = Object.prototype.toString,
  lr = (e) => Ti.call(e),
  Ta = (e) => lr(e).slice(8, -1),
  Pi = (e) => lr(e) === "[object Object]",
  Ts = (e) =>
    ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Kn = Cs(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  ur = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Pa = /-(\w)/g,
  Xe = ur((e) => e.replace(Pa, (t, n) => (n ? n.toUpperCase() : ""))),
  Oa = /\B([A-Z])/g,
  on = ur((e) => e.replace(Oa, "-$1").toLowerCase()),
  fr = ur((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  kr = ur((e) => (e ? `on${fr(e)}` : "")),
  Tn = (e, t) => !Object.is(e, t),
  Nr = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Zn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Oi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let ho;
const ka = () =>
  ho ||
  (ho =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let nt;
class ki {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        nt &&
        ((this.parent = nt),
        (this.index = (nt.scopes || (nt.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active)
      try {
        return (nt = this), t();
      } finally {
        nt = this.parent;
      }
  }
  on() {
    nt = this;
  }
  off() {
    nt = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      this.active = !1;
    }
  }
}
function Ni(e) {
  return new ki(e);
}
function Na(e, t = nt) {
  t && t.active && t.effects.push(e);
}
const Ps = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Ii = (e) => (e.w & Ct) > 0,
  Bi = (e) => (e.n & Ct) > 0,
  Ia = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ct;
  },
  Ba = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        Ii(s) && !Bi(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Ct),
          (s.n &= ~Ct);
      }
      t.length = n;
    }
  },
  Vr = new WeakMap();
let gn = 0,
  Ct = 1;
const zr = 30;
let We;
const It = Symbol(""),
  Wr = Symbol("");
class Os {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Na(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = We,
      n = _t;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = We),
        (We = this),
        (_t = !0),
        (Ct = 1 << ++gn),
        gn <= zr ? Ia(this) : po(this),
        this.fn()
      );
    } finally {
      gn <= zr && Ba(this),
        (Ct = 1 << --gn),
        (We = this.parent),
        (_t = n),
        (this.parent = void 0);
    }
  }
  stop() {
    this.active && (po(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function po(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let _t = !0;
const Li = [];
function cn() {
  Li.push(_t), (_t = !1);
}
function an() {
  const e = Li.pop();
  _t = e === void 0 ? !0 : e;
}
function Be(e, t, n) {
  if (_t && We) {
    let r = Vr.get(e);
    r || Vr.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = Ps())), $i(s);
  }
}
function $i(e, t) {
  let n = !1;
  gn <= zr ? Bi(e) || ((e.n |= Ct), (n = !Ii(e))) : (n = !e.has(We)),
    n && (e.add(We), We.deps.push(e));
}
function ot(e, t, n, r, s, o) {
  const i = Vr.get(e);
  if (!i) return;
  let c = [];
  if (t === "clear") c = [...i.values()];
  else if (n === "length" && D(e))
    i.forEach((a, u) => {
      (u === "length" || u >= r) && c.push(a);
    });
  else
    switch ((n !== void 0 && c.push(i.get(n)), t)) {
      case "add":
        D(e)
          ? Ts(n) && c.push(i.get("length"))
          : (c.push(i.get(It)), Qt(e) && c.push(i.get(Wr)));
        break;
      case "delete":
        D(e) || (c.push(i.get(It)), Qt(e) && c.push(i.get(Wr)));
        break;
      case "set":
        Qt(e) && c.push(i.get(It));
        break;
    }
  if (c.length === 1) c[0] && Jr(c[0]);
  else {
    const a = [];
    for (const u of c) u && a.push(...u);
    Jr(Ps(a));
  }
}
function Jr(e, t) {
  for (const n of D(e) ? e : [...e])
    (n !== We || n.allowRecurse) && (n.scheduler ? n.scheduler() : n.run());
}
const La = Cs("__proto__,__v_isRef,__isVue"),
  Mi = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(Ss)
  ),
  $a = ks(),
  Ma = ks(!1, !0),
  Fa = ks(!0),
  mo = ja();
function ja() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = ee(this);
        for (let o = 0, i = this.length; o < i; o++) Be(r, "get", o + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(ee)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        cn();
        const r = ee(this)[t].apply(this, n);
        return an(), r;
      };
    }),
    e
  );
}
function ks(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && o === (e ? (t ? tl : Hi) : t ? Ui : Di).get(r))
      return r;
    const i = D(r);
    if (!e && i && G(mo, s)) return Reflect.get(mo, s, o);
    const c = Reflect.get(r, s, o);
    return (Ss(s) ? Mi.has(s) : La(s)) || (e || Be(r, "get", s), t)
      ? c
      : ye(c)
      ? !i || !Ts(s)
        ? c.value
        : c
      : be(c)
      ? e
        ? qi(c)
        : At(c)
      : c;
  };
}
const Da = Fi(),
  Ua = Fi(!0);
function Fi(e = !1) {
  return function (n, r, s, o) {
    let i = n[r];
    if (Pn(i) && ye(i) && !ye(s)) return !1;
    if (
      !e &&
      !Pn(s) &&
      (Ki(s) || ((s = ee(s)), (i = ee(i))), !D(n) && ye(i) && !ye(s))
    )
      return (i.value = s), !0;
    const c = D(n) && Ts(r) ? Number(r) < n.length : G(n, r),
      a = Reflect.set(n, r, s, o);
    return (
      n === ee(o) && (c ? Tn(s, i) && ot(n, "set", r, s) : ot(n, "add", r, s)),
      a
    );
  };
}
function Ha(e, t) {
  const n = G(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && ot(e, "delete", t, void 0), r;
}
function qa(e, t) {
  const n = Reflect.has(e, t);
  return (!Ss(t) || !Mi.has(t)) && Be(e, "has", t), n;
}
function Ka(e) {
  return Be(e, "iterate", D(e) ? "length" : It), Reflect.ownKeys(e);
}
const ji = { get: $a, set: Da, deleteProperty: Ha, has: qa, ownKeys: Ka },
  Va = {
    get: Fa,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  za = xe({}, ji, { get: Ma, set: Ua }),
  Ns = (e) => e,
  hr = (e) => Reflect.getPrototypeOf(e);
function Ln(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = ee(e),
    o = ee(t);
  t !== o && !n && Be(s, "get", t), !n && Be(s, "get", o);
  const { has: i } = hr(s),
    c = r ? Ns : n ? Ls : On;
  if (i.call(s, t)) return c(e.get(t));
  if (i.call(s, o)) return c(e.get(o));
  e !== s && e.get(t);
}
function $n(e, t = !1) {
  const n = this.__v_raw,
    r = ee(n),
    s = ee(e);
  return (
    e !== s && !t && Be(r, "has", e),
    !t && Be(r, "has", s),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Mn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Be(ee(e), "iterate", It), Reflect.get(e, "size", e)
  );
}
function go(e) {
  e = ee(e);
  const t = ee(this);
  return hr(t).has.call(t, e) || (t.add(e), ot(t, "add", e, e)), this;
}
function yo(e, t) {
  t = ee(t);
  const n = ee(this),
    { has: r, get: s } = hr(n);
  let o = r.call(n, e);
  o || ((e = ee(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? Tn(t, i) && ot(n, "set", e, t) : ot(n, "add", e, t), this
  );
}
function vo(e) {
  const t = ee(this),
    { has: n, get: r } = hr(t);
  let s = n.call(t, e);
  s || ((e = ee(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && ot(t, "delete", e, void 0), o;
}
function bo() {
  const e = ee(this),
    t = e.size !== 0,
    n = e.clear();
  return t && ot(e, "clear", void 0, void 0), n;
}
function Fn(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      c = ee(i),
      a = t ? Ns : e ? Ls : On;
    return (
      !e && Be(c, "iterate", It), i.forEach((u, l) => r.call(s, a(u), a(l), o))
    );
  };
}
function jn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = ee(s),
      i = Qt(o),
      c = e === "entries" || (e === Symbol.iterator && i),
      a = e === "keys" && i,
      u = s[e](...r),
      l = n ? Ns : t ? Ls : On;
    return (
      !t && Be(o, "iterate", a ? Wr : It),
      {
        next() {
          const { value: f, done: d } = u.next();
          return d
            ? { value: f, done: d }
            : { value: c ? [l(f[0]), l(f[1])] : l(f), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function ct(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Wa() {
  const e = {
      get(o) {
        return Ln(this, o);
      },
      get size() {
        return Mn(this);
      },
      has: $n,
      add: go,
      set: yo,
      delete: vo,
      clear: bo,
      forEach: Fn(!1, !1),
    },
    t = {
      get(o) {
        return Ln(this, o, !1, !0);
      },
      get size() {
        return Mn(this);
      },
      has: $n,
      add: go,
      set: yo,
      delete: vo,
      clear: bo,
      forEach: Fn(!1, !0),
    },
    n = {
      get(o) {
        return Ln(this, o, !0);
      },
      get size() {
        return Mn(this, !0);
      },
      has(o) {
        return $n.call(this, o, !0);
      },
      add: ct("add"),
      set: ct("set"),
      delete: ct("delete"),
      clear: ct("clear"),
      forEach: Fn(!0, !1),
    },
    r = {
      get(o) {
        return Ln(this, o, !0, !0);
      },
      get size() {
        return Mn(this, !0);
      },
      has(o) {
        return $n.call(this, o, !0);
      },
      add: ct("add"),
      set: ct("set"),
      delete: ct("delete"),
      clear: ct("clear"),
      forEach: Fn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = jn(o, !1, !1)),
        (n[o] = jn(o, !0, !1)),
        (t[o] = jn(o, !1, !0)),
        (r[o] = jn(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Ja, Ya, Xa, Qa] = Wa();
function Is(e, t) {
  const n = t ? (e ? Qa : Xa) : e ? Ya : Ja;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(G(n, s) && s in r ? n : r, s, o);
}
const Za = { get: Is(!1, !1) },
  Ga = { get: Is(!1, !0) },
  el = { get: Is(!0, !1) },
  Di = new WeakMap(),
  Ui = new WeakMap(),
  Hi = new WeakMap(),
  tl = new WeakMap();
function nl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function rl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : nl(Ta(e));
}
function At(e) {
  return Pn(e) ? e : Bs(e, !1, ji, Za, Di);
}
function sl(e) {
  return Bs(e, !1, za, Ga, Ui);
}
function qi(e) {
  return Bs(e, !0, Va, el, Hi);
}
function Bs(e, t, n, r, s) {
  if (!be(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = rl(e);
  if (i === 0) return e;
  const c = new Proxy(e, i === 2 ? r : n);
  return s.set(e, c), c;
}
function wt(e) {
  return Pn(e) ? wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Pn(e) {
  return !!(e && e.__v_isReadonly);
}
function Ki(e) {
  return !!(e && e.__v_isShallow);
}
function Vi(e) {
  return wt(e) || Pn(e);
}
function ee(e) {
  const t = e && e.__v_raw;
  return t ? ee(t) : e;
}
function Gt(e) {
  return Zn(e, "__v_skip", !0), e;
}
const On = (e) => (be(e) ? At(e) : e),
  Ls = (e) => (be(e) ? qi(e) : e);
function zi(e) {
  _t && We && ((e = ee(e)), $i(e.dep || (e.dep = Ps())));
}
function Wi(e, t) {
  (e = ee(e)), e.dep && Jr(e.dep);
}
function ye(e) {
  return !!(e && e.__v_isRef === !0);
}
function dr(e) {
  return Ji(e, !1);
}
function ol(e) {
  return Ji(e, !0);
}
function Ji(e, t) {
  return ye(e) ? e : new il(e, t);
}
class il {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ee(t)),
      (this._value = n ? t : On(t));
  }
  get value() {
    return zi(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : ee(t)),
      Tn(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : On(t)),
        Wi(this));
  }
}
function J(e) {
  return ye(e) ? e.value : e;
}
const cl = {
  get: (e, t, n) => J(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ye(s) && !ye(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Yi(e) {
  return wt(e) ? e : new Proxy(e, cl);
}
function al(e) {
  const t = D(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = ul(e, n);
  return t;
}
class ll {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function ul(e, t, n) {
  const r = e[t];
  return ye(r) ? r : new ll(e, t, n);
}
class fl {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new Os(t, () => {
        this._dirty || ((this._dirty = !0), Wi(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = ee(this);
    return (
      zi(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function hl(e, t, n = !1) {
  let r, s;
  const o = K(e);
  return (
    o ? ((r = e), (s = Ue)) : ((r = e.get), (s = e.set)),
    new fl(r, s, o || !s, n)
  );
}
Promise.resolve();
function Et(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    pr(o, t, n);
  }
  return s;
}
function Me(e, t, n, r) {
  if (K(e)) {
    const o = Et(e, t, n, r);
    return (
      o &&
        Si(o) &&
        o.catch((i) => {
          pr(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(Me(e[o], t, n, r));
  return s;
}
function pr(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      c = n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let l = 0; l < u.length; l++) if (u[l](e, i, c) === !1) return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Et(a, null, 10, [e, i, c]);
      return;
    }
  }
  dl(e, n, s, r);
}
function dl(e, t, n, r = !0) {
  console.error(e);
}
let Gn = !1,
  Yr = !1;
const Ie = [];
let st = 0;
const bn = [];
let yn = null,
  Vt = 0;
const _n = [];
let ht = null,
  zt = 0;
const Xi = Promise.resolve();
let $s = null,
  Xr = null;
function Ms(e) {
  const t = $s || Xi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function pl(e) {
  let t = st + 1,
    n = Ie.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    kn(Ie[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Qi(e) {
  (!Ie.length || !Ie.includes(e, Gn && e.allowRecurse ? st + 1 : st)) &&
    e !== Xr &&
    (e.id == null ? Ie.push(e) : Ie.splice(pl(e.id), 0, e), Zi());
}
function Zi() {
  !Gn && !Yr && ((Yr = !0), ($s = Xi.then(tc)));
}
function ml(e) {
  const t = Ie.indexOf(e);
  t > st && Ie.splice(t, 1);
}
function Gi(e, t, n, r) {
  D(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e),
    Zi();
}
function gl(e) {
  Gi(e, yn, bn, Vt);
}
function yl(e) {
  Gi(e, ht, _n, zt);
}
function Fs(e, t = null) {
  if (bn.length) {
    for (
      Xr = t, yn = [...new Set(bn)], bn.length = 0, Vt = 0;
      Vt < yn.length;
      Vt++
    )
      yn[Vt]();
    (yn = null), (Vt = 0), (Xr = null), Fs(e, t);
  }
}
function ec(e) {
  if (_n.length) {
    const t = [...new Set(_n)];
    if (((_n.length = 0), ht)) {
      ht.push(...t);
      return;
    }
    for (ht = t, ht.sort((n, r) => kn(n) - kn(r)), zt = 0; zt < ht.length; zt++)
      ht[zt]();
    (ht = null), (zt = 0);
  }
}
const kn = (e) => (e.id == null ? 1 / 0 : e.id);
function tc(e) {
  (Yr = !1), (Gn = !0), Fs(e), Ie.sort((n, r) => kn(n) - kn(r));
  const t = Ue;
  try {
    for (st = 0; st < Ie.length; st++) {
      const n = Ie[st];
      n && n.active !== !1 && Et(n, null, 14);
    }
  } finally {
    (st = 0),
      (Ie.length = 0),
      ec(),
      (Gn = !1),
      ($s = null),
      (Ie.length || bn.length || _n.length) && tc(e);
  }
}
function vl(e, t, ...n) {
  const r = e.vnode.props || fe;
  let s = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in r) {
    const l = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: f, trim: d } = r[l] || fe;
    d ? (s = n.map((g) => g.trim())) : f && (s = n.map(Oi));
  }
  let c,
    a = r[(c = kr(t))] || r[(c = kr(Xe(t)))];
  !a && o && (a = r[(c = kr(on(t)))]), a && Me(a, e, 6, s);
  const u = r[c + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    (e.emitted[c] = !0), Me(u, e, 6, s);
  }
}
function nc(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    c = !1;
  if (!K(e)) {
    const a = (u) => {
      const l = nc(u, t, !0);
      l && ((c = !0), xe(i, l));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !o && !c
    ? (r.set(e, null), null)
    : (D(o) ? o.forEach((a) => (i[a] = null)) : xe(i, o), r.set(e, i), i);
}
function js(e, t) {
  return !e || !ar(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      G(e, t[0].toLowerCase() + t.slice(1)) || G(e, on(t)) || G(e, t));
}
let De = null,
  mr = null;
function er(e) {
  const t = De;
  return (De = e), (mr = (e && e.type.__scopeId) || null), t;
}
function gr(e) {
  mr = e;
}
function yr() {
  mr = null;
}
function Bt(e, t = De, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && ko(-1);
    const o = er(t),
      i = e(...s);
    return er(o), r._d && ko(1), i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Ir(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: c,
    attrs: a,
    emit: u,
    render: l,
    renderCache: f,
    data: d,
    setupState: g,
    ctx: w,
    inheritAttrs: O,
  } = e;
  let A, S;
  const I = er(e);
  try {
    if (n.shapeFlag & 4) {
      const $ = s || r;
      (A = ze(l.call($, $, f, o, g, d, w))), (S = a);
    } else {
      const $ = t;
      (A = ze(
        $.length > 1 ? $(o, { attrs: a, slots: c, emit: u }) : $(o, null)
      )),
        (S = t.props ? a : bl(a));
    }
  } catch ($) {
    (Cn.length = 0), pr($, e, 1), (A = me(Qe));
  }
  let H = A;
  if (S && O !== !1) {
    const $ = Object.keys(S),
      { shapeFlag: Y } = H;
    $.length && Y & 7 && (i && $.some(As) && (S = _l(S, i)), (H = en(H, S)));
  }
  return (
    n.dirs && (H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs),
    n.transition && (H.transition = n.transition),
    (A = H),
    er(I),
    A
  );
}
const bl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || ar(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  _l = (e, t) => {
    const n = {};
    for (const r in e) (!As(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function wl(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: c, patchFlag: a } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? _o(r, i, u) : !!i;
    if (a & 8) {
      const l = t.dynamicProps;
      for (let f = 0; f < l.length; f++) {
        const d = l[f];
        if (i[d] !== r[d] && !js(u, d)) return !0;
      }
    }
  } else
    return (s || c) && (!c || !c.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? _o(r, i, u)
        : !0
      : !!i;
  return !1;
}
function _o(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !js(n, o)) return !0;
  }
  return !1;
}
function El({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Cl = (e) => e.__isSuspense;
function xl(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : yl(e);
}
function Vn(e, t) {
  if (we) {
    let n = we.provides;
    const r = we.parent && we.parent.provides;
    r === n && (n = we.provides = Object.create(r)), (n[e] = t);
  }
}
function Je(e, t, n = !1) {
  const r = we || De;
  if (r) {
    const s =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && K(t) ? t.call(r.proxy) : t;
  }
}
const wo = {};
function wn(e, t, n) {
  return rc(e, t, n);
}
function rc(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = fe
) {
  const c = we;
  let a,
    u = !1,
    l = !1;
  if (
    (ye(e)
      ? ((a = () => e.value), (u = Ki(e)))
      : wt(e)
      ? ((a = () => e), (r = !0))
      : D(e)
      ? ((l = !0),
        (u = e.some(wt)),
        (a = () =>
          e.map((S) => {
            if (ye(S)) return S.value;
            if (wt(S)) return Yt(S);
            if (K(S)) return Et(S, c, 2);
          })))
      : K(e)
      ? t
        ? (a = () => Et(e, c, 2))
        : (a = () => {
            if (!(c && c.isUnmounted)) return f && f(), Me(e, c, 3, [d]);
          })
      : (a = Ue),
    t && r)
  ) {
    const S = a;
    a = () => Yt(S());
  }
  let f,
    d = (S) => {
      f = A.onStop = () => {
        Et(S, c, 4);
      };
    };
  if (Nn)
    return (d = Ue), t ? n && Me(t, c, 3, [a(), l ? [] : void 0, d]) : a(), Ue;
  let g = l ? [] : wo;
  const w = () => {
    if (!!A.active)
      if (t) {
        const S = A.run();
        (r || u || (l ? S.some((I, H) => Tn(I, g[H])) : Tn(S, g))) &&
          (f && f(), Me(t, c, 3, [S, g === wo ? void 0 : g, d]), (g = S));
      } else A.run();
  };
  w.allowRecurse = !!t;
  let O;
  s === "sync"
    ? (O = w)
    : s === "post"
    ? (O = () => Se(w, c && c.suspense))
    : (O = () => {
        !c || c.isMounted ? gl(w) : w();
      });
  const A = new Os(a, O);
  return (
    t
      ? n
        ? w()
        : (g = A.run())
      : s === "post"
      ? Se(A.run.bind(A), c && c.suspense)
      : A.run(),
    () => {
      A.stop(), c && c.scope && Rs(c.scope.effects, A);
    }
  );
}
function Al(e, t, n) {
  const r = this.proxy,
    s = ve(e) ? (e.includes(".") ? sc(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  K(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = we;
  tn(this);
  const c = rc(s, o.bind(r), n);
  return i ? tn(i) : $t(), c;
}
function sc(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function Yt(e, t) {
  if (!be(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ye(e))) Yt(e.value, t);
  else if (D(e)) for (let n = 0; n < e.length; n++) Yt(e[n], t);
  else if (Ri(e) || Qt(e))
    e.forEach((n) => {
      Yt(n, t);
    });
  else if (Pi(e)) for (const n in e) Yt(e[n], t);
  return e;
}
function Rl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Ds(() => {
      e.isMounted = !0;
    }),
    lc(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const $e = [Function, Array],
  Sl = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: $e,
      onEnter: $e,
      onAfterEnter: $e,
      onEnterCancelled: $e,
      onBeforeLeave: $e,
      onLeave: $e,
      onAfterLeave: $e,
      onLeaveCancelled: $e,
      onBeforeAppear: $e,
      onAppear: $e,
      onAfterAppear: $e,
      onAppearCancelled: $e,
    },
    setup(e, { slots: t }) {
      const n = zs(),
        r = Rl();
      let s;
      return () => {
        const o = t.default && cc(t.default(), !0);
        if (!o || !o.length) return;
        const i = ee(e),
          { mode: c } = i,
          a = o[0];
        if (r.isLeaving) return Br(a);
        const u = Eo(a);
        if (!u) return Br(a);
        const l = Qr(u, i, r, n);
        Zr(u, l);
        const f = n.subTree,
          d = f && Eo(f);
        let g = !1;
        const { getTransitionKey: w } = u.type;
        if (w) {
          const O = w();
          s === void 0 ? (s = O) : O !== s && ((s = O), (g = !0));
        }
        if (d && d.type !== Qe && (!kt(u, d) || g)) {
          const O = Qr(d, i, r, n);
          if ((Zr(d, O), c === "out-in"))
            return (
              (r.isLeaving = !0),
              (O.afterLeave = () => {
                (r.isLeaving = !1), n.update();
              }),
              Br(a)
            );
          c === "in-out" &&
            u.type !== Qe &&
            (O.delayLeave = (A, S, I) => {
              const H = ic(r, d);
              (H[String(d.key)] = d),
                (A._leaveCb = () => {
                  S(), (A._leaveCb = void 0), delete l.delayedLeave;
                }),
                (l.delayedLeave = I);
            });
        }
        return a;
      };
    },
  },
  oc = Sl;
function ic(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Qr(e, t, n, r) {
  const {
      appear: s,
      mode: o,
      persisted: i = !1,
      onBeforeEnter: c,
      onEnter: a,
      onAfterEnter: u,
      onEnterCancelled: l,
      onBeforeLeave: f,
      onLeave: d,
      onAfterLeave: g,
      onLeaveCancelled: w,
      onBeforeAppear: O,
      onAppear: A,
      onAfterAppear: S,
      onAppearCancelled: I,
    } = t,
    H = String(e.key),
    $ = ic(n, e),
    Y = (P, W) => {
      P && Me(P, r, 9, W);
    },
    j = {
      mode: o,
      persisted: i,
      beforeEnter(P) {
        let W = c;
        if (!n.isMounted)
          if (s) W = O || c;
          else return;
        P._leaveCb && P._leaveCb(!0);
        const V = $[H];
        V && kt(e, V) && V.el._leaveCb && V.el._leaveCb(), Y(W, [P]);
      },
      enter(P) {
        let W = a,
          V = u,
          ne = l;
        if (!n.isMounted)
          if (s) (W = A || a), (V = S || u), (ne = I || l);
          else return;
        let ae = !1;
        const B = (P._enterCb = (te) => {
          ae ||
            ((ae = !0),
            te ? Y(ne, [P]) : Y(V, [P]),
            j.delayedLeave && j.delayedLeave(),
            (P._enterCb = void 0));
        });
        W ? (W(P, B), W.length <= 1 && B()) : B();
      },
      leave(P, W) {
        const V = String(e.key);
        if ((P._enterCb && P._enterCb(!0), n.isUnmounting)) return W();
        Y(f, [P]);
        let ne = !1;
        const ae = (P._leaveCb = (B) => {
          ne ||
            ((ne = !0),
            W(),
            B ? Y(w, [P]) : Y(g, [P]),
            (P._leaveCb = void 0),
            $[V] === e && delete $[V]);
        });
        ($[V] = e), d ? (d(P, ae), d.length <= 1 && ae()) : ae();
      },
      clone(P) {
        return Qr(P, t, n, r);
      },
    };
  return j;
}
function Br(e) {
  if (vr(e)) return (e = en(e)), (e.children = null), e;
}
function Eo(e) {
  return vr(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Zr(e, t) {
  e.shapeFlag & 6 && e.component
    ? Zr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function cc(e, t = !1) {
  let n = [],
    r = 0;
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    o.type === Te
      ? (o.patchFlag & 128 && r++, (n = n.concat(cc(o.children, t))))
      : (t || o.type !== Qe) && n.push(o);
  }
  if (r > 1) for (let s = 0; s < n.length; s++) n[s].patchFlag = -2;
  return n;
}
function Ze(e) {
  return K(e) ? { setup: e, name: e.name } : e;
}
const Gr = (e) => !!e.type.__asyncLoader,
  vr = (e) => e.type.__isKeepAlive;
function Tl(e, t) {
  ac(e, "a", t);
}
function Pl(e, t) {
  ac(e, "da", t);
}
function ac(e, t, n = we) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((br(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      vr(s.parent.vnode) && Ol(r, t, n, s), (s = s.parent);
  }
}
function Ol(e, t, n, r) {
  const s = br(t, e, r, !0);
  Us(() => {
    Rs(r[t], s);
  }, n);
}
function br(e, t, n = we, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          cn(), tn(n);
          const c = Me(t, n, e, i);
          return $t(), an(), c;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const it =
    (e) =>
    (t, n = we) =>
      (!Nn || e === "sp") && br(e, t, n),
  kl = it("bm"),
  Ds = it("m"),
  Nl = it("bu"),
  Il = it("u"),
  lc = it("bum"),
  Us = it("um"),
  Bl = it("sp"),
  Ll = it("rtg"),
  $l = it("rtc");
function Ml(e, t = we) {
  br("ec", e, t);
}
let es = !0;
function Fl(e) {
  const t = fc(e),
    n = e.proxy,
    r = e.ctx;
  (es = !1), t.beforeCreate && Co(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: i,
    watch: c,
    provide: a,
    inject: u,
    created: l,
    beforeMount: f,
    mounted: d,
    beforeUpdate: g,
    updated: w,
    activated: O,
    deactivated: A,
    beforeDestroy: S,
    beforeUnmount: I,
    destroyed: H,
    unmounted: $,
    render: Y,
    renderTracked: j,
    renderTriggered: P,
    errorCaptured: W,
    serverPrefetch: V,
    expose: ne,
    inheritAttrs: ae,
    components: B,
    directives: te,
    filters: re,
  } = t;
  if ((u && jl(u, r, null, e.appContext.config.unwrapInjectedRef), i))
    for (const le in i) {
      const se = i[le];
      K(se) && (r[le] = se.bind(n));
    }
  if (s) {
    const le = s.call(n, n);
    be(le) && (e.data = At(le));
  }
  if (((es = !0), o))
    for (const le in o) {
      const se = o[le],
        Oe = K(se) ? se.bind(n, n) : K(se.get) ? se.get.bind(n, n) : Ue,
        Ft = !K(se) && K(se.set) ? se.set.bind(n) : Ue,
        tt = Ce({ get: Oe, set: Ft });
      Object.defineProperty(r, le, {
        enumerable: !0,
        configurable: !0,
        get: () => tt.value,
        set: (He) => (tt.value = He),
      });
    }
  if (c) for (const le in c) uc(c[le], r, n, le);
  if (a) {
    const le = K(a) ? a.call(n) : a;
    Reflect.ownKeys(le).forEach((se) => {
      Vn(se, le[se]);
    });
  }
  l && Co(l, e, "c");
  function ge(le, se) {
    D(se) ? se.forEach((Oe) => le(Oe.bind(n))) : se && le(se.bind(n));
  }
  if (
    (ge(kl, f),
    ge(Ds, d),
    ge(Nl, g),
    ge(Il, w),
    ge(Tl, O),
    ge(Pl, A),
    ge(Ml, W),
    ge($l, j),
    ge(Ll, P),
    ge(lc, I),
    ge(Us, $),
    ge(Bl, V),
    D(ne))
  )
    if (ne.length) {
      const le = e.exposed || (e.exposed = {});
      ne.forEach((se) => {
        Object.defineProperty(le, se, {
          get: () => n[se],
          set: (Oe) => (n[se] = Oe),
        });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === Ue && (e.render = Y),
    ae != null && (e.inheritAttrs = ae),
    B && (e.components = B),
    te && (e.directives = te);
}
function jl(e, t, n = Ue, r = !1) {
  D(e) && (e = ts(e));
  for (const s in e) {
    const o = e[s];
    let i;
    be(o)
      ? "default" in o
        ? (i = Je(o.from || s, o.default, !0))
        : (i = Je(o.from || s))
      : (i = Je(o)),
      ye(i) && r
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (c) => (i.value = c),
          })
        : (t[s] = i);
  }
}
function Co(e, t, n) {
  Me(D(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function uc(e, t, n, r) {
  const s = r.includes(".") ? sc(n, r) : () => n[r];
  if (ve(e)) {
    const o = t[e];
    K(o) && wn(s, o);
  } else if (K(e)) wn(s, e.bind(n));
  else if (be(e))
    if (D(e)) e.forEach((o) => uc(o, t, n, r));
    else {
      const o = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(o) && wn(s, o, e);
    }
}
function fc(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    c = o.get(t);
  let a;
  return (
    c
      ? (a = c)
      : !s.length && !n && !r
      ? (a = t)
      : ((a = {}), s.length && s.forEach((u) => tr(a, u, i, !0)), tr(a, t, i)),
    o.set(t, a),
    a
  );
}
function tr(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && tr(e, o, n, !0), s && s.forEach((i) => tr(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const c = Dl[i] || (n && n[i]);
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Dl = {
  data: xo,
  props: Ot,
  emits: Ot,
  methods: Ot,
  computed: Ot,
  beforeCreate: Ae,
  created: Ae,
  beforeMount: Ae,
  mounted: Ae,
  beforeUpdate: Ae,
  updated: Ae,
  beforeDestroy: Ae,
  beforeUnmount: Ae,
  destroyed: Ae,
  unmounted: Ae,
  activated: Ae,
  deactivated: Ae,
  errorCaptured: Ae,
  serverPrefetch: Ae,
  components: Ot,
  directives: Ot,
  watch: Hl,
  provide: xo,
  inject: Ul,
};
function xo(e, t) {
  return t
    ? e
      ? function () {
          return xe(
            K(e) ? e.call(this, this) : e,
            K(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Ul(e, t) {
  return Ot(ts(e), ts(t));
}
function ts(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ot(e, t) {
  return e ? xe(xe(Object.create(null), e), t) : t;
}
function Hl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = xe(Object.create(null), e);
  for (const r in t) n[r] = Ae(e[r], t[r]);
  return n;
}
function ql(e, t, n, r = !1) {
  const s = {},
    o = {};
  Zn(o, _r, 1), (e.propsDefaults = Object.create(null)), hc(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : sl(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function Kl(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    c = ee(s),
    [a] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const l = e.vnode.dynamicProps;
      for (let f = 0; f < l.length; f++) {
        let d = l[f];
        const g = t[d];
        if (a)
          if (G(o, d)) g !== o[d] && ((o[d] = g), (u = !0));
          else {
            const w = Xe(d);
            s[w] = ns(a, c, w, g, e, !1);
          }
        else g !== o[d] && ((o[d] = g), (u = !0));
      }
    }
  } else {
    hc(e, t, s, o) && (u = !0);
    let l;
    for (const f in c)
      (!t || (!G(t, f) && ((l = on(f)) === f || !G(t, l)))) &&
        (a
          ? n &&
            (n[f] !== void 0 || n[l] !== void 0) &&
            (s[f] = ns(a, c, f, void 0, e, !0))
          : delete s[f]);
    if (o !== c)
      for (const f in o) (!t || (!G(t, f) && !0)) && (delete o[f], (u = !0));
  }
  u && ot(e, "set", "$attrs");
}
function hc(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    c;
  if (t)
    for (let a in t) {
      if (Kn(a)) continue;
      const u = t[a];
      let l;
      s && G(s, (l = Xe(a)))
        ? !o || !o.includes(l)
          ? (n[l] = u)
          : ((c || (c = {}))[l] = u)
        : js(e.emitsOptions, a) ||
          ((!(a in r) || u !== r[a]) && ((r[a] = u), (i = !0)));
    }
  if (o) {
    const a = ee(n),
      u = c || fe;
    for (let l = 0; l < o.length; l++) {
      const f = o[l];
      n[f] = ns(s, a, f, u[f], e, !G(u, f));
    }
  }
  return i;
}
function ns(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const c = G(i, "default");
    if (c && r === void 0) {
      const a = i.default;
      if (i.type !== Function && K(a)) {
        const { propsDefaults: u } = s;
        n in u ? (r = u[n]) : (tn(s), (r = u[n] = a.call(null, t)), $t());
      } else r = a;
    }
    i[0] &&
      (o && !c ? (r = !1) : i[1] && (r === "" || r === on(n)) && (r = !0));
  }
  return r;
}
function dc(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    c = [];
  let a = !1;
  if (!K(e)) {
    const l = (f) => {
      a = !0;
      const [d, g] = dc(f, t, !0);
      xe(i, d), g && c.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  if (!o && !a) return r.set(e, Xt), Xt;
  if (D(o))
    for (let l = 0; l < o.length; l++) {
      const f = Xe(o[l]);
      Ao(f) && (i[f] = fe);
    }
  else if (o)
    for (const l in o) {
      const f = Xe(l);
      if (Ao(f)) {
        const d = o[l],
          g = (i[f] = D(d) || K(d) ? { type: d } : d);
        if (g) {
          const w = To(Boolean, g.type),
            O = To(String, g.type);
          (g[0] = w > -1),
            (g[1] = O < 0 || w < O),
            (w > -1 || G(g, "default")) && c.push(f);
        }
      }
    }
  const u = [i, c];
  return r.set(e, u), u;
}
function Ao(e) {
  return e[0] !== "$";
}
function Ro(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function So(e, t) {
  return Ro(e) === Ro(t);
}
function To(e, t) {
  return D(t) ? t.findIndex((n) => So(n, e)) : K(t) && So(t, e) ? 0 : -1;
}
const pc = (e) => e[0] === "_" || e === "$stable",
  Hs = (e) => (D(e) ? e.map(ze) : [ze(e)]),
  Vl = (e, t, n) => {
    const r = Bt((...s) => Hs(t(...s)), n);
    return (r._c = !1), r;
  },
  mc = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (pc(s)) continue;
      const o = e[s];
      if (K(o)) t[s] = Vl(s, o, r);
      else if (o != null) {
        const i = Hs(o);
        t[s] = () => i;
      }
    }
  },
  gc = (e, t) => {
    const n = Hs(t);
    e.slots.default = () => n;
  },
  zl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ee(t)), Zn(t, "_", n)) : mc(t, (e.slots = {}));
    } else (e.slots = {}), t && gc(e, t);
    Zn(e.slots, _r, 1);
  },
  Wl = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = fe;
    if (r.shapeFlag & 32) {
      const c = t._;
      c
        ? n && c === 1
          ? (o = !1)
          : (xe(s, t), !n && c === 1 && delete s._)
        : ((o = !t.$stable), mc(t, s)),
        (i = t);
    } else t && (gc(e, t), (i = { default: 1 }));
    if (o) for (const c in s) !pc(c) && !(c in i) && delete s[c];
  };
function St(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    o && (c.oldValue = o[i].value);
    let a = c.dir[r];
    a && (cn(), Me(a, n, 8, [e.el, c, e, t]), an());
  }
}
function yc() {
  return {
    app: null,
    config: {
      isNativeTag: Aa,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Jl = 0;
function Yl(e, t) {
  return function (r, s = null) {
    s != null && !be(s) && (s = null);
    const o = yc(),
      i = new Set();
    let c = !1;
    const a = (o.app = {
      _uid: Jl++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: _u,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...l) {
        return (
          i.has(u) ||
            (u && K(u.install)
              ? (i.add(u), u.install(a, ...l))
              : K(u) && (i.add(u), u(a, ...l))),
          a
        );
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), a;
      },
      component(u, l) {
        return l ? ((o.components[u] = l), a) : o.components[u];
      },
      directive(u, l) {
        return l ? ((o.directives[u] = l), a) : o.directives[u];
      },
      mount(u, l, f) {
        if (!c) {
          const d = me(r, s);
          return (
            (d.appContext = o),
            l && t ? t(d, u) : e(d, u, f),
            (c = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            Ws(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        c && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, l) {
        return (o.provides[u] = l), a;
      },
    });
    return a;
  };
}
function rs(e, t, n, r, s = !1) {
  if (D(e)) {
    e.forEach((d, g) => rs(d, t && (D(t) ? t[g] : t), n, r, s));
    return;
  }
  if (Gr(r) && !s) return;
  const o = r.shapeFlag & 4 ? Ws(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: c, r: a } = e,
    u = t && t.r,
    l = c.refs === fe ? (c.refs = {}) : c.refs,
    f = c.setupState;
  if (
    (u != null &&
      u !== a &&
      (ve(u)
        ? ((l[u] = null), G(f, u) && (f[u] = null))
        : ye(u) && (u.value = null)),
    K(a))
  )
    Et(a, c, 12, [i, l]);
  else {
    const d = ve(a),
      g = ye(a);
    if (d || g) {
      const w = () => {
        if (e.f) {
          const O = d ? l[a] : a.value;
          s
            ? D(O) && Rs(O, o)
            : D(O)
            ? O.includes(o) || O.push(o)
            : d
            ? (l[a] = [o])
            : ((a.value = [o]), e.k && (l[e.k] = a.value));
        } else
          d
            ? ((l[a] = i), G(f, a) && (f[a] = i))
            : ye(a) && ((a.value = i), e.k && (l[e.k] = i));
      };
      i ? ((w.id = -1), Se(w, n)) : w();
    }
  }
}
const Se = xl;
function Xl(e) {
  return Ql(e);
}
function Ql(e, t) {
  const n = ka();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: c,
      createComment: a,
      setText: u,
      setElementText: l,
      parentNode: f,
      nextSibling: d,
      setScopeId: g = Ue,
      cloneNode: w,
      insertStaticContent: O,
    } = e,
    A = (
      h,
      p,
      m,
      b = null,
      v = null,
      C = null,
      T = !1,
      E = null,
      x = !!p.dynamicChildren
    ) => {
      if (h === p) return;
      h && !kt(h, p) && ((b = L(h)), Le(h, v, C, !0), (h = null)),
        p.patchFlag === -2 && ((x = !1), (p.dynamicChildren = null));
      const { type: _, ref: M, shapeFlag: k } = p;
      switch (_) {
        case Ks:
          S(h, p, m, b);
          break;
        case Qe:
          I(h, p, m, b);
          break;
        case Lr:
          h == null && H(p, m, b, T);
          break;
        case Te:
          te(h, p, m, b, v, C, T, E, x);
          break;
        default:
          k & 1
            ? j(h, p, m, b, v, C, T, E, x)
            : k & 6
            ? re(h, p, m, b, v, C, T, E, x)
            : (k & 64 || k & 128) && _.process(h, p, m, b, v, C, T, E, x, ue);
      }
      M != null && v && rs(M, h && h.ref, C, p || h, !p);
    },
    S = (h, p, m, b) => {
      if (h == null) r((p.el = c(p.children)), m, b);
      else {
        const v = (p.el = h.el);
        p.children !== h.children && u(v, p.children);
      }
    },
    I = (h, p, m, b) => {
      h == null ? r((p.el = a(p.children || "")), m, b) : (p.el = h.el);
    },
    H = (h, p, m, b) => {
      [h.el, h.anchor] = O(h.children, p, m, b, h.el, h.anchor);
    },
    $ = ({ el: h, anchor: p }, m, b) => {
      let v;
      for (; h && h !== p; ) (v = d(h)), r(h, m, b), (h = v);
      r(p, m, b);
    },
    Y = ({ el: h, anchor: p }) => {
      let m;
      for (; h && h !== p; ) (m = d(h)), s(h), (h = m);
      s(p);
    },
    j = (h, p, m, b, v, C, T, E, x) => {
      (T = T || p.type === "svg"),
        h == null ? P(p, m, b, v, C, T, E, x) : ne(h, p, v, C, T, E, x);
    },
    P = (h, p, m, b, v, C, T, E) => {
      let x, _;
      const {
        type: M,
        props: k,
        shapeFlag: F,
        transition: U,
        patchFlag: Q,
        dirs: de,
      } = h;
      if (h.el && w !== void 0 && Q === -1) x = h.el = w(h.el);
      else {
        if (
          ((x = h.el = i(h.type, C, k && k.is, k)),
          F & 8
            ? l(x, h.children)
            : F & 16 &&
              V(h.children, x, null, b, v, C && M !== "foreignObject", T, E),
          de && St(h, null, b, "created"),
          k)
        ) {
          for (const he in k)
            he !== "value" &&
              !Kn(he) &&
              o(x, he, null, k[he], C, h.children, b, v, R);
          "value" in k && o(x, "value", null, k.value),
            (_ = k.onVnodeBeforeMount) && Ke(_, b, h);
        }
        W(x, h, h.scopeId, T, b);
      }
      de && St(h, null, b, "beforeMount");
      const ie = (!v || (v && !v.pendingBranch)) && U && !U.persisted;
      ie && U.beforeEnter(x),
        r(x, p, m),
        ((_ = k && k.onVnodeMounted) || ie || de) &&
          Se(() => {
            _ && Ke(_, b, h), ie && U.enter(x), de && St(h, null, b, "mounted");
          }, v);
    },
    W = (h, p, m, b, v) => {
      if ((m && g(h, m), b)) for (let C = 0; C < b.length; C++) g(h, b[C]);
      if (v) {
        let C = v.subTree;
        if (p === C) {
          const T = v.vnode;
          W(h, T, T.scopeId, T.slotScopeIds, v.parent);
        }
      }
    },
    V = (h, p, m, b, v, C, T, E, x = 0) => {
      for (let _ = x; _ < h.length; _++) {
        const M = (h[_] = E ? pt(h[_]) : ze(h[_]));
        A(null, M, p, m, b, v, C, T, E);
      }
    },
    ne = (h, p, m, b, v, C, T) => {
      const E = (p.el = h.el);
      let { patchFlag: x, dynamicChildren: _, dirs: M } = p;
      x |= h.patchFlag & 16;
      const k = h.props || fe,
        F = p.props || fe;
      let U;
      m && Tt(m, !1),
        (U = F.onVnodeBeforeUpdate) && Ke(U, m, p, h),
        M && St(p, h, m, "beforeUpdate"),
        m && Tt(m, !0);
      const Q = v && p.type !== "foreignObject";
      if (
        (_
          ? ae(h.dynamicChildren, _, E, m, b, Q, C)
          : T || Oe(h, p, E, null, m, b, Q, C, !1),
        x > 0)
      ) {
        if (x & 16) B(E, p, k, F, m, b, v);
        else if (
          (x & 2 && k.class !== F.class && o(E, "class", null, F.class, v),
          x & 4 && o(E, "style", k.style, F.style, v),
          x & 8)
        ) {
          const de = p.dynamicProps;
          for (let ie = 0; ie < de.length; ie++) {
            const he = de[ie],
              Fe = k[he],
              jt = F[he];
            (jt !== Fe || he === "value") &&
              o(E, he, Fe, jt, v, h.children, m, b, R);
          }
        }
        x & 1 && h.children !== p.children && l(E, p.children);
      } else !T && _ == null && B(E, p, k, F, m, b, v);
      ((U = F.onVnodeUpdated) || M) &&
        Se(() => {
          U && Ke(U, m, p, h), M && St(p, h, m, "updated");
        }, b);
    },
    ae = (h, p, m, b, v, C, T) => {
      for (let E = 0; E < p.length; E++) {
        const x = h[E],
          _ = p[E],
          M =
            x.el && (x.type === Te || !kt(x, _) || x.shapeFlag & 70)
              ? f(x.el)
              : m;
        A(x, _, M, null, b, v, C, T, !0);
      }
    },
    B = (h, p, m, b, v, C, T) => {
      if (m !== b) {
        for (const E in b) {
          if (Kn(E)) continue;
          const x = b[E],
            _ = m[E];
          x !== _ && E !== "value" && o(h, E, _, x, T, p.children, v, C, R);
        }
        if (m !== fe)
          for (const E in m)
            !Kn(E) && !(E in b) && o(h, E, m[E], null, T, p.children, v, C, R);
        "value" in b && o(h, "value", m.value, b.value);
      }
    },
    te = (h, p, m, b, v, C, T, E, x) => {
      const _ = (p.el = h ? h.el : c("")),
        M = (p.anchor = h ? h.anchor : c(""));
      let { patchFlag: k, dynamicChildren: F, slotScopeIds: U } = p;
      U && (E = E ? E.concat(U) : U),
        h == null
          ? (r(_, m, b), r(M, m, b), V(p.children, m, M, v, C, T, E, x))
          : k > 0 && k & 64 && F && h.dynamicChildren
          ? (ae(h.dynamicChildren, F, m, v, C, T, E),
            (p.key != null || (v && p === v.subTree)) && qs(h, p, !0))
          : Oe(h, p, m, M, v, C, T, E, x);
    },
    re = (h, p, m, b, v, C, T, E, x) => {
      (p.slotScopeIds = E),
        h == null
          ? p.shapeFlag & 512
            ? v.ctx.activate(p, m, b, T, x)
            : et(p, m, b, v, C, T, x)
          : ge(h, p, x);
    },
    et = (h, p, m, b, v, C, T) => {
      const E = (h.component = du(h, b, v));
      if ((vr(h) && (E.ctx.renderer = ue), pu(E), E.asyncDep)) {
        if ((v && v.registerDep(E, le), !h.el)) {
          const x = (E.subTree = me(Qe));
          I(null, x, p, m);
        }
        return;
      }
      le(E, h, p, m, v, C, T);
    },
    ge = (h, p, m) => {
      const b = (p.component = h.component);
      if (wl(h, p, m))
        if (b.asyncDep && !b.asyncResolved) {
          se(b, p, m);
          return;
        } else (b.next = p), ml(b.update), b.update();
      else (p.component = h.component), (p.el = h.el), (b.vnode = p);
    },
    le = (h, p, m, b, v, C, T) => {
      const E = () => {
          if (h.isMounted) {
            let { next: M, bu: k, u: F, parent: U, vnode: Q } = h,
              de = M,
              ie;
            Tt(h, !1),
              M ? ((M.el = Q.el), se(h, M, T)) : (M = Q),
              k && Nr(k),
              (ie = M.props && M.props.onVnodeBeforeUpdate) && Ke(ie, U, M, Q),
              Tt(h, !0);
            const he = Ir(h),
              Fe = h.subTree;
            (h.subTree = he),
              A(Fe, he, f(Fe.el), L(Fe), h, v, C),
              (M.el = he.el),
              de === null && El(h, he.el),
              F && Se(F, v),
              (ie = M.props && M.props.onVnodeUpdated) &&
                Se(() => Ke(ie, U, M, Q), v);
          } else {
            let M;
            const { el: k, props: F } = p,
              { bm: U, m: Q, parent: de } = h,
              ie = Gr(p);
            if (
              (Tt(h, !1),
              U && Nr(U),
              !ie && (M = F && F.onVnodeBeforeMount) && Ke(M, de, p),
              Tt(h, !0),
              k && q)
            ) {
              const he = () => {
                (h.subTree = Ir(h)), q(k, h.subTree, h, v, null);
              };
              ie
                ? p.type.__asyncLoader().then(() => !h.isUnmounted && he())
                : he();
            } else {
              const he = (h.subTree = Ir(h));
              A(null, he, m, b, h, v, C), (p.el = he.el);
            }
            if ((Q && Se(Q, v), !ie && (M = F && F.onVnodeMounted))) {
              const he = p;
              Se(() => Ke(M, de, he), v);
            }
            p.shapeFlag & 256 && h.a && Se(h.a, v),
              (h.isMounted = !0),
              (p = m = b = null);
          }
        },
        x = (h.effect = new Os(E, () => Qi(h.update), h.scope)),
        _ = (h.update = x.run.bind(x));
      (_.id = h.uid), Tt(h, !0), _();
    },
    se = (h, p, m) => {
      p.component = h;
      const b = h.vnode.props;
      (h.vnode = p),
        (h.next = null),
        Kl(h, p.props, b, m),
        Wl(h, p.children, m),
        cn(),
        Fs(void 0, h.update),
        an();
    },
    Oe = (h, p, m, b, v, C, T, E, x = !1) => {
      const _ = h && h.children,
        M = h ? h.shapeFlag : 0,
        k = p.children,
        { patchFlag: F, shapeFlag: U } = p;
      if (F > 0) {
        if (F & 128) {
          tt(_, k, m, b, v, C, T, E, x);
          return;
        } else if (F & 256) {
          Ft(_, k, m, b, v, C, T, E, x);
          return;
        }
      }
      U & 8
        ? (M & 16 && R(_, v, C), k !== _ && l(m, k))
        : M & 16
        ? U & 16
          ? tt(_, k, m, b, v, C, T, E, x)
          : R(_, v, C, !0)
        : (M & 8 && l(m, ""), U & 16 && V(k, m, b, v, C, T, E, x));
    },
    Ft = (h, p, m, b, v, C, T, E, x) => {
      (h = h || Xt), (p = p || Xt);
      const _ = h.length,
        M = p.length,
        k = Math.min(_, M);
      let F;
      for (F = 0; F < k; F++) {
        const U = (p[F] = x ? pt(p[F]) : ze(p[F]));
        A(h[F], U, m, null, v, C, T, E, x);
      }
      _ > M ? R(h, v, C, !0, !1, k) : V(p, m, b, v, C, T, E, x, k);
    },
    tt = (h, p, m, b, v, C, T, E, x) => {
      let _ = 0;
      const M = p.length;
      let k = h.length - 1,
        F = M - 1;
      for (; _ <= k && _ <= F; ) {
        const U = h[_],
          Q = (p[_] = x ? pt(p[_]) : ze(p[_]));
        if (kt(U, Q)) A(U, Q, m, null, v, C, T, E, x);
        else break;
        _++;
      }
      for (; _ <= k && _ <= F; ) {
        const U = h[k],
          Q = (p[F] = x ? pt(p[F]) : ze(p[F]));
        if (kt(U, Q)) A(U, Q, m, null, v, C, T, E, x);
        else break;
        k--, F--;
      }
      if (_ > k) {
        if (_ <= F) {
          const U = F + 1,
            Q = U < M ? p[U].el : b;
          for (; _ <= F; )
            A(null, (p[_] = x ? pt(p[_]) : ze(p[_])), m, Q, v, C, T, E, x), _++;
        }
      } else if (_ > F) for (; _ <= k; ) Le(h[_], v, C, !0), _++;
      else {
        const U = _,
          Q = _,
          de = new Map();
        for (_ = Q; _ <= F; _++) {
          const ke = (p[_] = x ? pt(p[_]) : ze(p[_]));
          ke.key != null && de.set(ke.key, _);
        }
        let ie,
          he = 0;
        const Fe = F - Q + 1;
        let jt = !1,
          lo = 0;
        const fn = new Array(Fe);
        for (_ = 0; _ < Fe; _++) fn[_] = 0;
        for (_ = U; _ <= k; _++) {
          const ke = h[_];
          if (he >= Fe) {
            Le(ke, v, C, !0);
            continue;
          }
          let qe;
          if (ke.key != null) qe = de.get(ke.key);
          else
            for (ie = Q; ie <= F; ie++)
              if (fn[ie - Q] === 0 && kt(ke, p[ie])) {
                qe = ie;
                break;
              }
          qe === void 0
            ? Le(ke, v, C, !0)
            : ((fn[qe - Q] = _ + 1),
              qe >= lo ? (lo = qe) : (jt = !0),
              A(ke, p[qe], m, null, v, C, T, E, x),
              he++);
        }
        const uo = jt ? Zl(fn) : Xt;
        for (ie = uo.length - 1, _ = Fe - 1; _ >= 0; _--) {
          const ke = Q + _,
            qe = p[ke],
            fo = ke + 1 < M ? p[ke + 1].el : b;
          fn[_] === 0
            ? A(null, qe, m, fo, v, C, T, E, x)
            : jt && (ie < 0 || _ !== uo[ie] ? He(qe, m, fo, 2) : ie--);
        }
      }
    },
    He = (h, p, m, b, v = null) => {
      const { el: C, type: T, transition: E, children: x, shapeFlag: _ } = h;
      if (_ & 6) {
        He(h.component.subTree, p, m, b);
        return;
      }
      if (_ & 128) {
        h.suspense.move(p, m, b);
        return;
      }
      if (_ & 64) {
        T.move(h, p, m, ue);
        return;
      }
      if (T === Te) {
        r(C, p, m);
        for (let k = 0; k < x.length; k++) He(x[k], p, m, b);
        r(h.anchor, p, m);
        return;
      }
      if (T === Lr) {
        $(h, p, m);
        return;
      }
      if (b !== 2 && _ & 1 && E)
        if (b === 0) E.beforeEnter(C), r(C, p, m), Se(() => E.enter(C), v);
        else {
          const { leave: k, delayLeave: F, afterLeave: U } = E,
            Q = () => r(C, p, m),
            de = () => {
              k(C, () => {
                Q(), U && U();
              });
            };
          F ? F(C, Q, de) : de();
        }
      else r(C, p, m);
    },
    Le = (h, p, m, b = !1, v = !1) => {
      const {
        type: C,
        props: T,
        ref: E,
        children: x,
        dynamicChildren: _,
        shapeFlag: M,
        patchFlag: k,
        dirs: F,
      } = h;
      if ((E != null && rs(E, null, m, h, !0), M & 256)) {
        p.ctx.deactivate(h);
        return;
      }
      const U = M & 1 && F,
        Q = !Gr(h);
      let de;
      if ((Q && (de = T && T.onVnodeBeforeUnmount) && Ke(de, p, h), M & 6))
        N(h.component, m, b);
      else {
        if (M & 128) {
          h.suspense.unmount(m, b);
          return;
        }
        U && St(h, null, p, "beforeUnmount"),
          M & 64
            ? h.type.remove(h, p, m, v, ue, b)
            : _ && (C !== Te || (k > 0 && k & 64))
            ? R(_, p, m, !1, !0)
            : ((C === Te && k & 384) || (!v && M & 16)) && R(x, p, m),
          b && Or(h);
      }
      ((Q && (de = T && T.onVnodeUnmounted)) || U) &&
        Se(() => {
          de && Ke(de, p, h), U && St(h, null, p, "unmounted");
        }, m);
    },
    Or = (h) => {
      const { type: p, el: m, anchor: b, transition: v } = h;
      if (p === Te) {
        y(m, b);
        return;
      }
      if (p === Lr) {
        Y(h);
        return;
      }
      const C = () => {
        s(m), v && !v.persisted && v.afterLeave && v.afterLeave();
      };
      if (h.shapeFlag & 1 && v && !v.persisted) {
        const { leave: T, delayLeave: E } = v,
          x = () => T(m, C);
        E ? E(h.el, C, x) : x();
      } else C();
    },
    y = (h, p) => {
      let m;
      for (; h !== p; ) (m = d(h)), s(h), (h = m);
      s(p);
    },
    N = (h, p, m) => {
      const { bum: b, scope: v, update: C, subTree: T, um: E } = h;
      b && Nr(b),
        v.stop(),
        C && ((C.active = !1), Le(T, h, p, m)),
        E && Se(E, p),
        Se(() => {
          h.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    R = (h, p, m, b = !1, v = !1, C = 0) => {
      for (let T = C; T < h.length; T++) Le(h[T], p, m, b, v);
    },
    L = (h) =>
      h.shapeFlag & 6
        ? L(h.component.subTree)
        : h.shapeFlag & 128
        ? h.suspense.next()
        : d(h.anchor || h.el),
    oe = (h, p, m) => {
      h == null
        ? p._vnode && Le(p._vnode, null, null, !0)
        : A(p._vnode || null, h, p, null, null, null, m),
        ec(),
        (p._vnode = h);
    },
    ue = {
      p: A,
      um: Le,
      m: He,
      r: Or,
      mt: et,
      mc: V,
      pc: Oe,
      pbc: ae,
      n: L,
      o: e,
    };
  let z, q;
  return (
    t && ([z, q] = t(ue)), { render: oe, hydrate: z, createApp: Yl(oe, z) }
  );
}
function Tt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function qs(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (D(r) && D(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let c = s[o];
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = s[o] = pt(s[o])), (c.el = i.el)),
        n || qs(i, c));
    }
}
function Zl(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, c;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (c = (o + i) >> 1), e[n[c]] < u ? (o = c + 1) : (i = c);
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const Gl = (e) => e.__isTeleport,
  En = (e) => e && (e.disabled || e.disabled === ""),
  Po = (e) => typeof SVGElement != "undefined" && e instanceof SVGElement,
  ss = (e, t) => {
    const n = e && e.to;
    return ve(n) ? (t ? t(n) : null) : n;
  },
  eu = {
    __isTeleport: !0,
    process(e, t, n, r, s, o, i, c, a, u) {
      const {
          mc: l,
          pc: f,
          pbc: d,
          o: { insert: g, querySelector: w, createText: O, createComment: A },
        } = u,
        S = En(t.props);
      let { shapeFlag: I, children: H, dynamicChildren: $ } = t;
      if (e == null) {
        const Y = (t.el = O("")),
          j = (t.anchor = O(""));
        g(Y, n, r), g(j, n, r);
        const P = (t.target = ss(t.props, w)),
          W = (t.targetAnchor = O(""));
        P && (g(W, P), (i = i || Po(P)));
        const V = (ne, ae) => {
          I & 16 && l(H, ne, ae, s, o, i, c, a);
        };
        S ? V(n, j) : P && V(P, W);
      } else {
        t.el = e.el;
        const Y = (t.anchor = e.anchor),
          j = (t.target = e.target),
          P = (t.targetAnchor = e.targetAnchor),
          W = En(e.props),
          V = W ? n : j,
          ne = W ? Y : P;
        if (
          ((i = i || Po(j)),
          $
            ? (d(e.dynamicChildren, $, V, s, o, i, c), qs(e, t, !0))
            : a || f(e, t, V, ne, s, o, i, c, !1),
          S)
        )
          W || Dn(t, n, Y, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const ae = (t.target = ss(t.props, w));
          ae && Dn(t, ae, null, u, 0);
        } else W && Dn(t, j, P, u, 1);
      }
    },
    remove(e, t, n, r, { um: s, o: { remove: o } }, i) {
      const {
        shapeFlag: c,
        children: a,
        anchor: u,
        targetAnchor: l,
        target: f,
        props: d,
      } = e;
      if ((f && o(l), (i || !En(d)) && (o(u), c & 16)))
        for (let g = 0; g < a.length; g++) {
          const w = a[g];
          s(w, t, n, !0, !!w.dynamicChildren);
        }
    },
    move: Dn,
    hydrate: tu,
  };
function Dn(e, t, n, { o: { insert: r }, m: s }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: c, shapeFlag: a, children: u, props: l } = e,
    f = o === 2;
  if ((f && r(i, t, n), (!f || En(l)) && a & 16))
    for (let d = 0; d < u.length; d++) s(u[d], t, n, 2);
  f && r(c, t, n);
}
function tu(
  e,
  t,
  n,
  r,
  s,
  o,
  { o: { nextSibling: i, parentNode: c, querySelector: a } },
  u
) {
  const l = (t.target = ss(t.props, a));
  if (l) {
    const f = l._lpa || l.firstChild;
    t.shapeFlag & 16 &&
      (En(t.props)
        ? ((t.anchor = u(i(e), t, c(e), n, r, s, o)), (t.targetAnchor = f))
        : ((t.anchor = i(e)), (t.targetAnchor = u(f, t, l, n, r, s, o))),
      (l._lpa = t.targetAnchor && i(t.targetAnchor)));
  }
  return t.anchor && i(t.anchor);
}
const nu = eu,
  vc = "components",
  bc = Symbol();
function ru(e) {
  return ve(e) ? su(vc, e, !1) || e : e || bc;
}
function su(e, t, n = !0, r = !1) {
  const s = De || we;
  if (s) {
    const o = s.type;
    if (e === vc) {
      const c = vu(o);
      if (c && (c === t || c === Xe(t) || c === fr(Xe(t)))) return o;
    }
    const i = Oo(s[e] || o[e], t) || Oo(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function Oo(e, t) {
  return e && (e[t] || e[Xe(t)] || e[fr(Xe(t))]);
}
const Te = Symbol(void 0),
  Ks = Symbol(void 0),
  Qe = Symbol(void 0),
  Lr = Symbol(void 0),
  Cn = [];
let Lt = null;
function pe(e = !1) {
  Cn.push((Lt = e ? null : []));
}
function ou() {
  Cn.pop(), (Lt = Cn[Cn.length - 1] || null);
}
let nr = 1;
function ko(e) {
  nr += e;
}
function _c(e) {
  return (
    (e.dynamicChildren = nr > 0 ? Lt || Xt : null),
    ou(),
    nr > 0 && Lt && Lt.push(e),
    e
  );
}
function _e(e, t, n, r, s, o) {
  return _c(Z(e, t, n, r, s, o, !0));
}
function Zt(e, t, n, r, s) {
  return _c(me(e, t, n, r, s, !0));
}
function os(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function kt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const _r = "__vInternal",
  wc = ({ key: e }) => (e != null ? e : null),
  zn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? ve(e) || ye(e) || K(e)
        ? { i: De, r: e, k: t, f: !!n }
        : e
      : null;
function Z(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Te ? 0 : 1,
  i = !1,
  c = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && wc(t),
    ref: t && zn(t),
    scopeId: mr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    c
      ? (Vs(a, n), o & 128 && e.normalize(a))
      : n && (a.shapeFlag |= ve(n) ? 8 : 16),
    nr > 0 &&
      !i &&
      Lt &&
      (a.patchFlag > 0 || o & 6) &&
      a.patchFlag !== 32 &&
      Lt.push(a),
    a
  );
}
const me = iu;
function iu(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === bc) && (e = Qe), os(e))) {
    const c = en(e, t, !0);
    return n && Vs(c, n), c;
  }
  if ((bu(e) && (e = e.__vccOpts), t)) {
    t = cu(t);
    let { class: c, style: a } = t;
    c && !ve(c) && (t.class = cr(c)),
      be(a) && (Vi(a) && !D(a) && (a = xe({}, a)), (t.style = xs(a)));
  }
  const i = ve(e) ? 1 : Cl(e) ? 128 : Gl(e) ? 64 : be(e) ? 4 : K(e) ? 2 : 0;
  return Z(e, t, n, r, s, i, o, !0);
}
function cu(e) {
  return e ? (Vi(e) || _r in e ? xe({}, e) : e) : null;
}
function en(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    c = t ? au(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && wc(c),
    ref:
      t && t.ref ? (n && s ? (D(s) ? s.concat(zn(t)) : [s, zn(t)]) : zn(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Te ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && en(e.ssContent),
    ssFallback: e.ssFallback && en(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function xt(e = " ", t = 0) {
  return me(Ks, null, e, t);
}
function dt(e = "", t = !1) {
  return t ? (pe(), Zt(Qe, null, e)) : me(Qe, null, e);
}
function ze(e) {
  return e == null || typeof e == "boolean"
    ? me(Qe)
    : D(e)
    ? me(Te, null, e.slice())
    : typeof e == "object"
    ? pt(e)
    : me(Ks, null, String(e));
}
function pt(e) {
  return e.el === null || e.memo ? e : en(e);
}
function Vs(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Vs(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(_r in t)
        ? (t._ctx = De)
        : s === 3 &&
          De &&
          (De.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    K(t)
      ? ((t = { default: t, _ctx: De }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [xt(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function au(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = cr([t.class, r.class]));
      else if (s === "style") t.style = xs([t.style, r.style]);
      else if (ar(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(D(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function Ke(e, t, n, r = null) {
  Me(e, t, 7, [n, r]);
}
function lu(e, t, n, r) {
  let s;
  const o = n && n[r];
  if (D(e) || ve(e)) {
    s = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      s[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (be(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, c) => t(i, c, void 0, o && o[c]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let c = 0, a = i.length; c < a; c++) {
        const u = i[c];
        s[c] = t(e[u], u, c, o && o[c]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
const is = (e) => (e ? (Ec(e) ? Ws(e) || e.proxy : is(e.parent)) : null),
  rr = xe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => is(e.parent),
    $root: (e) => is(e.root),
    $emit: (e) => e.emit,
    $options: (e) => fc(e),
    $forceUpdate: (e) => () => Qi(e.update),
    $nextTick: (e) => Ms.bind(e.proxy),
    $watch: (e) => Al.bind(e),
  }),
  uu = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: c,
        appContext: a,
      } = e;
      let u;
      if (t[0] !== "$") {
        const g = i[t];
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (r !== fe && G(r, t)) return (i[t] = 1), r[t];
          if (s !== fe && G(s, t)) return (i[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && G(u, t)) return (i[t] = 3), o[t];
          if (n !== fe && G(n, t)) return (i[t] = 4), n[t];
          es && (i[t] = 0);
        }
      }
      const l = rr[t];
      let f, d;
      if (l) return t === "$attrs" && Be(e, "get", t), l(e);
      if ((f = c.__cssModules) && (f = f[t])) return f;
      if (n !== fe && G(n, t)) return (i[t] = 4), n[t];
      if (((d = a.config.globalProperties), G(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return s !== fe && G(s, t)
        ? ((s[t] = n), !0)
        : r !== fe && G(r, t)
        ? ((r[t] = n), !0)
        : G(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i
    ) {
      let c;
      return (
        !!n[i] ||
        (e !== fe && G(e, i)) ||
        (t !== fe && G(t, i)) ||
        ((c = o[0]) && G(c, i)) ||
        G(r, i) ||
        G(rr, i) ||
        G(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? this.set(e, t, n.get(), null)
          : n.value != null && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  },
  fu = yc();
let hu = 0;
function du(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || fu,
    o = {
      uid: hu++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ki(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: dc(r, s),
      emitsOptions: nc(r, s),
      emit: null,
      emitted: null,
      propsDefaults: fe,
      inheritAttrs: r.inheritAttrs,
      ctx: fe,
      data: fe,
      props: fe,
      attrs: fe,
      slots: fe,
      refs: fe,
      setupState: fe,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = vl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let we = null;
const zs = () => we || De,
  tn = (e) => {
    (we = e), e.scope.on();
  },
  $t = () => {
    we && we.scope.off(), (we = null);
  };
function Ec(e) {
  return e.vnode.shapeFlag & 4;
}
let Nn = !1;
function pu(e, t = !1) {
  Nn = t;
  const { props: n, children: r } = e.vnode,
    s = Ec(e);
  ql(e, n, s, t), zl(e, r);
  const o = s ? mu(e, t) : void 0;
  return (Nn = !1), o;
}
function mu(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Gt(new Proxy(e.ctx, uu)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? yu(e) : null);
    tn(e), cn();
    const o = Et(r, e, 0, [e.props, s]);
    if ((an(), $t(), Si(o))) {
      if ((o.then($t, $t), t))
        return o
          .then((i) => {
            No(e, i, t);
          })
          .catch((i) => {
            pr(i, e, 0);
          });
      e.asyncDep = o;
    } else No(e, o, t);
  } else Cc(e, t);
}
function No(e, t, n) {
  K(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : be(t) && (e.setupState = Yi(t)),
    Cc(e, n);
}
let Io;
function Cc(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Io && !r.render) {
      const s = r.template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: c, compilerOptions: a } = r,
          u = xe(xe({ isCustomElement: o, delimiters: c }, i), a);
        r.render = Io(s, u);
      }
    }
    e.render = r.render || Ue;
  }
  tn(e), cn(), Fl(e), an(), $t();
}
function gu(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Be(e, "get", "$attrs"), t[n];
    },
  });
}
function yu(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = gu(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Ws(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Yi(Gt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in rr) return rr[n](e);
        },
      }))
    );
}
function vu(e) {
  return (K(e) && e.displayName) || e.name;
}
function bu(e) {
  return K(e) && "__vccOpts" in e;
}
const Ce = (e, t) => hl(e, t, Nn);
function Js(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? be(t) && !D(t)
      ? os(t)
        ? me(e, null, [t])
        : me(e, t)
      : me(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && os(n) && (n = [n]),
      me(e, t, n));
}
const _u = "3.2.31",
  wu = "http://www.w3.org/2000/svg",
  Nt = typeof document != "undefined" ? document : null,
  Bo = Nt && Nt.createElement("template"),
  Eu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? Nt.createElementNS(wu, e)
        : Nt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => Nt.createTextNode(e),
    createComment: (e) => Nt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Nt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        Bo.innerHTML = r ? `<svg>${e}</svg>` : e;
        const c = Bo.content;
        if (r) {
          const a = c.firstChild;
          for (; a.firstChild; ) c.appendChild(a.firstChild);
          c.removeChild(a);
        }
        t.insertBefore(c, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Cu(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function xu(e, t, n) {
  const r = e.style,
    s = ve(n);
  if (n && !s) {
    for (const o in n) cs(r, o, n[o]);
    if (t && !ve(t)) for (const o in t) n[o] == null && cs(r, o, "");
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = o);
  }
}
const Lo = /\s*!important$/;
function cs(e, t, n) {
  if (D(n)) n.forEach((r) => cs(e, t, r));
  else if (t.startsWith("--")) e.setProperty(t, n);
  else {
    const r = Au(e, t);
    Lo.test(n)
      ? e.setProperty(on(r), n.replace(Lo, ""), "important")
      : (e[r] = n);
  }
}
const $o = ["Webkit", "Moz", "ms"],
  $r = {};
function Au(e, t) {
  const n = $r[t];
  if (n) return n;
  let r = Xe(t);
  if (r !== "filter" && r in e) return ($r[t] = r);
  r = fr(r);
  for (let s = 0; s < $o.length; s++) {
    const o = $o[s] + r;
    if (o in e) return ($r[t] = o);
  }
  return t;
}
const Mo = "http://www.w3.org/1999/xlink";
function Ru(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Mo, t.slice(6, t.length))
      : e.setAttributeNS(Mo, t, n);
  else {
    const o = wa(t);
    n == null || (o && !xi(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Su(e, t, n, r, s, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, s, o), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n == null ? "" : n;
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  if (n === "" || n == null) {
    const c = typeof e[t];
    if (c === "boolean") {
      e[t] = xi(n);
      return;
    } else if (n == null && c === "string") {
      (e[t] = ""), e.removeAttribute(t);
      return;
    } else if (c === "number") {
      try {
        e[t] = 0;
      } catch {}
      e.removeAttribute(t);
      return;
    }
  }
  try {
    e[t] = n;
  } catch {}
}
let sr = Date.now,
  xc = !1;
if (typeof window != "undefined") {
  sr() > document.createEvent("Event").timeStamp &&
    (sr = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  xc = !!(e && Number(e[1]) <= 53);
}
let as = 0;
const Tu = Promise.resolve(),
  Pu = () => {
    as = 0;
  },
  Ou = () => as || (Tu.then(Pu), (as = sr()));
function ku(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Nu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Iu(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [c, a] = Bu(t);
    if (r) {
      const u = (o[t] = Lu(r, s));
      ku(e, c, u, a);
    } else i && (Nu(e, c, i, a), (o[t] = void 0));
  }
}
const Fo = /(?:Once|Passive|Capture)$/;
function Bu(e) {
  let t;
  if (Fo.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(Fo)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [on(e.slice(2)), t];
}
function Lu(e, t) {
  const n = (r) => {
    const s = r.timeStamp || sr();
    (xc || s >= n.attached - 1) && Me($u(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Ou()), n;
}
function $u(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const jo = /^on[a-z]/,
  Mu = (e, t, n, r, s = !1, o, i, c, a) => {
    t === "class"
      ? Cu(e, r, s)
      : t === "style"
      ? xu(e, n, r)
      : ar(t)
      ? As(t) || Iu(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Fu(e, t, r, s)
        )
      ? Su(e, t, r, o, i, c, a)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        Ru(e, t, r, s));
  };
function Fu(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && jo.test(t) && K(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (jo.test(t) && ve(n))
    ? !1
    : t in e;
}
const at = "transition",
  hn = "animation",
  Ys = (e, { slots: t }) => Js(oc, ju(e), t);
Ys.displayName = "Transition";
const Ac = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Ys.props = xe({}, oc.props, Ac);
const Pt = (e, t = []) => {
    D(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Do = (e) => (e ? (D(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function ju(e) {
  const t = {};
  for (const B in e) B in Ac || (t[B] = e[B]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: s,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: c = `${n}-enter-to`,
      appearFromClass: a = o,
      appearActiveClass: u = i,
      appearToClass: l = c,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: g = `${n}-leave-to`,
    } = e,
    w = Du(s),
    O = w && w[0],
    A = w && w[1],
    {
      onBeforeEnter: S,
      onEnter: I,
      onEnterCancelled: H,
      onLeave: $,
      onLeaveCancelled: Y,
      onBeforeAppear: j = S,
      onAppear: P = I,
      onAppearCancelled: W = H,
    } = t,
    V = (B, te, re) => {
      Dt(B, te ? l : c), Dt(B, te ? u : i), re && re();
    },
    ne = (B, te) => {
      Dt(B, g), Dt(B, d), te && te();
    },
    ae = (B) => (te, re) => {
      const et = B ? P : I,
        ge = () => V(te, B, re);
      Pt(et, [te, ge]),
        Uo(() => {
          Dt(te, B ? a : o), lt(te, B ? l : c), Do(et) || Ho(te, r, O, ge);
        });
    };
  return xe(t, {
    onBeforeEnter(B) {
      Pt(S, [B]), lt(B, o), lt(B, i);
    },
    onBeforeAppear(B) {
      Pt(j, [B]), lt(B, a), lt(B, u);
    },
    onEnter: ae(!1),
    onAppear: ae(!0),
    onLeave(B, te) {
      const re = () => ne(B, te);
      lt(B, f),
        qu(),
        lt(B, d),
        Uo(() => {
          Dt(B, f), lt(B, g), Do($) || Ho(B, r, A, re);
        }),
        Pt($, [B, re]);
    },
    onEnterCancelled(B) {
      V(B, !1), Pt(H, [B]);
    },
    onAppearCancelled(B) {
      V(B, !0), Pt(W, [B]);
    },
    onLeaveCancelled(B) {
      ne(B), Pt(Y, [B]);
    },
  });
}
function Du(e) {
  if (e == null) return null;
  if (be(e)) return [Mr(e.enter), Mr(e.leave)];
  {
    const t = Mr(e);
    return [t, t];
  }
}
function Mr(e) {
  return Oi(e);
}
function lt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function Dt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Uo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Uu = 0;
function Ho(e, t, n, r) {
  const s = (e._endId = ++Uu),
    o = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(o, n);
  const { type: i, timeout: c, propCount: a } = Hu(e, t);
  if (!i) return r();
  const u = i + "end";
  let l = 0;
  const f = () => {
      e.removeEventListener(u, d), o();
    },
    d = (g) => {
      g.target === e && ++l >= a && f();
    };
  setTimeout(() => {
    l < a && f();
  }, c + 1),
    e.addEventListener(u, d);
}
function Hu(e, t) {
  const n = window.getComputedStyle(e),
    r = (w) => (n[w] || "").split(", "),
    s = r(at + "Delay"),
    o = r(at + "Duration"),
    i = qo(s, o),
    c = r(hn + "Delay"),
    a = r(hn + "Duration"),
    u = qo(c, a);
  let l = null,
    f = 0,
    d = 0;
  t === at
    ? i > 0 && ((l = at), (f = i), (d = o.length))
    : t === hn
    ? u > 0 && ((l = hn), (f = u), (d = a.length))
    : ((f = Math.max(i, u)),
      (l = f > 0 ? (i > u ? at : hn) : null),
      (d = l ? (l === at ? o.length : a.length) : 0));
  const g = l === at && /\b(transform|all)(,|$)/.test(n[at + "Property"]);
  return { type: l, timeout: f, propCount: d, hasTransform: g };
}
function qo(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Ko(n) + Ko(e[r])));
}
function Ko(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function qu() {
  return document.body.offsetHeight;
}
const Ku = ["ctrl", "shift", "alt", "meta"],
  Vu = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => Ku.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  zu =
    (e, t) =>
    (n, ...r) => {
      for (let s = 0; s < t.length; s++) {
        const o = Vu[t[s]];
        if (o && o(n, t)) return;
      }
      return e(n, ...r);
    },
  Wu = xe({ patchProp: Mu }, Eu);
let Vo;
function Ju() {
  return Vo || (Vo = Xl(Wu));
}
const Yu = (...e) => {
  const t = Ju().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = Xu(r);
      if (!s) return;
      const o = t._component;
      !K(o) && !o.render && !o.template && (o.template = s.innerHTML),
        (s.innerHTML = "");
      const i = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function Xu(e) {
  return ve(e) ? document.querySelector(e) : e;
}
var Qu = !1;
/*!
 * pinia v2.0.13
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ let Rc;
const wr = (e) => (Rc = e),
  Sc = Symbol();
function ls(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var xn;
(function (e) {
  (e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function");
})(xn || (xn = {}));
function Zu() {
  const e = Ni(!0),
    t = e.run(() => dr({}));
  let n = [],
    r = [];
  const s = Gt({
    install(o) {
      wr(s),
        (s._a = o),
        o.provide(Sc, s),
        (o.config.globalProperties.$pinia = s),
        r.forEach((i) => n.push(i)),
        (r = []);
    },
    use(o) {
      return !this._a && !Qu ? r.push(o) : n.push(o), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return s;
}
const Tc = () => {};
function zo(e, t, n, r = Tc) {
  e.push(t);
  const s = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), r());
  };
  return !n && zs() && Us(s), s;
}
function Ut(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
function us(e, t) {
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n],
      s = e[n];
    ls(s) && ls(r) && e.hasOwnProperty(n) && !ye(r) && !wt(r)
      ? (e[n] = us(s, r))
      : (e[n] = r);
  }
  return e;
}
const Gu = Symbol();
function ef(e) {
  return !ls(e) || !e.hasOwnProperty(Gu);
}
const { assign: rt } = Object;
function tf(e) {
  return !!(ye(e) && e.effect);
}
function nf(e, t, n, r) {
  const { state: s, actions: o, getters: i } = t,
    c = n.state.value[e];
  let a;
  function u() {
    c || (n.state.value[e] = s ? s() : {});
    const l = al(n.state.value[e]);
    return rt(
      l,
      o,
      Object.keys(i || {}).reduce(
        (f, d) => (
          (f[d] = Gt(
            Ce(() => {
              wr(n);
              const g = n._s.get(e);
              return i[d].call(g, g);
            })
          )),
          f
        ),
        {}
      )
    );
  }
  return (
    (a = Pc(e, u, t, n)),
    (a.$reset = function () {
      const f = s ? s() : {};
      this.$patch((d) => {
        rt(d, f);
      });
    }),
    a
  );
}
function Pc(e, t, n = {}, r, s) {
  let o;
  const i = n.state,
    c = rt({ actions: {} }, n),
    a = { deep: !0 };
  let u,
    l,
    f = Gt([]),
    d = Gt([]),
    g;
  const w = r.state.value[e];
  !i && !w && (r.state.value[e] = {}), dr({});
  function O(j) {
    let P;
    (u = l = !1),
      typeof j == "function"
        ? (j(r.state.value[e]),
          (P = { type: xn.patchFunction, storeId: e, events: g }))
        : (us(r.state.value[e], j),
          (P = { type: xn.patchObject, payload: j, storeId: e, events: g })),
      Ms().then(() => {
        u = !0;
      }),
      (l = !0),
      Ut(f, P, r.state.value[e]);
  }
  const A = Tc;
  function S() {
    o.stop(), (f = []), (d = []), r._s.delete(e);
  }
  function I(j, P) {
    return function () {
      wr(r);
      const W = Array.from(arguments),
        V = [],
        ne = [];
      function ae(re) {
        V.push(re);
      }
      function B(re) {
        ne.push(re);
      }
      Ut(d, { args: W, name: j, store: $, after: ae, onError: B });
      let te;
      try {
        te = P.apply(this && this.$id === e ? this : $, W);
      } catch (re) {
        throw (Ut(ne, re), re);
      }
      return te instanceof Promise
        ? te
            .then((re) => (Ut(V, re), re))
            .catch((re) => (Ut(ne, re), Promise.reject(re)))
        : (Ut(V, te), te);
    };
  }
  const H = {
      _p: r,
      $id: e,
      $onAction: zo.bind(null, d),
      $patch: O,
      $reset: A,
      $subscribe(j, P = {}) {
        const W = zo(f, j, P.detached, () => V()),
          V = o.run(() =>
            wn(
              () => r.state.value[e],
              (ne) => {
                (P.flush === "sync" ? l : u) &&
                  j({ storeId: e, type: xn.direct, events: g }, ne);
              },
              rt({}, a, P)
            )
          );
        return W;
      },
      $dispose: S,
    },
    $ = At(rt({}, H));
  r._s.set(e, $);
  const Y = r._e.run(() => ((o = Ni()), o.run(() => t())));
  for (const j in Y) {
    const P = Y[j];
    if ((ye(P) && !tf(P)) || wt(P))
      i ||
        (w && ef(P) && (ye(P) ? (P.value = w[j]) : us(P, w[j])),
        (r.state.value[e][j] = P));
    else if (typeof P == "function") {
      const W = I(j, P);
      (Y[j] = W), (c.actions[j] = P);
    }
  }
  return (
    rt($, Y),
    rt(ee($), Y),
    Object.defineProperty($, "$state", {
      get: () => r.state.value[e],
      set: (j) => {
        O((P) => {
          rt(P, j);
        });
      },
    }),
    r._p.forEach((j) => {
      rt(
        $,
        o.run(() => j({ store: $, app: r._a, pinia: r, options: c }))
      );
    }),
    w && i && n.hydrate && n.hydrate($.$state, w),
    (u = !0),
    (l = !0),
    $
  );
}
function Oc(e, t, n) {
  let r, s;
  const o = typeof t == "function";
  typeof e == "string" ? ((r = e), (s = o ? n : t)) : ((s = e), (r = e.id));
  function i(c, a) {
    const u = zs();
    return (
      (c = c || (u && Je(Sc))),
      c && wr(c),
      (c = Rc),
      c._s.has(r) || (o ? Pc(r, t, s, c) : nf(r, s, c)),
      c._s.get(r)
    );
  }
  return (i.$id = r), i;
}
/*!
 * vue-router v4.0.14
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const kc =
    typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  ln = (e) => (kc ? Symbol(e) : "_vr_" + e),
  rf = ln("rvlm"),
  Wo = ln("rvd"),
  Er = ln("r"),
  Nc = ln("rl"),
  fs = ln("rvl"),
  Wt = typeof window != "undefined";
function sf(e) {
  return e.__esModule || (kc && e[Symbol.toStringTag] === "Module");
}
const ce = Object.assign;
function Fr(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = Array.isArray(s) ? s.map(e) : e(s);
  }
  return n;
}
const An = () => {},
  of = /\/$/,
  cf = (e) => e.replace(of, "");
function jr(e, t, n = "/") {
  let r,
    s = {},
    o = "",
    i = "";
  const c = t.indexOf("?"),
    a = t.indexOf("#", c > -1 ? c : 0);
  return (
    c > -1 &&
      ((r = t.slice(0, c)),
      (o = t.slice(c + 1, a > -1 ? a : t.length)),
      (s = e(o))),
    a > -1 && ((r = r || t.slice(0, a)), (i = t.slice(a, t.length))),
    (r = ff(r != null ? r : t, n)),
    { fullPath: r + (o && "?") + o + i, path: r, query: s, hash: i }
  );
}
function af(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Jo(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function lf(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    nn(t.matched[r], n.matched[s]) &&
    Ic(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function nn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ic(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!uf(e[n], t[n])) return !1;
  return !0;
}
function uf(e, t) {
  return Array.isArray(e) ? Yo(e, t) : Array.isArray(t) ? Yo(t, e) : e === t;
}
function Yo(e, t) {
  return Array.isArray(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function ff(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    r = e.split("/");
  let s = n.length - 1,
    o,
    i;
  for (o = 0; o < r.length; o++)
    if (((i = r[o]), !(s === 1 || i === ".")))
      if (i === "..") s--;
      else break;
  return (
    n.slice(0, s).join("/") +
    "/" +
    r.slice(o - (o === r.length ? 1 : 0)).join("/")
  );
}
var In;
(function (e) {
  (e.pop = "pop"), (e.push = "push");
})(In || (In = {}));
var Rn;
(function (e) {
  (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Rn || (Rn = {}));
function hf(e) {
  if (!e)
    if (Wt) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), cf(e);
}
const df = /^[^#]+#/;
function pf(e, t) {
  return e.replace(df, "#") + t;
}
function mf(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const Cr = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function gf(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      s =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = mf(s, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function Xo(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const hs = new Map();
function yf(e, t) {
  hs.set(e, t);
}
function vf(e) {
  const t = hs.get(e);
  return hs.delete(e), t;
}
let bf = () => location.protocol + "//" + location.host;
function Bc(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let c = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      a = s.slice(c);
    return a[0] !== "/" && (a = "/" + a), Jo(a, "");
  }
  return Jo(n, e) + r + s;
}
function _f(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const c = ({ state: d }) => {
    const g = Bc(e, location),
      w = n.value,
      O = t.value;
    let A = 0;
    if (d) {
      if (((n.value = g), (t.value = d), i && i === w)) {
        i = null;
        return;
      }
      A = O ? d.position - O.position : 0;
    } else r(g);
    s.forEach((S) => {
      S(n.value, w, {
        delta: A,
        type: In.pop,
        direction: A ? (A > 0 ? Rn.forward : Rn.back) : Rn.unknown,
      });
    });
  };
  function a() {
    i = n.value;
  }
  function u(d) {
    s.push(d);
    const g = () => {
      const w = s.indexOf(d);
      w > -1 && s.splice(w, 1);
    };
    return o.push(g), g;
  }
  function l() {
    const { history: d } = window;
    !d.state || d.replaceState(ce({}, d.state, { scroll: Cr() }), "");
  }
  function f() {
    for (const d of o) d();
    (o = []),
      window.removeEventListener("popstate", c),
      window.removeEventListener("beforeunload", l);
  }
  return (
    window.addEventListener("popstate", c),
    window.addEventListener("beforeunload", l),
    { pauseListeners: a, listen: u, destroy: f }
  );
}
function Qo(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Cr() : null,
  };
}
function wf(e) {
  const { history: t, location: n } = window,
    r = { value: Bc(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    );
  function o(a, u, l) {
    const f = e.indexOf("#"),
      d =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + a
          : bf() + e + a;
    try {
      t[l ? "replaceState" : "pushState"](u, "", d), (s.value = u);
    } catch (g) {
      console.error(g), n[l ? "replace" : "assign"](d);
    }
  }
  function i(a, u) {
    const l = ce({}, t.state, Qo(s.value.back, a, s.value.forward, !0), u, {
      position: s.value.position,
    });
    o(a, l, !0), (r.value = a);
  }
  function c(a, u) {
    const l = ce({}, s.value, t.state, { forward: a, scroll: Cr() });
    o(l.current, l, !0);
    const f = ce({}, Qo(r.value, a, null), { position: l.position + 1 }, u);
    o(a, f, !1), (r.value = a);
  }
  return { location: r, state: s, push: c, replace: i };
}
function Ef(e) {
  e = hf(e);
  const t = wf(e),
    n = _f(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = ce(
    { location: "", base: e, go: r, createHref: pf.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function Cf(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function Lc(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const ut = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  $c = ln("nf");
var Zo;
(function (e) {
  (e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated");
})(Zo || (Zo = {}));
function rn(e, t) {
  return ce(new Error(), { type: e, [$c]: !0 }, t);
}
function ft(e, t) {
  return e instanceof Error && $c in e && (t == null || !!(e.type & t));
}
const Go = "[^/]+?",
  xf = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Af = /[.+*?^${}()[\]/\\]/g;
function Rf(e, t) {
  const n = ce({}, xf, t),
    r = [];
  let s = n.start ? "^" : "";
  const o = [];
  for (const u of e) {
    const l = u.length ? [] : [90];
    n.strict && !u.length && (s += "/");
    for (let f = 0; f < u.length; f++) {
      const d = u[f];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        f || (s += "/"), (s += d.value.replace(Af, "\\$&")), (g += 40);
      else if (d.type === 1) {
        const { value: w, repeatable: O, optional: A, regexp: S } = d;
        o.push({ name: w, repeatable: O, optional: A });
        const I = S || Go;
        if (I !== Go) {
          g += 10;
          try {
            new RegExp(`(${I})`);
          } catch ($) {
            throw new Error(
              `Invalid custom RegExp for param "${w}" (${I}): ` + $.message
            );
          }
        }
        let H = O ? `((?:${I})(?:/(?:${I}))*)` : `(${I})`;
        f || (H = A && u.length < 2 ? `(?:/${H})` : "/" + H),
          A && (H += "?"),
          (s += H),
          (g += 20),
          A && (g += -8),
          O && (g += -20),
          I === ".*" && (g += -50);
      }
      l.push(g);
    }
    r.push(l);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += "/?"), n.end ? (s += "$") : n.strict && (s += "(?:/|$)");
  const i = new RegExp(s, n.sensitive ? "" : "i");
  function c(u) {
    const l = u.match(i),
      f = {};
    if (!l) return null;
    for (let d = 1; d < l.length; d++) {
      const g = l[d] || "",
        w = o[d - 1];
      f[w.name] = g && w.repeatable ? g.split("/") : g;
    }
    return f;
  }
  function a(u) {
    let l = "",
      f = !1;
    for (const d of e) {
      (!f || !l.endsWith("/")) && (l += "/"), (f = !1);
      for (const g of d)
        if (g.type === 0) l += g.value;
        else if (g.type === 1) {
          const { value: w, repeatable: O, optional: A } = g,
            S = w in u ? u[w] : "";
          if (Array.isArray(S) && !O)
            throw new Error(
              `Provided param "${w}" is an array but it is not repeatable (* or + modifiers)`
            );
          const I = Array.isArray(S) ? S.join("/") : S;
          if (!I)
            if (A)
              d.length < 2 &&
                (l.endsWith("/") ? (l = l.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${w}"`);
          l += I;
        }
    }
    return l;
  }
  return { re: i, score: r, keys: o, parse: c, stringify: a };
}
function Sf(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function Tf(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = Sf(r[n], s[n]);
    if (o) return o;
    n++;
  }
  return s.length - r.length;
}
const Pf = { type: 0, value: "" },
  Of = /[a-zA-Z0-9_]/;
function kf(e) {
  if (!e) return [[]];
  if (e === "/") return [[Pf]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${u}": ${g}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), (o = []);
  }
  let c = 0,
    a,
    u = "",
    l = "";
  function f() {
    !u ||
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (a === "*" || a === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: u,
            regexp: l,
            repeatable: a === "*" || a === "+",
            optional: a === "*" || a === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""));
  }
  function d() {
    u += a;
  }
  for (; c < e.length; ) {
    if (((a = e[c++]), a === "\\" && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        a === "/" ? (u && f(), i()) : a === ":" ? (f(), (n = 1)) : d();
        break;
      case 4:
        d(), (n = r);
        break;
      case 1:
        a === "("
          ? (n = 2)
          : Of.test(a)
          ? d()
          : (f(), (n = 0), a !== "*" && a !== "?" && a !== "+" && c--);
        break;
      case 2:
        a === ")"
          ? l[l.length - 1] == "\\"
            ? (l = l.slice(0, -1) + a)
            : (n = 3)
          : (l += a);
        break;
      case 3:
        f(), (n = 0), a !== "*" && a !== "?" && a !== "+" && c--, (l = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), s;
}
function Nf(e, t, n) {
  const r = Rf(kf(e.path), n),
    s = ce(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function If(e, t) {
  const n = [],
    r = new Map();
  t = ti({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(l) {
    return r.get(l);
  }
  function o(l, f, d) {
    const g = !d,
      w = Lf(l);
    w.aliasOf = d && d.record;
    const O = ti(t, l),
      A = [w];
    if ("alias" in l) {
      const H = typeof l.alias == "string" ? [l.alias] : l.alias;
      for (const $ of H)
        A.push(
          ce({}, w, {
            components: d ? d.record.components : w.components,
            path: $,
            aliasOf: d ? d.record : w,
          })
        );
    }
    let S, I;
    for (const H of A) {
      const { path: $ } = H;
      if (f && $[0] !== "/") {
        const Y = f.record.path,
          j = Y[Y.length - 1] === "/" ? "" : "/";
        H.path = f.record.path + ($ && j + $);
      }
      if (
        ((S = Nf(H, f, O)),
        d
          ? d.alias.push(S)
          : ((I = I || S),
            I !== S && I.alias.push(S),
            g && l.name && !ei(S) && i(l.name)),
        "children" in w)
      ) {
        const Y = w.children;
        for (let j = 0; j < Y.length; j++) o(Y[j], S, d && d.children[j]);
      }
      (d = d || S), a(S);
    }
    return I
      ? () => {
          i(I);
        }
      : An;
  }
  function i(l) {
    if (Lc(l)) {
      const f = r.get(l);
      f &&
        (r.delete(l),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(i),
        f.alias.forEach(i));
    } else {
      const f = n.indexOf(l);
      f > -1 &&
        (n.splice(f, 1),
        l.record.name && r.delete(l.record.name),
        l.children.forEach(i),
        l.alias.forEach(i));
    }
  }
  function c() {
    return n;
  }
  function a(l) {
    let f = 0;
    for (
      ;
      f < n.length &&
      Tf(l, n[f]) >= 0 &&
      (l.record.path !== n[f].record.path || !Mc(l, n[f]));

    )
      f++;
    n.splice(f, 0, l), l.record.name && !ei(l) && r.set(l.record.name, l);
  }
  function u(l, f) {
    let d,
      g = {},
      w,
      O;
    if ("name" in l && l.name) {
      if (((d = r.get(l.name)), !d)) throw rn(1, { location: l });
      (O = d.record.name),
        (g = ce(
          Bf(
            f.params,
            d.keys.filter((I) => !I.optional).map((I) => I.name)
          ),
          l.params
        )),
        (w = d.stringify(g));
    } else if ("path" in l)
      (w = l.path),
        (d = n.find((I) => I.re.test(w))),
        d && ((g = d.parse(w)), (O = d.record.name));
    else {
      if (((d = f.name ? r.get(f.name) : n.find((I) => I.re.test(f.path))), !d))
        throw rn(1, { location: l, currentLocation: f });
      (O = d.record.name),
        (g = ce({}, f.params, l.params)),
        (w = d.stringify(g));
    }
    const A = [];
    let S = d;
    for (; S; ) A.unshift(S.record), (S = S.parent);
    return { name: O, path: w, params: g, matched: A, meta: Mf(A) };
  }
  return (
    e.forEach((l) => o(l)),
    {
      addRoute: o,
      resolve: u,
      removeRoute: i,
      getRoutes: c,
      getRecordMatcher: s,
    }
  );
}
function Bf(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function Lf(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: $f(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e ? e.components || {} : { default: e.component },
  };
}
function $f(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
  return t;
}
function ei(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Mf(e) {
  return e.reduce((t, n) => ce(t, n.meta), {});
}
function ti(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Mc(e, t) {
  return t.children.some((n) => n === e || Mc(e, n));
}
const Fc = /#/g,
  Ff = /&/g,
  jf = /\//g,
  Df = /=/g,
  Uf = /\?/g,
  jc = /\+/g,
  Hf = /%5B/g,
  qf = /%5D/g,
  Dc = /%5E/g,
  Kf = /%60/g,
  Uc = /%7B/g,
  Vf = /%7C/g,
  Hc = /%7D/g,
  zf = /%20/g;
function Xs(e) {
  return encodeURI("" + e)
    .replace(Vf, "|")
    .replace(Hf, "[")
    .replace(qf, "]");
}
function Wf(e) {
  return Xs(e).replace(Uc, "{").replace(Hc, "}").replace(Dc, "^");
}
function ds(e) {
  return Xs(e)
    .replace(jc, "%2B")
    .replace(zf, "+")
    .replace(Fc, "%23")
    .replace(Ff, "%26")
    .replace(Kf, "`")
    .replace(Uc, "{")
    .replace(Hc, "}")
    .replace(Dc, "^");
}
function Jf(e) {
  return ds(e).replace(Df, "%3D");
}
function Yf(e) {
  return Xs(e).replace(Fc, "%23").replace(Uf, "%3F");
}
function Xf(e) {
  return e == null ? "" : Yf(e).replace(jf, "%2F");
}
function or(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
function Qf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const r = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(jc, " "),
      i = o.indexOf("="),
      c = or(i < 0 ? o : o.slice(0, i)),
      a = i < 0 ? null : or(o.slice(i + 1));
    if (c in t) {
      let u = t[c];
      Array.isArray(u) || (u = t[c] = [u]), u.push(a);
    } else t[c] = a;
  }
  return t;
}
function ni(e) {
  let t = "";
  for (let n in e) {
    const r = e[n];
    if (((n = Jf(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Array.isArray(r) ? r.map((o) => o && ds(o)) : [r && ds(r)]).forEach(
      (o) => {
        o !== void 0 &&
          ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
      }
    );
  }
  return t;
}
function Zf(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = Array.isArray(r)
        ? r.map((s) => (s == null ? null : "" + s))
        : r == null
        ? r
        : "" + r);
  }
  return t;
}
function dn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e, reset: n };
}
function mt(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((i, c) => {
      const a = (f) => {
          f === !1
            ? c(rn(4, { from: n, to: t }))
            : f instanceof Error
            ? c(f)
            : Cf(f)
            ? c(rn(2, { from: t, to: f }))
            : (o &&
                r.enterCallbacks[s] === o &&
                typeof f == "function" &&
                o.push(f),
              i());
        },
        u = e.call(r && r.instances[s], t, n, a);
      let l = Promise.resolve(u);
      e.length < 3 && (l = l.then(a)), l.catch((f) => c(f));
    });
}
function Dr(e, t, n, r) {
  const s = [];
  for (const o of e)
    for (const i in o.components) {
      let c = o.components[i];
      if (!(t !== "beforeRouteEnter" && !o.instances[i]))
        if (Gf(c)) {
          const u = (c.__vccOpts || c)[t];
          u && s.push(mt(u, n, r, o, i));
        } else {
          let a = c();
          s.push(() =>
            a.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const l = sf(u) ? u.default : u;
              o.components[i] = l;
              const d = (l.__vccOpts || l)[t];
              return d && mt(d, n, r, o, i)();
            })
          );
        }
    }
  return s;
}
function Gf(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function ri(e) {
  const t = Je(Er),
    n = Je(Nc),
    r = Ce(() => t.resolve(J(e.to))),
    s = Ce(() => {
      const { matched: a } = r.value,
        { length: u } = a,
        l = a[u - 1],
        f = n.matched;
      if (!l || !f.length) return -1;
      const d = f.findIndex(nn.bind(null, l));
      if (d > -1) return d;
      const g = si(a[u - 2]);
      return u > 1 && si(l) === g && f[f.length - 1].path !== g
        ? f.findIndex(nn.bind(null, a[u - 2]))
        : d;
    }),
    o = Ce(() => s.value > -1 && nh(n.params, r.value.params)),
    i = Ce(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        Ic(n.params, r.value.params)
    );
  function c(a = {}) {
    return th(a)
      ? t[J(e.replace) ? "replace" : "push"](J(e.to)).catch(An)
      : Promise.resolve();
  }
  return {
    route: r,
    href: Ce(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: c,
  };
}
const eh = Ze({
    name: "RouterLink",
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: ri,
    setup(e, { slots: t }) {
      const n = At(ri(e)),
        { options: r } = Je(Er),
        s = Ce(() => ({
          [oi(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [oi(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : Js(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value,
              },
              o
            );
      };
    },
  }),
  Sn = eh;
function th(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function nh(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == "string") {
      if (r !== s) return !1;
    } else if (
      !Array.isArray(s) ||
      s.length !== r.length ||
      r.some((o, i) => o !== s[i])
    )
      return !1;
  }
  return !0;
}
function si(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const oi = (e, t, n) => (e != null ? e : t != null ? t : n),
  rh = Ze({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    setup(e, { attrs: t, slots: n }) {
      const r = Je(fs),
        s = Ce(() => e.route || r.value),
        o = Je(Wo, 0),
        i = Ce(() => s.value.matched[o]);
      Vn(Wo, o + 1), Vn(rf, i), Vn(fs, s);
      const c = dr();
      return (
        wn(
          () => [c.value, i.value, e.name],
          ([a, u, l], [f, d, g]) => {
            u &&
              ((u.instances[l] = a),
              d &&
                d !== u &&
                a &&
                a === f &&
                (u.leaveGuards.size || (u.leaveGuards = d.leaveGuards),
                u.updateGuards.size || (u.updateGuards = d.updateGuards))),
              a &&
                u &&
                (!d || !nn(u, d) || !f) &&
                (u.enterCallbacks[l] || []).forEach((w) => w(a));
          },
          { flush: "post" }
        ),
        () => {
          const a = s.value,
            u = i.value,
            l = u && u.components[e.name],
            f = e.name;
          if (!l) return ii(n.default, { Component: l, route: a });
          const d = u.props[e.name],
            g = d
              ? d === !0
                ? a.params
                : typeof d == "function"
                ? d(a)
                : d
              : null,
            O = Js(
              l,
              ce({}, g, t, {
                onVnodeUnmounted: (A) => {
                  A.component.isUnmounted && (u.instances[f] = null);
                },
                ref: c,
              })
            );
          return ii(n.default, { Component: O, route: a }) || O;
        }
      );
    },
  });
function ii(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const qc = rh;
function sh(e) {
  const t = If(e.routes, e),
    n = e.parseQuery || Qf,
    r = e.stringifyQuery || ni,
    s = e.history,
    o = dn(),
    i = dn(),
    c = dn(),
    a = ol(ut);
  let u = ut;
  Wt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const l = Fr.bind(null, (y) => "" + y),
    f = Fr.bind(null, Xf),
    d = Fr.bind(null, or);
  function g(y, N) {
    let R, L;
    return (
      Lc(y) ? ((R = t.getRecordMatcher(y)), (L = N)) : (L = y), t.addRoute(L, R)
    );
  }
  function w(y) {
    const N = t.getRecordMatcher(y);
    N && t.removeRoute(N);
  }
  function O() {
    return t.getRoutes().map((y) => y.record);
  }
  function A(y) {
    return !!t.getRecordMatcher(y);
  }
  function S(y, N) {
    if (((N = ce({}, N || a.value)), typeof y == "string")) {
      const q = jr(n, y, N.path),
        h = t.resolve({ path: q.path }, N),
        p = s.createHref(q.fullPath);
      return ce(q, h, {
        params: d(h.params),
        hash: or(q.hash),
        redirectedFrom: void 0,
        href: p,
      });
    }
    let R;
    if ("path" in y) R = ce({}, y, { path: jr(n, y.path, N.path).path });
    else {
      const q = ce({}, y.params);
      for (const h in q) q[h] == null && delete q[h];
      (R = ce({}, y, { params: f(y.params) })), (N.params = f(N.params));
    }
    const L = t.resolve(R, N),
      oe = y.hash || "";
    L.params = l(d(L.params));
    const ue = af(r, ce({}, y, { hash: Wf(oe), path: L.path })),
      z = s.createHref(ue);
    return ce(
      { fullPath: ue, hash: oe, query: r === ni ? Zf(y.query) : y.query || {} },
      L,
      { redirectedFrom: void 0, href: z }
    );
  }
  function I(y) {
    return typeof y == "string" ? jr(n, y, a.value.path) : ce({}, y);
  }
  function H(y, N) {
    if (u !== y) return rn(8, { from: N, to: y });
  }
  function $(y) {
    return P(y);
  }
  function Y(y) {
    return $(ce(I(y), { replace: !0 }));
  }
  function j(y) {
    const N = y.matched[y.matched.length - 1];
    if (N && N.redirect) {
      const { redirect: R } = N;
      let L = typeof R == "function" ? R(y) : R;
      return (
        typeof L == "string" &&
          ((L = L.includes("?") || L.includes("#") ? (L = I(L)) : { path: L }),
          (L.params = {})),
        ce({ query: y.query, hash: y.hash, params: y.params }, L)
      );
    }
  }
  function P(y, N) {
    const R = (u = S(y)),
      L = a.value,
      oe = y.state,
      ue = y.force,
      z = y.replace === !0,
      q = j(R);
    if (q) return P(ce(I(q), { state: oe, force: ue, replace: z }), N || R);
    const h = R;
    h.redirectedFrom = N;
    let p;
    return (
      !ue &&
        lf(r, L, R) &&
        ((p = rn(16, { to: h, from: L })), Ft(L, L, !0, !1)),
      (p ? Promise.resolve(p) : V(h, L))
        .catch((m) => (ft(m) ? (ft(m, 2) ? m : Oe(m)) : le(m, h, L)))
        .then((m) => {
          if (m) {
            if (ft(m, 2))
              return P(
                ce(I(m.to), { state: oe, force: ue, replace: z }),
                N || h
              );
          } else m = ae(h, L, !0, z, oe);
          return ne(h, L, m), m;
        })
    );
  }
  function W(y, N) {
    const R = H(y, N);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function V(y, N) {
    let R;
    const [L, oe, ue] = oh(y, N);
    R = Dr(L.reverse(), "beforeRouteLeave", y, N);
    for (const q of L)
      q.leaveGuards.forEach((h) => {
        R.push(mt(h, y, N));
      });
    const z = W.bind(null, y, N);
    return (
      R.push(z),
      Ht(R)
        .then(() => {
          R = [];
          for (const q of o.list()) R.push(mt(q, y, N));
          return R.push(z), Ht(R);
        })
        .then(() => {
          R = Dr(oe, "beforeRouteUpdate", y, N);
          for (const q of oe)
            q.updateGuards.forEach((h) => {
              R.push(mt(h, y, N));
            });
          return R.push(z), Ht(R);
        })
        .then(() => {
          R = [];
          for (const q of y.matched)
            if (q.beforeEnter && !N.matched.includes(q))
              if (Array.isArray(q.beforeEnter))
                for (const h of q.beforeEnter) R.push(mt(h, y, N));
              else R.push(mt(q.beforeEnter, y, N));
          return R.push(z), Ht(R);
        })
        .then(
          () => (
            y.matched.forEach((q) => (q.enterCallbacks = {})),
            (R = Dr(ue, "beforeRouteEnter", y, N)),
            R.push(z),
            Ht(R)
          )
        )
        .then(() => {
          R = [];
          for (const q of i.list()) R.push(mt(q, y, N));
          return R.push(z), Ht(R);
        })
        .catch((q) => (ft(q, 8) ? q : Promise.reject(q)))
    );
  }
  function ne(y, N, R) {
    for (const L of c.list()) L(y, N, R);
  }
  function ae(y, N, R, L, oe) {
    const ue = H(y, N);
    if (ue) return ue;
    const z = N === ut,
      q = Wt ? history.state : {};
    R &&
      (L || z
        ? s.replace(y.fullPath, ce({ scroll: z && q && q.scroll }, oe))
        : s.push(y.fullPath, oe)),
      (a.value = y),
      Ft(y, N, R, z),
      Oe();
  }
  let B;
  function te() {
    B = s.listen((y, N, R) => {
      const L = S(y),
        oe = j(L);
      if (oe) {
        P(ce(oe, { replace: !0 }), L).catch(An);
        return;
      }
      u = L;
      const ue = a.value;
      Wt && yf(Xo(ue.fullPath, R.delta), Cr()),
        V(L, ue)
          .catch((z) =>
            ft(z, 12)
              ? z
              : ft(z, 2)
              ? (P(z.to, L)
                  .then((q) => {
                    ft(q, 20) && !R.delta && R.type === In.pop && s.go(-1, !1);
                  })
                  .catch(An),
                Promise.reject())
              : (R.delta && s.go(-R.delta, !1), le(z, L, ue))
          )
          .then((z) => {
            (z = z || ae(L, ue, !1)),
              z &&
                (R.delta
                  ? s.go(-R.delta, !1)
                  : R.type === In.pop && ft(z, 20) && s.go(-1, !1)),
              ne(L, ue, z);
          })
          .catch(An);
    });
  }
  let re = dn(),
    et = dn(),
    ge;
  function le(y, N, R) {
    Oe(y);
    const L = et.list();
    return (
      L.length ? L.forEach((oe) => oe(y, N, R)) : console.error(y),
      Promise.reject(y)
    );
  }
  function se() {
    return ge && a.value !== ut
      ? Promise.resolve()
      : new Promise((y, N) => {
          re.add([y, N]);
        });
  }
  function Oe(y) {
    return (
      ge ||
        ((ge = !y),
        te(),
        re.list().forEach(([N, R]) => (y ? R(y) : N())),
        re.reset()),
      y
    );
  }
  function Ft(y, N, R, L) {
    const { scrollBehavior: oe } = e;
    if (!Wt || !oe) return Promise.resolve();
    const ue =
      (!R && vf(Xo(y.fullPath, 0))) ||
      ((L || !R) && history.state && history.state.scroll) ||
      null;
    return Ms()
      .then(() => oe(y, N, ue))
      .then((z) => z && gf(z))
      .catch((z) => le(z, y, N));
  }
  const tt = (y) => s.go(y);
  let He;
  const Le = new Set();
  return {
    currentRoute: a,
    addRoute: g,
    removeRoute: w,
    hasRoute: A,
    getRoutes: O,
    resolve: S,
    options: e,
    push: $,
    replace: Y,
    go: tt,
    back: () => tt(-1),
    forward: () => tt(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: c.add,
    onError: et.add,
    isReady: se,
    install(y) {
      const N = this;
      y.component("RouterLink", Sn),
        y.component("RouterView", qc),
        (y.config.globalProperties.$router = N),
        Object.defineProperty(y.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => J(a),
        }),
        Wt &&
          !He &&
          a.value === ut &&
          ((He = !0), $(s.location).catch((oe) => {}));
      const R = {};
      for (const oe in ut) R[oe] = Ce(() => a.value[oe]);
      y.provide(Er, N), y.provide(Nc, At(R)), y.provide(fs, a);
      const L = y.unmount;
      Le.add(y),
        (y.unmount = function () {
          Le.delete(y),
            Le.size < 1 &&
              ((u = ut), B && B(), (a.value = ut), (He = !1), (ge = !1)),
            L();
        });
    },
  };
}
function Ht(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function oh(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const c = t.matched[i];
    c && (e.matched.find((u) => nn(u, c)) ? r.push(c) : n.push(c));
    const a = e.matched[i];
    a && (t.matched.find((u) => nn(u, a)) || s.push(a));
  }
  return [n, r, s];
}
function ih() {
  return Je(Er);
}
var Mt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t) n[r] = s;
  return n;
};
const ch = {},
  Kc = (e) => (gr("data-v-6d4c01e5"), (e = e()), yr(), e),
  ah = {
    width: "25",
    height: "25",
    viewBox: "0 0 45 45",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  },
  lh = Kc(() =>
    Z(
      "path",
      {
        d: "M16.8873 3.82482C17.4259 2.89063 17.1063 1.69609 16.1734 1.15673C15.2405 0.617377 14.0476 0.937454 13.509 1.87164L9.1923 9.35883H6.09601C3.22345 9.35883 0.894775 11.6907 0.894775 14.5673C0.894775 16.4319 1.87322 18.0677 3.344 18.9878C3.49378 19.0815 3.66867 19.1247 3.84528 19.1247H42.1548C42.3314 19.1247 42.5063 19.0815 42.6561 18.9878C44.1269 18.0677 45.1053 16.4319 45.1053 14.5673C45.1053 11.6907 42.7766 9.35883 39.9041 9.35883H36.8078L32.4911 1.87164C31.9524 0.937454 30.7596 0.617377 29.8267 1.15673C28.8938 1.69609 28.5741 2.89063 29.1127 3.82482L32.3034 9.35883H13.6967L16.8873 3.82482Z",
      },
      null,
      -1
    )
  ),
  uh = Kc(() =>
    Z(
      "path",
      {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M42.075 23.642C42.1309 23.3232 41.886 23.0311 41.5627 23.0311H4.43737C4.11414 23.0311 3.86919 23.3232 3.92508 23.642L6.52704 38.4823C7.06832 41.5696 9.5364 43.9548 12.6366 44.3867C19.5125 45.3448 26.4876 45.3448 33.3635 44.3867C36.4637 43.9548 38.9318 41.5696 39.4731 38.4823L42.075 23.642ZM19.7493 28.8906C19.7493 27.8119 18.876 26.9374 17.7988 26.9374C16.7216 26.9374 15.8483 27.8119 15.8483 28.8906V34.0991C15.8483 35.1778 16.7216 36.0523 17.7988 36.0523C18.876 36.0523 19.7493 35.1778 19.7493 34.0991V28.8906ZM28.2013 26.9374C29.2785 26.9374 30.1517 27.8119 30.1517 28.8906V34.0991C30.1517 35.1778 29.2785 36.0523 28.2013 36.0523C27.1241 36.0523 26.2508 35.1778 26.2508 34.0991V28.8906C26.2508 27.8119 27.1241 26.9374 28.2013 26.9374Z",
      },
      null,
      -1
    )
  ),
  fh = [lh, uh];
function hh(e, t) {
  return pe(), _e("svg", ah, fh);
}
var dh = Mt(ch, [
  ["render", hh],
  ["__scopeId", "data-v-6d4c01e5"],
]);
const ph = { class: "header-app" },
  mh = xt("Hungry Petz"),
  gh = xt(" Produtos "),
  yh = Ze({
    props: { countCart: Number },
    setup(e) {
      return (t, n) => (
        pe(),
        _e("header", ph, [
          Z("div", null, [
            me(
              J(Sn),
              { class: "logo", to: "/" },
              { default: Bt(() => [mh]), _: 1 }
            ),
            Z("div", null, [
              Z("nav", null, [
                me(
                  J(Sn),
                  { to: "/produtos" },
                  { default: Bt(() => [gh]), _: 1 }
                ),
                me(
                  J(Sn),
                  { to: "/pedido" },
                  {
                    default: Bt(() => [
                      xt(" Minha cesta (" + yt(e.countCart) + ") ", 1),
                      me(dh),
                    ]),
                    _: 1,
                  }
                ),
              ]),
            ]),
          ]),
        ])
      );
    },
  });
var vh = Mt(yh, [["__scopeId", "data-v-49b41a74"]]);
const bh = {},
  _h = (e) => (gr("data-v-62d3aeb6"), (e = e()), yr(), e),
  wh = { class: "footer-app" },
  Eh = _h(() =>
    Z(
      "span",
      null,
      [
        Z("strong", null, "Desenvolvido por:"),
        xt(
          " Aquiles Aguiar, Caio Roberto, Gabriel Lopes, Gabriel Passos e Savio Fonseca | "
        ),
        Z("strong", null, "PI V - UCL 2022/2"),
      ],
      -1
    )
  ),
  Ch = [Eh];
function xh(e, t) {
  return pe(), _e("footer", wh, Ch);
}
var Ah = Mt(bh, [
  ["render", xh],
  ["__scopeId", "data-v-62d3aeb6"],
]);
const Rh =
    "https://raw.githubusercontent.com/savifon/UCL-2022-1-PIV-App/master",
  ir = Oc({
    id: "products",
    state: () => ({ items: {}, ids: [], filter: "" }),
    getters: {
      list() {
        return this.filter.length < 3
          ? this.ids.map((e) => this.items[e])
          : this.ids.map((e) => {
              if (this.items[e].name.includes(this.filter))
                return this.items[e];
            });
      },
      loaded() {
        return this.ids.length > 0;
      },
    },
    actions: {
      async fetchProducts() {
        if (this.loaded) return;
        const t = await (await fetch(`${Rh}/products.json`)).json();
        this.ids = t.map((n) => ((this.items[n.id] = n), n.id));
      },
    },
  });
var Qs = { exports: {} },
  Vc = function (t, n) {
    return function () {
      for (var s = new Array(arguments.length), o = 0; o < s.length; o++)
        s[o] = arguments[o];
      return t.apply(n, s);
    };
  },
  Sh = Vc,
  Rt = Object.prototype.toString;
function Zs(e) {
  return Array.isArray(e);
}
function ps(e) {
  return typeof e == "undefined";
}
function Th(e) {
  return (
    e !== null &&
    !ps(e) &&
    e.constructor !== null &&
    !ps(e.constructor) &&
    typeof e.constructor.isBuffer == "function" &&
    e.constructor.isBuffer(e)
  );
}
function zc(e) {
  return Rt.call(e) === "[object ArrayBuffer]";
}
function Ph(e) {
  return Rt.call(e) === "[object FormData]";
}
function Oh(e) {
  var t;
  return (
    typeof ArrayBuffer != "undefined" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && zc(e.buffer)),
    t
  );
}
function kh(e) {
  return typeof e == "string";
}
function Nh(e) {
  return typeof e == "number";
}
function Wc(e) {
  return e !== null && typeof e == "object";
}
function Wn(e) {
  if (Rt.call(e) !== "[object Object]") return !1;
  var t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
function Ih(e) {
  return Rt.call(e) === "[object Date]";
}
function Bh(e) {
  return Rt.call(e) === "[object File]";
}
function Lh(e) {
  return Rt.call(e) === "[object Blob]";
}
function Jc(e) {
  return Rt.call(e) === "[object Function]";
}
function $h(e) {
  return Wc(e) && Jc(e.pipe);
}
function Mh(e) {
  return Rt.call(e) === "[object URLSearchParams]";
}
function Fh(e) {
  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
}
function jh() {
  return typeof navigator != "undefined" &&
    (navigator.product === "ReactNative" ||
      navigator.product === "NativeScript" ||
      navigator.product === "NS")
    ? !1
    : typeof window != "undefined" && typeof document != "undefined";
}
function Gs(e, t) {
  if (!(e === null || typeof e == "undefined"))
    if ((typeof e != "object" && (e = [e]), Zs(e)))
      for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
    else
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && t.call(null, e[s], s, e);
}
function ms() {
  var e = {};
  function t(s, o) {
    Wn(e[o]) && Wn(s)
      ? (e[o] = ms(e[o], s))
      : Wn(s)
      ? (e[o] = ms({}, s))
      : Zs(s)
      ? (e[o] = s.slice())
      : (e[o] = s);
  }
  for (var n = 0, r = arguments.length; n < r; n++) Gs(arguments[n], t);
  return e;
}
function Dh(e, t, n) {
  return (
    Gs(t, function (s, o) {
      n && typeof s == "function" ? (e[o] = Sh(s, n)) : (e[o] = s);
    }),
    e
  );
}
function Uh(e) {
  return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
}
var Pe = {
    isArray: Zs,
    isArrayBuffer: zc,
    isBuffer: Th,
    isFormData: Ph,
    isArrayBufferView: Oh,
    isString: kh,
    isNumber: Nh,
    isObject: Wc,
    isPlainObject: Wn,
    isUndefined: ps,
    isDate: Ih,
    isFile: Bh,
    isBlob: Lh,
    isFunction: Jc,
    isStream: $h,
    isURLSearchParams: Mh,
    isStandardBrowserEnv: jh,
    forEach: Gs,
    merge: ms,
    extend: Dh,
    trim: Fh,
    stripBOM: Uh,
  },
  qt = Pe;
function ci(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
var Yc = function (t, n, r) {
    if (!n) return t;
    var s;
    if (r) s = r(n);
    else if (qt.isURLSearchParams(n)) s = n.toString();
    else {
      var o = [];
      qt.forEach(n, function (a, u) {
        a === null ||
          typeof a == "undefined" ||
          (qt.isArray(a) ? (u = u + "[]") : (a = [a]),
          qt.forEach(a, function (f) {
            qt.isDate(f)
              ? (f = f.toISOString())
              : qt.isObject(f) && (f = JSON.stringify(f)),
              o.push(ci(u) + "=" + ci(f));
          }));
      }),
        (s = o.join("&"));
    }
    if (s) {
      var i = t.indexOf("#");
      i !== -1 && (t = t.slice(0, i)),
        (t += (t.indexOf("?") === -1 ? "?" : "&") + s);
    }
    return t;
  },
  Hh = Pe;
function xr() {
  this.handlers = [];
}
xr.prototype.use = function (t, n, r) {
  return (
    this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null,
    }),
    this.handlers.length - 1
  );
};
xr.prototype.eject = function (t) {
  this.handlers[t] && (this.handlers[t] = null);
};
xr.prototype.forEach = function (t) {
  Hh.forEach(this.handlers, function (r) {
    r !== null && t(r);
  });
};
var qh = xr,
  Kh = Pe,
  Vh = function (t, n) {
    Kh.forEach(t, function (s, o) {
      o !== n &&
        o.toUpperCase() === n.toUpperCase() &&
        ((t[n] = s), delete t[o]);
    });
  },
  Xc = function (t, n, r, s, o) {
    return (
      (t.config = n),
      r && (t.code = r),
      (t.request = s),
      (t.response = o),
      (t.isAxiosError = !0),
      (t.toJSON = function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status:
            this.response && this.response.status ? this.response.status : null,
        };
      }),
      t
    );
  },
  Qc = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  zh = Xc,
  Zc = function (t, n, r, s, o) {
    var i = new Error(t);
    return zh(i, n, r, s, o);
  },
  Wh = Zc,
  Jh = function (t, n, r) {
    var s = r.config.validateStatus;
    !r.status || !s || s(r.status)
      ? t(r)
      : n(
          Wh(
            "Request failed with status code " + r.status,
            r.config,
            null,
            r.request,
            r
          )
        );
  },
  Un = Pe,
  Yh = Un.isStandardBrowserEnv()
    ? (function () {
        return {
          write: function (n, r, s, o, i, c) {
            var a = [];
            a.push(n + "=" + encodeURIComponent(r)),
              Un.isNumber(s) && a.push("expires=" + new Date(s).toGMTString()),
              Un.isString(o) && a.push("path=" + o),
              Un.isString(i) && a.push("domain=" + i),
              c === !0 && a.push("secure"),
              (document.cookie = a.join("; "));
          },
          read: function (n) {
            var r = document.cookie.match(
              new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
            );
            return r ? decodeURIComponent(r[3]) : null;
          },
          remove: function (n) {
            this.write(n, "", Date.now() - 864e5);
          },
        };
      })()
    : (function () {
        return {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
      })(),
  Xh = function (t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
  },
  Qh = function (t, n) {
    return n ? t.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : t;
  },
  Zh = Xh,
  Gh = Qh,
  ed = function (t, n) {
    return t && !Zh(n) ? Gh(t, n) : n;
  },
  Ur = Pe,
  td = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ],
  nd = function (t) {
    var n = {},
      r,
      s,
      o;
    return (
      t &&
        Ur.forEach(
          t.split(`
`),
          function (c) {
            if (
              ((o = c.indexOf(":")),
              (r = Ur.trim(c.substr(0, o)).toLowerCase()),
              (s = Ur.trim(c.substr(o + 1))),
              r)
            ) {
              if (n[r] && td.indexOf(r) >= 0) return;
              r === "set-cookie"
                ? (n[r] = (n[r] ? n[r] : []).concat([s]))
                : (n[r] = n[r] ? n[r] + ", " + s : s);
            }
          }
        ),
      n
    );
  },
  ai = Pe,
  rd = ai.isStandardBrowserEnv()
    ? (function () {
        var t = /(msie|trident)/i.test(navigator.userAgent),
          n = document.createElement("a"),
          r;
        function s(o) {
          var i = o;
          return (
            t && (n.setAttribute("href", i), (i = n.href)),
            n.setAttribute("href", i),
            {
              href: n.href,
              protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
              host: n.host,
              search: n.search ? n.search.replace(/^\?/, "") : "",
              hash: n.hash ? n.hash.replace(/^#/, "") : "",
              hostname: n.hostname,
              port: n.port,
              pathname:
                n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
            }
          );
        }
        return (
          (r = s(window.location.href)),
          function (i) {
            var c = ai.isString(i) ? s(i) : i;
            return c.protocol === r.protocol && c.host === r.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })();
function eo(e) {
  this.message = e;
}
eo.prototype.toString = function () {
  return "Cancel" + (this.message ? ": " + this.message : "");
};
eo.prototype.__CANCEL__ = !0;
var Ar = eo,
  Hn = Pe,
  sd = Jh,
  od = Yh,
  id = Yc,
  cd = ed,
  ad = nd,
  ld = rd,
  Hr = Zc,
  ud = Qc,
  fd = Ar,
  li = function (t) {
    return new Promise(function (r, s) {
      var o = t.data,
        i = t.headers,
        c = t.responseType,
        a;
      function u() {
        t.cancelToken && t.cancelToken.unsubscribe(a),
          t.signal && t.signal.removeEventListener("abort", a);
      }
      Hn.isFormData(o) && delete i["Content-Type"];
      var l = new XMLHttpRequest();
      if (t.auth) {
        var f = t.auth.username || "",
          d = t.auth.password
            ? unescape(encodeURIComponent(t.auth.password))
            : "";
        i.Authorization = "Basic " + btoa(f + ":" + d);
      }
      var g = cd(t.baseURL, t.url);
      l.open(t.method.toUpperCase(), id(g, t.params, t.paramsSerializer), !0),
        (l.timeout = t.timeout);
      function w() {
        if (!!l) {
          var A =
              "getAllResponseHeaders" in l
                ? ad(l.getAllResponseHeaders())
                : null,
            S =
              !c || c === "text" || c === "json" ? l.responseText : l.response,
            I = {
              data: S,
              status: l.status,
              statusText: l.statusText,
              headers: A,
              config: t,
              request: l,
            };
          sd(
            function ($) {
              r($), u();
            },
            function ($) {
              s($), u();
            },
            I
          ),
            (l = null);
        }
      }
      if (
        ("onloadend" in l
          ? (l.onloadend = w)
          : (l.onreadystatechange = function () {
              !l ||
                l.readyState !== 4 ||
                (l.status === 0 &&
                  !(l.responseURL && l.responseURL.indexOf("file:") === 0)) ||
                setTimeout(w);
            }),
        (l.onabort = function () {
          !l || (s(Hr("Request aborted", t, "ECONNABORTED", l)), (l = null));
        }),
        (l.onerror = function () {
          s(Hr("Network Error", t, null, l)), (l = null);
        }),
        (l.ontimeout = function () {
          var S = t.timeout
              ? "timeout of " + t.timeout + "ms exceeded"
              : "timeout exceeded",
            I = t.transitional || ud;
          t.timeoutErrorMessage && (S = t.timeoutErrorMessage),
            s(
              Hr(S, t, I.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", l)
            ),
            (l = null);
        }),
        Hn.isStandardBrowserEnv())
      ) {
        var O =
          (t.withCredentials || ld(g)) && t.xsrfCookieName
            ? od.read(t.xsrfCookieName)
            : void 0;
        O && (i[t.xsrfHeaderName] = O);
      }
      "setRequestHeader" in l &&
        Hn.forEach(i, function (S, I) {
          typeof o == "undefined" && I.toLowerCase() === "content-type"
            ? delete i[I]
            : l.setRequestHeader(I, S);
        }),
        Hn.isUndefined(t.withCredentials) ||
          (l.withCredentials = !!t.withCredentials),
        c && c !== "json" && (l.responseType = t.responseType),
        typeof t.onDownloadProgress == "function" &&
          l.addEventListener("progress", t.onDownloadProgress),
        typeof t.onUploadProgress == "function" &&
          l.upload &&
          l.upload.addEventListener("progress", t.onUploadProgress),
        (t.cancelToken || t.signal) &&
          ((a = function (A) {
            !l ||
              (s(!A || (A && A.type) ? new fd("canceled") : A),
              l.abort(),
              (l = null));
          }),
          t.cancelToken && t.cancelToken.subscribe(a),
          t.signal &&
            (t.signal.aborted ? a() : t.signal.addEventListener("abort", a))),
        o || (o = null),
        l.send(o);
    });
  },
  Ee = Pe,
  ui = Vh,
  hd = Xc,
  dd = Qc,
  pd = { "Content-Type": "application/x-www-form-urlencoded" };
function fi(e, t) {
  !Ee.isUndefined(e) &&
    Ee.isUndefined(e["Content-Type"]) &&
    (e["Content-Type"] = t);
}
function md() {
  var e;
  return (
    (typeof XMLHttpRequest != "undefined" ||
      (typeof process != "undefined" &&
        Object.prototype.toString.call(process) === "[object process]")) &&
      (e = li),
    e
  );
}
function gd(e, t, n) {
  if (Ee.isString(e))
    try {
      return (t || JSON.parse)(e), Ee.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
var Rr = {
  transitional: dd,
  adapter: md(),
  transformRequest: [
    function (t, n) {
      return (
        ui(n, "Accept"),
        ui(n, "Content-Type"),
        Ee.isFormData(t) ||
        Ee.isArrayBuffer(t) ||
        Ee.isBuffer(t) ||
        Ee.isStream(t) ||
        Ee.isFile(t) ||
        Ee.isBlob(t)
          ? t
          : Ee.isArrayBufferView(t)
          ? t.buffer
          : Ee.isURLSearchParams(t)
          ? (fi(n, "application/x-www-form-urlencoded;charset=utf-8"),
            t.toString())
          : Ee.isObject(t) || (n && n["Content-Type"] === "application/json")
          ? (fi(n, "application/json"), gd(t))
          : t
      );
    },
  ],
  transformResponse: [
    function (t) {
      var n = this.transitional || Rr.transitional,
        r = n && n.silentJSONParsing,
        s = n && n.forcedJSONParsing,
        o = !r && this.responseType === "json";
      if (o || (s && Ee.isString(t) && t.length))
        try {
          return JSON.parse(t);
        } catch (i) {
          if (o)
            throw i.name === "SyntaxError" ? hd(i, this, "E_JSON_PARSE") : i;
        }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
Ee.forEach(["delete", "get", "head"], function (t) {
  Rr.headers[t] = {};
});
Ee.forEach(["post", "put", "patch"], function (t) {
  Rr.headers[t] = Ee.merge(pd);
});
var to = Rr,
  yd = Pe,
  vd = to,
  bd = function (t, n, r) {
    var s = this || vd;
    return (
      yd.forEach(r, function (i) {
        t = i.call(s, t, n);
      }),
      t
    );
  },
  Gc = function (t) {
    return !!(t && t.__CANCEL__);
  },
  hi = Pe,
  qr = bd,
  _d = Gc,
  wd = to,
  Ed = Ar;
function Kr(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ed("canceled");
}
var Cd = function (t) {
    Kr(t),
      (t.headers = t.headers || {}),
      (t.data = qr.call(t, t.data, t.headers, t.transformRequest)),
      (t.headers = hi.merge(
        t.headers.common || {},
        t.headers[t.method] || {},
        t.headers
      )),
      hi.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function (s) {
          delete t.headers[s];
        }
      );
    var n = t.adapter || wd.adapter;
    return n(t).then(
      function (s) {
        return (
          Kr(t),
          (s.data = qr.call(t, s.data, s.headers, t.transformResponse)),
          s
        );
      },
      function (s) {
        return (
          _d(s) ||
            (Kr(t),
            s &&
              s.response &&
              (s.response.data = qr.call(
                t,
                s.response.data,
                s.response.headers,
                t.transformResponse
              ))),
          Promise.reject(s)
        );
      }
    );
  },
  Ne = Pe,
  ea = function (t, n) {
    n = n || {};
    var r = {};
    function s(l, f) {
      return Ne.isPlainObject(l) && Ne.isPlainObject(f)
        ? Ne.merge(l, f)
        : Ne.isPlainObject(f)
        ? Ne.merge({}, f)
        : Ne.isArray(f)
        ? f.slice()
        : f;
    }
    function o(l) {
      if (Ne.isUndefined(n[l])) {
        if (!Ne.isUndefined(t[l])) return s(void 0, t[l]);
      } else return s(t[l], n[l]);
    }
    function i(l) {
      if (!Ne.isUndefined(n[l])) return s(void 0, n[l]);
    }
    function c(l) {
      if (Ne.isUndefined(n[l])) {
        if (!Ne.isUndefined(t[l])) return s(void 0, t[l]);
      } else return s(void 0, n[l]);
    }
    function a(l) {
      if (l in n) return s(t[l], n[l]);
      if (l in t) return s(void 0, t[l]);
    }
    var u = {
      url: i,
      method: i,
      data: i,
      baseURL: c,
      transformRequest: c,
      transformResponse: c,
      paramsSerializer: c,
      timeout: c,
      timeoutMessage: c,
      withCredentials: c,
      adapter: c,
      responseType: c,
      xsrfCookieName: c,
      xsrfHeaderName: c,
      onUploadProgress: c,
      onDownloadProgress: c,
      decompress: c,
      maxContentLength: c,
      maxBodyLength: c,
      transport: c,
      httpAgent: c,
      httpsAgent: c,
      cancelToken: c,
      socketPath: c,
      responseEncoding: c,
      validateStatus: a,
    };
    return (
      Ne.forEach(Object.keys(t).concat(Object.keys(n)), function (f) {
        var d = u[f] || o,
          g = d(f);
        (Ne.isUndefined(g) && d !== a) || (r[f] = g);
      }),
      r
    );
  },
  ta = { version: "0.26.1" },
  xd = ta.version,
  no = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  function (e, t) {
    no[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
var di = {};
no.transitional = function (t, n, r) {
  function s(o, i) {
    return (
      "[Axios v" +
      xd +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return function (o, i, c) {
    if (t === !1)
      throw new Error(s(i, " has been removed" + (n ? " in " + n : "")));
    return (
      n &&
        !di[i] &&
        ((di[i] = !0),
        console.warn(
          s(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, c) : !0
    );
  };
};
function Ad(e, t, n) {
  if (typeof e != "object") throw new TypeError("options must be an object");
  for (var r = Object.keys(e), s = r.length; s-- > 0; ) {
    var o = r[s],
      i = t[o];
    if (i) {
      var c = e[o],
        a = c === void 0 || i(c, o, e);
      if (a !== !0) throw new TypeError("option " + o + " must be " + a);
      continue;
    }
    if (n !== !0) throw Error("Unknown option " + o);
  }
}
var Rd = { assertOptions: Ad, validators: no },
  na = Pe,
  Sd = Yc,
  pi = qh,
  mi = Cd,
  Sr = ea,
  ra = Rd,
  Kt = ra.validators;
function Bn(e) {
  (this.defaults = e),
    (this.interceptors = { request: new pi(), response: new pi() });
}
Bn.prototype.request = function (t, n) {
  typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
    (n = Sr(this.defaults, n)),
    n.method
      ? (n.method = n.method.toLowerCase())
      : this.defaults.method
      ? (n.method = this.defaults.method.toLowerCase())
      : (n.method = "get");
  var r = n.transitional;
  r !== void 0 &&
    ra.assertOptions(
      r,
      {
        silentJSONParsing: Kt.transitional(Kt.boolean),
        forcedJSONParsing: Kt.transitional(Kt.boolean),
        clarifyTimeoutError: Kt.transitional(Kt.boolean),
      },
      !1
    );
  var s = [],
    o = !0;
  this.interceptors.request.forEach(function (g) {
    (typeof g.runWhen == "function" && g.runWhen(n) === !1) ||
      ((o = o && g.synchronous), s.unshift(g.fulfilled, g.rejected));
  });
  var i = [];
  this.interceptors.response.forEach(function (g) {
    i.push(g.fulfilled, g.rejected);
  });
  var c;
  if (!o) {
    var a = [mi, void 0];
    for (
      Array.prototype.unshift.apply(a, s),
        a = a.concat(i),
        c = Promise.resolve(n);
      a.length;

    )
      c = c.then(a.shift(), a.shift());
    return c;
  }
  for (var u = n; s.length; ) {
    var l = s.shift(),
      f = s.shift();
    try {
      u = l(u);
    } catch (d) {
      f(d);
      break;
    }
  }
  try {
    c = mi(u);
  } catch (d) {
    return Promise.reject(d);
  }
  for (; i.length; ) c = c.then(i.shift(), i.shift());
  return c;
};
Bn.prototype.getUri = function (t) {
  return (
    (t = Sr(this.defaults, t)),
    Sd(t.url, t.params, t.paramsSerializer).replace(/^\?/, "")
  );
};
na.forEach(["delete", "get", "head", "options"], function (t) {
  Bn.prototype[t] = function (n, r) {
    return this.request(
      Sr(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
na.forEach(["post", "put", "patch"], function (t) {
  Bn.prototype[t] = function (n, r, s) {
    return this.request(Sr(s || {}, { method: t, url: n, data: r }));
  };
});
var Td = Bn,
  Pd = Ar;
function sn(e) {
  if (typeof e != "function")
    throw new TypeError("executor must be a function.");
  var t;
  this.promise = new Promise(function (s) {
    t = s;
  });
  var n = this;
  this.promise.then(function (r) {
    if (!!n._listeners) {
      var s,
        o = n._listeners.length;
      for (s = 0; s < o; s++) n._listeners[s](r);
      n._listeners = null;
    }
  }),
    (this.promise.then = function (r) {
      var s,
        o = new Promise(function (i) {
          n.subscribe(i), (s = i);
        }).then(r);
      return (
        (o.cancel = function () {
          n.unsubscribe(s);
        }),
        o
      );
    }),
    e(function (s) {
      n.reason || ((n.reason = new Pd(s)), t(n.reason));
    });
}
sn.prototype.throwIfRequested = function () {
  if (this.reason) throw this.reason;
};
sn.prototype.subscribe = function (t) {
  if (this.reason) {
    t(this.reason);
    return;
  }
  this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
};
sn.prototype.unsubscribe = function (t) {
  if (!!this._listeners) {
    var n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
};
sn.source = function () {
  var t,
    n = new sn(function (s) {
      t = s;
    });
  return { token: n, cancel: t };
};
var Od = sn,
  kd = function (t) {
    return function (r) {
      return t.apply(null, r);
    };
  },
  Nd = Pe,
  Id = function (t) {
    return Nd.isObject(t) && t.isAxiosError === !0;
  },
  gi = Pe,
  Bd = Vc,
  Jn = Td,
  Ld = ea,
  $d = to;
function sa(e) {
  var t = new Jn(e),
    n = Bd(Jn.prototype.request, t);
  return (
    gi.extend(n, Jn.prototype, t),
    gi.extend(n, t),
    (n.create = function (s) {
      return sa(Ld(e, s));
    }),
    n
  );
}
var Ge = sa($d);
Ge.Axios = Jn;
Ge.Cancel = Ar;
Ge.CancelToken = Od;
Ge.isCancel = Gc;
Ge.VERSION = ta.version;
Ge.all = function (t) {
  return Promise.all(t);
};
Ge.spread = kd;
Ge.isAxiosError = Id;
Qs.exports = Ge;
Qs.exports.default = Ge;
var oa = Qs.exports;
const Md = oa.create({
  baseURL: "https://pivpix.herokuapp.com/",
  headers: { "Content-Type": "application/json" },
});
async function Fd(e, t) {
  try {
    const n = await Md.post("criar-pagamento", {
      nome_produto: e,
      valor: t.toFixed(2),
    });
    return (
      window.sessionStorage.setItem("pixid", n.data.pix.txid),
      n.data.qrcode.imagemQrcode
    );
  } catch (n) {
    console.error(n);
  }
}
const ro = Oc({
  id: "cart",
  state: () => ({
    products: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {},
    loading: !1,
  }),
  getters: {
    priceTotal() {
      const e = ir();
      return Object.keys(this.products).reduce(
        (t, n) => t + e.items[n].price * this.products[n].quantity,
        0
      );
    },
    count() {
      return Object.keys(this.products).length;
    },
    list() {
      const e = ir();
      return e.loaded
        ? Object.keys(this.products).map((t) => {
            const n = this.products[t];
            return {
              id: n.id,
              image: e.items[n.id].image,
              name: e.items[n.id].name,
              quantity: n.quantity,
              price: n.quantity * e.items[n.id].price,
            };
          })
        : [];
    },
  },
  actions: {
    addToCart(e) {
      this.products[e]
        ? (this.products[e].quantity += 1)
        : (this.products[e] = { id: e, quantity: 1 }),
        localStorage.setItem("cart", JSON.stringify(this.products));
    },
    removeFromCart(e) {
      !this.products[e] ||
        ((this.products[e].quantity -= 1),
        this.products[e].quantity === 0 && delete this.products[e],
        localStorage.setItem("cart", JSON.stringify(this.products)));
    },
    async checkout() {
      if (this.count < 0) return;
      this.loading = !0;
      const e = dr();
      try {
        e.value = await Fd(`Pedido ${new Date()}`, this.priceTotal);
      } catch (t) {
        console.error(t);
        return;
      }
      return (
        (this.loading = !1),
        (this.products = {}),
        localStorage.removeItem("cart"),
        e.value
      );
    },
    countItem(e) {
      return this.products[e] ? this.products[e].quantity : 0;
    },
  },
});
var jd = "/static/images/logo_pra_mia.png";
const Dd = {
    class: "h-[90vh] flex flex-col gap-5 items-center justify-center",
  },
  Ud = Z("img", { src: jd, alt: "ONG Pra Mia", class: "w-2/4" }, null, -1),
  Hd = Z(
    "p",
    null,
    [
      xt(
        " Transformando a Vida de Animais em Situa\xE7\xE3o de Vulnerabilidade. "
      ),
      Z("br"),
      xt(" Adquira uma quantidade de alimento para pet e apoie esta causa. "),
    ],
    -1
  ),
  qd = Z("button", { class: "btn-primary" }, "Apoiar a ONG", -1),
  Kd = Ze({
    setup(e) {
      return (t, n) => (
        pe(),
        _e("div", Dd, [
          Ud,
          Hd,
          me(J(Sn), { to: "/produtos" }, { default: Bt(() => [qd]), _: 1 }),
        ])
      );
    },
  }),
  ia = (e) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(e);
const Vd = ["src", "alt"],
  zd = { class: "details" },
  Wd = { class: "group-buttons", role: "group" },
  Jd = ["value"],
  Yd = Ze({
    props: { product: null },
    setup(e) {
      const t = ro(),
        n =
          "https://raw.githubusercontent.com/savifon/UCL-2022-1-PIV-App/master/src/assets/images/",
        r = Ce(() => Pr.currentRoute.value.path);
      return (s, o) => (
        pe(),
        _e(
          "div",
          {
            class: cr([
              "product-item",
              { "product-item-cart": J(r) === "/pedido" },
            ]),
          },
          [
            Z(
              "img",
              { src: n + e.product.image, alt: e.product.name },
              null,
              8,
              Vd
            ),
            Z("div", zd, [
              Z("p", null, yt(e.product.name), 1),
              Z("p", null, yt(J(ia)(e.product.price)), 1),
              Z("div", Wd, [
                Z(
                  "button",
                  {
                    type: "button",
                    onClick:
                      o[0] || (o[0] = (i) => J(t).removeFromCart(e.product.id)),
                  },
                  " - "
                ),
                Z(
                  "input",
                  {
                    type: "text",
                    disabled: "",
                    value: J(t).countItem(e.product.id),
                  },
                  null,
                  8,
                  Jd
                ),
                Z(
                  "button",
                  {
                    type: "button",
                    class: "add",
                    onClick:
                      o[1] || (o[1] = (i) => J(t).addToCart(e.product.id)),
                  },
                  " + "
                ),
              ]),
            ]),
          ],
          2
        )
      );
    },
  });
var Xd = Mt(Yd, [["__scopeId", "data-v-6382bf2d"]]);
const ca = Ze({
  props: { products: null },
  setup(e) {
    return (t, n) => (
      pe(!0),
      _e(
        Te,
        null,
        lu(
          e.products,
          (r) => (
            pe(),
            Zt(Xd, { key: `product-item-${r.id}`, product: r }, null, 8, [
              "product",
            ])
          )
        ),
        128
      )
    );
  },
});
const Qd = { class: "product-list" },
  Zd = Ze({
    setup(e) {
      const t = ir(),
        n = Ce(() => t.list);
      return (r, s) => (
        pe(), _e("div", Qd, [me(ca, { products: J(n) }, null, 8, ["products"])])
      );
    },
  });
var Gd = Mt(Zd, [["__scopeId", "data-v-2f4123e4"]]);
/*!
 * Socket.IO v4.4.1
 * (c) 2014-2022 Guillermo Rauch
 * Released under the MIT License.
 */ var ep =
    /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  tp = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ],
  gs = function (e) {
    var t = e,
      n = e.indexOf("["),
      r = e.indexOf("]");
    n != -1 &&
      r != -1 &&
      (e =
        e.substring(0, n) +
        e.substring(n, r).replace(/:/g, ";") +
        e.substring(r, e.length));
    for (var s, o, i = ep.exec(e || ""), c = {}, a = 14; a--; )
      c[tp[a]] = i[a] || "";
    return (
      n != -1 &&
        r != -1 &&
        ((c.source = t),
        (c.host = c.host.substring(1, c.host.length - 1).replace(/;/g, ":")),
        (c.authority = c.authority
          .replace("[", "")
          .replace("]", "")
          .replace(/;/g, ":")),
        (c.ipv6uri = !0)),
      (c.pathNames = (function (u, l) {
        var f = /\/{2,9}/g,
          d = l.replace(f, "/").split("/");
        return (
          (l.substr(0, 1) != "/" && l.length !== 0) || d.splice(0, 1),
          l.substr(l.length - 1, 1) == "/" && d.splice(d.length - 1, 1),
          d
        );
      })(0, c.path)),
      (c.queryKey =
        ((s = c.query),
        (o = {}),
        s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (u, l, f) {
          l && (o[l] = f);
        }),
        o)),
      c
    );
  },
  ys = { exports: {} };
try {
  ys.exports =
    typeof XMLHttpRequest != "undefined" &&
    "withCredentials" in new XMLHttpRequest();
} catch {
  ys.exports = !1;
}
var np = ys.exports,
  vt =
    typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : Function("return this")();
function aa(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest != "undefined" && (!t || np))
      return new XMLHttpRequest();
  } catch {}
  if (!t)
    try {
      return new vt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {}
}
function la(e, ...t) {
  return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {});
}
const rp = setTimeout,
  sp = clearTimeout;
function Tr(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = rp.bind(vt)), (e.clearTimeoutFn = sp.bind(vt)))
    : ((e.setTimeoutFn = setTimeout.bind(vt)),
      (e.clearTimeoutFn = clearTimeout.bind(vt)));
}
var un = Re;
function Re(e) {
  if (e)
    return (function (t) {
      for (var n in Re.prototype) t[n] = Re.prototype[n];
      return t;
    })(e);
}
(Re.prototype.on = Re.prototype.addEventListener =
  function (e, t) {
    return (
      (this._callbacks = this._callbacks || {}),
      (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
      this
    );
  }),
  (Re.prototype.once = function (e, t) {
    function n() {
      this.off(e, n), t.apply(this, arguments);
    }
    return (n.fn = t), this.on(e, n), this;
  }),
  (Re.prototype.off =
    Re.prototype.removeListener =
    Re.prototype.removeAllListeners =
    Re.prototype.removeEventListener =
      function (e, t) {
        if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
          return (this._callbacks = {}), this;
        var n,
          r = this._callbacks["$" + e];
        if (!r) return this;
        if (arguments.length == 1) return delete this._callbacks["$" + e], this;
        for (var s = 0; s < r.length; s++)
          if ((n = r[s]) === t || n.fn === t) {
            r.splice(s, 1);
            break;
          }
        return r.length === 0 && delete this._callbacks["$" + e], this;
      }),
  (Re.prototype.emit = function (e) {
    this._callbacks = this._callbacks || {};
    for (
      var t = new Array(arguments.length - 1),
        n = this._callbacks["$" + e],
        r = 1;
      r < arguments.length;
      r++
    )
      t[r - 1] = arguments[r];
    if (n) {
      r = 0;
      for (var s = (n = n.slice(0)).length; r < s; ++r) n[r].apply(this, t);
    }
    return this;
  }),
  (Re.prototype.emitReserved = Re.prototype.emit),
  (Re.prototype.listeners = function (e) {
    return (
      (this._callbacks = this._callbacks || {}), this._callbacks["$" + e] || []
    );
  }),
  (Re.prototype.hasListeners = function (e) {
    return !!this.listeners(e).length;
  });
const Ve = Object.create(null);
(Ve.open = "0"),
  (Ve.close = "1"),
  (Ve.ping = "2"),
  (Ve.pong = "3"),
  (Ve.message = "4"),
  (Ve.upgrade = "5"),
  (Ve.noop = "6");
const Yn = Object.create(null);
Object.keys(Ve).forEach((e) => {
  Yn[Ve[e]] = e;
});
const op = { type: "error", data: "parser error" },
  ip =
    typeof Blob == "function" ||
    (typeof Blob != "undefined" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  cp = typeof ArrayBuffer == "function",
  ua = ({ type: e, data: t }, n, r) => {
    return ip && t instanceof Blob
      ? n
        ? r(t)
        : yi(t, r)
      : cp &&
        (t instanceof ArrayBuffer ||
          ((s = t),
          typeof ArrayBuffer.isView == "function"
            ? ArrayBuffer.isView(s)
            : s && s.buffer instanceof ArrayBuffer))
      ? n
        ? r(t)
        : yi(new Blob([t]), r)
      : r(Ve[e] + (t || ""));
    var s;
  },
  yi = (e, t) => {
    const n = new FileReader();
    return (
      (n.onload = function () {
        const r = n.result.split(",")[1];
        t("b" + r);
      }),
      n.readAsDataURL(e)
    );
  };
for (
  var vi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    vn = typeof Uint8Array == "undefined" ? [] : new Uint8Array(256),
    qn = 0;
  qn < vi.length;
  qn++
)
  vn[vi.charCodeAt(qn)] = qn;
const ap = typeof ArrayBuffer == "function",
  fa = (e, t) => {
    if (typeof e != "string") return { type: "message", data: ha(e, t) };
    const n = e.charAt(0);
    return n === "b"
      ? { type: "message", data: lp(e.substring(1), t) }
      : Yn[n]
      ? e.length > 1
        ? { type: Yn[n], data: e.substring(1) }
        : { type: Yn[n] }
      : op;
  },
  lp = (e, t) => {
    if (ap) {
      const n = (function (r) {
        var s,
          o,
          i,
          c,
          a,
          u = 0.75 * r.length,
          l = r.length,
          f = 0;
        r[r.length - 1] === "=" && (u--, r[r.length - 2] === "=" && u--);
        var d = new ArrayBuffer(u),
          g = new Uint8Array(d);
        for (s = 0; s < l; s += 4)
          (o = vn[r.charCodeAt(s)]),
            (i = vn[r.charCodeAt(s + 1)]),
            (c = vn[r.charCodeAt(s + 2)]),
            (a = vn[r.charCodeAt(s + 3)]),
            (g[f++] = (o << 2) | (i >> 4)),
            (g[f++] = ((15 & i) << 4) | (c >> 2)),
            (g[f++] = ((3 & c) << 6) | (63 & a));
        return d;
      })(e);
      return ha(n, t);
    }
    return { base64: !0, data: e };
  },
  ha = (e, t) => (t === "blob" && e instanceof ArrayBuffer ? new Blob([e]) : e),
  bi = String.fromCharCode(30);
class da extends un {
  constructor(t) {
    super(),
      (this.writable = !1),
      Tr(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.readyState = ""),
      (this.socket = t.socket);
  }
  onError(t, n) {
    const r = new Error(t);
    return (
      (r.type = "TransportError"),
      (r.description = n),
      super.emit("error", r),
      this
    );
  }
  open() {
    return (
      (this.readyState !== "closed" && this.readyState !== "") ||
        ((this.readyState = "opening"), this.doOpen()),
      this
    );
  }
  close() {
    return (
      (this.readyState !== "opening" && this.readyState !== "open") ||
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  onOpen() {
    (this.readyState = "open"), (this.writable = !0), super.emit("open");
  }
  onData(t) {
    const n = fa(t, this.socket.binaryType);
    this.onPacket(n);
  }
  onPacket(t) {
    super.emit("packet", t);
  }
  onClose() {
    (this.readyState = "closed"), super.emit("close");
  }
}
var _i,
  pa = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
    ""
  ),
  ma = {},
  wi = 0,
  bt = 0;
function vs(e) {
  var t = "";
  do (t = pa[e % 64] + t), (e = Math.floor(e / 64));
  while (e > 0);
  return t;
}
function bs() {
  var e = vs(+new Date());
  return e !== _i ? ((wi = 0), (_i = e)) : e + "." + vs(wi++);
}
for (; bt < 64; bt++) ma[pa[bt]] = bt;
(bs.encode = vs),
  (bs.decode = function (e) {
    var t = 0;
    for (bt = 0; bt < e.length; bt++) t = 64 * t + ma[e.charAt(bt)];
    return t;
  });
var ga = bs,
  so = {
    encode: function (e) {
      var t = "";
      for (var n in e)
        e.hasOwnProperty(n) &&
          (t.length && (t += "&"),
          (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
      return t;
    },
    decode: function (e) {
      for (var t = {}, n = e.split("&"), r = 0, s = n.length; r < s; r++) {
        var o = n[r].split("=");
        t[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
      }
      return t;
    },
  };
class up extends da {
  constructor() {
    super(...arguments), (this.polling = !1);
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this.poll();
  }
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      (this.readyState = "paused"), t();
    };
    if (this.polling || !this.writable) {
      let r = 0;
      this.polling &&
        (r++,
        this.once("pollComplete", function () {
          --r || n();
        })),
        this.writable ||
          (r++,
          this.once("drain", function () {
            --r || n();
          }));
    } else n();
  }
  poll() {
    (this.polling = !0), this.doPoll(), this.emit("poll");
  }
  onData(t) {
    ((n, r) => {
      const s = n.split(bi),
        o = [];
      for (let i = 0; i < s.length; i++) {
        const c = fa(s[i], r);
        if ((o.push(c), c.type === "error")) break;
      }
      return o;
    })(t, this.socket.binaryType).forEach((n) => {
      if (
        (this.readyState === "opening" && n.type === "open" && this.onOpen(),
        n.type === "close")
      )
        return this.onClose(), !1;
      this.onPacket(n);
    }),
      this.readyState !== "closed" &&
        ((this.polling = !1),
        this.emit("pollComplete"),
        this.readyState === "open" && this.poll());
  }
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  write(t) {
    (this.writable = !1),
      ((n, r) => {
        const s = n.length,
          o = new Array(s);
        let i = 0;
        n.forEach((c, a) => {
          ua(c, !1, (u) => {
            (o[a] = u), ++i === s && r(o.join(bi));
          });
        });
      })(t, (n) => {
        this.doWrite(n, () => {
          (this.writable = !0), this.emit("drain");
        });
      });
  }
  uri() {
    let t = this.query || {};
    const n = this.opts.secure ? "https" : "http";
    let r = "";
    this.opts.timestampRequests !== !1 && (t[this.opts.timestampParam] = ga()),
      this.supportsBinary || t.sid || (t.b64 = 1),
      this.opts.port &&
        ((n === "https" && Number(this.opts.port) !== 443) ||
          (n === "http" && Number(this.opts.port) !== 80)) &&
        (r = ":" + this.opts.port);
    const s = so.encode(t);
    return (
      n +
      "://" +
      (this.opts.hostname.indexOf(":") !== -1
        ? "[" + this.opts.hostname + "]"
        : this.opts.hostname) +
      r +
      this.opts.path +
      (s.length ? "?" + s : "")
    );
  }
}
function fp() {}
const hp = new aa({ xdomain: !1 }).responseType != null;
class Ye extends un {
  constructor(t, n) {
    super(),
      Tr(this, n),
      (this.opts = n),
      (this.method = n.method || "GET"),
      (this.uri = t),
      (this.async = n.async !== !1),
      (this.data = n.data !== void 0 ? n.data : null),
      this.create();
  }
  create() {
    const t = la(
      this.opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref"
    );
    (t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs);
    const n = (this.xhr = new aa(t));
    try {
      n.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0);
          for (let r in this.opts.extraHeaders)
            this.opts.extraHeaders.hasOwnProperty(r) &&
              n.setRequestHeader(r, this.opts.extraHeaders[r]);
        }
      } catch {}
      if (this.method === "POST")
        try {
          n.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {}
      try {
        n.setRequestHeader("Accept", "*/*");
      } catch {}
      "withCredentials" in n && (n.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (n.timeout = this.opts.requestTimeout),
        (n.onreadystatechange = () => {
          n.readyState === 4 &&
            (n.status === 200 || n.status === 1223
              ? this.onLoad()
              : this.setTimeoutFn(() => {
                  this.onError(typeof n.status == "number" ? n.status : 0);
                }, 0));
        }),
        n.send(this.data);
    } catch (r) {
      return void this.setTimeoutFn(() => {
        this.onError(r);
      }, 0);
    }
    typeof document != "undefined" &&
      ((this.index = Ye.requestsCount++), (Ye.requests[this.index] = this));
  }
  onSuccess() {
    this.emit("success"), this.cleanup();
  }
  onData(t) {
    this.emit("data", t), this.onSuccess();
  }
  onError(t) {
    this.emit("error", t), this.cleanup(!0);
  }
  cleanup(t) {
    if (this.xhr !== void 0 && this.xhr !== null) {
      if (((this.xhr.onreadystatechange = fp), t))
        try {
          this.xhr.abort();
        } catch {}
      typeof document != "undefined" && delete Ye.requests[this.index],
        (this.xhr = null);
    }
  }
  onLoad() {
    const t = this.xhr.responseText;
    t !== null && this.onData(t);
  }
  abort() {
    this.cleanup();
  }
}
(Ye.requestsCount = 0),
  (Ye.requests = {}),
  typeof document != "undefined" &&
    (typeof attachEvent == "function"
      ? attachEvent("onunload", Ei)
      : typeof addEventListener == "function" &&
        addEventListener("onpagehide" in vt ? "pagehide" : "unload", Ei, !1));
function Ei() {
  for (let e in Ye.requests)
    Ye.requests.hasOwnProperty(e) && Ye.requests[e].abort();
}
const dp =
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? (e) => Promise.resolve().then(e)
      : (e, t) => t(e, 0),
  pn = vt.WebSocket || vt.MozWebSocket,
  Ci =
    typeof navigator != "undefined" &&
    typeof navigator.product == "string" &&
    navigator.product.toLowerCase() === "reactnative";
class oo extends da {
  constructor(t) {
    super(t), (this.supportsBinary = !t.forceBase64);
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) return;
    const t = this.uri(),
      n = this.opts.protocols,
      r = Ci
        ? {}
        : la(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity"
          );
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = Ci ? new pn(t, n, r) : n ? new pn(t, n) : new pn(t);
    } catch (s) {
      return this.emit("error", s);
    }
    (this.ws.binaryType = this.socket.binaryType || "arraybuffer"),
      this.addEventListeners();
  }
  addEventListeners() {
    (this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }),
      (this.ws.onclose = this.onClose.bind(this)),
      (this.ws.onmessage = (t) => this.onData(t.data)),
      (this.ws.onerror = (t) => this.onError("websocket error", t));
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        s = n === t.length - 1;
      ua(r, this.supportsBinary, (o) => {
        try {
          this.ws.send(o);
        } catch {}
        s &&
          dp(() => {
            (this.writable = !0), this.emit("drain");
          }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    this.ws !== void 0 && (this.ws.close(), (this.ws = null));
  }
  uri() {
    let t = this.query || {};
    const n = this.opts.secure ? "wss" : "ws";
    let r = "";
    this.opts.port &&
      ((n === "wss" && Number(this.opts.port) !== 443) ||
        (n === "ws" && Number(this.opts.port) !== 80)) &&
      (r = ":" + this.opts.port),
      this.opts.timestampRequests && (t[this.opts.timestampParam] = ga()),
      this.supportsBinary || (t.b64 = 1);
    const s = so.encode(t);
    return (
      n +
      "://" +
      (this.opts.hostname.indexOf(":") !== -1
        ? "[" + this.opts.hostname + "]"
        : this.opts.hostname) +
      r +
      this.opts.path +
      (s.length ? "?" + s : "")
    );
  }
  check() {
    return !(!pn || ("__initialize" in pn && this.name === oo.prototype.name));
  }
}
const pp = {
  websocket: oo,
  polling: class extends up {
    constructor(e) {
      if ((super(e), typeof location != "undefined")) {
        const n = location.protocol === "https:";
        let r = location.port;
        r || (r = n ? "443" : "80"),
          (this.xd =
            (typeof location != "undefined" &&
              e.hostname !== location.hostname) ||
            r !== e.port),
          (this.xs = e.secure !== n);
      }
      const t = e && e.forceBase64;
      this.supportsBinary = hp && !t;
    }
    request(e = {}) {
      return (
        Object.assign(e, { xd: this.xd, xs: this.xs }, this.opts),
        new Ye(this.uri(), e)
      );
    }
    doWrite(e, t) {
      const n = this.request({ method: "POST", data: e });
      n.on("success", t),
        n.on("error", (r) => {
          this.onError("xhr post error", r);
        });
    }
    doPoll() {
      const e = this.request();
      e.on("data", this.onData.bind(this)),
        e.on("error", (t) => {
          this.onError("xhr poll error", t);
        }),
        (this.pollXhr = e);
    }
  },
};
class gt extends un {
  constructor(t, n = {}) {
    super(),
      t && typeof t == "object" && ((n = t), (t = null)),
      t
        ? ((t = gs(t)),
          (n.hostname = t.host),
          (n.secure = t.protocol === "https" || t.protocol === "wss"),
          (n.port = t.port),
          t.query && (n.query = t.query))
        : n.host && (n.hostname = gs(n.host).host),
      Tr(this, n),
      (this.secure =
        n.secure != null
          ? n.secure
          : typeof location != "undefined" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname =
        n.hostname ||
        (typeof location != "undefined" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location != "undefined" && location.port
          ? location.port
          : this.secure
          ? "443"
          : "80")),
      (this.transports = n.transports || ["polling", "websocket"]),
      (this.readyState = ""),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !0,
        },
        n
      )),
      (this.opts.path = this.opts.path.replace(/\/$/, "") + "/"),
      typeof this.opts.query == "string" &&
        (this.opts.query = so.decode(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      typeof addEventListener == "function" &&
        (this.opts.closeOnBeforeunload &&
          addEventListener(
            "beforeunload",
            () => {
              this.transport &&
                (this.transport.removeAllListeners(), this.transport.close());
            },
            !1
          ),
        this.hostname !== "localhost" &&
          ((this.offlineEventListener = () => {
            this.onClose("transport close");
          }),
          addEventListener("offline", this.offlineEventListener, !1))),
      this.open();
  }
  createTransport(t) {
    const n = (function (s) {
      const o = {};
      for (let i in s) s.hasOwnProperty(i) && (o[i] = s[i]);
      return o;
    })(this.opts.query);
    (n.EIO = 4), (n.transport = t), this.id && (n.sid = this.id);
    const r = Object.assign({}, this.opts.transportOptions[t], this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port,
    });
    return new pp[t](r);
  }
  open() {
    let t;
    if (
      this.opts.rememberUpgrade &&
      gt.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
    )
      t = "websocket";
    else {
      if (this.transports.length === 0)
        return void this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
      t = this.transports[0];
    }
    this.readyState = "opening";
    try {
      t = this.createTransport(t);
    } catch {
      return this.transports.shift(), void this.open();
    }
    t.open(), this.setTransport(t);
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on("drain", this.onDrain.bind(this))
        .on("packet", this.onPacket.bind(this))
        .on("error", this.onError.bind(this))
        .on("close", () => {
          this.onClose("transport close");
        });
  }
  probe(t) {
    let n = this.createTransport(t),
      r = !1;
    gt.priorWebsocketSuccess = !1;
    const s = () => {
      r ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", (f) => {
          if (!r)
            if (f.type === "pong" && f.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", n), !n)
              )
                return;
              (gt.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  r ||
                    (this.readyState !== "closed" &&
                      (l(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()));
                });
            } else {
              const d = new Error("probe error");
              (d.transport = n.name), this.emitReserved("upgradeError", d);
            }
        }));
    };
    function o() {
      r || ((r = !0), l(), n.close(), (n = null));
    }
    const i = (f) => {
      const d = new Error("probe error: " + f);
      (d.transport = n.name), o(), this.emitReserved("upgradeError", d);
    };
    function c() {
      i("transport closed");
    }
    function a() {
      i("socket closed");
    }
    function u(f) {
      n && f.name !== n.name && o();
    }
    const l = () => {
      n.removeListener("open", s),
        n.removeListener("error", i),
        n.removeListener("close", c),
        this.off("close", a),
        this.off("upgrading", u);
    };
    n.once("open", s),
      n.once("error", i),
      n.once("close", c),
      this.once("close", a),
      this.once("upgrading", u),
      n.open();
  }
  onOpen() {
    if (
      ((this.readyState = "open"),
      (gt.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush(),
      this.readyState === "open" && this.opts.upgrade && this.transport.pause)
    ) {
      let t = 0;
      const n = this.upgrades.length;
      for (; t < n; t++) this.probe(this.upgrades[t]);
    }
  }
  onPacket(t) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this.resetPingTimeout(),
            this.sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong");
          break;
        case "error":
          const n = new Error("server error");
          (n.code = t.data), this.onError(n);
          break;
        case "message":
          this.emitReserved("data", t.data),
            this.emitReserved("message", t.data);
      }
  }
  onHandshake(t) {
    this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this.upgrades = this.filterUpgrades(t.upgrades)),
      (this.pingInterval = t.pingInterval),
      (this.pingTimeout = t.pingTimeout),
      this.onOpen(),
      this.readyState !== "closed" && this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose("ping timeout");
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref();
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  flush() {
    this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length &&
      (this.transport.send(this.writeBuffer),
      (this.prevBufferLen = this.writeBuffer.length),
      this.emitReserved("flush"));
  }
  write(t, n, r) {
    return this.sendPacket("message", t, n, r), this;
  }
  send(t, n, r) {
    return this.sendPacket("message", t, n, r), this;
  }
  sendPacket(t, n, r, s) {
    if (
      (typeof n == "function" && ((s = n), (n = void 0)),
      typeof r == "function" && ((s = r), (r = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return;
    (r = r || {}).compress = r.compress !== !1;
    const o = { type: t, data: n, options: r };
    this.emitReserved("packetCreate", o),
      this.writeBuffer.push(o),
      s && this.once("flush", s),
      this.flush();
  }
  close() {
    const t = () => {
        this.onClose("forced close"), this.transport.close();
      },
      n = () => {
        this.off("upgrade", n), this.off("upgradeError", n), t();
      },
      r = () => {
        this.once("upgrade", n), this.once("upgradeError", n);
      };
    return (
      (this.readyState !== "opening" && this.readyState !== "open") ||
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? r() : t();
            })
          : this.upgrading
          ? r()
          : t()),
      this
    );
  }
  onError(t) {
    (gt.priorWebsocketSuccess = !1),
      this.emitReserved("error", t),
      this.onClose("transport error", t);
  }
  onClose(t, n) {
    (this.readyState !== "opening" &&
      this.readyState !== "open" &&
      this.readyState !== "closing") ||
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners("close"),
      this.transport.close(),
      this.transport.removeAllListeners(),
      typeof removeEventListener == "function" &&
        removeEventListener("offline", this.offlineEventListener, !1),
      (this.readyState = "closed"),
      (this.id = null),
      this.emitReserved("close", t, n),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0));
  }
  filterUpgrades(t) {
    const n = [];
    let r = 0;
    const s = t.length;
    for (; r < s; r++) ~this.transports.indexOf(t[r]) && n.push(t[r]);
    return n;
  }
}
gt.protocol = 4;
const mp = typeof ArrayBuffer == "function",
  ya = Object.prototype.toString,
  gp =
    typeof Blob == "function" ||
    (typeof Blob != "undefined" &&
      ya.call(Blob) === "[object BlobConstructor]"),
  yp =
    typeof File == "function" ||
    (typeof File != "undefined" &&
      ya.call(File) === "[object FileConstructor]");
function io(e) {
  return (
    (mp &&
      (e instanceof ArrayBuffer ||
        ((t) =>
          typeof ArrayBuffer.isView == "function"
            ? ArrayBuffer.isView(t)
            : t.buffer instanceof ArrayBuffer)(e))) ||
    (gp && e instanceof Blob) ||
    (yp && e instanceof File)
  );
}
function Xn(e, t) {
  if (!e || typeof e != "object") return !1;
  if (Array.isArray(e)) {
    for (let n = 0, r = e.length; n < r; n++) if (Xn(e[n])) return !0;
    return !1;
  }
  if (io(e)) return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return Xn(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && Xn(e[n])) return !0;
  return !1;
}
function vp(e) {
  const t = [],
    n = e.data,
    r = e;
  return (
    (r.data = _s(n, t)), (r.attachments = t.length), { packet: r, buffers: t }
  );
}
function _s(e, t) {
  if (!e) return e;
  if (io(e)) {
    const n = { _placeholder: !0, num: t.length };
    return t.push(e), n;
  }
  if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let r = 0; r < e.length; r++) n[r] = _s(e[r], t);
    return n;
  }
  if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const r in e) e.hasOwnProperty(r) && (n[r] = _s(e[r], t));
    return n;
  }
  return e;
}
function bp(e, t) {
  return (e.data = ws(e.data, t)), (e.attachments = void 0), e;
}
function ws(e, t) {
  if (!e) return e;
  if (e && e._placeholder) return t[e.num];
  if (Array.isArray(e)) for (let n = 0; n < e.length; n++) e[n] = ws(e[n], t);
  else if (typeof e == "object")
    for (const n in e) e.hasOwnProperty(n) && (e[n] = ws(e[n], t));
  return e;
}
var X;
(function (e) {
  (e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK");
})(X || (X = {}));
class co extends un {
  constructor() {
    super();
  }
  add(t) {
    let n;
    if (typeof t == "string")
      (n = this.decodeString(t)),
        n.type === X.BINARY_EVENT || n.type === X.BINARY_ACK
          ? ((this.reconstructor = new _p(n)),
            n.attachments === 0 && super.emitReserved("decoded", n))
          : super.emitReserved("decoded", n);
    else {
      if (!io(t) && !t.base64) throw new Error("Unknown type: " + t);
      if (!this.reconstructor)
        throw new Error("got binary data when not reconstructing a packet");
      (n = this.reconstructor.takeBinaryData(t)),
        n && ((this.reconstructor = null), super.emitReserved("decoded", n));
    }
  }
  decodeString(t) {
    let n = 0;
    const r = { type: Number(t.charAt(0)) };
    if (X[r.type] === void 0) throw new Error("unknown packet type " + r.type);
    if (r.type === X.BINARY_EVENT || r.type === X.BINARY_ACK) {
      const o = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; );
      const i = t.substring(o, n);
      if (i != Number(i) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(i);
    }
    if (t.charAt(n + 1) === "/") {
      const o = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); );
      r.nsp = t.substring(o, n);
    } else r.nsp = "/";
    const s = t.charAt(n + 1);
    if (s !== "" && Number(s) == s) {
      const o = n + 1;
      for (; ++n; ) {
        const i = t.charAt(n);
        if (i == null || Number(i) != i) {
          --n;
          break;
        }
        if (n === t.length) break;
      }
      r.id = Number(t.substring(o, n + 1));
    }
    if (t.charAt(++n)) {
      const o = (function (i) {
        try {
          return JSON.parse(i);
        } catch {
          return !1;
        }
      })(t.substr(n));
      if (!co.isPayloadValid(r.type, o)) throw new Error("invalid payload");
      r.data = o;
    }
    return r;
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case X.CONNECT:
        return typeof n == "object";
      case X.DISCONNECT:
        return n === void 0;
      case X.CONNECT_ERROR:
        return typeof n == "string" || typeof n == "object";
      case X.EVENT:
      case X.BINARY_EVENT:
        return Array.isArray(n) && n.length > 0;
      case X.ACK:
      case X.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  destroy() {
    this.reconstructor && this.reconstructor.finishedReconstruction();
  }
}
class _p {
  constructor(t) {
    (this.packet = t), (this.buffers = []), (this.reconPack = t);
  }
  takeBinaryData(t) {
    if (
      (this.buffers.push(t), this.buffers.length === this.reconPack.attachments)
    ) {
      const n = bp(this.reconPack, this.buffers);
      return this.finishedReconstruction(), n;
    }
    return null;
  }
  finishedReconstruction() {
    (this.reconPack = null), (this.buffers = []);
  }
}
var wp = Object.freeze({
  __proto__: null,
  protocol: 5,
  get PacketType() {
    return X;
  },
  Encoder: class {
    encode(e) {
      return (e.type !== X.EVENT && e.type !== X.ACK) || !Xn(e)
        ? [this.encodeAsString(e)]
        : ((e.type = e.type === X.EVENT ? X.BINARY_EVENT : X.BINARY_ACK),
          this.encodeAsBinary(e));
    }
    encodeAsString(e) {
      let t = "" + e.type;
      return (
        (e.type !== X.BINARY_EVENT && e.type !== X.BINARY_ACK) ||
          (t += e.attachments + "-"),
        e.nsp && e.nsp !== "/" && (t += e.nsp + ","),
        e.id != null && (t += e.id),
        e.data != null && (t += JSON.stringify(e.data)),
        t
      );
    }
    encodeAsBinary(e) {
      const t = vp(e),
        n = this.encodeAsString(t.packet),
        r = t.buffers;
      return r.unshift(n), r;
    }
  },
  Decoder: co,
});
function je(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n);
    }
  );
}
const Ep = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class va extends un {
  constructor(t, n, r) {
    super(),
      (this.connected = !1),
      (this.disconnected = !0),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = n),
      r && r.auth && (this.auth = r.auth),
      this.io._autoConnect && this.open();
  }
  subEvents() {
    if (this.subs) return;
    const t = this.io;
    this.subs = [
      je(t, "open", this.onopen.bind(this)),
      je(t, "packet", this.onpacket.bind(this)),
      je(t, "error", this.onerror.bind(this)),
      je(t, "close", this.onclose.bind(this)),
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return (
      this.connected ||
        (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen()),
      this
    );
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
  }
  emit(t, ...n) {
    if (Ep.hasOwnProperty(t))
      throw new Error('"' + t + '" is a reserved event name');
    n.unshift(t);
    const r = { type: X.EVENT, data: n, options: {} };
    if (
      ((r.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const o = this.ids++,
        i = n.pop();
      this._registerAckCallback(o, i), (r.id = o);
    }
    const s =
      this.io.engine &&
      this.io.engine.transport &&
      this.io.engine.transport.writable;
    return (
      (this.flags.volatile && (!s || !this.connected)) ||
        (this.connected ? this.packet(r) : this.sendBuffer.push(r)),
      (this.flags = {}),
      this
    );
  }
  _registerAckCallback(t, n) {
    const r = this.flags.timeout;
    if (r === void 0) return void (this.acks[t] = n);
    const s = this.io.setTimeoutFn(() => {
      delete this.acks[t];
      for (let o = 0; o < this.sendBuffer.length; o++)
        this.sendBuffer[o].id === t && this.sendBuffer.splice(o, 1);
      n.call(this, new Error("operation has timed out"));
    }, r);
    this.acks[t] = (...o) => {
      this.io.clearTimeoutFn(s), n.apply(this, [null, ...o]);
    };
  }
  packet(t) {
    (t.nsp = this.nsp), this.io._packet(t);
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth((t) => {
          this.packet({ type: X.CONNECT, data: t });
        })
      : this.packet({ type: X.CONNECT, data: this.auth });
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  onclose(t) {
    (this.connected = !1),
      (this.disconnected = !0),
      delete this.id,
      this.emitReserved("disconnect", t);
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case X.CONNECT:
          if (t.data && t.data.sid) {
            const r = t.data.sid;
            this.onconnect(r);
          } else
            this.emitReserved(
              "connect_error",
              new Error(
                "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
              )
            );
          break;
        case X.EVENT:
        case X.BINARY_EVENT:
          this.onevent(t);
          break;
        case X.ACK:
        case X.BINARY_ACK:
          this.onack(t);
          break;
        case X.DISCONNECT:
          this.ondisconnect();
          break;
        case X.CONNECT_ERROR:
          this.destroy();
          const n = new Error(t.data.message);
          (n.data = t.data.data), this.emitReserved("connect_error", n);
      }
  }
  onevent(t) {
    const n = t.data || [];
    t.id != null && n.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(n)
        : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const r of n) r.apply(this, t);
    }
    super.emit.apply(this, t);
  }
  ack(t) {
    const n = this;
    let r = !1;
    return function (...s) {
      r || ((r = !0), n.packet({ type: X.ACK, id: t, data: s }));
    };
  }
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" && (n.apply(this, t.data), delete this.acks[t.id]);
  }
  onconnect(t) {
    (this.id = t),
      (this.connected = !0),
      (this.disconnected = !1),
      this.emitBuffered(),
      this.emitReserved("connect");
  }
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => this.packet(t)),
      (this.sendBuffer = []);
  }
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this);
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: X.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return (this.flags.compress = t), this;
  }
  get volatile() {
    return (this.flags.volatile = !0), this;
  }
  timeout(t) {
    return (this.flags.timeout = t), this;
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    );
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    );
  }
  offAny(t) {
    if (!this._anyListeners) return this;
    if (t) {
      const n = this._anyListeners;
      for (let r = 0; r < n.length; r++)
        if (t === n[r]) return n.splice(r, 1), this;
    } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
}
var Cp = Jt;
function Jt(e) {
  (e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0);
}
(Jt.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = (1 & Math.floor(10 * t)) == 0 ? e - n : e + n;
  }
  return 0 | Math.min(e, this.max);
}),
  (Jt.prototype.reset = function () {
    this.attempts = 0;
  }),
  (Jt.prototype.setMin = function (e) {
    this.ms = e;
  }),
  (Jt.prototype.setMax = function (e) {
    this.max = e;
  }),
  (Jt.prototype.setJitter = function (e) {
    this.jitter = e;
  });
class Es extends un {
  constructor(t, n) {
    var r;
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == "object" && ((n = t), (t = void 0)),
      ((n = n || {}).path = n.path || "/socket.io"),
      (this.opts = n),
      Tr(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5
      ),
      (this.backoff = new Cp({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = t);
    const s = n.parser || wp;
    (this.encoder = new s.Encoder()),
      (this.decoder = new s.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (n = this.backoff) === null || n === void 0 || n.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (n = this.backoff) === null || n === void 0 || n.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (n = this.backoff) === null || n === void 0 || n.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect();
  }
  open(t) {
    if (~this._readyState.indexOf("open")) return this;
    this.engine = new gt(this.uri, this.opts);
    const n = this.engine,
      r = this;
    (this._readyState = "opening"), (this.skipReconnect = !1);
    const s = je(n, "open", function () {
        r.onopen(), t && t();
      }),
      o = je(n, "error", (i) => {
        r.cleanup(),
          (r._readyState = "closed"),
          this.emitReserved("error", i),
          t ? t(i) : r.maybeReconnectOnOpen();
      });
    if (this._timeout !== !1) {
      const i = this._timeout;
      i === 0 && s();
      const c = this.setTimeoutFn(() => {
        s(), n.close(), n.emit("error", new Error("timeout"));
      }, i);
      this.opts.autoUnref && c.unref(),
        this.subs.push(function () {
          clearTimeout(c);
        });
    }
    return this.subs.push(s), this.subs.push(o), this;
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    this.cleanup(), (this._readyState = "open"), this.emitReserved("open");
    const t = this.engine;
    this.subs.push(
      je(t, "ping", this.onping.bind(this)),
      je(t, "data", this.ondata.bind(this)),
      je(t, "error", this.onerror.bind(this)),
      je(t, "close", this.onclose.bind(this)),
      je(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(t) {
    this.decoder.add(t);
  }
  ondecoded(t) {
    this.emitReserved("packet", t);
  }
  onerror(t) {
    this.emitReserved("error", t);
  }
  socket(t, n) {
    let r = this.nsps[t];
    return r || ((r = new va(this, t, n)), (this.nsps[t] = r)), r;
  }
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const r of n) if (this.nsps[r].active) return;
    this._close();
  }
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let r = 0; r < n.length; r++) this.engine.write(n[r], t.options);
  }
  cleanup() {
    this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy();
  }
  _close() {
    (this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"),
      this.engine && this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(t) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t),
      this._reconnection && !this.skipReconnect && this.reconnect();
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1);
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          t.skipReconnect ||
            t.open((s) => {
              s
                ? ((t._reconnecting = !1),
                  t.reconnect(),
                  this.emitReserved("reconnect_error", s))
                : t.onreconnect();
            }));
      }, n);
      this.opts.autoUnref && r.unref(),
        this.subs.push(function () {
          clearTimeout(r);
        });
    }
  }
  onreconnect() {
    const t = this.backoff.attempts;
    (this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", t);
  }
}
const mn = {};
function Qn(e, t) {
  typeof e == "object" && ((t = e), (e = void 0));
  const n = (function (a, u = "", l) {
      let f = a;
      (l = l || (typeof location != "undefined" && location)),
        a == null && (a = l.protocol + "//" + l.host),
        typeof a == "string" &&
          (a.charAt(0) === "/" &&
            (a = a.charAt(1) === "/" ? l.protocol + a : l.host + a),
          /^(https?|wss?):\/\//.test(a) ||
            (a = l !== void 0 ? l.protocol + "//" + a : "https://" + a),
          (f = gs(a))),
        f.port ||
          (/^(http|ws)$/.test(f.protocol)
            ? (f.port = "80")
            : /^(http|ws)s$/.test(f.protocol) && (f.port = "443")),
        (f.path = f.path || "/");
      const d = f.host.indexOf(":") !== -1 ? "[" + f.host + "]" : f.host;
      return (
        (f.id = f.protocol + "://" + d + ":" + f.port + u),
        (f.href =
          f.protocol +
          "://" +
          d +
          (l && l.port === f.port ? "" : ":" + f.port)),
        f
      );
    })(e, (t = t || {}).path || "/socket.io"),
    r = n.source,
    s = n.id,
    o = n.path,
    i = mn[s] && o in mn[s].nsps;
  let c;
  return (
    t.forceNew || t["force new connection"] || t.multiplex === !1 || i
      ? (c = new Es(r, t))
      : (mn[s] || (mn[s] = new Es(r, t)), (c = mn[s])),
    n.query && !t.query && (t.query = n.queryKey),
    c.socket(n.path, t)
  );
}
Object.assign(Qn, { Manager: Es, Socket: va, io: Qn, connect: Qn });
const xp = (e) => (gr("data-v-cbada6ac"), (e = e()), yr(), e),
  Ap = ["onClick"],
  Rp = { class: "modal-content" },
  Sp = {
    key: 0,
    class: "animate-spin w-20 h-20 border-4 rounded-full",
    viewBox: "0 0 24 24",
  },
  Tp = xp(() =>
    Z(
      "path",
      {
        class: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
      },
      null,
      -1
    )
  ),
  Pp = [Tp],
  Op = { key: 0, class: "title" },
  kp = { key: 1, class: "text" },
  Np = ["src"],
  Ip = { class: "buttons" },
  Bp = Ze({
    props: { modal: null },
    emits: ["actionPrimary", "actionSecondary"],
    setup(e) {
      const n = At(e.modal),
        r = () => (n.open = !n.open),
        s = ih(),
        i = Qn("https://pivpix.herokuapp.com"),
        c = "http://localhost:5587/liberaRacao";
      return (
        Ds(() => {
          const a = window.sessionStorage.getItem("pixid");
          i.on("connect", () => {
            console.log("Conectado. Aguardando pagamento...");
          }),
            i.on("pagamento", (u) => {
              console.log("Recebendo dados da GerenciaNet"),
                u.pix.find((f) => f.txid === a) &&
                  (console.log("Pagamento recebido"),
                  oa
                    .post(c, { liberaRacao: !0 })
                    .then(() => {
                      console.log("Comando enviado para a RaspberryPi");
                    })
                    .catch((f) => {
                      console.error(
                        "Erro no envio de comando para a RaspberryPi",
                        f
                      );
                    })),
                console.log("Pagamento recebido. Redirecionando..."),
                s.push("/produtos");
            });
        }),
        (a, u) =>
          J(n).open
            ? (pe(),
              Zt(nu, { key: 0, to: "body" }, [
                Z(
                  "div",
                  { class: "modal-container", onClick: zu(r, ["self"]) },
                  [
                    Z("div", Rp, [
                      J(n).loading
                        ? (pe(), _e("svg", Sp, Pp))
                        : (pe(),
                          _e(
                            Te,
                            { key: 1 },
                            [
                              J(n).title
                                ? (pe(), _e("h2", Op, yt(J(n).title), 1))
                                : dt("", !0),
                              J(n).text
                                ? (pe(), _e("p", kp, yt(J(n).text), 1))
                                : dt("", !0),
                              J(n).image
                                ? (pe(),
                                  _e(
                                    "img",
                                    { key: 2, src: J(n).image, alt: "qr code" },
                                    null,
                                    8,
                                    Np
                                  ))
                                : dt("", !0),
                              Z("div", Ip, [
                                J(n).actionSecondary
                                  ? (pe(),
                                    _e(
                                      "button",
                                      {
                                        key: 0,
                                        class: "btn-secondary",
                                        onClick:
                                          u[0] ||
                                          (u[0] = (l) =>
                                            a.$emit("actionSecondary")),
                                      },
                                      yt(J(n).actionSecondary),
                                      1
                                    ))
                                  : dt("", !0),
                                J(n).actionPrimary
                                  ? (pe(),
                                    _e(
                                      "button",
                                      {
                                        key: 1,
                                        class: "btn-primary",
                                        onClick:
                                          u[1] ||
                                          (u[1] = (l) =>
                                            a.$emit("actionPrimary")),
                                      },
                                      yt(J(n).actionPrimary),
                                      1
                                    ))
                                  : dt("", !0),
                              ]),
                            ],
                            64
                          )),
                    ]),
                  ],
                  8,
                  Ap
                ),
              ]))
            : dt("", !0)
      );
    },
  });
var Lp = Mt(Bp, [["__scopeId", "data-v-cbada6ac"]]);
const $p = (e) => (gr("data-v-2c3d7d62"), (e = e()), yr(), e),
  Mp = { class: "cart-container" },
  Fp = $p(() => Z("h2", null, "Sua cesta", -1)),
  jp = { class: "product-list" },
  Dp = xt(" Total: "),
  Up = { class: "price" },
  Hp = { key: 1 },
  qp = Ze({
    setup(e) {
      const t = ro(),
        n = Ce(() => t.list),
        r = Ce(() => t.priceTotal),
        s = Ce(() => t.loading),
        o = async () => {
          (i.open = !0), (i.image = await t.checkout());
        },
        i = At({
          open: !1,
          loading: s,
          text: "Leia o QRCode abaixo no seu app de pagamento",
          image: "",
          actionPrimary: "Conclu\xEDdo",
        }),
        c = () => {
          (i.open = !1), Pr.push("/produtos");
        };
      return (a, u) => (
        pe(),
        _e("div", null, [
          me(Lp, { modal: J(i), onActionPrimary: c }, null, 8, ["modal"]),
          Z("div", Mp, [
            Fp,
            Z("div", jp, [
              J(n).length > 0
                ? (pe(),
                  _e(
                    Te,
                    { key: 0 },
                    [
                      me(ca, { products: J(n) }, null, 8, ["products"]),
                      Z("p", null, [Dp, Z("span", Up, yt(J(ia)(J(r))), 1)]),
                      Z(
                        "button",
                        { class: "btn-primary", onClick: o },
                        " Confirmar pedido "
                      ),
                    ],
                    64
                  ))
                : (pe(), _e("p", Hp, "Sua cesta est\xE1 vazia")),
            ]),
          ]),
        ])
      );
    },
  });
var Kp = Mt(qp, [["__scopeId", "data-v-2c3d7d62"]]);
const Pr = sh({
  history: Ef("/"),
  routes: [
    { path: "/", name: "home", component: Kd },
    { path: "/produtos", name: "produtos", component: Gd },
    { path: "/pedido", name: "pedido", component: Kp },
  ],
});
const Vp = { class: "main-app" },
  zp = Ze({
    setup(e) {
      ir().fetchProducts();
      const n = ro(),
        r = Ce(() => Pr.currentRoute.value.path);
      return (s, o) => (
        pe(),
        _e(
          Te,
          null,
          [
            J(r) !== "/"
              ? (pe(),
                Zt(vh, { key: 0, countCart: J(n).count }, null, 8, [
                  "countCart",
                ]))
              : dt("", !0),
            Z("main", Vp, [
              me(J(qc), null, {
                default: Bt(({ Component: i }) => [
                  me(
                    Ys,
                    { name: "slide-fade" },
                    { default: Bt(() => [(pe(), Zt(ru(i)))]), _: 2 },
                    1024
                  ),
                ]),
                _: 1,
              }),
            ]),
            J(r) !== "/" ? (pe(), Zt(Ah, { key: 1 })) : dt("", !0),
          ],
          64
        )
      );
    },
  });
const ao = Yu(zp);
ao.use(Zu());
ao.use(Pr);
ao.mount("#app");
