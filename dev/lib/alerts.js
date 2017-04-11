define(function(require,exports,module){
	
	exports.click= function(opt){

	    opt.ele.on('click', function () {
	    	// console.log(opt)
	       	new IosSelect(1, [opt.data],
	            {
	                title: opt.title,
	                itemHeight: 50,
	                itemShowCount: 3,
	                callback: function (selectOneObj) {
	                	// console.log(selectOneObj,opt.ele)
	                	opt.ele.val(selectOneObj.value);
	                }
	        });
	    });
	}
})

