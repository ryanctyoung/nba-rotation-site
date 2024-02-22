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
var Game = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('games')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _GAME_ID_decorators;
    var _GAME_ID_initializers = [];
    var _SEASON_ID_decorators;
    var _SEASON_ID_initializers = [];
    var _GAME_DATE_decorators;
    var _GAME_DATE_initializers = [];
    var _TEAM_ID_decorators;
    var _TEAM_ID_initializers = [];
    var _TEAM_NAME_decorators;
    var _TEAM_NAME_initializers = [];
    var _MATCHUP_decorators;
    var _MATCHUP_initializers = [];
    var _PTS_decorators;
    var _PTS_initializers = [];
    var _PLUS_MINUS_decorators;
    var _PLUS_MINUS_initializers = [];
    var Game = _classThis = /** @class */ (function () {
        function Game_1() {
            this.GAME_ID = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _GAME_ID_initializers, void 0));
            this.SEASON_ID = __runInitializers(this, _SEASON_ID_initializers, void 0);
            this.GAME_DATE = __runInitializers(this, _GAME_DATE_initializers, void 0);
            this.TEAM_ID = __runInitializers(this, _TEAM_ID_initializers, void 0);
            this.TEAM_NAME = __runInitializers(this, _TEAM_NAME_initializers, void 0);
            this.MATCHUP = __runInitializers(this, _MATCHUP_initializers, void 0);
            this.PTS = __runInitializers(this, _PTS_initializers, void 0);
            this.PLUS_MINUS = __runInitializers(this, _PLUS_MINUS_initializers, void 0);
        }
        return Game_1;
    }());
    __setFunctionName(_classThis, "Game");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _GAME_ID_decorators = [(0, typeorm_1.PrimaryColumn)("text")];
        _SEASON_ID_decorators = [(0, typeorm_1.Column)("text")];
        _GAME_DATE_decorators = [(0, typeorm_1.Column)()];
        _TEAM_ID_decorators = [(0, typeorm_1.Column)()];
        _TEAM_NAME_decorators = [(0, typeorm_1.Column)("text")];
        _MATCHUP_decorators = [(0, typeorm_1.Column)("text")];
        _PTS_decorators = [(0, typeorm_1.Column)()];
        _PLUS_MINUS_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _GAME_ID_decorators, { kind: "field", name: "GAME_ID", static: false, private: false, access: { has: function (obj) { return "GAME_ID" in obj; }, get: function (obj) { return obj.GAME_ID; }, set: function (obj, value) { obj.GAME_ID = value; } }, metadata: _metadata }, _GAME_ID_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _SEASON_ID_decorators, { kind: "field", name: "SEASON_ID", static: false, private: false, access: { has: function (obj) { return "SEASON_ID" in obj; }, get: function (obj) { return obj.SEASON_ID; }, set: function (obj, value) { obj.SEASON_ID = value; } }, metadata: _metadata }, _SEASON_ID_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _GAME_DATE_decorators, { kind: "field", name: "GAME_DATE", static: false, private: false, access: { has: function (obj) { return "GAME_DATE" in obj; }, get: function (obj) { return obj.GAME_DATE; }, set: function (obj, value) { obj.GAME_DATE = value; } }, metadata: _metadata }, _GAME_DATE_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _TEAM_ID_decorators, { kind: "field", name: "TEAM_ID", static: false, private: false, access: { has: function (obj) { return "TEAM_ID" in obj; }, get: function (obj) { return obj.TEAM_ID; }, set: function (obj, value) { obj.TEAM_ID = value; } }, metadata: _metadata }, _TEAM_ID_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _TEAM_NAME_decorators, { kind: "field", name: "TEAM_NAME", static: false, private: false, access: { has: function (obj) { return "TEAM_NAME" in obj; }, get: function (obj) { return obj.TEAM_NAME; }, set: function (obj, value) { obj.TEAM_NAME = value; } }, metadata: _metadata }, _TEAM_NAME_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _MATCHUP_decorators, { kind: "field", name: "MATCHUP", static: false, private: false, access: { has: function (obj) { return "MATCHUP" in obj; }, get: function (obj) { return obj.MATCHUP; }, set: function (obj, value) { obj.MATCHUP = value; } }, metadata: _metadata }, _MATCHUP_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _PTS_decorators, { kind: "field", name: "PTS", static: false, private: false, access: { has: function (obj) { return "PTS" in obj; }, get: function (obj) { return obj.PTS; }, set: function (obj, value) { obj.PTS = value; } }, metadata: _metadata }, _PTS_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _PLUS_MINUS_decorators, { kind: "field", name: "PLUS_MINUS", static: false, private: false, access: { has: function (obj) { return "PLUS_MINUS" in obj; }, get: function (obj) { return obj.PLUS_MINUS; }, set: function (obj, value) { obj.PLUS_MINUS = value; } }, metadata: _metadata }, _PLUS_MINUS_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Game = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Game = _classThis;
}();
exports.default = Game;
