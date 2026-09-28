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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, re = f.trustedTypes, ie = re ? re.emptyScript : "", ae = f.reactiveElementPolyfillSupport, p = (e, t) => e, oe = {
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
}, se = (e, t) => !l(e, t), ce = {
	attribute: !0,
	type: String,
	converter: oe,
	reflect: !1,
	useDefault: !1,
	hasChanged: se
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var m = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ce) {
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
		return this.elementProperties.get(e) ?? ce;
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
			let i = (n.converter?.toAttribute === void 0 ? oe : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? oe : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? se)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
m.elementStyles = [], m.shadowRootOptions = { mode: "open" }, m[p("elementProperties")] = /* @__PURE__ */ new Map(), m[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: m }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region ../../service-commons/ui/node_modules/lit-html/lit-html.js
var le = globalThis, ue = (e) => e, h = le.trustedTypes, de = h ? h.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, fe = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + g, me = `<${pe}>`, _ = document, v = () => _.createComment(""), y = (e) => e === null || typeof e != "object" && typeof e != "function", he = Array.isArray, ge = (e) => he(e) || typeof e?.[Symbol.iterator] == "function", _e = "[ 	\n\f\r]", b = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, ye = />/g, x = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, xe = /"/g, Se = /^(?:script|style|textarea|title)$/i, S = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), w = _.createTreeWalker(_, 129);
function we(e, t) {
	if (!he(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return de === void 0 ? t : de.createHTML(t);
}
var Te = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = b;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === b ? c[1] === "!--" ? o = ve : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = x) : (Se.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = x) : o = ye : o === x ? c[0] === ">" ? (o = i ?? b, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? x : c[3] === "\"" ? xe : be) : o === xe || o === be ? o = x : o === ve || o === ye ? o = b : (o = x, i = void 0);
		let d = o === x && e[t + 1].startsWith("/>") ? " " : "";
		a += o === b ? n + me : l >= 0 ? (r.push(s), n.slice(0, l) + fe + n.slice(l) + g + d) : n + g + (l === -2 ? t : d);
	}
	return [we(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ee = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Te(t, n);
		if (this.el = e.createElement(l, r), w.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = w.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(fe)) {
					let t = u[o++], n = i.getAttribute(e).split(g), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Oe : r[1] === "?" ? ke : r[1] === "@" ? Ae : D
					}), i.removeAttribute(e);
				} else e.startsWith(g) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Se.test(i.tagName)) {
					let e = i.textContent.split(g), t = e.length - 1;
					if (t > 0) {
						i.textContent = h ? h.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], v()), w.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], v());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === pe) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(g, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += g.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = _.createElement("template");
		return n.innerHTML = e, n;
	}
};
function T(e, t, n = e, r) {
	if (t === S) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = y(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = T(e, i._$AS(e, t.values), i, r)), t;
}
var De = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? _).importNode(t, !0);
		w.currentNode = r;
		let i = w.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new E(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new je(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = w.nextNode(), a++);
		}
		return w.currentNode = _, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, E = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = T(this, e, t), y(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== S && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ge(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== C && y(this._$AH) ? this._$AA.nextSibling.data = e : this.T(_.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ee.createElement(we(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new De(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ce.get(e.strings);
		return t === void 0 && Ce.set(e.strings, t = new Ee(e)), t;
	}
	k(t) {
		he(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(v()), this.O(v()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ue(e).nextSibling;
			ue(e).remove(), e = t;
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
		this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = C;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = T(this, e, t, 0), a = !y(e) || e !== this._$AH && e !== S, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = T(this, r[n + o], t, o), s === S && (s = this._$AH[o]), a ||= !y(s) || s !== this._$AH[o], s === C ? e = C : e !== C && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Oe = class extends D {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === C ? void 0 : e;
	}
}, ke = class extends D {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== C);
	}
}, Ae = class extends D {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = T(this, e, t, 0) ?? C) === S) return;
		let n = this._$AH, r = e === C && n !== C || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== C && (n === C || r);
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
		T(this, e);
	}
}, Me = le.litHtmlPolyfillSupport;
Me?.(Ee, E), (le.litHtmlVersions ??= []).push("3.3.3");
var Ne = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new E(t.insertBefore(v(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Pe = globalThis, O = class extends m {
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
		return S;
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
}, We = o`
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
`, j = globalThis, M = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ge = Symbol(), Ke = /* @__PURE__ */ new WeakMap(), qe = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== Ge) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (M && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = Ke.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ke.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, Je = (e) => new qe(typeof e == "string" ? e : e + "", void 0, Ge), Ye = (e, ...t) => new qe(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, Ge), Xe = (e, t) => {
	if (M) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = j.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, Ze = M ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return Je(t);
})(e) : e, { is: Qe, defineProperty: $e, getOwnPropertyDescriptor: et, getOwnPropertyNames: tt, getOwnPropertySymbols: nt, getPrototypeOf: rt } = Object, N = globalThis, it = N.trustedTypes, at = it ? it.emptyScript : "", ot = N.reactiveElementPolyfillSupport, P = (e, t) => e, F = {
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
}, st = (e, t) => !Qe(e, t), ct = {
	attribute: !0,
	type: String,
	converter: F,
	reflect: !1,
	useDefault: !1,
	hasChanged: st
};
Symbol.metadata ??= Symbol("metadata"), N.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var I = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ct) {
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
		return this.elementProperties.get(e) ?? ct;
	}
	static _$Ei() {
		if (this.hasOwnProperty(P("elementProperties"))) return;
		let e = rt(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(P("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
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
			let i = (n.converter?.toAttribute === void 0 ? F : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? F : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? st)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[P("elementProperties")] = /* @__PURE__ */ new Map(), I[P("finalized")] = /* @__PURE__ */ new Map(), ot?.({ ReactiveElement: I }), (N.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var L = globalThis, lt = (e) => e, R = L.trustedTypes, ut = R ? R.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, dt = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + z, pt = `<${ft}>`, B = document, V = () => B.createComment(""), H = (e) => e === null || typeof e != "object" && typeof e != "function", U = Array.isArray, mt = (e) => U(e) || typeof e?.[Symbol.iterator] == "function", ht = "[ 	\n\f\r]", W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, _t = />/g, G = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), vt = /'/g, yt = /"/g, bt = /^(?:script|style|textarea|title)$/i, K = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), q = Symbol.for("lit-noChange"), J = Symbol.for("lit-nothing"), xt = /* @__PURE__ */ new WeakMap(), Y = B.createTreeWalker(B, 129);
function St(e, t) {
	if (!U(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ut === void 0 ? t : ut.createHTML(t);
}
var Ct = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = W;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === W ? c[1] === "!--" ? o = gt : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = G) : (bt.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = G) : o = _t : o === G ? c[0] === ">" ? (o = i ?? W, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? G : c[3] === "\"" ? yt : vt) : o === yt || o === vt ? o = G : o === gt || o === _t ? o = W : (o = G, i = void 0);
		let d = o === G && e[t + 1].startsWith("/>") ? " " : "";
		a += o === W ? n + pt : l >= 0 ? (r.push(s), n.slice(0, l) + dt + n.slice(l) + z + d) : n + z + (l === -2 ? t : d);
	}
	return [St(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, wt = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ct(t, n);
		if (this.el = e.createElement(l, r), Y.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Y.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(dt)) {
					let t = u[o++], n = i.getAttribute(e).split(z), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Dt : r[1] === "?" ? Ot : r[1] === "@" ? kt : Z
					}), i.removeAttribute(e);
				} else e.startsWith(z) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (bt.test(i.tagName)) {
					let e = i.textContent.split(z), t = e.length - 1;
					if (t > 0) {
						i.textContent = R ? R.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], V()), Y.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], V());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ft) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(z, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += z.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = B.createElement("template");
		return n.innerHTML = e, n;
	}
};
function X(e, t, n = e, r) {
	if (t === q) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = H(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = X(e, i._$AS(e, t.values), i, r)), t;
}
var Tt = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? B).importNode(t, !0);
		Y.currentNode = r;
		let i = Y.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Et(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new At(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Y.nextNode(), a++);
		}
		return Y.currentNode = B, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Et = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = J, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = X(this, e, t), H(e) ? e === J || e == null || e === "" ? (this._$AH !== J && this._$AR(), this._$AH = J) : e !== this._$AH && e !== q && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? mt(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== J && H(this._$AH) ? this._$AA.nextSibling.data = e : this.T(B.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = wt.createElement(St(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Tt(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = xt.get(e.strings);
		return t === void 0 && xt.set(e.strings, t = new wt(e)), t;
	}
	k(t) {
		U(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(V()), this.O(V()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = lt(e).nextSibling;
			lt(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Z = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = J, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = J;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = X(this, e, t, 0), a = !H(e) || e !== this._$AH && e !== q, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = X(this, r[n + o], t, o), s === q && (s = this._$AH[o]), a ||= !H(s) || s !== this._$AH[o], s === J ? e = J : e !== J && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === J ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Dt = class extends Z {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === J ? void 0 : e;
	}
}, Ot = class extends Z {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== J);
	}
}, kt = class extends Z {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = X(this, e, t, 0) ?? J) === q) return;
		let n = this._$AH, r = e === J && n !== J || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== J && (n === J || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, At = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		X(this, e);
	}
}, jt = L.litHtmlPolyfillSupport;
jt?.(wt, Et), (L.litHtmlVersions ??= []).push("3.3.3");
var Mt = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Et(t.insertBefore(V(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Nt = globalThis, Q = class extends I {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Mt(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return q;
	}
};
Q._$litElement$ = !0, Q.finalized = !0, Nt.litElementHydrateSupport?.({ LitElement: Q });
var Pt = Nt.litElementPolyfillSupport;
Pt?.({ LitElement: Q }), (Nt.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/client.ts
var $ = class {
	constructor(e, t) {
		this.baseUrl = e, this.auth = t;
	}
	getCase(e) {
		return A(this.baseUrl, `/cases/${encodeURIComponent(e)}`, { auth: this.auth });
	}
	listCases(e = {}) {
		return A(this.baseUrl, "/cases", {
			auth: this.auth,
			query: { ...e }
		});
	}
	async upload(e, t, n) {
		let r = this.auth ?? k(), i = `${this.baseUrl.replace(/\/+$/, "")}/cases/${encodeURIComponent(e)}/slots/${encodeURIComponent(t)}/files?fileName=${encodeURIComponent(n.name)}`, a = await fetch(i, {
			method: "POST",
			body: n,
			headers: {
				...await r.headers(),
				"content-type": n.type || "application/octet-stream"
			}
		});
		if (!a.ok) {
			let e = await a.json().catch(() => ({}));
			throw new Ve(a.status, e.code ?? `HTTP_${a.status}`, e.message ?? a.statusText);
		}
		return a.json();
	}
	submit(e) {
		return A(this.baseUrl, `/cases/${encodeURIComponent(e)}/submit`, {
			method: "POST",
			auth: this.auth
		});
	}
	async link(e, t) {
		let { url: n } = await A(this.baseUrl, `/cases/${encodeURIComponent(e)}/files/${encodeURIComponent(t)}/link`, {
			method: "POST",
			auth: this.auth
		}), r = new URL(this.baseUrl, globalThis.location?.href).pathname.replace(/\/+$/, ""), i = n.startsWith(r) ? n.slice(r.length) : n.replace(/^\/[^/]+\/v\d+/, "");
		return this.baseUrl.replace(/\/+$/, "") + i;
	}
}, Ft = class extends Q {
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
			auth: { attribute: !1 },
			case: {
				state: !0,
				attribute: !1
			},
			links: {
				state: !0,
				attribute: !1
			},
			busy: {
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
		super(), this.baseUrl = "", this.caseId = "", this.links = {}, this.busy = !1;
	}
	static {
		this.styles = [We, Ye`
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
    .thumbs img { width: 72px; height: 72px; object-fit: cover; border-radius: 6px; border: 1px solid var(--_border); }
    .thumbs a { font-size: 13px; color: var(--_accent); }
    button { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--_accent);
      background: var(--_accent); color: #fff; cursor: pointer; justify-self: start; }
    button:disabled { opacity: .5; cursor: default; }
    .error { color: var(--_error); font-size: 13px; }
  `];
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.stream?.stop();
	}
	updated(e) {
		if ((e.has("caseId") || e.has("baseUrl")) && this.baseUrl && this.caseId) {
			this.stream?.stop();
			let e = (e) => (e.caseId ?? e.id) === this.caseId && void this.reload();
			this.stream = new Ue(this.baseUrl, {
				"attachment.uploaded": e,
				"attachment.deleted": e,
				"case.submitted": e,
				"case.reopened": e,
				"case.closed": e
			}, {
				auth: this.auth,
				onReconnect: () => void this.reload()
			}), this.stream.start(), this.reload();
		}
	}
	async reload() {
		try {
			let e = new $(this.baseUrl, this.auth), t = await e.getCase(this.caseId), n = {};
			for (let r of t.files ?? []) n[r.id] = this.links[r.id] ?? await e.link(t.id, r.id).catch(() => "");
			this.case = t, this.links = n, this.error = void 0;
		} catch (e) {
			this.error = e.message;
		}
	}
	async upload(e, t) {
		let n = t.files?.[0];
		if (n && this.case) {
			this.busy = !0;
			try {
				let t = await new $(this.baseUrl, this.auth).upload(this.case.id, e.name, n);
				this.dispatchEvent(new CustomEvent("commons-file-uploaded", {
					detail: { attachment: t },
					bubbles: !0,
					composed: !0
				})), await this.reload();
			} catch (e) {
				this.error = e.message;
			} finally {
				this.busy = !1, t.value = "";
			}
		}
	}
	async submit() {
		try {
			let e = await new $(this.baseUrl, this.auth).submit(this.caseId);
			this.case = e, this.dispatchEvent(new CustomEvent("commons-case-submitted", {
				detail: { case: e },
				bubbles: !0,
				composed: !0
			}));
		} catch (e) {
			this.error = e.message;
		}
	}
	render() {
		let e = this.case;
		if (!e) return this.error ? K`<div class="error" role="alert">${this.error}</div>` : K`<div class="meta">Loading…</div>`;
		let t = e.status === "OPEN";
		return K`
      <div class="head"><strong>${e.title}</strong><span class="status ${e.status}">${e.status}</span></div>
      ${e.statusReason ? K`<div class="reason">${e.statusReason}</div>` : J}
      ${e.slots.map((n) => {
			let r = (e.files ?? []).filter((e) => e.slot === n.name);
			return K`<div class="slot ${n.satisfied ? "done" : ""}" part="slot">
          <div><strong>${n.label}</strong> <span class="meta">${n.fileCount}/${n.maxFiles}
            · ${n.mimeTypes.join(", ") || "any type"}${n.minFiles === 0 ? " · optional" : ""}</span></div>
          ${n.description ? K`<div class="meta">${n.description}</div>` : J}
          <div class="thumbs">${r.map((e) => e.mimeType.startsWith("image/") && this.links[e.id] ? K`<img src=${this.links[e.id]} alt=${e.fileName} title=${e.fileName}>` : K`<a href=${this.links[e.id] ?? "#"} target="_blank" rel="noopener">${e.fileName}</a>`)}</div>
          ${t && n.fileCount < n.maxFiles ? K`<input type="file" aria-label="Upload ${n.label}"
              accept=${n.mimeTypes.join(",")} ?disabled=${this.busy}
              @change=${(e) => this.upload(n, e.target)}>` : J}
        </div>`;
		})}
      ${t && !e.autoSubmit ? K`<button part="submit" ?disabled=${!e.slots.every((e) => e.satisfied)}
          @click=${this.submit}>Submit</button>` : J}
      ${this.error ? K`<div class="error" role="alert">${this.error}</div>` : J}
    `;
	}
};
customElements.get("commons-upload-case") || customElements.define("commons-upload-case", Ft);
//#endregion
export { $ as AttachmentClient, Ft as CommonsUploadCase, Ie as bearer, Be as configureAuth, Le as devUser };

//# sourceMappingURL=attachment-ui.bundle.js.map