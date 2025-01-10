// 「同意する」のチェックボックスを取得
const agreeCheckbox = document.getElementById('checkbox');
// 送信ボタンを取得
const submitBtn = document.getElementById('submit');
// チェックボックスをクリックした時
agreeCheckbox.addEventListener('click', () => {
    // チェックされている場合
    if (agreeCheckbox.checked === true) {
        submitBtn.disabled = false; // disabledを外す
    }
    // チェックされていない場合
    else {
        submitBtn.disabled = true; // disabledを付与
    }
});
//==========================================validate.js==========================================
!(function(T) {
    'use strict';
    var F = {
        init: function(e) {
            var t = this;
            return (
                (t.data('jqv') && null != t.data('jqv')) ||
                ((e = F._saveOptions(t, e)),
                    T(document).on('click', '.formError', function() {
                        T(this).fadeOut(150, function() {
                            T(this).closest('.formError').remove();
                        });
                    })),
                this
            );
        },
        attach: function(e) {
            var t,
                a = this;
            return (
                ((t = e ? F._saveOptions(a, e) : a.data('jqv')).validateAttribute = a.find(
                        '[data-validation-engine*=validate]'
                    ).length ?
                    'data-validation-engine' :
                    'class'),
                t.binded &&
                (a.on(
                        t.validationEventTrigger,
                        '[' +
                        t.validateAttribute +
                        '*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)',
                        F._onFieldEvent
                    ),
                    a.on(
                        'click',
                        '[' +
                        t.validateAttribute +
                        '*=validate][type=checkbox],[' +
                        t.validateAttribute +
                        '*=validate][type=radio]',
                        F._onFieldEvent
                    ),
                    a.on(
                        t.validationEventTrigger,
                        '[' + t.validateAttribute + '*=validate][class*=datepicker]', { delay: 300 },
                        F._onFieldEvent
                    )),
                t.autoPositionUpdate &&
                T(window).bind(
                    'resize', {
                        noAnimation: !0,
                        formElem: a,
                    },
                    F.updatePromptsPosition
                ),
                a.on(
                    'click',
                    "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']",
                    F._submitButtonClick
                ),
                a.removeData('jqv_submitButton'),
                a.on('submit', F._onSubmitEvent),
                this
            );
        },
        detach: function() {
            var e = this,
                t = e.data('jqv');
            return (
                e.off(
                    t.validationEventTrigger,
                    '[' +
                    t.validateAttribute +
                    '*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)',
                    F._onFieldEvent
                ),
                e.off(
                    'click',
                    '[' +
                    t.validateAttribute +
                    '*=validate][type=checkbox],[' +
                    t.validateAttribute +
                    '*=validate][type=radio]',
                    F._onFieldEvent
                ),
                e.off(
                    t.validationEventTrigger,
                    '[' + t.validateAttribute + '*=validate][class*=datepicker]',
                    F._onFieldEvent
                ),
                e.off('submit', F._onSubmitEvent),
                e.removeData('jqv'),
                e.off(
                    'click',
                    "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']",
                    F._submitButtonClick
                ),
                e.removeData('jqv_submitButton'),
                t.autoPositionUpdate && T(window).off('resize', F.updatePromptsPosition),
                this
            );
        },
        validate: function(e) {
            var t,
                a = T(this),
                r = null;
            if (a.is('form') || a.hasClass('validationEngineContainer')) {
                if (a.hasClass('validating')) return !1;
                a.addClass('validating'), (t = e ? F._saveOptions(a, e) : a.data('jqv'));
                r = F._validateFields(this);
                setTimeout(function() {
                        a.removeClass('validating');
                    }, 100),
                    r && t.onSuccess ? t.onSuccess() : !r && t.onFailure && t.onFailure();
            } else {
                if (!a.is('form') && !a.hasClass('validationEngineContainer')) {
                    var i = a.closest('form, .validationEngineContainer');
                    return (
                        (t = i.data('jqv') ? i.data('jqv') : T.validationEngine.defaults),
                        (r = F._validateField(a, t)) && t.onFieldSuccess ?
                        t.onFieldSuccess() :
                        t.onFieldFailure && 0 < t.InvalidFields.length && t.onFieldFailure(), !r
                    );
                }
                a.removeClass('validating');
            }
            return t.onValidationComplete ? !!t.onValidationComplete(i, r) : r;
        },
        updatePromptsPosition: function(e) {
            if (e && this == window)
                var r = e.data.formElem,
                    i = e.data.noAnimation;
            else r = T(this.closest('form, .validationEngineContainer'));
            var o = r.data('jqv');
            return (
                o || (o = F._saveOptions(r, o)),
                r
                .find('[' + o.validateAttribute + '*=validate]')
                .not(':disabled')
                .each(function() {
                    var e = T(this);
                    o.prettySelect &&
                        e.is(':hidden') &&
                        (e = r.find('#' + o.usePrefix + e.attr('id') + o.useSuffix));
                    var t = F._getPrompt(e),
                        a = T(t).find('.formErrorContent').html();
                    t && F._updatePrompt(e, T(t), a, void 0, !1, o, i);
                }),
                this
            );
        },
        showPrompt: function(e, t, a, r) {
            var i = this.closest('form, .validationEngineContainer').data('jqv');
            return (
                i || (i = F._saveOptions(this, i)),
                a && (i.promptPosition = a),
                (i.showArrow = 1 == r),
                F._showPrompt(this, e, t, !1, i),
                this
            );
        },
        hide: function() {
            var e = T(this).closest('form, .validationEngineContainer'),
                t = e.data('jqv');
            t || (t = F._saveOptions(e, t));
            var a,
                r = t && t.fadeDuration ? t.fadeDuration : 0.3;
            return (
                (a =
                    e.is('form') || e.hasClass('validationEngineContainer') ?
                    'parentForm' + F._getClassName(T(e).attr('id')) :
                    F._getClassName(T(e).attr('id')) + 'formError'),
                T('.' + a).fadeTo(r, 0, function() {
                    T(this).closest('.formError').remove();
                }),
                this
            );
        },
        hideAll: function() {
            var e = this.data('jqv'),
                t = e ? e.fadeDuration : 300;
            return (
                T('.formError').fadeTo(t, 0, function() {
                    T(this).closest('.formError').remove();
                }),
                this
            );
        },
        _onFieldEvent: function(e) {
            var t = T(this),
                a = t.closest('form, .validationEngineContainer'),
                r = a.data('jqv');
            r || (r = F._saveOptions(a, r)),
                (r.eventTrigger = 'field'),
                1 == r.notEmpty ?
                0 < t.val().length &&
                window.setTimeout(
                    function() {
                        F._validateField(t, r);
                    },
                    e.data ? e.data.delay : 0
                ) :
                window.setTimeout(
                    function() {
                        F._validateField(t, r);
                    },
                    e.data ? e.data.delay : 0
                );
        },
        _onSubmitEvent: function() {
            var e = T(this),
                t = e.data('jqv');
            if (e.data('jqv_submitButton')) {
                var a = T('#' + e.data('jqv_submitButton'));
                if (
                    a &&
                    0 < a.length &&
                    (a.hasClass('validate-skip') || 'true' == a.attr('data-validation-engine-skip'))
                )
                    return !0;
            }
            t.eventTrigger = 'submit';
            var r = F._validateFields(e);
            return r && t.ajaxFormValidation ?
                (F._validateFormWithAjax(e, t), !1) :
                t.onValidationComplete ?
                !!t.onValidationComplete(e, r) :
                r;
        },
        _checkAjaxStatus: function(e) {
            var a = !0;
            return (
                T.each(e.ajaxValidCache, function(e, t) {
                    if (!t) return (a = !1);
                }),
                a
            );
        },
        _checkAjaxFieldStatus: function(e, t) {
            return 1 == t.ajaxValidCache[e];
        },
        _validateFields: function(a) {
            var r = a.data('jqv'),
                i = !1;
            a.trigger('jqv.form.validating');
            var o = null;
            if (
                (a
                    .find('[' + r.validateAttribute + '*=validate]')
                    .not(':disabled')
                    .each(function() {
                        var e = T(this),
                            t = [];
                        if (T.inArray(e.attr('name'), t) < 0) {
                            if (
                                ((i |= F._validateField(e, r)) &&
                                    null == o &&
                                    (o =
                                        e.is(':hidden') && r.prettySelect ?
                                        (e = a.find(
                                            '#' +
                                            r.usePrefix +
                                            F._jqSelector(e.attr('id')) +
                                            r.useSuffix
                                        )) :
                                        (e.data('jqv-prompt-at') instanceof jQuery ?
                                            (e = e.data('jqv-prompt-at')) :
                                            e.data('jqv-prompt-at') &&
                                            (e = T(e.data('jqv-prompt-at'))),
                                            e)),
                                    r.doNotShowAllErrosOnSubmit)
                            )
                                return !1;
                            if ((t.push(e.attr('name')), 1 == r.showOneMessage && i)) return !1;
                        }
                    }),
                    a.trigger('jqv.form.result', [i]),
                    i)
            ) {
                if (r.scroll) {
                    var e = o.offset().top,
                        t = o.offset().left,
                        s = r.promptPosition;
                    const headerHeight = $('.header').outerHeight();
                    const formErrorHeight = $('.formError').outerHeight();
                    const target_e = e - headerHeight - formErrorHeight - 10;
                    if (
                        ('string' == typeof s &&
                            -1 != s.indexOf(':') &&
                            (s = s.substring(0, s.indexOf(':'))),
                            'bottomRight' != s && 'bottomLeft' != s)
                    ) {
                        var n = F._getPrompt(o);
                        n && (e = n.offset().top);
                    }
                    if ((r.scrollOffset && (e -= r.scrollOffset), r.isOverflown)) {
                        var l = T(r.overflownDIV);
                        if (!l.length) return !1;
                        (e += l.scrollTop() + -parseInt(l.offset().top) - 5),
                        T(r.overflownDIV)
                            .filter(':not(:animated)')
                            .animate({ scrollTop: e }, 1100, function() {
                                r.focusFirstField && o.focus();
                            });
                    } else
                        T('html, body').animate({ scrollTop: target_e }, 1100, function() {
                            r.focusFirstField && o.focus();
                        }),
                        T('html, body').animate({ scrollLeft: t }, 1100);
                } else r.focusFirstField && o.focus();
                return !1;
            }
            return !0;
        },
        _validateFormWithAjax: function(l, d) {
            var e = l.serialize(),
                t = d.ajaxFormValidationMethod ? d.ajaxFormValidationMethod : 'GET',
                a = d.ajaxFormValidationURL ? d.ajaxFormValidationURL : l.attr('action'),
                u = d.dataType ? d.dataType : 'json';
            T.ajax({
                type: t,
                url: a,
                cache: !1,
                dataType: u,
                data: e,
                form: l,
                methods: F,
                options: d,
                beforeSend: function() {
                    return d.onBeforeAjaxFormValidation(l, d);
                },
                error: function(e, t) {
                    d.onFailure ? d.onFailure(e, t) : F._ajaxError(e, t);
                },
                success: function(e) {
                    if ('json' == u && !0 !== e) {
                        for (var t = !1, a = 0; a < e.length; a++) {
                            var r = e[a],
                                i = r[0],
                                o = T(T('#' + i)[0]);
                            if (1 == o.length) {
                                var s = r[2];
                                if (1 == r[1])
                                    if ('' != s && s) {
                                        if (d.allrules[s])
                                            (n = d.allrules[s].alertTextOk) && (s = n);
                                        d.showPrompts && F._showPrompt(o, s, 'pass', !1, d, !0);
                                    } else F._closePrompt(o);
                                else {
                                    var n;
                                    if (((t |= !0), d.allrules[s]))
                                        (n = d.allrules[s].alertText) && (s = n);
                                    d.showPrompts && F._showPrompt(o, s, '', !1, d, !0);
                                }
                            }
                        }
                        d.onAjaxFormComplete(!t, l, e, d);
                    } else d.onAjaxFormComplete(!0, l, e, d);
                },
            });
        },
        _validateField: function(e, t, a) {
            if (
                (e.attr('id') ||
                    (e.attr('id', 'form-validation-field-' + T.validationEngine.fieldIdCounter),
                        ++T.validationEngine.fieldIdCounter),
                    e.hasClass(t.ignoreFieldsWithClass))
            )
                return !1;
            if (!t.validateNonVisibleFields &&
                ((e.is(':hidden') && !t.prettySelect) || e.parent().is(':hidden'))
            )
                return !1;
            var r = e.attr(t.validateAttribute),
                i = /validate\[(.*)\]/.exec(r);
            if (!i) return !1;
            var o = i[1],
                s = o.split(/\[|,|\]/),
                n = e.attr('name'),
                l = '',
                d = '',
                u = !1,
                c = !1;
            (t.isError = !1), (t.showArrow = 1 == t.showArrow), 0 < t.maxErrorsPerField && (c = !0);
            for (var f = T(e.closest('form, .validationEngineContainer')), v = 0; v < s.length; v++)
                (s[v] = s[v].toString().replace(' ', '')), '' === s[v] && delete s[v];
            v = 0;
            for (var p = 0; v < s.length; v++) {
                if (c && p >= t.maxErrorsPerField) {
                    if (!u) {
                        var m = T.inArray('required', s);
                        u = -1 != m && v <= m;
                    }
                    break;
                }
                var g = void 0;
                switch (s[v]) {
                    case 'required':
                        (u = !0), (g = F._getErrorMessage(f, e, s[v], s, v, t, F._required));
                        break;
                    case 'custom':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._custom);
                        break;
                    case 'groupRequired':
                        var h = '[' + t.validateAttribute + '*=' + s[v + 1] + ']',
                            x = f.find(h).eq(0);
                        x[0] != e[0] && (F._validateField(x, t, a), (t.showArrow = !0)),
                            (g = F._getErrorMessage(f, e, s[v], s, v, t, F._groupRequired)) &&
                            (u = !0),
                            (t.showArrow = !1);
                        break;
                    case 'ajax':
                        (g = F._ajax(e, s, v, t)) && (d = 'load');
                        break;
                    case 'minSize':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._minSize);
                        break;
                    case 'maxSize':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._maxSize);
                        break;
                    case 'min':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._min);
                        break;
                    case 'max':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._max);
                        break;
                    case 'past':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._past);
                        break;
                    case 'future':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._future);
                        break;
                    case 'dateRange':
                        h = '[' + t.validateAttribute + '*=' + s[v + 1] + ']';
                        (t.firstOfGroup = f.find(h).eq(0)),
                        (t.secondOfGroup = f.find(h).eq(1)),
                        (t.firstOfGroup[0].value || t.secondOfGroup[0].value) &&
                        (g = F._getErrorMessage(f, e, s[v], s, v, t, F._dateRange)),
                        g && (u = !0),
                            (t.showArrow = !1);
                        break;
                    case 'dateTimeRange':
                        h = '[' + t.validateAttribute + '*=' + s[v + 1] + ']';
                        (t.firstOfGroup = f.find(h).eq(0)),
                        (t.secondOfGroup = f.find(h).eq(1)),
                        (t.firstOfGroup[0].value || t.secondOfGroup[0].value) &&
                        (g = F._getErrorMessage(f, e, s[v], s, v, t, F._dateTimeRange)),
                        g && (u = !0),
                            (t.showArrow = !1);
                        break;
                    case 'maxCheckbox':
                        (e = T(f.find("input[name='" + n + "']"))),
                        (g = F._getErrorMessage(f, e, s[v], s, v, t, F._maxCheckbox));
                        break;
                    case 'minCheckbox':
                        (e = T(f.find("input[name='" + n + "']"))),
                        (g = F._getErrorMessage(f, e, s[v], s, v, t, F._minCheckbox));
                        break;
                    case 'equals':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._equals);
                        break;
                    case 'funcCall':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._funcCall);
                        break;
                    case 'creditCard':
                        g = F._getErrorMessage(f, e, s[v], s, v, t, F._creditCard);
                        break;
                    case 'condRequired':
                        void 0 !== (g = F._getErrorMessage(f, e, s[v], s, v, t, F._condRequired)) &&
                            (u = !0);
                        break;
                    case 'funcCallRequired':
                        void 0 !==
                            (g = F._getErrorMessage(f, e, s[v], s, v, t, F._funcCallRequired)) &&
                            (u = !0);
                }
                var _ = !1;
                if ('object' == typeof g)
                    switch (g.status) {
                        case '_break':
                            _ = !0;
                            break;
                        case '_error':
                            g = g.message;
                            break;
                        case '_error_no_prompt':
                            return !0;
                    }
                if (
                    (0 == v &&
                        0 == o.indexOf('funcCallRequired') &&
                        void 0 !== g &&
                        ('' != l && (l += '<br/>'), (l += g), p++, (_ = t.isError = !0)),
                        _)
                )
                    break;
                'string' == typeof g &&
                    ('' != l && (l += '<br/>'), (l += g), (t.isError = !0), p++);
            }!u && !e.val() && e.val().length < 1 && T.inArray('equals', s) < 0 && (t.isError = !1);
            var C = e.prop('type'),
                b = e.data('promptPosition') || t.promptPosition;
            ('radio' == C || 'checkbox' == C) &&
            1 < f.find("input[name='" + n + "']").length &&
                ((e = T(
                        'inline' === b ?
                        f.find("input[name='" + n + "'][type!=hidden]:last") :
                        f.find("input[name='" + n + "'][type!=hidden]:first")
                    )),
                    (t.showArrow = t.showArrowOnRadioAndCheckbox)),
                e.is(':hidden') &&
                t.prettySelect &&
                (e = f.find('#' + t.usePrefix + F._jqSelector(e.attr('id')) + t.useSuffix)),
                t.isError && t.showPrompts ? F._showPrompt(e, l, d, !1, t) : F._closePrompt(e),
                e.trigger('jqv.field.result', [e, t.isError, l]);
            var E = T.inArray(e[0], t.InvalidFields);
            return (-1 == E ?
                t.isError && t.InvalidFields.push(e[0]) :
                t.isError || t.InvalidFields.splice(E, 1),
                F._handleStatusCssClasses(e, t),
                t.isError && t.onFieldFailure && t.onFieldFailure(e), !t.isError && t.onFieldSuccess && t.onFieldSuccess(e),
                t.isError
            );
        },
        _handleStatusCssClasses: function(e, t) {
            t.addSuccessCssClassToField && e.removeClass(t.addSuccessCssClassToField),
                t.addFailureCssClassToField && e.removeClass(t.addFailureCssClassToField),
                t.addSuccessCssClassToField &&
                !t.isError &&
                e.addClass(t.addSuccessCssClassToField),
                t.addFailureCssClassToField && t.isError && e.addClass(t.addFailureCssClassToField);
        },
        _getErrorMessage: function(e, t, a, r, i, o, s) {
            var n = jQuery.inArray(a, r);
            ('custom' !== a && 'funcCall' !== a && 'funcCallRequired' !== a) ||
            ((a = a + '[' + r[n + 1] + ']'), delete r[n]);
            var l,
                d = a,
                u = (
                    t.attr('data-validation-engine') ?
                    t.attr('data-validation-engine') :
                    t.attr('class')
                ).split(' ');
            if (
                null !=
                (l =
                    'future' == a || 'past' == a || 'maxCheckbox' == a || 'minCheckbox' == a ?
                    s(e, t, r, i, o) :
                    s(t, r, i, o))
            ) {
                var c = F._getCustomErrorMessage(T(t), u, d, o);
                c && (l = c);
            }
            return l;
        },
        _getCustomErrorMessage: function(e, t, a, r) {
            var i = !1,
                o = /^custom\[.*\]$/.test(a) ? F._validityProp.custom : F._validityProp[a];
            if (null != o && null != (i = e.attr('data-errormessage-' + o))) return i;
            if (null != (i = e.attr('data-errormessage'))) return i;
            var s = '#' + e.attr('id');
            if (void 0 !== r.custom_error_messages[s] && void 0 !== r.custom_error_messages[s][a])
                i = r.custom_error_messages[s][a].message;
            else if (0 < t.length)
                for (var n = 0; n < t.length && 0 < t.length; n++) {
                    var l = '.' + t[n];
                    if (
                        void 0 !== r.custom_error_messages[l] &&
                        void 0 !== r.custom_error_messages[l][a]
                    ) {
                        i = r.custom_error_messages[l][a].message;
                        break;
                    }
                }
            return (
                i ||
                void 0 === r.custom_error_messages[a] ||
                void 0 === r.custom_error_messages[a].message ||
                (i = r.custom_error_messages[a].message),
                i
            );
        },
        _validityProp: {
            required: 'value-missing',
            custom: 'custom-error',
            groupRequired: 'value-missing',
            ajax: 'custom-error',
            minSize: 'range-underflow',
            maxSize: 'range-overflow',
            min: 'range-underflow',
            max: 'range-overflow',
            past: 'type-mismatch',
            future: 'type-mismatch',
            dateRange: 'type-mismatch',
            dateTimeRange: 'type-mismatch',
            maxCheckbox: 'range-overflow',
            minCheckbox: 'range-underflow',
            equals: 'pattern-mismatch',
            funcCall: 'custom-error',
            funcCallRequired: 'custom-error',
            creditCard: 'pattern-mismatch',
            condRequired: 'value-missing',
        },
        _required: function(e, t, a, r, i) {
            switch (e.prop('type')) {
                case 'radio':
                case 'checkbox':
                    if (i) {
                        if (!e.prop('checked')) return r.allrules[t[a]].alertTextCheckboxMultiple;
                        break;
                    }
                    var o = e.closest('form, .validationEngineContainer'),
                        s = e.attr('name');
                    if (0 == o.find("input[name='" + s + "']:checked").length)
                        return 1 == o.find("input[name='" + s + "']:visible").length ?
                            r.allrules[t[a]].alertTextCheckboxe :
                            r.allrules[t[a]].alertTextCheckboxMultiple;
                    break;
                case 'text':
                case 'password':
                case 'textarea':
                case 'file':
                case 'select-one':
                case 'select-multiple':
                default:
                    var n = T.trim(e.val()),
                        l = T.trim(e.attr('data-validation-placeholder')),
                        d = T.trim(e.attr('placeholder'));
                    if (!n || (l && n == l) || (d && n == d)) return r.allrules[t[a]].alertText;
            }
        },
        _groupRequired: function(e, t, a, r) {
            var i = '[' + r.validateAttribute + '*=' + t[a + 1] + ']',
                o = !1;
            if (
                (e
                    .closest('form, .validationEngineContainer')
                    .find(i)
                    .each(function() {
                        if (!F._required(T(this), t, a, r)) return !(o = !0);
                    }), !o)
            )
                return r.allrules[t[a]].alertText;
        },
        _custom: function(e, t, a, r) {
            var i,
                o = t[a + 1],
                s = r.allrules[o];
            if (s)
                if (s.regex) {
                    var n = s.regex;
                    if (!n) return void alert('jqv:custom regex not found - ' + o);
                    if (!new RegExp(n).test(e.val())) return r.allrules[o].alertText;
                } else {
                    if (!s.func) return void alert('jqv:custom type not allowed ' + o);
                    if ('function' != typeof(i = s.func))
                        return void alert("jqv:custom parameter 'function' is no function - " + o);
                    if (!i(e, t, a, r)) return r.allrules[o].alertText;
                }
            else alert('jqv:custom rule not found - ' + o);
        },
        _funcCall: function(e, t, a, r) {
            var i,
                o = t[a + 1];
            if (-1 < o.indexOf('.')) {
                for (var s = o.split('.'), n = window; s.length;) n = n[s.shift()];
                i = n;
            } else i = window[o] || r.customFunctions[o];
            if ('function' == typeof i) return i(e, t, a, r);
        },
        _funcCallRequired: function(e, t, a, r) {
            return F._funcCall(e, t, a, r);
        },
        _equals: function(e, t, a, r) {
            var i = t[a + 1];
            if (e.val() != T('#' + i).val()) return r.allrules.equals.alertText;
        },
        _maxSize: function(e, t, a, r) {
            var i = t[a + 1];
            if (i < e.val().length) {
                var o = r.allrules.maxSize;
                return o.alertText + i + o.alertText2;
            }
        },
        _minSize: function(e, t, a, r) {
            var i = t[a + 1];
            if (e.val().length < i) {
                var o = r.allrules.minSize;
                return o.alertText + i + o.alertText2;
            }
        },
        _min: function(e, t, a, r) {
            var i = parseFloat(t[a + 1]);
            if (parseFloat(e.val()) < i) {
                var o = r.allrules.min;
                return o.alertText2 ? o.alertText + i + o.alertText2 : o.alertText + i;
            }
        },
        _max: function(e, t, a, r) {
            var i = parseFloat(t[a + 1]);
            if (i < parseFloat(e.val())) {
                var o = r.allrules.max;
                return o.alertText2 ? o.alertText + i + o.alertText2 : o.alertText + i;
            }
        },
        _past: function(e, t, a, r, i) {
            var o,
                s = a[r + 1],
                n = T(e.find("*[name='" + s.replace(/^#+/, '') + "']"));
            if ('now' == s.toLowerCase()) o = new Date();
            else if (null != n.val()) {
                if (n.is(':disabled')) return;
                o = F._parseDate(n.val());
            } else o = F._parseDate(s);
            if (o < F._parseDate(t.val())) {
                var l = i.allrules.past;
                return l.alertText2 ?
                    l.alertText + F._dateToString(o) + l.alertText2 :
                    l.alertText + F._dateToString(o);
            }
        },
        _future: function(e, t, a, r, i) {
            var o,
                s = a[r + 1],
                n = T(e.find("*[name='" + s.replace(/^#+/, '') + "']"));
            if ('now' == s.toLowerCase()) o = new Date();
            else if (null != n.val()) {
                if (n.is(':disabled')) return;
                o = F._parseDate(n.val());
            } else o = F._parseDate(s);
            if (F._parseDate(t.val()) < o) {
                var l = i.allrules.future;
                return l.alertText2 ?
                    l.alertText + F._dateToString(o) + l.alertText2 :
                    l.alertText + F._dateToString(o);
            }
        },
        _isDate: function(e) {
            return new RegExp(
                /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/
            ).test(e);
        },
        _isDateTime: function(e) {
            return new RegExp(
                /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/
            ).test(e);
        },
        _dateCompare: function(e, t) {
            return new Date(e.toString()) < new Date(t.toString());
        },
        _dateRange: function(e, t, a, r) {
            return (!r.firstOfGroup[0].value && r.secondOfGroup[0].value) ||
                (r.firstOfGroup[0].value && !r.secondOfGroup[0].value) ?
                r.allrules[t[a]].alertText + r.allrules[t[a]].alertText2 :
                F._isDate(r.firstOfGroup[0].value) &&
                F._isDate(r.secondOfGroup[0].value) &&
                F._dateCompare(r.firstOfGroup[0].value, r.secondOfGroup[0].value) ?
                void 0 :
                r.allrules[t[a]].alertText + r.allrules[t[a]].alertText2;
        },
        _dateTimeRange: function(e, t, a, r) {
            return (!r.firstOfGroup[0].value && r.secondOfGroup[0].value) ||
                (r.firstOfGroup[0].value && !r.secondOfGroup[0].value) ?
                r.allrules[t[a]].alertText + r.allrules[t[a]].alertText2 :
                F._isDateTime(r.firstOfGroup[0].value) &&
                F._isDateTime(r.secondOfGroup[0].value) &&
                F._dateCompare(r.firstOfGroup[0].value, r.secondOfGroup[0].value) ?
                void 0 :
                r.allrules[t[a]].alertText + r.allrules[t[a]].alertText2;
        },
        _maxCheckbox: function(e, t, a, r, i) {
            var o = a[r + 1],
                s = t.attr('name');
            if (o < e.find("input[name='" + s + "']:checked").length)
                return (
                    (i.showArrow = !1),
                    i.allrules.maxCheckbox.alertText2 ?
                    i.allrules.maxCheckbox.alertText +
                    ' ' +
                    o +
                    ' ' +
                    i.allrules.maxCheckbox.alertText2 :
                    i.allrules.maxCheckbox.alertText
                );
        },
        _minCheckbox: function(e, t, a, r, i) {
            var o = a[r + 1],
                s = t.attr('name');
            if (e.find("input[name='" + s + "']:checked").length < o)
                return (
                    (i.showArrow = !1),
                    i.allrules.minCheckbox.alertText +
                    ' ' +
                    o +
                    ' ' +
                    i.allrules.minCheckbox.alertText2
                );
        },
        _creditCard: function(e, t, a, r) {
            var i = !1,
                o = e.val().replace(/ +/g, '').replace(/-+/g, ''),
                s = o.length;
            if (14 <= s && s <= 16 && 0 < parseInt(o)) {
                for (
                    var n, l = 0, d = ((a = s - 1), 1), u = new String();
                    (n = parseInt(o.charAt(a))), (u += d++ % 2 == 0 ? 2 * n : n), 0 <= --a;

                );
                for (a = 0; a < u.length; a++) l += parseInt(u.charAt(a));
                i = l % 10 == 0;
            }
            if (!i) return r.allrules.creditCard.alertText;
        },
        _ajax: function(s, e, t, n) {
            var a = e[t + 1],
                l = n.allrules[a],
                r = l.extraData,
                i = l.extraDataDynamic,
                o = { fieldId: s.attr('id'), fieldValue: s.val() };
            if ('object' == typeof r) T.extend(o, r);
            else if ('string' == typeof r) {
                var d = r.split('&');
                for (t = 0; t < d.length; t++) {
                    var u = d[t].split('=');
                    u[0] && u[0] && (o[u[0]] = u[1]);
                }
            }
            if (i) {
                var c = String(i).split(',');
                for (t = 0; t < c.length; t++) {
                    var f = c[t];
                    if (T(f).length) {
                        var v = s.closest('form, .validationEngineContainer').find(f).val();
                        f.replace('#', ''), escape(v);
                        o[f.replace('#', '')] = v;
                    }
                }
            }
            if (
                ('field' == n.eventTrigger && delete n.ajaxValidCache[s.attr('id')], !n.isError && !F._checkAjaxFieldStatus(s.attr('id'), n))
            )
                return (
                    T.ajax({
                        type: n.ajaxFormValidationMethod,
                        url: l.url,
                        cache: !1,
                        dataType: 'json',
                        data: o,
                        field: s,
                        rule: l,
                        methods: F,
                        options: n,
                        beforeSend: function() {},
                        error: function(e, t) {
                            n.onFailure ? n.onFailure(e, t) : F._ajaxError(e, t);
                        },
                        success: function(e) {
                            var t = e[0],
                                a = T('#' + t).eq(0);
                            if (1 == a.length) {
                                var r = e[1],
                                    i = e[2];
                                if (r) {
                                    if (((n.ajaxValidCache[t] = !0), i)) {
                                        if (n.allrules[i])
                                            (o = n.allrules[i].alertTextOk) && (i = o);
                                    } else i = l.alertTextOk;
                                    n.showPrompts &&
                                        (i ?
                                            F._showPrompt(a, i, 'pass', !0, n) :
                                            F._closePrompt(a)),
                                        'submit' == n.eventTrigger && s.closest('form').submit();
                                } else {
                                    var o;
                                    if (((n.ajaxValidCache[t] = !1), (n.isError = !0), i)) {
                                        if (n.allrules[i])(o = n.allrules[i].alertText) && (i = o);
                                    } else i = l.alertText;
                                    n.showPrompts && F._showPrompt(a, i, '', !0, n);
                                }
                            }
                            a.trigger('jqv.field.result', [a, n.isError, i]);
                        },
                    }),
                    l.alertTextLoad
                );
        },
        _ajaxError: function(e, t) {
            0 == e.status && null == t ?
                alert('The page is not served from a server! ajax call failed') :
                'undefined' != typeof console && console.log('Ajax error: ' + e.status + ' ' + t);
        },
        _dateToString: function(e) {
            return e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
        },
        _parseDate: function(e) {
            var t = e.split('-');
            return (
                t == e && (t = e.split('/')),
                t == e ?
                ((t = e.split('.')), new Date(t[2], t[1] - 1, t[0])) :
                new Date(t[0], t[1] - 1, t[2])
            );
        },
        _showPrompt: function(e, t, a, r, i, o) {
            e.data('jqv-prompt-at') instanceof jQuery ?
                (e = e.data('jqv-prompt-at')) :
                e.data('jqv-prompt-at') && (e = T(e.data('jqv-prompt-at')));
            var s = F._getPrompt(e);
            o && (s = !1),
                T.trim(t) &&
                (s ? F._updatePrompt(e, s, t, a, r, i) : F._buildPrompt(e, t, a, r, i));
        },
        _buildPrompt: function(e, t, a, r, i) {
            var o = T('<div>');
            switch (
                (o.addClass(F._getClassName(e.attr('id')) + 'formError'),
                    o.addClass(
                        'parentForm' +
                        F._getClassName(e.closest('form, .validationEngineContainer').attr('id'))
                    ),
                    o.addClass('formError'),
                    a)
            ) {
                case 'pass':
                    o.addClass('greenPopup');
                    break;
                case 'load':
                    o.addClass('blackPopup');
            }
            r && o.addClass('ajaxed');
            T('<div>').addClass('formErrorContent').html(t).appendTo(o);
            var s = e.data('promptPosition') || i.promptPosition;
            if (i.showArrow) {
                var n = T('<div>').addClass('formErrorArrow');
                if ('string' == typeof s) - 1 != (u = s.indexOf(':')) && (s = s.substring(0, u));
                switch (s) {
                    case 'bottomLeft':
                    case 'bottomRight':
                        o.find('.formErrorContent').before(n),
                            n
                            .addClass('formErrorArrowBottom')
                            .html(
                                '<div class="line1">\x3c!-- --\x3e</div><div class="line2">\x3c!-- --\x3e</div><div class="line3">\x3c!-- --\x3e</div><div class="line4">\x3c!-- --\x3e</div><div class="line5">\x3c!-- --\x3e</div><div class="line6">\x3c!-- --\x3e</div><div class="line7">\x3c!-- --\x3e</div><div class="line8">\x3c!-- --\x3e</div><div class="line9">\x3c!-- --\x3e</div><div class="line10">\x3c!-- --\x3e</div>'
                            );
                        break;
                    case 'topLeft':
                    case 'topRight':
                        n.html(
                                '<div class="line10">\x3c!-- --\x3e</div><div class="line9">\x3c!-- --\x3e</div><div class="line8">\x3c!-- --\x3e</div><div class="line7">\x3c!-- --\x3e</div><div class="line6">\x3c!-- --\x3e</div><div class="line5">\x3c!-- --\x3e</div><div class="line4">\x3c!-- --\x3e</div><div class="line3">\x3c!-- --\x3e</div><div class="line2">\x3c!-- --\x3e</div><div class="line1">\x3c!-- --\x3e</div>'
                            ),
                            o.append(n);
                }
            }
            i.addPromptClass && o.addClass(i.addPromptClass);
            var l = e.attr('data-required-class');
            if (void 0 !== l) o.addClass(l);
            else if (
                i.prettySelect &&
                T('#' + e.attr('id'))
                .next()
                .is('select')
            ) {
                var d = T(
                    '#' + e.attr('id').substr(i.usePrefix.length).substring(i.useSuffix.length)
                ).attr('data-required-class');
                void 0 !== d && o.addClass(d);
            }
            o.css({ opacity: 0 }),
                'inline' === s ?
                (o.addClass('inline'),
                    void 0 !== e.attr('data-prompt-target') &&
                    0 < T('#' + e.attr('data-prompt-target')).length ?
                    o.appendTo(T('#' + e.attr('data-prompt-target'))) :
                    e.after(o)) :
                e.before(o);
            var u = F._calculatePosition(e, o, i);
            return (
                T('body').hasClass('rtl') ?
                o
                .css({
                    position: 'inline' === s ? 'relative' : 'absolute',
                    top: u.callerTopPosition,
                    left: 'initial',
                    right: u.callerleftPosition,
                    marginTop: u.marginTopSize,
                    opacity: 0,
                })
                .data('callerField', e) :
                o
                .css({
                    position: 'inline' === s ? 'relative' : 'absolute',
                    top: u.callerTopPosition,
                    left: u.callerleftPosition,
                    right: 'initial',
                    marginTop: u.marginTopSize,
                    opacity: 0,
                })
                .data('callerField', e),
                i.autoHidePrompt &&
                setTimeout(function() {
                    o.animate({ opacity: 0 }, function() {
                        o.closest('.formError').remove();
                    });
                }, i.autoHideDelay),
                o.animate({ opacity: 0.87 })
            );
        },
        _updatePrompt: function(e, t, a, r, i, o, s) {
            if (t) {
                void 0 !== r &&
                    ('pass' == r ? t.addClass('greenPopup') : t.removeClass('greenPopup'),
                        'load' == r ? t.addClass('blackPopup') : t.removeClass('blackPopup')),
                    i ? t.addClass('ajaxed') : t.removeClass('ajaxed'),
                    t.find('.formErrorContent').html(a);
                var n = F._calculatePosition(e, t, o);
                if (T('body').hasClass('rtl'))
                    var l = {
                        top: n.callerTopPosition,
                        left: 'initial',
                        right: n.callerleftPosition,
                        marginTop: n.marginTopSize,
                        opacity: 0.87,
                    };
                else
                    l = {
                        top: n.callerTopPosition,
                        left: n.callerleftPosition,
                        right: 'initial',
                        marginTop: n.marginTopSize,
                        opacity: 0.87,
                    };
                t.css({ opacity: 0, display: 'block' }), s ? t.css(l) : t.animate(l);
            }
        },
        _closePrompt: function(e) {
            var t = F._getPrompt(e);
            t &&
                t.fadeTo('fast', 0, function() {
                    t.closest('.formError').remove();
                });
        },
        closePrompt: function(e) {
            return F._closePrompt(e);
        },
        _getPrompt: function(e) {
            var t = T(e).closest('form, .validationEngineContainer').attr('id'),
                a = F._getClassName(e.attr('id')) + 'formError',
                r = T('.' + F._escapeExpression(a) + '.parentForm' + F._getClassName(t))[0];
            if (r) return T(r);
        },
        _escapeExpression: function(e) {
            return e.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, '\\$1');
        },
        isRTL: function(e) {
            var t = T(document),
                a = T('body'),
                r =
                (e && e.hasClass('rtl')) ||
                (e && 'rtl' === (e.attr('dir') || '').toLowerCase()) ||
                t.hasClass('rtl') ||
                'rtl' === (t.attr('dir') || '').toLowerCase() ||
                a.hasClass('rtl') ||
                'rtl' === (a.attr('dir') || '').toLowerCase();
            return Boolean(r);
        },
        _calculatePosition: function(e, t, a) {
            var r,
                i,
                o,
                s = e.width(),
                n = e.position().left,
                l = e.position().top;
            e.height();
            (r = i = 0), (o = -t.height());
            var d = e.data('promptPosition') || a.promptPosition,
                u = '',
                c = '',
                f = 0,
                v = 0;
            switch (
                ('string' == typeof d &&
                    -1 != d.indexOf(':') &&
                    ((u = d.substring(d.indexOf(':') + 1)),
                        (d = d.substring(0, d.indexOf(':'))), -1 != u.indexOf(',') &&
                        ((c = u.substring(u.indexOf(',') + 1)),
                            (u = u.substring(0, u.indexOf(','))),
                            (v = parseInt(c)),
                            isNaN(v) && (v = 0)),
                        (f = parseInt(u)),
                        isNaN(u) && (u = 0)),
                    d)
            ) {
                default:
                    case 'topRight':
                    (i += n + s - 27),
                (r += l);
                break;
                case 'topLeft':
                        (r += l),
                    (i += n);
                    break;
                case 'centerRight':
                        (r = l + 4),
                    (o = 0),
                    (i = n + e.outerWidth(!0) + 5);
                    break;
                case 'centerLeft':
                        (i = n - (t.width() + 2)),
                    (r = l + 4),
                    (o = 0);
                    break;
                case 'bottomLeft':
                        (r = l + e.height() + 5),
                    (o = 0),
                    (i = n);
                    break;
                case 'bottomRight':
                        (i = n + s - 27),
                    (r = l + e.height() + 5),
                    (o = 0);
                    break;
                case 'inline':
                        o = r = i = 0;
            }
            return {
                callerTopPosition: (r += v) + 'px',
                callerleftPosition: (i += f) + 'px',
                marginTopSize: o + 'px',
            };
        },
        _saveOptions: function(e, t) {
            if (T.validationEngineLanguage) var a = T.validationEngineLanguage.allRules;
            else
                T.error(
                    'jQuery.validationEngine rules are not loaded, plz add localization files to the page'
                );
            T.validationEngine.defaults.allrules = a;
            var r = T.extend(!0, {}, T.validationEngine.defaults, t);
            return e.data('jqv', r), r;
        },
        _getClassName: function(e) {
            if (e) return e.replace(/:/g, '_').replace(/\./g, '_');
        },
        _jqSelector: function(e) {
            return e.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
        },
        _condRequired: function(e, t, a, r) {
            var i, o;
            for (i = a + 1; i < t.length; i++)
                if (
                    (o = jQuery('#' + t[i]).first()).length &&
                    null == F._required(o, ['required'], 0, r, !0)
                )
                    return F._required(e, ['required'], 0, r);
        },
        _submitButtonClick: function(e) {
            var t = T(this);
            t.closest('form, .validationEngineContainer').data('jqv_submitButton', t.attr('id'));
        },
    };
    (T.fn.validationEngine = function(e) {
        var t = T(this);
        return t[0] ?
            'string' == typeof e && '_' != e.charAt(0) && F[e] ?
            ('showPrompt' != e && 'hide' != e && 'hideAll' != e && F.init.apply(t),
                F[e].apply(t, Array.prototype.slice.call(arguments, 1))) :
            'object' != typeof e && e ?
            void T.error('Method ' + e + ' does not exist in jQuery.validationEngine') :
            (F.init.apply(t, arguments), F.attach.apply(t)) :
            t;
    }),
    (T.validationEngine = {
        fieldIdCounter: 0,
        defaults: {
            validationEventTrigger: 'blur',
            scroll: !0,
            focusFirstField: !0,
            showPrompts: !0,
            validateNonVisibleFields: !1,
            ignoreFieldsWithClass: 'ignoreMe',
            promptPosition: 'topRight',
            bindMethod: 'bind',
            inlineAjax: !1,
            ajaxFormValidation: !1,
            ajaxFormValidationURL: !1,
            ajaxFormValidationMethod: 'get',
            onAjaxFormComplete: T.noop,
            onBeforeAjaxFormValidation: T.noop,
            onValidationComplete: !1,
            doNotShowAllErrosOnSubmit: !1,
            custom_error_messages: {},
            binded: !0,
            notEmpty: !1,
            showArrow: !0,
            showArrowOnRadioAndCheckbox: !1,
            isError: !1,
            maxErrorsPerField: !1,
            ajaxValidCache: {},
            autoPositionUpdate: !1,
            InvalidFields: [],
            onFieldSuccess: !1,
            onFieldFailure: !1,
            onSuccess: !1,
            onFailure: !1,
            validateAttribute: 'class',
            addSuccessCssClassToField: '',
            addFailureCssClassToField: '',
            autoHidePrompt: !1,
            autoHideDelay: 1e4,
            fadeDuration: 300,
            prettySelect: !1,
            addPromptClass: '',
            usePrefix: '',
            useSuffix: '',
            showOneMessage: !1,
        },
    }),
    T(function() {
        T.validationEngine.defaults.promptPosition = F.isRTL() ? 'topLeft' : 'topRight';
    });
})(jQuery);
/*****************************************************************
 * Japanese language file for jquery.validationEngine.js (ver2.0)
 *
 * Transrator: tomotomo ( Tomoyuki SUGITA )
 * http://tomotomoSnippet.blogspot.com/
 * Licenced under the MIT Licence
 *******************************************************************/

//==========================================validateJa.js==========================================
(function($) {
    $.fn.validationEngineLanguage = function() {};
    $.validationEngineLanguage = {
        newLang: function() {
            $.validationEngineLanguage.allRules = {
                required: {
                    // Add your regex rules here, you can take telephone as an example
                    regex: 'none',
                    alertText: '* 必須項目です',
                    alertTextCheckboxMultiple: '* 選択してください',
                    alertTextCheckboxe: '* チェックボックスをチェックしてください',
                },
                requiredInFunction: {
                    func: function(field, rules, i, options) {
                        return field.val() == 'test' ? true : false;
                    },
                    alertText: '* Field must equal test',
                },
                minSize: {
                    regex: 'none',
                    alertText: '* ',
                    alertText2: '文字以上にしてください',
                },
                groupRequired: {
                    regex: 'none',
                    alertText: '* You must fill one of the following fields',
                },
                maxSize: {
                    regex: 'none',
                    alertText: '* ',
                    alertText2: '文字以下にしてください',
                },
                min: {
                    regex: 'none',
                    alertText: '* ',
                    alertText2: ' 以上の数値にしてください',
                },
                max: {
                    regex: 'none',
                    alertText: '* ',
                    alertText2: ' 以下の数値にしてください',
                },
                past: {
                    regex: 'none',
                    alertText: '* ',
                    alertText2: ' より過去の日付にしてください',
                },
                future: {
                    regex: 'none',
                    alertText: '* ',
                    alertText2: ' より最近の日付にしてください',
                },
                maxCheckbox: {
                    regex: 'none',
                    alertText: '* チェックしすぎです',
                },
                minCheckbox: {
                    regex: 'none',
                    alertText: '* ',
                    alertText2: 'つ以上チェックしてください',
                },
                equals: {
                    regex: 'none',
                    alertText: '* 入力された値が一致しません',
                },
                creditCard: {
                    regex: 'none',
                    alertText: '* 無効なクレジットカード番号',
                },
                phone: {
                    // credit: jquery.h5validate.js / orefalo
                    regex: /^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
                    alertText: '* 電話番号が正しくありません',
                },
                email: {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    regex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    alertText: '* メールアドレスが正しくありません',
                },
                integer: {
                    regex: /^[\-\+]?\d+$/,
                    alertText: '* 整数を半角で入力してください',
                },
                number: {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    regex: /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    alertText: '* 数値を半角で入力してください',
                },
                date: {
                    regex: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    alertText: '* 日付は半角で YYYY-MM-DD の形式で入力してください',
                },
                ipv4: {
                    regex: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    alertText: '* IPアドレスが正しくありません',
                },
                ip: {
                    regex: /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/,
                    alertText: '* IPアドレスが正しくありません',
                },
                url: {
                    regex: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    alertText: '* URLが正しくありません',
                },
                onlyNumberSp: {
                    regex: /^[0-9\ ]+$/,
                    alertText: '* 半角数字で入力してください',
                },
                onlyLetterSp: {
                    regex: /^[a-zA-Z\ \']+$/,
                    alertText: '* 半角アルファベットで入力してください',
                },
                onlyLetterNumber: {
                    regex: /^[0-9a-zA-Z]+$/,
                    alertText: '* 半角英数で入力してください',
                },
                "hiragana": {
                    "regex": /^[\u3040-\u309F|\sー]+$/,
                    "alertText": "* ひらがなで入力してください。"
                },
                "katakana": {
                    "regex": /^[\u30A0-\u30FF|\sー]+$/,
                    "alertText": "* カタカナで入力してください。"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                ajaxUserCall: {
                    url: 'ajaxValidateFieldUser',
                    // you may want to pass extra data on the ajax call
                    extraData: 'name=eric',
                    alertText: '* This user is already taken',
                    alertTextLoad: '* Validating, please wait',
                },
                ajaxNameCall: {
                    // remote json service location
                    url: 'ajaxValidateFieldName',
                    // error
                    alertText: '* This name is already taken',
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    alertTextOk: '* This name is available',
                    // speaks by itself
                    alertTextLoad: '* Validating, please wait',
                },
                validate2fields: {
                    alertText: '* 『HELLO』と入力してください',
                },
            };
        },
    };
    $.validationEngineLanguage.newLang();
})(jQuery);

//==========================================form.js==========================================
$(function() {
    // 必須項目が未入力のときのエラーメッセージの表示位置
    const errTxtPosition = 'topLeft';

    $('.validateRequired').addClass('validate[required]').attr("data-prompt-position", errTxtPosition);
    $('.validatePhone1').addClass('validate[required,custom[phone]]').attr("data-prompt-position", errTxtPosition);
    $('.validatePhone2').addClass('validate[custom[phone]]').attr("data-prompt-position", errTxtPosition);
    $('.validateEmail').addClass('validate[required,custom[email]]').attr("data-prompt-position", errTxtPosition);
    $('.validateMinCheckbox').addClass('validate[minCheckbox[1]]').attr("data-prompt-position", errTxtPosition);
    $('.check1').addClass('validate[minCheckbox[1]]').attr("data-prompt-position", errTxtPosition);
    $('.validateGroup').addClass('validate[groupRequired[hope]]').attr("data-prompt-position", errTxtPosition);
    $('.validateHiragana1').addClass('validate[required,custom[hiragana]]').attr("data-prompt-position", errTxtPosition);
    $('.validateHiragana2').addClass('validate[custom[hiragana]]').attr("data-prompt-position", errTxtPosition);
    $('.validateKatakana1').addClass('validate[required,custom[katakana]]').attr("data-prompt-position", errTxtPosition);
    $('.validateKatakana2').addClass('validate[custom[katakana]]').attr("data-prompt-position", errTxtPosition);

    // フリガナ
    $.fn.autoKana('#name', '#kana', {
        katakana: false, // ひらがな
        // katakana: true, // カタカナ
    });

    // 郵便番号
    $('#zip1').jpostal({
        postcode: [
            '#postcode1', //郵便番号上3ケタ
            '#postcode2', //郵便番号下4ケタ
        ],
        address: {
            '#address1': '%3', //都道府県
            '#address2': '%4%5', //市区町村 町域
        },
    });

    $('.formWrap').validationEngine('attach', {
        onValidationComplete: function(form, status) {
            if (status) {
                sendForm();
            }
        },
    });
});

function sendForm() {
    var formDataArr = $('form').serializeArray();
    var formData = new FormData();
    formData.append('formtype', $('form').data('formtype') ? $('form').data('formtype') : '');

    if (formDataArr.length > 0) {
        // 日付用の変数（必要に応じて追加する）
        var yearArr0 = [];
        var yearArr1 = [];
        var yearArr2 = [];
        var yearArr3 = [];

        formDataArr.map(function(item) {
            // 日付のフォーマット
            switch (item.name) {
                // 生年月日
                // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△
                case 'year':
                    yearArr0['年'] = item.value ? item.value : '';
                    break;

                case 'month':
                    yearArr0['月'] = item.value ? item.value : '';
                    break;

                case 'day':
                    yearArr0['日'] = item.value ? item.value : '';

                    var yearStr0 = '';
                    for (key in yearArr0) {
                        yearStr0 += yearArr0[key] + key;
                    }
                    formData.append('生年月日', yearStr0);
                    break;
                    // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△

                    // 希望日時1
                    // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△
                case 'year1':
                    yearArr1['年'] = item.value ? item.value : '';
                    break;

                case 'month1':
                    yearArr1['月'] = item.value ? item.value : '';
                    break;

                case 'day1':
                    yearArr1['日'] = item.value ? item.value : '';
                    break;

                case 'hour1':
                    yearArr1['時'] = item.value ? item.value : '';
                    break;

                case 'minute1':
                    yearArr1['分'] = item.value ? item.value : '';

                    var yearStr1 = '';
                    for (key in yearArr1) {
                        yearStr1 += yearArr1[key] + key;
                    }
                    formData.append('希望日時1', yearStr1);
                    break;
                    // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△

                    // 希望日時2
                    // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△
                case 'year2':
                    yearArr2['年'] = item.value ? item.value : '';
                    break;

                case 'month2':
                    yearArr2['月'] = item.value ? item.value : '';
                    break;

                case 'day2':
                    yearArr2['日'] = item.value ? item.value : '';
                    break;

                case 'hour2':
                    yearArr2['時'] = item.value ? item.value : '';
                    break;

                case 'minute2':
                    yearArr2['分'] = item.value ? item.value : '';

                    var yearStr2 = '';
                    for (key in yearArr2) {
                        yearStr2 += yearArr2[key] + key;
                    }
                    formData.append('希望日時2', yearStr2);
                    break;
                    // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△

                    // 希望日時3
                    // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△
                case 'year3':
                    yearArr3['年'] = item.value ? item.value : '';
                    break;

                case 'month3':
                    yearArr3['月'] = item.value ? item.value : '';
                    break;

                case 'day3':
                    yearArr3['日'] = item.value ? item.value : '';
                    break;

                case 'hour3':
                    yearArr3['時'] = item.value ? item.value : '';
                    break;

                case 'minute3':
                    yearArr3['分'] = item.value ? item.value : '';

                    var yearStr3 = '';
                    for (key in yearArr3) {
                        yearStr3 += yearArr3[key] + key;
                    }
                    formData.append('希望日時3', yearStr3);
                    break;
                    // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△

                default:
                    if (item.value) {
                        // checkbox対策
                        // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△
                        if (item.value == '__checkbox') {
                            if (!formData.has(item.name)) {
                                formData.append(item.name, ' ');
                                break;
                            }
                        } else {
                            formData.append(item.name, item.value);
                        }
                        // ▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△▼△
                    } else {
                        formData.append(item.name, ' ');
                    }
                    break;
            }

            if ($("[name='" + item.name + "']").data('displaynameattr')) {
                formData.append(
                    'display_name__' + item.name,
                    $("[name='" + item.name + "']").data('displaynameattr')
                );
            }
        });

        // 添付ファイル数に応じて増減させる
        // formData.append('file1', $("input[name='file1']").prop('files')[0]);
        // formData.append('file2', $("input[name='file2']").prop('files')[0]);
        // formData.append('file3', $("input[name='file3']").prop('files')[0]);
        // formData.append('file4', $("input[name='file4']").prop("files")[0]);
        // formData.append('file5', $("input[name='file5']").prop("files")[0]);

        $.ajax({
                type: 'POST',
                url: '/ajax/contact',
                data: formData,
                timeout: 15000, // タイムアウト：15秒
                dataType: 'json',
                processData: false,
                contentType: false,
            })
            .done(function(res) {
                if (res.status === 'error') {
                    alert(res.errorMsg);
                } else {
                    $('.form')[0].reset();
                    window.location.href = $('.form').attr('action');
                }
            })
            .fail(function() {
                alert('エラーが発生しました。');
            });
    } else {
        alert('送信に失敗しました');
    }
}

//==========================================jpostal.js==========================================
/**
 * jquery.jpostal.js ver2.7
 *
 * Copyright 2014, Aoki Makoto, Ninton G.K. http://www.ninton.co.jp
 *
 * Released under the MIT license - http://en.wikipedia.org/wiki/MIT_License
 *
 * Requirements
 * jquery.js
 */
function JpostalDatabase(i_options) {
    this.address = []; // database cache
    this.map = {};
    this.url = {
        http: '//jpostal-1006.appspot.com/json/',
        https: '//jpostal-1006.appspot.com/json/',
    };

    this.find = function(i_postcode) {
        var address = [];

        for (var i = 0; i < this.address.length; ++i) {
            if (this.address[i][0] == '_' + i_postcode) {
                address = this.address[i];
            }
        }

        return address;
    };

    this.get = function(i_postcode) {
        //	--------------------------------------------------
        //	i_postcode	find()	find()	result
        //				1234567	123
        //	--------------------------------------------------
        //	1			-		-		defaults
        //	12			-		-		defaults
        //	123			-		Y		find( '123' )
        //	123			-		N		defaults
        //	1234		-		Y		find( '123' )
        //	1234		-		N		defaults
        //	1234567		Y		-		find( '1234567' )
        //	1234567		N		Y		find( '123' )
        //	1234567		N		N		defaults
        //	--------------------------------------------------
        var defaults = ['', '', '', '', '', '', '', '', ''];
        var address;
        var head3;

        switch (i_postcode.length) {
            case 3:
            case 4:
            case 5:
            case 6:
                head3 = i_postcode.substr(0, 3);
                address = this.find(head3);
                address = $.extend(defaults, address);
                break;

            case 7:
                address = this.find(i_postcode);
                if (!address) {
                    head3 = i_postcode.substr(0, 3);
                    address = this.find(head3);
                }
                address = $.extend(defaults, address);
                break;

            default:
                address = defaults;
                break;
        }

        return address;
    };

    this.getUrl = function(i_head3) {
        var url = '';

        switch (window.location.protocol) {
            case 'http:':
                url = this.url['http'];
                break;

            case 'https:':
                url = this.url['https'];
                break;
        }
        url = url + i_head3 + '.json';

        return url;
    };

    this.request = function(i_postcode, i_callback) {
        var _this = this;
        var head3 = i_postcode.substr(0, 3);

        if (i_postcode.length <= 2 || this.getStatus(head3) != 'none' || head3.match(/[^0-9]/)) {
            return false;
        }
        this.setStatus(head3, 'waiting');

        var url = this.getUrl(head3);

        var options = {
            async: false,
            dataType: 'jsonp',
            jsonpCallback: 'jQuery_jpostal_callback',
            type: 'GET',
            url: url,
            success: function(i_data, i_dataType) {
                i_callback();
            },
            error: function(i_XMLHttpRequest, i_textStatus, i_errorThrown) {},
            timeout: 5000, // msec
        };
        $.ajax(options);
        return true;
    };

    this.save = function(i_data) {
        for (var i = 0; i < i_data.length; ++i) {
            var rcd = i_data[i];
            var postcode = rcd[0];

            if (typeof this.map[postcode] == 'undefined') {
                this.address.push(rcd);
                this.map[postcode] = { state: 'complete', time: 0 };
            } else if (this.map[postcode].state == 'waiting') {
                this.address.push(rcd);
                this.map[postcode].state = 'complete';
            }
        }
    };

    this.getStatus = function(i_postcode) {
        //	--------------------------------------------------
        //	#	['_001']	..state		.time		result
        //	--------------------------------------------------
        //	1	 =undefined	-			-			none
        //	2	!=undefined	'complete'	-			complete
        //	3	!=undefined	'waiting'	<5sec		waiting
        //	4	!=undefined	'waiting'	>=5sec		none
        //	--------------------------------------------------
        var st = '';
        var postcode = '_' + i_postcode;

        if (typeof this.map[postcode] == 'undefined') {
            // # 1
            st = 'none';
        } else if ('complete' == this.map[postcode].state) {
            // # 2
            st = 'complete';
        } else {
            var t_ms = new Date().getTime() - this.map[postcode].time;
            if (t_ms < 5000) {
                // # 3
                st = 'waiting';
            } else {
                // # 4
                st = 'none';
            }
        }

        return st;
    };

    this.setStatus = function(i_postcode) {
        var postcode = '_' + i_postcode;

        if (typeof this.map[postcode] == 'undefined') {
            this.map[postcode] = {
                state: 'waiting',
                time: 0,
            };
        }

        this.map[postcode].time = new Date().getTime();
    };
}

function Jpostal(i_JposDb) {
    this.address = '';
    this.jposDb = i_JposDb;
    this.options = {};
    this.postcode = '';
    this.minLen = 3;

    this.displayAddress = function() {
        if (this.postcode == '000info') {
            this.address[2] += ' ' + this.getScriptSrc();
        }

        for (var key in this.options.address) {
            var s = this.formatAddress(this.options.address[key], this.address);
            if (this.isSelectTagForPrefecture(key, this.options.address[key])) {
                this.setSelectTagForPrefecture(key, s);
            } else {
                $(key).val(s);
            }
        }
    };

    this.isSelectTagForPrefecture = function(i_key, i_fmt) {
        // 都道府県のSELECTタグか？
        switch (i_fmt) {
            case '%3':
            case '%p':
            case '%prefecture':
                if ($(i_key).get(0).tagName.toUpperCase() == 'SELECT') {
                    f = true;
                } else {
                    f = false;
                }
                break;

            default:
                f = false;
                break;
        }
        return f;
    };

    this.setSelectTagForPrefecture = function(i_key, i_value) {
        // 都道府県のSELECTタグ
        // ケース1:<option value="東京都">東京都</option>
        $(i_key).val(i_value);
        if ($(i_key).val() == i_value) {
            return;
        }

        // ケース2: valueが数値(自治体コードの場合が多い)
        //	テキストが「北海道」を含むかどうかで判断する
        //	<option value="01">北海道(01)</option>
        //	<option value="1">1.北海道</option>
        value = '';
        var el = $(i_key)[0];
        for (var i = 0; i < el.options.length; ++i) {
            var p = el.options[i].text.indexOf(i_value);
            if (0 <= p) {
                value = el.options[i].value;
                break;
            }
        }

        if (value != '') {
            $(i_key).val(value);
        }
    };

    this.formatAddress = function(i_fmt, i_address) {
        var s = i_fmt;

        s = s.replace(/%3|%p|%prefecture/, i_address[1]);
        s = s.replace(/%4|%c|%city/, i_address[2]);
        s = s.replace(/%5|%t|%town/, i_address[3]);
        s = s.replace(/%6|%a|%address/, i_address[4]);
        s = s.replace(/%7|%n|%name/, i_address[5]);

        s = s.replace(/%8/, i_address[6]);
        s = s.replace(/%9/, i_address[7]);
        s = s.replace(/%10/, i_address[8]);

        return s;
    };

    this.getScriptSrc = function() {
        var src = '';

        var el_arr = document.getElementsByTagName('script');
        for (var i = 0; i < el_arr.length; ++i) {
            if (0 <= el_arr[i].src.search(/jquery.jpostal.js/)) {
                src = el_arr[i].src;
            }
        }

        return src;
    };

    this.init = function(i_options) {
        if (typeof i_options.postcode == 'undefined') {
            throw new Error('postcode undefined');
        }
        if (typeof i_options.address == 'undefined') {
            throw new Error('address undefined');
        }

        this.options.postcode = [];
        if (typeof i_options.postcode == 'string') {
            this.options.postcode.push(i_options.postcode);
        } else {
            this.options.postcode = i_options.postcode;
        }

        this.options.address = i_options.address;

        if (typeof i_options.url != 'undefined') {
            this.jposDb.url = i_options.url;
        }
    };

    this.main = function() {
        this.scanPostcode();
        if (this.postcode.length < this.minLen) {
            // git hub issue #4: 郵便番号欄が0～2文字のとき、住所欄を空欄にせず、入力内容を維持してほしい
            return;
        }

        var _this = this;
        var f = this.jposDb.request(this.postcode, function() {
            _this.callback();
        });
        if (!f) {
            this.callback();
        }
    };

    this.callback = function() {
        this.address = this.jposDb.get(this.postcode);
        this.displayAddress();
    };

    this.scanPostcode = function() {
        var s = '';

        switch (this.options.postcode.length) {
            case 0:
                break;

            case 1:
                //	github issue #8: 1つ目を空欄、2つ目を「001」としても、「001」として北海道札幌市を表示してしまう
                //	----------------------------------------
                //	case	postcode	result
                //	----------------------------------------
                //	1		''			''
                //	1		12			''
                //	2		123			123
                //	2		123-		123
                //	2		123-4		123
                //	3		123-4567	1234567
                //	2		1234		123
                //	4		1234567		1234567
                //	----------------------------------------
                s = String($(this.options.postcode[0]).val());
                if (0 <= s.search(/^([0-9]{3})([0-9A-Za-z]{4})/)) {
                    // case 4
                    s = RegExp.$1 + '' + RegExp.$2;
                } else if (0 <= s.search(/^([0-9]{3})-([0-9A-Za-z]{4})/)) {
                    // case 3
                    s = RegExp.$1 + '' + RegExp.$2;
                } else if (0 <= s.search(/^([0-9]{3})/)) {
                    // case 2
                    s = RegExp.$1;
                } else {
                    // case 1
                    s = '';
                }
                break;

            case 2:
                //	github issue #8: 1つ目を空欄、2つ目を「001」としても、「001」として北海道札幌市を表示してしまう
                //	----------------------------------------
                //	case	post1	post2	result
                //	----------------------------------------
                //	1		''		---		''
                //	1		12		---		''
                //	2		123		''		123
                //	2		123		4		123
                //	3		123		4567	1234567
                //	----------------------------------------
                var s3 = String($(this.options.postcode[0]).val());
                var s4 = String($(this.options.postcode[1]).val());
                if (0 <= s3.search(/^[0-9]{3}$/)) {
                    if (0 <= s4.search(/^[0-9A-Za-z]{4}$/)) {
                        // case 3
                        s = s3 + s4;
                    } else {
                        // case 2
                        s = s3;
                    }
                } else {
                    // case 1
                    s = '';
                }
                break;
        }

        this.postcode = s;
    };
}

//	MEMO: For the following reason, JposDb was put on the global scope, not local scope.
//	---------------------------------------------------------------------
// 	data file	callback			JposDb scope
//	---------------------------------------------------------------------
//	001.js		JposDb.save			global scope
//	001.js.php	$_GET['callback']	local scopde for function($){}
//	---------------------------------------------------------------------
var JposDb = new JpostalDatabase();

function jQuery_jpostal_callback(i_data) {
    JposDb.save(i_data);
}

(function($) {
    $.fn.jpostal = function(i_options) {
        var Jpos = new Jpostal(JposDb);
        Jpos.init(i_options);

        if (typeof i_options.click == 'string' && i_options.click != '') {
            $(i_options.click).bind('click', function(e) {
                Jpos.main();
            });
        } else {
            for (var i = 0; i < Jpos.options.postcode.length; ++i) {
                var selector = Jpos.options.postcode[i];
                $(selector).bind('keyup change', function(e) {
                    Jpos.main();
                });
            }
        }
    };
})(jQuery);

//==========================================autokana.js==========================================
// Based on the AutoRuby library created by:
// Copyright (c) 2005-2008 spinelz.org (http://script.spinelz.org/)
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.











(function($) {
    $.fn.autoKana = function(element1, element2, passedOptions) {

        var options = $.extend({
            'katakana': false
        }, passedOptions);

        var kana_extraction_pattern = new RegExp('[^ 　ぁあ-んー]', 'g');
        var kana_compacting_pattern = new RegExp('[ぁぃぅぇぉっゃゅょ]', 'g');
        var elName,
            elKana,
            active = false,
            timer = null,
            flagConvert = true,
            input;

        elName = $(element1);
        elKana = $(element2);
        active = true;
        _stateClear();

        elName.blur(_eventBlur);
        elName.focus(_eventFocus);
        elName.keydown(_eventKeyDown);

        function start() {
            active = true;
        };

        function stop() {
            active = false;
        };

        function toggle(event) {
            var ev = event || window.event;
            if (event) {
                var el = Event.element(event);
                if (el.checked) {
                    active = true;
                } else {
                    active = false;
                }
            } else {
                active = !active;
            }
        };

        function _checkConvert(new_values) {
            if (!flagConvert) {
                if (Math.abs(values.length - new_values.length) > 1) {
                    var tmp_values = new_values.join('').replace(kana_compacting_pattern, '').split('');
                    if (Math.abs(values.length - tmp_values.length) > 1) {
                        _stateConvert();
                    }
                } else {
                    if (values.length == input.length && values.join('') != input) {
                        _stateConvert();
                    }
                }
            }
        };

        function _checkValue() {
            var new_input, new_values;
            new_input = elName.val()
            if (new_input == '') {
                _stateClear();
                _setKana();
            } else {
                new_input = _removeString(new_input);
                if (input == new_input) {
                    return;
                } else {
                    input = new_input;
                    if (!flagConvert) {
                        new_values = new_input.replace(kana_extraction_pattern, '').split('');
                        _checkConvert(new_values);
                        _setKana(new_values);
                    }
                }
            }
        };

        function _clearInterval() {
            clearInterval(timer);
        };

        function _eventBlur(event) {
            _clearInterval();
        };

        function _eventFocus(event) {
            _stateInput();
            _setInterval();
        };

        function _eventKeyDown(event) {
            if (flagConvert) {
                _stateInput();
            }
        };

        function _isHiragana(chara) {
            return ((chara >= 12353 && chara <= 12435) || chara == 12445 || chara == 12446);
        };

        function _removeString(new_input) {
            if (new_input.match(ignoreString)) {
                return new_input.replace(ignoreString, '');
            } else {
                var i, ignoreArray, inputArray;
                ignoreArray = ignoreString.split('');
                inputArray = new_input.split('');
                for (i = 0; i < ignoreArray.length; i++) {
                    if (ignoreArray[i] == inputArray[i]) {
                        inputArray[i] = '';
                    }
                }
                return inputArray.join('');
            }
        };

        function _setInterval() {
            var self = this;
            timer = setInterval(_checkValue, 30);
        };

        function _setKana(new_values) {
            if (!flagConvert) {
                if (new_values) {
                    values = new_values;
                }
                if (active) {
                    var _val = _toKatakana(baseKana + values.join(''));
                    elKana.val(_val);
                }
            }
        };

        function _stateClear() {
            baseKana = '';
            flagConvert = false;
            ignoreString = '';
            input = '';
            values = [];
        };

        function _stateInput() {
            baseKana = elKana.val();
            flagConvert = false;
            ignoreString = elName.val();
        };

        function _stateConvert() {
            baseKana = baseKana + values.join('');
            flagConvert = true;
            values = [];
        };

        function _toKatakana(src) {
            if (options.katakana) {
                var c, i, str;
                str = new String;
                for (i = 0; i < src.length; i++) {
                    c = src.charCodeAt(i);
                    if (_isHiragana(c)) {
                        str += String.fromCharCode(c + 96);
                    } else {
                        str += src.charAt(i);
                    }
                }
                return str;
            } else {
                return src;
            }
        }
    };
})(jQuery);