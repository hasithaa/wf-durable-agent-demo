/*! @bal-commons/notification-ui 0.1.0 | Apache-2.0 | Bundles Lit (BSD-3-Clause, Copyright (c) 2017 Google LLC) and @bal-commons/ui-core (Apache-2.0); see THIRD_PARTY_NOTICES.md */
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
}, T = class e {
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
						ctor: r[1] === "." ? De : r[1] === "?" ? Oe : r[1] === "@" ? ke : O
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
function E(e, t, n = e, r) {
	if (t === S) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = y(t) ? void 0 : t._$litDirective$;
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? _).importNode(t, !0);
		w.currentNode = r;
		let i = w.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new D(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ae(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = w.nextNode(), a++);
		}
		return w.currentNode = _, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, D = class e {
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
		e = E(this, e, t), y(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== S && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ge(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
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
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = T.createElement(we(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ee(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ce.get(e.strings);
		return t === void 0 && Ce.set(e.strings, t = new T(e)), t;
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
}, O = class {
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
		if (i === void 0) e = E(this, e, t, 0), a = !y(e) || e !== this._$AH && e !== S, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = E(this, r[n + o], t, o), s === S && (s = this._$AH[o]), a ||= !y(s) || s !== this._$AH[o], s === C ? e = C : e !== C && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, De = class extends O {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === C ? void 0 : e;
	}
}, Oe = class extends O {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== C);
	}
}, ke = class extends O {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = E(this, e, t, 0) ?? C) === S) return;
		let n = this._$AH, r = e === C && n !== C || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== C && (n === C || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ae = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		E(this, e);
	}
}, je = le.litHtmlPolyfillSupport;
je?.(T, D), (le.litHtmlVersions ??= []).push("3.3.3");
var Me = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new D(t.insertBefore(v(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, k = globalThis, A = class extends m {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Me(t, this.renderRoot, this.renderOptions);
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
A._$litElement$ = !0, A.finalized = !0, k.litElementHydrateSupport?.({ LitElement: A });
var Ne = k.litElementPolyfillSupport;
Ne?.({ LitElement: A }), (k.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region ../../service-commons/ui/dist/index.js
function Pe(e, t) {
	return {
		async headers() {
			let t = await e();
			return t ? { Authorization: `Bearer ${t}` } : {};
		},
		onUnauthorized: t
	};
}
function Fe(e, t = [], n = []) {
	return { headers: () => ({
		"x-user-id": e,
		"x-user-roles": t.join(","),
		...n.length ? { "x-user-scopes": n.join(" ") } : {}
	}) };
}
var Ie = { headers: () => ({}) }, Le = globalThis;
function Re(e) {
	Le.__balCommonsAuth = e;
}
function ze() {
	return Le.__balCommonsAuth ?? Ie;
}
var Be = class extends Error {
	constructor(e, t, n) {
		super(n), this.status = e, this.code = t, this.name = "ServiceError";
	}
};
async function j(e, t, n = {}) {
	let r = n.auth ?? ze(), i = { ...await r.headers() }, a;
	n.body !== void 0 && (i["content-type"] = "application/json", a = JSON.stringify(n.body));
	let o = await fetch(Ve(e, t, n.query), {
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
		throw new Be(o.status, e, t);
	}
	return o.status === 204 ? void 0 : await o.json();
}
function Ve(e, t, n) {
	let r = e.replace(/\/+$/, "") + (t.startsWith("/") ? t : "/" + t), i = Object.entries(n ?? {}).filter(([, e]) => e != null && e !== "");
	return i.length ? `${r}?${new URLSearchParams(i.map(([e, t]) => [e, String(t)]))}` : r;
}
var He = class {
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
			let { ticket: t } = await j(this.baseUrl, "/stream-ticket", {
				method: "POST",
				auth: this.options.auth ?? ze()
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
}, Ue = o`
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
var M = globalThis, N = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, P = Symbol(), Ge = /* @__PURE__ */ new WeakMap(), Ke = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== P) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (N && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = Ge.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ge.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, qe = (e) => new Ke(typeof e == "string" ? e : e + "", void 0, P), Je = (e, ...t) => new Ke(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, P), Ye = (e, t) => {
	if (N) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = M.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, Xe = N ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return qe(t);
})(e) : e, { is: Ze, defineProperty: Qe, getOwnPropertyDescriptor: $e, getOwnPropertyNames: et, getOwnPropertySymbols: tt, getPrototypeOf: nt } = Object, F = globalThis, rt = F.trustedTypes, it = rt ? rt.emptyScript : "", at = F.reactiveElementPolyfillSupport, I = (e, t) => e, L = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? it : null;
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
}, ot = (e, t) => !Ze(e, t), st = {
	attribute: !0,
	type: String,
	converter: L,
	reflect: !1,
	useDefault: !1,
	hasChanged: ot
};
Symbol.metadata ??= Symbol("metadata"), F.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var R = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = st) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && Qe(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = $e(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? st;
	}
	static _$Ei() {
		if (this.hasOwnProperty(I("elementProperties"))) return;
		let e = nt(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(I("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
			let e = this.properties, t = [...et(e), ...tt(e)];
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
			for (let e of n) t.unshift(Xe(e));
		} else e !== void 0 && t.push(Xe(e));
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
		return Ye(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? L : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? L : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ot)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[I("elementProperties")] = /* @__PURE__ */ new Map(), R[I("finalized")] = /* @__PURE__ */ new Map(), at?.({ ReactiveElement: R }), (F.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ct = globalThis, lt = (e) => e, z = ct.trustedTypes, ut = z ? z.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, dt = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + B, pt = `<${ft}>`, V = document, H = () => V.createComment(""), U = (e) => e === null || typeof e != "object" && typeof e != "function", mt = Array.isArray, ht = (e) => mt(e) || typeof e?.[Symbol.iterator] == "function", gt = "[ 	\n\f\r]", W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, vt = />/g, G = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, bt = /"/g, xt = /^(?:script|style|textarea|title)$/i, K = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), q = Symbol.for("lit-noChange"), J = Symbol.for("lit-nothing"), St = /* @__PURE__ */ new WeakMap(), Y = V.createTreeWalker(V, 129);
function Ct(e, t) {
	if (!mt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ut === void 0 ? t : ut.createHTML(t);
}
var wt = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = W;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === W ? c[1] === "!--" ? o = _t : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = G) : (xt.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = G) : o = vt : o === G ? c[0] === ">" ? (o = i ?? W, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? G : c[3] === "\"" ? bt : yt) : o === bt || o === yt ? o = G : o === _t || o === vt ? o = W : (o = G, i = void 0);
		let d = o === G && e[t + 1].startsWith("/>") ? " " : "";
		a += o === W ? n + pt : l >= 0 ? (r.push(s), n.slice(0, l) + dt + n.slice(l) + B + d) : n + B + (l === -2 ? t : d);
	}
	return [Ct(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Tt = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = wt(t, n);
		if (this.el = e.createElement(l, r), Y.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Y.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(dt)) {
					let t = u[o++], n = i.getAttribute(e).split(B), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ot : r[1] === "?" ? kt : r[1] === "@" ? At : Z
					}), i.removeAttribute(e);
				} else e.startsWith(B) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (xt.test(i.tagName)) {
					let e = i.textContent.split(B), t = e.length - 1;
					if (t > 0) {
						i.textContent = z ? z.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], H()), Y.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], H());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ft) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(B, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += B.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = V.createElement("template");
		return n.innerHTML = e, n;
	}
};
function X(e, t, n = e, r) {
	if (t === q) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = U(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = X(e, i._$AS(e, t.values), i, r)), t;
}
var Et = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? V).importNode(t, !0);
		Y.currentNode = r;
		let i = Y.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Dt(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new jt(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Y.nextNode(), a++);
		}
		return Y.currentNode = V, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Dt = class e {
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
		e = X(this, e, t), U(e) ? e === J || e == null || e === "" ? (this._$AH !== J && this._$AR(), this._$AH = J) : e !== this._$AH && e !== q && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ht(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== J && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Tt.createElement(Ct(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Et(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = St.get(e.strings);
		return t === void 0 && St.set(e.strings, t = new Tt(e)), t;
	}
	k(t) {
		mt(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(H()), this.O(H()), this, this.options)) : r = n[i], r._$AI(a), i++;
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
		if (i === void 0) e = X(this, e, t, 0), a = !U(e) || e !== this._$AH && e !== q, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = X(this, r[n + o], t, o), s === q && (s = this._$AH[o]), a ||= !U(s) || s !== this._$AH[o], s === J ? e = J : e !== J && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === J ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ot = class extends Z {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === J ? void 0 : e;
	}
}, kt = class extends Z {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== J);
	}
}, At = class extends Z {
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
}, jt = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		X(this, e);
	}
}, Mt = ct.litHtmlPolyfillSupport;
Mt?.(Tt, Dt), (ct.litHtmlVersions ??= []).push("3.3.3");
var Nt = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Dt(t.insertBefore(H(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Q = globalThis, $ = class extends R {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Nt(t, this.renderRoot, this.renderOptions);
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
$._$litElement$ = !0, $.finalized = !0, Q.litElementHydrateSupport?.({ LitElement: $ });
var Pt = Q.litElementPolyfillSupport;
Pt?.({ LitElement: $ }), (Q.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/client.ts
var Ft = class {
	constructor(e, t) {
		this.baseUrl = e, this.auth = t;
	}
	list(e = {}) {
		return j(this.baseUrl, "/notifications", {
			auth: this.auth,
			query: { ...e }
		});
	}
	unreadCount() {
		return j(this.baseUrl, "/notifications/unread-count", { auth: this.auth });
	}
	markRead(e) {
		return j(this.baseUrl, `/notifications/${encodeURIComponent(e)}/read`, {
			method: "PUT",
			auth: this.auth
		});
	}
	markUnread(e) {
		return j(this.baseUrl, `/notifications/${encodeURIComponent(e)}/read`, {
			method: "DELETE",
			auth: this.auth
		});
	}
	markAllRead(e = {}) {
		return j(this.baseUrl, "/notifications/read-all", {
			method: "POST",
			body: e,
			auth: this.auth
		});
	}
}, It = class extends EventTarget {
	constructor(e, t) {
		super(), this.baseUrl = e, this.auth = t, this.users = 0;
	}
	subscribe(e) {
		let t = (t) => e(t.detail);
		return this.addEventListener("change", t), this.users++ === 0 && (this.stream = new He(this.baseUrl, {
			"notification.created": (e) => this.emit({
				type: "created",
				notification: e
			}),
			"notification.read": ({ id: e, readAt: t }) => this.emit({
				type: "read",
				id: e,
				readAt: t
			}),
			"notification.unread": ({ id: e }) => this.emit({
				type: "unread",
				id: e
			}),
			"notification.read-all": () => this.emit({ type: "read-all" }),
			"notification.deleted": ({ id: e }) => this.emit({
				type: "deleted",
				id: e
			})
		}, {
			auth: this.auth,
			replay: !0,
			onReconnect: () => this.emit({ type: "reconnected" })
		}), this.stream.start()), () => {
			this.removeEventListener("change", t), --this.users === 0 && (this.stream?.stop(), this.stream = void 0);
		};
	}
	emit(e) {
		this.dispatchEvent(new CustomEvent("change", { detail: e }));
	}
}, Lt = /* @__PURE__ */ new Map();
function Rt(e, t) {
	let n = Lt.get(e);
	return n || (n = new It(e, t), Lt.set(e, n)), n;
}
//#endregion
//#region src/bell.ts
var zt = class extends $ {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			auth: { attribute: !1 },
			label: { type: String },
			count: {
				state: !0,
				attribute: !1
			}
		};
	}
	constructor() {
		super(), this.baseUrl = "", this.label = "Notifications", this.count = 0;
	}
	static {
		this.styles = [Ue, Je`
    :host { display: inline-block; }
    button {
      position: relative; display: inline-flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--_border);
      background: var(--_bg); color: var(--_fg); cursor: pointer;
    }
    button:focus-visible { outline: 2px solid var(--_accent); outline-offset: 2px; }
    svg { width: 20px; height: 20px; }
    .badge {
      position: absolute; top: -4px; right: -4px; min-width: 18px; height: 18px; padding: 0 5px;
      border-radius: 9px; background: var(--_error); color: #fff; font-size: 11px; line-height: 18px;
      font-weight: 600; box-sizing: border-box;
    }
  `];
	}
	connectedCallback() {
		super.connectedCallback(), this.baseUrl && this.start();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribe?.();
	}
	updated(e) {
		e.has("baseUrl") && this.baseUrl && this.isConnected && this.start();
	}
	async refresh() {
		try {
			this.count = (await new Ft(this.baseUrl, this.auth).unreadCount()).total;
		} catch {}
	}
	start() {
		this.unsubscribe?.(), this.unsubscribe = Rt(this.baseUrl, this.auth).subscribe(() => void this.refresh()), this.refresh();
	}
	render() {
		let e = this.count > 99 ? "99+" : String(this.count);
		return K`<button part="button" aria-label="${this.label}${this.count ? `, ${this.count} unread` : ""}"
        @click=${() => this.dispatchEvent(new CustomEvent("commons-bell-click", {
			bubbles: !0,
			composed: !0
		}))}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" aria-hidden="true">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      ${this.count ? K`<span class="badge" part="badge">${e}</span>` : null}
    </button>`;
	}
};
customElements.get("commons-notification-bell") || customElements.define("commons-notification-bell", zt);
//#endregion
//#region src/inbox.ts
var Bt = [
	{
		box: "all",
		label: "All"
	},
	{
		box: "personal",
		label: "Personal"
	},
	{
		box: "role",
		label: "Roles"
	}
], Vt = class extends $ {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			auth: { attribute: !1 },
			box: {
				type: String,
				reflect: !0
			},
			pageSize: {
				type: Number,
				attribute: "page-size"
			},
			hideTabs: {
				type: Boolean,
				attribute: "hide-tabs"
			},
			items: {
				state: !0,
				attribute: !1
			},
			nextCursor: {
				state: !0,
				attribute: !1
			},
			loading: {
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
		super(), this.baseUrl = "", this.box = "all", this.pageSize = 20, this.hideTabs = !1, this.items = [], this.loading = !1;
	}
	static {
		this.styles = [Ue, Je`
    :host { display: block; background: var(--_bg); border: 1px solid var(--_border); border-radius: var(--_radius); }
    header { display: flex; gap: 4px; align-items: center; padding: 8px; border-bottom: 1px solid var(--_border); }
    .tab, .link, .more {
      font: inherit; font-size: 12px; border: 1px solid transparent; border-radius: 6px; padding: 4px 10px;
      background: none; color: var(--_fg); cursor: pointer;
    }
    .tab[aria-selected="true"] { background: var(--_accent-soft); border-color: var(--_accent); }
    .link { margin-left: auto; color: var(--_accent); }
    button:focus-visible { outline: 2px solid var(--_accent); outline-offset: 1px; }
    ul { list-style: none; margin: 0; padding: 4px; display: grid; gap: 4px; }
    li {
      display: grid; grid-template-columns: 1fr auto; gap: 2px 8px; padding: 8px 10px; border-radius: 6px;
      border-left: 3px solid var(--_info); cursor: pointer;
    }
    li:hover { background: var(--_surface); }
    li.WARNING { border-left-color: var(--_warning); } li.ERROR { border-left-color: var(--_error); }
    li.SUCCESS { border-left-color: var(--_success); }
    li.read { opacity: .6; }
    .title { font-weight: 600; font-size: 14px; }
    .unread-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--_accent); align-self: center; }
    .body { grid-column: 1 / -1; font-size: 13px; }
    .meta { grid-column: 1 / -1; font-size: 11px; color: var(--_muted); display: flex; gap: 8px; }
    .toggle { border: none; background: none; color: var(--_accent); cursor: pointer; font: inherit; padding: 0; }
    .empty, .error { padding: 16px; font-size: 13px; color: var(--_muted); text-align: center; }
    .error { color: var(--_error); }
    .more { display: block; margin: 4px auto 8px; border-color: var(--_border); }
  `];
	}
	connectedCallback() {
		super.connectedCallback(), this.baseUrl && this.start();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribe?.();
	}
	updated(e) {
		(e.has("baseUrl") || e.has("box")) && this.baseUrl && this.isConnected && (e.has("baseUrl") ? this.start() : this.reload());
	}
	async reload() {
		this.loading = !0;
		try {
			let e = await this.client().list({
				box: this.box,
				limit: this.pageSize
			});
			this.items = e.items, this.nextCursor = e.nextCursor, this.error = void 0;
		} catch (e) {
			this.error = e.message;
		} finally {
			this.loading = !1;
		}
	}
	async loadMore() {
		if (!this.nextCursor) return;
		let e = await this.client().list({
			box: this.box,
			limit: this.pageSize,
			cursor: this.nextCursor
		});
		this.items = [...this.items, ...e.items], this.nextCursor = e.nextCursor;
	}
	client() {
		return new Ft(this.baseUrl, this.auth);
	}
	start() {
		this.unsubscribe?.(), this.unsubscribe = Rt(this.baseUrl, this.auth).subscribe((e) => this.apply(e)), this.reload();
	}
	apply(e) {
		switch (e.type) {
			case "created":
				this.inBox(e.notification) && !this.items.some((t) => t.id === e.notification.id) && (this.items = [e.notification, ...this.items]);
				break;
			case "read":
			case "unread":
				this.items = this.items.map((t) => t.id === e.id ? {
					...t,
					read: e.type === "read",
					readAt: e.type === "read" ? e.readAt : void 0
				} : t);
				break;
			case "deleted":
				this.items = this.items.filter((t) => t.id !== e.id);
				break;
			default: this.reload();
		}
	}
	inBox(e) {
		return this.box === "all" || this.box === "personal" == (e.recipientType === "USER");
	}
	async open(e) {
		let t = new CustomEvent("commons-notification-click", {
			detail: { notification: e },
			bubbles: !0,
			composed: !0,
			cancelable: !0
		});
		this.dispatchEvent(t) && !e.read && await this.setRead(e, !0);
	}
	async setRead(e, t) {
		let n = t ? await this.client().markRead(e.id) : await this.client().markUnread(e.id);
		this.items = this.items.map((t) => t.id === e.id ? n : t);
	}
	async markAll() {
		await this.client().markAllRead({ box: this.box }), await this.reload();
	}
	render() {
		return K`
      <header part="header">
        ${this.hideTabs ? J : Bt.map(({ box: e, label: t }) => K`
          <button class="tab" role="tab" aria-selected=${this.box === e} @click=${() => {
			this.box = e;
		}}>
            ${t}</button>`)}
        <button class="link" part="mark-all" @click=${() => this.markAll()}>Mark all read</button>
      </header>
      ${this.error ? K`<div class="error" role="alert">${this.error}</div>` : J}
      ${!this.loading && !this.error && this.items.length === 0 ? K`<div class="empty">No notifications.</div>` : J}
      <ul part="list" aria-label="Notifications">
        ${this.items.map((e) => K`
          <li class="${e.severity} ${e.read ? "read" : ""}" part="item" tabindex="0"
              @click=${() => this.open(e)} @keydown=${(t) => t.key === "Enter" && this.open(e)}>
            <span class="title">${e.title}</span>
            ${e.read ? K`<span></span>` : K`<span class="unread-dot" aria-label="unread"></span>`}
            ${e.body ? K`<span class="body">${e.body}</span>` : J}
            <span class="meta">
              <span>${e.recipientType === "ROLE" ? `Role ${e.recipientId}` : "Personal"}</span>
              <span title=${e.createdAt}>${We(e.createdAt)}</span>
              <button class="toggle" @click=${(t) => {
			t.stopPropagation(), this.setRead(e, !e.read);
		}}>
                ${e.read ? "Mark unread" : "Mark read"}</button>
            </span>
          </li>`)}
      </ul>
      ${this.nextCursor ? K`<button class="more" @click=${() => this.loadMore()}>Load more</button>` : J}
    `;
	}
};
customElements.get("commons-inbox") || customElements.define("commons-inbox", Vt);
//#endregion
export { Vt as CommonsInbox, zt as CommonsNotificationBell, Ft as NotificationClient, Pe as bearer, Re as configureAuth, Fe as devUser };

//# sourceMappingURL=notification-ui.bundle.js.map