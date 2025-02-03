"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelToDomain = exports.User = void 0;
// src/models/userModel.ts
const mongoose_1 = __importStar(require("mongoose"));
//Config
const index_1 = require("@config/index");
//Constants
const _constants_1 = require("@constants");
//enums
const _enums_1 = require("@enums");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: Number,
        enum: index_1.roles,
        default: index_1.defaultRole,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    countryCode: {
        type: String,
        default: null,
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    picture: {
        type: String,
        default: null,
    },
    status: {
        type: Number,
        default: _enums_1.UserStatus.Active,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Customize JSON transformation to exclude sensitive data
userSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id; // Add id
        _constants_1.commonVariables.USER_SENSITIVE_INFO_DB_COLUMNS.forEach((field) => delete ret[field]);
        return ret;
    },
});
exports.User = mongoose_1.default.model('users', userSchema);
// Function to format the user document
const modelToDomain = (userDoc) => {
    const formattedDoc = {
        id: userDoc.id.toString(),
        email: userDoc.email,
        name: userDoc.name,
        role: userDoc.role,
        status: userDoc.status === null ? undefined : userDoc.status,
        isDeleted: userDoc.isDeleted === null ? undefined : userDoc.isDeleted,
        createdAt: userDoc.createdAt === null ? undefined : userDoc.createdAt,
        updatedAt: userDoc.updatedAt === null ? undefined : userDoc.updatedAt,
        description: userDoc.description === null ? undefined : userDoc.description,
        dateOfBirth: userDoc.dateOfBirth === null ? undefined : userDoc.dateOfBirth,
    };
    // Optionally, you can also sanitize any nested objects or arrays if needed
    return formattedDoc;
};
exports.modelToDomain = modelToDomain;
//# sourceMappingURL=user.model.js.map