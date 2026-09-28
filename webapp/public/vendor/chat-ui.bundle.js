/*! @bal-commons/chat-ui 0.1.0 | Apache-2.0 | Bundles Lit (BSD-3-Clause, Copyright (c) 2017 Google LLC) and @bal-commons/ui-core (Apache-2.0); see THIRD_PARTY_NOTICES.md */
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
	listConversations(e = {}) {
		return j(this.baseUrl, "/conversations", {
			auth: this.auth,
			query: { ...e }
		});
	}
	getConversation(e) {
		return j(this.baseUrl, `/conversations/${encodeURIComponent(e)}`, { auth: this.auth });
	}
	history(e, t = {}) {
		return j(this.baseUrl, `/conversations/${encodeURIComponent(e)}/messages`, {
			auth: this.auth,
			query: { ...t }
		});
	}
	sendText(e, t) {
		return j(this.baseUrl, `/conversations/${encodeURIComponent(e)}/messages`, {
			method: "POST",
			body: { content: t },
			auth: this.auth
		});
	}
	submitForm(e, t, n) {
		return j(this.baseUrl, `/conversations/${encodeURIComponent(e)}/messages`, {
			method: "POST",
			body: {
				kind: "FORM_RESPONSE",
				replyTo: t,
				content: n
			},
			auth: this.auth
		});
	}
	markRead(e, t) {
		return j(this.baseUrl, `/conversations/${encodeURIComponent(e)}/read`, {
			method: "PUT",
			body: { seq: t },
			auth: this.auth
		});
	}
	typing(e) {
		return j(this.baseUrl, `/conversations/${encodeURIComponent(e)}/typing`, {
			method: "POST",
			body: {},
			auth: this.auth
		});
	}
}, It = class extends EventTarget {
	constructor(e, t) {
		super(), this.baseUrl = e, this.auth = t, this.users = 0;
	}
	subscribe(e) {
		let t = (t) => e(t.detail);
		if (this.addEventListener("change", t), this.users++ === 0) {
			let e = (e) => this.emit({
				type: "message",
				message: e
			}), t = (e) => this.emit({
				type: "conversation",
				conversation: e
			});
			this.stream = new He(this.baseUrl, {
				"message.created": e,
				"message.completed": e,
				"message.updated": e,
				"message.delta": ({ conversationId: e, messageId: t, text: n }) => this.emit({
					type: "delta",
					conversationId: e,
					messageId: t,
					text: n
				}),
				typing: ({ conversationId: e, participantId: t }) => this.emit({
					type: "typing",
					conversationId: e,
					participantId: t
				}),
				"conversation.created": t,
				"conversation.closed": t,
				"conversation.read": ({ conversationId: e, participantId: t, seq: n }) => this.emit({
					type: "read",
					conversationId: e,
					participantId: t,
					seq: n
				})
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
}, Lt = /* @__PURE__ */ new Map();
function Rt(e, t) {
	let n = Lt.get(e);
	return n || (n = new It(e, t), Lt.set(e, n)), n;
}
//#endregion
//#region src/conversation-list.ts
var zt = class extends $ {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			auth: { attribute: !1 },
			selected: {
				type: String,
				reflect: !0
			},
			me: { type: String },
			items: {
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
		super(), this.baseUrl = "", this.items = [];
	}
	static {
		this.styles = [Ue, Je`
    :host { display: block; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
    li { padding: 8px 10px; border-radius: 6px; border: 1px solid transparent; cursor: pointer; }
    li:hover { background: var(--_surface); }
    li[aria-selected="true"] { border-color: var(--_accent); background: var(--_accent-soft); }
    li:focus-visible { outline: 2px solid var(--_accent); }
    .top { display: flex; gap: 6px; align-items: center; }
    .title { flex: 1; font-weight: 600; font-size: 14px; }
    .unread { background: var(--_accent); color: #fff; border-radius: 10px; padding: 0 7px; font-size: 11px; }
    .closed { font-size: 11px; color: var(--_muted); }
    .meta { font-size: 12px; color: var(--_muted); }
    .empty, .error { padding: 12px; font-size: 13px; color: var(--_muted); }
    .error { color: var(--_error); }
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
	async reload() {
		try {
			this.items = (await new Ft(this.baseUrl, this.auth).listConversations({ limit: 50 })).items, this.error = void 0;
		} catch (e) {
			this.error = e.message;
		}
	}
	start() {
		this.unsubscribe?.(), this.unsubscribe = Rt(this.baseUrl, this.auth).subscribe((e) => {
			e.type !== "delta" && e.type !== "typing" && (clearTimeout(this.pending), this.pending = setTimeout(() => void this.reload(), 300));
		}), this.reload();
	}
	select(e) {
		this.selected = e.id, this.dispatchEvent(new CustomEvent("commons-conversation-select", {
			detail: { conversation: e },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return this.error ? K`<div class="error" role="alert">${this.error}</div>` : this.items.length ? K`<ul part="list" role="listbox" aria-label="Conversations">
      ${this.items.map((e) => {
			let t = e.participants.filter((e) => e.participantId !== this.me).map((e) => e.displayName || e.participantId).join(", ");
			return K`<li part="item" role="option" tabindex="0" aria-selected=${this.selected === e.id}
            @click=${() => this.select(e)} @keydown=${(t) => t.key === "Enter" && this.select(e)}>
          <div class="top">
            <span class="title">${e.title || e.correlationId}</span>
            ${e.status === "CLOSED" ? K`<span class="closed">closed</span>` : J}
            ${e.unread ? K`<span class="unread" aria-label="${e.unread} unread">${e.unread}</span>` : J}
          </div>
          <div class="meta">with ${t} · <span title=${e.updatedAt}>${We(e.updatedAt)}</span></div>
        </li>`;
		})}
    </ul>` : K`<div class="empty">No conversations.</div>`;
	}
};
customElements.get("commons-conversation-list") || customElements.define("commons-conversation-list", zt);
//#endregion
//#region src/conversation.ts
var Bt = class extends $ {
	static {
		this.properties = {
			baseUrl: {
				type: String,
				attribute: "base-url"
			},
			conversationId: {
				type: String,
				attribute: "conversation-id"
			},
			auth: { attribute: !1 },
			me: { type: String },
			attachmentsUrl: {
				type: String,
				attribute: "attachments-url"
			},
			conversation: {
				state: !0,
				attribute: !1
			},
			messages: {
				state: !0,
				attribute: !1
			},
			typing: {
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
		super(), this.baseUrl = "", this.conversationId = "", this.messages = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = [Ue, Je`
    :host { display: flex; flex-direction: column; min-height: 0; height: 100%; background: var(--_surface); }
    header { padding: 12px 16px; background: var(--_bg); border-bottom: 1px solid var(--_border); }
    header .title { font-weight: 600; }
    header .meta { font-size: 12px; color: var(--_muted); }
    .messages { flex: 1; min-height: 0; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .msg { max-width: 75%; padding: 9px 12px; border-radius: 12px; background: var(--_bg); border: 1px solid var(--_border);
      word-break: break-word; }
    .text { white-space: pre-wrap; }
    .msg.mine { align-self: flex-end; background: var(--_accent-soft); border-color: transparent; }
    .msg.system { align-self: center; background: none; border: none; color: var(--_muted); font-size: 12px; }
    .from { font-size: 11px; color: var(--_muted); margin-bottom: 2px; }
    .streaming .text::after { content: "▍"; animation: blink 1s steps(2) infinite; }
    @keyframes blink { 50% { opacity: 0; } }
    form, .card { display: grid; gap: 8px; margin-top: 6px; padding: 10px 12px; border: 1px solid var(--_border);
      border-radius: 10px; background: var(--_bg); white-space: normal; }
    label { display: grid; gap: 3px; font-size: 13px; }
    label.check { display: flex; gap: 8px; align-items: center; }
    input, textarea, select { font: inherit; padding: 6px 8px; border: 1px solid var(--_border); border-radius: 6px;
      background: var(--_bg); color: var(--_fg); }
    label.check input { width: auto; }
    button { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--_accent);
      background: var(--_accent); color: #fff; cursor: pointer; }
    button:focus-visible, input:focus-visible { outline: 2px solid var(--_accent); outline-offset: 1px; }
    .done { color: var(--_success); font-size: 13px; }
    .typing { padding: 0 16px 6px; font-size: 12px; color: var(--_muted); }
    .composer { display: flex; gap: 8px; padding: 12px 16px; background: var(--_bg); border-top: 1px solid var(--_border); }
    .composer input { flex: 1; }
    .error { padding: 12px 16px; color: var(--_error); font-size: 13px; }
  `];
	}
	connectedCallback() {
		super.connectedCallback(), this.unsubscribe?.(), this.baseUrl && (this.unsubscribe = Rt(this.baseUrl, this.auth).subscribe((e) => this.apply(e)));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribe?.();
	}
	updated(e) {
		if (e.has("baseUrl") && this.baseUrl && this.isConnected && (this.unsubscribe?.(), this.unsubscribe = Rt(this.baseUrl, this.auth).subscribe((e) => this.apply(e))), (e.has("conversationId") || e.has("baseUrl")) && this.baseUrl && this.conversationId && this.reload(), e.has("messages")) {
			let e = this.renderRoot.querySelector(".messages");
			e?.scrollTo({ top: e.scrollHeight });
		}
	}
	async reload() {
		try {
			let e = this.client(), [t, n] = await Promise.all([e.getConversation(this.conversationId), e.history(this.conversationId, { limit: 100 })]);
			this.conversation = t, this.messages = new Map(n.items.map((e) => [e.id, e])), this.error = void 0, this.markRead();
		} catch (e) {
			this.error = e.message;
		}
	}
	client() {
		return new Ft(this.baseUrl, this.auth);
	}
	apply(e) {
		switch (e.type) {
			case "message":
				e.message.conversationId === this.conversationId && (this.messages = new Map(this.messages).set(e.message.id, e.message), this.typing = void 0, e.message.senderId !== this.me && this.markRead());
				break;
			case "delta": {
				let t = this.messages.get(e.messageId);
				if (e.conversationId === this.conversationId && t) {
					let n = (typeof t.content == "string" ? t.content : "") + e.text;
					this.messages = new Map(this.messages).set(t.id, {
						...t,
						content: n
					}), this.typing = void 0;
				}
				break;
			}
			case "typing":
				e.conversationId === this.conversationId && e.participantId !== this.me && (this.typing = this.nameOf(e.participantId), clearTimeout(this.typingTimer), this.typingTimer = setTimeout(() => {
					this.typing = void 0;
				}, 6e3));
				break;
			case "conversation":
				e.conversation.id === this.conversationId && (this.conversation = e.conversation);
				break;
			case "reconnected": this.reload();
		}
	}
	async markRead() {
		let e = Math.max(0, ...[...this.messages.values()].map((e) => e.seq));
		e > 0 && this.conversation?.participants.some((e) => e.participantId === this.me) && await this.client().markRead(this.conversationId, e).catch(() => void 0);
	}
	nameOf(e) {
		return this.conversation?.participants.find((t) => t.participantId === e)?.displayName || e;
	}
	async send(e) {
		e.preventDefault();
		let t = e.target.elements.namedItem("text"), n = t.value.trim();
		if (n) {
			t.value = "";
			try {
				let e = await this.client().sendText(this.conversationId, n);
				this.dispatchEvent(new CustomEvent("commons-message-sent", {
					detail: { message: e },
					bubbles: !0,
					composed: !0
				}));
			} catch (e) {
				this.error = e.message;
			}
		}
	}
	async submit(e, t, n) {
		e.preventDefault();
		let r = e.target, i = {};
		for (let [e, t] of Object.entries(n.schema.properties ?? {})) {
			let n = r.elements.namedItem(e);
			t.type === "boolean" ? i[e] = n.checked : n.value !== "" && (i[e] = t.type === "number" || t.type === "integer" ? Number(n.value) : n.value);
		}
		try {
			let e = await this.client().submitForm(this.conversationId, t.id, i);
			this.dispatchEvent(new CustomEvent("commons-form-submitted", {
				detail: { message: e },
				bubbles: !0,
				composed: !0
			}));
		} catch (e) {
			this.error = e.message;
		}
	}
	render() {
		let e = this.conversation, t = [...this.messages.values()].sort((e, t) => e.seq - t.seq), n = new Map(t.filter((e) => e.kind === "FORM_RESPONSE" && e.replyTo).map((e) => [e.replyTo, e])), r = e?.participants.filter((e) => e.participantId !== this.me).map((e) => e.displayName || e.participantId);
		return K`
      ${e ? K`<header part="header"><div class="title">${e.title || e.correlationId}</div>
        <div class="meta">${e.status === "CLOSED" ? "Closed · " : ""}with ${r?.join(", ")}</div></header>` : J}
      ${this.error ? K`<div class="error" role="alert">${this.error}</div>` : J}
      <div class="messages" part="messages" role="log" aria-live="polite">
        ${t.filter((e) => e.kind !== "EVENT" && !(e.kind === "FORM_RESPONSE" && e.replyTo && this.messages.has(e.replyTo))).map((e) => this.renderMessage(e, n.get(e.id)))}
      </div>
      ${this.typing ? K`<div class="typing">${this.typing} is typing…</div>` : J}
      ${e?.status === "OPEN" ? K`<form class="composer" part="composer" @submit=${this.send}>
        <input name="text" placeholder="Write a message…" autocomplete="off" aria-label="Message">
        <button type="submit">Send</button></form>` : J}
    `;
	}
	renderMessage(e, t) {
		if (e.kind === "SYSTEM") return K`<div class="msg system" part="message">${String(e.content)}</div>`;
		let n = e.senderId === this.me, r;
		switch (e.kind) {
			case "FORM":
				r = this.renderForm(e, e.content, t);
				break;
			case "ATTACHMENT_REF":
				r = this.renderAttachment(e.content);
				break;
			case "FORM_RESPONSE":
				r = K`<div class="text">${Object.entries(e.content).map(([e, t]) => `${e}: ${t}`).join(" · ")}</div>`;
				break;
			default: r = K`<div class="text">${typeof e.content == "string" ? e.content : JSON.stringify(e.content)}</div>`;
		}
		return K`<div class="msg ${n ? "mine" : ""} ${e.status === "STREAMING" ? "streaming" : ""}" part="message">
      <div class="from">${n ? "You" : this.nameOf(e.senderId)} · <span title=${e.createdAt}>${We(e.createdAt)}</span></div>
      ${r}</div>`;
	}
	renderForm(e, t, n) {
		let r = n?.content, i = !!n || !!e.answeredAt || e.senderId === this.me || this.conversation?.status !== "OPEN", a = new Set(t.schema.required ?? []);
		return K`<form @submit=${(n) => this.submit(n, e, t)}>
      <strong>${t.title ?? "Form"}</strong>
      ${Object.entries(t.schema.properties ?? {}).map(([e, t]) => t.type === "boolean" ? K`<label class="check"><input type="checkbox" name=${e} ?checked=${r?.[e] === !0}
            ?disabled=${i}>${t.title ?? e}</label>` : t.enum ? K`<label>${t.title ?? e}<select name=${e} ?required=${a.has(e)} ?disabled=${i}>
            ${t.enum.map((t) => K`<option ?selected=${r?.[e] === t}>${t}</option>`)}</select></label>` : K`<label>${t.title ?? e}<input name=${e} ?required=${a.has(e)} ?disabled=${i}
            .value=${r?.[e] === void 0 ? "" : String(r[e])} step="any"
            type=${t.type === "number" || t.type === "integer" ? "number" : t.format === "date" ? "date" : "text"}>
          </label>`)}
      ${n ? K`<div class="done">✓ Answered by ${n.senderId === this.me ? "you" : this.nameOf(n.senderId)}</div>` : i ? J : K`<button type="submit">${t.submitLabel ?? "Submit"}</button>`}
    </form>`;
	}
	renderAttachment(e) {
		return e.caseId && customElements.get("commons-upload-case") ? K`<commons-upload-case class="card" base-url=${this.attachmentsUrl ?? ""} case-id=${e.caseId}
          .auth=${this.auth}></commons-upload-case>` : K`<div class="card"><strong>${e.name ?? "Attachment"}</strong></div>`;
	}
};
customElements.get("commons-conversation") || customElements.define("commons-conversation", Bt);
//#endregion
export { Ft as ChatClient, Bt as CommonsConversation, zt as CommonsConversationList, Pe as bearer, Re as configureAuth, Fe as devUser };

//# sourceMappingURL=chat-ui.bundle.js.map