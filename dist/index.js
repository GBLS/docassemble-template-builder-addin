!function (e) {
  var t = {};function n(r) {
    if (t[r]) return t[r].exports;var a = t[r] = { i: r, l: !1, exports: {} };return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports;
  }n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: r });
  }, n.r = function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return n.d(t, "a", t), t;
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = "", n(n.s = 125);
}({ 125: function (e, t) {
    var n = "";function r(e) {
      if (e.origin === n) {
        if (console.log("Received action " + e.data.action), "initialize" == e.data.action && ($("#server").hide(), $("#app-body").show(), a()), "files" == e.data.action) {
          var t = $("#interviewName").val();$("#interviewName").empty();var r = $("<option>");r.text("Select an interview..."), $("#interviewName").append(r);for (var o = e.data.files.length, i = 0; i < o; i++) {
            var c = $("<option>");c.attr("value", e.data.files[i]), c.text(e.data.files[i]), e.data.files[i] == t && c.prop("selected", !0), $("#interviewName").append(c);
          }
        }"vars" == e.data.action && (e.data.vars, e.data.vocab, a());
      } else console.log("Message received from improper origin.");
    }function a() {
      $("#server")[0].contentWindow.postMessage({ action: "fetchFiles" }, n);
    }Office.initialize = function (e) {
      $(document).ready(function () {
        $("#sideload-msg").hide();try {
          var e = document.getElementById("server").contentWindow.document;e.open(), e.write("<html><head><title></title></head><body>Loading...</body></html>"), e.close();
        } catch (e) {
          console.log(e.message);
        }$("#app-body").hide(), $("#serverSet").on("click", function () {
          return e = $("#serverName").val(), /^https?:\/\/\S/i.test(e) ? ($("#serverNameError").hide(), $("#serverNameDiv").hide(), n = $("#serverName").val(), Cookies.set("serverName", n, { expires: 999999 }), $("#server").show(), $("#server").attr("src", n + "/officeaddin"), $("#server").attr("height", 1200), $("#server").height("1200px"), !1) : ($("#serverNameError").show(), !1);var e;
        }), window.addEventListener("message", r, !1), (n = Cookies.get("serverName")) && ($("#serverNameDiv").hide(), $("#server").show(), $("#server").attr("src", n + "/officeaddin"), $("#server").attr("height", 1200), $("#server").height("1200px")), $("#ifPara").click(m), $("#ifInline").click(v), $("#listPara").click(f), $("#insertTemplate").click(g), $("#commentPara").click(p), $("#insertVariable").click(u), $("#interviewName").on("change", function (e) {
          var t,
              r = $("#interviewName").val();r ? (console.log("YAML is now " + r), t = r, $("#server")[0].contentWindow.postMessage({ action: "fetchVars", file: t }, n)) : console.log("YAML was blank");
        });
      });
    };for (var o = document.querySelectorAll(".ms-Dropdown"), i = 0; i < o.length; ++i) {
      new fabric.Dropdown(o[i]);
    }var c = document.querySelectorAll(".ms-CheckBox");for (i = 0; i < c.length; i++) {
      new fabric.CheckBox(c[i]);
    }var s = document.querySelectorAll(".ms-TextField");for (i = 0; i < s.length; i++) {
      new fabric.TextField(s[i]);
    }var l = document.querySelectorAll(".ms-ChoiceFieldGroup");for (i = 0; i < l.length; i++) {
      new fabric.ChoiceFieldGroup(l[i]);
    }var d = document.querySelectorAll(".ms-CommandButton");for (i = 0; i < d.length; i++) {
      new fabric.CommandButton(d[i]);
    }function u() {
      var _this = this;

      return regeneratorRuntime.async(function u$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", Word.run(function _callee(e) {
                var t, n, r, a, o, i, c, s;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        t = e.document.getSelection();
                        n = document.getElementById("inputVariableName").value, r = document.getElementById("checkboxVariableReplaceAll").checked, a = document.getElementById("selectVariableFormat").value;
                        if ("" == a) o = n;else o = a + "(" + n + ")";
                        if (!(t.load("text"), r)) {
                          _context.next = 13;
                          break;
                        }

                        _context.next = 6;
                        return regeneratorRuntime.awrap(e.sync());

                      case 6:
                        i = t.text, c = e.document.body.search(i.trim(), { matchWholeWord: !0 });
                        e.load(c);
                        _context.next = 10;
                        return regeneratorRuntime.awrap(e.sync());

                      case 10:
                        for (s = 0; s < c.items.length; s++) {
                          c.items[s].insertText("{{ " + o + " }}", "Replace");
                        }_context.next = 14;
                        break;

                      case 13:
                        t.insertText("{{ " + n + " }}", "Replace");

                      case 14:
                        _context.next = 16;
                        return regeneratorRuntime.awrap(e.sync());

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, _this);
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }function m() {
      var _this2 = this;

      return regeneratorRuntime.async(function m$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", Word.run(function _callee2(e) {
                var t, n, r;
                return regeneratorRuntime.async(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        t = e.document.getSelection();
                        n = document.getElementById("inputIfExpression").value;
                        t.load("text");r = "{%p if " + n + " %}";
                        t.insertParagraph(r, "Before");
                        t.insertParagraph("{%p endif %}", "After");
                        _context3.next = 8;
                        return regeneratorRuntime.awrap(e.sync());

                      case 8:
                        console.log(`The selected text was ${t.text}.`);

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, null, _this2);
              }));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }function v() {
      var _this3 = this;

      return regeneratorRuntime.async(function v$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", Word.run(function _callee3(e) {
                var t, n;
                return regeneratorRuntime.async(function _callee3$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        t = e.document.getSelection();
                        n = "{% if " + document.getElementById("inputIfExpression").value + " %}";
                        t.load("text");
                        t.insertText(n, "Before");
                        t.insertText("{% endif %}", "After");
                        _context5.next = 7;
                        return regeneratorRuntime.awrap(e.sync());

                      case 7:
                        console.log(`The selected text was ${t.text}.`);

                      case 8:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, null, _this3);
              }));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }function f() {
      var _this4 = this;

      return regeneratorRuntime.async(function f$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", Word.run(function _callee4(e) {
                var t, n, r;
                return regeneratorRuntime.async(function _callee4$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        t = e.document.getSelection();
                        n = document.getElementById("inputListVariableName").value;
                        if (document.getElementById("checkboxOnlyTrue").checked) r = "{%p for item in " + n + ".true_values() %}";else r = "{%p for item in " + n + "%}";t.load("text");
                        t.insertText("{{ item }}", "Replace");
                        t.insertParagraph(r, "Before");
                        t.insertParagraph("{%p endfor %}", "After");
                        _context7.next = 9;
                        return regeneratorRuntime.awrap(e.sync());

                      case 9:
                        console.log(`The selected text was ${t.text}.`);

                      case 10:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, null, _this4);
              }));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }function p() {
      var _this5 = this;

      return regeneratorRuntime.async(function p$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", Word.run(function _callee5(e) {
                var t, n;
                return regeneratorRuntime.async(function _callee5$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        t = e.document.getSelection();
                        t.load("text");
                        _context9.next = 4;
                        return regeneratorRuntime.awrap(e.sync());

                      case 4:
                        n = new RegExp("({#)([\\s\\S]*)(#})").exec(t.text);
                        n ? (t.insertText(n[2], "Replace"), console.log("Removed comments.")) : (t.insertParagraph("{#", "Before"), t.insertParagraph("#}", "After"), console.log("Added comments."));
                        _context9.next = 8;
                        return regeneratorRuntime.awrap(e.sync());

                      case 8:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, null, _this5);
              }));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }function g() {
      var _this6 = this;

      return regeneratorRuntime.async(function g$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", Word.run(function _callee6(e) {
                var t, n, r, a;
                return regeneratorRuntime.async(function _callee6$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        t = e.document.getSelection();
                        n = document.getElementById("inputTemplateName").value, r = document.getElementById("inputTemplateOptions").value;
                        if ("" == r) a = '{{p include_docx_template("' + n + '") }}';else a = '{{p include_docx_template("' + n + '", ' + r + ") }}";t.load("text");
                        t.insertText(a, "Replace");
                        _context11.next = 7;
                        return regeneratorRuntime.awrap(e.sync());

                      case 7:
                        console.log(`The selected text was ${t.text}.`);

                      case 8:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, null, _this6);
              }));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  } });
