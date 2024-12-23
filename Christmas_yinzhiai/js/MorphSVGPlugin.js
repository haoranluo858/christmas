

			! function(t, e) {
				"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define
					.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
			}(this, function(t) {
				"use strict";

				function m(t) {
					return "string" == typeof t
				}
				var b = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
					N = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
					A = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
					r = /(^[#\.][a-z]|[a-y][a-z])/i,
					B = Math.PI / 180,
					D = Math.sin,
					E = Math.cos,
					k = Math.abs,
					Q = Math.sqrt,
					s = function _isNumber(t) {
						return "number" == typeof t
					},
					h = function _round(t) {
						return Math.round(1e5 * t) / 1e5 || 0
					};

				function reverseSegment(t) {
					var e, n = 0;
					for (t.reverse(); n < t.length; n += 2) e = t[n], t[n] = t[n + 1], t[n + 1] = e;
					t.reversed = !t.reversed
				}
				var R = {
					rect: "rx,ry,x,y,width,height",
					circle: "r,cx,cy",
					ellipse: "rx,ry,cx,cy",
					line: "x1,x2,y1,y2"
				};

				function convertToPath(t, e) {
					var n, r, o, i, a, s, h, l, c, g, f, p, u, d, P, _, m, w, v, y, x, M, T = t.tagName.toLowerCase(),
						b = .552284749831;
					return "path" !== T && t.getBBox ? (s = function _createPath(t, e) {
							var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
								o = [].slice.call(t.attributes),
								i = o.length;
							for (e = "," + e + ","; - 1 < --i;) n = o[i].nodeName.toLowerCase(), e.indexOf("," + n +
								",") < 0 && r.setAttributeNS(null, n, o[i].nodeValue);
							return r
						}(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = function _attrToObj(t, e) {
							for (var n = e ? e.split(",") : [], r = {}, o = n.length; - 1 < --o;) r[n[o]] = +t
								.getAttribute(n[o]) || 0;
							return r
						}(t, R[T]), "rect" === T ? (i = M.rx, a = M.ry || i, r = M.x, o = M.y, g = M.width - 2 * i, f = M
							.height - 2 * a, n = i || a ? "M" + (_ = (d = (u = r + i) + g) + i) + "," + (w = o + a) +
							" V" + (v = w + f) + " C" + [_, y = v + a * b, P = d + i * b, x = v + a, d, x, d - (d - u) /
								3, x, u + (d - u) / 3, x, u, x, p = r + i * (1 - b), x, r, y, r, v, r, v - (v - w) / 3,
								r, w + (v - w) / 3, r, w, r, m = o + a * (1 - b), p, o, u, o, u + (d - u) / 3, o, d - (
									d - u) / 3, o, d, o, P, o, _, m, _, w
							].join(",") + "z" : "M" + (r + g) + "," + o + " v" + f + " h" + -g + " v" + -f + " h" + g +
							"z") : "circle" === T || "ellipse" === T ? (l = "circle" === T ? (i = a = M.r) * b : (i = M
							.rx, (a = M.ry) * b), n = "M" + ((r = M.cx) + i) + "," + (o = M.cy) + " C" + [r + i, o +
							l, r + (h = i * b), o + a, r, o + a, r - h, o + a, r - i, o + l, r - i, o, r - i, o - l,
							r - h, o - a, r, o - a, r + h, o - a, r + i, o - l, r + i, o
						].join(",") + "z") : "line" === T ? n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 :
						"polyline" !== T && "polygon" !== T || (n = "M" + (r = (c = (t.getAttribute("points") + "")
								.match(N) || []).shift()) + "," + (o = c.shift()) + " L" + c.join(","), "polygon" ===
							T && (n += "," + r + "," + o + "z")), s.setAttribute("d", rawPathToString(s._gsRawPath =
							stringToRawPath(n))), e && t.parentNode && (t.parentNode.insertBefore(s, t), t.parentNode
							.removeChild(t)), s) : t
				}

				function arcToSegment(t, e, n, r, o, i, a, s, h) {
					if (t !== s || e !== h) {
						n = k(n), r = k(r);
						var l = o % 360 * B,
							c = E(l),
							g = D(l),
							f = Math.PI,
							p = 2 * f,
							u = (t - s) / 2,
							d = (e - h) / 2,
							P = c * u + g * d,
							_ = -g * u + c * d,
							m = P * P,
							w = _ * _,
							v = m / (n * n) + w / (r * r);
						1 < v && (n = Q(v) * n, r = Q(v) * r);
						var y = n * n,
							x = r * r,
							M = (y * x - y * w - x * m) / (y * w + x * m);
						M < 0 && (M = 0);
						var T = (i === a ? -1 : 1) * Q(M),
							b = n * _ / r * T,
							S = -r * P / n * T,
							N = c * b - g * S + (t + s) / 2,
							z = g * b + c * S + (e + h) / 2,
							A = (P - b) / n,
							R = (_ - S) / r,
							O = (-P - b) / n,
							C = (-_ - S) / r,
							j = A * A + R * R,
							Y = (R < 0 ? -1 : 1) * Math.acos(A / Q(j)),
							V = (A * C - R * O < 0 ? -1 : 1) * Math.acos((A * O + R * C) / Q(j * (O * O + C * C)));
						isNaN(V) && (V = f), !a && 0 < V ? V -= p : a && V < 0 && (V += p), Y %= p, V %= p;
						var I, F = Math.ceil(k(V) / (p / 4)),
							U = [],
							X = V / F,
							L = 4 / 3 * D(X / 2) / (1 + E(X / 2)),
							G = c * n,
							W = g * n,
							q = g * -r,
							H = c * r;
						for (I = 0; I < F; I++) P = E(o = Y + I * X), _ = D(o), A = E(o += X), R = D(o), U.push(P - L * _,
							_ + L * P, A + L * R, R - L * A, A, R);
						for (I = 0; I < U.length; I += 2) P = U[I], _ = U[I + 1], U[I] = P * G + _ * q + N, U[I + 1] = P *
							W + _ * H + z;
						return U[I - 2] = s, U[I - 1] = h, U
					}
				}

				function stringToRawPath(t) {
					function yc(t, e, n, r) {
						c = (n - t) / 3, g = (r - e) / 3, s.push(t + c, e + g, n - c, r - g, n, r)
					}
					var e, n, r, o, i, a, s, h, l, c, g, f, p, u, d, P = (t + "").replace(A, function(t) {
							var e = +t;
							return e < 1e-4 && -1e-4 < e ? 0 : e
						}).match(b) || [],
						_ = [],
						m = 0,
						w = 0,
						v = P.length,
						y = 0,
						x = "ERROR: malformed path: " + t;
					if (!t || !isNaN(P[0]) || isNaN(P[1])) return console.log(x), _;
					for (e = 0; e < v; e++)
						if (p = i, isNaN(P[e]) ? a = (i = P[e].toUpperCase()) !== P[e] : e--, r = +P[e + 1], o = +P[e + 2],
							a && (r += m, o += w), e || (h = r, l = o), "M" === i) s && (s.length < 8 ? --_.length : y += s
							.length), m = h = r, w = l = o, s = [r, o], _.push(s), e += 2, i = "L";
						else if ("C" === i) a || (m = w = 0), (s = s || [0, 0]).push(r, o, m + 1 * P[e + 3], w + 1 * P[e +
						4], m += 1 * P[e + 5], w += 1 * P[e + 6]), e += 6;
					else if ("S" === i) c = m, g = w, "C" !== p && "S" !== p || (c += m - s[s.length - 4], g += w - s[s
						.length - 3]), a || (m = w = 0), s.push(c, g, r, o, m += 1 * P[e + 3], w += 1 * P[e + 4]), e += 4;
					else if ("Q" === i) c = m + 2 / 3 * (r - m), g = w + 2 / 3 * (o - w), a || (m = w = 0), m += 1 * P[e +
						3], w += 1 * P[e + 4], s.push(c, g, m + 2 / 3 * (r - m), w + 2 / 3 * (o - w), m, w), e += 4;
					else if ("T" === i) c = m - s[s.length - 4], g = w - s[s.length - 3], s.push(m + c, w + g, r + 2 / 3 * (
						m + 1.5 * c - r), o + 2 / 3 * (w + 1.5 * g - o), m = r, w = o), e += 2;
					else if ("H" === i) yc(m, w, m = r, w), e += 1;
					else if ("V" === i) yc(m, w, m, w = r + (a ? w - m : 0)), e += 1;
					else if ("L" === i || "Z" === i) "Z" === i && (r = h, o = l, s.closed = !0), ("L" === i || .5 < k(m -
						r) || .5 < k(w - o)) && (yc(m, w, r, o), "L" === i && (e += 2)), m = r, w = o;
					else if ("A" === i) {
						if (u = P[e + 4], d = P[e + 5], c = P[e + 6], g = P[e + 7], n = 7, 1 < u.length && (u.length < 3 ? (
								g = c, c = d, n--) : (g = d, c = u.substr(2), n -= 2), d = u.charAt(1), u = u.charAt(0)), f =
							arcToSegment(m, w, +P[e + 1], +P[e + 2], +P[e + 3], +u, +d, (a ? m : 0) + 1 * c, (a ? w : 0) +
								1 * g), e += n, f)
							for (n = 0; n < f.length; n++) s.push(f[n]);
						m = s[s.length - 2], w = s[s.length - 1]
					} else console.log(x);
					return (e = s.length) < 6 ? (_.pop(), e = 0) : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0),
						_.totalPoints = y + e, _
				}

				function rawPathToString(t) {
					s(t[0]) && (t = [t]);
					var e, n, r, o, i = "",
						a = t.length;
					for (n = 0; n < a; n++) {
						for (o = t[n], i += "M" + h(o[0]) + "," + h(o[1]) + " C", e = o.length, r = 2; r < e; r++) i += h(o[
								r++]) + "," + h(o[r++]) + " " + h(o[r++]) + "," + h(o[r++]) + " " + h(o[r++]) + "," + h(o[
							r]) + " ";
						o.closed && (i += "z")
					}
					return i
				}

				function y() {
					return o || "undefined" != typeof window && (o = window.gsap) && o.registerPlugin && o
				}

				function z(t) {
					return "function" == typeof t
				}

				function M(t) {
					return console && console.warn(t)
				}

				function P() {
					return String.fromCharCode.apply(null, arguments)
				}

				function S(t) {
					var e, n = t.length,
						r = 0,
						o = 0;
					for (e = 0; e < n; e++) r += t[e++], o += t[e];
					return [r / (n / 2), o / (n / 2)]
				}

				function T(t) {
					var e, n, r, o = t.length,
						i = t[0],
						a = i,
						s = t[1],
						h = s;
					for (r = 6; r < o; r += 6) i < (e = t[r]) ? i = e : e < a && (a = e), s < (n = t[r + 1]) ? s = n : n <
						h && (h = n);
					return t.centerX = (i + a) / 2, t.centerY = (s + h) / 2, t.size = (i - a) * (s - h)
				}

				function U(t, e) {
					void 0 === e && (e = 3);
					for (var n, r, o, i, a, s, h, l, c, g, f, p, u, d, P, _, m = t.length, w = t[0][0], v = w, y = t[0][1],
							x = y, M = 1 / e; - 1 < --m;)
						for (n = (a = t[m]).length, i = 6; i < n; i += 6)
							for (c = a[i], g = a[i + 1], f = a[i + 2] - c, d = a[i + 3] - g, p = a[i + 4] - c, P = a[i + 5] -
								g, u = a[i + 6] - c, _ = a[i + 7] - g, s = e; - 1 < --s;) w < (r = ((h = M * s) * h * u + 3 *
								(l = 1 - h) * (h * p + l * f)) * h + c) ? w = r : r < v && (v = r), y < (o = (h * h * _ +
								3 * l * (h * P + l * d)) * h + g) ? y = o : o < x && (x = o);
					return t.centerX = (w + v) / 2, t.centerY = (y + x) / 2, t.left = v, t.width = w - v, t.top = x, t
						.height = y - x, t.size = (w - v) * (y - x)
				}

				function V(t, e) {
					return e.length - t.length
				}

				function W(t, e) {
					var n = t.size || T(t),
						r = e.size || T(e);
					return Math.abs(r - n) < (n + r) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : r - n
				}

				function X(t, e) {
					var n, r, o = t.slice(0),
						i = t.length,
						a = i - 2;
					for (e |= 0, n = 0; n < i; n++) r = (n + e) % a, t[n++] = o[r], t[n] = o[1 + r]
				}

				function Y(t, e, n, r, o) {
					var i, a, s, h, l = t.length,
						c = 0,
						g = l - 2;
					for (n *= 6, a = 0; a < l; a += 6) h = t[i = (a + n) % g] - (e[a] - r), s = t[1 + i] - (e[a + 1] - o),
						c += w(s * s + h * h);
					return c
				}

				function Z(t, e, n) {
					var r, o, i, a = t.length,
						s = S(t),
						h = S(e),
						l = h[0] - s[0],
						c = h[1] - s[1],
						g = Y(t, e, 0, l, c),
						f = 0;
					for (i = 6; i < a; i += 6)(o = Y(t, e, i / 6, l, c)) < g && (g = o, f = i);
					if (n)
						for (reverseSegment(r = t.slice(0)), i = 6; i < a; i += 6)(o = Y(r, e, i / 6, l, c)) < g && (g = o,
							f = -i);
					return f / 6
				}

				function $(t, e, n) {
					for (var r, o, i, a, s, h, l = t.length, c = 1e20, g = 0, f = 0; - 1 < --l;)
						for (h = (r = t[l]).length, s = 0; s < h; s += 6) o = r[s] - e, i = r[s + 1] - n, (a = w(o * o + i *
							i)) < c && (c = a, g = r[s], f = r[s + 1]);
					return [g, f]
				}

				function _(t, e, n, r, o, i) {
					var a, s, h, l, c = e.length,
						g = 0,
						f = Math.min(t.size || T(t), e[n].size || T(e[n])) * r,
						p = 1e20,
						u = t.centerX + o,
						d = t.centerY + i;
					for (a = n; a < c && !((e[a].size || T(e[a])) < f); a++) s = e[a].centerX - u, h = e[a].centerY - d, (l =
						w(s * s + h * h)) < p && (g = a, p = l);
					return l = e[g], e.splice(g, 1), l
				}

				function aa(t, e) {
					var n, r, o, i, a, s, h, l, c, g, f, p, u, d, P = 0,
						_ = t.length,
						m = e / ((_ - 2) / 6);
					for (u = 2; u < _; u += 6)
						for (P += m; .999999 < P;) n = t[u - 2], r = t[u - 1], o = t[u], i = t[u + 1], a = t[u + 2], s = t[
								u + 3], h = t[u + 4], l = t[u + 5], c = n + (o - n) * (d = 1 / ((Math.floor(P) || 1) + 1)),
							c += ((f = o + (a - o) * d) - c) * d, f += (a + (h - a) * d - f) * d, g = r + (i - r) * d, g += (
								(p = i + (s - i) * d) - g) * d, p += (s + (l - s) * d - p) * d, t.splice(u, 4, n + (o - n) *
								d, r + (i - r) * d, c, g, c + (f - c) * d, g + (p - g) * d, f, p, a + (h - a) * d, s + (l -
									s) * d), u += 6, _ += 6, P--;
					return t
				}

				function ba(t, e, n, r, o) {
					var i, a, s, h, l, c, g, f = e.length - t.length,
						p = 0 < f ? e : t,
						u = 0 < f ? t : e,
						d = 0,
						P = "complexity" === r ? V : W,
						m = "position" === r ? 0 : "number" == typeof r ? r : .8,
						w = u.length,
						v = "object" == typeof n && n.push ? n.slice(0) : [n],
						y = "reverse" === v[0] || v[0] < 0,
						x = "log" === n;
					if (u[0]) {
						if (1 < p.length && (t.sort(P), e.sort(P), p.size || U(p), u.size || U(u), c = p.centerX - u.centerX,
								g = p.centerY - u.centerY, P === W))
							for (w = 0; w < u.length; w++) p.splice(w, 0, _(u[w], p, w, m, c, g));
						if (f)
							for (f < 0 && (f = -f), p[0].length > u[0].length && aa(u[0], (p[0].length - u[0].length) / 6 |
									0), w = u.length; d < f;) p[w].size || T(p[w]), h = (s = $(u, p[w].centerX, p[w]
								.centerY))[0], l = s[1], u[w++] = [h, l, h, l, h, l, h, l], u.totalPoints += 8, d++;
						for (w = 0; w < t.length; w++) i = e[w], a = t[w], (f = i.length - a.length) < 0 ? aa(i, -f / 6 |
							0) : 0 < f && aa(a, f / 6 | 0), y && !1 !== o && !a.reversed && reverseSegment(a), (n = v[w] ||
								0 === v[w] ? v[w] : "auto") && (a.closed || Math.abs(a[0] - a[a.length - 2]) < .5 && Math
								.abs(a[1] - a[a.length - 1]) < .5 ? "auto" === n || "log" === n ? (v[w] = n = Z(a, i, !w || !
									1 === o), n < 0 && (y = !0, reverseSegment(a), n = -n), X(a, 6 * n)) : "reverse" !== n &&
								(w && n < 0 && reverseSegment(a), X(a, 6 * (n < 0 ? -n : n))) : !y && ("auto" === n && Math
									.abs(i[0] - a[0]) + Math.abs(i[1] - a[1]) + Math.abs(i[i.length - 2] - a[a.length - 2]) +
									Math.abs(i[i.length - 1] - a[a.length - 1]) > Math.abs(i[0] - a[a.length - 2]) + Math
									.abs(i[1] - a[a.length - 1]) + Math.abs(i[i.length - 2] - a[0]) + Math.abs(i[i.length -
										1] - a[1]) || n % 2) ? (reverseSegment(a), v[w] = -1, y = !0) : "auto" === n ? v[w] =
								0 : "reverse" === n && (v[w] = -1), a.closed !== i.closed && (a.closed = i.closed = !1));
						return x && M("shapeIndex:[" + v.join(",") + "]"), t.shapeIndex = v
					}
				}

				function ca(t, e, n, r, o) {
					var i = stringToRawPath(t[0]),
						a = stringToRawPath(t[1]);
					ba(i, a, e || 0 === e ? e : "auto", n, o) && (t[0] = rawPathToString(i), t[1] = rawPathToString(a),
						"log" !== r && !0 !== r || M('precompile:["' + t[0] + '","' + t[1] + '"]'))
				}

				function ea(t, e) {
					var n, r, o, i, a, s, h, l = 0,
						c = parseFloat(t[0]),
						g = parseFloat(t[1]),
						f = c + "," + g + " ";
					for (n = .5 * e / (.5 * (o = t.length) - 1), r = 0; r < o - 2; r += 2) {
						if (l += n, s = parseFloat(t[r + 2]), h = parseFloat(t[r + 3]), .999999 < l)
							for (a = 1 / (Math.floor(l) + 1), i = 1; .999999 < l;) f += (c + (s - c) * a * i).toFixed(2) +
								"," + (g + (h - g) * a * i).toFixed(2) + " ", l--, i++;
						f += s + "," + h + " ", c = s, g = h
					}
					return f
				}

				function fa(t) {
					var e = t[0].match(L) || [],
						n = t[1].match(L) || [],
						r = n.length - e.length;
					0 < r ? t[0] = ea(e, r) : t[1] = ea(n, -r)
				}

				function ga(e) {
					return isNaN(e) ? fa : function(t) {
						fa(t), t[1] = function _offsetPoints(t, e) {
							if (!e) return t;
							var n, r, o, i = t.match(L) || [],
								a = i.length,
								s = "";
							for (n = "reverse" === e ? (r = a - 1, -2) : (r = (2 * (parseInt(e, 10) || 0) + 1 + 100 *
									a) % a, 2), o = 0; o < a; o += 2) s += i[r - 1] + "," + i[r] + " ", r = (r + n) %
								a;
							return s
						}(t[1], parseInt(e, 10))
					}
				}

				function ia(t, e) {
					for (var n, r, o, i, a, s, h, l, c, g, f, p, u = t.length, d = .2 * (e || 1); - 1 < --u;) {
						for (f = (r = t[u]).isSmooth = r.isSmooth || [0, 0, 0, 0], p = r.smoothData = r.smoothData || [0, 0,
								0, 0
							], f.length = 4, l = r.length - 2, h = 6; h < l; h += 6) o = r[h] - r[h - 2], i = r[h + 1] - r[
							h - 1], a = r[h + 2] - r[h], s = r[h + 3] - r[h + 1], c = v(i, o), g = v(s, a), (n = Math
							.abs(c - g) < d) && (p[h - 2] = c, p[h + 2] = g, p[h - 1] = w(o * o + i * i), p[h + 3] = w(
							a * a + s * s)), f.push(n, n, 0, 0, n, n);
						r[l] === r[0] && r[1 + l] === r[1] && (o = r[0] - r[l - 2], i = r[1] - r[l - 1], a = r[2] - r[0], s =
							r[3] - r[1], c = v(i, o), g = v(s, a), Math.abs(c - g) < d && (p[l - 2] = c, p[2] = g, p[l -
								1] = w(o * o + i * i), p[3] = w(a * a + s * s), f[l - 2] = f[l - 1] = !0))
					}
					return t
				}

				function ja(t) {
					var e = t.trim().split(" ");
					return {
						x: (~t.indexOf("left") ? 0 : ~t.indexOf("right") ? 100 : isNaN(parseFloat(e[0])) ? 50 : parseFloat(e[
							0])) / 100,
						y: (~t.indexOf("top") ? 0 : ~t.indexOf("bottom") ? 100 : isNaN(parseFloat(e[1])) ? 50 : parseFloat(e[
							1])) / 100
					}
				}

				function ma(t, e, n, r) {
					var o, i, a = this._origin,
						s = this._eOrigin,
						h = t[n] - a.x,
						l = t[n + 1] - a.y,
						c = w(h * h + l * l),
						g = v(l, h);
					return h = e[n] - s.x, l = e[n + 1] - s.y, i = function _shortAngle(t) {
						return t !== t % f ? t + (t < 0 ? p : -p) : t
					}(o = v(l, h) - g), !r && I && Math.abs(i + I.ca) < u && (r = I), this._anchorPT = I = {
						_next: this._anchorPT,
						t: t,
						sa: g,
						ca: r && i * r.ca < 0 && Math.abs(i) > d ? o : i,
						sl: c,
						cl: w(h * h + l * l) - c,
						i: n
					}
				}

				function na(t) {
					o = y(), n = n || o && o.plugins.morphSVG, o && n ? (j = o.utils.toArray, n.prototype._tweenRotation =
						ma, F = 1) : t && M("Please gsap.registerPlugin(MorphSVGPlugin)")
				}
				var o, j, I, F, n, v = Math.atan2,
					x = Math.cos,
					O = Math.sin,
					w = Math.sqrt,
					f = Math.PI,
					p = 2 * f,
					u = .3 * f,
					d = .7 * f,
					L = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
					G = /(^[#\.][a-z]|[a-y][a-z])/i,
					q = /[achlmqstvz]/i,
					i = "MorphSVGPlugin",
					a = P(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
					H = function(t) {
						var e = 0 === (window ? window.location.href : "").indexOf(P(102, 105, 108, 101, 58, 47, 47)) || -
							1 !== t.indexOf(P(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== t.indexOf(P(49, 50, 55,
								46, 48, 32, 48, 46, 49)),
							n = [a, P(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), P(99, 111, 100, 101, 112, 101, 110,
									46, 112, 108, 117, 109, 98, 105, 110, 103), P(99, 111, 100, 101, 112, 101, 110, 46, 100,
									101, 118), P(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112), P(112, 101, 110, 115,
									46, 99, 108, 111, 117, 100), P(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99,
									111, 109), P(99, 100, 112, 110, 46, 105, 111), P(112, 101, 110, 115, 46, 105, 111), P(
									103, 97, 110, 110, 111, 110, 46, 116, 118), P(99, 111, 100, 101, 99, 97, 110, 121, 111,
									110, 46, 110, 101, 116), P(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46,
									110, 101, 116), P(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), P(116,
									121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), P(116, 119, 101, 101, 110, 109, 97,
									120, 46, 99, 111, 109), P(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109),
								P(112, 108, 110, 107, 114, 46, 99, 111), P(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), P(
									119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), P(97, 114, 99, 104, 105,
									118, 101, 46, 111, 114, 103), P(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46,
									105, 111), P(99, 115, 98, 46, 97, 112, 112), P(115, 116, 97, 99, 107, 98, 108, 105, 116,
									122, 46, 99, 111, 109), P(99, 111, 100, 105, 101, 114, 46, 105, 111), P(109, 111, 116,
									105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), P(115, 116, 97, 99, 107,
									111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109), P(115, 116, 97, 99, 107, 101,
									120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109), P(106, 115, 102, 105, 100, 100, 108,
									101, 46, 110, 101, 116)
							],
							r = n.length;
						for (setTimeout(function() {
								window && window.console && !window._gsapWarned && o && !1 !== o.config().trialWarn && (
									console.log(P(37, 99, 87, 97, 114, 110, 105, 110, 103), P(102, 111, 110, 116, 45,
										115, 105, 122, 101, 58, 51, 48, 112, 120, 59, 99, 111, 108, 111, 114, 58,
										114, 101, 100, 59)), console.log(P(65, 32, 116, 114, 105, 97, 108, 32, 118,
										101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + i + P(32, 105, 115, 32,
										108, 111, 97, 100, 101, 100, 32, 116, 104, 97, 116, 32, 111, 110, 108,
										121, 32, 119, 111, 114, 107, 115, 32, 108, 111, 99, 97, 108, 108, 121,
										32, 97, 110, 100, 32, 111, 110, 32, 100, 111, 109, 97, 105, 110, 115, 32,
										108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111,
										32, 97, 110, 100, 32, 99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120,
										46, 105, 111, 46, 32, 42, 42, 42, 32, 68, 79, 32, 78, 79, 84, 32, 68, 69,
										80, 76, 79, 89, 32, 84, 72, 73, 83, 32, 70, 73, 76, 69, 32, 42, 42, 42,
										32, 76, 111, 97, 100, 105, 110, 103, 32, 105, 116, 32, 111, 110, 32, 97,
										110, 32, 117, 110, 97, 117, 116, 104, 111, 114, 105, 122, 101, 100, 32,
										115, 105, 116, 101, 32, 118, 105, 111, 108, 97, 116, 101, 115, 32, 116,
										104, 101, 32, 108, 105, 99, 101, 110, 115, 101, 32, 97, 110, 100, 32,
										119, 105, 108, 108, 32, 99, 97, 117, 115, 101, 32, 97, 32, 114, 101, 100,
										105, 114, 101, 99, 116, 46, 32, 80, 108, 101, 97, 115, 101, 32, 106, 111,
										105, 110, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99,
										107, 32, 116, 111, 32, 103, 101, 116, 32, 102, 117, 108, 108, 32, 97, 99,
										99, 101, 115, 115, 32, 116, 111, 32, 116, 104, 101, 32, 98, 111, 110,
										117, 115, 32, 112, 108, 117, 103, 105, 110, 115, 32, 116, 104, 97, 116,
										32, 98, 111, 111, 115, 116, 32, 121, 111, 117, 114, 32, 97, 110, 105,
										109, 97, 116, 105, 111, 110, 32, 115, 117, 112, 101, 114, 112, 111, 119,
										101, 114, 115, 46, 32, 68, 105, 115, 97, 98, 108, 101, 32, 116, 104, 105,
										115, 32, 119, 97, 114, 110, 105, 110, 103, 32, 119, 105, 116, 104, 32,
										103, 115, 97, 112, 46, 99, 111, 110, 102, 105, 103, 40, 123, 116, 114,
										105, 97, 108, 87, 97, 114, 110, 58, 32, 102, 97, 108, 115, 101, 125, 41,
										59)), console.log(P(37, 99, 71, 101, 116, 32, 117, 110, 114, 101, 115, 116,
										114, 105, 99, 116, 101, 100, 32, 102, 105, 108, 101, 115, 32, 97, 116,
										32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 114, 101, 101, 110, 115,
										111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98), P(102, 111, 110,
										116, 45, 115, 105, 122, 101, 58, 49, 54, 112, 120, 59, 99, 111, 108, 111,
										114, 58, 35, 52, 101, 57, 56, 49, 53)), window._gsapWarned = 1)
							}, 50); - 1 < --r;)
							if (-1 !== t.indexOf(n[r])) return !0;
						return e || !setTimeout(function() {
							window.location.href = P(104, 116, 116, 112, 115, 58, 47, 47) + a + P(47, 114, 101, 113,
									117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47
									) + "?plugin=" + i + "&source=codepen"
						}, 3e3)
					}(window ? window.location.host : ""),
					J = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
					K = {
						version: "3.8.0",
						name: "morphSVG",
						rawVars: 1,
						register: function register(t, e) {
							o = t, n = e, na()
						},
						init: function init(t, e, n, r, o) {
							if (F || na(1), !e) return M("invalid shape"), !1;
							var i, a, s, h, l, c, g, f, p, u, d, P, _, m, w, v, y, x, T, b, S, N;
							if (z(e) && (e = e.call(n, r, t, o)), "string" == typeof e || e.getBBox || e[0]) e = {
								shape: e
							};
							else if ("object" == typeof e) {
								for (a in i = {}, e) i[a] = z(e[a]) && "render" !== a ? e[a].call(n, r, t, o) : e[a];
								e = i
							}
							var A = t.nodeType ? window.getComputedStyle(t) : {},
								R = A.fill + "",
								O = !("none" === R || "0" === (R.match(L) || [])[3] || "evenodd" === A.fillRule),
								C = (e.origin || "50 50").split(",");
							if (l = "POLYLINE" === (i = (t.nodeName + "").toUpperCase()) || "POLYGON" === i, "PATH" !==
								i && !l && !e.prop) return M("Cannot morph a <" + i + "> element. " + J), !1;
							if (a = "PATH" === i ? "d" : "points", !e.prop && !z(t.setAttribute)) return !1;
							if (h = function _parseShape(t, e, n) {
									var r, o;
									return (!("string" == typeof t) || G.test(t) || (t.match(L) || []).length < 3) && ((
										r = j(t)[0]) ? (o = (r.nodeName + "").toUpperCase(), e && "PATH" !== o &&
										(r = convertToPath(r, !1), o = "PATH"), t = r.getAttribute("PATH" === o ?
											"d" : "points") || "", r === n && (t = r.getAttributeNS(null,
											"data-original") || t)) : (M("WARNING: invalid morph to: " + t),
										t = !1)), t
								}(e.shape || e.d || e.points || "", "d" === a, t), l && q.test(h)) return M("A <" + i +
								"> cannot accept path data. " + J), !1;
							if (c = e.shapeIndex || 0 === e.shapeIndex ? e.shapeIndex : "auto", g = e.map || K
								.defaultMap, this._prop = e.prop, this._render = e.render || K.defaultRender, this
								._apply = "updateTarget" in e ? e.updateTarget : K.defaultUpdateTarget, this._rnd = Math
								.pow(10, isNaN(e.precision) ? 2 : +e.precision), this._tween = n, h) {
								if (this._target = t, y = "object" == typeof e.precompile, u = this._prop ? t[this
									._prop] : t.getAttribute(a), this._prop || t.getAttributeNS(null, "data-original") ||
									t.setAttributeNS(null, "data-original", u), "d" === a || this._prop) {
									if (u = stringToRawPath(y ? e.precompile[0] : u), d = stringToRawPath(y ? e
											.precompile[1] : h), !y && !ba(u, d, c, g, O)) return !1;
									for ("log" !== e.precompile && !0 !== e.precompile || M('precompile:["' +
											rawPathToString(u) + '","' + rawPathToString(d) + '"]'), (S = "linear" !== (e
											.type || K.defaultType)) && (u = ia(u, e.smoothTolerance), d = ia(d, e
												.smoothTolerance), u.size || U(u), d.size || U(d), b = ja(C[0]), this
											._origin = u.origin = {
												x: u.left + b.x * u.width,
												y: u.top + b.y * u.height
											}, C[1] && (b = ja(C[1])), this._eOrigin = {
												x: d.left + b.x * d.width,
												y: d.top + b.y * d.height
											}), this._rawPath = t._gsRawPath = u, _ = u.length; - 1 < --_;)
										for (w = u[_], v = d[_], f = w.isSmooth || [], p = v.isSmooth || [], m = w
											.length, P = I = 0; P < m; P += 2) v[P] === w[P] && v[P + 1] === w[P + 1] ||
											(S ? f[P] && p[P] ? (x = w.smoothData, T = v.smoothData, N = P + (P === m -
													4 ? 7 - m : 5), this._controlPT = {
													_next: this._controlPT,
													i: P,
													j: _,
													l1s: x[P + 1],
													l1c: T[P + 1] - x[P + 1],
													l2s: x[N],
													l2c: T[N] - x[N]
												}, s = this._tweenRotation(w, v, P + 2), this._tweenRotation(w, v, P,
													s), this._tweenRotation(w, v, N - 1, s), P += 4) : this
												._tweenRotation(w, v, P) : (s = this.add(w, P, w[P], v[P]), s = this.add(
													w, P + 1, w[P + 1], v[P + 1]) || s))
								} else s = this.add(t, "setAttribute", t.getAttribute(a) + "", h + "", r, o, 0, ga(c),
								a);
								S && (this.add(this._origin, "x", this._origin.x, this._eOrigin.x), s = this.add(this
									._origin, "y", this._origin.y, this._eOrigin.y)), s && (this._props.push(
									"morphSVG"), s.end = h, s.endProp = a)
							}
							return H
						},
						render: function render(t, e) {
							for (var n, r, o, i, a, s, h, l, c, g, f, p, u = e._rawPath, d = e._controlPT, P = e
									._anchorPT, _ = e._rnd, m = e._target, w = e._pt; w;) w.r(t, w.d), w = w._next;
							if (1 === t && e._apply)
								for (w = e._pt; w;) w.end && (e._prop ? m[e._prop] = w.end : m.setAttribute(w.endProp, w
									.end)), w = w._next;
							else if (u) {
								for (; P;) a = P.sa + t * P.ca, i = P.sl + t * P.cl, P.t[P.i] = e._origin.x + x(a) * i, P
									.t[P.i + 1] = e._origin.y + O(a) * i, P = P._next;
								for (r = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1; d;) p = (s = d.i) + (s === (o = u[d
										.j]).length - 4 ? 7 - o.length : 5), a = v(o[p] - o[s + 1], o[p - 1] - o[s]), g =
									O(a), f = x(a), l = o[s + 2], c = o[s + 3], i = d.l1s + r * d.l1c, o[s] = l - f * i,
									o[s + 1] = c - g * i, i = d.l2s + r * d.l2c, o[p - 1] = l + f * i, o[p] = c + g * i,
									d = d._next;
								if (m._gsRawPath = u, e._apply) {
									for (n = "", h = 0; h < u.length; h++)
										for (i = (o = u[h]).length, n += "M" + (o[0] * _ | 0) / _ + " " + (o[1] * _ |
											0) / _ + " C", s = 2; s < i; s++) n += (o[s] * _ | 0) / _ + " ";
									e._prop ? m[e._prop] = n : m.setAttribute("d", n)
								}
							}
							e._render && u && e._render.call(e._tween, u, m)
						},
						kill: function kill() {
							this._pt = this._rawPath = 0
						},
						getRawPath: function getRawPath(t) {
							var e, n = (t = m(t) && r.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
							return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), (e = n._gsPath[t]) &&
									!e._dirty ? e : n._gsPath[t] = stringToRawPath(t)) : t ? m(t) ? stringToRawPath(t) :
								s(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string")
						},
						stringToRawPath: stringToRawPath,
						rawPathToString: rawPathToString,
						normalizeStrings: function normalizeStrings(t, e, n) {
							var r = n.shapeIndex,
								o = n.map,
								i = [t, e];
							return ca(i, r, o), i
						},
						pathFilter: ca,
						pointsFilter: fa,
						getTotalSize: U,
						equalizeSegmentQuantity: ba,
						convertToPath: function convertToPath$1(t, e) {
							return j(t).map(function(t) {
								return convertToPath(t, !1 !== e)
							})
						},
						defaultType: "linear",
						defaultUpdateTarget: !0,
						defaultMap: "size"
					};
				y() && o.registerPlugin(K), t.MorphSVGPlugin = K, t.default = K;
				if (typeof(window) === "undefined" || window !== t) {
					Object.defineProperty(t, "__esModule", {
						value: !0
					})
				} else {
					delete t.default
				}
			});