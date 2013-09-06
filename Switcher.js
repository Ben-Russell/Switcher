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
						if(typeof stmt === 'function') {
							this.Result = stmt();
						}
						else {
							this.Result = stmt;
						}
					}
					break;
				default:
					if(this.Expression == expr) {
						if(typeof stmt === 'function' && this.EvaluateFunctions) {
							this.Result = stmt();
						}
						else {
							this.Result = stmt;
						}
					}
					break;
			}
			return caseresult;
		}

		Switcher.prototype.Default = function(stmt) {
			return this.Case(this.Expression, stmt);
		}

	window.Switcher = _s;

})();
