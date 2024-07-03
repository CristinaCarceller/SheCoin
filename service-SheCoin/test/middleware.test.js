import { expect } from "chai";
import Sinon from "sinon";
import jwt from "jsonwebtoken";
import AuthMiddleware from "../src/middleware/Auth.middleware.js";

describe("AuthMiddleware", () => {
	let authMiddleware;
	let verifyStub;
	let softVerifyStub;

	beforeEach(() => {
		authMiddleware = new AuthMiddleware();
	});

	afterEach(() => {
		Sinon.restore();
	});

	describe("verify", () => {
		it("should call next if token is valid", () => {
			const req = {
				headers: { "x-access-token": "valid-token" },
			};
			const res = {};
			const next = Sinon.spy();

			verifyStub = Sinon.stub(jwt, "verify").yields(null, { id: "user-id" });

			authMiddleware.verify(req, res, next);

			expect(verifyStub.calledOnce).to.be.true;
			expect(req.id).to.equal("user-id");
			expect(next.calledOnce).to.be.true;
		});

		it("should return 403 if no token is provided", () => {
			const req = { headers: {} };
			const res = {
				status: Sinon.stub().returnsThis(),
				json: Sinon.spy(),
			};
			const next = Sinon.spy();

			authMiddleware.verify(req, res, next);

			expect(res.status.calledWith(403)).to.be.true;
			expect(res.json.calledWith({ message: "Missing token" })).to.be.true;
			expect(next.notCalled).to.be.true;
		});

		it("should return 401 if token is invalid", () => {
			const req = {
				headers: { "x-access-token": "invalid-token" },
			};
			const res = {
				status: Sinon.stub().returnsThis(),
				send: Sinon.spy(),
			};
			const next = Sinon.spy();

			verifyStub = Sinon.stub(jwt, "verify").yields(new Error("Invalid token"));

			authMiddleware.verify(req, res, next);

			expect(res.status.calledWith(401)).to.be.true;
			expect(res.send.calledWith({ message: "Unauthorised access" })).to.be
				.true;
			expect(next.notCalled).to.be.true;
		});
	});

	describe("softVerify", () => {
		it("should call next if token is valid", () => {
			const req = {
				headers: { "x-access-token": "valid-token" },
			};
			const res = {};
			const next = Sinon.spy();

			verifyStub = Sinon.stub(jwt, "verify").yields(null, { id: "user-id" });

			authMiddleware.softVerify(req, res, next);

			expect(verifyStub.calledOnce).to.be.true;
			expect(req.id).to.equal("user-id");
			expect(next.calledOnce).to.be.true;
		});

		it("should call next if no token is provided", () => {
			const req = { headers: {} };
			const res = {};
			const next = Sinon.spy();

			authMiddleware.softVerify(req, res, next);

			expect(next.calledOnce).to.be.true;
		});

		it("should return 401 if token is invalid", () => {
			const req = {
				headers: { "x-access-token": "invalid-token" },
			};
			const res = {
				status: Sinon.stub().returnsThis(),
				send: Sinon.spy(),
			};
			const next = Sinon.spy();

			verifyStub = Sinon.stub(jwt, "verify").yields(new Error("Invalid token"));

			authMiddleware.softVerify(req, res, next);

			expect(res.status.calledWith(401)).to.be.true;
			expect(res.send.calledWith({ message: "Unauthorised access" })).to.be
				.true;
			expect(next.notCalled).to.be.true;
		});
	});
});
