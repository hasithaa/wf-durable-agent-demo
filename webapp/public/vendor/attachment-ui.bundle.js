/*! @bal-commons/attachment-ui 0.1.0 | Apache-2.0 | Bundles Lit (BSD-3-Clause, Copyright (c) 2017 Google LLC) and @bal-commons/ui-core (Apache-2.0); see THIRD_PARTY_NOTICES.md */
//#region ../../service-commons/ui/node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, re = f.trustedTypes, ie = re ? re.emptyScript : "", ae = f.reactiveElementPolyfillSupport, p = (e, t) => e, m = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ie : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, oe = (e, t) => !l(e, t), se = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	useDefault: !1,
	hasChanged: oe
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var h = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = se) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? se;
	}
	static _$Ei() {
		if (this.hasOwnProperty(p("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(p("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(p("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? m : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? m : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? oe)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
h.elementStyles = [], h.shadowRootOptions = { mode: "open" }, h[p("elementProperties")] = /* @__PURE__ */ new Map(), h[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: h }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region ../../service-commons/ui/node_modules/lit-html/lit-html.js
var ce = globalThis, le = (e) => e, g = ce.trustedTypes, ue = g ? g.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, de = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + _, pe = `<${fe}>`, v = document, y = () => v.createComment(""), b = (e) => e === null || typeof e != "object" && typeof e != "function", me = Array.isArray, he = (e) => me(e) || typeof e?.[Symbol.iterator] == "function", ge = "[ 	\n\f\r]", x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, ve = />/g, S = RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ye = /'/g, be = /"/g, xe = /^(?:script|style|textarea|title)$/i, C = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), T = v.createTreeWalker(v, 129);
function Ce(e, t) {
	if (!me(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ue === void 0 ? t : ue.createHTML(t);
}
var we = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = x;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === x ? c[1] === "!--" ? o = _e : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = S) : (xe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = S) : o = ve : o === S ? c[0] === ">" ? (o = i ?? x, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? S : c[3] === "\"" ? be : ye) : o === be || o === ye ? o = S : o === _e || o === ve ? o = x : (o = S, i = void 0);
		let d = o === S && e[t + 1].startsWith("/>") ? " " : "";
		a += o === x ? n + pe : l >= 0 ? (r.push(s), n.slice(0, l) + de + n.slice(l) + _ + d) : n + _ + (l === -2 ? t : d);
	}
	return [Ce(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Te = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = we(t, n);
		if (this.el = e.createElement(l, r), T.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = T.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(de)) {
					let t = u[o++], n = i.getAttribute(e).split(_), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Oe : r[1] === "?" ? ke : r[1] === "@" ? Ae : D
					}), i.removeAttribute(e);
				} else e.startsWith(_) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (xe.test(i.tagName)) {
					let e = i.textContent.split(_), t = e.length - 1;
					if (t > 0) {
						i.textContent = g ? g.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], y()), T.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], y());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === fe) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(_, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += _.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = v.createElement("template");
		return n.innerHTML = e, n;
	}
};
function E(e, t, n = e, r) {
	if (t === C) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = b(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = E(e, i._$AS(e, t.values), i, r)), t;
}
var Ee = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? v).importNode(t, !0);
		T.currentNode = r;
		let i = T.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new De(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new je(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = T.nextNode(), a++);
		}
		return T.currentNode = v, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, De = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = E(this, e, t), b(e) ? e === w || e == null || e === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : e !== this._$AH && e !== C && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? he(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== w && b(this._$AH) ? this._$AA.nextSibling.data = e : this.T(v.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Te.createElement(Ce(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ee(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Se.get(e.strings);
		return t === void 0 && Se.set(e.strings, t = new Te(e)), t;
	}
	k(t) {
		me(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(y()), this.O(y()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = le(e).nextSibling;
			le(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, D = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = w, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = w;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = E(this, e, t, 0), a = !b(e) || e !== this._$AH && e !== C, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = E(this, r[n + o], t, o), s === C && (s = this._$AH[o]), a ||= !b(s) || s !== this._$AH[o], s === w ? e = w : e !== w && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Oe = class extends D {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === w ? void 0 : e;
	}
}, ke = class extends D {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== w);
	}
}, Ae = class extends D {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = E(this, e, t, 0) ?? w) === C) return;
		let n = this._$AH, r = e === w && n !== w || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== w && (n === w || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, je = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		E(this, e);
	}
}, Me = ce.litHtmlPolyfillSupport;
Me?.(Te, De), (ce.litHtmlVersions ??= []).push("3.3.3");
var Ne = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new De(t.insertBefore(y(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Pe = globalThis, O = class extends h {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ne(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return C;
	}
};
O._$litElement$ = !0, O.finalized = !0, Pe.litElementHydrateSupport?.({ LitElement: O });
var Fe = Pe.litElementPolyfillSupport;
Fe?.({ LitElement: O }), (Pe.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region ../../service-commons/ui/dist/index.js
function Ie(e, t) {
	return {
		async headers() {
			let t = await e();
			return t ? { Authorization: `Bearer ${t}` } : {};
		},
		onUnauthorized: t
	};
}
function Le(e, t = [], n = []) {
	return { headers: () => ({
		"x-user-id": e,
		"x-user-roles": t.join(","),
		...n.length ? { "x-user-scopes": n.join(" ") } : {}
	}) };
}
var Re = { headers: () => ({}) }, ze = globalThis;
function Be(e) {
	ze.__balCommonsAuth = e;
}
function k() {
	return ze.__balCommonsAuth ?? Re;
}
var Ve = class extends Error {
	constructor(e, t, n) {
		super(n), this.status = e, this.code = t, this.name = "ServiceError";
	}
};
async function A(e, t, n = {}) {
	let r = n.auth ?? k(), i = { ...await r.headers() }, a;
	n.body !== void 0 && (i["content-type"] = "application/json", a = JSON.stringify(n.body));
	let o = await fetch(He(e, t, n.query), {
		method: n.method ?? "GET",
		headers: i,
		body: a
	});
	if (o.status === 401 && r.onUnauthorized?.(), !o.ok) {
		let e = "HTTP_" + o.status, t = o.statusText;
		try {
			let n = await o.json();
			e = n.code ?? e, t = n.message ?? t;
		} catch {}
		throw new Ve(o.status, e, t);
	}
	return o.status === 204 ? void 0 : await o.json();
}
function He(e, t, n) {
	let r = e.replace(/\/+$/, "") + (t.startsWith("/") ? t : "/" + t), i = Object.entries(n ?? {}).filter(([, e]) => e != null && e !== "");
	return i.length ? `${r}?${new URLSearchParams(i.map(([e, t]) => [e, String(t)]))}` : r;
}
var Ue = class {
	constructor(e, t, n = {}) {
		this.baseUrl = e, this.handlers = t, this.options = n, this.retry = 1e3, this.stopped = !0;
	}
	start() {
		this.stopped && typeof EventSource < "u" && (this.stopped = !1, this.connect(!1));
	}
	stop() {
		this.stopped = !0, clearTimeout(this.timer), this.source?.close(), this.source = void 0;
	}
	async connect(e) {
		try {
			let { ticket: t } = await A(this.baseUrl, "/stream-ticket", {
				method: "POST",
				auth: this.options.auth ?? k()
			});
			if (this.stopped) return;
			let n = new URLSearchParams({ ticket: t });
			this.options.replay && this.lastEventId && n.set("lastEventId", this.lastEventId);
			let r = new EventSource(`${this.baseUrl.replace(/\/+$/, "")}/stream?${n}`);
			this.source = r, r.onopen = () => {
				this.retry = 1e3, e && this.options.onReconnect?.();
			};
			for (let [e, t] of Object.entries(this.handlers)) r.addEventListener(e, (e) => {
				let n = e;
				n.lastEventId && (this.lastEventId = n.lastEventId), t(JSON.parse(n.data));
			});
			r.onerror = () => {
				r.close(), this.schedule();
			};
		} catch {
			this.schedule();
		}
	}
	schedule() {
		this.stopped || (this.timer = setTimeout(() => void this.connect(!0), this.retry), this.retry = Math.min(this.retry * 2, 3e4));
	}
}, j = o`
  :host {
    --_font: var(--bc-font, system-ui, -apple-system, "Segoe UI", sans-serif);
    --_fg: var(--bc-fg, #1d2330);
    --_muted: var(--bc-muted, #6b7280);
    --_bg: var(--bc-bg, #ffffff);
    --_surface: var(--bc-surface, #f5f6f8);
    --_border: var(--bc-border, #e3e6eb);
    --_accent: var(--bc-accent, #2563eb);
    --_accent-soft: var(--bc-accent-soft, #e8efff);
    --_info: var(--bc-info, #2563eb);
    --_warning: var(--bc-warning, #d97706);
    --_error: var(--bc-error, #dc2626);
    --_success: var(--bc-success, #059669);
    --_radius: var(--bc-radius, 8px);
    font-family: var(--_font);
    color: var(--_fg);
  }
  @media (prefers-color-scheme: dark) {
    :host {
      --_fg: var(--bc-fg, #e6e8ec);
      --_muted: var(--bc-muted, #9aa3b2);
      --_bg: var(--bc-bg, #171b23);
      --_surface: var(--bc-surface, #0f1218);
      --_border: var(--bc-border, #2a303b);
      --_accent: var(--bc-accent, #6ea0ff);
      --_accent-soft: var(--bc-accent-soft, #1d2940);
    }
  }
`;
function We(e, t = Date.now()) {
	let n = Math.round((t - new Date(e).getTime()) / 1e3), r = new Intl.RelativeTimeFormat(void 0, { numeric: "auto" }), i = [
		[60, "second"],
		[60, "minute"],
		[24, "hour"],
		[7, "day"],
		[4.35, "week"],
		[12, "month"],
		[Infinity, "year"]
	], a = n;
	for (let [e, t] of i) {
		if (Math.abs(a) < e) return r.format(-Math.round(a), t);
		a /= e;
	}
	return e;
}
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var M = globalThis, Ge = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ke = Symbol(), qe = /* @__PURE__ */ new WeakMap(), Je = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== Ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (Ge && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = qe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && qe.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, Ye = (e) => new Je(typeof e == "string" ? e : e + "", void 0, Ke), N = (e, ...t) => new Je(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, Ke), Xe = (e, t) => {
	if (Ge) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = M.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, Ze = Ge ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return Ye(t);
})(e) : e, { is: Qe, defineProperty: $e, getOwnPropertyDescriptor: et, getOwnPropertyNames: tt, getOwnPropertySymbols: nt, getPrototypeOf: rt } = Object, P = globalThis, it = P.trustedTypes, at = it ? it.emptyScript : "", ot = P.reactiveElementPolyfillSupport, F = (e, t) => e, st = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? at : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, ct = (e, t) => !Qe(e, t), lt = {
	attribute: !0,
	type: String,
	converter: st,
	reflect: !1,
	useDefault: !1,
	hasChanged: ct
};
Symbol.metadata ??= Symbol("metadata"), P.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var I = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = lt) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && $e(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = et(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? lt;
	}
	static _$Ei() {
		if (this.hasOwnProperty(F("elementProperties"))) return;
		let e = rt(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(F("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
			let e = this.properties, t = [...tt(e), ...nt(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(Ze(e));
		} else e !== void 0 && t.push(Ze(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return Xe(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? st : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? st : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ct)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[F("elementProperties")] = /* @__PURE__ */ new Map(), I[F("finalized")] = /* @__PURE__ */ new Map(), ot?.({ ReactiveElement: I }), (P.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ut = globalThis, dt = (e) => e, L = ut.trustedTypes, ft = L ? L.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, pt = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + R, ht = `<${mt}>`, z = document, B = () => z.createComment(""), V = (e) => e === null || typeof e != "object" && typeof e != "function", gt = Array.isArray, _t = (e) => gt(e) || typeof e?.[Symbol.iterator] == "function", vt = "[ 	\n\f\r]", H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, bt = />/g, U = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), xt = /'/g, St = /"/g, Ct = /^(?:script|style|textarea|title)$/i, W = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), G = Symbol.for("lit-noChange"), K = Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), q = z.createTreeWalker(z, 129);
function Tt(e, t) {
	if (!gt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ft === void 0 ? t : ft.createHTML(t);
}
var Et = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = H;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === H ? c[1] === "!--" ? o = yt : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = U) : (Ct.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = U) : o = bt : o === U ? c[0] === ">" ? (o = i ?? H, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? U : c[3] === "\"" ? St : xt) : o === St || o === xt ? o = U : o === yt || o === bt ? o = H : (o = U, i = void 0);
		let d = o === U && e[t + 1].startsWith("/>") ? " " : "";
		a += o === H ? n + ht : l >= 0 ? (r.push(s), n.slice(0, l) + pt + n.slice(l) + R + d) : n + R + (l === -2 ? t : d);
	}
	return [Tt(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Dt = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Et(t, n);
		if (this.el = e.createElement(l, r), q.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = q.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(pt)) {
					let t = u[o++], n = i.getAttribute(e).split(R), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? At : r[1] === "?" ? jt : r[1] === "@" ? Mt : Y
					}), i.removeAttribute(e);
				} else e.startsWith(R) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ct.test(i.tagName)) {
					let e = i.textContent.split(R), t = e.length - 1;
					if (t > 0) {
						i.textContent = L ? L.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], B()), q.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], B());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === mt) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(R, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += R.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = z.createElement("template");
		return n.innerHTML = e, n;
	}
};
function J(e, t, n = e, r) {
	if (t === G) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = V(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = J(e, i._$AS(e, t.values), i, r)), t;
}
var Ot = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? z).importNode(t, !0);
		q.currentNode = r;
		let i = q.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new kt(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Nt(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = q.nextNode(), a++);
		}
		return q.currentNode = z, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, kt = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = K, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = J(this, e, t), V(e) ? e === K || e == null || e === "" ? (this._$AH !== K && this._$AR(), this._$AH = K) : e !== this._$AH && e !== G && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? _t(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== K && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Dt.createElement(Tt(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ot(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = wt.get(e.strings);
		return t === void 0 && wt.set(e.strings, t = new Dt(e)), t;
	}
	k(t) {
		gt(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(B()), this.O(B()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = dt(e).nextSibling;
			dt(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Y = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = K, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = K;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = J(this, e, t, 0), a = !V(e) || e !== this._$AH && e !== G, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = J(this, r[n + o], t, o), s === G && (s = this._$AH[o]), a ||= !V(s) || s !== this._$AH[o], s === K ? e = K : e !== K && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === K ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, At = class extends Y {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === K ? void 0 : e;
	}
}, jt = class extends Y {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== K);
	}
}, Mt = class extends Y {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = J(this, e, t, 0) ?? K) === G) return;
		let n = this._$AH, r = e === K && n !== K || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== K && (n === K || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Nt = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		J(this, e);
	}
}, Pt = ut.litHtmlPolyfillSupport;
Pt?.(Dt, kt), (ut.litHtmlVersions ??= []).push("3.3.3");
var Ft = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new kt(t.insertBefore(B(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, It = globalThis, X = class extends I {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ft(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return G;
	}
};
X._$litElement$ = !0, X.finalized = !0, It.litElementHydrateSupport?.({ LitElement: X });
var Lt = It.litElementPolyfillSupport;
Lt?.({ LitElement: X }), (It.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/client.ts
var Rt = /* @__PURE__ */ new Map(), Z = class {
	constructor(e, t) {
		this.baseUrl = e, this.auth = t;
	}
	getCase(e) {
		return A(this.baseUrl, `/cases/${encodeURIComponent(e)}`, { auth: this.auth });
	}
	listCases(e = {}) {
		return A(this.baseUrl, "/cases", {
			auth: this.auth,
			query: {
				...e,
				subject: void 0
			}
		});
	}
	listAllCases(e = {}) {
		return A(this.baseUrl, "/admin/cases", {
			auth: this.auth,
			query: { ...e }
		});
	}
	async upload(e, t, n) {
		let r = this.auth ?? k(), i = He(this.baseUrl, `/cases/${encodeURIComponent(e)}/slots/${encodeURIComponent(t)}/files`, { fileName: n.name }), a = await fetch(i, {
			method: "POST",
			body: n,
			headers: {
				...await r.headers(),
				"content-type": n.type || "application/octet-stream"
			}
		});
		if (!a.ok) {
			a.status === 401 && r.onUnauthorized?.();
			let e = await a.json().catch(() => ({}));
			throw new Ve(a.status, e.code ?? `HTTP_${a.status}`, e.message ?? a.statusText);
		}
		return a.json();
	}
	deleteFile(e, t) {
		return A(this.baseUrl, `/cases/${encodeURIComponent(e)}/files/${encodeURIComponent(t)}`, {
			method: "DELETE",
			auth: this.auth
		});
	}
	submit(e) {
		return A(this.baseUrl, `/cases/${encodeURIComponent(e)}/submit`, {
			method: "POST",
			auth: this.auth
		});
	}
	async download(e, t) {
		let n = this.auth ?? k(), r = await fetch(He(this.baseUrl, `/cases/${encodeURIComponent(e)}/files/${encodeURIComponent(t)}/content`), { headers: await n.headers() });
		if (!r.ok) {
			r.status === 401 && n.onUnauthorized?.();
			let e = await r.json().catch(() => ({}));
			throw new Ve(r.status, e.code ?? `HTTP_${r.status}`, e.message ?? r.statusText);
		}
		return r.blob();
	}
	async link(e, t) {
		let n = Rt.get(t);
		if (n && n.expires - Date.now() > 3e4) return n.url;
		let { url: r, expiresAt: i } = await A(this.baseUrl, `/cases/${encodeURIComponent(e)}/files/${encodeURIComponent(t)}/link`, {
			method: "POST",
			auth: this.auth
		}), a = new URL(this.baseUrl, globalThis.location?.href).pathname.replace(/\/+$/, ""), o = r.startsWith(a) ? r.slice(a.length) : r.replace(/^\/[^/]+\/v\d+/, ""), s = this.baseUrl.replace(/\/+$/, "") + o;
		return Rt.set(t, {
			url: s,
			expires: new Date(i).getTime()
		}), s;
	}
}, zt = class extends EventTarget {
	constructor(e, t) {
		super(), this.baseUrl = e, this.auth = t, this.users = 0;
	}
	subscribe(e) {
		let t = (t) => e(t.detail);
		if (this.addEventListener("change", t), this.users++ === 0) {
			let e = (e) => (t) => this.emit({
				type: "case",
				event: e,
				case: t
			}), t = (e) => ({ caseId: t, attachment: n }) => this.emit({
				type: "file",
				event: e,
				caseId: t,
				attachment: n
			});
			this.stream = new Ue(this.baseUrl, {
				"case.created": e("case.created"),
				"case.submitted": e("case.submitted"),
				"case.reopened": e("case.reopened"),
				"case.closed": e("case.closed"),
				"attachment.uploaded": t("attachment.uploaded"),
				"attachment.deleted": t("attachment.deleted")
			}, {
				auth: this.auth,
				onReconnect: () => this.emit({ type: "reconnected" })
			}), this.stream.start();
		}
		return () => {
			this.removeEventListener("change", t), --this.users === 0 && (this.stream?.stop(), this.stream = void 0);
		};
	}
	emit(e) {
		this.dispatchEvent(new CustomEvent("change", { detail: e }));
	}
}, Bt = /* @__PURE__ */ new Map();
function Q(e, t) {
	let n = Bt.get(e);
	return n || (n = new zt(e, t), Bt.set(e, n)), n;
}
function Vt(e) {
	return e.type === "case" ? e.case.id : e.type === "file" ? e.caseId : void 0;
}
//#endregion
//#region src/files.ts
function Ht(e) {
	let t = e.mimeType.toLowerCase();
	return t.startsWith("image/") ? "image" : t === "application/pdf" ? "pdf" : t.startsWith("video/") ? "video" : t.startsWith("audio/") ? "audio" : (t.startsWith("text/") || t === "application/json" || t.endsWith("+json") || t.endsWith("+xml") || t === "application/xml") && e.sizeBytes <= 262144 ? "text" : "none";
}
function $(e) {
	if (e < 1024) return `${e} B`;
	let t = [
		"KB",
		"MB",
		"GB"
	], n = e / 1024, r = 0;
	for (; n >= 1024 && r < t.length - 1;) n /= 1024, r++;
	return `${n < 10 ? n.toFixed(1) : Math.round(n)} ${t[r]}`;
}
function Ut(e) {
	return ((e.fileName.includes(".") ? e.fileName.split(".").pop() : "") || e.mimeType.split("/").pop() || "file").slice(0, 4).toUpperCase();
}
function Wt(e, t) {
	let n = URL.createObjectURL(e), r = Object.assign(document.createElement("a"), {
		href: n,
		download: t
	});
	document.body.append(r), r.click(), r.remove(), setTimeout(() => URL.revokeObjectURL(n), 1e4);
}
//#endregion
//#region src/file-preview.ts
var Gt = class extends X {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			auth: { attribute: !1 },
			file: { attribute: !1 },
			url: {
				state: !0,
				attribute: !1
			},
			text: {
				state: !0,
				attribute: !1
			},
			error: {
				state: !0,
				attribute: !1
			}
		};
	}
	constructor() {
		super(), this.baseUrl = "";
	}
	static {
		this.styles = [j, N`
    dialog { width: min(960px, 94vw); height: min(720px, 90vh); padding: 0; border: 1px solid var(--_border);
      border-radius: var(--_radius); background: var(--_bg); color: var(--_fg); overflow: hidden; }
    dialog[open] { display: flex; flex-direction: column; }
    dialog::backdrop { background: rgb(0 0 0 / .55); }
    .bar { display: flex; gap: 8px; align-items: center; padding: 8px 12px; border-bottom: 1px solid var(--_border); }
    .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
    .meta { font-size: 12px; color: var(--_muted); white-space: nowrap; }
    button { font: inherit; font-size: 13px; padding: 5px 10px; border-radius: 6px; cursor: pointer;
      border: 1px solid var(--_border); background: var(--_surface); color: var(--_fg); }
    button:focus-visible { outline: 2px solid var(--_accent); }
    .open { font-size: 13px; color: var(--_accent); white-space: nowrap; }
    .body { flex: 1; min-height: 0; display: grid; place-items: center; background: var(--_surface); overflow: auto; }
    img, video { max-width: 100%; max-height: 100%; object-fit: contain; }
    iframe { width: 100%; height: 100%; border: 0; background: #fff; }
    pre { align-self: start; justify-self: stretch; margin: 0; padding: 12px; font-size: 12px; white-space: pre-wrap;
      word-break: break-word; }
    .none { text-align: center; color: var(--_muted); display: grid; gap: 10px; justify-items: center; }
    .error { color: var(--_error); }
  `];
	}
	async show(e) {
		if (e && (this.file = e), !this.file) return;
		this.url = void 0, this.text = void 0, this.error = void 0, await this.updateComplete, this.renderRoot.querySelector("dialog")?.showModal();
		let t = this.file, n = () => this.file !== t;
		try {
			let e = new Z(this.baseUrl, this.auth), r = Ht(t);
			if (r === "text") {
				let r = await (await e.download(t.caseId, t.id)).text();
				n() || (this.text = r);
			} else if (r !== "none") {
				let r = await e.link(t.caseId, t.id);
				n() || (this.url = r);
			}
		} catch (e) {
			n() || (this.error = e.message);
		}
	}
	close() {
		this.renderRoot.querySelector("dialog")?.close();
	}
	async download() {
		let e = this.file;
		if (e) try {
			Wt(await new Z(this.baseUrl, this.auth).download(e.caseId, e.id), e.fileName), this.dispatchEvent(new CustomEvent("commons-file-downloaded", {
				detail: { attachment: e },
				bubbles: !0,
				composed: !0
			}));
		} catch (e) {
			this.error = e.message;
		}
	}
	body() {
		let e = this.file;
		if (this.error) return W`<div class="error" role="alert">${this.error}</div>`;
		let t = Ht(e);
		if (t === "none") return W`<div class="none">No preview for ${e.mimeType}.
        <button @click=${this.download}>Download ${e.fileName}</button></div>`;
		if (t === "text") return this.text === void 0 ? W`<span class="meta">Loading…</span>` : W`<pre>${this.text}</pre>`;
		if (!this.url) return W`<span class="meta">Loading…</span>`;
		switch (t) {
			case "image": return W`<img src=${this.url} alt=${e.fileName}>`;
			case "pdf": return W`<iframe src=${this.url} title=${e.fileName}></iframe>`;
			case "video": return W`<video src=${this.url} controls></video>`;
			default: return W`<audio src=${this.url} controls></audio>`;
		}
	}
	render() {
		let e = this.file;
		return W`<dialog part="dialog" aria-label=${e?.fileName ?? "File preview"}
        @close=${() => this.dispatchEvent(new CustomEvent("commons-preview-close", {
			bubbles: !0,
			composed: !0
		}))}>
      ${e ? W`
        <div class="bar" part="toolbar">
          <span class="name" title=${e.fileName}>${e.fileName}</span>
          <span class="meta">${$(e.sizeBytes)} · ${e.uploadedBy} ·
            <span title=${e.uploadedAt}>${We(e.uploadedAt)}</span></span>
          ${this.url ? W`<a class="open" href=${this.url} target="_blank" rel="noopener">Open in new tab</a>` : K}
          <button @click=${this.download}>Download</button>
          <button @click=${this.close} aria-label="Close preview">Close</button>
        </div>
        <div class="body" part="body">${this.body()}</div>` : K}
    </dialog>`;
	}
};
customElements.get("commons-file-preview") || customElements.define("commons-file-preview", Gt);
//#endregion
//#region src/upload-case.ts
var Kt = class extends X {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			caseId: {
				type: String,
				attribute: "case-id"
			},
			me: { type: String },
			compact: {
				type: Boolean,
				reflect: !0
			},
			auth: { attribute: !1 },
			case: {
				state: !0,
				attribute: !1
			},
			links: {
				state: !0,
				attribute: !1
			},
			uploading: {
				state: !0,
				attribute: !1
			},
			dragging: {
				state: !0,
				attribute: !1
			},
			error: {
				state: !0,
				attribute: !1
			}
		};
	}
	constructor() {
		super(), this.baseUrl = "", this.caseId = "", this.compact = !1, this.links = {}, this.uploading = {};
	}
	static {
		this.styles = [j, N`
    :host { display: grid; gap: 8px; }
    .head { display: flex; gap: 8px; align-items: baseline; }
    .head strong { flex: 1; }
    .status { font-size: 11px; padding: 1px 8px; border-radius: 8px; background: var(--_surface); }
    .status.SUBMITTED { background: var(--_accent-soft); } .status.CLOSED { color: var(--_muted); }
    .reason { font-size: 13px; color: var(--_warning); }
    .slot { display: grid; gap: 6px; padding: 8px; border: 1px dashed var(--_border); border-radius: var(--_radius); }
    .slot.done { border-style: solid; border-color: var(--_success); }
    .meta { font-size: 12px; color: var(--_muted); }
    .thumbs { display: flex; gap: 6px; flex-wrap: wrap; }
    .file { position: relative; }
    .thumb { position: relative; width: 72px; height: 72px; border-radius: 6px; border: 1px solid var(--_border);
      display: grid; place-items: center; background: var(--_surface); cursor: pointer; overflow: hidden; padding: 0;
      font: inherit; color: var(--_fg); }
    .thumb:focus-visible, .remove:focus-visible { outline: 2px solid var(--_accent); }
    .thumb img { width: 100%; height: 100%; object-fit: cover; }
    .thumb .badge { font-size: 11px; font-weight: 700; color: var(--_muted); }
    .thumb .name { position: absolute; bottom: 0; left: 0; right: 0; font-size: 9px; padding: 1px 3px;
      background: rgb(0 0 0 / .55); color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .remove { position: absolute; top: 2px; right: 2px; width: 18px; height: 18px; border-radius: 50%; border: none;
      background: rgb(0 0 0 / .6); color: #fff; font-size: 12px; line-height: 18px; cursor: pointer; padding: 0; }
    .drop { display: grid; place-items: center; gap: 4px; padding: 12px; border: 1px dashed var(--_border);
      border-radius: 6px; font-size: 13px; color: var(--_muted); text-align: center; cursor: pointer; }
    .drop.over { border-color: var(--_accent); background: var(--_accent-soft); color: var(--_fg); }
    .drop:focus-within { outline: 2px solid var(--_accent); }
    .drop input { position: absolute; width: 1px; height: 1px; opacity: 0; }
    .drop u { color: var(--_accent); text-decoration: none; font-weight: 600; }
    .busy { font-size: 12px; color: var(--_accent); }
    button.submit { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--_accent);
      background: var(--_accent); color: #fff; cursor: pointer; justify-self: start; }
    button.submit:disabled { opacity: .5; cursor: default; }
    .error { color: var(--_error); font-size: 13px; }
  `];
	}
	connectedCallback() {
		super.connectedCallback(), this.start();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribe?.(), this.unsubscribe = void 0;
	}
	updated(e) {
		(e.has("caseId") || e.has("baseUrl")) && this.start();
	}
	start() {
		this.unsubscribe?.(), this.unsubscribe = void 0, this.baseUrl && this.caseId && this.isConnected && (this.unsubscribe = Q(this.baseUrl, this.auth).subscribe((e) => {
			(e.type === "reconnected" || Vt(e) === this.caseId) && this.reload();
		}), this.reload());
	}
	async reload() {
		try {
			let e = new Z(this.baseUrl, this.auth), t = await e.getCase(this.caseId), n = {};
			await Promise.all((t.files ?? []).filter((e) => e.mimeType.startsWith("image/")).map(async (r) => {
				n[r.id] = await e.link(t.id, r.id).catch(() => "");
			})), this.case = t, this.links = n, this.error = void 0;
		} catch (e) {
			this.error = e.message;
		}
	}
	canUpload() {
		return this.case?.status === "OPEN" && (!this.me || this.case.subjects.includes(this.me));
	}
	async upload(e, t) {
		if (!this.case || !t.length) return;
		let n = e.maxFiles - e.fileCount - (this.uploading[e.name]?.length ?? 0), r = t.filter((t) => qt(e, t)), i = [];
		r.length < t.length && i.push(`${e.label} takes ${e.mimeTypes.join(", ")}`), r.length > n && i.push(`${e.label} has room for ${Math.max(n, 0)} more`);
		let a = r.slice(0, Math.max(n, 0));
		this.uploading = {
			...this.uploading,
			[e.name]: [...this.uploading[e.name] ?? [], ...a.map((e) => e.name)]
		};
		let o = new Z(this.baseUrl, this.auth);
		for (let t of a) try {
			if (t.size > e.maxBytes) throw Error(`${t.name} is larger than ${$(e.maxBytes)}`);
			let n = await o.upload(this.case.id, e.name, t);
			this.dispatchEvent(new CustomEvent("commons-file-uploaded", {
				detail: { attachment: n },
				bubbles: !0,
				composed: !0
			}));
		} catch (e) {
			i.push(e.message);
		} finally {
			let n = [...this.uploading[e.name] ?? []];
			n.splice(n.indexOf(t.name), 1), this.uploading = {
				...this.uploading,
				[e.name]: n
			};
		}
		this.error = i.length ? i.join(". ") : void 0, await this.reload(), i.length && (this.error = i.join(". "));
	}
	async removeFile(e) {
		try {
			await new Z(this.baseUrl, this.auth).deleteFile(e.caseId, e.id), this.dispatchEvent(new CustomEvent("commons-file-deleted", {
				detail: { attachment: e },
				bubbles: !0,
				composed: !0
			})), await this.reload();
		} catch (e) {
			this.error = e.message;
		}
	}
	open(e) {
		let t = new CustomEvent("commons-file-open", {
			detail: { attachment: e },
			bubbles: !0,
			composed: !0,
			cancelable: !0
		});
		this.dispatchEvent(t) && this.renderRoot.querySelector("commons-file-preview")?.show(e);
	}
	async submit() {
		try {
			let e = await new Z(this.baseUrl, this.auth).submit(this.caseId);
			this.case = e, this.dispatchEvent(new CustomEvent("commons-case-submitted", {
				detail: { case: e },
				bubbles: !0,
				composed: !0
			}));
		} catch (e) {
			this.error = e.message;
		}
	}
	dropzone(e) {
		let t = e.maxFiles - e.fileCount;
		return W`<label class="drop ${this.dragging === e.name ? "over" : ""}" part="dropzone"
        @dragover=${(t) => {
			t.preventDefault(), this.dragging = e.name;
		}}
        @dragleave=${() => {
			this.dragging = void 0;
		}} @drop=${(t) => {
			t.preventDefault(), this.dragging = void 0, this.upload(e, [...t.dataTransfer?.files ?? []]);
		}}>
      <span>Drop ${t > 1 ? "files" : "a file"} here or <u>choose</u></span>
      <input type="file" aria-label="Upload ${e.label}" accept=${e.mimeTypes.join(",")} ?multiple=${t > 1}
          @change=${(t) => {
			let n = t.target;
			this.upload(e, [...n.files ?? []]).finally(() => {
				n.value = "";
			});
		}}>
    </label>`;
	}
	render() {
		let e = this.case;
		if (!e) return this.error ? W`<div class="error" role="alert">${this.error}</div>` : W`<div class="meta">Loading…</div>`;
		let t = this.canUpload();
		return W`
      ${this.compact ? K : W`<div class="head"><strong>${e.title}</strong>
        <span class="status ${e.status}">${e.status}</span></div>`}
      ${e.statusReason ? W`<div class="reason">${e.statusReason}</div>` : K}
      ${e.slots.map((n) => {
			let r = (e.files ?? []).filter((e) => e.slot === n.name), i = this.uploading[n.name] ?? [];
			return W`<div class="slot ${n.satisfied ? "done" : ""}" part="slot">
          <div><strong>${n.label}</strong> <span class="meta">${n.fileCount}/${n.maxFiles}
            · ${n.mimeTypes.join(", ") || "any type"}${n.minFiles === 0 ? " · optional" : ""}</span></div>
          ${n.description ? W`<div class="meta">${n.description}</div>` : K}
          ${r.length ? W`<div class="thumbs">${r.map((e) => W`<span class="file">
            <button class="thumb" @click=${() => this.open(e)} title=${e.fileName} aria-label="Preview ${e.fileName}">
              ${this.links[e.id] ? W`<img src=${this.links[e.id]} alt="">` : W`<span class="badge">${Ut(e)}</span><span class="name">${e.fileName}</span>`}
            </button>
            ${t && this.me && e.uploadedBy === this.me ? W`<button class="remove"
                aria-label="Remove ${e.fileName}" @click=${() => void this.removeFile(e)}>×</button>` : K}
          </span>`)}</div>` : K}
          ${i.length ? W`<div class="busy" role="status">Uploading ${i.join(", ")}…</div>` : K}
          ${t && n.fileCount + i.length < n.maxFiles ? this.dropzone(n) : K}
        </div>`;
		})}
      ${t && !e.autoSubmit ? W`<button class="submit" part="submit"
          ?disabled=${!e.slots.every((e) => e.satisfied)} @click=${this.submit}>Submit</button>` : K}
      ${this.error ? W`<div class="error" role="alert">${this.error}</div>` : K}
      <commons-file-preview .baseUrl=${this.baseUrl} .auth=${this.auth}></commons-file-preview>
    `;
	}
};
function qt(e, t) {
	if (!e.mimeTypes.length) return !0;
	let n = (t.type || "application/octet-stream").toLowerCase();
	return e.mimeTypes.some((e) => e.endsWith("/*") ? n.startsWith(e.slice(0, -1).toLowerCase()) : n === e.toLowerCase());
}
customElements.get("commons-upload-case") || customElements.define("commons-upload-case", Kt);
//#endregion
//#region src/case-list.ts
var Jt = class extends X {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			auth: { attribute: !1 },
			me: { type: String },
			selected: {
				type: String,
				reflect: !0
			},
			status: { type: String },
			correlationId: {
				type: String,
				attribute: "correlation-id"
			},
			admin: { type: Boolean },
			subject: { type: String },
			pageSize: {
				type: Number,
				attribute: "page-size"
			},
			items: {
				state: !0,
				attribute: !1
			},
			nextCursor: {
				state: !0,
				attribute: !1
			},
			error: {
				state: !0,
				attribute: !1
			},
			loaded: {
				state: !0,
				attribute: !1
			}
		};
	}
	constructor() {
		super(), this.baseUrl = "", this.admin = !1, this.pageSize = 20, this.items = [], this.loaded = !1;
	}
	static {
		this.styles = [j, N`
    :host { display: block; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: 4px; }
    li { padding: 8px 10px; border-radius: 6px; border: 1px solid transparent; cursor: pointer; }
    li:hover { background: var(--_surface); }
    li[aria-selected="true"] { border-color: var(--_accent); background: var(--_accent-soft); }
    li:focus-visible { outline: 2px solid var(--_accent); }
    .top { display: flex; gap: 6px; align-items: center; }
    .title { flex: 1; font-weight: 600; font-size: 14px; min-width: 0; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; }
    .status { font-size: 11px; padding: 1px 8px; border-radius: 8px; background: var(--_surface); white-space: nowrap; }
    .status.SUBMITTED { background: var(--_accent-soft); } .status.CLOSED { color: var(--_muted); }
    .todo { font-size: 11px; color: var(--_warning); white-space: nowrap; }
    .meta { font-size: 12px; color: var(--_muted); }
    .bar { height: 3px; background: var(--_surface); border-radius: 2px; margin-top: 4px; overflow: hidden; }
    .bar span { display: block; height: 100%; background: var(--_success); }
    .more { display: block; margin: 6px auto; font: inherit; font-size: 12px; padding: 4px 10px; cursor: pointer;
      border: 1px solid var(--_border); border-radius: 6px; background: none; color: var(--_fg); }
    .empty, .error { padding: 12px; font-size: 13px; color: var(--_muted); }
    .error { color: var(--_error); }
  `];
	}
	connectedCallback() {
		super.connectedCallback(), this.start();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribe?.(), this.unsubscribe = void 0;
	}
	updated(e) {
		e.has("baseUrl") ? this.start() : [
			"status",
			"correlationId",
			"admin",
			"subject"
		].some((t) => e.has(t)) && this.reload();
	}
	start() {
		this.unsubscribe?.(), this.unsubscribe = void 0, this.baseUrl && this.isConnected && (this.unsubscribe = Q(this.baseUrl, this.auth).subscribe(() => {
			clearTimeout(this.pending), this.pending = setTimeout(() => void this.reload(), 300);
		}), this.reload());
	}
	query(e, t = this.pageSize) {
		return {
			status: this.status || void 0,
			correlationId: this.correlationId || void 0,
			subject: this.admin && this.subject || void 0,
			limit: t,
			cursor: e
		};
	}
	fetchPage(e, t) {
		let n = new Z(this.baseUrl, this.auth);
		return this.admin ? n.listAllCases(this.query(e, t)) : n.listCases(this.query(e, t));
	}
	async reload() {
		try {
			let e = await this.fetchPage(void 0, Math.min(100, Math.max(this.pageSize, this.items.length)));
			this.loaded = !0, this.items = e.items, this.nextCursor = e.nextCursor, this.error = void 0;
		} catch (e) {
			this.error = e.message;
		}
	}
	async loadMore() {
		if (this.nextCursor) try {
			let e = await this.fetchPage(this.nextCursor);
			this.items = [...this.items, ...e.items.filter((e) => !this.items.some((t) => t.id === e.id))], this.nextCursor = e.nextCursor;
		} catch (e) {
			this.error = e.message;
		}
	}
	select(e) {
		this.selected = e.id, this.dispatchEvent(new CustomEvent("commons-case-select", {
			detail: { case: e },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return this.error ? W`<div class="error" role="alert">${this.error}</div>` : this.loaded ? this.items.length ? W`<ul part="list" role="listbox" aria-label="Upload cases">
      ${this.items.map((e) => {
			let t = e.slots.filter((e) => e.satisfied).length, n = e.status === "OPEN" && !!this.me && e.subjects.includes(this.me) && t < e.slots.length;
			return W`<li part="item" role="option" tabindex="0" aria-selected=${this.selected === e.id}
            @click=${() => this.select(e)} @keydown=${(t) => t.key === "Enter" && this.select(e)}>
          <div class="top">
            <span class="title" title=${e.title}>${e.title}</span>
            ${n ? W`<span class="todo">Needs your upload</span>` : K}
            <span class="status ${e.status}">${e.status.toLowerCase()}</span>
          </div>
          <div class="meta">${t}/${e.slots.length} slots ·
            ${this.admin ? W`${e.subjects.join(", ")} · ` : K}
            <span title=${e.updatedAt}>${We(e.updatedAt)}</span></div>
          <div class="bar"><span style="width:${e.slots.length ? Math.round(t / e.slots.length * 100) : 100}%"></span></div>
        </li>`;
		})}
    </ul>
    ${this.nextCursor ? W`<button class="more" @click=${() => this.loadMore()}>Load more</button>` : K}` : W`<div class="empty" part="empty"><slot name="empty">No cases.</slot></div>` : W`<div class="empty" role="status">Loading…</div>`;
	}
};
customElements.get("commons-case-list") || customElements.define("commons-case-list", Jt);
//#endregion
//#region src/file-viewer.ts
var Yt = class extends X {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			caseId: {
				type: String,
				attribute: "case-id"
			},
			me: { type: String },
			canDelete: {
				type: Boolean,
				attribute: "can-delete"
			},
			layout: {
				type: String,
				reflect: !0
			},
			flat: { type: Boolean },
			auth: { attribute: !1 },
			case: {
				state: !0,
				attribute: !1
			},
			links: {
				state: !0,
				attribute: !1
			},
			error: {
				state: !0,
				attribute: !1
			}
		};
	}
	constructor() {
		super(), this.baseUrl = "", this.caseId = "", this.canDelete = !1, this.layout = "grid", this.flat = !1, this.links = {};
	}
	static {
		this.styles = [j, N`
    :host { display: grid; gap: 12px; }
    h3 { margin: 0 0 6px; font-size: 12px; font-weight: 600; color: var(--_muted); text-transform: uppercase;
      letter-spacing: .04em; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(128px, 1fr)); gap: 8px; }
    .list { display: grid; gap: 4px; }
    .file { position: relative; border: 1px solid var(--_border); border-radius: var(--_radius); background: var(--_bg);
      overflow: hidden; }
    .open { display: block; width: 100%; padding: 0; border: 0; background: none; font: inherit; color: inherit;
      text-align: left; cursor: pointer; }
    .open:focus-visible { outline: 2px solid var(--_accent); outline-offset: -2px; }
    .open > span { display: block; }
    .grid .thumb { aspect-ratio: 4 / 3; display: grid; place-items: center; background: var(--_surface); }
    .thumb img { width: 100%; height: 100%; object-fit: cover; }
    .badge { font-size: 12px; font-weight: 700; color: var(--_muted); border: 1px solid var(--_border);
      border-radius: 4px; padding: 2px 6px; background: var(--_bg); }
    .info { padding: 6px 8px; display: grid; gap: 2px; min-width: 0; }
    .name { font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .meta { font-size: 11px; color: var(--_muted); }
    .list .file { display: flex; align-items: center; }
    .list .open { display: grid; grid-template-columns: 48px 1fr; align-items: center; flex: 1; min-width: 0; }
    .list .thumb { width: 48px; height: 48px; display: grid; place-items: center; background: var(--_surface); }
    .actions { display: flex; gap: 4px; padding: 0 8px 6px; }
    .list .actions { padding: 0 8px; }
    .actions button { font: inherit; font-size: 11px; padding: 2px 8px; border-radius: 5px; cursor: pointer;
      border: 1px solid var(--_border); background: var(--_bg); color: var(--_fg); }
    .actions button.danger { color: var(--_error); }
    .empty, .error { font-size: 13px; color: var(--_muted); }
    .error { color: var(--_error); }
  `];
	}
	connectedCallback() {
		super.connectedCallback(), this.start();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribe?.(), this.unsubscribe = void 0;
	}
	updated(e) {
		(e.has("baseUrl") || e.has("caseId")) && this.start();
	}
	start() {
		this.unsubscribe?.(), this.unsubscribe = void 0, this.baseUrl && this.caseId && this.isConnected && (this.unsubscribe = Q(this.baseUrl, this.auth).subscribe((e) => {
			(e.type === "reconnected" || Vt(e) === this.caseId) && this.reload();
		}), this.reload());
	}
	async reload() {
		try {
			let e = new Z(this.baseUrl, this.auth), t = await e.getCase(this.caseId), n = {};
			await Promise.all((t.files ?? []).filter((e) => e.mimeType.startsWith("image/")).map(async (r) => {
				n[r.id] = await e.link(t.id, r.id).catch(() => "");
			})), this.case = t, this.links = n, this.error = void 0;
		} catch (e) {
			this.error = e.message;
		}
	}
	open(e) {
		let t = new CustomEvent("commons-file-open", {
			detail: { attachment: e },
			bubbles: !0,
			composed: !0,
			cancelable: !0
		});
		this.dispatchEvent(t) && this.renderRoot.querySelector("commons-file-preview")?.show(e);
	}
	async download(e) {
		try {
			Wt(await new Z(this.baseUrl, this.auth).download(e.caseId, e.id), e.fileName), this.dispatchEvent(new CustomEvent("commons-file-downloaded", {
				detail: { attachment: e },
				bubbles: !0,
				composed: !0
			}));
		} catch (e) {
			this.error = e.message;
		}
	}
	async removeFile(e) {
		if (confirm(`Delete ${e.fileName}?`)) try {
			await new Z(this.baseUrl, this.auth).deleteFile(e.caseId, e.id), this.dispatchEvent(new CustomEvent("commons-file-deleted", {
				detail: { attachment: e },
				bubbles: !0,
				composed: !0
			})), await this.reload();
		} catch (e) {
			this.error = e.message;
		}
	}
	deletable(e) {
		return this.canDelete || this.case?.status === "OPEN" && !!this.me && e.uploadedBy === this.me;
	}
	tile(e) {
		let t = (e) => (t) => {
			t.stopPropagation(), e();
		};
		return W`<div class="file" part="file">
      <button class="open" aria-label="Preview ${e.fileName}" @click=${() => this.open(e)}>
        <span class="thumb">${this.links[e.id] ? W`<img src=${this.links[e.id]} alt="" loading="lazy">` : W`<span class="badge">${Ut(e)}</span>`}</span>
        <span class="info">
          <span class="name" title=${e.fileName}>${e.fileName}</span>
          <span class="meta">${$(e.sizeBytes)} · ${e.uploadedBy} ·
            <span title=${e.uploadedAt}>${We(e.uploadedAt)}</span></span>
        </span>
      </button>
      <div class="actions">
        <button @click=${t(() => void this.download(e))} aria-label="Download ${e.fileName}">Download</button>
        ${this.deletable(e) ? W`<button class="danger" @click=${t(() => void this.removeFile(e))}
            aria-label="Delete ${e.fileName}">Delete</button>` : K}
      </div>
    </div>`;
	}
	render() {
		let e = this.case, t = W`<commons-file-preview .baseUrl=${this.baseUrl} .auth=${this.auth}></commons-file-preview>`;
		if (!e) return this.error ? W`<div class="error" role="alert">${this.error}</div>` : W`<div class="empty">Loading…</div>`;
		let n = e.files ?? [];
		return n.length ? W`
      ${(this.flat ? [{
			label: "",
			files: n
		}] : e.slots.map((e) => ({
			label: e.label,
			files: n.filter((t) => t.slot === e.name)
		})).filter((e) => e.files.length)).map((e) => W`<section part="group">
        ${e.label ? W`<h3>${e.label}</h3>` : K}
        <div class=${this.layout === "list" ? "list" : "grid"}>${e.files.map((e) => this.tile(e))}</div>
      </section>`)}
      ${this.error ? W`<div class="error" role="alert">${this.error}</div>` : K}
      ${t}` : W`<div class="empty" part="empty"><slot name="empty">No files yet.</slot></div>${t}`;
	}
};
customElements.get("commons-file-viewer") || customElements.define("commons-file-viewer", Yt);
//#endregion
export { Z as AttachmentClient, Jt as CommonsCaseList, Gt as CommonsFilePreview, Yt as CommonsFileViewer, Kt as CommonsUploadCase, Q as attachmentFeed, Ie as bearer, Be as configureAuth, Le as devUser, $ as formatBytes, Ht as previewKind };

//# sourceMappingURL=attachment-ui.bundle.js.map