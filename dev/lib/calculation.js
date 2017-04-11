define(function(require,exports,module){
	require("zepto");
	
	//点击显示利率
	$(".time").on("click","input",function(){

		if($(this).next().text()=="24个月"){
			$(".rate").find("span").text("3%");
		}else{
			$(".rate").find("span").text("5.5%");
		}

	})

	//点击计算
	$(".reckon").on("click",function(){
		var check=$(".time input:checked");

		rate=Number($(".rate").find("span").text().slice(0,-1)/100);// 利率
		proc=Number($(".proc").find("i").text());	// 手续
		fund=$(".price input").val()*10000;			// 金额
		month=check.next().text().slice(0,2)		// 月
		year=month/12;								// 年份
		count=fund*year*rate+fund+proc;				// 总花费=金额*年数*利率+金额+手续
		
		payments=((count-proc)/month).toFixed(2);	//月供=(总花费-手续)/月

		$("#month").find('b').text(month+"月");
		$(".count").find("i").text(count/10000+"万");
		$(".payments").find("i").text(payments)
	})
})