"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Score = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('score_histories')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _GAME_ID_decorators;
    var _GAME_ID_initializers = [];
    var _TEAM_ID_decorators;
    var _TEAM_ID_initializers = [];
    var _PERSON_ID_decorators;
    var _PERSON_ID_initializers = [];
    var _PLAYER_NAME_decorators;
    var _PLAYER_NAME_initializers = [];
    var _SCORE_HOME_decorators;
    var _SCORE_HOME_initializers = [];
    var _SCORE_AWAY_decorators;
    var _SCORE_AWAY_initializers = [];
    var _LOCATION_decorators;
    var _LOCATION_initializers = [];
    var _GAME_TIME_decorators;
    var _GAME_TIME_initializers = [];
    var Score = _classThis = /** @class */ (function () {
        function Score_1() {
            this.GAME_ID = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _GAME_ID_initializers, void 0));
            this.TEAM_ID = __runInitializers(this, _TEAM_ID_initializers, void 0);
            this.PERSON_ID = __runInitializers(this, _PERSON_ID_initializers, void 0);
            this.PLAYER_NAME = __runInitializers(this, _PLAYER_NAME_initializers, void 0);
            this.SCORE_HOME = __runInitializers(this, _SCORE_HOME_initializers, void 0);
            this.SCORE_AWAY = __runInitializers(this, _SCORE_AWAY_initializers, void 0);
            this.LOCATION = __runInitializers(this, _LOCATION_initializers, void 0);
            this.GAME_TIME = __runInitializers(this, _GAME_TIME_initializers, void 0);
        }
        return Score_1;
    }());
    __setFunctionName(_classThis, "Score");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _GAME_ID_decorators = [(0, typeorm_1.PrimaryColumn)("text")];
        _TEAM_ID_decorators = [(0, typeorm_1.Column)()];
        _PERSON_ID_decorators = [(0, typeorm_1.PrimaryColumn)()];
        _PLAYER_NAME_decorators = [(0, typeorm_1.Column)("text")];
        _SCORE_HOME_decorators = [(0, typeorm_1.Column)()];
        _SCORE_AWAY_decorators = [(0, typeorm_1.Column)()];
        _LOCATION_decorators = [(0, typeorm_1.Column)("text")];
        _GAME_TIME_decorators = [(0, typeorm_1.PrimaryColumn)()];
        __esDecorate(null, null, _GAME_ID_decorators, { kind: "field", name: "GAME_ID", static: false, private: false, access: { has: function (obj) { return "GAME_ID" in obj; }, get: function (obj) { return obj.GAME_ID; }, set: function (obj, value) { obj.GAME_ID = value; } }, metadata: _metadata }, _GAME_ID_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _TEAM_ID_decorators, { kind: "field", name: "TEAM_ID", static: false, private: false, access: { has: function (obj) { return "TEAM_ID" in obj; }, get: function (obj) { return obj.TEAM_ID; }, set: function (obj, value) { obj.TEAM_ID = value; } }, metadata: _metadata }, _TEAM_ID_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _PERSON_ID_decorators, { kind: "field", name: "PERSON_ID", static: false, private: false, access: { has: function (obj) { return "PERSON_ID" in obj; }, get: function (obj) { return obj.PERSON_ID; }, set: function (obj, value) { obj.PERSON_ID = value; } }, metadata: _metadata }, _PERSON_ID_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _PLAYER_NAME_decorators, { kind: "field", name: "PLAYER_NAME", static: false, private: false, access: { has: function (obj) { return "PLAYER_NAME" in obj; }, get: function (obj) { return obj.PLAYER_NAME; }, set: function (obj, value) { obj.PLAYER_NAME = value; } }, metadata: _metadata }, _PLAYER_NAME_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _SCORE_HOME_decorators, { kind: "field", name: "SCORE_HOME", static: false, private: false, access: { has: function (obj) { return "SCORE_HOME" in obj; }, get: function (obj) { return obj.SCORE_HOME; }, set: function (obj, value) { obj.SCORE_HOME = value; } }, metadata: _metadata }, _SCORE_HOME_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _SCORE_AWAY_decorators, { kind: "field", name: "SCORE_AWAY", static: false, private: false, access: { has: function (obj) { return "SCORE_AWAY" in obj; }, get: function (obj) { return obj.SCORE_AWAY; }, set: function (obj, value) { obj.SCORE_AWAY = value; } }, metadata: _metadata }, _SCORE_AWAY_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _LOCATION_decorators, { kind: "field", name: "LOCATION", static: false, private: false, access: { has: function (obj) { return "LOCATION" in obj; }, get: function (obj) { return obj.LOCATION; }, set: function (obj, value) { obj.LOCATION = value; } }, metadata: _metadata }, _LOCATION_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _GAME_TIME_decorators, { kind: "field", name: "GAME_TIME", static: false, private: false, access: { has: function (obj) { return "GAME_TIME" in obj; }, get: function (obj) { return obj.GAME_TIME; }, set: function (obj, value) { obj.GAME_TIME = value; } }, metadata: _metadata }, _GAME_TIME_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Score = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Score = _classThis;
}();
exports.default = Score;
