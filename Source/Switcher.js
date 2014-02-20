/*
 *	Switcher JS Library
 *		Ben Russell
 *		https://github.com/Ben-Russell/Switcher
 *		Version 1.2
 */
(function() {

	function _s(expr, evaluatefunctions) {
		if(typeof evaluatefunctions === "undefined") {
			var evaluatefunctions = true;
		}
		return new Switcher(expr, evaluatefunctions);
	}


		function Switcher(_expr, evaluatefunctions) {
			this.Expression = _expr;
			this.EvaluateFunctions = evaluatefunctions;

			this.Result = undefined;
			this.Passed = false;
		}

		Switcher.prototype.Case = function Case(expr, stmt) {
			var caseresult = this;

			switch(Object.prototype.toString.call(expr)) {
				case "[object Array]":
					for(var i=0, iL = expr.length; i<iL; i++) {
						caseresult = this.Case(expr[i], stmt);
					}
					break;
				case "[object RegExp]":
					if(expr.test(this.Expression)) {
						Pass(this, stmt);
					}
					break;
				case "[object Boolean]":
					if(Object.prototype.toString.call(this.Expression) != "[object Boolean]") {
						if(expr) {
							Pass(this, stmt);
						}
						break;
					}
				default:
					if(this.Expression == expr) {
						Pass(this, stmt);
					}
					break;
			}
			return caseresult;
		}

		Switcher.prototype.Default = function(stmt) {
			if(!this.Passed) {
				return this.Case(this.Expression, stmt);
			}
		}


		function Pass(switcher, stmt) {
			switcher.Passed = true;

			if(typeof stmt === 'function' && switcher.EvaluateFunctions) {
				switcher.Result = stmt();
			}
			else {
				switcher.Result = stmt;
			}

		}

	window.Switcher = _s;

})();
